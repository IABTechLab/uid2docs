[UID2 Overview](../README-ja.md) > DSP Workflow

# DSP Workflow Overview

以下のステップは、ビッドストリームで UID2 を取引するデマンドサイドプラットフォーム（DSP）を想定したワークフローのアウトラインです。

1. データプロバイダーは、ファーストパーティおよびサードパーティのデータを raw UID2 として DSP に渡します。
2. DSP は UID2 Administrator と同期し、復号鍵を受け取ります。
3. DSP はビッドストリーム内の UID2 Token にアクセスし、入札時に復号化します。
4. DSP は UID2 Administrator からのオプトアウトリクエストを受け、オプトアウトした UID2 の買い付けをブロックします。

以下のプロセスはバックグラウンドで実行されますます：

- 広告主やデータプロバイダーは、ファーストパーティおよびサードパーティのオーディエンスセグメントを DSP に渡します。
- DSP は UID2 Operator と同期して、復号鍵を受け取ります。
- DSP は、UID2 Operator からのオプトアウトの要求を聞きます。

各ビッド/広告インプレッションについて、以下の手順が実行されます：

1. 入札リクエストは、UID2 Token とともにビッドストリームに渡されます。
2. 2.DSPは、UID2トークン付きの入札リクエストをビッドストリームから受信します。
3. DSP は：
   - UID2 Token を復号して raw UID2 にします。
   - ユーザーがオプトアウトしたかどうかを確認し、オプトアウトした場合は入札を行いません。
   - raw UID2 を視聴者セグメントにマッチングさせます。
4. DSP は、raw UID2 に基づいて、ビッドストリームにビッドレスポンスを送信します。 

![Buy-Side Workflow](images/UID2BuySIdeDSPWorkflow.jpg)

## Integration Requirements

UID2 とインテグレーションして、ブランド（ファーストパーティデータとして）やデータプロバイダー（サードパーティデータとして）から UID2 を受け取り、ビッドストリームにおける UID2 の入札情報に活用するためには、バイサイドは以下の要件を満たしている必要があります。

- UID2 形式のデータを受け取る。
- UID2 形式のデータに入札する。
- オプトアウトリクエストに対応するための Webhook を構築する。
- UID2 Administrator と暗号化キーを毎日同期させる。

詳細は、[DSP Integration Guide](../api-ja/v2/guides/dsp-guide.md) を参照してください。

オプションとして、DSP が個人を識別できる情報(DII)から UID2 を自ら生成したい場合は、[Third-Party Data Provider Workflow](workflow-overview-3p-data-provider-ja.md) に従うこともできます。
