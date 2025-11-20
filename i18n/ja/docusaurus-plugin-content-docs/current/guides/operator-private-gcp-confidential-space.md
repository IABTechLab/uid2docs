---
title: UID2 Private Operator for GCP Integration Guide
sidebar_label: GCP Confidential Space
pagination_label: UID2 Private Operator for GCP Integration Guide
description: GCP の Orivate Operator のインテグレーション情報。
hide_table_of_contents: false
sidebar_position: 18
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import SnptUpgradePolicy from '../snippets/_snpt-private-operator-upgrade-policy.mdx';
import SnptAttestFailure from '../snippets/_snpt-private-operator-attest-failure.mdx';

# UID2 Private Operator for GCP Integration Guide

UID2 Operator は、UID2 エコシステムの API サーバーです。詳細は、[UID2 Operator](../ref-info/ref-operators-public-private.md) を参照してください。

このガイドでは、Google Cloud Platform（GCP）の機密コンピューティングオプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) で　<Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link>　として UID2 Operator Service を設定する情報を提供します。Confidential Spaceは、Trusted Execution Environment（TEE）として知られるセキュアなクラウドベースのエンクレーブ環境で実行される、安全なクラウドベースのエンクレーブ環境です。

:::note
UID2 Private Operator for GCP は、次の地域ではサポートされていません: ヨーロッパ、中国。
:::

Operator Service は、Confidential Space の　"workload" で実行されます。&#8212;コンテナ化された Dockert イメージは、Confidential Space イメージ上のセキュアなクラウドベースのエンクレーブで実行されます。

UID2 Operator Confidential Space 用の Docker コンテナが起動すると、UID2 Core Service が Operator Service と Operator Service が実行されているエンクレーブ環境の正当性を検証するための認証プロセスが完了します。

認証が成功すると、UID2 Core Service は、UID2 Operator をセキュアな Confidential Space コンテナ内でブートストラップするためのソルトやキーなどのシード情報を提供します。

## Operator Version

最新の ZIP ファイルは、次の表の GCP ダウンロード列にリンクされています。

| Version Name | Version&nbsp;#/Release&nbsp;Notes | GCP Download |  Date | Deprecation Date |
| ------- | ------ | ------ | ------ | ------ |
| Q2 2025 | [v5.55.9](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.55.9-r1) | [gcp-oidc-deployment-files-5.55.9-r1.zip](https://github.com/IABTechLab/uid2-operator/releases/download/v5.55.9-r1/gcp-oidc-deployment-files-5.55.9-r1.zip) | July 1, 2025 | July 1, 2026 | 

:::note
For information about supported versions and deprecation dates, see [Private Operator Versions](../ref-info/deprecation-schedule.md#private-operator-versions).
:::

## Private Operator Upgrade Policy

<SnptUpgradePolicy />

## Setup Overview

セットアップは、次の手順で行います:

1. Confidential Space and UID2 Operator のアカウントを作成し、設定し、構成とデプロイに必要なさまざまな値を取得または作成します: [Prerequisites](#prerequisites) を参照してください。
1. [Deployment environments](#deployment-environments) に関する情報を確認します。

   ペストプラクティスは、まずインテグレーション環境にデプロイし、次に本番環境にデプロイすることです。
1. 利用可能な[deployment options](#deployment-options) に関する情報を確認し、それぞれの利点を比較して、使用するオプションを決定します。
   
      Terraform テンプレートオプションを推奨します。
1. 選択したデプロイメントオプションに従って、適用可能な手順に従います:
   - [Terraform Template](#deployterraform-template)
   - [gcloud CLI](#deploygcloud-cli)
1. 必要であれば、エグレスルールを有効にします。
   - 詳細は [Confidential Space Account Setup](#confidential-space-account-setup)、Step 4 を参照してください。

すべての手順が完了すると、実装が稼働するようになります。

## Prerequisites

Google Cloud Platform で Confidential Space を使用して UID2 Operator Service を設定する前に、次の前提条件を満たす必要があります:

- [Confidential Space Account Setup](#confidential-space-account-setup)
- [UID2 Operator Account Setup](#uid2-operator-account-setup)

### Confidential Space Account Setup

UID2 Operator Service は、任意の GCP アカウントとプロジェクトで実行できます。ただし、認証をサポートするためには、Confidential Space 仮想マシン（VM）を実行するために使用できるサービスアカウントを作成する必要があります。

デプロイメントオプションを選択する前に、次の Google Cloud のセットアップ手順を完了してください:

1. UID2 Operator を実行する GCP プロジェクトを作成します。UID2 Operator Service が実行される GCP プロジェクトを作成することを推奨しますが、既存のプロジェクトを使用することもできます。次のガイドラインに従ってください:

   - プロジェクト名を選択します。たとえば、`UID2-Operator-Production` とします。この値は、後の手順で `{PROJECT_ID}` 値として使用します。
   - 請求が有効になっている GCP プロジェクトを定義してください。

1. Confidential Space VM を実行する GCP サービスアカウントの名前を選択します。たとえば、`uid2-operator` とします。後の手順で `{SERVICE_ACCOUNT_NAME}` 値として使用します。

1. gcloud CLI をインストールします。デプロイメントオプションの両方で必要です。Google が提供する手順に従ってください: [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install)。

1. エグレスルールを有効にします。VPC インフラストラクチャが既知のエンドポイントへのイグレスのみを許可する場合、オペレーターが認証に必要な証明書を取得できるようにエグレスルールを有効にする必要があります。これを有効にするには、Google のこのドキュメントに従ってください: [VPC Service Controls](https://cloud.google.com/vpc-service-controls/docs/supported-products#table_confidential_space)。

### UID2 Operator Account Setup

UID2 の連絡先に、あなたの組織を UID2 Operator として登録するよう依頼してください。誰に依頼すればよいかわからない場合は、[Contact Info](../getting-started/gs-account-setup.md#contact-info) を参照してください。

:::tip
新しいバージョンやその他の技術的な通知や要求について知らせておくべき人の社内メール配信リストを設定し、そのメールアドレスを提供しておくとよいでしょう。
:::

登録手続きが完了すると、次の情報が送られてきます:

| Item | Description |
| :--- | :--- |
| `{OPERATOR_KEY}` | UID2 Service であなたを Private Operator として識別する、あなた専用の Operator Key。設定時に `OPERATOR_KEY` の値として使用します。この値は、あなた固有の識別子であると同時にパスワードでもあります。Operator Keyは、オペレーターのバージョンに固有のものではありません。<br/>NOTE: 配備環境ごとに個別の Operator Keyを受け取ります。 |
| Instructions | VM のセットアップ手順や当該情報へのリンクなど、追加情報の詳細。 |

UID2 アカウント登録が完了し、gcloud CLI をインストールしたら、次のステップに進みます:
- [deployment environments](#deployment-environments) に関する情報を確認します。
- 利用可能な[deployment options](#deployment-options) に関する情報を確認し、それぞれの利点を比較して、使用するオプションを決定します。

## Deployment Environments

以下の環境が利用可能で、[deployment options](#deployment-options) の両方が両方の環境をサポートしています。

ベストプラクティスは、本番環境にデプロイする前に、インテグレーション環境で実装をテストして検証することをです。

:::note
各環境ごとに個別の `{OPERATOR_KEY}` 値を受け取ります。正しいものを使用してください。`{OPERATOR_IMAGE}` 値は、両方の環境で同じです。
:::

| Environment | Details |
| :--- | :--- |
| Integration (`integ`) | テスト専用。デバッグモードはインテグレーション環境で使用できます。 |
| Production (`prod`) | 本番トラフィックの管理用。この環境では、Terraform テンプレート経由で、ロードバランシングを行い、HTTPS を有効にしてデプロイすることを推奨します。[Deployment Options](#deployment-options) を参照してください。 |

## Deployment Options

デプロイメントオプションは次の2つがあります:

| Option | Details |
| :--- | :--- |
| [Terraform template](#deployterraform-template) | このオプションは:<ul><li>手動でサービスアカウントを設定する必要はありません。設定はとても簡単です。</li><li>ロードバランサーとスケーリンググループでスタック全体を立ち上げます。</li><li>`gcloud` オプションよりも保守・運用が簡単です。</li><li>アップグレードはとても簡単です。</li><li>推奨するデプロイオプションです。</li></ul> |
| [gcloud CLI](#deploygcloud-cli) | このオプションは:<ul><li>パブリック IP アドレスを持つ VM インスタンスを1つ起動します。</li><li>素早く実験・評価を行うことができます。</li><li>複数のインスタンスを使用する場合は、コマンドを複数回実行して各インスタンスを手動で立ち上げる必要があります。</li><li>ロードバランサーを手動で設定する必要があります。</li><li>手作業が増えるため、アップグレードはより複雑になります。</li></ul> |

どちらのデプロイメントオプションも、両方のデプロイメント環境をサポートしています。

次のステップを決定するには、使用するデプロイオプションを選択してください。次に、該当する手順に従ってください:
- [Deploy&#8212;Terraform Template](#deployterraform-template)
- [Deploy&#8212;gcloud CLI](#deploygcloud-cli)

### Deploy&#8212;Terraform Template

デプロイとアップグレードを容易にするために、Terraform テンプレートを使用して、ロードバランシングと自動スケーリング機能を備えた UID2 Private Operator 実装をデプロイできます。このシナリオでは、すべての VM インスタンスが Confidential Space VM で実行され、複数の可用性ゾーン（AZ）にデプロイされます。

Terraform テンプレートは次の操作を行います:
- 必要な Google Cloud Platform API を有効にします。
- Confidential Space VM を実行するためのサービスアカウントを設定します。
- `operator_key` 値を保持するためのシークレットを作成します。
- 次のコンポーネントを作成します:
  - ネットワーク: VPC とサブネットワーク。
  - インスタンス: インスタンステンプレート、インスタンスグループ（自動スケーリングを有効にする）。
  - イングレス: ロードバランサー（ヘルスチェック付き）、フォワーディングルール、ファイアウォールルール。
  - エグレス: [Cloud Network Address Translation (NAT)](https://cloud.google.com/nat/docs/overview)。
- HTTPS が有効になっている場合、Terraform に HTTPS 証明書を提供します。

:::note
Terraform テンプレートは、[Confidential Space Account Setup](#confidential-space-account-setup) Step 3 でインストールした gcloud CLI を使用します。
:::

新しい UID2 Operator を GCP Confidential Space Enclave にデプロイするための Terraform テンプレートを使用する手順は次のとおりです:

1. [Install Terraform](#install-terraform)
1. [Set Up the Terraform Environment](#set-up-the-terraform-environment)
1. [Download the Template Files](#download-the-template-files)
1. [Provide Input Values](#provide-input-values)
1. [Run Terraform](#run-terraform)
1. [Test Terraform Using the Health Check Endpoint](#test-terraform-using-the-health-check-endpoint)

詳細は次のとおりです:
- [Delete All Created Resources](#delete-all-created-resources)
- [Outputs](#outputs)

#### Install Terraform

Terraform がインストールされていない場合は、[terraform.io](https://www.terraform.io/) を参照してインストールしてください。

#### Set Up the Terraform Environment

1. 新しいプロジェクトを作成するか、既存のプロジェクトを選択します。プロジェクト ID の `{PROJECT_ID}` プレースホルダを自分のプロジェクト ID に置き換えてください（[Confidential Space Account Setup](#confidential-space-account-setup) を参照）:

   ```
   gcloud config set project {PROJECT_ID}
   ```

2. Terraform の環境を設定します:

   ```
   gcloud auth application-default login
   ```

#### Download the Template Files

[Operator Version](#operator-version) の GCP ダウンロード列にある ZIP ファイルをダウンロードします。最新バージョンを選択してください。ファイルを便利な場所に解凍します。次の表に示すファイルが生成されます。

| File | Details |
| :--- | :--- |
| `main.tf` | Terraform のテンプレートファイルです。|
| `variables.tf` | 名前、タイプ、デフォルト値を含む、テンプレート入力変数の定義です。 |
| `outputs.tf` | 出力定義です。 |
| `terraform.tfvars` | テンプレート入力変数の値です。 |

#### Provide Input Values

入力パラメータの値を提供するために、ダウンロードした `terraform.tfvars` ファイルに入力します。必要なものとオプションの両方があります。

1. 次の表に示す必要な入力パラメータの値を提供します:

   | Name | Type | Default | Required | Description |
   | :--- | :--- | :--- | :--- | :--- |
   | `project_id` | `string` | `uid2-test` | yes | UID2 Operator を実行する GCP プロジェクトの ID。たとえば、`UID2-Operator-Production`。 |
   | `service_account_name` | `string` | `tf-test` | yes | GCP Confidential Space の UID2 Operator インスタンスに使用するサービスアカウントの名前。 |
   | `uid_operator_image` | `string` | `us-docker.pkg.dev/uid2-prod-project/iabtechlab/uid2-operator:{version_number}` | yes | コンフィギュレーションで使用する UID2 Private Operator for GCP の Docker イメージ URL。バージョン番号は、デプロイされるバージョンによって変わります。 |
   | `uid_operator_key` | `string` | n/a | yes | UID2 Operator Keyは、[UID2 Operator Account Setup](#uid2-operator-account-setup) で受け取ったものです。 |
   | `uid_operator_key_secret_name` | `string` | `secret-operator-key` | yes | Secret Manager で作成するキーの名前。 |
   | `uid_deployment_env` | `string` | `integ` | yes | 有効な値: `integ` はインテグレーション環境、`prod` は本番環境。<br/>マシンタイプはデプロイ環境によって決まります。`integ` は `n2d-standard-2` を使用し、`prod` は `n2d-standard-16` を使用します。 |
   | `debug_mode` | `bool` | `true` | yes | より多くの診断情報を有効にするには `true` に設定します。本番環境では `false` に設定しなければなりません。 |

2. (オプション、強く推奨します) ロードバランサーを HTTPS に設定します。次の表に示すパラメータお値を設定します:

   | Name | Type | Default | Required | Description |
   | :--- | :--- | :--- | :--- | :--- |
   | `ssl` | `bool`  | `false`| no | ロードバランサが HTTPS を使うように設定するには、このフラグを `true` に設定します。<br/>HTTPSを使う場合は `certificate` と `private_key` パラメータにも値を指定する必要があります。 |
   | `certificate` | `string`  | n/a | no | HTTPS 証明書の内容。証明書は PEM 形式でなければなりません。<br/>たとえば: `file('path/to/certificate.pem')`.<br/>`ssl` が `true` に設定されている場合は必須です。<br/>詳細は Terraform ドキュメントの [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate#certificate) を参照してください。 |
   | `private_key` | `string`  | n/a | no | HTTPS 証明書の秘密鍵の内容。秘密鍵は PEM 形式でなければならなりません<br/>たとえば: `file('path/to/private_key.pem')`. <br/>`ssl` が `true` に設定されている場合は必須です。<br/>詳細は Terraform ドキュメントの [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate#private_key) を参照してください。 |

3. (オプション) 次の表に示す追加の入力パラメータの名前と値を提供します。これらのパラメータは常にオプションですが、デフォルト値を変更して、より適切な要件に合わせることができます。

   | Name | Type | Default | Required | Description |
   | :--- | :--- | :--- | :--- | :--- |
   | `region` | `string` | `us-east1` | no | デプロイ先のリージョン。有効なリージョンの一覧は、Google Cloud ドキュメントの [Available regions and zones](https://cloud.google.com/compute/docs/regions-zones#available) を参照してください。<br/>NOTE: GCP Confidential Space 用の UID2 Private Operator の実装は、次の地域ではサポートされていません: ヨーロッパ、中国。 |
   | `network_name` | `string` | `uid-operator` | no | VPC リソース名（ルール/インスタンスタグにも使用されます）。 |
   | `min_replicas` | `number` | `1` | no | デプロイする最小レプリカ数を示します。 |
   | `max_replicas` | `number` | `5` | no | デプロイする最大レプリカ数を示します。 |
   | `uid_operator_key_secret_name` | `string` | `"secret-operator-key"` | no | オペレーターキーのシークレットの名前を指定します。Terraform テンプレートは、GCP Secret Manager に `uid_operator_key` 値を保持するためのシークレットを作成します。名前を定義できます。例: `uid2-operator-operator-key-secret-integ`。 |
   | `debug_mode` | `bool`  | `false` | no | UID2 チームと協力して問題をデバッグする場合を除き、`true` に設定しないでください。それ以外の場合、このフラグを `true` に設定すると、認証が失敗します。 |

#### Run Terraform

以下を実行します:

```
terraform init
terraform apply
```
`terraform apply` を実行すると、同じフォルダに次のファイルが生成されます: `terraform.tfstate`。このファイルは、マネージドインフラストラクチャと構成に関する状態情報を保存し、将来のメンテナンスに使用されます。

:::note
Terraform の `state` ファイルに関する推奨に従ってください: デプロイされたインフラストラクチャを維持するために必要であり、機密情報を含む可能性があります。詳細は、Terraform ドキュメントの [state](https://developer.hashicorp.com/terraform/language/state) を参照してください。
:::

#### Test Terraform Using the Health Check Endpoint

実装のヘルスをテストするために、ヘルスチェックエンドポイントを使用します。ヘルスチェックの期待される結果は、HTTP 200 で、レスポンスボディが `OK` です。

手順は、[Health Check&#8212;Terraform Template](#health-checkterraform-template) を参照してください。

#### Delete All Created Resources

クリーンアップを行いたい場合は、Terraform によって作成されたリソースを削除できます。たとえば、`integ` をテストしたい場合、後でスタック全体を削除することができます。

すべてのリソースを削除するには、次のコマンドを実行します:

```
terraform destroy
``` 

#### Outputs

Terraform テンプレートからの出力値は次の表の通りです。

| Name | Description |
| :--- | :--- |
| `load_balancer_ip` | ロードバランサーのパブリックIPアドレス。<br/>この値は、[perform the health check](#health-checkterraform-template) や DNS の設定に使用できます。 |

### Deploy&#8212;gcloud CLI

gcloud CLI を使用して GCP Confidential Space Enclave に新しい UID2 Operator をデプロイするには、次の手順に従います。

:::note
本番環境へのデプロイメントにはこのオプションを使用しないことを推奨します。本番環境へのデプロイメントには、Terraform テンプレートを使用し、ロードバランシングを行い、HTTPS を有効にすることを推奨します。
:::

   1. [Set Up Service Account Rules and Permissions](#set-up-service-account-rules-and-permissions)
   1. [Create Secret for the Operator Key in Secret Manager](#create-secret-for-the-operator-key-in-secret-manager)
   1. [Update the Script with Valid Values](#update-the-script-with-valid-values)
   1. [Run the Script](#run-the-script)
   1. [Test gcloud Using the Health Check Endpoint](#test-gcloud-using-the-health-check-endpoint)

#### Set Up Service Account Rules and Permissions

gcloud CLI を使用して、UID2 Operator Service を実行するためのサービスアカウントを設定するには、次の手順に従います。プレースフォルダー値を自分の有効な値に置き換えてください。

1. 作成したプロジェクトに切り替えます（[Confidential Space Account Setup](#confidential-space-account-setup) で作成したプロジェクト）:
    ```
    $ gcloud config set project {PROJECT_ID}
    ```

1. 次の API を有効にします:

   | Name | Description |
   | :--- | :--- |
   | compute.googleapis.com | Compute Engine API | 
   | confidentialcomputing.googleapis.com | Confidential Computing API | 
   | logging.googleapis.com | Cloud Logging API | 
   | secretmanager.googleapis.com | Service Management API | 

    API を有効にするには、次のコマンドを実行します:

    ```
    $ gcloud services enable compute.googleapis.com \
      confidentialcomputing.googleapis.com \
      logging.googleapis.com \
      secretmanager.googleapis.com
    ```

1. UID2 Operator Service を実行するサービスアカウントを作成します:
    ```
    $ gcloud iam service-accounts create {SERVICE_ACCOUNT_NAME}
    ```

1. サービスアカウントに必要な権限を付与します。

   権限は次の表に示されています。

   | Permission | Description |
   | :--- | :--- |
   | `confidentialcomputing.workloadUser` | 認証トークンを生成し、VM でワークロードを実行する権限を提供します。 |
   | `logging.logWriter` | gcloud ロギングでログエントリを書き込む権限を提供します。 |
   | `secretmanager.secretAccessor` | GCP Secret Manager で管理されているオペレーターキーにアクセスする権限を提供します。 |

   `confidentialcomputing.workloadUser` 権限を付与します:

    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/confidentialcomputing.workloadUser
    ```
   `logging.logWriter` 権限を付与します:

    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/logging.logWriter
    ```
 
   `secretmanager.secretAccessor` 権限を付与します:

    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/secretmanager.secretAccessor
    ```

1. VPC ルールを追加して、UID2 Operator のデフォルト公開ポートであるポート 8080 へのパブリックアクセスを許可します:
    ```
    $ gcloud compute firewall-rules create operator-tcp \
      --direction=INGRESS --priority=1000 --network=default --action=ALLOW \
      --rules=tcp:8080 \
      --source-ranges=0.0.0.0/0 \
      --target-service-accounts={SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com
    ```
:::warning
`source-ranges` は、クライアントが Private Operator を呼び出すために使用する IP アドレスの範囲を指定します。CIDR 表記であり、複数の範囲を提供するためにカンマ区切りの値を使用できます。例: `--source-ranges="。範囲が正確であり、自分のものである IP アドレスのみが含まれていることを確認してください。
:::

#### Create Secret for the Operator Key in Secret Manager

UID2 Operator には、Operator Key が必要です。UID2 アカウントの設定（[UID2 Operator Account Setup](#uid2-operator-account-setup) を参照）の一環として、各環境のオペレーターキーを受け取ります。

次のステップは、`{OPERATOR_KEY}` 値を GCP Secret Manager に保存し、それに対する完全なシークレット名を取得し、それをデプロイメントスクリプト内の `{OPERATOR_KEY_SECRET_FULL_NAME}` プレースホルダで置き換えることです ([Update the Script with Valid Values](#update-the-script-with-valid-values) を参照)。

次の手順に従います:
 1. 次のスクリプトを実行して、新しいシークレットを作成します。最初に、自分の値でカスタマイズしてください:

    ```
    OPERATOR_KEY="{OPERATOR_KEY}"
    echo -n $OPERATOR_KEY | gcloud secrets create {OPERATOR_KEY_SECRET_NAME} \
         --replication-policy="automatic" \
       --data-file=-
    ```
 
    1. 自分の値を使用してスクリプトを準備します:

       - `{OPERATOR_KEY}` には、環境のオペレーターキー値を使用します。
       - `{OPERATOR_KEY_SECRET_NAME}` には、この環境の API シークレットの名前を指定します。例: `uid2-operator-operator-key-secret-integ`。

    2. スクリプトを実行します。

       スクリプトは GCP Secret Manager にシークレットを作成します。シークレット（表示名）は `{OPERATOR_KEY_SECRET_NAME}` で、シークレット値は `{OPERATOR_KEY}` です。

1. 次のコマンドを実行して、完全なシークレット名を取得します。最初に、自分の値でカスタマイズしてください:

   ```
   $ gcloud secrets versions describe latest --secret {OPERATOR_KEY_SECRET_NAME} --format 'value(name)'
   ```

この例では、完全なシークレット名は次のようになります: `projects/111111111111/secrets/uid2-operator-operator-key-secret-integ/versions/1`。これは、次のセクションの `{OPERATOR_KEY_SECRET_FULL_NAME}` プレースホルダを置き換えるために使用する値です。

#### Update the Script with Valid Values

サンプルスクリプトを更新して、プレースホルダ値を自分の有効な値に置き換えます。

このセクションには次の内容が含まれます:

- [Placeholder Values and Definitions](#placeholder-values-and-definitions)
- [Sample Deployment Script&#8212;Integ](#sample-deployment-scriptinteg)
- [Sample Deployment Script&#8212;Prod](#sample-deployment-scriptprod)

##### Placeholder Values and Definitions

プレースホルダ値は、次の表に定義されています。

| Placeholder | Actual Value |
| :--- | :--- |
| `{INSTANCE_NAME}` | 有効な VM の名前。 |
| `{ZONE}` | VM インスタンスがデプロイされる Google Cloud ゾーン。 |
| `{IMAGE_FAMILY}` | `confidential-space` はインテグレーションと本番で使用し、`confidential-space-debug` はインテグレーションでのみデバッグ用に使用します。`confidential-space-debug` は本番では動作しないことに注意してください。 |
| `{SERVICE_ACCOUNT}` | アカウント作成時に作成したサービスアカウントのメールアドレス: `{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com`.<br/>詳細は [Set Up Service Account Rules and Permissions](#set-up-service-account-rules-and-permissions) (Step 4) を参照してください。|
| `{OPERATOR_IMAGE}` | コンフィギュレーションで使用するUID2 Private Operator for GCPのDockerイメージURL。<br/>これは、GCPダウンロードファイルの`terraform.tfvars`ファイルにあります。([Operator Version](#operator-version) を参照) |
| `{OPERATOR_KEY_SECRET_FULL_NAME}` | Operator Key secret に指定したフルネーム ([Create Secret for the Operator Key in Secret Manager](#create-secret-for-the-operator-key-in-secret-manager) を参照)。パスを含め `projects/<project_id>/secrets/<secret_id>/versions/<version>` の形式でしています。たとえば: `projects/111111111111/secrets/uid2-operator-operator-key-secret-integ/versions/1` |

##### Sample Deployment Script&#8212;Integ

インテグレーション環境のデプロイメントスクリプトの例は、次のプレースホルダ値を使用しています。

```
$ gcloud compute instances create {INSTANCE_NAME} \
  --zone {ZONE} \
  --machine-type n2d-standard-2 \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family {IMAGE_FAMILY} \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference={OPERATOR_IMAGE}~tee-container-log-redirect=true~tee-restart-policy=Never~tee-env-DEPLOYMENT_ENVIRONMENT=integ~tee-env-API_TOKEN_SECRET_NAME={OPERATOR_KEY_SECRET_FULL_NAME}~tee-env-CORE_BASE_URL=https://core-integ.uidapi.com~tee-env-OPTOUT_BASE_URL=https://optout-integ.uidapi.com
```

##### Sample Deployment Script&#8212;Prod

本番環境のデプロイメントスクリプトの例は、次のプレースホルダ値を使用しています。

:::note
本番環境では `n2d-standard-16` という `machine-type` 値が必要です。
:::

```
$ gcloud compute instances create {INSTANCE_NAME} \
  --zone {ZONE} \
  --machine-type n2d-standard-16 \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family confidential-space \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference={OPERATOR_IMAGE}~tee-container-log-redirect=true~tee-restart-policy=Never~tee-env-DEPLOYMENT_ENVIRONMENT=prod~tee-env-API_TOKEN_SECRET_NAME={OPERATOR_KEY_SECRET_FULL_NAME}~tee-env-CORE_BASE_URL=https://core-prod.uidapi.com~tee-env-OPTOUT_BASE_URL=https://optout-prod.uidapi.com
```

#### Run the Script

スクリプトの準備ができたら、追加の有効な値を含むスクリプトを実行します。

#### Test gcloud Using the Health Check Endpoint

ヘルスチェックエンドポイントを呼び出して、実装の健全性をテストします。期待される結果は、HTTP 200 で、レスポンスボディが `OK` です。

手順は、[Health Check&#8212;gcloud CLI](#health-checkgcloud-cli) を参照してください。

## Running the Health Check

ヘルスチェックエンドポイントを呼び出して、実装の健全性をテストします。

ヘルスチェックの実行は、エンドポイントを除いて、インテグレーションと本番環境で同じです。

選択したデプロイメントオプションに応じて、適用される手順に従ってください:

- [Health Check&#8212;Terraform Template](#health-checkterraform-template)
- [Health Check&#8212;gcloud CLI](#health-checkgcloud-cli)

### Health Check&#8212;Terraform Template

次の例は、Terraform テンプレートオプションのヘルスチェックを示しています:

1. ロードバランサーのパブリック IP アドレスを取得します:

   ```
   terraform output load_balancer_ip
   ```

2. オペレーターステータスをテストするには、ブラウザでヘルスチェックエンドポイントに移動します: `http://{IP}/ops/healthcheck`。

   HTTP 200 とレスポンスボディが `OK` の場合、健全な状態です。


### Health Check&#8212;gcloud CLI
次の例は、`gcloud` コマンドラインオプションのヘルスチェックを示しています:

1. デプロイされたインスタンスのパブリック IP アドレスを取得します:

   ```
   $ gcloud compute instances describe {INSTANCE_NAME} \
     --zone={ZONE} \
     --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
   ```
2. オペレーターステータスをテストするには、ブラウザでヘルスチェックエンドポイントに移動します: `http://{IP}:8080/ops/healthcheck`。

   HTTP 200 とレスポンスボディが `OK` の場合、健全な状態です。

### Private Operator Attestation Failure

<SnptAttestFailure />

## Upgrading

UID2 Google Cloud Platform Confidential Space の新しいバージョンがリリースされると、Private Operator は新しいイメージバージョンを含む通知メールを受け取ります。アップグレードのためのウィンドウがあり、古いバージョンは非アクティブ化され、サポートされなくなります。

新しいバージョンにアップグレードする場合、アップグレードプロセスは選択したデプロイメントオプションに依存します。該当する手順に従ってください:

- [Upgrading&#8212;Terraform Template](#upgradingterraform-template)
- [Upgrading&#8212;gcloud CLI](#upgradinggcloud-cli)

### Upgrading&#8212;Terraform Template

Terrafom テンプレートを使用してデプロイした場合、アップグレードするには、新しい `{OPERATOR_IMAGE}` を使用してデプロイメントを更新するだけです。

### Upgrading&#8212;gcloud CLI

gcloud CLI を使用してデプロイした場合、アップグレードするには、新しい `{OPERATOR_IMAGE}` を使用して新しいインスタンスを立ち上げ、古いインスタンスをシャットダウンする必要があります。

手動でロードバランサーを設定した場合、ロードバランサーのマッピングも更新する必要があります。

## Scraping Metrics
GCP の Private Operator は、`/metrics` エンドポイントで [Prometheus-formatted metrics](https://prometheus.io/docs/concepts/data_model/) ポート 9080 で公開します。Prometheus 互換のスクレイパーを使用して、これらのメトリクスを収集して集計することができます。

## UID2 Operator Error Codes

以下の表は、Private Operator 起動シーケンス中に発生する可能性のあるエラーを一覧表示しています。

:::note
Private Operator 起動時のエラーコードは、リリース v5.49.7 以降のバージョンに適用されます。
:::

| Error Code | Issue | Steps to Resolve |
| :--- | :--- | :--- |
| E02 | OperatorKeyNotFoundError | オペレータと同じプロジェクトの GCP Secret Manager に指定されたシークレット名が存在し、サービスアカウントがシークレットにアクセスする権限を持っていることを確認してください。`tee-env-API_TOKEN_SECRET_NAME` に設定されていることを確認してください。必要に応じて、特定のシークレット名はログを確認できます。 |
| E03 | ConfigurationMissingError | 構成に必要な属性が不足しています。詳細はログを参照し、GCP オペレーターを実行する前に不足している属性を更新してください。 |
| E04 | ConfigurationValueError | 設定値が無効です。設定値が必要な形式と環境に一致していることを確認してください。注意: `debug_mode = true` は `integ` 環境でのみ許可されます。詳細はログを確認してください。 |
| E05 | OperatorKeyValidationError | Operator Key が環境に対して正しいことを確認し、提供されたものと一致していることを確認してください。 |
| E06 | UID2ServicesUnreachableError | UID2 core および opt-out サービスの IP アドレスをアウトバウンドファイアウォールで許可します。IP アドレスと DNS の詳細は、ログを参照してください。 |
| E08 | OperatorKeyPermissionError | Compute Engine インスタンステンプレートにサービスアカウントをアタッチします。UID2 Operator は、GCP Secret Manager からオペレーターキーにアクセスするためにこれらの権限が必要です。 |
