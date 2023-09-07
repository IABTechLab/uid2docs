---
title: DSP Integration
sidebar_label: DSP Integration Guide
description: A guide for DSPs who transact on UID2s in the bid stream.
hide_table_of_contents: false
sidebar_position: 05
---

# DSP Integration Guide

This guide is for DSPs who transact on UID2s in the bid stream.<!--  (**GWH/JN _01) what actual functions do they do? 2) Do DSPs have to use SDKs? If so, which ones? I think we should list them?**)  -->

<!-- It includes the following sections:

* [Integration Steps](#integration-steps)
   - [Honor User Opt-Outs](#honor-user-opt-outs)
   - [Decrypt UID2 Tokens for RTB Use](#decrypt-uid2-tokens-for-rtb-use)
* [FAQs](#faqs) -->

## Integration Steps 

The following describes the integration workflow for DSP to support UID2 as part of RTB, which consists of two major steps:
1. [Honor user opt-outs](#honor-user-opt-outs)
2. [Decrypt UID2 tokens to use in RTB](#decrypt-uid2-tokens-for-rtb-use)<!--  (**GWH/JN_02 is this affected by mods for Sharing?**)  -->

![DSP Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIFVzZXJcbiAgICBwYXJ0aWNpcGFudCBTU1BcbiAgICBwYXJ0aWNpcGFudCBEU1BcbiAgICBwYXJ0aWNpcGFudCBVSUQyIGFzIFVJRDIgU2VydmljZVxuICAgIHBhcnRpY2lwYW50IFRDIGFzIFRyYW5zcGFyZW5jeSAmIENvbnNlbnQgUG9ydGFsXG4gICAgTm90ZSBvdmVyIFUsVEM6IDEuIEhvbm9yIHVzZXIgb3B0LW91dHMuXG4gICAgVS0-PlRDOiAxLWEuIFVzZXIgb3B0cyBvdXQuXG4gICAgYWN0aXZhdGUgVENcbiAgICBUQy0-PlVJRDI6IDEtYi4gVUlEMiBzZXJ2aWNlIHJlY2VpdmVzIG9wdC1vdXQuXG4gICAgZGVhY3RpdmF0ZSBUQ1xuICAgIGFjdGl2YXRlIFVJRDJcbiAgICBVSUQyLT4-RFNQOiAxLWMuIERTUCByZWNlaXZlcyBvcHQtb3V0LlxuICAgIGRlYWN0aXZhdGUgVUlEMlxuICAgIE5vdGUgb3ZlciBVLFRDOiAyLiBEZWNyeXB0IFVJRDIgdG9rZW5zIHRvIHVzZSBpbiBSVEIuXG4gICAgU1NQLS0-PkRTUDogVGhlIFNTUCBjYWxscyBhIERTUCBmb3IgYmlkLlxuICAgIERTUC0-PkRTUDogMi1hLiBEZWNyeXB0IFVJRDIgdG9rZW5zLlxuICAgIERTUC0-PkRTUDogMi1iLiBFeGVjdXRlIGJpZGRpbmcgbG9naWMsIGhvbm9yaW5nIHVzZXIgb3B0LW91dHMuXG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZm9yZXN0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2V9)

<!--  (**GWH/JN_03 Do we need changes to the diagram?**)  -->

### Honor User Opt-Outs

To receive and honor user opt-outs from the UID2 service, the DSP establishes a pre-configured interface and provides it to the UID2 service during onboarding. The UID2 service sends the user's UID2 token and an opt-out timestamp to the pre-configured interface. Examples of interfaces include webhooks and API endpoints.<!--  (**GWH/JN_04 can we be clearer what we're talking about here? Maybe an example or something?**)  -->

The UID2 service sends the following data within seconds of a user's opt-out, which the DSP records and uses the bidding logic defined in [Decrypt UID2 Tokens for RTB Use](#decrypt-uid2-tokens-for-rtb-use).

| Parameter | Description |
| :--- | :--- |
| `identity` | The UID2 for the user who opted out. <!--  (**GWH/JN_05 is this incorrect now? On opt-out, we don't send the identity I believe?**)  -->|
| `timestamp` | The time when the user opted out. |


The following example  illustrates a webhook configured to receive the UID2 and a corresponding timestamp:

```html
https://dsp.example.com/optout?user=%%identity%%&optouttime=%%timestamp%%
```
#### Bidding Opt-Out Logic

Use the logic below during bidding (2-b) to honor a user's opt-out.

Leverage one of the server-side SDKs (see [SDKs](../sdks/summary-sdks.md)) to decrypt incoming UID2 tokens. The response <!--  (**GWH/JN_06 to what? to the decrypt function?**)  -->contains the UID2 token and the time that the UID2 token was created, represented in the pseudocode below as `established_timestamp`. DSPs are required to check the most recent opt-out timestamp for a UID2, represented in the pseudocode below as `optout_timestamp`. <!--  (**GWH/JN_07 I see no pseudocode. Would it be a good thing to add? Or, is it the "the logic..." below perhaps? Unclear.**)  -->

The following diagram illustrates opt-out logic.

![DSP Opt-Out Check](images/dsp-guide-optout.png)

If the `established_timestamp` value is less than the `optout_timestamp` value, the user has opted out and the UID2 should not be used for RTB. In these cases, the DSP can choose to send an alternate ID for bidding or can choose not to bid.

The logic for the <b>check opt-out</b> step is the following:

```java
if (established_timestamp < optout_timestamp) {
  // Opted out
}
```

### Decrypt UID2 Tokens for RTB Use

| Step | SDK | Description |
| :--- | :--- | :--- |
| 2-a | Server-side SDK (see [SDKs](../sdks/summary-sdks.md))  | Leverage the provided SDK to decrypt incoming UID2 tokens. The response contains the `UID2` and the UID2 creation time. |
| 2-b | | DSPs are required to honor opt-out protocol for UID2s. For details on configuring user opt-outs and honoring them during bidding, see [Honor user opt-outs](#honor-user-opt-outs). |

## FAQs

For a list of frequently asked questions for DSPs, see [FAQs for Demand-Side Platforms (DSPs)](../getting-started/gs-faqs.md#faqs-for-demand-side-platforms-dsps).
