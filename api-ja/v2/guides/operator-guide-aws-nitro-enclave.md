[UID2 API Documentation](../../README.md) > [v2](../README.md) > [Integration Guides](README.md) > Nitro Enclave

# UID2 Operator: Nitro Enclave

Nitro Enclave 内の UID2 Operator は、PII を含む機密データを保護します。このガイドでは、UID2 Operator AMI を AWS Auto-Scaling Group に展開する方法と、UID2 Operator AMI をカスタマイズする方法について説明します。

1. [Create Launch Template](#create-launch-template)
2. [Create Auto-Scaling Group](#create-auto-scaling-group)
3. [Build Custom AMI](#build-custom-ami)
4. [Serve HTTPS](#serve-https)
5. [Change Listening Ports](#change-listening-ports)

## Create Launch Template

公式ビルド AMI、または [customized AMI](#build-custom-ami) がある場合に、UID2 Operator を AWS 上で展開・実行する方法の一つを紹介します。

Auto Scaling グループの起動テンプレートを作成するには、[AWS User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html) に従い、以下の設定を行います。

1. Launch Template の作成時に、30 日分のオプトアウトエントリーをサポートするために、少なくとも 64GB のメモリを持つインスタンス（例えば、m5.4xlarge）を作成します。
2. 詳細設定にて、Enclave のドロップダウンボタンを見つけ、`_Enclave: true_` に設定します。
3. User Data に移動し、適切な設定パラメータを含む JSON を提供します。例えば:

```
{
  "api_token": "your-api-token",
  "service_instances": 8,
  "enclave_cpu_count": 8,
  "enclave_memory_mb": 40000
}
```

### Required Parameters

| Parameter           | Data Type | Description                                                                                                                                                                                                                             |
| :------------------ | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `api_token`         | String    | UID2 Operator として使用する API トークン。                                                                                                                                                                                             |
| `service_instances` | Integer   | Operator Service が生成できるワーカー/スレッドの数で、enclave に割り当てた `CPU_COUNT` に従って設定します。                                                                                                                             |
| `enclave_cpu_count` | Integer   | Enclave 用に割り当てる CPU の数です。<br/> NOTE: インスタンスが vCPU を使用する場合、偶数個（2、4、6 など）を割り当て、常にホスト用に最低 2 コアを確保します。つまり、12 コアの場合、Enclave に最大 10 コアを割り当てることになります。 |
| `enclave_memory_mb` | Integer   | Enclave のために割り当てる MB 単位のメモリー。<br/>NOTE: ホスト用に少なくとも 8GB のメモリを残してください。つまり、80G のメモリがある場合、Enclave 用に最大 72G を割り当ててください。<br>Memory in MB you allocate for enclave.       |

### Optional Parameters

その他、起動時にオーバーライド可能な User Data の設定には以下のものがあります。

| Parameter                       | Data Type | Description                                                                                                                                                                             |
| :------------------------------ | :-------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `clients_metadata_path`         | String    | デフォルトでは、本番用の uid2-core サービスのエンドポイントを指す URL です。クライアントキーを取得するために別の UID2 コアサービスを指定したい場合は、この URL をオーバーライドします。 |
| `keys_metadata_path`            | String    | デフォルトでは、uid2-core サービスのエンドポイントを指す URL です。                                                                                                                     |
| `salts_metadata_path`           | String    | デフォルトでは、uid2-core サービスのエンドポイントを指す URL です。                                                                                                                     |
| `optout_metadata_path`          | String    | デフォルトでは、uid2-optout サービスのエンドポイントを指す URL です。                                                                                                                   |
| `optout_api_uri`                | String    | デフォルトでは、uid2-optout サービスのエンドポイントを指す URL です。                                                                                                                   |
| `optout_synthetic_logs_enabled` | Boolean   | インターナルテスト用です。                                                                                                                                                              |
| `optout_synthetic_logs_count`   | Integer   | インターナルテスト用です。                                                                                                                                                              |

## Create Auto-Scaling Group

Auto Scaling グループを作成するには:

1. _EC2 auto scaling group_ パネルで、**Create an Auto Scaling Group**をクリックします。
2. UID Operator 用に作成した [launch template](#create-launch-template) を選択します。
3. ネットワークとサブネットを選択します。
4. ロードバランサーを作成します。詳しくは [Serve HTTPS](#serve-https) を参照してください。
5. UID2 Operator のヘルスチェック用エンドポイントには、http://your-operator-node-ip:80/ops/healthcheck を使用します。

詳細な設定方法は、[AWS User Guide](https://docs.aws.amazon.com/ja_jp/autoscaling/ec2/userguide/create-asg-launch-template.html) を参照してください。

Auto Scaling グループを作成すると、いくつかのノードが自動的にスピンアップするはずです。ブラウザで `/ops/healthcheck` にアクセスして、それらが正しく起動するかどうかテストできます。

## Build Custom AMI

ホストマシン上にさらにアプリケーションを追加したい場合は、UID2 Operator を含む独自の AMI を構築することができます。

そのためには、以下のステップを完了する必要があります。

> IMPORTANT: ステップ 4-8 は root アクセスを必要とします。

1. 最新の Enclave イメージファイル (EIF) と UID2 Operator の最新配布版を、適切な [UID2 Administrator](/../README.md#contact-info) からリクエストしてください。
2. Nitro 環境を構築します。
3. UID2 Operator のバージョンを取得します。

   ```
   wget -O uid2-operator-dist.tar "https://uid2-operator-dist.s3.amazonaws.com/uid2-operator-internal-dist.tar?release-link-in-the-future"
   tar -xvf uid2-operator-dist.tar。
   cd uid2-operator-dist
   ```

4. `nitro-cli` をセットアップします。

   ```
   ./setup_nitro.sh
   ```

5. アロケーターをセットアップします (これはいつでも実行できます。起動時にでも、割り当てられたメモを変更することができます)。

   > IMPORTANT: 割り当て過ぎないように注意してください。そうしないとインスタンスがハングアップして、再起動しても二度とログインできなくなる可能性があります。

   ```
   ./setup_allocator.sh <cpu_for_enclave> <mem_in_mb_for_enclave>.
   ```

6. アロケータサービスを再起動して、設定を適用します。

   ```
   systemctl restart nitro-enclaves-allocator.service
   ```

7. 依存関係とエンクレーブヘルパースクリプトをインストールします。

   ```
   ./install.sh
   ```

8. この EC2 インスタンスから AMI をビルドします。

## Serve HTTPS

HTTPS を使用することは、顧客の鍵、個人情報の機密性を確保するために非常に重要です。

> IMPORTANT: UID2 Operator を本番用にホストする場合は、必ず安全な接続を確立してください。

しかしながら、AWS での HTTPS の設定は、UID2 Operator の設定の範囲外です。ソリューションによっては、HTTPS の設定とオフロードのために Application Load Balancer を使用することができます。

詳細は、以下のリソースを参照してください:

- [オートスケーリングロードバランサー](https://docs.aws.amazon.com/ja_jp/autoscaling/ec2/userguide/autoscaling-load-balancer.html)

- [HTTPS オフロード](https://docs.aws.amazon.com/ja_jp/elasticloadbalancing/latest/application/create-https-listener.html)

## Change Listening Ports

UID2 Operator が 80 番ポートをリッスン _したくない　\_\_ 場合は、ポートを変更してカスタム AMI を構築することができます。ホストサイドの設定は \_proxies.host.yaml_ にあります（インストールスクリプトで _/etc/uid2operator/proxy.yaml_ にインストールされます）。この中で、ポートの配置を変更することができます。

```
operator-service:
  service: direct
  listen: tcp://0.0.0.0:80 <-- change here
  connect: vsock://42:8080
```
