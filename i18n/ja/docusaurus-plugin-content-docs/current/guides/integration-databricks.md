---
title: Databricks Integration
sidebar_label: Databricks
pagination_label: Databricks Integration
description: Information about integrating with UID2 through Databricks. 
hide_table_of_contents: false
sidebar_position: 04
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# Databricks Clean Rooms Integration Guide

This guide is for advertisers and data providers who want to convert their user data to raw UID2s in a Databricks environment.

## Integration Overview

[Databricks Clean Rooms](https://docs.databricks.com/aws/en/clean-rooms/) is a Databricks data warehousing solution, where you as a partner can store your data and integrate with the UID2 framework. Using Databricks Clean Rooms, UID2 enables you to securely share consumer identifier data without exposing sensitive <Link href="../ref-info/glossary-uid#gl-dii">directly identifying information (DII)</Link>.

In the context of UID2, you set up the Databricks Clean Rooms environment and place your data there. You set up a trust relationship with the UID2 Operator and allow the Operator to convert your data to raw UID2s.

With UID2 supported in the clean room, advertisers and data partners can securely process their first-party data within Databricks.

[**GWH__EE01 is it only first-party data, or just data? If they're just sending phone numbers and emails, I don't see what the difference is... it's just data?**]

[**GWH__EE02 Please provide any additional content you want in the overview. Thx.**]

<!-- 
## Databricks Partner Network Listing

[**GWH__EE or MC for listing update when available. https://www.databricks.com/company/partners/technology?**] 
-->

## Functionality

The following table summarizes the functionality available with the UID2 Databricks integration.

| Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s |
| :--- | :--- | :--- | :--- | :--- |
| &#8212; | &#8212; | &#8212; | &#8212; | &#9989; |

## Key Benefits

Here are some key benefits of integrating with Databricks for your UID2 processing:

- Native support for managing UID2 workflows within a Databricks data clean room.
- Secure identity interoperability between partner datasets.
- Direct lineage and observability for all UID2-related transformations and joins, for auditing and traceability.
- Streamlined integration between UID2 identifiers and The Trade Desk activation ecosystem.
- Self-service support for marketers and advertisers through Databricks.

## Integration Steps

At a high level, the following are the steps to set up your Databricks integration and process your data:

1. [Create a clean room for UID2 collaboration](#create-clean-room-for-uid2-collaboration).
1. [Send your Databricks sharing identifier to your UID2 contact](#send-sharing-identifier-to-uid2-contact).
1. [Add data to the clean room](#add-data-to-the-clean-room).
1. [Map DII](#map-dii) by running the clean room notebook.

### Create Clean Room for UID2 Collaboration

As a starting point, create a Databricks Clean Rooms environment&#8212;a secure environment for you to collaborate with UID2 to process your data.

Follow the steps in [Create clean rooms](https://docs.databricks.com/aws/en/clean-rooms/create-clean-room) in the Databricks documentation. Use the correct sharing identifier based on the [UID2 environment](../getting-started/gs-environments) you want to connect to: see [UID2 Sharing Identifiers](#uid2-sharing-identifiers).

:::important
After you've created a clean room, you cannot change its collaborators. If you have the option to set clean room collaborator aliases&#8212;for example, if you’re using the Databricks Python SDK to create the clean room&#8212;your collaborator alias must be `creator` and the UID2 collaborator alias must be `collaborator`. If you’re creating the clean room using the Databricks web UI, the correct collaborator aliases are set for you.
:::

### Send Sharing Identifier to UID2 Contact

To establish a relationship with your UID2 contact, you'll need to send the Databricks sharing identifier.

The sharing identifier is a string in this format: `<cloud>:<region>:<uuid>`.

Follow these steps:

1. Find the sharing identifier for the Unity Catalog metastore that is attached to the Databricks workspace where you’ll work with the clean room.

   For information on how to find this value, see [Finding a Sharing Identifier](#finding-a-sharing-identifier).
1. Send the sharing identifier to your UID2 contact.

### Add Data to the Clean Room

Add one or more tables or views to the clean room. You can use any names for the schema, tables, and views. Tables and views must follow the schema detailed in [Input Table](#input-table ).

### Map DII

Run the `identity_map_v3` Databricks Clean Rooms [notebook](https://docs.databricks.com/aws/en/notebooks/) to map email addresses, phone numbers, or their respective hashes to raw UID2s.

A successful notebook run results in raw UID2s populated in the output table. For details, see [Output Table](#output-table).

## Running the Clean Rooms Notebook

This section provides details to help you use your Databricks Clean Rooms environment to process your DII into raw UID2s, including the following:

- [Notebook Parameters](#notebook-parameters)
- [Input Table](#input-table)
- [DII Format and Normalization](#dii-format-and-normalization)
- [Output Table](#output-table)
- [Output Table Schema](#output-table-schema)

### Notebook Parameters

You can use the `identity_map_v3` notebook to map DII in any table or view that you've added to the `creator` catalog of the clean room.

The notebook has two parameters, `input_schema` and `input_table`. Together, these two parameters identify the table or view in the clean room that contains the DII to be mapped.

For example, to map DII in the clean room table named `creator.default.emails`, set `input_schema` to `default` and `input_table` to `emails`.

| Parameter Name | Description |
| :--- | :--- |
| `input_schema` | The schema containing the table or view. |
| `input_table` | The name you specify for the table or view containing the DII to be mapped. |

### Input Table

The input table or view must have the two columns shown in the following table. The table or view can have additional columns, but the notebook doesn't use any additional columns, only these two.

| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `INPUT` | string | The DII to map. |
| `INPUT_TYPE` | string | The type of DII to map. Allowed values: `email`, `email_hash`, `phone`, and `phone_hash`. |

### DII Format and Normalization

The normalization requirements depend on the type of DII you're processing, as follows:

- **Email address**: The notebook normalizes the data using the UID2 [Email Address Normalization](../getting-started/gs-normalization-encoding#email-address-normalization) rules.
- **Phone number**: You must normalize the phone number before mapping it with the notebook, using the UID2 [Phone Number Normalization](../getting-started/gs-normalization-encoding#phone-number-normalization) rules.

### Output Table

If the clean room has an output catalog, the mapped DII is written to a table in the output catalog. Output tables are stored for 30 days.

For details, see [Overview of output tables](https://docs.databricks.com/aws/en/clean-rooms/output-tables#overview-of-output-tables) in the Databricks documentation.

### Output Table Schema

The following table provides information about the structure of the output data, including field names and values.

| Column Name | Data Type | Description |
| :--- | :--- | :--- |
| `UID` | string | The value is one of the following:<ul><li>**DII was successfully mapped**: The UID2 associated with the DII.</li><li>**Otherwise**: `NULL`.</li></ul> |
| `PREV_UID` | string | The value is one of the following:<ul><li>**DII was successfully mapped and the current raw UID2 was rotated in the last 90 days**: the previous raw UID2.</li><li>**Otherwise**: `NULL`.</li></ul> |
| `REFRESH_FROM` | timestamp | The value is one of the following:<ul><li>**DII was successfully mapped**: The timestamp indicating when this UID2 should be refreshed.</li><li>**Otherwise**: `NULL`.</li></ul> |
| `UNMAPPED` | string | The value is one of the following:<ul><li>**DII was successfully mapped**: `NULL`.</li><li>**Otherwise**: The reason why the identifier was not mapped: `OPTOUT`, `INVALID IDENTIFIER`, or `INVALID INPUT TYPE`.<br/>For details, see [Values for the UNMAPPED Column](#values-for-the-unmapped-column).</li></ul> |

#### Values for the UNMAPPED Column

The following table shows possible values for the `UNMAPPED` column in the output table schema.

| Value | Meaning |
| :--- | :--- |
| `NULL` | The DII was successfully mapped. |
| `OPTOUT` | The user has opted out. |
| `INVALID IDENTIFIER` | The email address or phone number is invalid. |
| `INVALID INPUT TYPE` | The value of `INPUT_TYPE` is invalid. Valid values for `INPUT_TYPE` are: `email`, `email_hash`, `phone`, `phone_hash`. |

## Testing in the Integ Environment

If you'd like to test the Databricks Clean Rooms implementation before signing a UID2 POC, you can ask your UID2 contact for access in the integ (integration) environment. This environment is for testing only, and has no production data.

In the request, be sure to include your sharing identifier, and use the sharing identifier for the UID2 integration environment. For details, see [UID2 Sharing Identifiers](#uid2-sharing-identifiers).

While you're waiting to hear back, you could create the clean room, invite UID2, and put your assets into the clean room. For details, see [Integration Steps](#integration-steps).

When your access is ready, your UID2 contact notifies you.

## Reference

This section includes the following reference information:

- [UID2 Sharing Identifiers](#uid2-sharing-identifiers)
- [Finding the Sharing Identifier for Your UID2 Contact](#finding-the-sharing-identifier-for-your-uid2-contact)

### UID2 Sharing Identifiers

UID2 sharing identifiers can change. Be sure to check this page for the latest sharing identifiers.

| Environment | UID2 Sharing Identifier |
| :--- | :--- |
| Production | `aws:us-east-2:21149de7-a9e9-4463-b4e0-066f4b033e5d:673872910525611:010d98a6-8cf2-4011-8bf7-ca45940bc329` |
| Integration | `aws:us-east-2:4651b4ea-b29c-42ec-aecb-2377de70bbd4:2366823546528067:c15e03bf-a348-4189-92e5-68b9a7fb4018` |

### Finding a Sharing Identifier

To find the sharing identifier for your UID2 contact, follow these steps:

In your Databricks workspace, in the Catalog Explorer, click **Catalog**.

At the top, click the gear icon and select **Delta Sharing**.

On the **Shared with me** tab, in the upper right, click your Databricks sharing organization and then select **Copy sharing identifier**.

For details, see [Request the recipient's sharing identifier](https://docs.databricks.com/aws/en/delta-sharing/create-recipient#step-1-request-the-recipients-sharing-identifier) in the Databricks documentation.
