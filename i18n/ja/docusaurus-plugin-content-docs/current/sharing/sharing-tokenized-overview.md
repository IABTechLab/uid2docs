---
title: Tokenized Sharing Overview
description: Tokenized Sharing のオプションについて学ぶ。
hide_table_of_contents: false
sidebar_position: 04
---

import Link from '@docusaurus/Link';

# Tokenized Sharing Overview

UID2 では、Tokenized Sharing は、<Link href="../ref-info/glossary-uid#gl-dii">DII</Link> または <Link href="../ref-info/glossary-uid#gl-raw-uid2">raw UID2s</Link> を <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 tokens</Link> に暗号化し、トークンを承認した [sharing participants](ref-info/glossary-uid.md#gl-sharing-participant) と共有することを意味します。UID2 Token を使用することで、データの送信者と受信者の間でエンドツーエンドで raw UID2 を保護することができます。Tokenized sharing は、<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>またはピクセル経由での共有に必要ですが、どのような共有ユースケースでも使用できます。

トークンは、次のいずれかの方法で生成されます:
- raw UID2 を UID2 Token に暗号化する: [Tokenized Sharing: Starting with a Raw UID2](#tokenized-sharing-starting-with-a-raw-uid2) を参照してください。
- DII から直接 UID2 Token を生成する: [Tokenized Sharing: Starting with DII](#tokenized-sharing-starting-with-dii) を参照してください。

## Tokenized Sharing Scenarios

多くのシナリオでは、UID2 データは <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> の形で共有されます。主なユースケースは次の表に示されています。

| Scenario | Sender | Receiver | Sharing Approach |
| :--- | :--- | :--- | :--- |
| ビッドストリームで UID2 を送信する | パブリッシャー | DSP | [Tokenized Sharing in the Bidstream](sharing-tokenized-from-data-bid-stream.md) を参照してください |
| トラッキングピクセルで UID2 を送信する | どの共有参加者でも | どの共有参加者でも | [Tokenized Sharing in Pixels](sharing-tokenized-from-data-pixel.md) を参照してください |
| 他の共有参加者に UID2 Token を送信する | どの共有参加者でも、[UID2 Sharing のセキュリティ要件](sharing-security.md) が満たされない場合、またはその他の理由がある場合 | どの共有参加者でも | [Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md) を参照してください |

その他の例については、[Sharing UID2s: Use Cases](sharing-use-cases.md) を参照してください。

## Sending UID2 Tokens to Another Sharing Participant

<Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 Token </Link> を介して別の共有参加者と UID2 を共有することは、どのような共有シナリオでもオプションですが、ビッドストリーム内またはピクセル内では必須です。次の表に示すように、プロセスは開始点によって少し異なります。

実装に適したインテグレーションオプションを選択し、詳細に進んでください。

| Starting Point | Encryption Option/Scenario | Link to Details |
| :--- | :--- | :--- |
| DII | DII からの UID2 Token をビッドストリームで共有 | [Tokenized Sharing in the Bidstream](sharing-tokenized-from-data-bid-stream.md) |
| DII | DII からの UID2 Token をトラッキングピクセルで共有 | [Workflow: Tokenized Sharing in Tracking Pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-in-tracking-pixels) |
| Raw UID2 | クリエイティブピクセルでの UID2 Token 共有 | [Workflow: Tokenized Sharing in Creative Pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-in-creative-pixels) |
| Raw UID2 | SDK を使用して UID2 Token を共有 | [Implementing Sharing Encryption/Decryption with an SDK](sharing-tokenized-from-raw.md#implementing-sharing-encryptiondecryption-with-an-sdk) |
| Raw UID2 | Snowflake を使用して UID2 Token を共有 | [Implementing Sharing Encryption/Decryption Using Snowflake](sharing-tokenized-from-raw.md#implementing-sharing-encryptiondecryption-using-snowflake) |

## Receiving UID2 Tokens from Another Sharing Participant

承認された共有シナリオでは、受信者が取る手順はすべての共有シナリオで同じです。受信者が UID2 Token を復号化して raw UID2 に変換するには、受信者は UID2 Portal アカウントを持っている必要があり、送信者は UID2 Portal で受信者と共有関係を作成して、受信者が送信者の復号化キーにアクセスできるようにする必要があります。

:::tip
トークンの失効を避けるため、トークンを受け取ったらできるだけ早く復号化すること進めます。詳細は [Best Practices for Managing Raw UID2s and UID2 Tokens](sharing-best-practices.md#best-practices-for-managing-raw-uid2s-and-uid2-tokens) を参照してください。
:::

受信者が UID2 Token を復号化するための実装オプションは次のとおりです。

| Starting Point | Decryption Option/Scenario | Link to Details |
| :--- | :--- | :--- |
| Token | C# / .NET SDK | [SDK for C# / .NET: Usage for UID2 Sharers](../sdks/sdk-ref-csharp-dotnet.md#usage-for-uid2-sharers) |
| Token | C++ SDK | [SDK for C++: Usage for UID2 Sharers](../sdks/sdk-ref-cplusplus.md#usage-for-uid2-sharers) |
| Token | Java SDK | [SDK for Java: Usage for UID2 Sharers](../sdks/sdk-ref-java.md#usage-for-uid2-sharers) |
| Token | Python SDK | [SDK for Python: Usage for UID2 Sharers](../sdks/sdk-ref-python.md#usage-for-uid2-sharers) |
| Token | Snowflake | [Snowflake Integration Guide: Usage for UID2 Sharers](../guides/integration-snowflake.md#usage-for-uid2-sharers)
| Token | Decryption of UID2 tokens sent in the bidstream (DSPs only) | [DSP Integration Guide: Decrypt UID2 Tokens for RTB Use](../guides/dsp-guide#decrypt-uid2-tokens-for-rtb-use)

## Tokenized Sharing Examples

Tokenized sharing は、DII から始めるか、raw UID2 から始めるかによって異なります。このセクションには次の内容が含まれます:

- [Tokenized Sharing: Starting with DII](#tokenized-sharing-starting-with-dii)
- [Example: DII to UID2 Token](#example-dii-to-uid2-token)
- [Tokenized Sharing: Starting with a Raw UID2](#tokenized-sharing-starting-with-a-raw-uid2)
- [Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token)

### Tokenized Sharing: Starting with DII

DII から始めることは、[sharing in the bidstream](sharing-tokenized-from-data-bid-stream.md) と [sharing in tracking pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-in-tracking-pixels) において最も一般的です。

DII から初めて、UID2 Token を生成するには、次のいずれかの方法を選択してください:

- Option 1 (推奨): UID2 SDK のいずれかを使用するか、[POST&nbsp;/token/generate](../endpoints/post-token-generate.md) エンドポイントを使用して DII から UID2 Token を生成します。

- Option 2: raw UID2 に変換してから暗号化します:

   1. 入力されたメールアドレスまたは電話番号を raw UID2 に変換し、安全に保存します。

   2. raw UID2 を暗号化して、他の信頼できる UID2 共有参加者と共有できる UID2 Token を生成します。例は、[Example: DII to UID2 Token](#example-dii-to-uid2-token) を参照してください。

次に、生成された UID2 Token を他の信頼できる UID2 共有参加者と共有します。

### Example: DII to UID2 Token

以下の例は、入力 DII を直接 UID2 Token に変換する場合のサンプル値を示しています。

<table>
<colgroup>
    <col style={{
      width: "30%"
    }} />
    <col style={{
      width: "40%"
    }} />
    <col style={{
      width: "30%"
    }} />
  </colgroup>
<thead>
<tr>
<th>Input Example</th>
<th>Process/User</th>
<th >Result</th>
</tr>
</thead>
<tbody>
<tr>
<td>user@example.com</td>
<td>Convert email/phone number to UID2 token</td>
<td style={{
  wordBreak: "break-all"
}}>KlKKKfE66A7xBnL/DsT1UV/Q+V/r3xwKL89Wp7hpNllxmNkPaF8vdzenDvfoatn6sSXbFf5DfW9wwbdDwMnnOVpPxojkb8KYSGUte/FLSHtg4CLKMX52UPRV7H9UbWYvXgXC4PaVrGp/Jl5zaxPIDbAW0chULHxS+3zQCiiwHbIHshM+oJ==</td>
</tr>
</tbody>
</table>

### Tokenized Sharing: Starting with a Raw UID2

raw UID2 を暗号化するために Tokenized Sharing を設定するには、各参加者がいくつかの手順を踏む必要があります:

- **送信者**: raw UID2 を暗号化して UID2 Token を生成し、トークンを承認された共有参加者に送信します。
- **受信者**: 受信者は、UID2 Token を受け取り、復号化します。

Tokenized sharing を raw UID2 から始めることは、[creative pixels](sharing-tokenized-from-data-pixel.md#workflow-tokenized-sharing-in-creative-pixels) で一般的です。他のシナリオでも使用できます。詳細は [Tokenized Sharing from Raw UID2s](sharing-tokenized-from-raw.md) を参照してください。

raw UID2 から始める場合は、次の手順に従ってください:

1. 他の信頼できる UID2 共有参加者と UID2 Token を共有するために、raw UID2 を暗号化して UID2 Token を生成します。例は、[Example: Raw UID2 to UID2 Token](#example-raw-uid2-to-uid2-token) を参照してください。

2. 生成された UID2 Token を他の信頼できる UID2 共有参加者と共有します。

### Example: Raw UID2 to UID2 Token

入力 DII を raw UID2 に変換し、その後 raw UID2 を暗号化して UID2 Token を生成する例を次に示します。

<table>
<colgroup>
    <col style={{
      width: "5%"
    }} />
    <col style={{
      width: "30%"
    }} />
    <col style={{
      width: "35%"
    }} />
    <col style={{
      width: "30%"
    }} />
  </colgroup>
<thead>
<tr>
<th>Step</th>
<th>Input Example</th>
<th>Process/User</th>
<th >Result</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>user@example.com</td>
<td>メールアドレス/電話番号を raw UID2 に変換する:<br/><a href="../endpoints/post-identity-map">POST&nbsp;/identity/map</a> endpoint</td>
<td>K2jlbu2ldlpKL1z6n5bET7L3<br/>g0xfqmldZPDdPTktdRQ=</td>
</tr>
<tr>
<td>2</td>
<td>K2jlbu2ldlpKL1z6n5bET7L3<br/>g0xfqmldZPDdPTktdRQ=</td>
<td>UID2 Token を生成するために raw UID2 を暗号化する:<br/>利用可能な SDK の `encrypt()` 関数を使用します。たとえば Java の場合、<a href="../sdks/sdk-ref-java#usage-for-uid2-sharers">Usage for UID2 Sharers</a> step 3 を参照してください。</td>
<td style={{
  wordBreak: "break-all"
}}>KlKKKfE66A7xBnL/DsT1UV/Q+V/r3xwKL89Wp7hpNllxmNkPaF8vdzenDvfoatn6sSXbFf5DfW9wwbdDwMnnOVpPxojkb8KYSGUte/FLSHtg4CLKMX52UPRV7H9UbWYvXgXC4PaVrGp/Jl5zaxPIDbAW0chULHxS+3zQCiiwHbIHshM+oJ==</td>
</tr>
</tbody>
</table>

## UID2 Token Pass-Through

UID2 Token は、もととなる raw UID2 が同じであっても、UID2 Token が生成されるたびにトークンの値が異なるように設計されています。つまり、UID2 Token は誰でも見ることができますが、復号鍵にアクセスできる UID2 参加者のみが使用できます。

たとえば、UID2 Token は、パブリッシャーから DSP へビットストリームを通じて定期的に渡されます。UID2 Token は、パブリッシャーから SSP など複数の関係者を経由することがありますが、UID2 Token は、許可された UID2 参加者によってのみ復号化できます。ビットストリームを通じて UID2 Token が複数の中間者を通過する場合でも、UID2 Token は安全に渡されます。

UID2 共有参加者間の Tokenized sharing でも同じことが言えます。UID2 Token は、非 UID2 参加者を経由して渡すことができます。

:::caution
パススルーは、Tokenized sharing シナリオでのみ許可されます。raw UID2 は、非参加者を経由して渡すことは**できません**。
:::
