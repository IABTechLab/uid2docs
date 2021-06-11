# Microsoft Azure Confidential Compute Operator package

UID2 Operatorサービスは、Intel SGXテクノロジーによるトラステッド・コンピューティング・エンクレイブ内で実行することができます。
Operatorのコードベースには、サービスをパッケージ化するためのスクリプトが含まれており、Azure
Kubernetes Service (AKS) -- 推奨 -- またはAzure VM上で直接実行できます（docker経由かどうかは問いません）。

SGXエンクレーブの構築と実行は、オープンソースのLibOS実装である[Occlum](https://github.com/occlum/occlum)によって行われます。
LibOSのオープンソース実装です。

## Build

前提条件:

- インテル® SGX対応のマシンでビルドを実行する必要があります。テストされた構成はStandard_DC8_v2です。
   Azure上のVM
- オペレーティングシステムはUbuntu 18.04 LTSでなければなりません（推奨されるAzureイメージは "Server "バリアントのものです
- マシンが起動したら、`uid2-attestation-azure` リポジトリから `setup_build_vm.sh` を起動して、必要な依存関係をインストールします。
   リポジトリから `setup_build_vm.sh` を起動し、必要な依存関係をインストールします。
- ビルドの際にはsudo権限が必要です。

オペレータサービスが `azure` プロファイルを使用して構築されていることを確認してください。

```
# From the root source folder
export enclave_platform=azure-sgx
./setup_dependencies.sh
mvn package -P azure
```

次に、`scripts/azure`ディレクトリで、オペレータの設定ファイルの1つを選択して をエンクレイブに組み込みます。
設定ファイルは `conf/` フォルダの下にあり、`-config.json` というサフィックスは省略してください。

エンクレイブとdockerイメージを構築し、使用する設定ファイルを指定します。例えば、以下のようになります。

```
./build.sh prod
```

ビルドスクリプトはいくつかの成果物を生成します:

 - `dev.docker.adsrvr.org/uid2/operator/occlum:dev` -- occlum と the UID2 operator service enclaveを含む docker イメージ
 - `build/uid2-operator-azure-sgx.tar.gz` -- 上記Dockerイメージのtarball
 - `build/uid2-operator/uid2-operator.tar.gz` -- occlum enclaveパッケージのtarball
 - output of `sgx_quote` application within the container -- occlum enclaveが起動できることを確認し、エンクレイブに関する基本的な情報(MRSIGNER, MRENCLAVE, PRODID, SVN)を提供します。

## Test Run

ビルドされたイメージをローカルのビルドボックスでテスト実行することができます:

 - `./run.sh` -- オペレータサービスの開始
 - `./run.sh occlum run /bin/sgx_quote` -- enclaveの基本情報をダンプ

## Deployment

### Configuration

Operator enclaveには、以下の環境変数を設定する必要があります（docker経由またはk8sデプロイメント経由）:

 - `core_api_token` -- Coreサービスに接続するためのAPIトークン
 - `optout_api_token` -- UID2 OptOutサービスに接続するためのAPIトークン

### AKS (recommended)

組織のポリシーに従ってAKSクラスターとノードプールを準備し、[機密コンピューティングを有効にする](https://docs.microsoft.com/en-us/azure/confidential-computing/confidential-nodes-aks-get-started)ことを確認します。

dockerイメージをdockerリポジトリ（Azure Container Serviceなど）で利用できるようにします。例えば:

```
cat uid2-operator-azure-sgx.tar.gz | docker import - uid20.azurecr.io/uid2/operator/occlum:0.2
docker push uid20.azurecr.io/uid2/operator/occlum:0.2
```

必要に応じて、k8sのデプロイとサービスを変更します。例として `uid2-operator-aks.yml` を使用することができます。

**Important**: オペレータイメージがSGX対応ノードをターゲットにしていることを確認します（例：`kubernetes.azure.com/sgx_epc_mem_in_MiB`のリソース制限を指定するなど）。

Operator Serviceは、Standard_DC8_v2インスタンス上で動作するように設計されています。小さなノードでの実行はサポートされていません。
同一ノード上での複数のオペレーターサービスインスタンスの実行はサポートされていません。

### Docker (advanced, not recommended)

これは推奨された方法ではなく、テスト目的の場合にのみ有効です。

ホストにインテル SGX DCAP ドライバーがインストールされ、構成されていることを確認します。AKSのセクションの手順に従って、オペレータのDockerイメージを実行可能な状態にします。

イメージの実行例:

```
docker run \
        --device /dev/sgx/enclave --device /dev/sgx/provision \
        -p 8080:8080 \
        -p 9091:9091 \
        dev.docker.adsrvr.org/uid2/operator/occlum:dev
```

### Direct invocation of occlum (advanced, not recommended)

occlum enclaveは、ホストVMからでも、自分のdockerイメージからでも実行することができます。

```
tar xvf uid2-operator.tar.gz
cd uid2-operator
occlum run /bin/launcher
```

Operatorコードベースの`scripts/azure`の下にあるDockerfileには、occlum enclaveパッケージを実行するための準備の詳細が書かれています。
