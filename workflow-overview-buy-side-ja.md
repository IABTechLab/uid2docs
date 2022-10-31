[UID2 Overview](./README-ja.md) > Buy-Side Workflow

# Buy-Side Workflow Overview

The following steps provide a high-level outline of the workflow intended for demand-side platforms (DSPs) that transact on UID2s in the bid stream.

1. Data providers pass first-party and third-party data to DSPs in the form of raw UID2s.
2. DSPs sync with UID2 Administrator to receive decryption keys.
3. DSPs access UID2 tokens in the bid stream and decrypt them at bid time.
4. DSPs listen to opt-out requests from UID2 Administrator and block buying on any UID2 that has opted-out.

![Buy-Side Workflow](/images/buy_side.jpg)

以下のステップは、ビッドストリームで UID2 を取引するデマンドサイドプラットフォーム（DSP）を想定したワークフローのアウトラインです。

1. データプロバイダーは、ファーストパーティおよびサードパーティのデータを raw UID2 として DSP に渡します。
2. DSP は UID2 Administrator と同期し、復号化キーを受け取ります。
3. DSP はビッドストリーム内の UID2 Token にアクセスし、入札時に復号化します。
4. DSP は UID2 Administrator からのオプトアウトリクエストを受け、オプトアウトした UID2 の買付をブロックします。

![Buy-Side Workflow](/images/buy_side.jpg)

## Integration Requirements

To integrate with UID2 to receive UID2s from brands (as first-party data) and data providers (as third-party data) and leverage them to inform bidding on UID2s in the bid stream, the buy-side participants must meet the following requirements:

- Accept data in the form of UID2s
- Bid on data in the form of UID2s
- Build a webhook for honoring opt-out requests
- Sync encryption keys daily with the UID2 Administrator

For details, see [DSP Integration Guide](/api-ja/v2/guides/dsp-guide.md).

Optionally, if a DSP wants to generate UID2s themselves from PII, they may also follow the [Third-Party Data Provider Workflow](./workflow-overview-3p-data-provider-ja.md).

UID2 とインテグレーションして、ブランド（ファーストパーティデータとして）やデータプロバイダー（サードパーティデータとして）から UID2 を受け取り、ビッドストリームにおける UID2 の入札情報に活用するためには、バイサイドは以下の要件を満たしている必要があります。

- UID2 形式のデータを受け取る。
- UID2 形式のデータに入札する。
- オプトアウト要求に対応するための Webhook を構築する。
- UID2 Administrator と暗号化キーを毎日同期させる。

詳細は、[DSP Integration Guide](/api-ja/v2/guides/dsp-guide.md) を参照してください。

オプションとして、DSP が PII から UID2 を自ら生成したい場合は、[Third-Party Data Provider Workflow](./workflow-overview-3p-data-provider-ja.md) に従うことも可能です。
