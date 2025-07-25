import sqlite3
from dataclasses import dataclass


@dataclass
class IdentityToMap:
    uid_mapping_id: int
    dii: str
    dii_type: str


def get_connection(db_path: str = "uid_mapping.db") -> sqlite3.Connection:
    """Get SQLite database connection with Row factory enabled"""
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row  # Enable dict-like access
    return conn


def create_uid_mapping_table(conn: sqlite3.Connection) -> None:
    """Create uid_mapping table with all necessary indexes"""
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS uid_mapping (
            uid_mapping_id INTEGER PRIMARY KEY AUTOINCREMENT,
            dii TEXT NOT NULL,
            dii_type TEXT NOT NULL CHECK (dii_type IN ('email', 'phone')),
            current_uid TEXT,
            previous_uid TEXT,
            refresh_from TIMESTAMP,
            opt_out BOOLEAN DEFAULT FALSE
        )
    """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_mapping_query 
        ON uid_mapping(opt_out, current_uid, refresh_from)
    """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_uid_mapping_current_uid 
        ON uid_mapping(current_uid)
    """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_uid_mapping_previous_uid 
        ON uid_mapping(previous_uid)
    """
    )

    conn.commit()


def create_attribution_tables(conn: sqlite3.Connection) -> None:
    """Create impressions and conversions tables with all necessary indexes"""
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS impressions (
            impression_id INTEGER PRIMARY KEY AUTOINCREMENT,
            uid TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL,
            campaign_id TEXT NOT NULL
        )
    """
    )

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS conversions (
            conversion_id INTEGER PRIMARY KEY AUTOINCREMENT,
            uid TEXT NOT NULL,
            timestamp TIMESTAMP NOT NULL,
            conversion_value REAL NOT NULL
        )
    """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_impressions_uid 
        ON impressions(uid)
    """
    )

    cursor.execute(
        """
        CREATE INDEX IF NOT EXISTS idx_conversions_uid 
        ON conversions(uid)
    """
    )

    conn.commit()


def create_complete_database_schema(conn: sqlite3.Connection) -> None:
    """Create complete database schema with all tables and indexes"""
    create_uid_mapping_table(conn)
    create_attribution_tables(conn)
