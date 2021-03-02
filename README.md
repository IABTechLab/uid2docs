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

Addressable advertising enables publishers and developers to provide the content and services consumers have come to enjoy, whether through mobile apps, streaming TV, or web experiences. The value exchange of the open internet has not always been well understood by, or communicated to, consumers. As the industry reduces reliance on the third-party cookie, we have an opportunity to move towards a new and better approach to identity for the open internet. The improved approach empowers content creators to have value exchange conversations with consumers while giving them more control and transparency over their data. 

Unified ID 2.0 (UID2) is a deterministic identifier based on authenticated PII (e.g., email or phone number) with complete user transparency and privacy controls. The UID2 identifier ties to logged-in experiences applied to publisher websites, mobile apps, and CTV apps. With several layers of privacy protection, UID2s can safely distribute across the open internet. Initially built by The Trade Desk, operational responsibility for UID2 will transfer in mid-2021 to an independent organization. The independent organization will open-source the relevant code. UID2 is non-proprietary and accessible to constituents across the advertising ecosystem - including Advertisers, Publishers, DSPs, SSPs, SSOs, CDPs, CMPs, Identity Providers, Data Providers, and Measurement Providers - while they remain in compliance with a code of conduct. 

UID2’s goal is to enable deterministic identity for advertising opportunities on the open internet with full consumer transparency and controls. UID2 provides a collaborative framework for all constituents and a healthy, open internet by utilizing a transparent and interoperable approach. 

**Guiding Principles**

+ Independently Governed: UID2 will be operated by unbiased organizations, with the transition from The Trade Desk to independent governance anticipated mid-2021. The Trade Desk built the framework and code to transition to the independent governing body. 
+ Interoperable: UID2 is accessible to all constituents in the advertising ecosystem who abide by the code of conduct. This includes DSPs, SSPs, data providers, measurement providers, and identity services. 
+ Open Source: UID2 is transparent and offers its code open-source.   
+ Nonproprietary: UID2 provides a collaborative framework for all constituents in the advertising ecosystem who are willing to comply with a code of conduct. 
+ Secure and Privacy-Safe: UID2 leverages multiple layers of security, cryptography, and encryption to ensure user PII and data is safe. 
+ Transparency and Consent: Users understand where their ID is shared and what data is associated with it. Users have control to revoke their consent and permissions. 

**Contact Info**

If you want to contact the relevant team at The Trade Desk to access UID2, please use the email aliaes list below. Note that this is only temporary, and when the system moves to independent governance access will be through
+  UID2publishers@thetradedesk.com - If you are a publisher or developer
+  UID2partners@thetradedesk.com - If you are a brand, agency, data provider, DSP, SSP, CDP, or related company

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

All endpoints return responses utilizing the following body and status messaging structure. The `status` property may include endpoint-specific values. The `message` property returns additional information for non-`success` statuses.

```json
{
"status": [success|unauthorized|client_error|...]
"body": {
            "property": "propertyValue"
            }
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

[Click here to view an endpoint listing.](/v1/endpoints/README.md)

## Integration Guides
See Integration guides [here.](/v1/guides/README.md)

## License
All work, artifacts are licensed under the Apache License, Version 2.0. See [LICENSE](http://www.apache.org/licenses/LICENSE-2.0.txt) for the full license text.
