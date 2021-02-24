[UID2 Documentation](../../README.md) > v1 > [SDKs](./README.md) > RTB Sdk

# RTB Bidding SDK Client

The UID2 Client facilitates decrypting the UID Tokens and accessing UID.

The following describes general contract for client SDKs. Naming conventions and other things will be langauge specific (e.g. C# vs Go).

## Initialization

| Parameter | Description |
| --- | --- | 
| endpoint | Endpoint for UID2 Service |
| authKey | Authentication Token belonging to the client |
| refreshIntervalMs | Refresh cadence for fetching the keys the Decrypting keys (in milliseconds). Recommended Value: 5 minutes |
| retryIntervalMs | Retry cadence in case of error (in milliseconds). Recommended Value: 30 seconds |


## Interface 

The following method is called on the client SDK at real time bidding.


```java
public Response Decrypt(String encryptedToken)
```

Response consists of following properties
| Property | Description |
| --- | --- |
| Status | Status indicating the result of decryption. See ResponseStatus enum below |
| Uid2 | UID2 identifying the user |
| Established | Timestamp at which the User established the UID2 on the Publisher |


ResponseStatus:

| Value | Description |
| --- | --- |
| Success | UIDToken was successfully decrypted |
| NotAuthorizedForKey | The client does not have the right to decrypt this Identity|
| NotInitialized | The client library is still waiting to be initialized |
| InvalidPayload | The incoming encryptedToken is not a valid payload |
| ExpiredToken | The incoming token is Expired |
| KeysNotSynced | The client has failed to synchronize keys from UID2 Service |
| VersionNotSupported |  The Client library does not suppert that version of the encrypted token |


