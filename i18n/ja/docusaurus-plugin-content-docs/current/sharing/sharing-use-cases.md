---
title: Use Cases
description: 参加者と UID2 を共有するためのユースケース。
hide_table_of_contents: false
sidebar_position: 03
---

# Sharing UID2s: Use Cases

安全な共有ワークフローでは、信頼できる共有と raw UID2 をさまざまな方法で安全に共有することができます。例えば、送信者が受信者と UID2 を共有したい場合のシナリオ例を以下に示します:

- パブリッシャー(送信者) がビッドストリームを通じて UID2 Token を DSP(受信者) に送信します。詳細については、[Sharing in the Bid Stream](sharing-bid-stream.md) を参照してください。
- 測定パートナー(送信者)は、Amazon Simple Storage Service (S3) を介して UID2 Token を広告主 (受信者)に送信します。
- DSP (送信者)は、UID2 Token をレポート経由で広告主(受信者)に送信します。

これらのシナリオとその他のシナリオを以下の図に示します。

![Illustration of Sharing Use Cases](images/UID2_Sharing_Diagram_UseCases.png)

> NOTE: どの送信者も、転送メソッドのいずれかを使用して、どの受信者にも UID2 Token を転送できます。ここで定義されている転送方法はほんの一部であり、他にもいろいろあります。
