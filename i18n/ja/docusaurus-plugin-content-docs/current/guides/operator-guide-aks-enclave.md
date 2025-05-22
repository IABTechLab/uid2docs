---
title: UID2 Private Operator for AKS Integration Guide
sidebar_label: Azure Kubernetes Service (AKS)
pagination_label: UID2 Private Operator for AKS Integration Guide
description: AKS を使用した Private Operator のインテグレーション情報
hide_table_of_contents: false
sidebar_position: 18
---

import Link from '@docusaurus/Link';
import ReleaseMatrix from '../snippets/_private-operator-release-matrix.mdx';

# UID2 Private Operator for AKS Integration Guide

UID2 Operator は UID2 エコシステムの API サーバーです。詳細については、[The UID2 Operator](../ref-info/ref-operators-public-private.md) を参照してください。

このガイドでは、Azure Kubernetes Service （<Link href="../ref-info/glossary-uid#gl-aks">AKS</Link>） クラスター上で Azure Container Instances（ACI） の仮想ノード上で実行される UID2 Operator Service を <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> として設定する方法について説明します。[Azure Container Instances 上の仮想ノード](https://learn.microsoft.com/ja-jp/azure/container-instances/container-instances-virtual-nodes)を使用することで、ハードウェアでバックアップされた Trusted Execution Environment （TEE） で実行される機密コンテナの機能を活用できます。この TEE は、データ整合性、データ機密性、コード整合性などの内在的な機能を提供します。

UID2 Operator の機密 Azure Container インスタンス用の Docker コンテナーが起動すると、UID2 Core Service が Operator Service の真正性と、Operator Service が実行されているエンクレーブ環境の真正性を検証できるようにする認証プロセスが完了します。

認証が成功すると、UID2 Core Service は、UID2 Operator をセキュアな UID2 Operator 機密 Azure Container Instance で起動するためのソルトやキーなどのシード情報を提供します。

:::caution
UID2 Private Operator for AKS は、次の地域ではサポートされていません: ヨーロッパ、中国。
:::

## Prerequisites

AKS の UID2 Private Operator をデプロイする前に、次の前提条件を完了してください:

- [Set Up the UID2 Operator Account](#set-up-the-uid2-operator-account)
- [Install the Azure CLI](#install-the-azure-cli)
- [Get the Required Azure Permissions](#get-the-required-azure-permissions)
- [Install the kubectl CLI](#install-the-kubectl-cli)
- [Install the Helm CLI](#install-the-helm-cli)

### Set Up the UID2 Operator Account

UID2 の連絡先に、組織を UID2 Operator として登録するよう依頼してください。誰に聞けばよいかわからない場合は、[Contact Info](../getting-started/gs-account-setup.md#contact-info) を参照してください。

登録プロセスが完了すると、UID2 Service に対して Private Operator として識別する、あなた専用の operator key が届きます。構成中は、これを `OPERATOR_KEY` の値として使用します。この値は、あなたのためのユニークな識別子であり、パスワードでもあります。安全に保管し、共有しないでください。

:::note
各環境に対して別の operator key が届きます。
:::

### Install the Azure CLI

Azure コマンドラインインターフェイスをインストールします。詳細については、Azure ドキュメントの [How to install the Azure CLI](https://learn.microsoft.com/ja-jp/cli/azure/install-azure-cli) を参照してください。

### Get the Required Azure Permissions

リソースグループを作成するには、サブスクリプションの所有者権限が必要です。

作業が完了したら、そのリソースに対してリソースグループレベルの貢献者権限のみが必要です。

詳細は、Azure ドキュメントの [Azure roles](https://learn.microsoft.com/ja-jp/azure/role-based-access-control/rbac-and-directory-admin-roles#azure-roles) を参照してください。

すべての前提条件が完了したら、UID2 Private Operator をデプロイする準備が整いました。次は [Deployment](#deployment) を参照してください。

### Install the kubectl CLI

Kubernetesの `kubectl` コマンドラインインターフェイスをインストールします。詳細については、Kubernetes ドキュメントの [Install Tools](https://kubernetes.io/docs/tasks/tools/) を参照してください。

### Install the Helm CLI

`helm` コマンドラインインターフェイスをインストールします。詳細については、[Installing Helm](https://helm.sh/docs/intro/install/) を参照してください。

## Deployment Environments

以下の環境が利用可能です。ベストプラクティスとして、テスト環境で実装をテストして検証してから、本番環境にデプロイすることをお勧めします。

:::note
各環境ごとに別々の `{OPERATOR_KEY}` 値が届きます。使用している環境に正しいキーを使用してください。デプロイメントアーティファクトとプロセスフローは、両方の環境で同じです。
:::

| Environment | Details |
| :--- | :--- |
| Integration (`integ`) | テスト専用です。デバックモードはテスト環境で利用可能です。 |
| Production (`prod`) | 本番トラフィックを管理するためのものです。 |

## Deployment

AKS の新しい UID2 Private Operator をデプロイするには、次の主要な手順を完了する必要があります:

- [Download ZIP File and Extract Files](#download-zip-file-and-extract-files)
- [Prepare Environment Variables](#prepare-environment-variables)
- [Set Up AKS and Node Pool](#set-up-aks-and-node-pool)
- [Set Up AKS Cluster](#set-up-aks-cluster)
- [Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup)
- [Complete the UID2 Private Operator Setup](#complete-the-uid2-private-operator-setup)

### Download ZIP File and Extract Files

インストールファイルをセットアップするには、次の手順に従ってください:

1. UID2 の連絡先に、デプロイメントファイルを含む ZIP ファイルを依頼してください。

1. ダウンロードし、解答します。

<!-- Download the ZIP file linked in the following table, AKS Download column, for the latest version. 

1. Unzip the ZIP file to extract the following files, needed for the deployment:

   - `operator.yaml` -->

<!-- ### Operator Version

The latest ZIP file is linked in the AKS Download column in the following table.

<ReleaseMatrix />  -->

### Prepare Environment Variables

以下のコマンドを実行して、後で使用する環境変数を準備します。変数名は必要に応じて選択してください。

```
export RESOURCE_GROUP="my-vn-aks"
export LOCATION="eastus"
export VNET_NAME="my-vnet"
export PUBLIC_IP_ADDRESS_NAME="my-public-ip"
export NAT_GATEWAY_NAME="my-nat-gateway"
export AKS_CLUSTER_NAME="myvncluster"
export KEYVAULT_NAME="my-vn-aks-vault"
export KEYVAULT_SECRET_NAME="my-vn-aks-opr-key-name"
export MANAGED_IDENTITY="my-vn-aks-opr-id"
export AKS_NODE_RESOURCE_GROUP="MC_${RESOURCE_GROUP}_${AKS_CLUSTER_NAME}_${LOCATION}"
export SUBSCRIPTION_ID="$(az account show --query id --output tsv)"
export DEPLOYMENT_ENV="integ"
```

### Set Up AKS and Node Pool

AKS とノードプールをセットアップするには、次の手順を完了します:

- [Create Resource Group](#create-resource-group)
- [Create Virtual Network](#create-virtual-network)
- [Create Subnets](#create-subnets)
- [Create Public IP Address](#create-public-ip-address)
- [Create NAT Gateway](#create-nat-gateway)
- [Configure NAT Service for Source Subnet](#configure-nat-service-for-source-subnet)
- [Get the AKS Subnet ID](#get-the-aks-subnet-id)
- [Create an AKS Service](#create-an-aks-service)
- [Get the Principal ID of the Managed Identity](#get-the-principal-id-of-the-managed-identity)
- [Create Contributor Role for the Two Resource Groups](#create-contributor-role-for-the-two-resource-groups)

#### Create Resource Group
Azure で、UID2 Private Operator を実行するリソースグループを作成するには、次のコマンドを実行します:

```
az group create --name "${RESOURCE_GROUP}" --location "${LOCATION}"
```

:::info
すべてのリソースは、`${RESOURCE_GROUP}` の値として指定した名前の下に後でプロビジョニングされます。
:::

ロケーションに関していくつかの制限があります:
- UID2 Private Operator for AKS は、次の地域ではサポートされていません: ヨーロッパ、中国。

- Azure 仮装ネットワークのデプロイメントの可用性については、[Resource availability & quota limits for ACI](https://learn.microsoft.com/ja-jp/azure/container-instances/container-instances-resource-and-quota-limits#confidential-container-resources-preview) を確認してください。

- ロケーションのエイリアスを取得するには、次のコマンドを実行します:

   ```
   az account list-locations -o table
   ```

#### Create Virtual Network

仮装ネットワークを作成するには、次のコマンドを実行します:

```
az network vnet create \
    --resource-group ${RESOURCE_GROUP} \
    --name ${VNET_NAME} \
    --location ${LOCATION} \
    --address-prefixes 10.0.0.0/8
```

#### Create Subnets

サブネットを作成するには、次のコマンドを実行します:

```
# Default Subnet (10.0.0.0/24)
az network vnet subnet create \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name default \
    --address-prefixes 10.0.0.0/24

# AKS Subnet (CIDR /16)
az network vnet subnet create \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name aks \
    --address-prefixes 10.1.0.0/16

# Container Groups Subnet (CIDR /16) with Delegation
az network vnet subnet create \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name cg \
    --address-prefixes 10.2.0.0/16 \
    --delegations Microsoft.ContainerInstance/containerGroups
```

#### Create Public IP Address

パブリック IP アドレスを作成するには、次のコマンドを実行します:

```
az network public-ip create --name ${PUBLIC_IP_ADDRESS_NAME} --resource-group ${RESOURCE_GROUP} --sku standard --allocation static
```

#### Create NAT Gateway

[Azure NAT Gateway](https://learn.microsoft.com/ja-jp/azure/nat-gateway/nat-overview) を作成するには、次のコマンドを実行します:

```
az network nat gateway create \
    --resource-group ${RESOURCE_GROUP} \
    --name ${NAT_GATEWAY_NAME} \
    --public-ip-addresses ${PUBLIC_IP_ADDRESS_NAME} \
    --idle-timeout 4
```

#### Configure NAT Service for Source Subnet

NAT サービスを構成するには、次のコマンドを実行します:

```
az network vnet subnet update \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name cg \
    --nat-gateway ${NAT_GATEWAY_NAME}
```

#### Get the AKS Subnet ID

AKS サブネット ID を作成するには、次のコマンドを実行します:

```
export AKS_SUBNET_ID=$(az network vnet subnet show \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name aks \
    --query id \
    --output tsv)
```

#### Create an AKS Service

AKS サービスを作成するには、次のコマンドを実行します:

```
# Create the AKS cluster
az aks create \
    --resource-group ${RESOURCE_GROUP} \
    --name ${AKS_CLUSTER_NAME} \
    --location ${LOCATION} \
    --kubernetes-version 1.29.13 \
    --network-plugin azure \
    --network-policy calico \
    --vnet-subnet-id ${AKS_SUBNET_ID} \
    --service-cidr 10.4.0.0/16 \
    --dns-service-ip 10.4.0.10 \
    --node-vm-size Standard_D4d_v5 \
    --node-count 2 \
    --enable-cluster-autoscaler \
    --min-count 2 \
    --max-count 5 \
    --auto-upgrade-channel patch \
    --enable-managed-identity \
    --nodepool-name oprnodepool \
    --os-sku Ubuntu
```

#### Get the Principal ID of the Managed Identity

Principal ID を取得するには、次のコマンドを実行します:

```
export MANAGED_IDENTITY_PRINCIPAL_ID="$(az aks show --resource-group ${RESOURCE_GROUP} --name ${AKS_CLUSTER_NAME} --query "identityProfile.kubeletidentity.clientId" --output tsv)"
```

詳細は、Microsoft Azure ドキュメントの [Get the principal ID of the system-assigned managed identity](https://learn.microsoft.com/en-us/azure/aks/use-managed-identity#get-the-principal-id-of-the-system-assigned-managed-identity) を参照してください。

#### Create Contributor Role for the Two Resource Groups

各グループに対してコントリビューターロールを作成するには、次のコマンドを実行します:

```
az role assignment create \
  --assignee ${MANAGED_IDENTITY_PRINCIPAL_ID} \
  --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${AKS_NODE_RESOURCE_GROUP} \
  --role Contributor

az role assignment create \
  --assignee ${MANAGED_IDENTITY_PRINCIPAL_ID} \
  --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP} \
  --role Contributor
```

外部ドキュメントの追加参照情報:
- [Tutorial: Deploy virtual nodes on Azure Container Instances in your Azure Kubernetes Service cluster](https://learn.microsoft.com/ja-jp/azure/container-instances/container-instances-tutorial-virtual-nodes-helm)
- [Setting up a virtual node Environment](https://github.com/microsoft/VirtualNodesOnAzureContainerInstances?tab=readme-ov-file#setting-up-a-virtual-node-environment)

### Set Up AKS Cluster

AKS クラスターをセットアップするには、次のコマンドを実行します:

```
az aks get-credentials --name ${AKS_CLUSTER_NAME} --resource-group ${RESOURCE_GROUP}

az provider register -n Microsoft.ContainerInstance

git clone git@github.com:microsoft/virtualnodesOnAzureContainerInstances.git

helm install virtualnode virtualnodesOnAzureContainerInstances/Helm/virtualnode
 
# Wait for ~1 minute for virtualnode-0 to appear.
kubectl get nodes
```

### Complete Key Vault and Managed Identity Setup

次のステップは、[Key Vault](https://learn.microsoft.com/ja-jp/azure/key-vault/general/overview) をセットアップし、Operator Key を保存することです。Key Vault を作成したら、[Managed Identity](https://learn.microsoft.com/ja-jp/entra/identity/managed-identities-azure-resources/overview) を作成し、Key Vault へのアクセス権を付与できます。

後で、AKS クラスターが起動すると、この ID を使用します。詳細については、Microsoft Azure ドキュメントの [Running pods with an Azure Managed Identity](https://github.com/microsoft/virtualnodesOnAzureContainerInstances/blob/main/Docs/PodCustomizations.md#running-pods-with-an-azure-managed-identity) を参照してください。

以下の手順に従ってください:

```
az identity create --name "${MANAGED_IDENTITY}" --resource-group "${RESOURCE_GROUP}" --location "${LOCATION}"

az keyvault create --name "${KEYVAULT_NAME}" --resource-group "${RESOURCE_GROUP}" --location "${LOCATION}" --enable-purge-protection --enable-rbac-authorization

export KEYVAULT_RESOURCE_ID="$(az keyvault show --resource-group "${RESOURCE_GROUP}" --name "${KEYVAULT_NAME}" --query id --output tsv)"

az keyvault secret set --vault-name "${KEYVAULT_NAME}" --name "${KEYVAULT_SECRET_NAME}" --value "<some value>"

export IDENTITY_PRINCIPAL_ID="$(az identity show --name "${MANAGED_IDENTITY}" --resource-group "${RESOURCE_GROUP}" --query principalId --output tsv)"

az role assignment create --assignee-object-id "${IDENTITY_PRINCIPAL_ID}" --role "Key Vault Secrets User" --scope "${KEYVAULT_RESOURCE_ID}" --assignee-principal-type ServicePrincipal
```

### Complete the UID2 Private Operator Setup

Private Operator のセットアップを完了するには、次の手順に従ってください:

- [Update Placeholder Values](#update-placeholder-values)
- [Deploy Operator](#deploy-operator)

#### Update Placeholder Values

前の手順を完了したら、次の手順に従ってプレースホルダー値を更新します:

1. 以下のコマンドを実行して、Managed Identity ID を取得します

   ```
   MANAGED_IDENTITY_ID=$("az identity show --name "${MANAGED_IDENTITY}" --resource-group "${RESOURCE_GROUP}" --query id --output tsv")
   ```

2. `operator.yaml` ファイルの `microsoft.containerinstance.virtualnode.identity` を、返されたマネージド ID に置き換えます:

   ```
   sed -i "s#IDENTITY_PLACEHOLDER#$MANAGED_IDENTITY_ID#g" "operator.yaml"
   ```

3. 環境変数を使用して、Vault Key と Secret 名を更新します:

   ```
   sed -i "s#VAULT_NAME_PLACEHOLDER#$KEYVAULT_NAME#g" "operator.yaml"
   sed -i "s#OPERATOR_KEY_SECRET_NAME_PLACEHOLDER#$KEYVAULT_SECRET_NAME#g" "operator.yaml"
   sed -i "s#DEPLOYMENT_ENVIRONMENT_PLACEHOLDER#$DEPLOYMENT_ENV#g" "operator.yaml"
   ```

#### Deploy Operator

以下の手順に従って、Private Operator をデプロイします:

1. 作成した AKS クラスターの Kubernetes 構成資格情報を取得します:

   ```
   az aks get-credentials --name ${AKS_CLUSTER_NAME} --resource-group ${RESOURCE_GROUP}
   ```

2. Kubernetes 構成資格情報を取得したら、次のコマンドを実行して Private Operator をデプロイします:

   ```
   kubectl apply -f operator.yaml
   ```

## Running the Health Check

実装の状態を確認するには、ヘルスチェックエンドポイントを呼び出します。

ヘルスチェックの実行は、テスト環境と本番環境で同じですが、エンドポイントは異なります。

以下の手順に従ってください:

1. サービスのパブリック IP アドレスを取得します:

   ```
   IP=$(az network public-ip list --resource-group ${AKS_NODE_RESOURCE_GROUP} --query "[?starts_with(name, 'kubernetes')].ipAddress" --output tsv)
   ```

2. オペレータの状態をテストするには、ブラウザでヘルスチェックエンドポイントにアクセスします: `http://${IP}/ops/healthcheck`.

   HTTP 200 ステータスコードでレスポンスボディが `OK` の場合、正常な状態を示します。

import AttestFailure from '../snippets/_private-operator-attest-failure.mdx';

<AttestFailure />

## Upgrading

UID2 Private Operator for AKS の新しいバージョンがリリースされると、独自の Private Operator をホストしている参加者は、更新の通知を受け取り、新しいリリースリンクまたはインストールファイルを取得するための手順が記載されたメールを受け取ります。アップグレードのウィンドウがあり、その後、古いバージョンは非アクティブになり、サポートされなくなります。

アップグレードするには、次の手順を完了します:

1. [Download ZIP File and Extract Files](#download-zip-file-and-extract-files) を参照して、新しいバージョンのデプロイメントファイルをダウンロードし、解凍します。

2. [Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup) を参照して、Key Vault と Managed Identity をセットアップします。

3. 新しい AKS デプロイメントのヘルスを確認し、ステータスが正常であることを確認します:

4. 古い AKS ポッドが適切にシャットダウンされていることを確認します:

   ```
   kubectl get pods
   ```
