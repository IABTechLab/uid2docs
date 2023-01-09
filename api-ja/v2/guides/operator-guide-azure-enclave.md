[UID2 Overview](../../../README-ja.md) > [Getting Started](../../README.md) > [v2](../README.md) > [Integration Guides](README.md) > Microsoft Azure

# Microsoft Azure Confidential Compute Operator Package

IMPORTANT: このドキュメントは現在、PoC の段階です。詳細については、UID2 administrator に [連絡](../../README.md#contact-info) してください。

UID2 Operator サービスは、Intel SGX テクノロジーを搭載したトラステッドコンピューティングエンクレーブ内で実行することができます。

1. [Build](#build)
2. [Test Run](#test-run)
3. [Deployment](#deployment)

Operator のコードベースには、サービスをパッケージ化するためのスクリプトが含まれており、以下のいずれかの方法でデプロイすることが可能です:

- (推奨)Azure Kubernetes Service(AKS)への展開
- Azure VM 上で直接実行する

> NOTE: SGX エンクレーブの構築と実行は、オープンソースの LibOS 実装である [Occlum](https://github.com/occlum/occlum) によって実現されています。
> オープンソースの LibOS 実装です。

## Build

### Prerequisites

- ビルドは、Intel SGX 対応マシン上で実行する必要があります。テスト済みの構成は、Azure 上で動作する Standard_DC8_v2 VM です。
- オペレーティングシステムは Ubuntu 18.04 LTS (推奨する Azure イメージは "Server" タイプです) です。
- マシンを起動したら、`uid2-attestation-azure` リポジトリから `setup_build_vm.sh` を起動し、必要な依存関係をインストールします。
- ビルド中は sudo 権限が必要です。

### Steps

1. Operator Service が `azure` プロファイルを使用してビルドされていることを確認します。

```
# From the root source folder
export enclave_platform=azure-sgx
./setup_dependencies.sh
mvn package -P azure
```

2. `scripts/azure` ディレクトリで、enclave に含めるオペレータの設定ファイルを 1 つ選択します。設定ファイルは `conf/` フォルダの下にあり、`-config.json` というサフィックスを省略する必要があります。

3. エンクレーブと docker イメージをビルドし、使用する設定ファイルを指定します。例えば:

```
./build.sh prod
```

```
./build.sh prod
```

### Artifacts

ビルドスクリプトはいくつかのアーティファクトを生成します:

- `dev.docker.adsrvr.org/uid2/operator/occlum:dev` -- occlum と UID2 Operator Service enclave を含む docker イメージです。
- `build/uid2-operator-azure-sgx.tar.gz` -- 上記の Docker イメージの tarball です。
- `build/uid2-operator/uid2-operator.tar.gz` -- occlum enclave パッケージの tarball です。
- コンテナ内の `sgx_quote` アプリケーションの出力 -- これは、occlum enclave が起動できるかどうかを確認し、エンクレーブの基本的な詳細 (MRSIGNER, MRENCLAVE, PRODID, SVN) を提供します。

## Test Run

ビルドしたイメージは、ビルドボックス上でローカルにテスト実行することができます。

- `./run.sh` -- operator サービスを開始します。
- `./run.sh occlum run /bin/sgx_quote` -- エンクレーブに関する基本情報をダンプします。

## Deployment

### Configuration

Operator enclave には、以下の環境変数を設定する必要があります（docker 経由または k8s デプロイ経由）。

- `core_api_token` -- Core サービスに接続するための API トークンです。
- `optout_api_token` -- UID2 OptOut サービスに接続するための API トークンです。

### AKS (Recommended)

1. 組織のポリシーに従って AKS クラスタとノードプールを準備し、[コンフィデンシャル コンピューティング](https://docs.microsoft.com/ja-jp/azure/confidential-computing/overview) であることを確認します。

2. docker イメージを、Docker リポジトリ (Azure Container Service など) で利用できるようにします。例えば:

```
cat uid2-operator-azure-sgx.tar.gz | docker import - uid20.azurecr.io/uid2/operator/occlum:0.2
docker push uid20.azurecr.io/uid2/operator/occlum:0.2。
```

3. 必要に応じて、k8s のデプロイとサービスを作成します。例として `uid2-operator-aks.yml` を使用することができます。

> IMPORTANT: Operator イメージが SGX 有効なノードをターゲットにしていることを確認してください (たとえば、`kubernetes.azure.com/sgx_epc_mem_in_MiB` にリソース制限を指定します)。

Operator Service は Standard_DC8_v2 インスタンスで実行するように設計されています。より小さなノードでの実行はサポートされていません。
同じノードで複数のオペレータサービスインスタンスを実行することはサポートされていません。

### Advanced Deployment Options

> IMPORTANT: これらは推奨事項ではありませんが、テスト目的には有用かもしれません。

#### Docker

ホストに Intel SGX DCAP ドライバがインストールされ、設定されていることを確認します。AKS セクションの手順に従って、operator docker イメージを実行可能な状態にします。

イメージの実行例:

```
docker run \
        --device /dev/sgx/enclave --device /dev/sgx/provision \
        -p 8080:8080 \
        -p 9091:9091 \
        dev.docker.adsrvr.org/uid2/operator/occlum:dev
```

#### Direct Invocation of Occlum (Advanced)

また、occlum enclave は、ホスト VM から、または独自の docker image から実行することができます:

```
tar xvf uid2-operator.tar.gz
cd uid2-operator
occlum run /bin/launcher
```

Operator コードベースの `scripts/azure` にある Dockerfile に、実行するための occlum enclave パッケージの準備に関する完全な詳細が記載されています。
