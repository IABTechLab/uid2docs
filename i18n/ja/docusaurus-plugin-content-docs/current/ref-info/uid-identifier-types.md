---
title: UID2 Identifier Types
description: Information about UID2 identifier types (raw UID2s and UID2 tokens).
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Identifier Types

UID2 は、メールアドレスや電話番号などの <Link href="../ref-info/glossary-uid#gl-dii">直接識別情報 (DII)</Link> に基づく決定論的 ID です。UID2 には、Raw UID2 と UID2 Token (Advertiseing Token とも呼ばれます) の 2 種類があります。以下の表では、それぞれのタイプについて説明します。

| ID Type | Shared in Bidstream? | Description |
| :--- | :--- | :--- |
| **Raw UID2** | No | ユーザーの検証可能な個人データ (ハッシュ化またはハッシュされていないメールアドレスや電話番号など) を入力として、UID2 API または SDK を使用して作成された暗号化されていない英数字の識別子。<br/>ソースデータの漏洩を避けるために、入力値がすでにハッシュされていない場合はハッシュ化され、その後、秘密の <Link href="../ref-info/glossary-uid#gl-salt">ソルト</Link> 値を使用して再度ハッシュ化されて、Raw UID2 が作成されます。Raw UID2 を作成するプロセスは、広告主、サードパーティのデータプロバイダー、およびデマンドサイドプラットフォーム (DSP) が保存できる、安全で不透明な値を作成するように設計されています。<br/>Raw UID2 は大文字と小文字が区別されます。<br/>例: 架空のメールアドレス `user@example.com` の Raw UID2 のリクエストは、この値を生成しました：`E2dxEv3oMBzNHPw5iUVmwH2Hv+60D4AXYe+2ge9U0No=`。 |
| **UID2 Token (Advertising Token)** | Yes | 暗号化された Raw UID2 の形式。UID2 Token は、ハッシュ化またはハッシュされていないたメールアドレスや電話番号から生成され、Raw UID2 に変換されてから暗号化され、<Link href="../ref-info/glossary-uid#gl-bidstream">ビッドストリーム</Link>での保護を確保するのに役立ちます。<br/>UID2 Token は、パブリッシャーまたはパブリッシャーサービスプロバイダーによって使用されるように設計されています。サプライサイドプラットフォーム (SSP) はビッドストリームで UID2 Token を渡し、DSP はビッドリクエスト時にそれらを復号化します。<br/>UID2 Token は大文字と小文字が区別されます。<br/>架空のメールアドレス `user@example.com` に対する UID2 Token のリクエストは、次の値を生成しました：`A4AAAAs6ZBcEbwAPoFhVV7CNW5W-4R-9TKDNL4RS0ctkw1U-IkNOXSnWczvwOMgCQaXHPf3Gd1o1W6IBmlZBFIloM67XOsOgwP5jUrQrclGkq1zBJJUJmOFTe6sJJA7pM1GP9gLd-hz5did6baZvcKd8DXkUYM-WALRZFnzHivu_1YEsC_CeXNdMexKDN7EwSQ6L5eZvOd1F1RkF_nLy_J0twg`。 |

:::note
これらの例で使用されている架空のメールアドレス `user@example.com` に対応する Refresh Token は次のとおりです：`AAAABrexFHvQVhNJqu+y/ua7rsgShF8e9NUXUJOZFmeFRD8TAsJadaLfOlLkwC5iSxcOKWFD9YwMBzbbcPa92CInba+bcPTaAFNmM2ZpIHgGy6lDcNPzvEnPQh/5fyZ3MD44SX/tHyIXa0R2OBAOLBA1A81r3jefhSsxZdyyBF58KtnaX6UbaeOEaguOfMnJdmhaPeWKj33v7vGfROWtxDWmi6wvGL5lHTX9H6iIZ9i1WSsemYPUgmoDOQeT7nzllJK968OECFj5LkCazDN3pCrYSeuJby9o0fMuSZNxzp6EVzi6XVED4ETtzpcaY0AArzzdh0IXV9MgH8jyg7bJSUWXQG+8kMPZzwbs9EB+7ddAUOLZL/GBna8Hm3Im03EjN3sJ`。
:::
