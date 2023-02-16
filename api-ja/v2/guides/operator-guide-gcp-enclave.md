[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../README.md) > [Integration Guides](README.md) > Google Cloud Platform Confidential Computing Package

# UID2 Operator - Google Cloud Platform Confidential Computing Package

This guide provides information for setting up the UID2 Operator Service in a secure enclave in the Google Cloud Platform.

本ガイドでは、Google Cloud Platform のセキュアなエンクレーブで UID2 Operator Service を設定するための情報を提供します。

This guide includes the following information:

本ガイドには、以下の内容が記載されています:

- [Overview](#overview)
- [Build](#build)
- [Attestation Requirements](#attestation-requirements)
- [Integration Deployment](#integration-deployment)
  - [Cloud-init.yaml File](#cloud-inityaml-file)
  - [Cloud-init Example](#cloud-init-example)
  - [Create VM Instance](#create-vm-instance)
- [Production Deployment](#production-deployment)
- [Upgrading](#upgrading)

## Overview

The UID2 Operator service can be run in Google Cloud Platform within a Compute Engine virtual machine (VM) called a [Confidential VM](https://cloud.google.com/compute/confidential-vm/docs/about-cvm), which is a trusted computing enclave.

UID2 Operator サービスは、Google Cloud Platform の[Confidential VM](https://cloud.google.com/compute/confidential-vm/docs/about-cvm)と呼ばれる Compute Engine の仮想マシン（VM）内で実行することができます。これは、トラステッド・コンピューティング・エンクレーブです。

The enclave must use a [Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs) boot disk, which can be customized through the provided [cloud-init](https://cloudinit.readthedocs.io/) configuration.

エンクレーブは、[Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs) ブートディスクを使用する必要があり、提供される [cloud-init](https://cloudinit.readthedocs.io/) config によりカスタマイズすることができます。

The `cloud-init` config does the following:

`cloud-init` config は以下を行います:

1. Disables remote SSH access to the VM, allowing only UID2 traffic to go in and out.
2. Creates a `systemd` service, which does the following:

   1. Pulls the certified UID2 Operator Docker image from the UID2 project's Docker registry on GitHub (ghcr.io), using `docker pull`.
   2. Starts the container.

（ナンバリングの確認が必要）

1. VM へのリモート SSH アクセスを無効化し、UID2 トラフィックの in/out のみを許可します。
2. `systemd` サービスを作成し、以下の処理を行います:
   1. UID2 プロジェクトの Docker レジストリから、`docker pull`を使って、GitHub (ghcr.io)の UID2 Operator 認定 Docker イメージを取り込みます。
   2. コンテナを起動します。

When the UID2 Operator's Docker container starts up, it does the following:

UID2 Operator の Docker コンテナが起動すると、次のような処理が行われます:

1. Obtains an [instance identity token](https://cloud.google.com/compute/docs/instances/verifying-instance-identity) - a unique JSON Web Token (JWT) that includes details of the VM instance it is running on, as well as Google's RS256 signature.
2. Sends the instance identity token, plus the UID2 `api_token` specified in the `cloud-init` config, to the UID2 Core Service as an Attestation Request.

（ナンバリングの確認が必要）

1. [instance identity token](https://cloud.google.com/compute/docs/instances/verifying-instance-identity)を取得します。これは、実行中の VM インスタンスの詳細と Google の RS256 署名を含む一意の JSON Web Token(JWT)です。
2. instance identity token と、`cloud-init` config で指定した UID2 `api_token` を、UID2 Core Service に認証リクエストとして送ります。

When the UID2 Core Service receives the Attestation Request, it verifies the `api_token` and instance identity token.
As part of the Attestation Process for the operator, the UID2 Core Service also sends GCP API calls to retrieve VM instance metadata, such as the boot disk, `cloud-init` config, and audit logs.

UID2 Core Service は認証リクエストを受信すると、`api_token`と instance identity token を検証します。オペレーターの認証プロセスの一環として、UID2 Core Service は GCP API コールを送信し、起動ディスク、`cloud-init` config、監査ログなど、VM インスタンスのメタデータを取得します。

When the attestation is successful, the UID2 Core Service provides seed information such as salts and keys, to bootstrap the UID2 Operator Service.

認証に成功すると、UID2 Core Service は UID2 Operator Service を起動するために、Salt や Key などのシード情報を提供します。

## Build

You can pull the official Docker image to run UID2 Operator on GCP Confidential VM enclave from the GitHub Container Registry location using the following Docker command:

GCP Confidential VM エンクレーブ上で UID2 Operator を実行するための公式 Docker イメージは、以下の Docker コマンド GitHub Container Registry から取得できます:

```
docker pull ghcr.io/iabtechlab/uid2-operator
```

You can build a non-certified UID2 Operator container image from the source code using the following command:

以下のコマンドで、ソースコードから非認証の UID2 Operator コンテナイメージをビルドすることができます:

```
scripts/gcp/build.sh ghcr.io/iabtechlab/uid2-operator:v1.0.0-snapshot
```

## Attestation Requirements

The UID2 Operator Service can be run on any GCP account and project. However, to support Attestation, the project must grant several permissions to the service account that the UID2 Core Service uses to issue the GCP API calls during Attestation.

UID2 Operator Service は、どの GCP アカウントおよびプロジェクトでも実行できます。ただし、認証をサポートするために、プロジェクトは、UID2 Core Service が認証中に GCP API コールを発行するために使用するサービスアカウントに、いくつかの権限を付与する必要があります。

| Permission                | How the UID2 Core Service Uses It                               |
| :------------------------ | :-------------------------------------------------------------- |
| `compute.instances.get`   | Retrieves VM instance information, such as `cloud-init` config. |
| `compute.disks.get`       | Gets details of the VM boot disk.                               |
| `logging.logEntries.list` | Lists audit logs for the VM instance.                           |

| Permission                | How the UID2 Core Service Uses It                            |
| :------------------------ | :----------------------------------------------------------- |
| `compute.instances.get`   | `cloud-init` の設定など、VM インスタンスの情報を取得します。 |
| `compute.disks.get`       | VM の起動ディスクの詳細を取得します。                        |
| `logging.logEntries.list` | VM インスタンスの監査ログをリストアップします。              |

An alternative approach is to grant pre-defined GCP roles to UID2 Core's service account. These roles include the required permissions, as shown in the following table.

別の方法として、UID2 Core のサービスアカウントにあらかじめ定義された GCP ロールを付与することもできます。これらのロールには、次の表に示すように、必要な権限が含まれています。

| Role             | Permissions Included                           |
| :--------------- | :--------------------------------------------- |
| `Compute Viewer` | `compute.instances.get`<br>`compute.disks.get` |
| `Logs Viewer`    | `logging.logEntries.list`                      |

（翻訳なし）

## Integration Deployment

You can deploy a new UID2 Operator Service in a GCP VM Enclave into the integration environment by preparing a certified cloud-init.yaml file for the integration environment, and then create a new Confidential VM that uses the `cloud-init` config.

インテグレーション環境用の認証済み cloud-init.yaml ファイルを用意し、`cloud-init` config を使用する新しい Confidential VM を作成すれば、GCP VM Enclave 内の新しい UID2 Operator Service をインテグレーション環境にデプロイすることができます。

This section describes the deployment process.

このセクションでは、デプロイメントプロセスについて説明します。

### Cloud-init.yaml File

During the registration process, you will be provided with a certified cloud-init-`<timestamp>`.yaml file. This file cannot be modified in any way (other than to add the Client API Key) as the sha256sum of the file is used as part of the attestation process. The contents of the file is discussed below, but the file is never created manually during the deployment process - it is always created by the UID team during the process of setting up a new private operator.

登録プロセスでは、認証された cloud-init-`<timestamp>`.yaml ファイルが提供されます。このファイルの sha256sum は認証プロセスの一部として使用されるため、このファイルを（クライアント API キーを追加する以外の）いかなる方法でも変更することはできません。ファイルの内容については後述しますが、このファイルはデプロイプロセス中に手動で作成されることはなく、常に UID チームが新しい Private Operator を設定するプロセス中に作成されます。

Note that the cloud-init.yaml file is specific to an environment, so you will have one for the integration environment, and one for the production environment.

cloud-init.yaml ファイルは環境に固有なので、インテグレーション環境用と本番環境用を用意することに注意してください。

### cloud-init Example

This is the `cloud-init` template to use for deploying UID2 Operator Enclave into the integration environment. This section discusses the contents of the file, but you must use the one provided during the registration process.

これは、UID2 Operator Enclave をインテグレーション環境にデプロイする際に使用する `cloud-init` テンプレートです。このセクションでは、ファイルの内容について説明しますが、登録時に提供されたものを使用する必要があります。

The file content should be provided as custom metadata under the key `user-data` when creating the VM instance. This `user-data` metadata will be read and interpreted by the Container-Optimized OS (COS) VM disk during booting.

このファイルの内容は、VM インスタンスの作成時に `user-data` というキーでカスタムメタデータとして提供する必要があります。この `user-data` メタデータは、起動時にコンテナ最適化 OS (COS) の VM ディスクによって読み込まれ、解釈されます。

As shown in the example below, it first disables remote SSH access, and then tells COS VM to pull the certified UID2 Operator Docker image from UID2 project's official Container Registry, using `docker pull`, and run the UID2 Operator container as a `systemd` service.

以下の例に示すように、まずリモート SSH アクセスを無効にし、次に COS VM に対して、`docker pull`を使って UID2 プロジェクトの公式コンテナレジストリから認証済みの UID2 Operator Docker イメージを Pull し、UID2 Operator コンテナを `systemd` サービスとして実行させるように指示します。

In the file you are provided with, the `UID2_ENCLAVE_IMAGE_ID` and `GHCR_RO_ACCESS_TOKEN` values are already set. There is no need to edit them manually.
You will be provided with the UID2_ENCLAVE_API_TOKEN separately, and will need to update this value in the file.

提供されたファイルでは、`UID2_ENCLAVE_IMAGE_ID` と `GHCR_RO_ACCESS_TOKEN` の値は既に設定されています。手動で編集する必要はありません。`UID2_ENCLAVE_API_TOKEN` は別途提供されますので、ファイル内のこの値を更新する必要があります。

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
    Description=Start UID 2.0 operator as a Docker container

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

To create a new VM instance, follow these steps with the files that you were given during the registration process.

新しい VM インスタンスを作成するには、登録時に渡されたファイルを使って以下の手順を実行します。

1. Copy the cloud-init-`<timestamp>`.yaml file into a temporary location.
2. Run the [gcloud script](https://cloud.google.com/blog/products/management-tools/scripting-with-gcloud-a-beginners-guide-to-automating-gcp-tasks) file from the same folder.
   This creates a new GCP Confidential VM that uses the correct VM image as well as the `cloud-init` file.

（ナンバリングの確認が必要）

1. cloud-init-`<timestamp>`.yaml ファイルを一時的な場所にコピーしてください。
2. 同じフォルダーにある [gcloud script](https://cloud.google.com/blog/products/management-tools/scripting-with-gcloud-a-beginners-guide-to-automating-gcp-tasks) ファイルを実行します。
   これにより、正しい VM イメージと `cloud-init` ファイルを使用した新しい GCP Confidential VM が作成されます。

An example of the `gcloud` script file is:

`gcloud` スクリプトファイルの例は以下の通りです:

```
$ gcloud compute instances \
  create uid2-operator-gcp-01 \
  --confidential-compute \
  --maintenance-policy Terminate \
  --image https://www.googleapis.com/compute/v1/projects/cos-cloud/global/images/cos-stable-101-17162-40-56 \
  --metadata-from-file user-data=./cloud-init-1674598899.yaml \
  --tags http-server
```

You can change the name of the VM (uid2-operator-gcp-01 in the example above), but no other parameters can be changed, or attestation will fail.

VM の名前（上の例では uid2-operator-gcp-01）は変更できますが、その他のパラメータは変更できず、認証に失敗します。

## Production Deployment

We can deploy a new UID2 Operator in GCP VM Enclave into the production environment by following the same process as for Integration.
You will need a new instance of the cloud-init-`<timestamp>`.yaml file. This file uses the production URLs for the UID2 Core Service.
You will also be given a new `gcloud` script file. There are only two differences between the script file for the integration environment and the file for the production environment:

インテグレーション環境と同じ手順で、GCP VM エンクレーブの新しい UID2 Operator を本番環境にデプロイすることができます。
cloud-init-`<timestamp>`.yaml ファイルの新しいインスタンスが必要です。このファイルには、UID2 コアサービスの本番用 URL が使用します。また、新しい `gcloud` スクリプトファイルも提供されます。インテグレーション環境用のスクリプトファイルと本番環境用のスクリプトファイルには、2 箇所の違いしかありません:

- The name of the cloud-init-`<timestamp>`.yaml file used.
- The `machine-type` setting. It is recommended that for the production environment you specify the machine type in the `gcloud` script. Currently, it is recommended that you run the UID2 operator on a machine type of `n2d-standard-16`.

- 使用する cloud-init-`<timestamp>`.yaml ファイル名。
- `machine-type` の設定。本番環境では、`gcloud` スクリプトでマシンタイプを指定することが推奨されます。現在、UID2 オペレータは `n2d-standard-16` のマシンタイプで実行することが推奨されています。

The following is an example of the script.

以下は、スクリプトの例です。

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

> NOTE: Compared to the `gcloud` command used in the prior section, an additional option, `--machine-type n2d-standard-16`, is added. This option ensures that the production deployment of the UID2 Operator Service runs on
> the recommended machine type that matches the production configuration.

> NOTE: 前のセクションで使用した `gcloud` コマンドと比較して、 `--machine-type n2d-standard-16` という追加のオプションが追加されています。このオプションは、UID2 Operator Service の本番環境での実行を保証するものです。
> このオプションは、UID2 Operator Service の本番環境でのデプロイが、本番環境と一致する推奨のマシンタイプで実行されることを保証します。

## Upgrading

For each operator version update, private operators receive an email notification with an upgrade window, after which the old version is deactivated and no longer supported.
To upgrade to the latest version, deploy the new `cloud-init` configuration provided in the email in the same way as you deployed the original operator.

各オペレータのバージョンを更新するために、Private operator は、古いバージョンが非アクティブになり、サポートされなくなるときに、アップグレードのウィンドウを持つメール通知を受け取ります。
最新バージョンにアップグレードするには、元のオペレータをデプロイしたのと同じ方法で、メールで提供される新しい `cloud-init` 設定をデプロイします。
