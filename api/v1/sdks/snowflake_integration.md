# Snowflake Integration

[Snowflake](https://www.snowflake.com/) is a cloud data warehousing solution, where you as a partner
can store your data and integrate with UID2. Using Snowflake, UID2 enables you to securely share authorized 
consumer identifier data without exposing sensitive PII. You have the option to query the Operator Web 
Services directly for the consumer identifier data, however, the Snowflake UID2 integration offers a more 
seamless experience. 

The following diagram illustrates how you engage with the UID2 integration process in Snowflake: 

![Snowflake Integration Architecture](./snowflake-integration-architecture.png)
|Partner Snowflake Account|UID2 Snowflake Account|UID2 Core Optout Cloud Setup|
| :--- | :--- | :--- |
|As a partner, you set up a Snowflake account to host your data, engage in UID2 integration, and query the UID2 Operator Web Services. | UID2 integration, hosted in a Snowflake account, grants you access to authorized functions and views that draw data from private tables. You can’t access the private tables. The UID2 Share reveals only essential data needed for you to perform UID2-related tasks. |ETL (Extract Transform Load) jobs constantly update the UID2 Core/Optout Snowflake storage with consumer identifier data that powers the UID2 Operator Web Services. The data used by the Operator Web Services is also available through the UID2 Share. |
|You only pay Snowflake for transactional computation costs to use shared functions and views.  |These private tables, secured in the UID2 Snowflake account, automatically synchronize with the UID2 Core/Optout Snowflake storage that holds internal data used to complete UID2-related tasks.  | |

   
## Accessing UID2 Share

Currently, access to the UID2 Share is authorized by the UID2 administrators. For access authorization, see: 
[Contact Information](../../README.md#contact-info). 

|Required Information|Details|
| :--- | :--- |
|Partner Snowflake account name |Run the following command from within the Snowflake interface:<br>`select CURRENT_ACCOUNT();`|
|The cloud provider and Snowflake region hosting the account.|Run the following command from within Snowflake interface:<br>`select CURRENT_REGION();`<br><br>NOTE: Snowflake integration is currently available only on AWS in the US East (N. Virginia) region (region ID us-east-1).|
|The UID2 client authentication key |As a registered UID2 partner, you must use the UID2 client authentication key to access the UID2 Operator Web Services. The client authentication key is needed only during setup, not when accessing shared objects.|


### Client Authentication Key
The client authentication key is associated with specific privileges that determine which endpoints can be invoked. To establish access to the UID2 Share, your Snowflake account is associated with a specific client access key that authorizes the objects for you to use through the share.

#### Using UID2 Share
Access and use the UID2 Share by performing the following:

1. Request and get ACCOUNTADMIN role privileges.
2. Access the available UID2 share in Snowflake console.
3. Create a new database from the UID2 share using either of the following options:
- Using the Snowflake console
- Executing SQL statements like the following:

```
CREATE DATABASE "UID2" FROM SHARE UID2PROD."UID2_PROD_SH"
   COMMENT='Access to UID2 shared functions and views';
GRANT IMPORTED PRIVILEGES ON DATABASE "UID2" TO ROLE "SYSADMIN"
```

## Accessing Shared Objects

You can access the following email address mapping functions: `FN_T_UID2_IDENTITY_MAP_EMAIL` and `FN_T_UID2_IDENTITY_MAP_EMAIL_HASH` in the UID2 Share. Additionally, the `UID2_SALT_BUCKETS` view from UID2 Share allows you to regenerate UID2s.

### Email Address Mapping Function

The `FN_T_UID2_IDENTITY_MAP_EMAIL` function maps an email address to the corresponding UID2 and second-level bucket ID. This function normalizes the email address by adhering to UID2 [Email Normalization](../../README.md#email-normalization) rules.

The function takes a single argument.

|Argument|Type|Description|
| :--- | :--- | :--- |
|`EMAIL`|`varchar(128)`| The email address to map to the UID2 and second-level bucket ID. Entering improper email addresses returns `NULL` values.|

A successful query returns the following information for the specified email address.

|Column Name|Data Type|Description|
| :--- | :--- | :--- |
| `UID` | `TEXT` | The UID2 associated with the email address. If the email address is invalid or cannot be mapped, `NULL` is returned. |
| `BUCKET_ID` | `TEXT` | The ID of the second-level salt bucket used to generate the UID. This ID maps to the bucket ID in the `UID2_SALT_BUCKETS` view. |

#### Single Email
Use the following query example to map a single email address:

##### Query
```
select UID, BUCKET_ID from table(UID2.PUBLIC.FN_T_UID2_IDENTITY_MAP_EMAIL('validate@email.com'));
```

##### Result
A possible result for the specified email address:

```
2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=, ad1ANEmVZA
```
The following table shows the result schema elements in context:

|UID|BUCKET_ID|
| :--- | :--- |
|`2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=`| `ad1ANEmVZA`|

>NOTE: UID2 is the database name used in the query and result examples.

#### Multiple Emails
Use the following query example for mapping multiple emails:

##### Query
```
select a.ID, a.EMAIL, m.UID, m.BUCKET_ID from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2.PUBLIC.FN_T_UID2_IDENTITY_MAP_EMAIL(EMAIL) t) m
    ON a.ID=m.ID;
```

##### Result
A possible result for the specified email address:

```
1, validate@email.com, 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=, ad1ANEmVZA
2, NULL, NULL, NULL
3, test@uidapi.com, IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=, a30od4mNRd
```
The following table shows the result schema elements in context: 

|ID|EMAIL|UID|BUCKET_ID|
| :--- | :--- | :--- | :---|
|1 |`validate@email.com`|`2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=`| `ad1ANEmVZA`|
|2|`test@uidapi.com` |`IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=`|`a30od4mNRd`|
|3|`NULL`|`NULL`|`NULL`|

>NOTE Example for ID 3 shows a NULL result from an improperly formatted email.

### Email Address Hash Mapping Function
The `FN_T_UID2_IDENTITY_MAP_EMAIL_HASH` function maps an email address hash to the corresponding UID2 and second-level bucket ID.
This function can map a single email address hash or multiple hashes, as shown in the examples provided below.

The function takes a single argument.

|Argument|Type|Description|
| :--- | :--- | :--- |
|`EMAIL`|`varchar(128)`| The URL-encoded, base64-encoded SHA256 hash of the normalized email address of a user. Ensure that the email hash is correctly formatted as directed in the [Email Normalization](../../README.md#email-normalization) section. Use the email address computed from the normalized email address.|

A successful query returns the following information for the specified email address hash.

|Column Name|Data Type|Description|
| :--- | :--- | :--- |
| `UID` | `TEXT` | The UID2 associated with the email address. If the email address hash is invalid or cannot be mapped, `NULL` is returned. |
| `BUCKET_ID` | `TEXT` | The ID of the second-level salt bucket that was used to generate the UID. This ID maps to the bucket ID in the `UID2_SALT_BUCKETS` view. |

#### Single Email Hash
Use the following query example to map a single email address hash:

##### Query
```
select UID, BUCKET_ID from table(UID2.PUBLIC.FN_T_UID2_IDENTITY_MAP_EMAIL(BASE64_ENCODE(SHA2_BINARY('validate@email.com', 256))));
```

##### Result
A possible result for the specified email address:
```
2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=, ad1ANEmVZA
```
The following table shows the result schema elements in context:

|UID|BUCKET_ID|
| :--- | :--- |
|`2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=`| `ad1ANEmVZA`|

#### Multiple Email Hashes 

Use the following query example for mapping multiple email hashes: 

##### Query 
```
select a.ID, a.EMAIL_HASH, m.UID, m.BUCKET_ID from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2.PUBLIC.FN_T_UID2_IDENTITY_MAP_EMAIL_HASH(EMAIL_HASH) t) m
    ON a.ID=m.ID;
```

##### Result
A possible result for the specified multiple email address hashes:
```
1, LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI=, 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=, ad1ANEmVZA
2, /XJSTajB68SCUyuc3ePyxSLNhxrMKvJcjndq8TuwW5g=, IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=, a30od4mNRd
3, NULL, NULL, NULL
```
The following table shows the result schema elements in context. The result includes two UIDs and a `BUCKET_ID` as shown in ID examples 1 and 2. ID 3 shows a `NULL` result from improperly formatted emails. 

|ID|UID|BUCKET_ID|
| :--- | :--- | :---|
| 1|`LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI= <br>2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=`| `ad1ANEmVZA`|
| 2|`/XJSTajB68SCUyuc3ePyxSLNhxrMKvJcjndq8TuwW5g= <br>IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ=` | `a30od4mNRd` |
| 3|`NULL`|`NULL`|

### Regenerating UIDs

The `UID2_SALT_BUCKETS` view query returns the date and time when the second-level salt buckets were last updated. Second-level salt is used when generating UID2s. When the salt in the bucket is updated, the previously generated UID2 becomes outdated and doesn’t match the UID2 generated by other parties for the same user.  

To determine the UIDs that need regeneration, compare the timestamps of when they were generated to the most recent timestamp of the second-level salt bucket update. 

|Column Name|Data Type|Description|
| :--- | :--- | :--- |
| `HASHED_BUCKET_ID` | `TEXT` | The ID of the second-level salt bucket. This ID parallels the `BUCKET_ID` returned by the identity map functions. Use the `BUCKET_ID` as the key to do a join query between the function call results and results from this view call.  |
| `LAST_UPDATE` | `INT` | The last time the salt in the bucket was updated. This value can be expressed as `epoch_milliseconds`. <br>NOTE `epoch_milliseconds` denotes the number of milliseconds that have passed since midnight January 1, 1970 UTC. |

The following example shows an input table and the query schema used to find the UIDs in the table that require regeneration due to updated second-level salt. 

#### Targeted Input Table  
```
select * from AUDIENCE_WITH_UID2; 
```

| ID | EMAIL              | UID2                                         | BUCKET_ID | LAST_UID2_UPDATE | 
| :--- | :--- | :---| :--- | :---|
|  1 | `validate@email.com` | `2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=` | `ad1ANEmVZA` | `2021-02-28 23:58:20.000` | 
|  2 | `test2@uidapi.com`   | `2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=` | `ad1ANEmVZA` | `2021-03-01 03:58:20.000` | 
|  3 | `test@uidapi.com`    | `NULL`                                         | `NULL`      | `NULL` |     


Find the missing or outdated UID2s with the following query example: 

#### Query
```
select a.*, b.LAST_UPDATE as LAST_SALT_UPDATE
  from AUDIENCE_WITH_UID2 a LEFT OUTER JOIN UID2.PUBLIC.UID2_SALT_BUCKETS b
  ON a.UID2_BUCKET_ID=b.HASHED_BUCKET_ID
  where DATE_PART('epoch_milliseconds', a.LAST_UPDATE) < b.LAST_UPDATE or a.UID2 IS NULL;
```

##### Result
A possible result for the specified multiple email address hashes:
```
1, validate@email.com, 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=, ad1ANEmVZA, 2021-02-28 23:58:20.000, 2021-03-01 00:00:00.000
3, test@uidapi.com, NULL, NULL, NULL, NULL
```
The following table shows the result schema elements in context. The result includes an email, UID, BUCKET_ID, LAST_UID2_UPDATE, and LAST_UPDATE as shown in the ID 1 example. ID 2 doesn't appear in the result example since the UID2 shown there was generated after the last bucket update. ID 3 shows a NULL result from improperly formatted emails. 

|ID|EMAIL|UID|BUCKET_ID|LAST_UID2_UPDATE|LAST_UPDATE|
| :--- | :--- | :---| :--- | :--- | :---|
| 1| `validate@email.com`| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU=|ad1ANEmVZA |2021-02-28 23:58:20.000 |2021-03-01 00:00:00.000 |
| 3|`test@uidapi.com`|`NULL`|`NULL`|`NULL`|`NULL`|
