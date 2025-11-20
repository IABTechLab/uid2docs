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

# UID2 Databricks Clean Room Integration Guide

This guide is for advertisers and data providers who want to convert their user data to raw UID2s in a Databricks environment.

[**GWH__MC01 "Amazon Web Services, Google Cloud Platform, or Microsoft Azure." -- which do we use? Or, any and all?**]

[**GWH__MC02 Is it for EUID also? I think not?**]

## Databricks Listing?

[**GWH__MC03 where do Databricks users go to get more information about UID2 integration?**]

## Functionality

The following table summarizes the functionality available with the UID2 Databricks integration.

| Encrypt Raw UID2 to UID2 Token for Sharing | Decrypt UID2 Token to Raw UID2 | Generate UID2 Token from DII | Refresh UID2 Token | Map DII to Raw UID2s |
| :--- | :--- | :--- | :--- | :--- |
| &#9989; | &#9989; | &#8212;* | &#8212; | &#9989; |

*You cannot use Databricks to generate a UID2 token directly from <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>. However, you can convert DII to a raw UID2, and then encrypt the raw UID2 into a UID2 token.

### Key Benefits

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

As a starting point, create a Databricks clean room&#8212;a secure environment for you to collaborate with UID2 to process your data.

Follow the steps in [Create clean rooms](https://docs.databricks.com/aws/en/clean-rooms/create-clean-room) in the Databricks documentation. Use the correct sharing identifier based on the [UID2 environment](../getting-started/gs-environments) you want to connect to: see [UID2 Sharing Identifiers](#uid2-sharing-identifiers).

:::important
After you've created a clean room, you cannot change its collaborators. If you have the option to set clean room collaborator aliases&#8212;for example, if you’re using the Databricks Python SDK to create the clean room&#8212;your collaborator alias must be `creator` and the UID2 collaborator alias must be `collaborator`. If you’re creating the clean room using the Databricks web UI, the correct collaborator aliases are set for you.
:::

#### UID2 Sharing Identifiers

UID2 sharing identifiers can change. Be sure to check this page for the latest sharing identifiers.

| Environment | UID2 Sharing Identifier |
| :--- | :--- |
| Production | `aws:us-east-2:21149de7-a9e9-4463-b4e0-066f4b033e5d:673872910525611:010d98a6-8cf2-4011-8bf7-ca45940bc329` |
Integration | `aws:us-east-2:4651b4ea-b29c-42ec-aecb-2377de70bbd4:2366823546528067:c15e03bf-a348-4189-92e5-68b9a7fb4018` |

### Send Sharing Identifier to UID2 Contact

Find the sharing identifier for the Unity Catalog metastore that is attached to the Databricks workspace where you’ll work with the clean room. Send the sharing identifier to your UID2 contact.

The sharing identifier is a string in this format: `<cloud>:<region>:<uuid>`.

For information on how to find the sharing identifier, see [Request the recipient's sharing identifier](https://docs.databricks.com/aws/en/delta-sharing/create-recipient#step-1-request-the-recipients-sharing-identifier) in the Databricks documentation.

[**GWH__MC04 just noting that I changed the above: just the link copy, not the link itself. You had "Get access in the Databricks-to-Databricks model" but the link in your file went to the above. LMK if I need to change anything.**]

### Add Data to the Clean Room

Add one or more tables or views to the clean room. You can use any names for the schema, tables, and views. Tables and views must follow the schema detailed in [Input Table](#input-table ).

### Map DII

Run the `identity_map_v3` clean room [notebook](https://docs.databricks.com/aws/en/notebooks/) to map email addresses, phone numbers, or their respective hashes to raw UID2s.

## Running the Clean Room Notebook

This section provides details to help you use your Databricks clean room to process your DII into raw UID2s, including the following:

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
| `input_table` | The name of the table or view containing the DII to be mapped. |

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
| `UID` | string | The value is one of the following:<ul><li>**DII was successfully mapped**: The UID2 associated with the DII.</li><li>Othe**rwise: `NULL`.</li></ul> |
| `PREV_UID` | string | The value is one of the following:<ul><li>**DII was successfully mapped and the current raw UID2 was rotated in the last 90 days**: the previous raw UID2.</li><li>**Otherwise**: `NULL`.</li></ul> |
| `REFRESH_FROM` | timestamp | The value is one of the following:<ul><li>**DII was successfully mapped**: The timestamp (in epoch seconds) indicating when this UID2 should be refreshed.</li><li>**Otherwise**: `NULL`.</li></ul> |
| `UNMAPPED` | string | The value is one of the following:<ul><li>**DII was successfully mapped**: `NULL`.</li><li>Othe**rwise: The reason why the identifier was not mapped: `OPTOUT`, `INVALID IDENTIFIER`, or `INVALID INPUT TYPE`.<br/>For details, see [Values for the UNMAPPED Column](#values-for-the-unmapped-column).</li></ul> |

#### Values for the UNMAPPED Column

The following table shows possible values for the `UNMAPPED` column.

| Value | Meaning |
| :--- | :--- |
| `NULL` | The DII was successfully mapped. |
| `OPTOUT` | The user has opted out. |
| `INVALID IDENTIFIER` | The email address or phone number is invalid. |
| `INVALID INPUT TYPE` | The value of `INPUT_TYPE` is invalid. Valid values for `INPUT_TYPE` are: `email`, `email_hash`, `phone`, `phone_hash`. |



## BELOW IS A COPY OF SNOWFLAKE DOC HEADINGS

## Testing in the Integ Environment

xxx

## Shared Objects/Functions?

xxx

### Database and Schema Names

Query examples?

xxx                                                                                                              |

### Map DII

(**we have this... but, leaving these notes in in case we want to add anything**)

Define types of <Link href="../ref-info/glossary-uid#gl-dii">DII</Link>?

Does the service normalize? (for email / for phone)

A successful query returns ...?

#### Examples

Mapping request examples in this section:

- [Single Unhashed Email](#mapping-request-example---single-unhashed-email)
- [Multiple Unhashed Emails](#mapping-request-example---multiple-unhashed-emails)
- [Single Unhashed Phone Number](#mapping-request-example---single-unhashed-phone-number)
- [Multiple Unhashed Phone Numbers](#mapping-request-example---multiple-unhashed-phone-numbers)
- [Single Hashed Email](#mapping-request-example---single-hashed-email)
- [Multiple Hashed Emails](#mapping-request-example---multiple-hashed-emails)
- [Single Hashed Phone Number](#mapping-request-example---single-hashed-phone-number)
- [Multiple Hashed Phone Numbers](#mapping-request-example---multiple-hashed-phone-numbers)

:::note
The input and output data in these examples is fictitious, for illustrative purposes only. The values provided are not real values.
:::

#### Mapping Request Example - Single Unhashed Email

The following query illustrates how to map a single email address, using the [default database and schema names](#database-and-schema-names).

```sql

```

Query results for a single email:

```
+----------------------------------------------+--------------------------------------------------+--------------+----------+
| UID                                          | PREV_UID                                         | REFRESH_FROM | UNMAPPED |
+----------------------------------------------+--------------------------------------------------+--------------+----------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | vP9zK2mL7fR4tY8qN3wE6xB0dH5jA1sC+nI/oGuMeVa=     | 1735689600   | NULL     |
+----------------------------------------------+--------------------------------------------------+--------------+----------+
```

#### Mapping Request Example - Multiple Unhashed Emails

The following query illustrates how to map multiple email addresses, using the [default database and schema names](#database-and-schema-names).

```sql

```

Query results for multiple emails:

The following table identifies each item in the response, including `NULL` values for `NULL` or improperly formatted emails.

```
+----+----------------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
| ID | EMAIL                | UID                                          | PREV_UID                                     | REFRESH_FROM | UNMAPPED           |
+----+----------------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
|  1 | validate@example.com | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | vP9zK2mL7fR4tY8qN3wE6xB0dH5jA1sC+nI/oGuMeVa= | 1735689600   | NULL               |
|  2 | test@uidapi.com      | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | NULL                                         | 1735689600   | NULL               |
|  3 | optout@example.com   | NULL                                         | NULL                                         | NULL         | OPTOUT             |
|  4 | invalid-email        | NULL                                         | NULL                                         | NULL         | INVALID IDENTIFIER |
|  5 | NULL                 | NULL                                         | NULL                                         | NULL         | INVALID IDENTIFIER |
+----+----------------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
```

#### Mapping Request Example - Single Unhashed Phone Number

The following query illustrates how to map a phone number, using the [default database and schema names](#database-and-schema-names).

You must normalize phone numbers using the UID2 [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization) rules.

```sql

```

Query results for a single phone number:

```
+----------------------------------------------+----------+--------------+----------+
| UID                                          | PREV_UID | REFRESH_FROM | UNMAPPED |
+----------------------------------------------+----------+--------------+----------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | NULL     | 1735689600   | NULL     |
+----------------------------------------------+----------+--------------+----------+
```

#### Mapping Request Example - Multiple Unhashed Phone Numbers

The following query illustrates how to map multiple phone numbers, using the [default database and schema names](#database-and-schema-names).

You must normalize phone numbers using the UID2 [Phone Number Normalization](../getting-started/gs-normalization-encoding.md#phone-number-normalization) rules.

```sql

```

Query results for multiple phone numbers:

The following table identifies each item in the response, including `NULL` values for `NULL` or invalid phone numbers.

```
+----+--------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
| ID | PHONE        | UID                                          | PREV_UID                                     | REFRESH_FROM | UNMAPPED           |
+----+--------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
|  1 | +12345678901 | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | vP9zK2mL7fR4tY8qN3wE6xB0dH5jA1sC+nI/oGuMeVa= | 1735689600   | NULL               |
|  2 | +61491570006 | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | NULL                                         | 1735689600   | NULL               |
|  3 | +56789123001 | NULL                                         | NULL                                         | NULL         | OPTOUT             |
|  4 | 1234         | NULL                                         | NULL                                         | NULL         | INVALID IDENTIFIER |
|  5 | NULL         | NULL                                         | NULL                                         | NULL         | INVALID IDENTIFIER |
+----+--------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
```

#### Mapping Request Example - Single Hashed Email

The following query illustrates how to map a single email address hash, using the [default database and schema names](#database-and-schema-names).

```sql

```

Query results for a single hashed email:

```
+----------------------------------------------+----------------------------------------------+--------------+----------+
| UID                                          | PREV_UID                                     | REFRESH_FROM | UNMAPPED |
+----------------------------------------------+----------------------------------------------+--------------+----------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | vP9zK2mL7fR4tY8qN3wE6xB0dH5jA1sC+nI/oGuMeVa= | 1735689600   | NULL     |
+----------------------------------------------+----------------------------------------------+--------------+----------+
```

#### Mapping Request Example - Multiple Hashed Emails

The following query illustrates how to map multiple email address hashes, using the [default database and schema names](#database-and-schema-names).

```sql

````

Query results for multiple hashed emails:

The following table identifies each item in the response, including `NULL` values for `NULL` hashes.

```
+----+----------------------------------------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
| ID | EMAIL_HASH                                   | UID                                          | PREV_UID                                     | REFRESH_FROM | UNMAPPED           |
+----+----------------------------------------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
|  1 | LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI= | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | vP9zK2mL7fR4tY8qN3wE6xB0dH5jA1sC+nI/oGuMeVa= | 1735689600   | NULL               |
|  2 | /XJSTajB68SCUyuc3ePyxSLNhxrMKvJcjndq8TuwW5g= | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | NULL                                         | 1735689600   | NULL               |
|  2 | UebesrNN0bQkm/QR7Jx7eav+UDXN5Gbq3zs1fLBMRy0= | NULL                                         | NULL                                         | 1735689600   | OPTOUT             |
|  4 | NULL                                         | NULL                                         | NULL                                         | NULL         | INVALID IDENTIFIER |
+----+----------------------------------------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
```

#### Mapping Request Example - Single Hashed Phone Number

The following query illustrates how to map a single phone number hash, using the [default database and schema names](#database-and-schema-names).

```sql

```

Query results for a single hashed phone number:

```
+----------------------------------------------+----------------------------------------------+--------------+----------+
| UID                                          | PREV_UID                                     | REFRESH_FROM | UNMAPPED |
+----------------------------------------------+----------------------------------------------+--------------+----------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | vP9zK2mL7fR4tY8qN3wE6xB0dH5jA1sC+nI/oGuMeVa= | 1735689600   | NULL     |
+----------------------------------------------+----------------------------------------------+--------------+----------+
```

#### Mapping Request Example - Multiple Hashed Phone Numbers

The following query illustrates how to map multiple phone number hashes, using the [default database and schema names](#database-and-schema-names).

```sql

```

Query results for multiple hashed phone numbers:

The following table identifies each item in the response, including `NULL` values for `NULL` hashes.

```
+----+----------------------------------------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
| ID | PHONE_HASH                                   | UID                                          | PREV_UID                                     | REFRESH_FROM | UNMAPPED           |
+----+----------------------------------------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
|  1 | LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI= | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | vP9zK2mL7fR4tY8qN3wE6xB0dH5jA1sC+nI/oGuMeVa= | 1735689600   | NULL               |
|  2 | /XJSTajB68SCUyuc3ePyxSLNhxrMKvJcjndq8TuwW5g= | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | NULL                                         | 1735689600   | NULL               |
|  2 | UebesrNN0bQkm/QR7Jx7eav+UDXN5Gbq3zs1fLBMRy0= | NULL                                         | NULL                                         | 1735689600   | OPTOUT             |
|  4 | NULL                                         | NULL                                         | NULL                                         | NULL         | INVALID IDENTIFIER |
+----+----------------------------------------------+----------------------------------------------+----------------------------------------------+--------------+--------------------+
```

### Monitor Raw UID2 Refresh and Regenerate Raw UID2s

xxx

#### Targeted Input Table

xxx


Query results:

xxx