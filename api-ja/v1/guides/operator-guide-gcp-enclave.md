[UID2 API Documentation](../../README.md) > [v1](../README.md) > [Integration Guides](README.md) > Google Cloud Platform Confidential Computing Package

# UID2 Operator - Google Cloud Platform Confidential Compute package

UID2 Operator service can be run within a trusted computing enclave powered by Google.
Scripts in this folder help to package the service.

UID2 Operator サービスは、Google が提供するトラステッド・コンピューティング・エンクレーブ内で実行することができます。
このフォルダのスクリプトは、サービスのパッケージ化を支援します。

UID2 Operator Enclave runs on Google Compute Platform in a [Confidential VM](https://cloud.google.com/compute/confidential-vm/docs/about-cvm). The enclave must use a [Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs) boot disk, which can be customized through the provided [cloud-init](https://cloudinit.readthedocs.io/) config.

UID2 Operator エンクレーブは、Google Compute Platform 上で[Confidential VM](https://cloud.google.com/compute/confidential-vm/docs/about-cvm)として動作します。エンクレーブは、[Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs) ブートディスクを使用しなければなりません。これは、提供される [cloud-init](https://cloudinit.readthedocs.io/) config によりカスタマイズすることができます。

The cloud-init config will disable remote SSH access to the VM and allowing only the UID2 traffic in and out. It also creates a systemd service that will docker pull certified UID2 operator docker image from UID2 project's docker registry on GCP and starts the container.

cloud-init config は、VM へのリモート SSH アクセスを無効にし、UID2 の in/out トラフィックのみを許可します。また、GCP 上の UID2 プロジェクトの docker レジストリから、認証された UID2 オペレータの docker イメージを docker pull し、コンテナを起動する systemd サービスも作成されます。

When UID2 Operator's docker container starts up, it will obtain an 　[Instance Document](https://cloud.google.com/compute/docs/instances/verifying-instance-identity) -　 a unique JSON Web Token that includes details of the VM instance it is running on, as well as 　 Google's RS256 signature. It then sends the Instance Document plus the UID2 `api_token`　 specified in the cloud-init config to UID2 Core as Attestation Request.

UID2 Operator の Docker コンテナが起動すると、[Instance Document](https://cloud.google.com/compute/docs/instances/verifying-instance-identity) を取得します。これは、実行中の VM インスタンスの詳細と、Google の RS256 署名を含む一意の JSON Web Token です。その後、cloud-init config で指定された UID2 `api_token` と共に Instance Document を認証リクエストとして UID2 Core に送ります。

UID2 Core service receives Attestation Request, verifies `api_token` and Instance Document. As part of Attestation Process for the operator, UID2 Core will also issue GCP API calls to retrieve VM instance metadata, such as the boot disk, cloud-init config, and AuditLogs.

UID2 Core サービスは認証リクエストを受信し、`api_token`と Instance Document を検証します。オペレーターの認証プロセスの一環として、UID2 Core は GCP API コールを発行し、起動ディスク、cloud-init config、監査ログなどの VM インスタンスメタデータを取得します。

Once the attestation is successful, UID2 Core will provide seed information such as Salts, and Keys, to bootstrap UID2 Operator.

認証に成功すると、UID2 Core は UID2 Operator を起動するための Salt や Key などのシード情報を提供します。

## Build

The official Docker image to run UID2 Operator on GCP Confidential VM enclave can be pulled from the following Google Container Registry location:

GCP Confidential VM エンクレーブ上で UID2 Operator を実行するための公式 Docker イメージは、以下の Google Container Registry から取得できます:

- docker pull ghcr.io/iabtechlab/uid2-operator

You can use the following command to build a non-certified UID2 operator container image from source code:

以下のコマンドで、ソースコードから非認証の UID2 operator コンテナイメージをビルドすることができます。

```
scripts/gcp/build.sh ghcr.io/iabtechlab/uid2-operator:v1.0.0-snapshot
```

## Attestation Requirements

UID2 Operator can be run on any GCP account and project, however to support Attestation, it must grant several permissions to the service account UID2 Core uses to issue the GCP API calls during Attestation.

UID2 Operator は、どの GCP アカウントおよびプロジェクトでも実行できますが、認証をサポートするために、UID2 Core が認証中に GCP API コールを発行するためのサービスアカウントにいくつかのパーミッションを付与する必要があります。

The following permissions needs to be granted to UID2 Core for accessing resource metadata in the GCP account and project that hosts UID2 Operator VM:

UID2 Operator VM をホストする GCP アカウントとプロジェクトのリソースメタデータにアクセスするために、UID2 Core に以下の権限を付与する必要があります:

- `compute.instances.get`, UID2 Core uses this permission to retrieve VM instance information, e.g. cloud-init config.
- `compute.disks.get`, UID2 Core uses this permission to get details of VM boot disk.
- `logging.logEntries.list`, UID2 Core uses this permission to list AuditLogs of the VM instance.

- `compute.instances.get`, UID2 Core はこのパーミッションを使って、VM インスタンス情報(例：cloud-init config)を取得します。
- `compute.disks.get`, UID2 Core はこのパーミッションを使用して、VM ブートディスクの詳細を取得します。
- `logging.logEntries.list`, UID2 Core はこのパーミッションを使って、VM インスタンスの AuditLog をリストアップすることができます。

It is also possible to grant the following pre-defined GCP Roles to UID2 Core's service account, which include the above required permissions:

また、UID2 Core のサービスアカウントには、上記の必要な権限を含む、以下のような定義済みの GCP ロールを付与することができます:

- `Compute Viewer`, this Role contains `compute.instances.get` and `compute.disks.get` permissions.
- `Logs Viewer`, this Role contains `logging.logEntries.list` permission.

- `Compute Viewer`、このロールは `compute.instances.get` と `compute.disks.get` パーミッションを含みます。
- `Logs Viewer`、このロールは `logging.logEntries.list` パーミッションを含みます。

## Integration Deployment

We can deploy new UID2 Operator in GCP VM Enclave into Integration Environment by preparing a certified cloud-init config for Integration or Production Environment, and create a new Confidential VM that uses the cloud-init.

インテグレーション環境または本番環境で認証された cloud-init config を用意し、cloud-init を使用する新しい Confidential VM を作成することで、GCP VM エンクレーブの新しい UID2 Operator をインテグレーション環境にデプロイすることが可能です。

This section describes the deployment process.

このセクションでは、デプロイメントプロセスについて説明します。

### Cloud-init.yaml file

During the registration process, you will be provided with a certified cloud-init-`<timestamp>`.yaml file. This file cannot be modified in any way as the sha256sum of the file is used as part of the attestation process. The contents of the file is discussed below, but the file is never created manually during the deployment process - it will always be created by the UID Team during the process of setting up a new private operator.

登録プロセスでは、認証された cloud-init-`<timestamp>`.yaml ファイルが提供されます。このファイルの sha256sum は認証プロセスの一部として使用されるため、このファイルはいかなる方法でも変更できません。ファイルの内容については後述しますが、このファイルはデプロイプロセス中に手動で作成されることはなく、常に UID チームが新しい Private Operator を設定するプロセス中に作成されます。

Note that the cloud-init.yaml file is specific to an environment, so you will have one for the Integration Environment, and one for the Production environment.

cloud-init.yaml ファイルは環境に固有であるため、インテグレーション環境用と本番環境用の 2 つがあることに注意してください。

### cloud-init example

This is the cloud-init template to use for deploying UID2 Operator Enclave into Integration Environment. This section discusses the contents of the file, but you must use the one provided during the registration process.

UID2 Operator エンクレーブをインテグレーション環境にデプロイする際に使用する cloud-init テンプレートです。ここでは、ファイルの内容について説明しますが、登録時に提供されたものを使用する必要があります。

The file content should be provided as custom metadata under the key `user-data` when creating the VM instance. This `user-data` metadata will be read and interpreted by the Container-Optimized OS (COS) VM disk during booting.

このファイルの内容は、VM インスタンスの作成時に `user-data` というキーでカスタムメタデータとして提供する必要があります。この `user-data` メタデータは、起動時にコンテナ最適化 OS (COS) の VM ディスクによって読み込まれ、解釈されます。

As shown in the example below, it first disables remote SSH access, and then tells COS VM to docker pull certified UID2 operator docker image from UID2 project's official Container Registry and run the UID2 operator container as a systemd service.

以下の例に示すように、まずリモート SSH アクセスを無効にし、UID2 プロジェクトの公式コンテナレジストリから認証済みの UID2 operator docker イメージを docker pull し、UID2 operator コンテナを systemd サービスとして実行するよう、COS VM に指示します。

The UID2_ENCLAVE_IMAGE_ID and GHCR_RO_ACCESS_TOKEN will all be set in the file that you are provided with. There is no need to edit them manually. You will be provided with the UID2_ENCLAVE_API_TOKEN separately and it will need to be manually updated in the file.

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

Copy the provided cloud-init-`<timestamp>`.yaml file into a temporary location, and run the given gcloud script file that was provided during the registration process from the same folder. This will create a new GCP Confidential VM that uses the correct VM image as well as the cloud-init file.

提供された cloud-init-`<timestamp>`.yaml ファイルを一時的な場所にコピーし、登録プロセスで提供された所定の gcloud スクリプトファイルを同じフォルダーから実行します。これにより、cloud-init ファイルと同様に正しい VM イメージを使用する、新しい GCP Confidential VM が作成されます。

An example of the gcloud script file is:

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

The name of the VM (uid2-operator-gcp-01 in the example above) can be changed, but no other parameters can be changed, or attestation will fail.

VM の名前（上記の例では uid2-operator-gcp-01）は変更可能ですが、その他のパラメータを変更すると、認証に失敗します。

## Production Deployment

We can deploy new UID2 Operator in GCP VM Enclave into Production Environment by following the same process as for Integration. You will need to be provided with a new instance of the cloud-init-`<timestamp>`.yaml. This will use your production API-Token as well as the production URLs for the core service. You will also be provided with a new gcloud script file, but it will only differ in the name of the cloud-init-`<timestamp>`.yaml file used. It is recommended that you also specify the machine type in the gcloud script. Currently, it is recommended to run the UID2 operator on a machine type of n2d-standard-16.

インテグレーション環境と同じ手順で、GCP VM エンクレーブにある新しい UID2 Operator を本番環境にデプロイできます。cloud-init-`<timestamp>`.yaml の新しいインスタンスを提供する必要があります。これは、Core service の本番用 URL と同様に、あなたの本番用 API-Token を使用します。新しい gcloud スクリプトファイルも提供されますが、使用する cloud-init-`<timestamp>`.yaml ファイルの名前が異なるだけです。gcloud スクリプトでは、マシンタイプも指定することを勧めます。現在、UID2 operator はマシンタイプが n2d-standard-16 で実行することが推奨されています。

An example of the script is given below:

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

Note that compared to the `gcloud` command used in the prior section, an additional option 　`--machine-type n2d-standard-16` is added, which ensures production deployment of UID2 Operator runs on 　 the recommended machine type that matches the production configuration.

前のセクションで使用した `gcloud` コマンドと比較して、 `--machine-type n2d-standard-16` オプションが追加されていることに注意してください。これは、UID2 Operator の実稼働環境でのデプロイが、実機の設定に一致する推奨マシンタイプで実行されるようにします。

## Upgrading

For each operator version update, private operators receive an email notification with an upgrade window, after which the old version is deactivated and no longer supported. To upgrade to the latest version, deploy the new cloud-init provided in the email in the same manner as the original operator.

オペレータのバージョンを更新するたびに、Private operator はアップグレードのウィンドウを持つメール通知を受け取り、その後、古いバージョンは非アクティブになり、サポートされなくなります。最新バージョンにアップグレードするには、元のオペレータと同じ方法で、メールに記載されている新しい cloud-init をデプロイしてください。
