[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Integration Guides](README.md) > Snowflake Integration

# Snowflake Integration (Deprecated)

> IMPORTANT: UID2 API v1 は非推奨となり、2023 年 3 月 31 日までにすべての v1 SDK ファイルとエンドポイント、v0 SDK ファイル、およびバージョン管理されていないエンドポイントが削除され、現在のユーザーのみがサポートされるようになります。2023 年 3 月 31 日までに、必ず UID2 API v2(../../v2/upgrades/upgrade-guide.md) へのアップグレードをお願いします。初めてフレームワークに触れる方は、[UID2 API v2](../../v2/README.md) をご利用ください。

[Snowflake](https://www.snowflake.com/?lang=ja) はクラウドデータウェアハウスソリューションで、パートナーとして顧客のデータを保存し、UID2 とインテグレーションすることができます。Snowflake を使用することで、UID2 は、機密性の高い個人情報を公開することなく、認可された消費者識別子データを安全に共有することができます。消費者識別子データを直接 Operator Web Services に問い合わせることもできますが、Snowflake UID2 とのインテグレーションにより、よりシームレスな体験が可能になります。

[Snowflake](https://www.snowflake.com/) is a cloud data warehousing solution, where you as a partner can store your data and integrate with UID2. Using Snowflake, UID2 enables you to securely share authorized consumer identifier data without exposing sensitive PII. Even though you have the option to query the Operator Web Services directly for the consumer identifier data, the Snowflake UID2 integration offers a more seamless experience.

次の図は、Snowflake が UID2 インテグレーションプロセスにどのように関わるかを示しています。

The following diagram illustrates how you engage with the UID2 integration process in Snowflake:

![Snowflake Integration Architecture](./uid2-snowflake-integration-architecture.svg)

| Partner Snowflake Account                                                                                                                                                                                                                                                                                              | UID2 Snowflake Account                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | UID2 Core Opt-out Cloud Setup                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| パートナーは、Snowflake アカウントを設定してデータをホストし、UID2 Share を通じて関数やビューを使うことで、UID2 インテグレーションに関与することができます。<br>As a partner, you set up a Snowflake account to host your data and engage in UID2 integration by consuming functions and views through the UID2 Share. | Snowflake アカウントでホストされている UID2 インテグレーションでは、プライベートテーブルからデータを引き出す認可をされた関数とビューへのアクセスが許可されます。プライベートテーブルにはアクセスできません。UID2 Share では、UID2 関連のタスクを実行するために必要な重要なデータのみが公開されます。<br>UID2 integration, hosted in a Snowflake account, grants you access to authorized functions and views that draw data from private tables. You can’t access the private tables. The UID2 Share reveals only essential data needed for you to perform UID2-related tasks. | ETL (Extract Transform Load) ジョブは、UID2 Core/Optout Snowflake ストレージを常に更新し、UID2 Operator Web Services を動かす内部データを提供します。Operator Web Services で使用されるデータは、UID2 Share からも入手できます。<br>ETL (Extract Transform Load) jobs constantly update the UID2 Core/Optout Snowflake storage with internal data that powers the UID2 Operator Web Services. The data used by the Operator Web Services is also available through the UID2 Share. |
| Shared 関数とビューを使用する場合、Snowflake にトランザクションのコストを支払います。<br>When you use shared functions and views, you pay Snowflake for transactional computation costs.                                                                                                                               | UID2 Snowflake アカウントで保護されたこれらのプライベートテーブルは、UID2 関連のタスクを完了するために使用される内部データを保持する UID2 Core/Optout Snowflake ストレージと自動的に同期されます。<br>These private tables, secured in the UID2 Snowflake account, automatically synchronize with the UID2 Core/Optout Snowflake storage that holds internal data used to complete UID2-related tasks.                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

## Access the UID2 Shares

UID2 Share へのアクセスは、[Snowflake Data Marketplace](https://www.snowflake.com/data-marketplace/)を通して行います。ここでは、選択した UID2 個別リストに基づき、特定のデータセットをリクエストすることができます。現在、Snowflake Data Marketplace では、広告主/ブランド向けとデータプロバイダ向けの 2 種類の UID2 専用リスティングが提供されています。

> IMPORTANT: データをリクエストするには、Snowflake アカウントに`ACCOUNTADMIN`ロール権限が必要です。

Access to the UID2 Share is available through the [Snowflake Data Marketplace](https://www.snowflake.com/data-marketplace/) where you can request specific data sets based on the UID2 personalized listing you select. Currently, there are two personalized listings offered in the Snowflake Data Marketplace for UID2: for advertisers/brands and data providers.

> IMPORTANT: To be able to request data, you must have the `ACCOUNTADMIN` role privileges in your Snowflake account.

UID2 Share へのアクセスを要求するには、次の手順を実行します。

1. Snowflake Data Marketplace にログインし、関心のある UID2 ソリューションを選択します。
   - [Unified ID 2.0 Advertiser Identity Solution](https://app.snowflake.com/marketplace/listing/GZT0ZRYXTMV)
   - [Unified ID 2.0 Data Provider Identity Solution](https://app.snowflake.com/marketplace/listing/GZT0ZRYXTN0)
2. **パーソナライズドデータ** セクションで、**データのリクエスト** をクリックします。
3. 画面の指示に従って、連絡先やその他の必要な情報を確認し、提供します。
4. The Trade Desk の既存顧客で _Advertiser_ Identity Solution に興味がある場合は、データリクエストフォームの **Message** 欄に The Trade Desk が発行したパートナー ID および広告主 ID を記載してください。
5. フォームを送信します。

To request access to a UID2 Share, complete the following steps:

1. Log in to the Snowflake Data Marketplace and select the UID2 solution in which you are interested:
   - [Unified ID 2.0 Advertiser Identity Solution](https://app.snowflake.com/marketplace/listing/GZT0ZRYXTMV)
   - [Unified ID 2.0 Data Provider Identity Solution](https://app.snowflake.com/marketplace/listing/GZT0ZRYXTN0)
2. In the **Personalized Data** section, click **Request Data**.
3. Follow the onscreen instructions to verify and provide your contact and other required information.
4. If you are an existing client of The Trade Desk and are interested in the _Advertiser_ Identity Solution, include your partner and advertiser IDs issued by The Trade Desk in the **Message** field of the data request form.
5. Submit the form.

リクエストを受け取った後、UID2 administrator が適切なアクセス方法をご連絡します。Snowflake でのデータリクエストの管理について詳しくは、[Snowflake documentation](https://docs.snowflake.com/en/user-guide/data-marketplace-consumer.html)を参照してください。

After your request is received, a UID2 administrator will contact you with the appropriate access instructions. For details about managing data requests in Snowflake, see the [Snowflake documentation](https://docs.snowflake.com/en/user-guide/data-marketplace-consumer.html).

## Shared Objects

選択した UID2 ソリューションに関係なく、以下の関数を使って単一または複数のメールアドレスやメールアドレスハッシュを UID2 にマッピングすることができます。

Regardless of the UID2 solution you choose, you can map single or multiple email addresses or email hashes to UID2s by using the following functions:

- `FN_T_UID2_IDENTITY_MAP_EMAIL` (See [Map Email Addresses](#map-email-addresses))
- `FN_T_UID2_IDENTITY_MAP_EMAIL_HASH` (See [Map Email Address Hashes](#map-email-address-hashes))

再生成が必要な UID2 を特定するには、UID Share から `UID2_SALT_BUCKETS` ビューを使用します。詳しくは、[Regenerate UID2s](#regenerate-uid2s) を参照してください。

To identify the UID2s that you must regenerate, use the `UID2_SALT_BUCKETS` view from the UID2 Share. For details, see [Regenerate UID2s](#regenerate-uid2s).

### Database and Schema Names

以下のセクションでは、各ソリューションのクエリ例を示します。これらは、データベースとスキーマ名の変数を除けば、同じものです:

The following sections include query examples for each solution, which are identical except for the database and schema name variables:

```
{DATABASE_NAME}.{SCHEMA_NAME}
```

例:
For example:

```
select UID2, BUCKET_ID from table({DATABASE_NAME}.{SCHEMA_NAME}.FN_T_UID2_IDENTITY_MAP_EMAIL('validate@email.com'));
```

すべてのクエリ例では、各名前変数に以下のデフォルト値を使用しています。

All query examples use the following default values for each name variable:

| Variable          | Advertiser Solution Default Value | Data Provider Solution Default Value | Comments                                                                                                                                                                                                                                                                                            |
| :---------------- | :-------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{DATABASE_NAME}` | `UID2_PROD_ADV_SH`                | `UID2_PROD_DP_SH`                    | 必要であれば、選択した UID2 Share へのアクセス権が与えられた後に新しいデータベースを作成する際に、デフォルトのデータベース名を変更することができます。<br>If needed, you can change the default database name when creating a new database after you are granted access to the selected UID2 Share. |
| `{SCHEMA_NAME}`   | `ADV`                             | `DP`                                 | これはイミュータブルです。<br>This is an immutable name.                                                                                                                                                                                                                                            |

### Map Email Addresses

単一のメールアドレスまたは複数のメールアドレスを、対応する UID2 とセカンドレベルのソルトバケット ID にマッピングするには、 `FN_T_UID2_IDENTITY_MAP_EMAIL` 関数を使用します。これはメールアドレスを引数にとり、UID2 [Email Normalization](../../README.md#email-address-normalization) の規則に従って正規化します。

To map a single email address or multiple email addresses to the corresponding UID2s and second-level salt bucket IDs, use the `FN_T_UID2_IDENTITY_MAP_EMAIL` function. It takes an email address as its argument and normalizes it using the UID2 [Email Normalization](../../README.md#email-normalization) rules.

| Argument | Data Type    | Description                                                                                                                             |
| :------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `EMAIL`  | varchar(128) | UID2 およびセカンドレベルのバケット ID に対応させるメールアドレス。<br>The email address to map to the UID2 and second-level bucket ID. |

クエリーに成功すると、指定されたメールアドレスについて以下の情報が返されます。

> NOTE: リクエストに含まれる無効なメールアドレスに対しては、`NULL`値が返されます。

A successful query returns the following information for the specified email address.

> NOTE: For any invalid email addresses in the request, `NULL` values are returned.

| Column Name | Data Type | Description                                                                                                                                                                                                                                                                  |
| :---------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UID2`      | TEXT      | メール アドレスに関連付けられた UID2 です。<br>The UID2 associated with the email address.                                                                                                                                                                                   |
| `BUCKET_ID` | TEXT      | UID2 を生成するために使用する、セカンドレベルのソルトバケット ID です。この ID は `UID2_SALT_BUCKETS` ビューのバケット ID に対応します。<br>The ID of the second-level salt bucket used to generate the UID2. This ID maps to the bucket ID in the `UID2_SALT_BUCKETS` view. |

#### Single Email Mapping Request Example

次のクエリは、[デフォルトのデータベースとスキーマ名](#database-and-schema-names) を使用して、単一のメールアドレスをマッピングする方法を示しています。

The following queries illustrate how to map a single email address, using the [default database and schema names](#database-and-schema-names).

##### Advertiser Solution Query

```
select UID2, BUCKET_ID from table(UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP_EMAIL('validate@email.com'));
```

##### Data Provider Solution Query

```
select UID2, BUCKET_ID from table(UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP_EMAIL('validate@email.com'));
```

##### Results

```
+----------------------------------------------+------------+
| UID2                                         | BUCKET_ID  |
+----------------------------------------------+------------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  |
+----------------------------------------------+------------+
```

#### Multiple Emails Mapping Request Example

以下のクエリは、[デフォルトのデータベースとスキーマ名](#database-and-schema-names) を使用して、複数のメールアドレスをマッピングする方法を示しています。

The following queries illustrate how to map multiple email addresses, using the [default database and schema names](#database-and-schema-names).

##### Advertiser Solution Query

```
select a.ID, a.EMAIL, m.UID2, m.BUCKET_ID from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP_EMAIL(EMAIL) t) m
    on a.ID=m.ID;
```

##### Data Provider Solution Query

```
select a.ID, a.EMAIL, m.UID2, m.BUCKET_ID from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP_EMAIL(EMAIL) t) m
    on a.ID=m.ID;
```

##### Results

次の表は、不適切にフォーマットされたメールアドレスのための `NULL` 値を含む、応答の各項目です。

The following table identifies each item in the response, including `NULL` values for an improperly formatted email.

```
+----+--------------------+----------------------------------------------+------------+
| ID | EMAIL              | UID2                                         | BUCKET_ID  |
+----+--------------------+----------------------------------------------+------------+
|  1 | validate@email.com | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  |
|  2 | test@uidapi.com    | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | a30od4mNRd |
|  3 | NULL               | NULL                                         | NULL       |
+----+--------------------+----------------------------------------------+------------+
```

### Map Email Address Hashes

1 つあるいは複数のメールアドレスハッシュを、対応する UID2 とセカンドレベルのソルトバケット ID にマッピングするには、メールアドレスハッシュを引数にとる `FN_T_UID2_IDENTITY_MAP_EMAIL_HASH` 関数を使用します。

To map a single email address hash or multiple hashes to the corresponding UID2s and second-level salt bucket IDs, use the `FN_T_UID2_IDENTITY_MAP_EMAIL_HASH` function which takes an email address hash as its argument.

| Argument     | Data Type    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :----------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `EMAIL_HASH` | varchar(128) | ユーザーの正規化されたメールアドレスの SHA256 ハッシュを base64 でエンコードしたものです。[Email Normalization](../../README.md#email-address-normalization) ルールを用いて、メールアドレスハッシュが正しくフォーマットされていることを確認します。正規化されたメールアドレスから計算されたハッシュを使用します。<br>The base64-encoded SHA256 hash of the normalized email address of a user. Ensure that the email hash is correctly formatted using the [Email Normalization](../../README.md#email-normalization) rules. Use the hash computed from the normalized email address. |

問い合わせに成功すると、指定されたメールアドレスハッシュについて、以下の情報が返されます。

> NOTE: リクエストに含まれる不適切な形式のメールアドレスハッシュに対しては、 `NULL` 値が返されます。

A successful query returns the following information for the specified email address hash.

> NOTE: For any improperly formatted email address hashes in the request, `NULL` values are returned.

| Column Name | Data Type | Description                                                                                                                                                                                                                                                                               |
| :---------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UID2`      | TEXT      | メールアドレスに関連付けられた UID2 です。<br>The UID2 associated with the email address.                                                                                                                                                                                                 |
| `BUCKET_ID` | TEXT      | UID2 を生成するために使用された、セカンドレベルのソルトバケットの ID です。この ID は `UID2_SALT_BUCKETS` ビューのバケット ID に対応します。<br>The ID of the second-level salt bucket that was used to generate the UID2. This ID maps to the bucket ID in the `UID2_SALT_BUCKETS` view. |

#### Single Email Hash Mapping Request Example

以下のクエリは、[デフォルトのデータベースとスキーマ名](#database-and-schema-names) を使用して、単一のメールアドレスハッシュをマップする方法を示しています。

The following queries illustrate how to map a single email address hash, using the [default database and schema names](#database-and-schema-names).

##### Advertiser Solution Query

```
select UID2, BUCKET_ID from table(UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP_EMAIL(BASE64_ENCODE(SHA2_BINARY('validate@email.com', 256))));
```

##### Data Provider Solution Query

```
select UID2, BUCKET_ID from table(UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP_EMAIL(BASE64_ENCODE(SHA2_BINARY('validate@email.com', 256))));
```

##### Results

```
+----------------------------------------------+------------+
| UID2                                         | BUCKET_ID  |
+----------------------------------------------+------------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  |
+----------------------------------------------+------------+
```

#### Multiple Email Hashes Mapping Request Example

以下のクエリは、[デフォルトのデータベースとスキーマ名](#database-and-schema-names) を使用して、複数のメールアドレスハッシュをマッピングする方法を示しています。

The following queries illustrate how to map multiple email address hashes, using the [default database and schema names](#database-and-schema-names).

##### Advertiser Solution Query

```
select a.ID, a.EMAIL_HASH, m.UID2, m.BUCKET_ID from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP_EMAIL_HASH(EMAIL_HASH) t) m
    on a.ID=m.ID;
```

##### Data Provider Solution Query

```
select a.ID, a.EMAIL_HASH, m.UID2, m.BUCKET_ID from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP_EMAIL_HASH(EMAIL_HASH) t) m
    on a.ID=m.ID;
```

##### Results

次の表は、不適切にフォーマットされたメールアドレスハッシュのための `NULL` 値を含む、応答の各項目を示しています。

The following table identifies each item in the response, including `NULL` values for an improperly formatted email hash.

```
+----+----------------------------------------------+----------------------------------------------+------------+
| ID | EMAIL_HASH                                   | UID2                                         | BUCKET_ID  |
+----+----------------------------------------------+----------------------------------------------+------------+
|  1 | LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI= | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  |
|  2 | NULL                                         | NULL                                         | NULL       |
|  3 |/XJSTajB68SCUyuc3ePyxSLNhxrMKvJcjndq8TuwW5g=  | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | a30od4mNRd |
+----+----------------------------------------------+----------------------------------------------+------------+
```

### Regenerate UID2s

`UID2_SALT_BUCKETS` ビュークエリは、セカンドレベルのソルトバケットが最後に更新された日時を返します。セカンドレベルのソルトは UID2 を生成する際に使用されます。バケット内のソルトが更新されると、それまで生成されていた UID2 が古くなり、同じユーザーに対して他者が生成した UID2 とは一致しなくなります。

The `UID2_SALT_BUCKETS` view query returns the date and time when the second-level salt buckets were last updated. Second-level salt is used when generating UID2s. When the salt in the bucket is updated, the previously generated UID2 becomes outdated and doesn’t match the UID2 generated by other parties for the same user.

どの UID2 が再生成を必要としているかを判断するには、生成されたときのタイムスタンプを、セカンドレベルのソルトバケット更新の最新のタイムスタンプと比較します。

To determine which UID2s need regeneration, compare the timestamps of when they were generated to the most recent timestamp of the second-level salt bucket update.

| Column Name            | Data Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :--------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BUCKET_ID`            | TEXT          | セカンドレベルのソルトバケットの ID です。この ID は、ID マップ関数が返す `BUCKET_ID` と同じものです。`BUCKET_ID` をキーとして、関数呼び出しの結果とこのビュー呼び出しの結果の間のジョインクエリを実行します。<br>The ID of the second-level salt bucket. This ID parallels the `BUCKET_ID` returned by the identity map functions. Use the `BUCKET_ID` as the key to do a join query between the function call results and results from this view call. |
| `LAST_SALT_UPDATE_UTC` | TIMESTAMP_NTZ | バケット内のソルトが最後に更新された時刻です。この値は UTC タイムゾーンで表現されます。<br>The last time the salt in the bucket was updated. This value is expressed in UTC timezone.                                                                                                                                                                                                                                                                    |

次の例は、入力テーブルと、テーブル内の UID2 のうち、セカンドレベルのソルトの更新により再生成が必要なものを見つけるためのクエリを示しています。

The following example shows an input table and the query used to find the UID2s in the table that require regeneration due to updated second-level salt.

#### Targeted Input Table

```
select * from AUDIENCE_WITH_UID2;
```

```
+----+--------------------+----------------------------------------------+------------+-------------------------+
| ID | EMAIL              | UID2                                         | BUCKET_ID  | LAST_UID2_UPDATE_UTC    |
+----+--------------------+----------------------------------------------+------------+-------------------------+
|  1 | validate@email.com | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | 2021-03-01 00:00:00.000 |
|  2 | test1@uidapi.com   | Q4A5ZBuBCYfuV3Wd8Fdsx2+i33v7jyFcQbcMG/LH4eM= | ad1ANEmVZ  | 2021-03-03 00:00:00.000 |
|  3 | test2@uidapi.com   | NULL                                         | NULL       | NULL                    |
+----+--------------------+----------------------------------------------+------------+-------------------------+
```

欠落しているまたは古い UID2 を見つけるには、[デフォルトのデータベースとスキーマ名](#database-and-schema-names) を使用する次のクエリ例を使用します。

To find missing or outdated UID2s, use the following query examples, which use the [default database and schema names](#database-and-schema-names).

##### Advertiser Solution Query

```
select a.*, b.LAST_SALT_UPDATE_UTC
  from AUDIENCE_WITH_UID2 a LEFT OUTER JOIN UID2_PROD_ADV_SH.ADV.UID2_SALT_BUCKETS b
  on a.BUCKET_ID=b.BUCKET_ID
  where a.LAST_UID2_UPDATE_UTC < b.LAST_SALT_UPDATE_UTC or a.UID2 IS NULL;
```

##### Data Provider Solution Query

```
select a.*, b.LAST_SALT_UPDATE_UTC
  from AUDIENCE_WITH_UID2 a LEFT OUTER JOIN UID2_PROD_DP_SH.DP.UID2_SALT_BUCKETS b
  on a.BUCKET_ID=b.BUCKET_ID
  where a.LAST_UID2_UPDATE_UTC < b.LAST_SALT_UPDATE_UTC or a.UID2 IS NULL;
```

##### Results

以下の表は、レスポンスに含まれる各項目を表たものです。以下の ID1 の例で示すように、結果には EMAIL、`UID2`、`BUCKET_ID`、`LAST_UID2_UPDATE_UTC`、`LAST_SALT_UPDATE_UTC`が含まれます。ID 2 については、対応する UID2 が最後のバケット更新の後に生成されたため、情報は返されません。ID 3 については、UID2 が存在しないため、`NULL`値が返されます。

The following table identifies each item in the response. The result includes an email, `UID2`, `BUCKET_ID`, `LAST_UID2_UPDATE_UTC`, and `LAST_SALT_UPDATE_UTC` as shown in the ID 1 example below. No information is returned for ID 2 because the corresponding UID2 was generated after the last bucket update. For ID 3, `NULL` values are returned due to a missing UID2.

```
+----+--------------------+----------------------------------------------+------------+-------------------------+-------------------------+
| ID | EMAIL              | UID2                                         | BUCKET_ID  | LAST_UID2_UPDATE_UTC    | LAST_SALT_UPDATE_UTC    |
+----+--------------------+----------------------------------------------+------------+-------------------------+-------------------------+
|  1 | validate@email.com | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | 2021-03-01 00:00:00.000 | 2021-03-02 00:00:00.000 |
|  3 | test2@uidapi.com   | NULL                                         | NULL       | NULL                    | NULL                    |
+----+--------------------+----------------------------------------------+------------+-------------------------+-------------------------+
```
