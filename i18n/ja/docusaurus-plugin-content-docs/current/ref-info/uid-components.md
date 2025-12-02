---
title: UID2 Components
description: Summary of key components of the UID2 technical infrastructure.
hide_table_of_contents: false
sidebar_position: 01
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';

# UID2 Components

UID2 フレームワークは以下ののコンポーネントで構成されており、すべて The Trade Desk によって管理されています。

| Component | Description |
| :--- | :--- |
| **Core Service** | UID2 のエコシステムの中で、<a href="../ref-info/glossary-uid#gl-salt">salt</a>、<a href="../ref-info/glossary-uid#gl-encryption-key">encryption key</a>、およびその他の関連データへのアクセスを管理する一元的なサービス。 |
| **Operator Service** | UID2 コアサービスからの暗号化キーとソルトの管理と保存、ユーザーの個人に関するデータのハッシュ化、raw UID2 の暗号化、UID2 Token の復号化を可能にするサービス。<br/>複数の [参加者](../overviews/participants-overview.md#uid2-component-services)（オペレーターと呼ばれる）が運営する複数のインスタンス（パブリックまたはプライベート）が存在する可能性があります。<br/><Link href="../ref-info/glossary-uid#gl-public-operator">パブリックオペレーター</Link> は、<Link href="../ref-info/glossary-uid#gl-operator-service">オペレーターサービス</Link> の公開インスタンスを実行し、すべての関連する UID2 参加者が利用できるようにします。<br/>また、独自の使用専用にオペレーターサービスのプライベートインスタンスを実行する <Link href="../ref-info/glossary-uid#gl-private-operator">プライベートオペレーター</Link> も存在する可能性があります。すべてのインスタンスは、サービスを運営する人に関係なく、重要な UID2 データを安全かつ相互運用可能に保つための保護機能を備えて設計されています。 |
| **Opt-Out Service** | ユーザーのオプトアウト要求を管理および保存し、それらをパブリッシャー、オペレーターサービスのインスタンス、および DSP に配布するグローバルサービス。 |
| **Transparency and Control Portal** | ユーザーがいつでも UID2 のオプトアウトを行うことができる、ユーザー向けのウェブサイト [https://www.transparentadvertising.com/](https://www.transparentadvertising.com/) 。 |
