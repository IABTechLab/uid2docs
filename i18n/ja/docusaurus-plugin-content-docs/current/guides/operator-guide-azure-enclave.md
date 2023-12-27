---
title: UID2 Private Operator for Azure Integration Guide
sidebar_label: Microsoft Azure
pagination_label: UID2 Private Operator for Azure Integration Guide
description: Microsoft Azure の Private Operator インテグレーション情報。
hide_table_of_contents: false
sidebar_position: 18
---

# UID2 Private Operator for Azure Integration Guide

このガイドでは、Microsoft Azure のコンフィデンシャルコンピューティングオプションである [Confidential Container](https://learn.microsoft.com/ja-jp/azure/confidential-computing/confidential-containers) で UID2 Operator Service をセットアップするための情報を提供します。Confidential Container(機密コンテナー)は、データ整合性、データ機密性、コード整合性などの本質的な機能を提供するハードウェア支援の実行環境(Trusted Execution Environment: TEE)で実行されます。

UID2 Operator Confidential Container の Docker コンテナが起動すると、UID2 Core Service がOperator Service と Operator Service が実行されているエンクレーブ環境の信頼性を検証するための認証プロセスが完了します。

認証が成功すると、UID2 Core Service は、安全な UID2 Operator 機密コンテナで UID2 Operator をブートストラップするために、ソルトやキーなどのシード情報を提供します。

:::caution
UID2 Private Operator for Azureは、以下の地域ではサポートされていません: ヨーロッパ、中国
:::

<!-- 
* [Prerequisites](#prerequisites)
   - [Set Up UID2 Operator Account](#set-up-uid2-operator-account)
   - [Install Azure CLI](#install-azure-cli)
   - [Get the Required Azure Permissions](#install-azure-cli)
* [Deployment Environments](#deployment-environments)
* [Deployment](#deployment)
  - [Download UID2 Private Operator for Azure ZIP File](#download-uid2-private-operator-for-azure-zip-file)
  * [Create Resource Group](#create-resource-group)
  * [Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup)
  * [Set Up the VPC Network](#set-up-the-vpc-network)
  * [Complete the UID2 Private Operator Setup](#complete-the-uid2-private-operator-setup)
  * [Set Up the Gateway Load Balancer](#set-up-the-gateway-load-balancer)
* [Running the Health Check](#running-the-health-check)
* [Upgrading](#upgrading)
 -->

## Prerequisites

UID2 Private Operator for Azureをデプロイする前に、以下の前提条件を完了してください:

- [Set Up UID2 Operator Account](#set-up-uid2-operator-account)
- [Install Azure CLI](#install-azure-cli)
- [Get the Required Azure Permissions](#install-azure-cli)

### Set Up UID2 Operator Account

UID2 の連絡先に、あなたの組織を UID2 Operator として登録するよう依頼してください。相談先については、[Contact Info](../getting-started/gs-account-setup.md#contact-info) を参照してください。

登録手続きが完了すると、以下のお知らせが届きます:

- UID2 Service であなたを Private Operator として識別する、専用の Operator Key。設定の際には、これを `OPERATOR_KEY` の値として使用します。この値は、固有の識別子であると同時にパスワードでもあります。

  :::note
  デプロイ環境ごとに個別の Operator Key を渡します。
  :::

- UID2 Private Operator for Azure GitHubリリースページへのリンク。例えば、次のようになります: [https://github.com/IABTechLab/uid2-operator/releases/tag/v5.21.5-68a47aec9f-azure-cc](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.21.5-68a47aec9f-azure-cc).

  :::note
  これは一例です。送られたリンクを利用してください。
  :::

### Install Azure CLI

Azure コマンドラインインターフェイスをインストールします。Azure ドキュメントの [Azure CLI をインストールする方法](https://learn.microsoft.com/ja-jp/cli/azure/install-azure-cli) を参照してください。

### Get the Required Azure Permissions

リソースグループを作成するには、サブスクリプションオーナー権限が必要です。

これが完了すると、そのリソースのリソースグループレベルのContributor(共同作成者)権限だけが必要になります。

詳細は、Azure ドキュメントの [Azure ロール](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/rbac-and-directory-admin-roles#azure-roles) を参照してください。

前提条件がすべて完了したら、UID2 Private Operator をデプロイする準備が整います。[Deployment](#deployment)を参照してください。

## Deployment Environments

以下の環境が利用可能です。ベストプラクティスとして、本番環境にデプロイする前に、テスト環境で実装をテストし、検証することをお勧めします。

:::note
`{OPERATOR_KEY}` は環境ごとに別々の値になります。使用する環境に適したキーを使用してください。デプロイの成果物と処理の流れは、どちらの環境でも同じです。
:::

| Environment | Details |
| :--- | :--- |
| Integration (`integ`) | テスト専用。デバッグモードはテスト環境で使用できます。 |
| Production (`prod`) | 実稼働トラフィックの管理用。 |

## Deployment

新しい UID2 Private Operator for Azure をデプロイするには、以下のステップを完了する必要があります:

- [Download ZIP File and Extract Files](#download-zip-file-and-extract-files)
- [Create Resource Group](#create-resource-group)
- [Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup)
- [Set Up the VPC Network](#set-up-the-vpc-network)
- [Complete the UID2 Private Operator Setup](#complete-the-uid2-private-operator-setup)
- [Set Up the Gateway Load Balancer](#set-up-the-gateway-load-balancer)

### Download ZIP File and Extract Files

最初のステップは、必要なデプロイ用ファイルをセットアップすることです。

以下の手順に従ってください:

1. UID2 アカウントのセットアップ完了後に渡された Azure Enclave GitHub リリースページ([Set Up UID2 Operator Account](#set-up-uid2-operator-account)を参照してください)から、デプロイに必要なファイルを含む ZIP ファイルを探してダウンロードします。ZIP ファイルの名前は以下の規則に従っています:

   ```
   uid2-operator-deployment-artifacts-{VERSION_NUMBER}-azure-cc.zip
   ```

2. `uid2-operator-deployment-artifacts-{VERSION_NUMBER}-azure-cc.zip` ファイルを解凍し、デプロイに必要な以下のファイルを展開します:

   - `vault.json` and `vault.parameters.json`
   - `vnet.json` and `vnet.parameters.json`
   - `operator.json` and `operator.parameters.json`
   - `gateway.json` and `gateway.parameters.json`

### Create Resource Group

Azure では、以下のコマンドを実行して、UID2 Operator を実行するリソースグループを作成します:

```
az group create --name {RESOURCE_GROUP_NAME} --location {LOCATION}
```

:::info
すべてのリソースは後で `{RESOURCE_GROUP_NAME}` の値として指定した名前でプロビジョニングされます。
:::

ロケーションに関していくつかの制限があります:
- UID2 Private Operator for Azure は、以下の地域ではサポートされていません: ヨーロッパ、中国。

- Azure 仮想ネットワークデプロイの可用性については、Azure ドキュメントの [Linux コンテナー グループ](https://learn.microsoft.com/ja-jp/azure/container-instances/container-instances-region-availability#linux-container-groups) を確認してください。表の **機密 SKU** 列が **Y** に設定されているリージョンにのみデプロイできます。

### Complete Key Vault and Managed Identity Setup

次のステップは、[Key Vault](https://learn.microsoft.com/ja-jp/azure/key-vault/general/overview)を設定し、Operator Key を保存することです。

Key Vault を作成したら、[マネージド ID](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) を作成し、Key Vault にアクセスする権限を付与します。

後に [Azure Container Instances](https://azure.microsoft.com/ja-jp/products/container-instances)(ACI) がこの ID でローンチされます。

以下の手順に従ってください:

1. `vault.parameters.json` ファイルを以下の必須の値で更新します:

   | Parameter | Description |
   | :--- | :--- |
   | `vaultName` | Operator Key を保持する Key Vault の名前。選択する名前は、グローバルに一意でなければなりません。 |
   | `operatorKeyValue` | アカウント設定の際に UID チームから受け取った `OPERATOR_KEY` の値です ([Set Up UID2 Operator Account](#set-up-uid2-operator-account)を参照してください)。この値は固有のもので、パスワードの役割を果たします。 |

2. (オプション)デフォルト値を受け入れたくない場合は、`vault.parameters.json` ファイルを以下の値で更新します。これらのパラメータはデフォルト値であり、ほとんどの場合、更新する必要はありません。

    Parameter | Description |
   | :--- | :--- |
   | `operatorIdentifier` | コンテナを起動するマネージド ID の名前。<br/>デフォルト: `uid-operator`. |
   | `operatorKeyName` | Operator Key の名前。<br/>デフォルト: `operator-key`. |

3. 以下のコマンドを実行し、デプロイを開始します:

   ```
   az deployment group create --name vault --resource-group {RESOURCE_GROUP_NAME} --parameters vault.parameters.json  --template-file vault.json
   ```

### Set Up the VPC Network

次のステップは、VPCネットワークのセットアップです。

以下の図は、Microsoft Azure の UID2 Private Operator をホストする仮想プライベートクラウドを示しています。

![VPC Network](images/operator-azure-drawio.png)

以下の手順に従ってください:

1. (オプション)デフォルト値を受け入れたくない場合は、`vnet.parameters.json` ファイルを以下の値で更新します。これらのパラメータはデフォルト値なので、ほとんどの場合、更新する必要はありません。

    Parameter | Description |
   | :--- | :--- |
   | `vnetName` | 仮想ネットワーク名。<br/>デフォルト: `unified-id-network` |
   | `computeSubnetName` | UID2 Operator を実行するサブネットの名前。<br/>デフォルト: `unified-id-subnet-operators` |
   | `gatewaySubnetName` | UID2 Gateway を実行するサブネットの名前。<br/>デフォルト: `unified-id-subnet-gateway` |
   | `VnetAddressPrefix` | vnet アドレスのプレフィックス。<br/>デフォルト: `10.0.0.0/20` |
   | `computeSubnetPrefix` | UID2 Operator の実行を委任されたサブネットの vnet アドレスプレフィックス。<br/>デフォルト: `10.0.0.0/24` |
   | `gatewaySubnetPrefix` | UID2 Gateway を実行するサブネットの vnet アドレスプレフィックス。<br/>デフォルト: `10.0.1.0/28` |

2. 以下のコマンドを実行し、デプロイを開始します:

   ```
   az deployment group create --name vnet --resource-group {RESOURCE_GROUP_NAME} --parameters vnet.parameters.json  --template-file vnet.json
   ```

### Complete the UID2 Private Operator Setup

次のステップは、作成した VPC サブネットワークに複数の Azure Container Instances(ACI)を立ち上げることです。

以下の手順に従ってください:

1. `operator.parameters.json` ファイルを以下の必須値で更新します:

   | Parameter | Description |
   | :--- | :--- |
   | `vaultName` | Operator Key をホストする Key Vault の名前。この値は、[Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup) で作成した名前と一致する必要があります。|
   | `deploymentEnvironment` | デプロイ先の環境を示す: `integ` または `prod`。詳細は、[Deployment Environments](#deployment-environments)を参照してください。 |

2. (オプション) デフォルトを受け入れたくない場合は、`operator.parameters.json` ファイルを以下の値で更新します。これらのパラメーターにはデフォルト値があり、ほとんどの場合、更新する必要はありません。

    Parameter | Description |
   | :--- | :--- |
   | `operatorKeyName` | Operator Key 名。この値は、[Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup) で指定した値と一致する必要があります。デフォルトを受け入れた場合、値は `operator-key` となります。 |
   | `operatorIdentifier` | コンテナを起動するマネージド ID の名前。 [Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup) で指定した値と一致する必要があります。デフォルトを受け入れた場合、値は `uid-operator` となります。 |
   | `vnetName` | 仮想ネットワーク名。[Set Up the VPC Network](#set-up-the-vpc-network) で指定した値と一致する必要があります。デフォルトを受け入れた場合、値は `unified-id-network` となります。 |
   | `computeSubnetName` | Private Operator を実行するサブネットの名前。[Set Up the VPC Network](#set-up-the-vpc-network) で指定した値と一致する必要があります。デフォルトを受け入れた場合、値は `unified-id-subnet-operators` となります。 |
   | `count` | 立ち上げたいさせたいインスタンスの数。デフォルトは `2` となります。 |

2. 以下のコマンドを実行して ACI をデプロイします:

   ```
   az deployment group create --name operator --resource-group {RESOURCE_GROUP_NAME} --parameters operator.parameters.json  --template-file operator.json
   ```

3. 以下のコマンドを実行して、作成したACIインスタンスのIPアドレスを取得します:

   ```
   az deployment group show -g {RESOURCE_GROUP_NAME} -n operator --query properties.outputs
   ```

   出力は以下のようになるはずです:
   
   ```
   { "ipAddress": { "type": "Array", "value": [ "10.0.0.5", "10.0.0.4" ] } }
   ```

### Set Up the Gateway Load Balancer

次のステップは [Gateway Load Balancer](https://learn.microsoft.com/en-us/azure/load-balancer/gateway-overview) のセットアップで、作成した ACI のプライベート IP アドレスを取得し、[backend pool](https://learn.microsoft.com/en-us/azure/load-balancer/backend-pool-management) として使用します。

以下の手順に従ってください:

1. `gateway.parameters.json` ファイルを以下の必須値で更新します:

   | Parameter | Description |
   | :--- | :--- |
   | `containerGroupIPs` | 作成した ACI インスタンスの IP アドレス&#8212;[Complete the UID2 Private Operator Setup](#complete-the-uid2-private-operator-setup) Step 4 で出力した値。 |

   例えば、更新したファイルは以下のようになります:
   
   ```
   "containerGroupIPs":{
     "value":[
       "10.0.0.5",
       "10.0.0.4"
     ]
   }
   ```

2. (オプション) デフォルト値を受け入れたくない場合は、`gateway.parameters.json` ファイルを以下の値で更新してください。これらのパラメータはデフォルト値なので、ほとんどの場合、更新する必要はありません。

    Parameter | Description |
   | :--- | :--- |
   | `vnetName` | 仮想ネットワーク名。[Set Up the VPC Network](#set-up-the-vpc-network) で指定した値と一致する必要があります。デフォルトを受け入れた場合、値は `unified-id-network` となります。 |
   | `gatewaySubnetName` | UID2 Gateway を実行するサブネットの名前。[Set Up the VPC Network](#set-up-the-vpc-network) で指定した値と一致する必要があります。デフォルトを受け入れた場合、値は  `unified-id-subnet-gateway` となります。 |
   
2. 以下のコマンドを実行します:

   ```
   az deployment group create --name gateway --resource-group {RESOURCE_GROUP_NAME} --parameters gateway.parameters.json  --template-file gateway.json
   ```

3. 次のコマンドを実行して、ゲートウェイロードバランサーのパブリック IP アドレスを取得します:
   
   ```
   az deployment group show -g {RESOURCE_GROUP_NAME} -n gateway --query properties.outputs
   ```

   出力は以下のようになるはずです:

   ```
   { "gatewayIP": { "type": "String", "value": "20.163.172.56" } }
   ```

:::tip
コンテナを更新しても、Azure バックエンドプールは新しいコンテナの IP アドレスで自動的に更新されません。解決策については、Azure ドキュメントの [Azure を使用したインフラストラクチャ再構成の自動化](https://learn.microsoft.com/ja-jp/azure/architecture/web-apps/guides/networking/automation-application-gateway) を参照してください。
:::

:::caution
この例では HTTP を使って Gateway Load Balancer を導入していますが、SSL を設定することを強く勧めます。手順については、[チュートリアル: Azure portal を使用して TLS 終端でアプリケーション ゲートウェイを構成する](https://learn.microsoft.com/ja-jp/azure/application-gateway/create-ssl-portal) を参照してください。
:::

## Running the Health Check

Health Check エンドポイントを呼び出して、実装の健全性をテストします。

Health Check の実行は、エンドポイントを除いてテスト環境と本番環境で同じです。

以下の手順に従ってください:

1. ゲートウェイロードバランサーのパブリック IP アドレスを取得します&#8212;[Set Up the Gateway Load Balancer](#set-up-the-gateway-load-balancer) Step 4 で出力したあたいです。

2. Operator のステータスをテストするには、ブラウザでヘルスチェックのエンドポイントにアクセスします: `http://{LB_IP}/ops/healthcheck`.

   レスポンスボディが `OK` で、HTTP 200 であれば、健全なステータスを示します。

## Upgrading

UID2 Azure Confidential Container の新しいバージョンがリリースされると、Private Operator は、新しいリリースリンクとともに、アップデートのメール通知を受け取ります。アップグレードには期限があり、期限を過ぎると古いバージョンは無効になり、サポートされなくなります。

アップグレードするには、以下の手順を実行します:

1. [Download ZIP File and Extract Files](#download-zip-file-and-extract-files) の手順に従って、新バージョンのデプロイファイルをダウンロードし、解凍します。

2. 新しいファイルを使用して、[Complete the UID2 Private Operator Setup](#complete-the-uid2-private-operator-setup) の指示に従って、新しいバージョンの ACI をデプロイします。

3. [Set Up the Gateway Load Balancer](#set-up-the-gateway-load-balancer) の指示に従って、新しい ACI をバックエンドプールに追加します。

4. 新しい ACI の健全性を確認し、以下の例に示すようにステータスが健全であることを確認すします:

   ```
   az network application-gateway show-backend-health --resource-group {RESOURCE_GROUP_NAME} --name uid-operator-gateway
   ```

5. ゲートウェイロードバランサーから古い ACI をクリーンアップします: [Set Up the Gateway Load Balancer](#set-up-the-gateway-load-balancer) の指示に従って、バックエンドプールから古い ACI を削除します。

6. 以下のコマンドを実行して、古い ACI をシャットダウンします:

   ```
   for i in {0..COUNT}; az container delete --name uid-operator-OLD-VERSION-$i --resource-group {RESOURCE_GROUP} --yes
   ```