---
title: UID2 Private Operator for GCP Integration Guide
sidebar_label: Google Cloud Platform
pagination_label: UID2 Private Operator for GCP Integration Guide
description: Google Cloud Platform Private Operator のインテグレーション情報。
hide_table_of_contents: false
sidebar_position: 20
---

# UID2 Private Operator for GCP Integration Guide

このガイドでは、[Google Cloud](https://cloud.google.com/docs/overview/) Platform の Confidential Computing オプションである [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space) で UID2 Operator Service をセットアップするための情報を提供します。Confidential Space は、Trusted Execution Environment (TEE) として知られるセキュアなエンクレーブ環境を提供します。

>NOTE: UID2 Private Operator for GCPは、以下の地域ではサポートされていません: Europe, China.

Operator Service は、Confidential Space の "workload"&#8212;コンテナ化された Docker イメージで実行され、Confidential Space イメージの上の安全なクラウドベースのエンクレーブで実行されます。

UID2 Operator Confidential Space 用の Docker コンテナが起動すると、UID2 Core Service が Operator Service と Operator Service が実行されているエンクレーブ環境の信頼性を検証するための認証プロセスが完了します。

認証が成功すると、UID2 Core Service は、ソルトや鍵などのシード情報を提供し、UID2 Operator を安全な機密空間コンテナでブートストラップします。

## Setup Overview

セットアップの手順は以下のようになります:

1. [前提条件](#prerequisites) を参照してください。
1. [デプロイ環境](#deployment-environments) に関する情報を確認します。
   ベストプラクティスは、まずインテグレーション環境にデプロイし、次に本番環境にデプロイすることです。

1. 利用可能な [デプロイオプション](#deployment-options) に関する情報を、それぞれの利点を含めて確認し、どれを使うかを決める。

   Terraformテンプレートオプションを推奨します。
1. 以下のうち、選択したデプロイオプションに該当する指示に従ってください:
   - [Terraform Template](#deployterraform-template)
   - [gcloud CLI](#deploygcloud-cli)

すべての手順が完了すると、稼働状態になります。

## Prerequisites

Before setting up your UID2 Operator Service in the Google Cloud Platform using Confidential Space, complete these prerequisite steps:

- [Confidential Space Account Setup](#confidential-space-account-setup)
- [UID2 Operator Account Setup](#uid2-operator-account-setup)

### Confidential Space Account Setup

UID2 Operator Service は、どの GCP アカウントおよびプロジェクトでも実行できます。ただし、認証をサポートするには、Confidential Space virtual machine (VM) を実行するために使用できるサービスアカウントを作成する必要があります。

デプロイメントオプションを選択する前に、以下の Google Cloud セットアップ手順を完了してください:

1. UID2 Operator を実行する GCP プロジェクトを作成します。UID2 Operator Service 用に新しいプロジェクトを作成することを勧めますが、既存のプロジェクトを使用することもできます。以下のガイドラインに従ってください:

   - プロジェクト名の選択; 例えば、`UID2-Operator-Production` のようにします。これを後のステップで `{PROJECT_ID}` の値として使用します。
   - 課金が有効な GCP プロジェクトを定義していることを確認してください。

1. Confidential Space VM の実行に使用する GCP サービスアカウントの名前を選択すします。これは後のステップで `{SERVICE_ACCOUNT_NAME}` の値として使用します。

1. 両方のデプロイオプションで必要な gcloud CLI をインストールします。Google が提供する指示に従ってください: [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install)。

### UID2 Operator Account Setup
UID2 の連絡先に、あなたの組織を UID2 Operator として登録するよう依頼してください。誰に頼めばわからない場合は、[連絡先情報](../getting-started/gs-account-setup.md#contact-info) を参照してください。

>TIP: 新しいバージョンやその他の技術的な通知や要求について知らせておくべき人の社内メール配信リストを設定し、それをメールアドレスとして提供するのは良い考えです。

登録手続きが完了すると、以下のようなお知らせが届きます:

| Item | Description |
| :--- | :--- |
| `{OPERATOR_IMAGE}` | コンフィギュレーションで使用する UID2 Private Operator for GCP の Docker イメージ URL です。次の例は架空のものですが、Docker イメージ URL がどのように見えるかを示しています: `https://console.cloud.google.com/artifacts/docker/uid2-prod-project/us/iabtechlab/uid2-operator/sha256:2e4fae98b688002303c6263f7c4bf95344a1d9c15fb5fcf838b59032bb9813f2`。アカウントセットアップの一環として提供されたイメージ URL を使用してください。<br/>NOTE: イメージはどちらのデプロイ環境でも有効です。 |
| `{OPERATOR_KEY}` | UID2 Serviceであなたを Private Operator として識別する、あなた専用の Operator Key です。コンフィギュレーション時に `OPERATOR_KEY` の値として使用します。この値は、あなた固有の識別子であると同時にパスワードでもあります。; 安全に保管し、共有しないでください。<br/>NOTE: デプロイ環境ごとに個別の Operator Key を渡しします。 |
| Instructions | VM のセットアップ手順や該当情報へのリンクなど、追加情報の詳細です。 |

UID2 アカウントの登録が完了し、gcloud CLI をインストールしたら、次のステップに進みます:
- [deployment environments](#deployment-environments) に関する情報を確認します。
- 利用可能な [deployment options](#deployment-options) に関する情報を確認し、それぞれの利点を含め、どれを使用するかを決定します。

## Deployment Environments

以下の環境が利用可能で、[deployment options](#deployment-options) は両方の環境に対応しています。

ベストプラクティスとして、本番環境にデプロイする前にインテグレーション環境で実装をテストし、検証することを勧めます。

>NOTE: 各環境ごとに `{OPERATOR_KEY}` の値を受け取ります。必ず正しいものを使用してください。`{OPERATOR_IMAGE}` の値はどちらの環境でも同じです。

| Environment | Details |
| :--- | :--- |
| Integration (`integ`) | テスト専用。デバッグモードはインテグレーション環境で使用できます。 |
| Production (`prod`) | 本番トラフィックの管理用。この環境では、Terraform テンプレート経由で、ロードバランシングを行い、HTTPS を有効にしてデプロイすることを勧めます。[Deployment Options](#deployment-options) を参照してください。 |

## Deployment Options

デプロイオプションは 2 つあります:

| Option | Details |
| :--- | :--- |
| [Terraform template](#deployterraform-template) | このオプションは:<ul><li>手動でサービスアカウントを設定する必要はありません。セットアップは簡単です。</li><li>ロードバランサーとスケーリンググループでスタック全体を立ち上げます。</li><li>`gcloud` オプションよりも保守や運用が簡単です。</li><li>アップグレードが簡単です。</li><li>推奨するデプロイソリューションです。</li></ul> |
| [gcloud CLI](#deploygcloud-cli) | このオプションは:<ul><li>パブリック IP アドレスで 1 つの VM インスタンスを起動します。</li><li>迅速な実験/評価が容易になります。</li><li>複数のインスタンスの場合、コマンドを複数回実行して、各インスタンスを手動で立ち上げる必要があります。</li><li>ロードバランサーを手動で設定する必要があります。</li><li>より多くの手動ステップが必要になるため、アップグレードが複雑になります。</li></ul> |

どちらのデプロイメント・オプションも、両方のデプロイメント環境をサポートします。

次のステップを決定するには、使用するデプロイオプションを選択します。次に、該当する手順に従ってください:
- [Deploy&#8212;Terraform Template](#deployterraform-template)
- [Deploy&#8212;gcloud CLI](#deploygcloud-cli)

### Deploy&#8212;Terraform Template

デプロイとアップグレードを容易にするために、Terraform テンプレートを使用して、ロードバランシングとオートスケーリング機能を備えた UID2 Private Operator 実装をデプロイすることができます。このシナリオでは、すべての VM インスタンスは Confidential Space VM 上で実行され、複数のアベイラビリティゾーン (AZ) にデプロイされます。

Terraform テンプレートは以下を行います:
- 必要な Google Cloud Platform API を有効にします。
- Confidential Space VM を実行するためのサービスアカウントを設定します。
- `operator_key` 値を保持するためのシークレットを作成します。
- 以下のコンポーネントを作成します:
  - Network: VPC とサブネットワーク。
  - Instances: インスタンステンプレート、インスタンスグループ(オートスケーリングが有効)。
  - Ingress: ロードバランサー(ヘルスチェックあり)、フォワーディングルール、ファイアウォールルール。
  - Egress: [Cloud Network Address Translation (NAT)](https://cloud.google.com/nat/docs/overview)。
- HTTPS が有効な場合、Terraform に HTTPS 証明書を提供します。

>NOTE: Terraform テンプレートは、[Confidential Space Account Setup](#confidential-space-account-setup) Step 3 でインストールした gcloud CLI を使用します。

Terraform テンプレートを使用して、GCP Confidential Space Enclave に新しい UID2 Operator をデプロイするには、以下の手順に従います:

1. [Install Terraform](#install-terraform)
1. [Set Up the Terraform Environment](#set-up-the-terraform-environment)
1. [Download the Template Files](#download-the-template-files)
1. [Provide Input Values](#provide-input-values)
1. [Run Terraform](#run-terraform)
1. [Test Terraform Using the Health Check Endpoint](#test-terraform-using-the-health-check-endpoint)

詳細はこちらを参照してください:
- [Delete All Created Resources](#delete-all-created-resources)
- [Outputs](#outputs)

#### Install Terraform

Terraform がインストールされていない場合は、[terraform.io](https://www.terraform.io/) にアクセスしてインストールします。

#### Set Up the Terraform Environment

1. `{PROJECT_ID}` のプレースホルダを自分のプロジェクト ID に置き換えて、新しいプロジェクトを作成するか、既存のプロジェクトを選択します ([Confidential Space Account Setup](#confidential-space-account-setup) を参照してください)

   ```
   gcloud config set project {PROJECT_ID}
   ```

2. Terraform 用の環境を設定します:

   ```
   gcloud auth application-default login
   ```

#### Download the Template Files

登録手続きが完了した際に表示される指示に従って ([UID2 Operator Account Setup](#uid2-operator-account-setup) を参照してください)、以下の表に示すテンプレートファイルをダウンロードしてください。

| File | Details |
| :--- | :--- |
| `main.tf` | Terraformのテンプレートファイルです。 |
| `variables.tf` | 名前、タイプ、デフォルト値を含む、テンプレート入力変数の定義です。 |
| `outputs.tf` | 出力定義です |
| `terraform.tfvars` | テンプレート入力変数の値です。 |

#### Provide Input Values

必要に応じて、ダウンロードした `terraform.tfvars` ファイルに入力パラメーターの値を記述します。必須もあれば、任意もあるります。

1. 次の表に示す必須入力パラメータの値を提供します:

   | Name | Type | Default | Required | Description |
   | :--- | :--- | :--- | :--- | :--- |
   | `project_id` | `string` | n/a | yes | UID2 Operator を実行するGCPプロジェクトの ID です。例えば `UID2-Operator-Production`。 |
   | `service_account_name` | `string` | n/a | yes | GCP Confidential Space の UID2 Operator インスタンスに使用するサービスアカウントの名前です。 |
   | `uid_operator_image` | `string` | n/a | yes | [UID2 Operator Account Setup](#uid2-operator-account-setup) で受け取った、設定に使用する UID2 Private Operator for GCP の Docker イメージ URL。例えば `us-docker.pkg.dev/uid2-prod-project/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}`. |
   | `uid_operator_key` | `string` | n/a | yes | UID2 Operator Key です、[UID2 Operator Account Setup](#uid2-operator-account-setup) で受け取ったものです。 |
   | `uid_deployment_env` | `string` | `integ` | yes | 有効な値: `integ` インテグレーション環境、`prod` プロダクション環境。<br/>マシンタイプはデプロイ環境によって決定されます: `integ` は `n2d-standard-2`、`prod` は `n2d-standard-16` を使用します。 |

1. (オプション、強く推奨します) ロードバランサーを HTTPS に設定します。次の表に示すパラメーターの値を指定します:

   | Name | Type | Default | Required | Description |
   | :--- | :--- | :--- | :--- | :--- |
   | `ssl` | `bool`  | `false`| no | ロードバランサが HTTPS を使うように設定するには、このフラグを `true` にすることを推奨します。<br/>HTTPS を使用する場合は、`certificate` と `private_key` パラメータにも値を指定する必要があります。 |
   | `certificate` | `string`  | n/a | no | HTTPS 証明書。証明書は PEM 形式でなければなりません。<br/>例えば: `file('path/to/certificate.pem')`.<br/>`ssl` が `true` に設定されている場合は必須です。<br/>詳細はTerraformドキュメントの [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate#certificate) を参照してください。 |
   | `private_key` | `string`  | n/a | no | HTTPS証明書の秘密鍵。秘密鍵は PEM 形式でなければなりません。<br/>例えば: `file('path/to/private_key.pem')`. <br/>`ssl` が `true` に設定されている場合は必須です。<br/>詳細はTerraformドキュメントの [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate#private_key) を参照してください。 |
   
1. (オプション)以下の表に示す追加入力パラメータのパラメータ名と値を指定します。これらのパラメータはオプションですが、より要件に合うようにデフォルト値から変更したい場合に設定します。

   | Name | Type | Default | Required | Description |
   | :--- | :--- | :--- | :--- | :--- |
   | `region` | `string` | `us-east1` | no | デプロイ先のリージョンです。有効なリージョンの一覧については、Google Cloud ドキュメントの [Available regions and zones](https://cloud.google.com/compute/docs/regions-zones#available) 参照してください。<br/>NOTE: GCP Confidential Space の UID2 Private Operator は、以下の地域ではサポートされていません: Europe, China. |
   | `network_name` | `string` | `uid-operator` | no | VPC リソース名(ルール/インスタンスタグにも使用されます) です。 |
   | `min_replicas` | `number` | `1` | no | デプロイするレプリカの最小数です。 |
   | `max_replicas` | `number` | `5` | no | デプロイするレプリカの最大数です。 |
   | `uid_operator_key_secret_name` | `string` | `"secret-operator-key"` | no | Operator Key Secret に指定する名前です。Terraform テンプレートは、`uid_operator_key` 値を保持するために GCP Secret Manager にシークレットを作成します。名前は定義できます。例えば、`uid2-operator-operator-key-secret-integ` |
   | `debug_mode` | `bool`  | `false` | no | UID2 チームと協力して問題をデバッグする場合を除き、`true` を設定しないでください。それ以外の状況では、このフラグを `true` に設定すると認証に失敗します。 |

#### Run Terraform

以下を実行します:

```
terraform init
terraform apply
```
`terraform apply` を実行すると、同じフォルダに以下のファイルが生成されます: `terraform.tfstate`。このファイルには管理対象のインフラストラクチャとコンフィギュレーションに関する状態情報が保存され、将来のメンテナンスに使用されます。

>NOTE: Terraformの `state` ファイルについては、必ず推奨されるプラクティスに従ってください: これらはデプロイされたインフラストラクチャを維持するために必要であり、機密情報が含まれている可能性があります。詳細は Terraform ドキュメントの [state](https://developer.hashicorp.com/terraform/language/state) を参照してください。

#### Test Terraform Using the Health Check Endpoint

Helth check エンドポイントを呼び出して、実装の健全性をテストします。期待される結果は HTTP 200 で、レスポンスボディは `OK` です。

手順については、[Health Check&#8212;Terraform Template](#health-checkterraform-template) を参照してください。

#### Delete All Created Resources

クリーンアップするシナリオでは、テンプレートによって作成されたリソースを削除できます。例えば、`integ` をテストして、後でスタック全体を削除したい場合など。

Terraform が作成したリソースをすべて削除するには、以下を実行します:

```
terraform destroy
``` 

#### Outputs

以下の表は、Terraform テンプレートからの出力値をまとめたものです。

| Name | Description |
| :--- | :--- |
| `load_balancer_ip` | ロードバランサーのパブリックIPアドレスです。<br/>この値は [perform the health check](#health-checkterraform-template) や DNS の設定に使うことができます。 |

### Deploy&#8212;gcloud CLI

gcloud CLI を使用して GCP Confidential Space Enclave に新しい UID2 Operator をデプロイするには、以下の手順に従います。

>NOTE: 本番環境へのデプロイでは、このオプションは勧めません。ロードバランシングを行い、HTTPS を有効にして、Terraform テンプレート経由でデプロイすることを勧めます。

   1. [Set Up Service Account Rules and Permissions](#set-up-service-account-rules-and-permissions)
   1. [Create Secret for the Operator Key in Secret Manager](#create-secret-for-the-operator-key-in-secret-manager)
   1. [Update the Script with Valid Values](#update-the-script-with-valid-values)
   1. [Run the Script](#run-the-script)
   1. [Test gcloud Using the Health Check Endpoint](#test-gcloud-using-the-health-check-endpoint)

#### Set Up Service Account Rules and Permissions

gcloud CLI をインストールしたときに作成したアカウントを設定および構成するには、以下の手順を実行します。プレースホルダーの値を有効な値に置き換えます。

1. [Confidential Space Account Setup](#confidential-space-account-setup) で作成したプロジェクトに切り替えます:
    ```
    $ gcloud config set project {PROJECT_ID}
    ```
 
1. 以下の API を有効にします:

   | Name | Description |
   | :--- | :--- |
   | compute.googleapis.com | Compute Engine API | 
   | confidentialcomputing.googleapis.com | Confidential Computing API | 
   | logging.googleapis.com | Cloud Logging API | 
   | secretmanager.googleapis.com | Service Management API | 

    API を有効にするには、このコマンドを実行します:

    ```
    $ gcloud services enable compute.googleapis.com \
      confidentialcomputing.googleapis.com \
      logging.googleapis.com \
      secretmanager.googleapis.com
    ```

1. UID2 Operator Serviceを実行するためのサービスアカウントを作成します:
    ```
    $ gcloud iam service-accounts create {SERVICE_ACCOUNT_NAME}
    ```

1. サービスアカウントに必要な権限を付与します。

   パーミッションは以下の表の通りです。

   | Permission | Description |
   | :--- | :--- |
   | `confidentialcomputing.workloadUser` | 認証トークンを生成し、VM 内でワークロードを実行する権限です。 |
   | `logging.logWriter` | gcloud logging にログエントリを書き込む権限です。 |
   | `secretmanager.secretAccessor` | GCP Secret Managerで管理されているオペレータ鍵へのアクセス権限です。 |

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

1. UID2 Operator のデフォルトの公開ポートである Port 8080 での公開アクセスを許可する VPC ルールを追加します:
    ```
    $ gcloud compute firewall-rules create operator-tcp \
      --direction=INGRESS --priority=1000 --network=default --action=ALLOW \
      --rules=tcp:8080 \
      --source-ranges=0.0.0.0/0 \
      --target-service-accounts={SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com
    ```
#### Create Secret for the Operator Key in Secret Manager

UID2 アカウントのセットアップ ([UID2 Operator Account Setup](#uid2-operator-account-setup) を参照してください) の一環として、各環境の Operator Key を受け取ります。

次のステップでは、GCP Secret Manager に `{OPERATOR_KEY}` の値を保存し、Secret の名前を取得します。この名前は、後でデプロイスクリプトの `{OPERATOR_KEY_SECRET_FULL_NAME}` プレースホルダを置き換えるために使用します([Update-the-Script-with-valid-values](#update-the-script-with-valid-values) を参照してください)。

以下の手順に従ってください:

 1. 以下のスクリプトを実行し、新しいシークレットを作成します:

    ```
    OPERATOR_KEY="{OPERATOR_KEY}"
    echo -n $OPERATOR_KEY | gcloud secrets create {OPERATOR_KEY_SECRET_NAME} \
         --replication-policy="automatic" \
       --data-file=-
    ```
 
    1. 独自の値を使用してスクリプトを準備します:
       - `{OPERATOR_KEY}` には、その環境用の Operator Key の値を指定します。
       - `{OPERATOR_KEY_SECRET_NAME}` には、この環境の API Secret に使用する名前を指定します。例えば: `uid2-operator-operator-key-secret-integ`。

    2. スクリプトを実行します。

       スクリプトは GCP Secret Manager にシークレットを作成します。シークレット(表示)名は `{OPERATOR_KEY_SECRET_NAME}` で、シークレットの値は `{OPERATOR_KEY}` です。
       
1. 以下のコマンドを実行し、パスを含む完全なシークレットネームを取得します:

   ```
   $ gcloud secrets versions describe latest --secret {OPERATOR_KEY_SECRET_NAME} --format 'value(name)'
   ```

この例では、完全な秘密の名前は次のようになります: `projects/111111111111/secrets/uid2-operator-operator-key-secret-integ/versions/1`。これは、次のセクションで `{OPERATOR_KEY_SECRET_FULL_NAME}` プレースホルダを置き換えるために使用する値です。

#### Update the Script with Valid Values

サンプルのスクリプトを更新し、プレースホルダ値の代わりに独自の有効な値を使用します。

このセクションには以下が含まれます:

- [Placeholder Values and Definitions](#placeholder-values-and-definitions)
- [Sample Deployment Script&#8212;Integ](#sample-deployment-scriptinteg)
- [Sample Deployment Script&#8212;Prod](#sample-deployment-scriptprod)

##### Placeholder Values and Definitions

プレースホルダーの値は以下の表に定義されています。

| Placeholder | Actual Value |
| :--- | :--- |
| `{INSTANCE_NAME}` | 有効な VM 名です。 |
| `{ZONE}` | VM インスタンスがデプロイされる Google Cloud ゾーンです。 |
| `{SERVICE_ACCOUNT}` | アカウント作成時に作成したサービスアカウントのメールアドレス: `{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com`。<br/>詳細は [Set Up Service Account Rules and Permissions](#set-up-service-account-rules-and-permissions) (Step 4) を参照してください。 |
| `{OPERATOR_IMAGE}` | コンフィギュレーションで使用する UID2 Private Operator for GCP の Docker イメージ URL。<br/>詳細は [UID2 Operator Account Setup](#uid2-operator-account-setup) を参照してください。 |
| `{OPERATOR_KEY_SECRET_FULL_NAME}` | パスを含む、`projects/<project_id>/secrets/<secret_id>/versions/<version>`の形式の、Operator Key のシークレットに指定した完全な名前 ([Create Secret for the Operator Key in Secret Manager](#create-secret-for-the-operator-key-in-secret-manager) を参照してください)。例えば: `projects/111111111111/secrets/uid2-operator-operator-key-secret-integ/versions/1` |

##### Sample Deployment Script&#8212;Integ

次のインテグレーション環境のデプロイスクリプトの例では、プレースホルダーの値をいくつか使用しています。

```
$ gcloud compute instances create {INSTANCE_NAME} \
  --zone {ZONE} \
  --machine-type n2d-standard-2 \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family confidential-space \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference={OPERATOR_IMAGE}~tee-restart-policy=Never~tee-env-DEPLOYMENT_ENVIRONMENT=integ~tee-env-API_TOKEN_SECRET_NAME={OPERATOR_KEY_SECRET_FULL_NAME}
```

##### Sample Deployment Script&#8212;Prod

次のプロダクション環境へのデプロイスクリプトでは、プレースホルダ値をいくつか使用しています。

>NOTE: `machine-type` の値は、プロダクション環境では `n2d-standard-16` とする必要があります。

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
  --metadata ^~^tee-image-reference={OPERATOR_IMAGE}~tee-restart-policy=Never~tee-env-DEPLOYMENT_ENVIRONMENT=prod~tee-env-API_TOKEN_SECRET_NAME={OPERATOR_KEY_SECRET_FULL_NAME}
```

#### Run the Script

スクリプトの準備ができたら、有効な値を追加して実行します。

#### Test gcloud Using the Health Check Endpoint

health check エンドポイントを呼び出して、実装の健全性をテストします。期待される結果は HTTP 200 で、レスポンスボディは `OK` です。

手順については、 [Health Check&#8212;gcloud CLI](#health-checkgcloud-cli) を参照してください。

## Tasks

このセクションでは、以下のタスクを完了するための手順を説明します。該当する場合は、両方の環境について説明します。これには以下が含まれます:

- [Running the Health Check](#running-the-health-check)
- [Upgrading](#upgrading)

### Running the Health Check

Health check エンドポイントを呼び出し、実装の健全性をテストします。

ヘルスチェックの実行は、エンドポイントを除いてインテグレーション環境とプロダクション環境で同じです。

選択した配置オプションに応じて、該当する指示に従います:

- [Health Check&#8212;Terraform Template](#health-checkterraform-template)
- [Health Check&#8212;gcloud CLI](#health-checkgcloud-cli)

#### Health Check&#8212;Terraform Template

次の例は、Terraformテンプレートオプションのヘルスチェックです:

1. ロードバランサーのパブリック IP アドレスを取得します:

   ```
   terraform output load_balancer_ip
   ```

2. Operator のステータスをテストするには、ブラウザでヘルスチェックのエンドポイントにアクセスします: `http://{IP}/ops/healthcheck`

   レスポンスボディが `OK` の HTTP 200 は、健全なステータスを示します。


#### Health Check&#8212;gcloud CLI
次の例は、ヘルスチェックの `gcloud` コマンドラインオプションです:

1. ロードバランサーのパブリック IP アドレスを取得します:

   ```
   $ gcloud compute instances describe {INSTANCE_NAME} \
     --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
   ```
2. Operator のステータスをテストするには、ブラウザで `http://{IP}:8080/ops/healthcheck` にアクセスしてください。

   レスポンスボディが `OK` の HTTP 200 は、健全なステータスを示します。

### Upgrading

When a new version of UID2 Google Cloud Platform Confidential Space is released, private operators receive an email notification of the update, with a new image version. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported.

If you're upgrading to a new version, the upgrade process depends on the deployment option you chose. Follow the applicable steps:

- [Upgrading&#8212;Terraform Template](#upgradingterraform-template)
- [Upgrading&#8212;gcloud CLI](#upgradinggcloud-cli)

#### Upgrading&#8212;Terraform Template

Terraform テンプレートを使ってデプロイした場合、アップグレードに必要なのは、アップグレード通知で受け取った新しい `{OPERATOR_IMAGE}` を使ってデプロイを更新することだけです。

#### Upgrading&#8212;gcloud CLI

gcloud CLIを使用してデプロイした場合は、新しい `{OPERATOR_IMAGE}` を使用する新しいインスタンスを手動で立ち上げ、古いインスタンスをシャットダウンする必要があります。

ロードバランサーを手動でセットアップした場合は、ロードバランサーのマッピングも更新する必要があります。
