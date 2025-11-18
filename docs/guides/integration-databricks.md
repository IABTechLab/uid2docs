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

Overview general info plus define audience.

## Databricks listing?

xxx

## Functionality

xxx

### Key Benefits

xxx

## Summary of Integration Steps

------------------- MATT GUIDE, BEGIN ------------------------------


## Summary of Integration Steps

At a high level, the following are the steps to set up your Databricks integration and process your data:

1. Create a clean room and invite UID2 as a collaborator.
1. Send your sharing identifier to your UID2 contact.
1. Add data to the clean room.
1. Run the clean room notebook to map directly identifying information (DII).

## Step 1: Create a clean room and invite UID2 as a collaborator

Follow the steps in Create clean rooms in the Databricks documentation. Use the correct sharing identifier from the table below, based on the UID2 Environment you wish to connect to.
UID2 sharing identifiers can change. Be sure to check this page for the latest sharing identifiers.

| Environment | UID2 Sharing Identifier |
| :--- | :--- |
| Production | aws:us-east-2:21149de7-a9e9-4463-b4e0-066f4b033e5d:673872910525611:010d98a6-8cf2-4011-8bf7-ca45940bc329 |
Integration | aws:us-east-2:4651b4ea-b29c-42ec-aecb-2377de70bbd4:2366823546528067:c15e03bf-a348-4189-92e5-68b9a7fb4018 |

:::note
Once you've created a clean room, you cannot change its collaborators.

If you have the option to set clean room collaborator aliases&#8212;for example, if you’re using the Databricks Python SDK [**GWH__MC is this the UID2 Python SDK? Or a Databrics SDK?**]to create the clean room&#8212;your collaborator alias must be `creator` and the UID2 collaborator alias must be `collaborator`. If you’re creating the clean room using the Databricks web UI, the correct collaborator aliases are set for you.
:::

## Step 2: Send your sharing identifier to your UID2 contact

Find the sharing identifier for the Unity Catalog metastore that is attached to the Databricks workspace where you’ll work with the clean room. Send the sharing identifier to your UID2 contact.
The sharing identifier is a string in this format: `<cloud>:<region>:<uuid>`.

For information on how to find the sharing identifier, see Get access in the Databricks-to-Databricks model in the Databricks documentation.

## Step 3: Add data to the clean room

Add one or more tables or views to the clean room. You can use any names for the schema, tables, and views. Tables and views must follow the schema detailed in [Input Table](#uptohere)Schema.

## Step 4: Run the clean room notebook to map DII

Run the `identity_map_v3` clean room notebook to map DII to UID2s. Details about this notebook are given in the next section.
Map DII
The `identity_map_v3` clean room notebook maps DII to UID2s.
Notebook Parameters
The `identity_map_v3` notebook can be used to map DII in any table or view that has been added to the creator catalog of the clean room.
The notebook has two parameters, input_schema and input_table. Together they identify the table or view in the clean room that contains the DII to be mapped.
For example, to map DII in the clean room table named creator.default.emails, set input_schema to default and input_table to emails.
Parameter Name
Description
input_schema
The schema containing the table or view.
input_table
The name of the table or view containing the DII to be mapped.
Input Table
The input table or view must have two columns: INPUT and INPUT_TYPE. The table or view can have additional columns, but they won’t be used by the notebook.
Column Name
Data Type
Description
INPUT
string
The DII to map.
INPUT_TYPE
string
The type of DII to map. Allowed values: email, email_hash, phone, and phone_hash.
DII Format
If the DII is an email address, the notebook normalizes the data using the UID2 Email Address Normalization rules.
If the DII is a phone number, you must normalize it before mapping it with the notebook, using the UID2 Phone Number Normalization rules.
Output Table
If the clean room has an output catalog, the mapped DII will be written to a table in the output catalog. Output tables are stored for 30 days. For more information, see Overview of output tables in the Databricks documentation.
Output Table Schema
Column Name
Data Type
Description
UID
string
The value is one of the following:
DII was successfully mapped: The UID2 associated with the DII.
Otherwise: NULL.
PREV_UID
string
The value is one of the following:
DII was successfully mapped and the current raw UID2 was rotated in the last 90 days: the previous raw UID2.
Otherwise: NULL.
REFRESH_FROM
timestamp
The value is one of the following:
DII was successfully mapped: The timestamp (in epoch seconds) indicating when this UID2 should be refreshed.
Otherwise: NULL.
UNMAPPED
string
The value is one of the following:
DII was successfully mapped: NULL.
Otherwise: The reason why the identifier was not mapped: OPTOUT, INVALID IDENTIFIER, or INVALID INPUT TYPE.
For details, see Values for the UNMAPPED Column.
Values for the UNMAPPED Column
The following table shows possible values for the UNMAPPED column.
Value
Meaning
NULL
The DII was successfully mapped.
OPTOUT
The user has opted out.
INVALID IDENTIFIER
The email address or phone number is invalid.
INVALID INPUT TYPE
The value of INPUT_TYPE is invalid. Valid values for INPUT_TYPE are: email, email_hash, phone, phone_hash.







------------------- MATT GUIDE, END ------------------------------


------------------- BELOW IS A COPY OF SNOWFLAKE DOC HEADINGS ------------------------------



xxx

## Testing in the Integ Environment

xxx

## Shared Objects/Functions?

xxx

### Database and Schema Names

Query examples?

xxx                                                                                                              |

### Map DII

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
select UID, PREV_UID, REFRESH_FROM, UNMAPPED from table(UID2_PROD_UID_SH.UID.FN_T_IDENTITY_MAP_V3('validate@example.com', 'email'));
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
select a.ID, a.EMAIL, m.UID, m.PREV_UID, m.REFRESH_FROM, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_UID_SH.UID.FN_T_IDENTITY_MAP_V3(EMAIL, 'email') t) m
    on a.ID=m.ID;
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
select UID, PREV_UID, REFRESH_FROM, UNMAPPED from table(UID2_PROD_UID_SH.UID.FN_T_IDENTITY_MAP_V3('+12345678901', 'phone'));
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
select a.ID, a.PHONE, m.UID, m.PREV_UID, m.REFRESH_FROM, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_UID_SH.UID.FN_T_IDENTITY_MAP_V3(PHONE, 'phone') t) m
    on a.ID=m.ID;
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
select UID, PREV_UID, REFRESH_FROM, UNMAPPED from table(UID2_PROD_UID_SH.UID.FN_T_IDENTITY_MAP_V3(BASE64_ENCODE(SHA2_BINARY('validate@example.com', 256)), 'email_hash'));
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
select a.ID, a.EMAIL_HASH, m.UID, m.PREV_UID, m.REFRESH_FROM, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_UID_SH.UID.FN_T_IDENTITY_MAP_V3(EMAIL_HASH, 'email_hash') t) m
    on a.ID=m.ID;
```

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
select UID, PREV_UID, REFRESH_FROM, UNMAPPED from table(UID2_PROD_UID_SH.UID.FN_T_IDENTITY_MAP_V3(BASE64_ENCODE(SHA2_BINARY('+12345678901', 256)), 'phone_hash'));
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
select a.ID, a.PHONE_HASH, m.UID, m.PREV_UID, m.REFRESH_FROM, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_UID_SH.UID.FN_T_IDENTITY_MAP_V3(PHONE_HASH, 'phone_hash') t) m
    on a.ID=m.ID;
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
