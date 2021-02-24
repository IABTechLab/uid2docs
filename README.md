# Unified ID 2.0 API Documentation

## Table Of Contents
* [Overview](#overview)
* [Environment](#environment)
* [Authentication](#authentication)
* [Error Codes](#error-codes)
* [Email Normalization](#email-normalization)
* [Encoding Query Parameter Values](#encode-query-parameter-values)
* [Endpoints](#endpoints)
* [Integration Workflows](#integration-workflows)
* [License](#license)


## Overview

**Building a better foundation for identity on the open internet**

Relevant advertising enables content providers to produce the content we’ve all come to enjoy, whether it’s mobile apps, streaming TV, or web experiences. This value exchange has not always been well understood, communicated, or managed. As the industry moves away from its reliance on the third-party cookie and device IDs, there’s an opportunity to create a new and better approach to identity for the open internet. We’re building on the work of the IAB Tech Lab and partnering across the industry to develop an open-source ID framework. Built from hashed and encrypted email addresses, this ID will remain open and ubiquitous while introducing significant upgrades to consumer privacy and transparency.

**Key Benefits**

+ Open source and interoperable: The ID framework will be open source and available for free  for everyone. 
+ Secured technology: Emails will be hashed, salted, and encrypted to prevent abuse. Regular rotation of decryption keys will help enforce accountability measures.
+ Independently governed: Participants will agree to a code of conduct as well as regular audits, managed by an independent body.
+ User transparency and control: Consumers will be able to easily view and manage their preferences and opt out at any time.


## Environment 

All UID2 endpoints use the same base URL.

| Environment | Base URL |
| --- | --- |
| Testing | ```https://integ.uidapi.com/v1``` |

e.g. https://integ.uidapi.com/v1/token/generate

## Authentication

Authenticate to UID2 endpoints using a bearer token in the request's authorization header. Contact %placeholder% to request a bearer token.

```Authorization: Bearer YourTokenBV3tua4BXNw+HVUFpxLlGy8nWN6mtgMlIk=```

## Email Normalization

When sending email addresses in a request, normalize email addresses prior to sending.

1. Remove leading and trailing spaces.
2. Remove `.` (ASCII code 46) from the username of the email address. `jane.doe@example.com` normalizes to `janedoe@example.com`.
3. Remove `+` (ASCII code 43) and all subsequent characters from the username of the email address. `janedoe+home@example.com` normalizes to `janedoe@example.com`.
4. Convert all ASCII characters to lowercase.

## Encoding Query Parameter Values

When passing query parameter values in with a request, ensure the query parameter value is URL-encoded. Use Javascript's `encodeURIcomponent()` or your coding language's equivalent.

## Response Structure and Status Codes

All endpoints return responses utilizing the following body and status messaging structure. The `status` property may include endpoint-specific values. The `message` property returns additional ifnormation for non-`success` statuses.

```json
{
​	"status": [success|unauthorized|client_error|...]
​    "body": {
            "property": "propertyValue"
            }
​    "message": "Descriptive message"
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

[Click here to view an endpoint listing.](/v1/endpoints/README.md)

## Integration Guides
See Integration guides [here](/v1/guides/README.md)

## License
All work, articafts are licensed under the Apache License, Version 2.0. See [LICENSE](http://www.apache.org/licenses/LICENSE-2.0.txt) for the full license text.
