# UID2 Operator - Nitro Enclave

Nitro EnclaveのUID2 Operatorは、PIIを含む機密データを保護します。

このページに沿って

- UID2 Operator AMIをAWS Auto Scaling Groupにデプロイする
- UID2 Operator AMIのカスタマイズ

## Create Launch Template

このセクションでは、公式ビルドAMIまたは[カスタマイズされたAMI](#build-custom-ami)があれば、AWS上でUID2 Operatorをデプロイして実行することができる方法を紹介します。

[AWSユーザーガイド](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html)に沿って、オートスケーリンググループのローンチテンプレートを作成し、以下の設定を行います:

まず、Launch Templateの作成時に、30日分のオプトアウトエントリーに対応するため、64GB以上のメモリを持つインスタンス（例：m5.4xlarge）を作成します。

次に、「詳細設定」で、「Enclave」のドロップダウンボタン探し、「_Enclave: true_」に設定します。

次に、ユーザーデータに移動し、適切な設定パラメータを持つjsonを設定します:

```
{
  "api_token": "your-api-token",
  "service_instances": 8,
  "enclave_cpu_count": 8,
  "enclave_memory_mb": 40000
}
```

必要な構成:
- api_token: uid2 operatorとして機能するための api トークン。
- service_instances: operator サービスが生成できるワーカー/スレッドの数、enclave に割り当てる CPU_COUNT に応じて設定します。
- enclave_cpu_count：エンクレイブに割り当てたCPUの数。注意：インスタンスがvCPUを使用する場合、偶数（2、4、6...）を割り当て、常にホスト用に最低2コアを維持します。つまり、12コアの場合、最大10コアをエンクレイブに割り当てます。
- enclave_memory_mb: エンクレイブに割り当てたMB単位のメモリ。つまり、80G のメモリがある場合、最大 72G をエンクレイブに割り当てます。

起動テンプレートが完成したら、オートスケーリンググループの作成に移ります。

## Create Auto Scaling Group

EC2のオートスケーリンググループパネルで、*Create an Auto Scaling Group*　をクリックします。

- UID2オペレーター用に作成したばかりの起動テンプレートを選択する
- ネットワークとサブネットを選択する
- ロードバランサーを作成する。詳細は[Serve HTTPS](#serve-https)を参照
- UID2 Operatorのhealthcheckエンドポイントには、http://your-operator-node-ip:80/ops/healthcheck を使用することができます

詳しい設定については、[AWSユーザーガイド](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-launch-template.html)を参照ください。

オートスケーリンググループを作成すると、いくつかのノードが自動的にスピンアップするはずです。ブラウザの/ops/healthcheckにアクセスして、正しく起動しているかどうかを確認できます。

## Build Custom AMI

ホストマシン上にさらに多くのアプリケーションを追加したいパートナーは、UID2オペレーターを含む独自のAMIを構築することができます。そのためには、以下が必要です。

- uid2 operatorの最新リリースeif(enclave image file)の取得
- nitro環境の構築

UID2 オペレータの最新リリースバージョンを取得します（WIP）。

```
wget -O uid2-operator-dist.tar "https://uid2-operator-dist.s3.amazonaws.com/uid2-operator-internal-dist.tar?release-link-in-the-future"
tar -xvf uid2-operator-dist.tar
cd uid2-operator-dist
```

**All steps below requires root access**

nitro-cliのセットアップ

```
./setup_nitro.sh
```

アロケータの設定（起動時あるいはいつでも、割り当てられたメモリを変更することができます）

**warning**: 割り当てすぎないように注意してください。そうしないと、インスタンスがハングアップして、再起動しても二度とログインできなくなることがあります。 :(

```
./setup_allocator.sh <cpu_for_enclave> <mem_in_mb_for_enclave>
```

設定を適用するためにアロケータサービスを再起動します

```
systemctl restart nitro-enclaves-allocator.service
```

依存関係とenclaveヘルパースクリプトのインストール

```
./install.sh
```

最後に、このEC2インスタンスからAMIを構築すると、準備完了です。

## Serve HTTPS

HTTPSを使用することは、お客様の鍵やお客様の鍵のセキュリティ、および個人情報の機密性を確保するために非常に重要です。本番用のuid2 operatorをホストする際には、必ず安全な接続を確立してください。

[オートスケーリング・ロードバランサー]の詳細はこちら(https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html)

[HTTPSオフロード]の詳細はこちら(https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html)

## Change Listening Ports

WIP: このパートは将来的にUser Data jsonにインテグレーションされるかもしれません。

UID2 Operatorが80番ポートをリッスンすることを望まない場合は、ポートを変更してカスタムAMIを構築することができます。ホスト側の設定は *proxies.host.yaml* (インストールスクリプトで */etc/uid2operator/proxy.yaml* にインストールされます)にあります。この中でポートの配置を変更することができます。

```
operator-service:
  service: direct
  listen: tcp://0.0.0.0:80 <-- change here
  connect: vsock://42:8080
```

## Misc.

その他、起動時にオーバーライド可能な設定（User Data）があります:

- clients_metadata_path: url string。クライアントキーを取得するために別のuid2コアサービスを指定したい場合にオーバーライドします。デフォルトでは、production uid2-coreサービスのエンドポイントを指します。
- keys_metadata_path: url string。デフォルトでは、production uid2-coreサービスのエンドポイントを指します。
- salts_metadata_path: url string。デフォルトではproduction uid2-coreサービスのエンドポイントを指します。
- optout_metadata_path: url string。デフォルトではproduction uid2-optoutサービスのエンドポイントを指します。
- optout_api_uri: url string。デフォルトではproduction uid2-optoutサービスのエンドポイントを指します。
- optout_synthetic_logs_enabled: 内部テスト用。
- optout_synthetic_logs_count: 内部テスト用。
- loki_enabled: boolean、デフォルトではfalse。詳しくは'loki'セクションを参照ください（WIP）。
