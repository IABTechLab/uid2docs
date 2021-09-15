[UID2 API Documentation](../../README.md) > v1 > [Integration Guides](README.md) > DSP Integration Guide

# 概要

このガイドは、ビッドストリームでUID2を取引するDSPのためのものです。

# インテグレーションステップ

以下は、DSPがRTBの一部としてUID2をサポートするためのインテグレーションワークフローです。

DSPのインテグレーションには2つのコンポーネントがあります。
1. ユーザーのオプトアウトを履行します。
2. UID2 Tokenを復号してRTBに使用します。

![DSP Flow](https://mermaid.ink/svg/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIOODpuODvOOCtuODvFxuICAgIHBhcnRpY2lwYW50IFNTUFxuICAgIHBhcnRpY2lwYW50IERTUFxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgVEMgYXMgVHJhbnNwYXJlbmN5ICYgQ29udHJvbCBQb3J0YWxcbiAgICBOb3RlIG92ZXIgVSxUQzogMS4g44Om44O844K244O844Gu44Kq44OX44OI44Ki44Km44OI44KS5bGl6KGM44GX44G-44GZ44CCXG4gICAgVS0-PlRDOiAxLWEuIOODpuODvOOCtuODvOOBjOOCquODl-ODiOOCouOCpuODiOOBl-OBvuOBmeOAglxuICAgIGFjdGl2YXRlIFRDXG4gICAgVEMtPj5VSUQyOiAxLWIuIFVJRDLjgrXjg7zjg5PjgrnjgYzjgqrjg5fjg4jjgqLjgqbjg4jjgpLlj5fjgZHlj5bjgorjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFRDXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5EU1A6IDEtYy4gRFNQ44Gv44Kq44OX44OI44Ki44Km44OI44KS5Y-X44GR5Y-W44KK44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBVSUQyXG4gICAgTm90ZSBvdmVyIFUsVEM6IDIuIFJUQuOBp-S9v-eUqOOBmeOCi1VJRDIgVG9rZW7jgpLlvqnlj7fjgZfjgb7jgZnjgIJcbiAgICBTU1AtLT4-RFNQOiBTU1Djga_jgIFEU1DjgpLlkbzjgbPlh7rjgZfjgablhaXmnK3jgpLooYzjgYTjgb7jgZnjgIJcbiAgICBEU1AtPj5EU1A6IDItYS4gVUlEMuODiOODvOOCr-ODs-OCkuW-qeWPt-OBl-OBvuOBmeOAglxuICAgIERTUC0-PkRTUDogMi1iLiDjg6bjg7zjgrbjg7zjga7jgqrjg5fjg4jjgqLjgqbjg4jjgpLlsaXooYzjgZflhaXmnK3jg63jgrjjg4Pjgq_jgpLlrp_ooYzjgZfjgb7jgZnjgIIiLCJtZXJtYWlkIjp7InRoZW1lIjoiZm9yZXN0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

## 1. ユーザーのオプトアウトを履行

UID2サービスからユーザーのオプトアウトを受け取り、履行するために、DSPはあらかじめ設定されたインターフェースを用意し、オンボーディング時にUID2サービスに提供します。UID2サービスは、ユーザーのUID2とオプトアウトのタイムスタンプをあらかじめ設定されたインターフェイスに送信します。インターフェイスの例としては、WebhookやAPIエンドポイントなどがあります。

UID2サービスは、ユーザーがオプトアウトしてから数秒以内に以下のデータを送信し、DSPはこれを記録し、[2](#2-decrypt-uid2-tokens-touse-in-rtb)で定義された入札ロジックを使用します。

| Parameter | Description |
| --- | --- |
| `identity` | オプトアウトしたユーザーのUID2 |
| `timestamp` | ユーザーがオプトアウトした時間 |

以下の例では、UID2とそれに対応するタイムスタンプを受信するように構成されたWebhookを示しています。

```html
https://dsp.example.com/optout?user=%%identity%%&optouttime=%%timestamp%%
```
### Bidding Opt-Out Logic

入札時（2-b）に以下のロジックを使用して、ユーザーのオプトアウトを履行します。

提供されている[RTB SDK](../sdks/dsp-client-v1-overview.md)を利用して、受信したUID2 Tokenを復号します。レスポンスには、UID2 と UID2 が作成された時刻が含まれています。DSP は UID2 の最新のオプトアウト・タイムスタンプを確認する必要があります。このタイムスタンプは以下の疑似コードでは `optout_timestamp` と表されます。

次の図は、オプトアウトのロジックを示しています。

![DSP Opt-Out Check](https://mermaid.ink/svg/eyJjb2RlIjoiZ3JhcGggTFJcbkFbVUlEMiBUb2tlbuW-qeWPt-WMll0gLS0-IEJbVUlEMuOBq-WvvuOBmeOCi-OCquODl-ODiOOCouOCpuODiOOBruWPluW-l11cbiAgICBCIC0tPiBDe-OCquODl-ODiOOCouOCpuODiOOCkuODgeOCp-ODg-OCr31cbiAgICBDIC0tPiB8T3B0ZWQgT3V0fCBEW1VJRDLjgarjgZfjgaflhaXmnK1dXG4gICAgQyAtLT4gfE5vdCBPcHRlZCBPdXR8IEVbVUlEMuOBp-WFpeacrV0iLCJtZXJtYWlkIjp7InRoZW1lIjoiZm9yZXN0In0sInVwZGF0ZUVkaXRvciI6ZmFsc2UsImF1dG9TeW5jIjp0cnVlLCJ1cGRhdGVEaWFncmFtIjpmYWxzZX0)

`established_timestamp`の値が`optout_timestamp`の値よりも小さい場合、ユーザーはオプトアウトしたことになり、そのUID2はRTBに使用されるべきではありません。このような場合、代替IDを送って入札するか、入札しないかはDSP次第です。

<b>オプトアウトチェック</b>ステップのロジックは:
```java
if (established_timestamp < optout_timestamp) {
  // Opted out
}
```

## 2. RTBで使用するUID2 Tokenを復号

| Step | SDK | Instruction |
| --- | --- | --- |
| a | [RTB SDK](../sdks/dsp-client-v1-overview.md)  | 提供されているSDKを利用して、受信したUID2 Tokenを復号します。レスポンスには、`UID2`とUID2の作成時刻が含まれます。 |
| b | | DSP は UID2 のオプトアウトプロトコルを履行する必要があります。ユーザーのオプトアウトの設定と入札時のオプトアウトの履行については、[1](#1-honor-user-opt-outs)を参照してください。 |

# よくある質問

### UID2に適用する復号化キーを知るにはどうすればいいですか？

復号化キーの更新は、提供される[RTB SDK](../sdks/dsp-client-v1-overview.md)によって自動的に行われます。UID2 Tokenのメタデータには、暗号化のタイムスタンプが設定されており、これによりどの復号鍵が適用されるかがわかります。

### 復号化キーはどこで入手できますか？
[RTB SDK](../sdks/dsp-client-v1-overview.md)ライブラリは、バックグラウンドでUID2サービスと通信し、定期的に最新の鍵を取得します。
