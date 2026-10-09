# UID2 documentation Python tests

This directory contains Python tests for the code samples in the [POST /identity/map v3 documentation](../../docs/endpoints/post-identity-map.md). The tests verify that the Python code examples in the documentation work correctly and demonstrate proper usage patterns.

The intention is not to test the UID2 features or clients - we assume those work based on other tests. 

## Quick start

### Prerequisites

1. **Install UV** (Python package manager):
   ```bash
   pip install uv
   ```

## Environment configuration
Fill the following environment variables into the `.env` file. The file is gitignored.
- `UID2_BASE_URL` - Integration environment endpoint
- `UID2_API_KEY` - Test API key
- `UID2_SECRET_KEY` - Test secret key

### Run tests
```bash
cd test/python
uv run pytest
```
