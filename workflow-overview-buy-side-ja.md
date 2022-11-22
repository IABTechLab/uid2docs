[UID2 Overview](./README-ja.md) > Buy-Side Workflow

# Buy-Side Workflow Overview

以下のステップは、ビッドストリームで UID2 を取引するデマンドサイドプラットフォーム（DSP）を想定したワークフローのアウトラインです。

1. データプロバイダーは、ファーストパーティおよびサードパーティのデータを Raw UID2 として DSP に渡します。
2. DSP は UID2 Administrator と同期し、復号化キーを受け取ります。
3. DSP はビッドストリーム内の UID2 Token にアクセスし、入札時に復号化します。
4. DSP は UID2 Administrator からのオプトアウトリクエストを受け、オプトアウトした UID2 の買付をブロックします。

![Buy-Side Workflow](/images/buy_side.jpg)

## Integration Requirements

UID2 とインテグレーションして、ブランド（ファーストパーティデータとして）やデータプロバイダー（サードパーティデータとして）から UID2 を受け取り、ビッドストリームにおける UID2 の入札情報に活用するためには、バイサイドは以下の要件を満たしている必要があります。

- UID2 形式のデータを受け取る。
- UID2 形式のデータに入札する。
- オプトアウト要求に対応するための Webhook を構築する。
- UID2 Administrator と暗号化キーを毎日同期させる。

詳細は、[DSP Integration Guide](/api-ja/v2/guides/dsp-guide.md) を参照してください。

オプションとして、DSP が PII から UID2 を自ら生成したい場合は、[Third-Party Data Provider Workflow](./workflow-overview-3p-data-provider-ja.md) に従うこともできます。
