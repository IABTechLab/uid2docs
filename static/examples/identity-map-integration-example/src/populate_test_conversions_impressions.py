#!/usr/bin/env python3
"""
UID2 Attribution Test Data Population

Creates impression and conversion test data using actual mapped UID2s.
Should be run AFTER UID2 mapping is complete.
"""
import random
import sqlite3
import traceback
from datetime import datetime, timedelta

from database import get_connection, create_attribution_tables


def populate_attribution_data(conn: sqlite3.Connection) -> None:
    """Generate simple attribution demo data using actual UID2s"""
    cursor = conn.cursor()

    create_attribution_tables(conn)

    cursor.execute(
        """
        SELECT DISTINCT current_uid FROM uid_mapping 
        WHERE current_uid IS NOT NULL AND opt_out = FALSE 
        LIMIT 10000
    """
    )
    uid_rows = cursor.fetchall()

    if not uid_rows:
        print("No mapped UIDs found, skipping attribution data generation")
        return

    sample_uids = [row[0] for row in uid_rows]
    print(f"Using {len(sample_uids)} actual UIDs for attribution demo data")

    cursor.execute("DELETE FROM impressions")
    cursor.execute("DELETE FROM conversions")

    def random_recent_timestamp():
        now = datetime.now()
        days_ago = random.randint(0, 90)
        random_time = now - timedelta(days=days_ago, seconds=random.randint(0, 86399))
        return random_time

    print("Generating impressions...")
    impressions_data = [
        (
            random.choice(sample_uids),
            random_recent_timestamp(),
            f"camp_{random.randint(1, 5)}",
        )
        for _ in range(1000)
    ]

    print("Generating conversions...")
    conversions_data = [
        (
            random.choice(sample_uids),
            random_recent_timestamp(),
            round(random.uniform(10.0, 500.0), 2),
        )
        for _ in range(500)
    ]

    cursor.executemany(
        """
        INSERT INTO impressions (uid, timestamp, campaign_id) 
        VALUES (?, ?, ?)
    """,
        impressions_data,
    )

    cursor.executemany(
        """
        INSERT INTO conversions (uid, timestamp, conversion_value) 
        VALUES (?, ?, ?)
    """,
        conversions_data,
    )

    conn.commit()

    print(
        f"Generated {len(impressions_data):,} impressions and {len(conversions_data):,} conversions"
    )

    unique_impression_uids = len(set(uid for uid, _, _ in impressions_data))
    unique_conversion_uids = len(set(uid for uid, _, _ in conversions_data))

    print(
        f"Coverage: {unique_impression_uids} UIDs have impressions, {unique_conversion_uids} UIDs have conversions"
    )


def main():
    try:
        conn = get_connection()
        print("Populating attribution test data...")
        populate_attribution_data(conn)
        print("Attribution data population complete!")

    except Exception as e:
        print(f"Attribution data population failed: {e}")
        traceback.print_exc()

    finally:
        if "conn" in locals():
            conn.close()


if __name__ == "__main__":
    main()
