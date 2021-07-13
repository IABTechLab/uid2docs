[UID2 API Documentation](../../README.md) > v1 > Integration Guides > Advertiser/Data Provider Integration Guide

# 概要

このガイドでは、ユーザーデータを収集してDSPにプッシュする組織のインテグレーション手順について説明します。データコレクターには、広告主、データオンボーダ、測定プロバイダ、アイデンティティグラフプロバイダ、サードパーティデータプロバイダ、およびDSPにデータを送信するその他組織が含まれます。

# インテグレーションステップ

このセクションでは、データコレクターがオーディエンスの構築とターゲティングのためにPIIをUID2識別子にマッピングするための手順を説明します。PIIとは、ユーザーの正規化されたメールアドレス、またはSHA256ハッシュ化された正規化されたメールアドレスを指します。

![Advertiser Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBEUCBhcyBEYXRhIFByb3ZpZGVyXG4gICAgcGFydGljaXBhbnQgVUlEMiBhcyBVSUQyIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBEU1BcbiAgICBsb29wIDEuIOOCouOCpOODh-ODs-ODhuOCo-ODhuOCo-ODnuODg-ODl-OBruOCqOODs-ODieODneOCpOODs-ODiOOCkuS9v-eUqOOBl-OBpuOAgVBJSSDjga4gVUlEMiDjgpLlj5blvpfjgZfjgb7jgZnjgIJcbiAgICBEUC0-PlVJRDI6IDEtYS4gUElJIOOCkuWQq-OCgOODquOCr-OCqOOCueODiOOCkiBJRCDjg57jg4Pjg5Tjg7PjgrDjgqjjg7Pjg4njg53jgqTjg7Pjg4jjgavpgIHkv6HjgZfjgb7jgZnjgIJcbiAgICBVSUQyLT4-RFA6IDEtYi4gSUQg44Oe44OD44OU44Oz44Kw44K144O844OT44K544GL44KJ6L-U44GV44KM44GfIFVJRDIg44Go44K944Or44OI44OQ44Kx44OD44OI44KS5L-d5a2Y44GX44G-44GZ44CCXG4gICAgZW5kXG4gICAgRFAtLT4-RFNQOiAyLiDkv53lrZjjgZXjgozjgZ9VSUQy44KSRFNQ44Gr6YCB44KK44CB44Kq44O844OH44Kj44Ko44Oz44K544KS5L2c5oiQ44GX44G-44GZ44CCXG4gICAgbG9vcCAzLiDkv53lrZjjgZXjgozjgabjgYTjgotVSUQy44Gr6Zai6YCj44GZ44KL44K944Or44OI44OQ44Kx44OD44OI44Gu44Ot44O844OG44O844K344On44Oz44KS44Oi44OL44K_44O844GX44G-44GZ44CCXG4gICAgICAgRFAtPj5VSUQyOiAzLWEuIOODkOOCseODg-ODiOOCteODvOODk-OCueOCkuWIqeeUqOOBl-OBpuOCveODq-ODiOODkOOCseODg-ODiOOBruODreODvOODhuODvOOCt-ODp-ODs-OCkuODouODi-OCv-ODvOOBl-OBvuOBmeOAglxuICAgICAgIFVJRDItPj5EUDogMy1iLiDkuI7jgYjjgonjgozjgZ_jgr_jgqTjg6Djgrnjgr_jg7Pjg5fku6XpmY3jgavjg63jg7zjg4bjg7zjgrfjg6fjg7PjgZfjgZ_jgr3jg6vjg4jjg5DjgrHjg4Pjg4jjgpLov5TjgZfjgb7jgZnjgIJcbiAgICAgICBEUC0-PlVJRDI6IDMtYy4g44Ot44O844OG44O844K344On44Oz44GV44KM44Gf44K944Or44OI44OQ44Kx44OD44OI44KS44CB5L-d5a2Y44GV44KM44Gm44GE44KLVUlEMuOCveODq-ODiOODkOOCseODg-ODiOOBqOavlOi8g-OBl-OBvuOBmeOAgjxicj7jg63jg7zjg4bjg7zjg4jjgZXjgozjgZ_loLTlkIjjgIHmlrDjgZfjgYRVSUQy44KS5b6X44KL44Gf44KB44GrUElJ44KSSUTjg57jg4Pjg5Tjg7PjgrDjgrXjg7zjg5Pjgrnjgavlho3pgIHjgZnjgovjgIJcbiAgICAgICBVSUQyLT4-RFA6IDMtZC4gSUQg44Oe44OD44OU44Oz44Kw44K144O844OT44K544GL44KJ6L-U44GV44KM44GfIFVJRDIg44Go44K944Or44OI44OQ44Kx44OD44OI44KS5qC857SN44GX44G-44GZ44CCXG4gICAgZW5kIiwibWVybWFpZCI6eyJ0aGVtZSI6ImZvcmVzdCJ9LCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9)

## 1. アイデンティティマップのエンドポイントを使用してPII の UID2 を取得

| Step | Endpoint | Instruction |
| --- | --- | --- |
| a | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | PII を含むリクエストを ID マッピングエンドポイントに送信します。 |
| b | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | 返却された`advertising_id`(UID2)は、関連するDSPでオーディエンスをターゲットにするために使用することができます。<br><br>レスポンスには、ユーザーのUID2と、1年ごとにローテーションするソルトの`bucket_id`が返されます。ユーザーのUID2が更新されても、ソルトバケットは同じままです。ソルトバケットのローテーションを確認する方法は、[3](#3-monitor-for-salt-bucket-rotations-related toyour-stored-uid2s)を参照してください。<br><br>メンテナンスを容易にするために、ユーザーのUID2と`bucket_id`をマッピングテーブルに保存することを勧めます。インクリメンタル・アップデートのガイダンスについては、[4](#4-use-an-incremental-process-to-continuously-update-uid2s)を参照してください。 |

## 2. UID2をDSPに送信しオーディエンスを構築
オーディエンスを構築しながら、[1](#1-retrieve-a-uid2-for-pii-using-the-identity-map-endpoints)の`advertising_id`(UID2)をDSPに送信します。DSPごとに、オーディエンスを構築するためのインテグレーションプロセスは異なります。オーディエンスを構築するためにUID2を送信する際は、DSPが提供するインテグレーションガイダンスに従ってください。

## 3. 保存したUID2に関連するソルトバケットのローテーションをモニター
UID2はある瞬間のユーザーの識別子であるため、ユーザーのUID2は少なくとも1年に1回はローテーションします。

アクティブなユーザーには、毎日ソルトバケットのローテーションをモニターすることを勧めます。ソルトバケットは年に1回ローテーションしますが、ローテーションする日が変わることもあります。ソルトバケットのローテーションを毎日確認することで、最新のUID2がインテグレーションに反映されます。

| Step | Endpoint | Instruction |
| --- | --- | --- |
| a | [GET /identity/buckets](../endpoints/get-identity-buckets.md) | 指定されたタイムスタンプ以降に変更されたすべてのソルトバケットについて、Bucket Status エンドポイントにリクエストを送信します。|
| b | [GET /identity/buckets](../endpoints/get-identity-buckets.md) | バケットステータスのエンドポイントは、`bucket_id` と `last_updated` のタイムスタンプのリストを返します。 |
| c | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | 返却された `bucket_id` をキャッシュした UID2 のソルトバケットと比較します。<br>UID2 のソルトバケットがローテーションした場合は、新しい UID2 のために ID マッピングサービスに PII を再送します。 |
| d | [GET /identity/map](../endpoints/get-identity-map.md)<br>[POST /identity/map](../endpoints/post-identity-map.md) | 返却された `advertising_id` と `bucket_id` を格納します。 |

## 4. インクリメンタル・プロセスを使用して、UID2を継続的に更新

UID2 ベースのオーディエンスは、上記の手順で継続的に更新・維持されます。

[1](#1-retrieve-a-uid2-for-pii-using-the-identity-map-endpoints)からのレスポンスには、マッピング情報が含まれています。PII（`identifier`）、UID2（`advertising_id`）、ソルトバケット（`bucket_id`）のマッピングを、最終更新タイムスタンプとともにキャッシュします。

[3](#3-monitor-for-salt-bucket-rotations-related-to-your-stored-uid2s)の結果を利用して、[1](#1-retrieve-a-uid2-for-pii-using-the-identity-map-endpoints)を繰り返し、UID2をローテーションしたソルトバケットと再マッピングする。[2](#2-send-uid2-to-a-dsp-to-build-an-audience)を繰り返し、オーディエンスのUID2を更新します。

# よくある質問

## ソルトバケットのローテーションによるUID2の更新時期を知るにはどうしたらいいですか？
UID2 生成リクエストで提供されるメタデータは、UID2 の生成に使用されるソルトバケットが含まれます。ソルトバケットは、UID2 を生成するために使用された基礎となる PII に対応し、持続します。[GET /identity/buckets](../endpoints/get-identity-buckets.md)エンドポイントを使用すると、指定されたタイムスタンプ以降にローテーションされたソルトバケットが返されます。返却されたローテーションされたソルトバケットは、どのUID2をリフレッシュすべきかを知らせてくれます。このワークフローは通常、データプロバイダーに適用されます。

## インクリメンタル・アップデートの場合、UIDはどのくらいの頻度でリフレッシュすべきですか？
オーディエンスへのアップデートは、毎日行うことを勧めます。

## マッピング用のPIIのSHA256はどのように生成すればよいのでしょうか？
システムは[email normalization rules](../../README.md#email-normalization)に従い、ソルトを使用せずにハッシュ化する必要があります。値は送信前にbase64エンコードする必要があります。
