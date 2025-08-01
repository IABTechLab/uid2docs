# UID2 Integration Technical Sample

**Complete UID2 integration example demonstrating Identity Map v3 flow.**

This sample shows a pattern for mapping email addresses and phone numbers to UID2 tokens, handling optouts, managing token refresh cycles, and performing a sample attribution analysis based on both current and previous UID2s.

## Project Structure

```
identity-map-integration-example/
├── src/                          # Python source code
│   ├── complete_demo.py         # End-to-end demo workflow
│   ├── map_identities.py        # Core UID2 mapping logic
│   ├── attribution_analysis.py  # Attribution analysis example
│   ├── config.py                # Configuration loading
│   ├── database.py              # Database schema and utilities
│   ├── uid_client_wrapper.py    # UID2 client with retry logic
│   └── populate_*.py           # Test data generation scripts
├── .env                         # UID2 credentials (create from .env.example)
├── pyproject.toml              # Project configuration
└── README.md                   # This file
```

## Quick Start

### 1. Install Dependencies
```bash
# Install uv (Python package manager)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install project dependencies
uv sync
```

### 2. Configure UID2 Credentials
```bash
cp .env.example .env
# Edit .env with your UID2 integration credentials
```

Required `.env` format:
```
UID2_BASE_URL=operator-integ.uidapi.com
UID2_API_KEY=your_api_key_here
UID2_SECRET_KEY=your_secret_key_here
```

### 3. Run Complete Demo
```bash
# Full workflow: test data population → UID2 mapping → attribution analysis
uv run src/complete_demo.py
```

### 4. Run Individual Components
```bash
# Generate test data only
uv run src/populate_test_uid_mappings.py

# Run UID2 mapping only  
uv run src/map_identities.py

# Run attribution analysis only
uv run src/attribution_analysis.py
```

## Core UID2 Integration Patterns

### Identity Mapping Workflow

**Key Integration Points:**
1. **Batch Processing** (`src/map_identities.py:build_uid2_input()`) - Process sequential batches of up to 5,000 emails and/or phone numbers per request
2. **Retry Logic** (`src/uid_client_wrapper.py:generate_identity_map_with_retry()`) - Exponential backoff for network resilience
3. **Response Handling** (`src/map_identities.py:process_uid2_response()`) - Process mapped, opted-out, and invalid identifiers

## Sample Database Schema

**Core `uid_mapping` table:**
```sql
CREATE TABLE uid_mapping (
    uid_mapping_id INTEGER PRIMARY KEY,
    dii TEXT NOT NULL,                    -- Email or phone (+E.164)
    dii_type TEXT NOT NULL,               -- 'email' or 'phone' 
    current_uid TEXT,                     -- Current UID2 token
    previous_uid TEXT,                    -- Previous UID2 token (only available for 90 days after rotation, afterwards NULL)
    refresh_from TIMESTAMP,               -- When to refresh mapping
    opt_out BOOLEAN DEFAULT FALSE         -- The user has opted out, we shouldn't attempt to map this user again
);
```

**Key business logic queries:**
```sql
-- Records needing mapping (never mapped + refresh expired)
SELECT uid_mapping_id, dii, dii_type 
FROM uid_mapping 
WHERE opt_out = FALSE 
AND (current_uid IS NULL OR refresh_from < datetime('now'));

-- Attribution joins using both current and previous UID2s
SELECT * FROM impressions imp 
JOIN uid_mapping um ON (imp.uid = um.current_uid OR imp.uid = um.previous_uid)
WHERE um.opt_out = FALSE;
```

## Script Reference

| Script | Purpose | Key Integration Concepts                         |
|--------|---------|--------------------------------------------------|
| `src/populate_test_uid_mappings.py` | Creates 100k test records | Database schema, DII formatting                  |
| `src/map_identities.py` | **Core UID2 mapping logic** | Batch processing, retry logic, response handling |
| `src/populate_test_conversions_impressions.py` | Attribution demo data | UID2 token usage in measurement                  |
| `src/attribution_analysis.py` | Attribution analysis | Cross-UID2 joins, measurement patterns           |
| `src/complete_demo.py` | End-to-end workflow | Full integration validation                      |

## Production Integration Checklist

**Patterns for UID2 Integration:**

✅ **Request Limits**: Maximum 5,000 emails and/or phone numbers per request  
✅ **Sequential Processing**: No parallel requests to UID2 service  
✅ **Retry Logic**: Exponential backoff for network failures  
✅ **Optout Handling**: Permanent exclude opted out users from future processing
✅ **Raw UID2 Refresh**: Re-map raw UID2s when they reach `refresh_from` timestamps  
✅ **State Persistence**: Track mapping state
