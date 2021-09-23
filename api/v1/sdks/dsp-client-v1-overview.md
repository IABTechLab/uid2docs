[UID2 API Documentation](../../README.md) > v1 > [SDKs](./README.md) > RTB SDK

# RTB SDK Client

The UID2 RTB SDK facilitates decrypting UID2 tokens to access the raw UID2. 

The following functions define the information that you'll need to configure or can retrieve from the library. The parameters and property names defined below are pseudocode. Actual parameters and property names vary by language but will be similar to the information outlined below.

Libraries are currently available in the following languages. More languages are in development. 

+ C# 
+ C++

## Initialization

The initialization function configures the parameters necessary for the SDK to authenticate with the UID2 service. It also allows you to configure retry intervals in the event of errors.

| Parameter | Description | Recommended Value |
| :--- | :--- | :--- |
| `endpoint` | The endpoint for UID2 service. | N/A |
| `authKey` | The authentication token that belongs to the client. For access to UID2, see [Contact Info](../../README.md#contact-info). | N/A |
| `refreshIntervalMs` | Refresh cadence (in milliseconds) for fetching the decryption keys.| 5 minutes (`300,000` milliseconds) |
| `retryIntervalMs` | Retry cadence (in millisecond) for retrying the request when encountering an error.  | 30 seconds (`30,000` milliseconds)|


## Interface 

The interface allows you to decrypt UID2 tokens and return the corresponding UID2. 

>NOTE: Using the SDK, you do not need to store or manage decryption keys.

During RTB, call the interface to decrypt a UID2 token and return the UID2. For details on the bidding logic for handling user opt-outs, see [DSP Integration Guide](../guides/dsp-guide.md).

```java
public Response Decrypt(String encryptedToken)
```

Available information returned through the SDK is outlined in the following table.

| Property | Description |
| :--- | :--- |
| `Status` | The decryption result status. For a list of response statuses and their definitions, see the following table. |
| `UID2` | The UID2 for the corresponding UID2 token. |
| `Established` | The timestamp when a user first established the UID2 with the publisher. |


Response Statuses

| Value | Description |
| :--- | :--- |
| `Success` | The UID2 token decrypted successfully and a UID2 was returned. |
| `NotAuthorizedForKey` | The requester does not have authorization to decrypt this UID2 token.|
| `NotInitialized` | The client library is waiting to be initialized. |
| `InvalidPayload` | The incoming UID2 token is not a valid payload. |
| `ExpiredToken` | The incoming UID2 token has expired. |
| `KeysNotSynced` | The client has failed to synchronize keys from UID2 service. |
| `VersionNotSupported` |  The client library does not support the version of the encrypted token. |

## FAQ

### How do SDK errors impact the DSP's ability to respond to a bid?

If there is an error, the SDK will not decrypt the UID2 token into a UID2. 
