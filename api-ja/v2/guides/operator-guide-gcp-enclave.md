# UID2 Operator - Google Cloud Platform Confidential Compute package

UID2 Operator サービスは、Google が提供する信頼できるコンピューティングエンクレーブ内で実行することができます。
このフォルダのスクリプトは、サービスのパッケージ化を支援します。

UID2 Operator Enclave は、Google Compute Platform 上で稼働している
[Confidential VM](https://cloud.google.com/compute/confidential-vm/docs/about-cvm) で実行されます。
エンクレーブは、[Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs) ブートディスクを使用する必要があります。これは、提供される [cloud-init](https://cloudinit.readthedocs.io/) 設定を通じてカスタマイズすることが可能です。

cloud-init の設定は、VM へのリモート SSH アクセスを無効にし、UID2 のトラフィックのみを入出力できるようにします。また、GCP 上の UID2 プロジェクトの docker レジストリから、認証された UID2 Operator の docker イメージを docker pull し、コンテナを起動する systemd サービスも作成します。

UID2 Operator の Docker コンテナが起動すると、[Instance Document](https://cloud.google.com/compute/docs/instances/verifying-instance-identity) を取得します。これは、実行中の VM インスタンスの詳細と、Google の RS256 署名を含む固有の JSON ウェブトークンです。その後、Cloud-init 設定で指定された UID2 `api_token` と共に Instance Document を Attestation Request として UID2 Core に送ります。

UID2 Core サービスは Attestation Request を受信し、`api_token`と Instance Document を検証します。
オペレータの認証プロセスの一環として、UID2 Core は GCP API コールを発行し、起動ディスク、クラウドイニット設定、AuditLog などの VM インスタンスメタデータを取得します。

認証に成功すると、UID2 Core は UID2 Operator を起動するための Salt や Key などのシード情報を提供します。

## Build

GCP Confidential VM エンクレーブ上で UID2 Operator を実行するための公式 Docker イメージは、以下の Google Container Registry の場所から pull できます。

- docker pull gcr.io/uid2-316818/uid2-operator

以下のコマンドを使用して、ソースコードから非認証の UID2 Operator コンテナイメージをビルドすることができます:

```
scripts/gcp/build.sh gcr.io/uid2-316818/uid2-operator:v1.0.0-snapshot
```

## Attestation Requirements

UID2 Operator は、どの GCP アカウントおよびプロジェクトでも実行できますが、Attestation をサポートするために、UID2 Core が Attestation 中に GCP API コールを発行するために使用するサービスアカウントにいくつかのパーミッションを付与する必要があります。

UID2 Operator VM をホストする GCP アカウントとプロジェクトのリソースメタデータにアクセスするには、UID2 Core に以下の権限を付与する必要があります。

- `compute.instances.get`, UID2 Core はこのパーミッションを使って、VM インスタンス情報 (例：Cloud-init config) を取得することができます。
- `compute.disks.get`, UID2 Core はこのパーミッションを使って、VM 起動ディスクの詳細を取得します。
- `logging.logEntries.list`, UID2 Core はこのパーミッションを使って、VM インスタンスの AuditLog をリストアップすることができます。

また、UID2 Core のサービスアカウントには、上記の必要な権限を含む、以下の定義済みの GCP Role を付与することが可能です。

- `Compute Viewer`、この Role には `compute.instances.get` と `compute.disks.get` パーミッションが含まれます。
- `Logs Viewer`、この Role は `logging.logEntries.list` パーミッションを含みます。

## Integration Deployment

GCP VM Enclave にある新しい UID2 Operator をインテグレーション環境に展開するには、インテグレーション環境用の認証済み cloud-init config を用意し、その cloud-init を使用した Confidential VM を新規に作成することで可能となります。

ここでは、そのデプロイ手順について説明します。

### Input Variables

UID2 Operator Enclave を動作させるためには、以下のセクションで提供される cloud-init config テンプレートで、以下の変数を置き換える必要があります:

- `<INPUT_API_TOKEN>` -- Core サービスに接続するための API トークン
- `<INPUT_IMAGE_ID>` -- 実行する UID2 Operator 認証済みコンテナイメージのダイジェスト ID
- `<INPUT_DOCKER_PULL_CREDENTIAL>` -- プルする Docker クレデンシャル

- `<INPUT_API_TOKEN>` -- API token to connect to the Core service
- `<INPUT_IMAGE_ID>` -- Digest id of the certified UID2 Operator container image to run
- `<INPUT_DOCKER_PULL_CREDENTIAL>` -- Docker credential to pull

以下のテンプレートファイル内の「'<INPUT_xxx>' を検索し、実際の値に置き換えてください。

なお、`api_token` の値は、指定した UID2 Core 環境 (Integration Environment にデプロイする場合は core-integ.uidapi.com) に対してのみ使用可能であり、異なる環境に対しては使用できないことに注意してください。

### cloud-init template

UID2 Operator Enclave をインテグレーション環境にデプロイする際に使用する Cloud-Init テンプレートです。

その中の変数が実際の値に置き換えられると、ファイルの内容は VM インスタンスの作成時に `user-data` というキーの下にカスタムメタデータとして提供される必要があります。この `user-data` メタデータは、起動時にコンテナ最適化 OS (COS) の VM ディスクによって読み込まれ、解釈されます。

以下のテンプレートに示すように、まずリモート SSH アクセスを無効にし、UID2 プロジェクトの公式コンテナレジストリから認証済みの UID2 operator docker イメージを docker pull し、UID2 operator コンテナを systemd サービスとして実行するよう、COS VM に指示します。

```
#cloud-config

bootcmd:
- iptables -D INPUT -p tcp -m tcp --dport 22 -j ACCEPT
- systemctl mask --now serial-getty@ttyS0.service

runcmd:
- systemctl daemon-reload
- systemctl start uid2-operator.service

write_files:
- path: /etc/systemd/system/uid2-operator.service
  permissions: 0644
  owner: root
  content: |
    [Unit]
    Description=Start UID 2.0 operator as docker container

    [Service]
    Environment="UID2_ENCLAVE_API_TOKEN=<INPUT_API_TOKEN>"
    Environment="UID2_ENCLAVE_IMAGE_ID=<INPUT_IMAGE_ID>"
    Environment="HOME=/run/uid2"
    ExecStartPre=mkdir -p /run/uid2/.config/gcloud
    ExecStartPre=sh -c 'base64 -d /run/uid2/docker-credential.txt > /run/uid2/.config/gcloud/application_default_credentials.json'
    ExecStartPre=/usr/bin/docker-credential-gcr configure-docker
    ExecStart=/usr/bin/docker run --rm --name uid2-operator -v /run/uid2/operator.json:/app/conf/config.json -e KUBERNETES_SERVICE_HOST=1 -e core_api_token=${UID2_ENCLAVE_API_TOKEN} -e optout_api_token=${UID2_ENCLAVE_API_TOKEN} -p 80:8080 gcr.io/uid2-316818/uid2-operator@sha256:${UID2_ENCLAVE_IMAGE_ID}
    ExecStop=/usr/bin/docker stop uid2-operator
    ExecStopPost=/usr/bin/docker rm uid2-operator
- path: /run/uid2/operator.json
  permissions: 0644
  owner: root
  content: |
    {
      "clients_metadata_path": "https://core-integ.uidapi.com/clients/refresh",
      "keys_metadata_path": "https://core-integ.uidapi.com/key/refresh",
      "keys_acl_metadata_path": "https://core-integ.uidapi.com/key/acl/refresh",
      "salts_metadata_path": "https://core-integ.uidapi.com/salt/refresh",
      "core_attest_url": "https://core-integ.uidapi.com/attest",
      "optout_metadata_path": "https://optout-integ.uidapi.com/optout/refresh",
      "optout_api_uri": "https://optout-integ.uidapi.com/optout/replicate",
      "optout_s3_folder": "optout-v2/",
      "optout_inmem_cache": true,
      "enclave_platform": "gcp-vmid",
      "enforce_https": true
    }
- path: /run/uid2/docker-credential.txt
  permission: 0644
  owner: root
  content: <INPUT_DOCKER_PULL_CREDENTIAL>
```

### Create VM Instance

上記の cloud-init の設定テンプレートを使って、`./uid2-operator-integ.cloud-config.yaml` ファイルを作成します。テンプレート内の 3 つの入力変数がすべて実際の値に置き換えられていることを確認します。

次に、以下の `gcloud` コマンドを使用して、提供された cloud init config `./uid2-operator-integ.cloud-config.yaml` を使用して UID2 Operator を実行する GCP Confidential VM を作成することができます。

```
$ gcloud compute instances create uid2-operator-test \
    --confidential-compute \
    --maintenance-policy Terminate \
    --image-family cos-stable \
    --image-project cos-cloud \
    --metadata-from-file user-data=./uid2-operator-integ.cloud-config.yaml
```

## Production Deployment

GCP VM Enclave にある新しい UID2 Operator を本番環境にデプロイするには、本番環境用の認証済み cloud-init config を用意し、その cloud-init を使用する Confidential VM を新規に作成することで可能です。

ここでは、そのデプロイ手順について説明します。

### Input Variables

UID2 Operator Enclave を動作させるためには、以下のセクションで提供される cloud-init config テンプレートで、以下の変数を置き換える必要があります:

- `<INPUT_API_TOKEN>` -- Core サービスに接続するための API トークン
- `<INPUT_IMAGE_ID>` -- 実行する UID2 Operator 認証済みコンテナイメージのダイジェスト ID
- `<INPUT_DOCKER_PULL_CREDENTIAL>` -- プルする Docker クレデンシャル

以下のテンプレートファイルの '<INPUT_xxx>' を検索して、実際の値に置き換えてください。

なお、`api_token` の値は、指定された UID2 Core 環境 (本番環境へのデプロイ時には core-prod.uidapi.com) に対してのみ使用可能であり、異なる環境に対しては使用できないことに注意してください。

### cloud-init template for core-prod.uidapi.com

UID2 Operator Enclave を本番環境にデプロイする際に使用する Cloud-Init テンプレートです。

その中の変数が実際の値に置き換えられると、ファイルの内容は VM インスタンスの作成時に `user-data` というキーの下にカスタムメタデータとして提供される必要があります。この `user-data` メタデータは、起動時にコンテナ最適化 OS (COS) の VM ディスクによって読み込まれ、解釈されます。

以下のテンプレートに示すように、まずリモート SSH アクセスを無効にし、UID2 プロジェクトの公式コンテナレジストリから認証済みの UID2 operator docker イメージを docker pull し、UID2 operator コンテナを systemd サービスとして実行するよう、COS VM に指示します。

```
#cloud-config

bootcmd:
- iptables -D INPUT -p tcp -m tcp --dport 22 -j ACCEPT
- systemctl mask --now serial-getty@ttyS0.service

runcmd:
- systemctl daemon-reload
- systemctl start uid2-operator.service

write_files:
- path: /etc/systemd/system/uid2-operator.service
  permissions: 0644
  owner: root
  content: |
    [Unit]
    Description=Start UID 2.0 operator as docker container

    [Service]
    Environment="UID2_ENCLAVE_API_TOKEN=<INPUT_API_TOKEN>"
    Environment="UID2_ENCLAVE_IMAGE_ID=<INPUT_IMAGE_ID>"
    Environment="HOME=/run/uid2"
    ExecStartPre=mkdir -p /run/uid2/.config/gcloud
    ExecStartPre=sh -c 'base64 -d /run/uid2/docker-credential.txt > /run/uid2/.config/gcloud/application_default_credentials.json'
    ExecStartPre=/usr/bin/docker-credential-gcr configure-docker
    ExecStart=/usr/bin/docker run --rm --name uid2-operator -v /run/uid2/operator.json:/app/conf/config.json -e KUBERNETES_SERVICE_HOST=1 -e core_api_token=${UID2_ENCLAVE_API_TOKEN} -e optout_api_token=${UID2_ENCLAVE_API_TOKEN} -p 80:8080 gcr.io/uid2-316818/uid2-operator@sha256:${UID2_ENCLAVE_IMAGE_ID}
    ExecStop=/usr/bin/docker stop uid2-operator
    ExecStopPost=/usr/bin/docker rm uid2-operator
- path: /run/uid2/operator.json
  permissions: 0644
  owner: root
  content: |
    {
      "clients_metadata_path": "https://core-prod.uidapi.com/clients/refresh",
      "keys_metadata_path": "https://core-prod.uidapi.com/key/refresh",
      "keys_acl_metadata_path": "https://core-prod.uidapi.com/key/acl/refresh",
      "salts_metadata_path": "https://core-prod.uidapi.com/salt/refresh",
      "core_attest_url": "https://core-prod.uidapi.com/attest",
      "optout_metadata_path": "https://optout-prod.uidapi.com/optout/refresh",
      "optout_api_uri": "https://optout-prod.uidapi.com/optout/replicate",
      "optout_s3_folder": "optout-v2/",
      "optout_inmem_cache": true,
      "enclave_platform": "gcp-vmid",
      "enforce_https": true,
      "service_instances": 16
    }
- path: /run/uid2/docker-credential.txt
  permission: 0644
  owner: root
  content: <INPUT_DOCKER_PULL_CREDENTIAL>
```

### Using gcloud to create instance

上記の cloud-init の設定テンプレートを使って `./uid2-operator-prod.cloud-config.yaml` ファイルを作成し、テンプレート内の 3 つの入力変数がすべて実際の値に置き換えられていることを確認します。

次に、以下の `gcloud` コマンドを使用して、提供された cloud init config `./uid2-operator-prod.cloud-config.yaml` を使用して UID2 Operator を実行する GCP Confidential VM を作成することができます。

```
$ gcloud compute instances create uid2-operator-test \
    --machine-type n2d-standard-16 \
    --confidential-compute \
    --maintenance-policy Terminate \
    --image-family cos-stable \
    --image-project cos-cloud \
    --metadata-from-file user-data=./uid2-operator-prod.cloud-config.yaml
```

前のセクションで使用した `gcloud` コマンドと比較して、 `--machine-type n2d-standard-16` オプションが追加されていることに注意してください。これは、UID2 Operator の実稼働環境での展開が、実機の設定に一致する推奨マシンタイプで実行されるようにします。
