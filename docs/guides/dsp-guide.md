---
title: DSP Integration
sidebar_label: DSP Integration Guide
description: A guide for DSPs who transact on UID2s in the bid stream.
hide_table_of_contents: false
sidebar_position: 05
---

# DSP Integration Guide

This guide is for DSPs who transact on UID2s in the bid stream.

DSPs receive UID2 tokens in bid requests, and decrypt the UID2 tokens to arrive at raw UID2s that they can use for bidding, using one of the server-side SDKs that support this function.

For a summary of available server-side SDKs, see [SDKs - Summary](../sdks/summary-sdks.md).

>NOTE: If your back end is written in a language not covered by one of the available server-side SDKs, ask your UID2 contact in case there is additional information available to help you. If you're not sure who to ask, see [Contact Info](../getting-started/gs-account-setup.md#contact-info).

<!-- It includes the following sections:

* [Integration Steps](#integration-steps)
   - [Honor User Opt-Outs](#honor-user-opt-outs)

* [FAQs](#faqs) -->

## Integration Steps 

The following describes the integration workflow for DSP to support UID2 as part of RTB, which consists of two major steps:
1. [Honor user opt-outs](#honor-user-opt-outs)
2. [Decrypt UID2 tokens for RTB use](#decrypt-uid2-tokens-for-rtb-use)

![DSP Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBTU1BcbiAgICBwYXJ0aWNpcGFudCBEU1BcbiAgICBwYXJ0aWNpcGFudCBVSUQyIGFzIFVJRDIgU2VydmljZVxuICAgIHBhcnRpY2lwYW50IFRDIGFzIFRyYW5zcGFyZW5jeSAmIENvbnNlbnQgUG9ydGFsXG4gICAgTm90ZSBvdmVyIFUsVEM6IDEuIEhvbm9yIHVzZXIgb3B0LW91dHMuXG4gICAgVS0-PlRDOiAxLWEuIFVzZXIgb3B0cyBvdXQuXG4gICAgYWN0aXZhdGUgVENcbiAgICBUQy0-PlVJRDI6IDEtYi4gVUlEMiBzZXJ2aWNlIHJlY2VpdmVzIG9wdC1vdXQuXG4gICAgZGVhY3RpdmF0ZSBUQ1xuICAgIGFjdGl2YXRlIFVJRDJcbiAgICBVSUQyLT4-RFNQOiAxLWMuIERTUCByZWNlaXZlcyBvcHQtb3V0LlxuICAgIGRlYWN0aXZhdGUgVUlEMlxuICAgIE5vdGUgb3ZlciBVLFRDOiAyLiBEZWNyeXB0IFVJRDIgdG9rZW5zIHRvIHVzZSBpbiBSVEIuXG4gICAgU1NQLS0-PkRTUDogVGhlIFNTUCBjYWxscyBhIERTUCBmb3IgYmlkLlxuICAgIERTUC0-PkRTUDogMi1hLiBEZWNyeXB0IFVJRDIgdG9rZW5zLlxuICAgIERTUC0-PkRTUDogMi1iLiBFeGVjdXRlIGJpZGRpbmcgbG9naWMsIGhvbm9yaW5nIHVzZXIgb3B0LW91dHMuXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZm9yZXN0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

### Honor User Opt-Outs

To receive and honor user opt-outs from the UID2 service, the DSP establishes a pre-configured interface (an opt-out webhook/API endpoint) and provides it to the UID2 service during onboarding. When a user opts out, the UID2 service sends the user's raw UID2 and the corresponding opt-out timestamp to the pre-configured interface.

The UID2 service sends the following data within seconds of a user's opt-out, which the DSP records and uses the bidding logic defined in [Decrypt UID2 Tokens for RTB Use](#decrypt-uid2-tokens-for-rtb-use).

| Parameter | Description |
| :--- | :--- |
| `identity` | The raw UID2 for the user who opted out. |
| `timestamp` | The time when the user opted out (for information only). |

The following example illustrates a webhook configured to receive the raw UID2 and the corresponding timestamp:

```html
https://dsp.example.com/optout?user=%%identity%%&optouttime=%%timestamp%%
```
#### Bidding Opt-Out Logic

Use the logic below during bidding (2-b) to honor a user's opt-out.

Leverage one of the server-side SDKs (see [SDKs](../sdks/summary-sdks.md)) to decrypt incoming UID2 tokens into raw UID2s. The response to the decrypt function contains the raw UID2. 

The following diagram illustrates opt-out logic.

![DSP Opt-Out Check](images/dsp-guide-optout.png)

If the user has opted out, the UID2 must not be used for RTB. In these cases, the DSP can choose to send an alternate ID for bidding or can choose not to bid.

### Decrypt UID2 Tokens for RTB Use

The following table provides details for Step 2 of the workflow diagram shown in [Integration Steps](#integration-steps).

| Step | SDK | Description |
| :--- | :--- | :--- |
| 2-a | Server-side SDK (see [SDKs](../sdks/summary-sdks.md)) | Leverage the provided SDK to decrypt incoming UID2 tokens. The response contains the `UID2` and the UID2 creation time. |
| 2-b | | DSPs are required to honor opt-out protocol for UID2s. For details on configuring user opt-outs and honoring them during bidding, see [Honor user opt-outs](#honor-user-opt-outs). |

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for Demand-Side Platforms (DSPs)](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps).
