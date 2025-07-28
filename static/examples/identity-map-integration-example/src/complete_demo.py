#!/usr/bin/env python3
"""
Complete demo of UID2 Identity Mapping:
   - Creates a test database.
   - Populates the database with test identity mapping data.
   - Runs the UID2 mapping process.
   - Populates the database with test impression and conversion data.
   - Runs a sample attribution analysis.
"""
import traceback

import map_identities
import populate_test_uid_mappings
import populate_test_conversions_impressions
import attribution_analysis
from database import get_connection


def complete_demo():
    conn = get_connection("uid_demo.db")
    try:
        print("Step 1: Populating UID2 mapping test data...")
        populate_test_uid_mappings.populate_database(conn)

        print("Step 2: Running UID2 mapping...")
        map_identities.map_identities(conn)

        print("Step 3: Populating attribution test data...")
        populate_test_conversions_impressions.populate_attribution_data(conn)

        print("Step 4: Running attribution analysis...")
        attribution_analysis.attribution_analysis(conn)

        print("Demo completed successfully!")

    except Exception as e:
        print(f"Failed with error: {e}")
        traceback.print_exc()

    finally:
        conn.close()


if __name__ == "__main__":
    complete_demo()
