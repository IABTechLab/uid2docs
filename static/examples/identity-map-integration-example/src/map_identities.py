#!/usr/bin/env python3
import sqlite3
import sys
import traceback
from sqlite3 import Connection
from typing import Any, Tuple

from uid2_client import (
    IdentityMapV3Input,
    UnmappedIdentityReason,
)

from config import load_config
from database import get_connection, IdentityToMap
from uid_client_wrapper import UIDClientWrapper


def map_identities(conn: Connection) -> None:
    """
    Performs identity mapping in sequential batches:
    - Fetches records from the database that need mapping.
    - Splits records into batches (up to 5000 per batch).
    - For each batch:
        • Builds UID2 input and calls the UID2 mapping API.
        • Updates mapped identities in the database.
        • Marks opted-out identities.
    - Prints summary statistics after processing all batches.
    """
    config = load_config()
    uid_client = UIDClientWrapper(
        config.uid_base_url, config.uid_api_key, config.uid_secret_key
    )

    print("Fetching records that need mapping...")
    all_records: list[IdentityToMap] = get_records_to_map(conn)
    batches: list[list[IdentityToMap]] = batch_records(all_records)  # batches of up to 5k records
    print(f"Processing {len(all_records)} records in {len(batches)} batches...")

    total_processed = 0
    total_mapped = 0
    total_opted_out = 0

    for batch_num, batch in enumerate(batches, 1):
        try:
            print(f"Processing batch {batch_num} of {len(batches)} ({len(batch)} records)...")
            processed, mapped, opted_out = map_batch(batch, batch_num, conn, uid_client)
            total_processed += processed
            total_mapped += mapped
            total_opted_out += opted_out

        except Exception as e:
            print(f"Batch {batch_num} processing failed: {e}")
            traceback.print_exc()
            sys.exit(1)

    print(f"Mapping complete: processed={total_processed}, mapped={total_mapped}, opted_out={total_opted_out}")

def map_batch(
    batch: list[IdentityToMap],
    batch_num: int,
    conn: Connection,
    uid_client: UIDClientWrapper,
) -> Tuple[int, int, int]:
    """
    Processes a single batch of identity records.

    - Maps identities in the batch using the UID2 API.
    - Updates the database with mapped identities.
    - Marks identities as opted out if indicated by the API. 

    Returns:
        Tuple of (number processed, number mapped, number opted out)
    """
    dii_to_id = {record.dii: record.uid_mapping_id for record in batch}

    uid_input, invalid_diis = build_uid_input(batch)
    response = uid_client.identity_map(uid_input)

    mapped_identities = response.mapped_identities

    optout_ids = []
    invalid_count = len(invalid_diis)

    for dii, unmapped_identity in response.unmapped_identities.items():
        if unmapped_identity.reason == UnmappedIdentityReason.OPTOUT:
            optout_ids.append(dii_to_id[dii])

        if unmapped_identity.reason in [
            UnmappedIdentityReason.INVALID_IDENTIFIER,
            UnmappedIdentityReason.UNKNOWN,
        ]:
            invalid_count += 1

    update_mapped_records(conn, mapped_identities, dii_to_id)
    update_optout_records(conn, optout_ids)

    processed_count = len(batch)
    mapped_count = len(mapped_identities)
    opted_out_count = len(optout_ids)

    print(f"Batch {batch_num} complete: {mapped_count} mapped, {opted_out_count} opted out, {invalid_count} invalid")

    return processed_count, mapped_count, opted_out_count


def batch_records(all_records: list[IdentityToMap]) -> list[list[IdentityToMap]]:
    """Split records into batches of up to 5000"""
    batch_size = 5000
    batches = [
        all_records[i : i + batch_size] for i in range(0, len(all_records), batch_size)
    ]
    return batches


def get_records_to_map(conn: sqlite3.Connection) -> list[IdentityToMap]:
    """Retrieves records that either have never been mapped (current_uid IS NULL)
    or need refresh (refresh_from in the past). Excludes opted out records."""
    cursor = conn.cursor()

    base_query = """
                 SELECT uid_mapping_id, dii, dii_type
                 FROM uid_mapping
                 WHERE opt_out = FALSE
                   AND (current_uid IS NULL OR refresh_from < datetime('now')) \
                 """

    cursor.execute(base_query)

    return [
        IdentityToMap(
            uid_mapping_id=row["uid_mapping_id"],
            dii=row["dii"],
            dii_type=row["dii_type"],
        )
        for row in cursor.fetchall()
    ]


def build_uid_input(records: list[IdentityToMap]) -> tuple[IdentityMapV3Input, list[str]]:
    """Build UID input object from database records. 
    If adding an id causes a ValueError, add it to invalid_diis and continue. Other exceptions are raised."""

    uid_input = IdentityMapV3Input()
    invalid_diis = []

    for record in records:
        try:
            if record.dii_type == "email":
                uid_input.with_email(record.dii)
            elif record.dii_type == "phone":
                uid_input.with_phone(record.dii)
            else:
                raise Exception(f"Unknown dii type: {record.dii_type}")
        except ValueError:
            # ValueError is raised by uid2_client when the DII is invalid
            invalid_diis.append(record.dii)

    return uid_input, invalid_diis

def update_mapped_records(
    conn: sqlite3.Connection,
    mapped_identities: dict[str, Any],
    dii_to_id: dict[str, int],
) -> None:
    """Update database records with successful mapping results"""
    if not mapped_identities:
        return

    cursor = conn.cursor()
    sql_data = [
        (
            mapped_identity.current_raw_uid,
            mapped_identity.previous_raw_uid,
            mapped_identity.refresh_from,
            dii_to_id[dii],
        )
        for dii, mapped_identity in mapped_identities.items()
    ]

    cursor.executemany(
        """
        UPDATE uid_mapping 
        SET current_uid = ?, 
            previous_uid = ?, 
            refresh_from = ?
        WHERE uid_mapping_id = ?
    """,
        sql_data,
    )

    conn.commit()
    print(f"Updated {len(mapped_identities)} mapped records")


def update_optout_records(conn: sqlite3.Connection, optout_ids: list[int]) -> None:
    """Sets opt_out=TRUE and clears all UID-related fields to ensure
    these records are never processed again."""
    if not optout_ids:
        return

    cursor = conn.cursor()
    sql_data = [(uid_mapping_id,) for uid_mapping_id in optout_ids]

    cursor.executemany(
        """
        UPDATE uid_mapping 
        SET opt_out = TRUE,
            current_uid = NULL,
            previous_uid = NULL,
            refresh_from = NULL
        WHERE uid_mapping_id = ?
    """,
        sql_data,
    )

    conn.commit()
    print(f"Marked {len(optout_ids)} records as opted out")


if __name__ == "__main__":
    conn = get_connection("uid_mapping.db")
    try:
        map_identities(conn)
    finally:
        conn.close()
