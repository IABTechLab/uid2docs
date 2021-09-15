# UID2 Operator - Google Cloud Platform Confidential Compute package

UID2 Operatorサービスは、Googleが提供するTrusted Computing Enclave内で実行することができます。
このフォルダ内のスクリプトは、サービスのパッケージ化を支援します。

UID2 Operator Enclaveは、Google Compute Platform上で[Confidential VM](https://cloud.google.com/compute/confidential-vm/docs/about-cvm)で動作します。
Enclaveは[Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs)のブートディスクを使用する必要があり、これは提供されている[cloud-init](https://cloudinit.readthedocs.io/)のコンフィグによってカスタマイズすることができます。

cloud-initの設定では、VMへのリモートSSHアクセスを無効にし、UID2トラフィックのみの出入りを許可する。また、GCP上のUID2プロジェクトのdockerレジストリから認証済みのUID2 operator dockerイメージをdocker pullし、コンテナを起動するsystemdサービスを作成します。

UID2 Operatorのdockerコンテナが起動すると、[Instance Document](https://cloud.google.com/compute/docs/instances/verifying-instance-identity)を取得します。これは、実行しているVMインスタンスの詳細と、GoogleのRS256署名を含むユニークなJSON Web Tokenです。そして、Instance Documentとcloud-init configで指定されたUID2の`api_token`をAttestation RequestとしてUID2 Coreに送信します。

UID2 Coreサービスは認証リクエストを受け取り、`api_token`とインスタンスドキュメントを検証します。
オペレーターの認証プロセスの一環として、UID2 CoreはVMインスタンスのメタデータを取得するためにGCP APIコールを発行し、ブートディスク、クラウド・イニット・コンフィグ、監査ログなどを取得します。

認証に成功すると、UID2 Coreは、UID2 Operatorを起動するために、SaltやKeyなどのシード情報を提供します。

## Build

GCP Confidential VM enclave上でUID2 Operatorを実行するための公式Dockerイメージは、以下のGoogle Container Registryの場所から取得できます:
 - docker pull gcr.io/uid2-316818/uid2-operator

以下のコマンドを使用して、非認証のUID2オペレーターコンテナイメージをソースコードから構築することができます。

```
scripts/gcp/build.sh gcr.io/uid2-316818/uid2-operator:v1.0.0-snapshot
```

## Attestation Requirements

UID2 Operatorは、どのようなGCPアカウントおよびプロジェクトでも実行できますが、Attestationをサポートするためには、Attestationの際にUID2 CoreがGCP APIコールを発行するために使用するサービスアカウントにいくつかのパーミッションを付与する必要があります。

UID2 Operator VMをホストするGCPアカウントおよびプロジェクトのリソースメタデータにアクセスするためには、UID2 Coreに以下のパーミッションを付与する必要があります:
 - `compute.instances.get`, UID2 Coreはこのパーミッションを使って、cloud-init config.などのVMインスタンス情報を取得します。
 - `compute.disks.get`, UID2コアはこのパーミッションを使って、VMのブートディスクの詳細を取得します。
 - `logging.logEntries.list`, UID2 Coreはこの権限を使って、VMインスタンスのAuditLogをリストアップします。

また、UID2 Coreのサービスアカウントに、上記の必要な権限を含む以下の定義済みのGCPロールを付与することも可能です:
 - `Compute Viewer`, このロールには、`compute.instances.get`と`compute.disks.get`のパーミッションが含まれます。
- `Logs Viewer`, このロールには、`logging.logEntries.list`パーミッションが含まれています。

## Integration Deployment

GCP VM Enclaveの新しいUID2 Operatorをインテグレーション環境にデプロイするには、インテグレーション環境用に認証済みのcloud-init configを用意し、そのcloud-initを使用する新しいConfidential VMを作成します。

ここでは、デプロイメントプロセスについて説明します。

### Input Variables

UID2 Operator Enclaveを実行するためには、以下のセクションで提供されるcloud-init configテンプレートにおいて、以下の変数を置き換える必要があります:

 - `<INPUT_API_TOKEN>` -- Coreサービスに接続するためのAPIトークン
 - `<INPUT_IMAGE_ID>` -- 実行する認証済みUID2 OperatorコンテナイメージのダイジェストID
 - `<INPUT_DOCKER_PULL_CREDENTIAL>` -- プルするDockerクレデンシャル

以下のテンプレートファイルで'<INPUT_xxx>'を検索し、実際の値に置き換えてください。

なお、`api_token`の値は、指定されたUID2 Core環境（インテグレーション環境にデプロイする場合はcore-integ.uidapi.com）でのみ使用でき、別の環境では使用できません。

### cloud-init template

これは、UID2 Operator Enclaveをインテグレーション環境にデプロイする際に使用するcloud-initテンプレートです。

このファイルに含まれる変数を実際の値に置き換えた後、そのファイルの内容をカスタムメタデータとして、VMインスタンスの作成時にキー `user-data` で提供する必要があります。この`user-data`のメタデータは、コンテナ最適化OS（COS）のVMディスクが起動時に読み取って解釈します。

以下のテンプレートに示すように、まずリモートのSSHアクセスを無効にし、UID2プロジェクトの公式コンテナレジストリから認証済みのUID2 operator dockerイメージをdocker pullして、UID2 operatorコンテナをsystemdサービスとして実行するようCOS VMに指示しています。

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

上記で提供されたcloud-init configテンプレートを使用して、`./uid2-operator-integ.cloud-config.yaml`というファイルを作成し、テンプレート内の3つの入力変数がすべて実際の値に置き換えられていることを確認します。

次に、以下の`gcloud`コマンドを使用して、提供されたcloud init config `./uid2-operator-integ.cloud-config.yaml`を使用してUID2 Operatorを実行するGCP Confidential VMを作成します。

```
$ gcloud compute instances create uid2-operator-test \
    --confidential-compute \
    --maintenance-policy Terminate \
    --image-family cos-stable \
    --image-project cos-cloud \
    --metadata-from-file user-data=./uid2-operator-integ.cloud-config.yaml
```

## Production Deployment

本番環境用に認証されたcloud-init configを用意し、そのcloud-initを使用する新しいConfidential VMを作成することで、GCP VM Enclaveの新しいUID2 Operatorを本番環境にデプロイすることができます。

ここでは、デプロイメントプロセスについて説明します。

### Input Variables

UID2 Operator Enclaveを実行するためには、以下のセクションで提供されるcloud-init configテンプレートにおいて、以下の変数を置き換える必要があります:

- `<INPUT_API_TOKEN>` -- Coreサービスに接続するためのAPIトークン
- `<INPUT_IMAGE_ID>` -- 実行する認証済みUID2 OperatorコンテナイメージのダイジェストID
- `<INPUT_DOCKER_PULL_CREDENTIAL>` -- プルするDockerクレデンシャル

以下のテンプレートファイル内の'<INPUT_xxx>'を検索し、実際の値に置き換えてください。

`api_token`の値は、指定されたUID2 Core環境（production環境にデプロイする場合はcore-prod.uidapi.com）でのみ使用でき、別の環境では使用できないことに注意してください。

### cloud-init template for core-prod.uidapi.com

これは、UID2 Operator Enclaveを本番環境に展開する際に使用するcloud-initテンプレートです。

このファイルに含まれる変数を実際の値に置き換えた後、そのファイルの内容をカスタムメタデータとして、VMインスタンスの作成時にキー `user-data` で提供する必要があります。この`user-data`のメタデータは、コンテナ最適化OS（COS）のVMディスクが起動時に読み取って解釈します。

以下のテンプレートに示すように、まずリモートのSSHアクセスを無効にし、UID2プロジェクトの公式コンテナレジストリから認証済みのUID2 operator dockerイメージをdocker pullして、UID2 operatorコンテナをsystemdサービスとして実行するようCOS VMに指示しています。

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

上記で提供されたcloud-init configテンプレートを使用して、`./uid2-operator-prod.cloud-config.yaml`というファイルを作成し、テンプレート内の3つの入力変数がすべて実際の値に置き換えられていることを確認します。

次に、以下の`gcloud`コマンドを使用して、提供されたcloud init config `./uid2-operator-prod.cloud-config.yaml`を使用してUID2 Operatorを実行するGCP Confidential VMを作成します。

```
$ gcloud compute instances create uid2-operator-test \
    --machine-type n2d-standard-16 \
    --confidential-compute \
    --maintenance-policy Terminate \
    --image-family cos-stable \
    --image-project cos-cloud \
    --metadata-from-file user-data=./uid2-operator-prod.cloud-config.yaml
```

前のセクションで使用した`gcloud`コマンドと比較して、`--machine-type n2d-standard-16`というオプションが追加されていることに注意してください。これは、UID2 Operatorの本番デプロイメントが、本番環境の構成に合わせて推奨されるマシンタイプで実行されることを保証するものです。
