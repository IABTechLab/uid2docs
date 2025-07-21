#!/usr/bin/env python3
"""
Simple demo of joining impression and conversion data via current and previous UIDs
"""
import sqlite3
import traceback
from database import get_connection


def attribution_analysis(conn: sqlite3.Connection) -> None:
    """Run simple attribution analysis query"""
    cursor = conn.cursor()

    attribution_query = """
    SELECT 
        imp.impression_id,
        conv.conversion_id,
        conv.conversion_value,
        imp.campaign_id,
        um.dii,
        um.current_uid
    FROM impressions imp 
    JOIN uid_mapping um ON (imp.uid = um.current_uid OR imp.uid = um.previous_uid)
    JOIN conversions conv ON (conv.uid = um.current_uid OR conv.uid = um.previous_uid)
    WHERE um.opt_out = FALSE
    ORDER BY RANDOM()
    LIMIT 10
    """

    cursor.execute(attribution_query)
    results = cursor.fetchall()

    print("Sample Attribution Results:")
    print(
        f"{'Impression':<12} {'Conversion':<12} {'Value':<10} {'Campaign':<12} {'DII':<40} {'UID':<15}"
    )
    print("-" * 110)

    for row in results:
        imp_id, conv_id, value, campaign, dii, uid = row
        print(
            f"{imp_id:<12} {conv_id:<12} ${value:<9.2f} {campaign:<12} {dii:<40} {uid:<15}"
        )


def main():
    try:
        conn = get_connection()
        attribution_analysis(conn)
    except Exception as e:
        print(f"Attribution analysis failed: {e}")
        traceback.print_exc()
    finally:
        if "conn" in locals():
            conn.close()


if __name__ == "__main__":
    main()
