import os
import time
import pytest
from dotenv import load_dotenv
from uid2_client import IdentityMapClient, IdentityMapInput

load_dotenv()

"""
!!!!! Do not refactor this code if you're not intending to change the documentation samples !!!!!

Tests for sample code as used in https://unifiedid.com/docs/endpoints/post-identity-map-v3
The tests are designed to have sections of almost exactly copy/pasted code samples so there are
unused variables, unnecessary comments, redundant repetition... since those are used in docs for illustration.
If a test breaks in this file, likely the change breaks one of the samples on the docs site
"""


@pytest.fixture(scope="module")
def test_config():
    return {
        "UID2_BASE_URL": os.getenv("UID2_BASE_URL"),
        "UID2_API_KEY": os.getenv("UID2_API_KEY"),
        "UID2_SECRET_KEY": os.getenv("UID2_SECRET_KEY"),
        "mapped_email": "user@example.com",
        "opted_out_email": "optout@example.com",
    }


@pytest.fixture(scope="module")
def identity_map_client(test_config):
    return IdentityMapClient(
        test_config["UID2_BASE_URL"],
        test_config["UID2_API_KEY"],
        test_config["UID2_SECRET_KEY"]
    )


def test_endpoint_url_update_example():
    """
    Documentation post-identity-map.md Lines 223-229: Update Endpoint URL
    """
    # Before (V2)
    url = '/v2/identity/map'
    
    # After (V3) 
    url = '/v3/identity/map'
    
    # Verify the URL update
    assert url == '/v3/identity/map'


def test_v2_response_parsing_example():
    """
    Documentation post-identity-map.md Lines 235-242: V2 Response Parsing
    """
    # Mock V2 response structure
    response = {
        'body': {
            'mapped': [
                {
                    'identifier': 'EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=',
                    'advertising_id': 'AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=',
                    'bucket_id': 'a30od4mNRd'
                }
            ]
        }
    }
    
    def store_mapping(original_identifier, raw_uid, bucket_id):
        # Store mapping using identifier as key
        assert original_identifier is not None
        assert raw_uid is not None
        assert bucket_id is not None
    
    # V2: Process mapped/unmapped objects with identifier lookup
    for item in response['body']['mapped']:
        raw_uid = item['advertising_id']
        bucket_id = item['bucket_id']
        original_identifier = item['identifier']
        # Store mapping using identifier as key
        store_mapping(original_identifier, raw_uid, bucket_id)


def test_v3_response_parsing_example():
    """
    Documentation post-identity-map.md Lines 246-258: V3 Response Parsing
    """
    # Mock V3 response structure
    response = {
        'body': {
            'email': [
                {
                    'u': 'AdvIvSiaum0P5s3X/7X8h8sz+OhF2IG8DNbEnkWSbYM=',
                    'p': 'EObwtHBUqDNZR33LNSMdtt5cafsYFuGmuY4ZLenlue4=',
                    'r': 1735689600000
                },
                {'e': 'invalid identifier'}
            ]
        }
    }
    
    # Mock request data
    request_emails = ['user@example.com', 'invalid@email']
    
    def store_mapping(original_email, current_uid, previous_uid, refresh_from):
        assert original_email is not None
        assert current_uid is not None
        assert refresh_from is not None
        
    def handle_unmapped(original_email, reason):
        assert original_email is not None
        assert reason is not None
    
    # V3: Process array-indexed responses
    for index, item in enumerate(response['body']['email']):
        original_email = request_emails[index]  # Use array index to correlate
        if 'u' in item:
            # Successfully mapped
            current_uid = item['u']
            previous_uid = item.get('p')  # Available for 90 days after rotation, otherwise None
            refresh_from = item['r']
            store_mapping(original_email, current_uid, previous_uid, refresh_from)
        elif 'e' in item:
            # Handle unmapped with reason
            handle_unmapped(original_email, item['e'])


def test_refresh_timestamp_logic_example():
    """
    Documentation post-identity-map.md Lines 264-273: Replace Salt Bucket Monitoring with Refresh Timestamp Logic
    """
    import time

    def is_refresh_needed(mapping):
        now = int(time.time() * 1000)  # Convert to milliseconds
        return now >= mapping['refresh_from']
    
    def remap_identities(to_remap):
        # Mock function to remap identities
        assert to_remap is not None
        return True

    # Mock mappings data
    current_time = int(time.time() * 1000)
    mappings = [
        {
            'identifier': 'user1@example.com',
            'refresh_from': current_time + 3600000  # 1 hour in future
        },
        {
            'identifier': 'user2@example.com', 
            'refresh_from': current_time - 3600000  # 1 hour in past (needs refresh)
        }
    ]

    # Check individual mappings for refresh needs
    to_remap = [mapping for mapping in mappings if is_refresh_needed(mapping)]
    remap_identities(to_remap)
    
    # Verify refresh logic
    assert len(to_remap) == 1  # Only one mapping should need refresh
    assert to_remap[0]['identifier'] == 'user2@example.com'


def test_integration_example(identity_map_client, test_config):
    """
    Integration test with actual API calls to verify the patterns work
    """
    # Test with actual API client
    identity_map_input = IdentityMapInput.from_emails([test_config["mapped_email"]])
    response = identity_map_client.generate_identity_map(identity_map_input)
    
    # Verify response structure
    assert response is not None
    assert hasattr(response, 'mapped_identities')
    assert hasattr(response, 'unmapped_identities')
    
    # Verify at least some processing occurred
    total_processed = len(response.mapped_identities) + len(response.unmapped_identities)
    assert total_processed >= 1