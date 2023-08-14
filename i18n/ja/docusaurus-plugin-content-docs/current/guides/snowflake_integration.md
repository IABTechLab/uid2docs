---
title: Snowflake Integration
description: UID2 実装のため、Snowflake の UID2 Share を通じて Snowflake とインテグレーションするための情報。
hide_table_of_contents: false
sidebar_position: 04
---

# Snowflake Integration Guide

[Snowflake](https://www.snowflake.com/?lang=ja) はクラウドデータウェアハウスソリューションで、パートナーとして顧客のデータを保存し、UID2 フレームワークとインテグレーションできます。Snowflake を使用することで、UID2 は、機密性の高い　[directly identifying information (DII)](../ref-info/glossary-uid.md#gl-dii)　を公開することなく、認可された消費者識別子データを安全に共有できます。消費者識別子データを直接 Operator Web Services に問い合わせることもできますが、Snowflake UID2 とのインテグレーションにより、よりシームレスな体験が可能になります。

次の図は、Snowflake が UID2 インテグレーションプロセスにどのように関わるかを示しています:

![Snowflake Integration Architecture](images/uid2-snowflake-integration-architecture.svg)

| Partner Snowflake Account                                                                                                                                    | UID2 Snowflake Account                                                                                                                                                                                                                                                                               | UID2 Core Opt-Out Cloud Setup                                                                                                                                                                                                    |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| パートナーは、Snowflake アカウントを設定してデータをホストし、UID2 Share を通じて関数やビューを使うことで、UID2 インテグレーションに関与できます。 | Snowflake アカウントでホストされている UID2 インテグレーションでは、プライベートテーブルからデータを引き出す認可をされた関数とビューへのアクセスが許可されます。プライベートテーブルにはアクセスできません。UID2 Share では、UID2 関連のタスクを実行するために必要な重要なデータのみが公開されます。 | ETL (Extract Transform Load) ジョブは、UID2 Core/Optout Snowflake ストレージを常に更新し、UID2 Operator Web Services を動かす内部データを提供します。Operator Web Services で使用されるデータは、UID2 Share からも入手できます。 |
| Shared 関数とビューを使用する場合、Snowflake にトランザクションのコストを支払います。                                                                        | UID2 Snowflake アカウントで保護されたこれらのプライベートテーブルは、UID2 関連のタスクを完了するために使用される内部データを保持する UID2 Core/Optout Snowflake ストレージと自動的に同期されます。                                                                                                   |                                                                                                                                                                                                                                  |

## Access the UID2 Shares

UID2 Shareへのアクセスは、[Snowflake Data Marketplace](https://www.snowflake.com/data-marketplace/) を通して行います。ここでは、選択した UID2 パーソナライズドリストに基づいて特定のデータセットをリクエストすることができます。

Snowflakeデータマーケットプレイスでは、UID2 用に2つのパーソナライズされたリストが提供されています：
- 広告主/ブランド向けの [Unified ID 2.0 Advertiser Identity Solution](https://app.snowflake.com/marketplace/listing/GZT0ZRYXTMV)
- データプロバイダー向けの [Unified ID 2.0 Data Provider Identity Solution](https://app.snowflake.com/marketplace/listing/GZT0ZRYXTN0)


> IMPORTANT: データをリクエストするには、Snowflake アカウントに`ACCOUNTADMIN` ロール権限が必要です。

UID2 Share へのアクセスを要求するには、次の手順を実行します。

1. Snowflake Data Marketplace にログインし、関心のある UID2 ソリューションを選択します:
   - [Unified ID 2.0 Advertiser Identity Solution](https://app.snowflake.com/marketplace/listing/GZT0ZRYXTMV)
   - [Unified ID 2.0 Data Provider Identity Solution](https://app.snowflake.com/marketplace/listing/GZT0ZRYXTN0)
2. **パーソナライズドデータ** セクションで、**データのリクエスト** をクリックします。
3. 画面の指示に従って、連絡先やその他の必要情報を確認し、入力してください。
4. The Trade Desk の既存顧客で _Advertiser_ Identity Solution に興味がある場合は、データリクエストフォームの **Message** 欄に The Trade Desk が発行したパートナー ID および広告主 ID を記載してください。
5. フォームを送信します。

リクエストを受け取った後、UID2 Administrator が適切なアクセス方法をご連絡します。Snowflake でのデータリクエストの管理についての詳細は、[Snowflake documentation](https://docs.snowflake.com/en/user-guide/data-marketplace-consumer.html) を参照してください。

## Shared Objects

選択した UID 2ソリューションに関係なく、以下の関数を使って、DII を UID2にマッピングできます：

- `FN_T_UID2_IDENTITY_MAP` (See [Map DII](#map-dii))

以下の関数は非推奨となり、`FN_T_UID2_IDENTITY_MAP` が優先されます。これらの関数はまだ使用できますが、 `FN_T_UID2_IDENTITY_MAP` の方が優れています。すでにこれらの関数を使用している場合は、できるだけ早く廃止することを推奨します。

NOTE: 非推奨の関数を使用していて、新しい関数への移行の手助けが必要な場合は、[移行ガイド](#migration-guide)を参照してください。

- `FN_T_UID2_IDENTITY_MAP_EMAIL` (deprecated)
- `FN_T_UID2_IDENTITY_MAP_EMAIL_HASH` (deprecated)

再生成が必要な UID2 を特定するには、UID Share から `UID2_SALT_BUCKETS` ビューを使用します。詳しくは、[Regenerate UID2s](#regenerate-uid2s) を参照してください。

### Database and Schema Names

以下のセクションでは、各ソリューションのクエリ例を示します。これらは、データベースとスキーマ名の変数を除けば、同じものです:

```
{DATABASE_NAME}.{SCHEMA_NAME}
```

例:

```
select UID2, BUCKET_ID, UNMAPPED from table({DATABASE_NAME}.{SCHEMA_NAME}.FN_T_UID2_IDENTITY_MAP('validate@email.com', 'email'));
```

すべてのクエリ例では、各名前変数に以下のデフォルト値を使用しています:

| Variable          | Advertiser Solution Default Value | Data Provider Solution Default Value | Comments                                                                                                                                               |
| :---------------- | :-------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{DATABASE_NAME}` | `UID2_PROD_ADV_SH`                | `UID2_PROD_DP_SH`                    | 必要であれば、選択した UID2 Share へのアクセス権が与えられた後に新しいデータベースを作成する際に、デフォルトのデータベース名を変更できます。 |
| `{SCHEMA_NAME}`   | `ADV`                             | `DP`                                 | これはイミュータブルです。                                                                                                                             |

### Map DII

すべてのタイプの [DII](../ref-info/glossary-uid.md#gl-dii) をマッピングするには、`FN_T_UID2_IDENTITY_MAP` 関数を使用します。

DII がメールアドレスの場合、サービスは UID2 [メールアドレスの正規化](../getting-started/gs-normalization-encoding.md#email-address-normalization) 規則を使用して正規化されます。

DIIが電話番号の場合、UID2 [電話番号正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization) ルールを使用して、サービスに送信する前に正規化する必要があります。


| Argument     | Data Type    | Description                                                         |
| :----------- | :----------- | :------------------------------------------------------------------ |
| `INPUT`      | varchar(256) | UID2とセカンドレベルレベルのバケット ID にマッピングするDII。 |
| `INPUT_TYPE` | varchar(256) | マッピングするDIIのタイプ。指定できる値: `email`, `email_hash`, `phone`, `phone_hash` |

クエリに成功すると、指定された DII について以下の情報が返されます。


| Column Name | Data Type | Description                                                                                                                              |
| :---------- | :-------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `UID2`      | TEXT      | DII に関連付けられた UID2 です。                                                                                               |
| `BUCKET_ID` | TEXT      | UID2 を生成するために使用する、セカンドレベルのソルトバケット ID です。この ID は `UID2_SALT_BUCKETS` ビューのバケット ID に対応します。 |
| `UNMAPPED`  | TEXT      | 識別子がマッピングされなかった理由。 |


| `UID2` | TEXT | DII は正常にマッピングされました: <br/>DII は正常にマップされませんでした: `NULL`。 |
| `BUCKET_ID` | TEXT | DIIは正常にマップされました： UID2 の生成に使われたセカンドレベルのソルトバケットの ID。この ID は `UID2_SALT_BUCKETS` ビューのバケットIDに対応します。<br/>DIIは正常にマップされませんでした: `NULL`。 |
| `UNMAPPED` | TEXT |  DII は正常にマッピングされました: `NULL`<br/>DII は正常にマップされませんでした: `NULL`：  DII は正常にマップされませんでした: 識別子がマップされなかった理由: `OPTOUT`、`INVALID IDENTIFIER`、`INVALID INPUT TYPE` のいずれか。詳細は [Values for the UNMAPPED Column](#values-for-the-unmapped-column) を参照してください。

### Values for the UNMAPPED Column

`UNMAPPED`に指定できる値は以下の通りです:

| Value | Meaning |
| :-- | :-- |
| `NULL` | DII は正常にマッピングされました。 |
| `OPTOUT` | ユーザはオプトアウトしました。 |
| `INVALID IDENTIFIER` | メールアドレスまたは電話番号が無効です。 |
| `INVALID INPUT TYPE` | `INPUT_TYPE` の値が無効です。INPUT_TYPE の値は以下のいずれかでなければなりません: email`、`email_hash`、`phone`、`phone_hash`。　|

このセクションのマッピングリクエストの例:

- [Single Unhashed Email](#mapping-request-example---single-unhashed-email)
- [Multiple Unhashed Emails](#mapping-request-example---multiple-unhashed-emails)
- [Single Unhashed Phone Number](#mapping-request-example---single-unhashed-phone-number)
- [Multiple Unhashed Phone Numbers](#mapping-request-example---multiple-unhashed-phone-numbers)
- [Single Hashed Email](#mapping-request-example---single-hashed-email)
- [Multiple Hashed Emails](#mapping-request-example---multiple-hashed-emails)
- [Single Hashed Phone Number](#mapping-request-example---single-hashed-phone-number)
- [Multiple Hashed Phone Numbers](#mapping-request-example---multiple-hashed-phone-numbers)

#### Mapping Request Example - Single Unhashed Email

次のクエリは、[デフォルトのデータベースとスキーマ名](#database-and-schema-names) を使用して、単一のメールアドレスをマッピングする方法を示しています。

単一のメールアドレスに対する広告主ソリューションのクエリー：

```
select UID2, BUCKET_ID, UNMAPPED from table(UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP('validate@email.com', 'email'));
```

単一のメールアドレスに対するデータプロバイダーソリューションのクエリー：

```
select UID2, BUCKET_ID, UNMAPPED from table(UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP('validate@email.com', 'email'));
```

単一のメールアドレスに対するクエリー結果:

```
+----------------------------------------------+------------+----------+
| UID2                                         | BUCKET_ID  | UNMAPPED |
+----------------------------------------------+------------+----------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | NULL     |
+----------------------------------------------+------------+----------+
```

#### Mapping Request Example - Multiple Unhashed Emails

以下のクエリは、[デフォルトのデータベースとスキーマ名](#database-and-schema-names) を使用して、複数のメールアドレスをマッピングする方法を示しています。

複数のメールアドレスに対する広告主ソリューションのクエリー：

```
select a.ID, a.EMAIL, m.UID2, m.BUCKET_ID, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP(EMAIL, 'email') t) m
    on a.ID=m.ID;
```

複数のメールアドレスに対するデータプロバイダーソリューションのクエリー：

```
select a.ID, a.EMAIL, m.UID2, m.BUCKET_ID, UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP(EMAIL, 'email') t) m
    on a.ID=m.ID;
```

複数のメールアドレスに対するクエリー結果:

以下の表は、`NULL` または不適切な書式のメールアドレスに対する `NULL` 値を含む、 応答の各項目です。

```
+----+--------------------+----------------------------------------------+------------+--------------------+
| ID | EMAIL              | UID2                                         | BUCKET_ID  | UNMAPPED           |
+----+--------------------+----------------------------------------------+------------+--------------------+
|  1 | validate@email.com | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | NULL               |
|  2 | test@uidapi.com    | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | a30od4mNRd | NULL               |
|  3 | invalid-email      | NULL                                         | NULL       | INVALID IDENTIFIER |
|  4 | NULL               | NULL                                         | NULL       | INVALID IDENTIFIER |
+----+--------------------+----------------------------------------------+------------+--------------------+
```

#### Mapping Request Example - Single Unhashed Phone Number

以下のクエリは、[デフォルトのデータベース名とスキーマ名](#database-and-schema-names) を使って電話番号をマッピングする方法を示しています。

電話番号は、UID2 [電話番号正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization) ルールを使って正規化する必要があります。

単一の電話番号に対する広告主ソリューションのクエリー：

```
select UID2, BUCKET_ID, UNMAPPED from table(UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP('+12345678901', 'phone'));
```

単一の電話番号に対するデータプロバイダーソリューションのクエリー：

```
select UID2, BUCKET_ID, UNMAPPED from table(UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP('+12345678901', 'phone'));
```

単一の電話番号に対するクエリー結果:

```
+----------------------------------------------+------------+----------+
| UID2                                         | BUCKET_ID  | UNMAPPED |
+----------------------------------------------+------------+----------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | NULL     |
+----------------------------------------------+------------+----------+
```

#### Mapping Request Example - Multiple Unhashed Phone Numbers

以下のクエリは、[デフォルトのデータベース名とスキーマ名](#database-and-schema-names)を使用して、複数の電話番号をマップする方法を示しています。

電話番号は UID2 の[電話番号正規化](../getting-started/gs-normalization-encoding.md#phone-number-normalization) ルールを使って正規化する必要があります。

複数の電話番号に対する広告主ソリューションのクエリー：

```
select a.ID, a.PHONE, m.UID2, m.BUCKET_ID, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP(PHONE, 'phone') t) m
    on a.ID=m.ID;
```

複数の電話番号に対するデータプロバイダーソリューションのクエリー：

```
select a.ID, a.PHONE, m.UID2, m.BUCKET_ID, UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP(PHONE, 'phone') t) m
    on a.ID=m.ID;
```

複数の電話番号に対するクエリー結果:

The following table identifies each item in the response, including `NULL` values for `NULL` or invalid phone numbers.

```
+----+--------------+----------------------------------------------+------------+--------------------+
| ID | PHONE        | UID2                                         | BUCKET_ID  | UNMAPPED           |
+----+--------------+----------------------------------------------+------------+--------------------+
|  1 | +12345678901 | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | NULL               |
|  2 | +61491570006 | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | a30od4mNRd | NULL               |
|  3 | 1234         | NULL                                         | NULL       | INVALID IDENTIFIER |
|  4 | NULL         | NULL                                         | NULL       | INVALID IDENTIFIER |
+----+--------------+----------------------------------------------+------------+--------------------+
```


#### Mapping Request Example - Single Hashed Email

以下のクエリは、[デフォルトのデータベースとスキーマ名](#database-and-schema-names) を使用して、単一のメールアドレスハッシュをマップする方法を示しています。

単一のハッシュ化されたメールアドレスに対する広告主ソリューションのクエリー：

```
select UID2, BUCKET_ID, UNMAPPED from table(UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP(BASE64_ENCODE(SHA2_BINARY('validate@email.com', 256)), 'email_hash'));
```

単一のハッシュ化されたメールアドレスに対するデータプロバイダーソリューションのクエリー：

```
select UID2, BUCKET_ID, UNMAPPED from table(UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP(BASE64_ENCODE(SHA2_BINARY('validate@email.com', 256)), 'email_hash'));
```

単一のハッシュ化されたメールアドレスに対するクエリー結果:

```
+----------------------------------------------+------------+----------+
| UID2                                         | BUCKET_ID  | UNMAPPED |
+----------------------------------------------+------------+----------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | NULL     |
+----------------------------------------------+------------+----------+
```

#### Mapping Request Example - Multiple Hashed Emails

以下のクエリは、[デフォルトのデータベースとスキーマ名](#database-and-schema-names) を使用して、複数のメールアドレスハッシュをマッピングする方法を示しています。

複数のハッシュ化されたメールアドレスに対する広告主ソリューションのクエリー：

```
select a.ID, a.EMAIL_HASH, m.UID2, m.BUCKET_ID, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP(EMAIL_HASH, 'email_hash') t) m
    on a.ID=m.ID;
```

複数のハッシュ化されたメールアドレスに対するデータプロバイダーソリューションのクエリー：

```
select a.ID, a.EMAIL_HASH, m.UID2, m.BUCKET_ID, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP(EMAIL_HASH, 'email_hash') t) m
    on a.ID=m.ID;
```

複数のハッシュ化されたメールアドレスに対するクエリー結果:

以下の表は、`NULL` ハッシュの `NULL` 値を含め、レスポンスの各項目を示しています。

```
+----+----------------------------------------------+----------------------------------------------+------------+--------------------+
| ID | EMAIL_HASH                                   | UID2                                         | BUCKET_ID  | UNMAPPED           |
+----+----------------------------------------------+----------------------------------------------+------------+--------------------+
|  1 | LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI= | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | NULL               |
|  2 | NULL                                         | NULL                                         | NULL       | INVALID IDENTIFIER |
|  3 |/XJSTajB68SCUyuc3ePyxSLNhxrMKvJcjndq8TuwW5g=  | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | a30od4mNRd | NULL               |
+----+----------------------------------------------+----------------------------------------------+------------+--------------------+
```

#### Mapping Request Example - Single Hashed Phone Number

以下のクエリは、[デフォルトのデータベース名とスキーマ名](#database-and-schema-names) を使用して、単一の電話番号ハッシュをマップする方法を示しています。

単一のハッシュ化された電話番号に対する広告主ソリューションのクエリー：

```
select UID2, BUCKET_ID, UNMAPPED from table(UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP(BASE64_ENCODE(SHA2_BINARY('+12345678901', 256)), 'phone_hash'));
```

単一のハッシュ化された電話番号に対するデータプロバイダーソリューションのクエリー：

```
select UID2, BUCKET_ID, UNMAPPED from table(UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP(BASE64_ENCODE(SHA2_BINARY('+12345678901', 256)), 'phone_hash'));
```

単一のハッシュ化された電話番号に対するクエリー結果:

```
+----------------------------------------------+------------+----------+
| UID2                                         | BUCKET_ID  | UNMAPPED |
+----------------------------------------------+------------+----------+
| 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | NULL     |
+----------------------------------------------+------------+----------+
```

#### Mapping Request Example - Multiple Hashed Phone Numbers

以下のクエリは、[デフォルトのデータベース名とスキーマ名](#database-and-schema-names)を使用して、複数の電話番号ハッシュをマップする方法を示しています。

複数のハッシュ化された電話番号に対する広告主ソリューションのクエリー：

```
select a.ID, a.PHONE_HASH, m.UID2, m.BUCKET_ID, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_ADV_SH.ADV.FN_T_UID2_IDENTITY_MAP(PHONE_HASH, 'phone_hash') t) m
    on a.ID=m.ID;
```

複数のハッシュ化された電話番号に対するデータプロバイダーソリューションのクエリー：

```
select a.ID, a.PHONE_HASH, m.UID2, m.BUCKET_ID, m.UNMAPPED from AUDIENCE a LEFT JOIN(
    select ID, t.* from AUDIENCE, lateral UID2_PROD_DP_SH.DP.FN_T_UID2_IDENTITY_MAP(PHONE_HASH, 'phone_hash') t) m
    on a.ID=m.ID;
```

複数のハッシュ化された電話番号に対するクエリー結果:

以下の表は、`NULL` ハッシュの `NULL` 値を含め、レスポンスの各項目を示しています。

+----+----------------------------------------------+----------------------------------------------+------------+--------------------+
| ID | PHONE_HASH                                   | UID2                                         | BUCKET_ID  | UNMAPPED           |
+----+----------------------------------------------+----------------------------------------------+------------+--------------------+
|  1 | LdhtUlMQ58ZZy5YUqGPRQw5xUMS5dXG5ocJHYJHbAKI= | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | NULL               |
|  2 | NULL                                         | NULL                                         | NULL       | INVALID IDENTIFIER |
|  3 |/XJSTajB68SCUyuc3ePyxSLNhxrMKvJcjndq8TuwW5g=  | IbW4n6LIvtDj/8fCESlU0QG9K/fH63UdcTkJpAG8fIQ= | a30od4mNRd | NULL               |
+----+----------------------------------------------+----------------------------------------------+------------+--------------------+

### Regenerate UID2s

`UID2_SALT_BUCKETS` ビュークエリは、セカンドレベルのソルトバケットが最後に更新された日時を返します。セカンドレベルのソルトは UID2 を生成する際に使用されます。バケット内のソルトが更新されると、それまで生成されていた UID2 が古くなり、同じユーザーに対して他者が生成した UID2 とは一致しなくなります。

どの UID2 が再生成を必要としているかを判断するには、生成されたときのタイムスタンプを、セカンドレベルのソルトバケット更新の最新のタイムスタンプと比較します。

| Column Name            | Data Type     | Description                                                                                                                                                                                                    |
| :--------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BUCKET_ID`            | TEXT          | セカンドレベルのソルトバケットの ID です。この ID は、ID マップ関数が返す `BUCKET_ID` と同じものです。`BUCKET_ID` をキーとして、関数呼び出しの結果とこのビュー呼び出しの結果の間のジョインクエリを実行します。 |
| `LAST_SALT_UPDATE_UTC` | TIMESTAMP_NTZ | バケット内のソルトが最後に更新された時刻です。この値は UTC タイムゾーンで表現されます。                                                                                                                        |

次の例は、入力テーブルと、セカンドレベルのソルトが更新されたために再生成が必要なテーブルの UID2 を見つけるために使用されるクエリを示しています。

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

広告主ソリューションのクエリー：

```
select a.*, b.LAST_SALT_UPDATE_UTC
  from AUDIENCE_WITH_UID2 a LEFT OUTER JOIN UID2_PROD_ADV_SH.ADV.UID2_SALT_BUCKETS b
  on a.BUCKET_ID=b.BUCKET_ID
  where a.LAST_UID2_UPDATE_UTC < b.LAST_SALT_UPDATE_UTC or a.UID2 IS NULL;
```

データプロバイダーソリューションのクエリー：

```
select a.*, b.LAST_SALT_UPDATE_UTC
  from AUDIENCE_WITH_UID2 a LEFT OUTER JOIN UID2_PROD_DP_SH.DP.UID2_SALT_BUCKETS b
  on a.BUCKET_ID=b.BUCKET_ID
  where a.LAST_UID2_UPDATE_UTC < b.LAST_SALT_UPDATE_UTC or a.UID2 IS NULL;
```

クエリー結果:

以下の表は、レスポンスに含まれる各項目を表たものです。以下の ID1 の例で示すように、結果には EMAIL、`UID2`、`BUCKET_ID`、`LAST_UID2_UPDATE_UTC`、`LAST_SALT_UPDATE_UTC`が含まれます。ID 2 は、対応する UID2 が最後のバケット更新の後に生成されたため、情報は返されません。ID 3 は、UID2 が存在しないため、`NULL`値が返されます。

```
+----+--------------------+----------------------------------------------+------------+-------------------------+-------------------------+
| ID | EMAIL              | UID2                                         | BUCKET_ID  | LAST_UID2_UPDATE_UTC    | LAST_SALT_UPDATE_UTC    |
+----+--------------------+----------------------------------------------+------------+-------------------------+-------------------------+
|  1 | validate@email.com | 2ODl112/VS3x2vL+kG1439nPb7XNngLvOWiZGaMhdcU= | ad1ANEmVZ  | 2021-03-01 00:00:00.000 | 2021-03-02 00:00:00.000 |
|  3 | test2@uidapi.com   | NULL                                         | NULL       | NULL                    | NULL                    |
+----+--------------------+----------------------------------------------+------------+-------------------------+-------------------------+
```

## Migration Guide

`FN_T_UID2_IDENTITY_MAP_EMAIL` 関数と `FN_T_UID2_IDENTITY_MAP_EMAIL_HASH` 関数を使用している場合は、できるだけ早く `FN_T_UID2_IDENTITY_MAP` 関数に移行することをお勧めします。この関数は、他の2つの関数が行うことをすべて行い、その他の改良も組み込まれています。

`FN_T_UID2_IDENTITY_MAP`関数の利点：

- 電話番号とハッシュ化された電話番号の両方のマッピングをサポートしています。
- ユーザーのオプトアウトをサポートしました。
- `UNMAPPED` という新しいカラムが追加されました。何らかの理由で DII を UID2 にマッピングできない場合、この列にはその理由についての情報が含まれます。詳細については、[Values for the UNMAPPED Column](#values-for-the-unmapped-column)を参照してください。

このセクションには、新機能へのアップグレードに役立つ以下の情報が含まれています：

- [既存のコードの変更](#changing-existing-code) 
- [UNMAPPEDカラムの値を使う](#using-the-values-for-the-unmapped-column)

### Changing Existing Code

このセクションのコード・スニペットは、以前の関数がどのように実装されているか、そして新しい関数を使用するためにどのように更新できるかを示す Before / After の例です。


#### Example for mapping unhashed emails

Before:

```
FN_T_UID2_IDENTITY_MAP_EMAIL(EMAIL)
```

After:

```
FN_T_UID2_IDENTITY_MAP(EMAIL, 'email')
```

#### Example for mapping unhashed emails

Before:

```
FN_T_UID2_IDENTITY_MAP_EMAIL_HASH(EMAIL_HASH)
```

After:

```
FN_T_UID2_IDENTITY_MAP(EMAIL_HASH, 'email_hash')
```

### Using the Values for the UNMAPPED Column

新しい関数を実装したら、`FN_T_UID2_IDENTITY_MAP`が返す `UNMAPPED` カラムをチェックすることができます。DII が UID2 にマッピングできなかった場合、この列にはその理由が示されます。

値とその説明の詳細については、[Values for the UNMAPPED Column](#values-for-the-unmapped-column)を参照してください。
