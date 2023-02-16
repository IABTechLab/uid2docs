[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Integration Guides](README.md) > Google Cloud Platform Confidential Computing Package

# UID2 Operator - Google Cloud Platform Confidential Compute package

UID2 Operator サービスは、Google が提供するトラステッド・コンピューティング・エンクレーブ内で実行することができます。
このフォルダのスクリプトは、サービスのパッケージ化を支援します。

UID2 Operator エンクレーブは、Google Compute Platform 上で[Confidential VM](https://cloud.google.com/compute/confidential-vm/docs/about-cvm)として動作します。エンクレーブは、[Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs) ブートディスクを使用しなければなりません。これは、提供される [cloud-init](https://cloudinit.readthedocs.io/) config によりカスタマイズすることができます。

cloud-init config は、VM へのリモート SSH アクセスを無効にし、UID2 の in/out トラフィックのみを許可します。また、GCP 上の UID2 プロジェクトの docker レジストリから、認証された UID2 オペレータの docker イメージを docker pull し、コンテナを起動する systemd サービスも作成されます。

UID2 Operator の Docker コンテナが起動すると、[Instance Document](https://cloud.google.com/compute/docs/instances/verifying-instance-identity) を取得します。これは、実行中の VM インスタンスの詳細と、Google の RS256 署名を含む一意の JSON Web Token です。その後、cloud-init config で指定された UID2 `api_token` と共に Instance Document を認証リクエストとして UID2 Core に送ります。

UID2 Core サービスは認証リクエストを受信し、`api_token`と Instance Document を検証します。オペレーターの認証プロセスの一環として、UID2 Core は GCP API コールを発行し、起動ディスク、cloud-init config、監査ログなどの VM インスタンスメタデータを取得します。

認証に成功すると、UID2 Core は UID2 Operator を起動するための Salt や Key などのシード情報を提供します。

## Build

GCP Confidential VM エンクレーブ上で UID2 Operator を実行するための公式 Docker イメージは、以下のコマンドで Google Container Registry から取得できます:

```
docker pull ghcr.io/iabtechlab/uid2-operator
```

以下のコマンドで、ソースコードから非認証の UID2 operator コンテナイメージをビルドすることができます:

```
scripts/gcp/build.sh ghcr.io/iabtechlab/uid2-operator:v1.0.0-snapshot
```

## Attestation Requirements

UID2 Operator は、どの GCP アカウントおよびプロジェクトでも実行できますが、認証をサポートするために、UID2 Core が認証中に GCP API コールを発行するためのサービスアカウントにいくつかのパーミッションを付与する必要があります。

UID2 Operator VM をホストする GCP アカウントとプロジェクトのリソースメタデータにアクセスするために、UID2 Core に以下の権限を付与する必要があります:

- `compute.instances.get`, UID2 Core はこのパーミッションを使って、VM インスタンス情報(例：cloud-init config)を取得します。
- `compute.disks.get`, UID2 Core はこのパーミッションを使用して、VM ブートディスクの詳細を取得します。
- `logging.logEntries.list`, UID2 Core はこのパーミッションを使って、VM インスタンスの AuditLog をリストアップすることができます。

また、UID2 Core のサービスアカウントには、上記の必要な権限を含む、以下のような定義済みの GCP ロールを付与することができます:

- `Compute Viewer`、このロールは `compute.instances.get` と `compute.disks.get` パーミッションを含みます。
- `Logs Viewer`、このロールは `logging.logEntries.list` パーミッションを含みます。

## Integration Deployment

インテグレーション環境または本番環境で認証された cloud-init config を用意し、cloud-init を使用する新しい Confidential VM を作成することで、GCP VM エンクレーブの新しい UID2 Operator をインテグレーション環境にデプロイすることが可能です。

このセクションでは、デプロイメントプロセスについて説明します。

### Cloud-init.yaml file

登録プロセスでは、認証された cloud-init-`<timestamp>`.yaml ファイルが提供されます。このファイルの sha256sum は認証プロセスの一部として使用されるため、このファイルはいかなる方法でも変更できません。ファイルの内容については後述しますが、このファイルはデプロイプロセス中に手動で作成されることはなく、常に UID チームが新しい Private Operator を設定するプロセス中に作成されます。

cloud-init.yaml ファイルは環境に固有であるため、インテグレーション環境用と本番環境用の 2 つがあることに注意してください。

### cloud-init example

UID2 Operator エンクレーブをインテグレーション環境にデプロイする際に使用する cloud-init テンプレートです。ここでは、ファイルの内容について説明しますが、登録時に提供されたものを使用する必要があります。

このファイルの内容は、VM インスタンスの作成時に `user-data` というキーでカスタムメタデータとして提供する必要があります。この `user-data` メタデータは、起動時にコンテナ最適化 OS (COS) の VM ディスクによって読み込まれ、解釈されます。

以下の例に示すように、まずリモート SSH アクセスを無効にし、UID2 プロジェクトの公式コンテナレジストリから認証済みの UID2 operator docker イメージを docker pull し、UID2 operator コンテナを systemd サービスとして実行するよう、COS VM に指示します。

UID2_ENCLAVE_IMAGE_ID、GHCR_RO_ACCESS_TOKEN はすべて提供されるファイルに設定されています。手動で編集する必要はありません。UID2_ENCLAVE_API_TOKEN は別途提供するファイルで、手動で更新する必要があります。

```
#cloud-config

bootcmd:
- iptables -D INPUT -p tcp -m tcp --dport 22 -j ACCEPT
- iptables -A INPUT -p tcp -m tcp --dport 22 -j DROP
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
    Environment="UID2_ENCLAVE_API_TOKEN=<API_TOKEN>"
    Environment="UID2_ENCLAVE_IMAGE_ID=<IMAGE_ID>"
    Environment="GHCR_RO_ACCESS_TOKEN=<GHCR_TOKEN>"
    Environment="HOME=/run/uid2"
    ExecStartPre=mkdir -p /run/uid2/.config/gcloud
    ExecStartPre=docker login ghcr.io -u gcp-uid2-docker -p ${GHCR_RO_ACCESS_TOKEN}
    ExecStartPre=/usr/bin/docker-credential-gcr configure-docker
    ExecStart=/usr/bin/docker run --rm --name uid2-operator -v /run/uid2/operator.json:/app/conf/config.json -e KUBERNETES_SERVICE_HOST=1 -e core_api_token=${UID2_ENCLAVE_API_TOKEN} -e optout_api_token=${UID2_ENCLAVE_API_TOKEN} -p 80:8080 ghcr.io/iabtechlab/uid2-operator@sha256:${UID2_ENCLAVE_IMAGE_ID}
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
      "identity_token_expires_after_seconds": 14400,
      "refresh_token_expires_after_seconds": 2592000,
      "refresh_identity_token_after_seconds": 3600,
      "enclave_platform": "gcp-vmid",
      "enforce_https": true,
      "service_instances": 16,
      "allow_legacy_api": false
    }
```

### Create VM Instance

提供された cloud-init-`<timestamp>`.yaml ファイルを一時的な場所にコピーし、登録プロセスで提供された所定の gcloud スクリプトファイルを同じフォルダーから実行します。これにより、cloud-init ファイルと同様に正しい VM イメージを使用する、新しい GCP Confidential VM が作成されます。

gcloud スクリプトファイルの例は以下の通りです:

```
$ gcloud compute instances \
  create uid2-operator-gcp-01 \
  --confidential-compute \
  --maintenance-policy Terminate \
  --image https://www.googleapis.com/compute/v1/projects/cos-cloud/global/images/cos-stable-101-17162-40-56 \
  --metadata-from-file user-data=./cloud-init-1674598899.yaml \
  --tags http-server
```

VM の名前（上記の例では uid2-operator-gcp-01）は変更可能ですが、その他のパラメータを変更すると、認証に失敗します。

## Production Deployment

インテグレーション環境と同じ手順で、GCP VM エンクレーブにある新しい UID2 Operator を本番環境にデプロイできます。cloud-init-`<timestamp>`.yaml の新しいインスタンスを提供する必要があります。これは、Core service の本番用 URL と同様に、あなたの本番用 API-Token を使用します。新しい gcloud スクリプトファイルも提供されますが、使用する cloud-init-`<timestamp>`.yaml ファイルの名前が異なるだけです。gcloud スクリプトでは、マシンタイプも指定することを勧めます。現在、UID2 operator はマシンタイプが n2d-standard-16 で実行することが推奨されています。

スクリプトの例は以下の通りです:

```
$ gcloud compute instances \
  create uid2-operator-gcp-01 \
  --machine-type n2d-standard-16 \
  --confidential-compute \
  --maintenance-policy Terminate \
  --image https://www.googleapis.com/compute/v1/projects/cos-cloud/global/images/cos-stable-101-17162-40-56 \
  --metadata-from-file user-data=./cloud-init-1674598899.yaml \
  --tags http-server
```

前のセクションで使用した `gcloud` コマンドと比較して、 `--machine-type n2d-standard-16` オプションが追加されていることに注意してください。これは、UID2 Operator の実稼働環境でのデプロイが、実機の設定に一致する推奨マシンタイプで実行されるようにします。

## Upgrading

オペレータのバージョンを更新するたびに、Private operator はアップグレードのウィンドウを持つメール通知を受け取り、その後、古いバージョンは非アクティブになり、サポートされなくなります。最新バージョンにアップグレードするには、元のオペレータと同じ方法で、メールに記載されている新しい cloud-init をデプロイしてください。
