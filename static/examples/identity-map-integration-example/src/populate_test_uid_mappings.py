#!/usr/bin/env python3
"""
Test Data Population Script

Creates 100k test records in uid_mapping database with following distribution:
- 10% already opted out
- 20% up for refresh (refresh_from in the past, current_uid populated)
- 20% never mapped (current_uid=NULL, refresh_from=NULL)
- 49% already mapped with future refresh dates
- 1% invalid DIIs (random strings)
"""
import random
import sqlite3
import string
import traceback
import uuid
from datetime import datetime, timedelta
from typing import Optional

from database import get_connection, create_uid_mapping_table


def generate_test_records() -> (
    list[tuple[str, str, Optional[str], Optional[str], Optional[datetime], bool]]
):
    """Generate test uid to dii mapping records"""
    records = []
    total_records = 100000
    opted_out_count = int(total_records * 0.10)
    refresh_needed_count = int(total_records * 0.20)
    never_mapped_count = int(total_records * 0.20)
    invalid_dii_count = int(total_records * 0.01)
    already_mapped_count = (
        total_records - opted_out_count - refresh_needed_count - never_mapped_count - invalid_dii_count
    )

    print(f"Generating test data distribution:")
    print(f"  Opted out: {opted_out_count}")
    print(f"  Up for refresh: {refresh_needed_count}")
    print(f"  Never mapped: {never_mapped_count}")
    print(f"  Invalid DIIs: {invalid_dii_count}")
    print(f"  Already mapped: {already_mapped_count}")

    # 1. Opted out records (10%)
    for _ in range(opted_out_count):
        dii, dii_type = generate_dii()

        records.append((dii, dii_type, None, None, None, True))

    # 2. Up for refresh records (20%)
    for _ in range(refresh_needed_count):
        dii, dii_type = generate_dii()
        current_uid = generate_uid()
        previous_uid = generate_uid() if random.random() < 0.5 else None
        refresh_from = datetime.now() - timedelta(days=random.randint(1, 30))

        records.append((dii, dii_type, current_uid, previous_uid, refresh_from, False))

    # 3. Never mapped records (20%)
    for _ in range(never_mapped_count):
        dii, dii_type = generate_dii()

        records.append((dii, dii_type, None, None, None, False))

    # 4. Invalid DII records (1%)
    for _ in range(invalid_dii_count):
        dii, dii_type = generate_invalid_dii()

        records.append((dii, dii_type, None, None, None, False))

    # 5. Already mapped with future refresh (49%)
    for _ in range(already_mapped_count):
        dii, dii_type = generate_dii()
        current_uid = generate_uid()
        previous_uid = generate_uid() if random.random() < 0.5 else None
        refresh_from = datetime.now() + timedelta(days=random.randint(1, 365))

        records.append((dii, dii_type, current_uid, previous_uid, refresh_from, False))

    random.shuffle(records)
    return records


def populate_database(conn: sqlite3.Connection) -> None:
    """Populate database with test records"""
    try:
        cursor = conn.cursor()

        print("Clearing existing database...")
        cursor.execute("DROP TABLE IF EXISTS uid_mapping")

        print("Recreating database schema...")
        create_uid_mapping_table(conn)

        print("Generating 100k test records...")
        records = generate_test_records()

        print("Inserting records into database...")
        cursor.executemany(
            """
            INSERT INTO uid_mapping (dii, dii_type, current_uid, previous_uid, refresh_from, opt_out)
            VALUES (?, ?, ?, ?, ?, ?)
        """,
            records,
        )

        conn.commit()

        cursor.execute("SELECT COUNT(*) FROM uid_mapping")
        total_count = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM uid_mapping WHERE opt_out = TRUE")
        opted_out_count = cursor.fetchone()[0]

        cursor.execute(
            "SELECT COUNT(*) FROM uid_mapping WHERE current_uid IS NULL AND refresh_from IS NULL AND opt_out = FALSE"
        )
        never_mapped_count = cursor.fetchone()[0]

        cursor.execute(
            "SELECT COUNT(*) FROM uid_mapping WHERE current_uid IS NOT NULL AND refresh_from < datetime('now')"
        )
        refresh_needed_count = cursor.fetchone()[0]

        print(f"\nDatabase populated successfully!")
        print(f"Total records: {total_count}")
        print(f"Opted out: {opted_out_count}")
        print(f"Never mapped: {never_mapped_count}")
        print(f"Up for refresh: {refresh_needed_count}")

    except Exception as e:
        print(f"Error populating database: {e}")
        print("Full stack trace:")
        traceback.print_exc()
        raise


def generate_dii() -> tuple[str, str]:
    """Generate a DII (email or phone) with its type"""
    dii_type = random.choice(["email", "phone"])
    if dii_type == "email":
        dii = generate_email()
    else:
        dii = generate_phone()
    return dii, dii_type


def generate_invalid_dii() -> tuple[str, str]:
    """Generate an invalid DII (random string)"""
    dii_type = random.choice(["email", "phone"])
    dii = ''.join(random.choices(string.ascii_letters, k=10))
    return dii, dii_type


def generate_email() -> str:
    """Generate a realistic email address"""
    return f"{uuid.uuid4()}@test.com"


def generate_phone() -> str:
    """Generate a realistic phone number"""
    return f"+1{random.randint(2000000000, 9999999999)}"


def generate_uid() -> str:
    """Generate a UID for testing"""
    return f"uid_{random.randint(1000000, 9999999)}"


def main() -> None:
    conn = get_connection("uid_mapping.db")
    try:
        populate_database(conn)
        print("Test data population completed successfully!")
    except Exception as e:
        print(f"Failed to populate test data: {e}")
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    main()
