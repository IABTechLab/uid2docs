[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > RTB SDK

# RTB SDK Client

The UID2 RTB SDK facilitates decrypting UID2 tokens to access the raw UID2. 

The following functions define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined below.

Libraries are currently available in the following languages. More languages are in development. 

+ C# 
+ C++

## Initialization

The initialization function configures the parameters necessary for the SDK to authenticate with the UID2 service. It also allows you to configure retry intervals in the event of errors.

| Parameter | Description |
| --- | --- | 
| `endpoint` | Endpoint for UID2 service |
| `authKey` | Authentication token belonging to the client. See [Contact Info](../../README.md#contact-info) for more information on how to access UID2. |
| `refreshIntervalMs` | Refresh cadence in milliseconds for fetching the decryption keys<br>Recommended value: 5 minutes (`300,000` milliseconds) |
| `retryIntervalMs` | Retry cadence in milliseconds to retry the request when encountering an error<br> Recommended value: 30 seconds (`30,000` milliseconds) |


## Interface 

The interface allows you to decrypt UID2 tokens and return the corresponding UID2. Using the SDK, you do not need to store or manage decryption keys.

During RTB, call the interface to decrypt a UID2 token and return the UID2. [View our DSP Guide for more information about bidding logic to handle user opt-outs.](../guides/dsp-guide.md)

```java
public Response Decrypt(String encryptedToken)
```

Available information returned through the SDK is outlined below.

| Property | Description |
| --- | --- |
| `Status` | The decryption result status. See a list of response statuses and their definitions in the table below. |
| `UID2` | The UID2 for the corresponding UID2 token. |
| `Established` | The timestamp at which a user first established the UID2 with the publisher. |


Response Statuses

| Value | Description |
| --- | --- |
| `Success` | The UID2 token decrypted successfully and a UID2 was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to decrypt this UID2 token.|
| `NotInitialized` | The client library is waiting to be initialized. |
| `InvalidPayload` | The incoming UID2 token is not a valid payload. |
| `ExpiredToken` | The incoming UID2 token is expired. |
| `KeysNotSynced` | The client has failed to synchronize keys from UID2 service. |
| `VersionNotSupported` |  The client library does not support the encrypted token's version. |


