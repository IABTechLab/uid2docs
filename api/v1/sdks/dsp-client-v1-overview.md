[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > RTB Sdk

# RTB SDK Client

The UID2 RTB SDK facilitates decrypting UID2 tokens to access the raw UID2.

The following describes the general contract for client SDKs. Naming conventions and other things will be language-specific (e.g. C# vs Go).

Currently available libraries:
+ C# 
+ C++

## Initialization

| Parameter | Description |
| --- | --- | 
| `endpoint` | Endpoint for UID2 service |
| `authKey` | Authentication token belonging to the client |
| `refreshIntervalMs` | Refresh cadence in milliseconds for fetching the decryption keys<br>Recommended value: 5 minutes (`300,000` milliseconds) |
| `retryIntervalMs` | Retry cadence in milliseconds to retry the request when encountering an error<br> Recommended value: 30 seconds (`30,000` milliseconds) |


## Interface 

Call the following method during RTB.

```java
public Response Decrypt(String encryptedToken)
```

The response consists of the following properties:

| Property | Description |
| --- | --- |
| `Status` | Status indicating the result of decryption. See ResponseStatus enum below |
| `Uid2` | UID2 identifying the user |
| `Established` | Timestamp at which the User established the UID2 on the Publisher |


Response Statuses

| Value | Description |
| --- | --- |
| `Success` | UID2 token was successfully decrypted |
| `NotAuthorizedForKey` | The client does not have the right to decrypt this identity|
| `NotInitialized` | The client library is waiting to be initialized |
| `InvalidPayload` | The incoming encrypted token is not a valid payload |
| `ExpiredToken` | The incoming token is expired |
| `KeysNotSynced` | The client has failed to synchronize keys from UID2 service |
| `VersionNotSupported` |  The client library does not support the encrypted token's version |


