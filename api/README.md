# Unified ID 2.0 API Documentation

## Table Of Contents
* [Overview](#overview)
* [Contact Info](#contact-info)
* [Environment](#environment)
* [Authentication](#authentication)
* [Email Normalization](#email-normalization)
* [Encoding Query Parameter Values](#encoding-query-parameter-values)
* [Encoding Email Hashes](#encoding-email-hashes)
* [Response Structure and Status Codes](#response-structure-and-status-codes)
* [Endpoints](#endpoints)
* [Integration Guides](#integration-guides)
* [License](#license)


## Overview

[Learn more about Unified ID 2.0 here.](../README.md)

## Contact Info

For access to UID2, contact the relevant team at The Trade Desk shown below. Contacting The Trade Desk for access is temporary. When the system moves to independent governance, the governing organizations will handle access requests.

| If you are a... | Contact Email |
| --- | --- |
| App Developer<br>Publisher | UID2publishers@thetradedesk.com |
| Agency<br>Brand<br>CDP<br>Data Provider<br>DSP<br>SSP | UID2partners@thetradedesk.com |

## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| --- | --- |
| Testing | ```https://integ.uidapi.com/v1``` |
| Production | ```https://prod.uidapi.com/v1``` |

e.g. https://integ.uidapi.com/v1/token/generate

## Authentication

Authenticate to UID2 endpoints using a bearer token in the request's authorization header. 

```Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=```

## Email Normalization

When sending email addresses in a request, normalize email addresses prior to sending.

1. Remove leading and trailing spaces.
2. Convert all ASCII characters to lowercase.

## Encoding Query Parameter Values

When passing query parameter values in with a request, ensure the query parameter value is URL-encoded. Use Javascript's `encodeURIcomponent()` or your coding language's equivalent.

## Encoding Email Hashes

Email hashes are base64-encoded SHA256 hashes of the normalized email address.

| Type | Example | Use |
| --- | --- | --- |
| Email | `user@example.com` | |
| SHA256 of email | `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514` | |
| base64-encoded SHA256 of email | `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=` | Use this encoding for `email_hash` values sent in the request body. |
| URL-encoded, base64-encoded SHA256 of email| `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf%2FF5HVRQ%3D` | Use this encoding for `email_hash` query parameter values. |

## Response Structure and Status Codes

All endpoints return responses utilizing the following body and status messaging structure. The `status` property may include endpoint-specific values. The `message` property returns additional information for non-`success` statuses.

```json
{
    "status": "success",
    "body": {
        "property": "propertyValue"
    },
    "message": "Descriptive message"
}
```

| Status | HTTP Status Code | Additional Notes |
| --- | --- | --- |
| `success` | 200 | |
| `optout` | 200 | This status only returns for authorized requests. The user opted out. |
| `client_error` | 400 | See the `message` field for more information about missing or invalid parameters. |
| `invalid_token` | 400 | This status only returns for authorized requests. The request specified an invalid identity token. |
| `unauthorized` | 401 | The request did not include a bearer token, included an invalid bearer token, or included a bearer token unauthorized to perform the requested action. |

## Endpoints

[Click here to view an endpoint listing.](./v1/endpoints/README.md)

## Integration Guides
[Click here to view integration guides.](./v1/guides/README.md)

## License
All work and artifacts are licensed under the Apache License, Version 2.0. See [LICENSE](http://www.apache.org/licenses/LICENSE-2.0.txt) for the full license text.
