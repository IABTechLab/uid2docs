[UID2 Overview](../../../README.md) > [Getting Started](../../README.md) > [v2](../summary-doc-v2.md) > [Integration Guides](summary-guides.md) > AWS Marketplace

# UID2 Operator: AWS Marketplace Integration Guide

UID2 Operator は、UID2 エコシステムの API サーバーです。個人識別情報 (PII) を不正アクセスから保護するために、UID2 Operator ソリューションは AWS Nitro Enclave テクノロジーで強化されています。

このガイドには、以下の情報が含まれています:

- [UID2 Operator on AWS Marketplace Product](#uid2-operator-on-aws-marketplace-product)
  - [Prerequisites](#prerequisites)
  - [Resources Created](#resources-created)
  - [Customization Options](#customization-options)
- [Deployment](#deployment)
- [Checking UID2 Operator Status](#checking-uid2-operator-status)
- [Creating a Load Balancer](#creating-a-load-balancer)
- [Upgrading UID2 Operator](#upgrading-uid2-operator)
- [Technical Support](#technical-support)

## UID2 Operator on AWS Marketplace Product

> NOTE: [UID2 Operator on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la) は無料製品です。製品ページに表示されるコストは、インフラコストの概算値です。

UID2 Operator on AWS Marketplace 製品をサブスクライブすることで、以下を利用できます:

- UID2 Operator サービスがインストールされ、起動可能な状態の **Amazon Machine Image (AMI)**：<br/>
  AMI には、UID2 Operator Service がセットアップされた AmazonLinux2 OS が含まれています。AMI をベースにした EC2 インスタンスが起動すると、自動的に AWS アカウントから設定を取得し、エンクレーブ内で UID2 Operator サーバーを起動します。
- UID2 Operator AMI をデプロイするための **CloudFormation テンプレート**。

### Prerequisites

AWS 上で UID2 Operator をサブスクライブしデプロイするには、以下の手順を実行する必要があります:

1. UID2 Operator としてあなたの組織を登録します。
2. [最小限の権限](#minimal-iam-role-privileges) を持つ IAM ロールを持つ AWS アカウントを作成します。

#### Minimal IAM Role Privileges

> IMPORTANT: ワンクリックデプロイを成功させるためには、AWS アカウントに以下のアクションを実行する権限が必要です。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "kms:*",
        "autoscaling:*",
        "cloudformation:*",
        "iam:ListRoleTags",
        "secretsmanager:*",
        "iam:PutRolePolicy",
        "iam:AddRoleToInstanceProfile",
        "iam:ListRolePolicies",
        "iam:ListPolicies",
        "iam:GetRole",
        "iam:GetPolicy",
        "iam:DeleteRole",
        "iam:UpdateRoleDescription",
        "iam:TagPolicy",
        "iam:GetRolePolicy",
        "iam:CreateInstanceProfile",
        "iam:UntagRole",
        "iam:TagRole",
        "iam:ListInstanceProfilesForRole",
        "iam:PassRole",
        "iam:DeleteRolePolicy",
        "iam:ListPolicyTags",
        "iam:DeleteInstanceProfile",
        "iam:ListRoles",
        "iam:CreatePolicy",
        "iam:UntagPolicy",
        "iam:UpdateRole",
        "iam:UntagInstanceProfile",
        "iam:TagInstanceProfile",
        "iam:SetDefaultPolicyVersion",
        "iam:UpdateAssumeRolePolicy",
        "iam:GetPolicyVersion",
        "iam:RemoveRoleFromInstanceProfile",
        "iam:CreateRole",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:ListAttachedRolePolicies",
        "iam:DeletePolicy",
        "iam:ListInstanceProfileTags",
        "iam:CreatePolicyVersion",
        "iam:GetInstanceProfile",
        "iam:ListInstanceProfiles",
        "iam:ListPolicyVersions",
        "iam:DeletePolicyVersion",
        "iam:ListUserTags"
      ],
      "Resource": "*"
    }
  ]
}
```

### Resources Created

次の表は、[デプロイ](#deployment) 中に作成されるすべてのリソースを一覧表示したものです。

The following table lists all resources that are created during the [deployment](#deployment).

| Resource                                | Description                                                                                                                     |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| CloudFormation Stack                    | 作成されたすべてのリソースの論理表現です。リソースをグループとしてデプロイ、ロールバックするのに役立ちます。                    |
| KMS Key                                 | 秘密暗号化用の鍵（設定文字列用）です。                                                                                          |
| Configuration as Secret                 | シークレットマネージャーで作成した `uid2-operator-config-key` という名前のシークレットです。                                    |
| Worker Role                             | UID2 Operator が実行する IAM ロールです。                                                                                       |
| Worker Instance Profile                 | UID2 Operator が実行するインスタンスプロファイルです。Worker Role が望ましいです。                                              |
| Virtual Private Cloud (VPC) and subnets | UID2 Operator が動作する仮想ネットワークです。既存のものをカスタマイズして使用することも可能です。                              |
| Security Group                          | UID2 Operator がサービスを提供するための最小限のアクセスを提供するセキュリティグループです。使用する VPC を自動的に参照します。 |
| Launch Template                         | すべての設定が行われた起動テンプレートです。ここから新しい UID2 Operator インスタンスを生成することができます。                 |
| Auto Scaling Group (ASG)                | 起動テンプレートが添付された ASG です。後でこれで希望するインスタンス数を更新することができます。                               |
| UID2 Operator instances                 | ASG を作成した後に稼働を開始する EC2 インスタンスです。                                                                         |

### Customization Options

以下は、[デプロイ](#deployment) の実行中または実行後にカスタマイズできる内容です。

- VPC: 新しい VPC とサブネットを設定するか、既存のものを使用するかのどちらかです。
- ルートボリュームサイズ (8G Minimal)
- SSH キー: UID2 Operator の EC2 インスタンスにアクセスする際に使用する SSH キーです。
- インスタンスタイプ: m5.2xlarge, m5.4xlarge, など。カスタマイズしない場合は、m5.2xlarge がデフォルトで推奨されます。

## Deployment

AWS Marketplace で UID2 Operator をデプロイするには、次の手順を実行します:

1. [UID2 Operator on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la) をサブスクライブしてください。AWS がサブスクリプションを完了するまで、数分かかる場合があります。
2. **Configuration** をクリックします。
3. Configuration ページで、**Launch** をクリックし、**Launch CloudFormation** アクションを選択します。
4. Create stack ウィザードで、テンプレートを指定し、**Next** をクリックします。テンプレートファイルの S3 パスが自動的に入力されます。
5. [スタックの詳細](#stack-details) を入力し、**Next** をクリックします。
6. [スタックオプション](#stack-configuration-options) を設定し、**Next** をクリックします。
7. 入力した情報を確認し、変更したい場合は変更します。
8. IAM ロールの作成許可を求められたら、**I acknowledge that AWS CloudFormation might create IAM resources** のチェックボックスを選択します。
9. **Create stack** をクリックします。

スタックが作成されるまでには数分かかります。作成された Auto Scaling Group（ASG）が表示されたら、それを選択して EC2 インスタンスを確認します（デフォルトでは、開始するインスタンスは１つだけです）。 詳しくは、[UID2 オペレーターの状態確認](#checking-uid2-operator-status) を参照してください。

### Stack Details

以下は、スタック作成ウィザード（[デプロイ](#deployment)　ステップ 5）の「スタックの詳細を指定する」ページの 2 つのスクリーンショットです。以下の表は、パラメータ値のリファレンスを提供します。

![Application Configuration](images/cloudformation-step-2.png)

![Infrastructure Configuration](images/cloudformation-step-2-2.png)

次の表は、[デプロイ](#deployment) のステップ 5 で指定するパラメータ値について説明したものです。

| Parameter                  | Description                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack name                 | 好きな名前をつけてください。                                                                                                                                                                                                                                                                                                                                                  |
| OPERATOR_KEY               | UID2 Admin チームから受け取ったオペレーターキーです。                                                                                                                                                                                                                                                                                                                         |
| UID2 Environment           | 本番環境なら `prod`、インテグレーションテスト環境なら `integ` を選択してください。                                                                                                                                                                                                                                                                                            |
| Instance Type              | `m5.2xlarge` を推奨します。                                                                                                                                                                                                                                                                                                                                                   |
| Instance root volume size  | 15GB 以上を推奨します。                                                                                                                                                                                                                                                                                                                                                       |
| Key Name for SSH           | デプロイされた EC2 インスタンスに SSH アクセスするための EC2 キーペアです。                                                                                                                                                                                                                                                                                                   |
| Trusted Network CIDR       | これは、どの IP アドレスの範囲があなたのオペレータサービスにアクセスできるかを決定します。<br />内部ネットワークまたはロードバランサーを介してのみオペレータにアクセスする場合は、内部 IP 範囲に制限してください。                                                                                                                                                            |
| Choose to use Existing VPC | VPC とサブネットを新規に作成する場合は `true`、ユーザー提供の VPC とサブネットを使用する場合は `false` に設定します。<br/>既存の VPC を使用することにした場合、[VPC dashboard](https://console.aws.amazon.com/vpc/home) から自分の VPC を見つけることができます。それ以外の場合は、**existing VPC Id**, **VpcSubnet1**, **VpcSubnet2** フィールドを空白のままにしてください。 |

### Stack Configuration Options

以下は、スタック作成ウィザード（[デプロイ](#deployment) ステップ 6）の [スタックオプションの設定](#stack-configuration-options) ページのスクリーンショットです。

![Configure Stack Options](images/cloudformation-step-3.png)

次の表は、[デプロイ](#deployment) のステップ 6 で指定するパラメータ値について説明したものです。

| Parameter             | Description                                                                                                                                                     |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tags                  | (オプション) スタックにタグを付けます。                                                                                                                         |
| Permissions           | AWS Marketplace に登録する IAM ロールとスタックをデプロイする IAM ロールが分かれている場合、スタックをデプロイするために使用するロールの名前/ARN を入力します。 |
| Stack failure options | デプロイメントに失敗したときの処理を選択します。`すべてのスタックリソースをロールバックする`オプションを推奨します。                                            |
| Advanced options      | これらはオプションです。                                                                                                                                        |

## Checking UID2 Operator Status

EC2 インスタンスを見つけるには、次の手順を実行します:

1. CloudFormation スタックで、**Resources** タブをクリックし、Auto Scaling Group (ASG) を見つけます。
2. **Physical ID** 列の ASG リンクをクリックします。
3. 選択した ASG 内で、**Instance management** タブに移動し、利用可能な EC2 インスタンスの ID を見つけることができます（デフォルトでは 1 つのインスタンスのみが起動します）。
4. オペレーターの状態を確認するために、ブラウザで [http://\<public-dns-of-your-instance\>/ops/healthcheck](http://<public-domain-name>/ops/healthcheck) に移動します。`OK` は良好な状態を示します。

![Stack Creation Resources](images/stack-creation-resources.png)

## Creating a Load Balancer

ロードバランサーとターゲットオペレーターのオートスケーリンググループを作成するには、次の手順を実行します:

1. AWS コンソールで、EC2 ダッシュボードに移動し、`Load Balancer` を検索する。
2. **Create Load Balancer** をクリックします。
3. ロードバランサータイプのページで、**Application Load Balancer** のセクションで、**Create** をクリックします。
4. UID2 **Load balancer name** を入力し、パブリックインターネットから UID2 API にアクセスする必要があるかどうかに応じて、**Internet-facing** または **Internal** スキームを選択します。
5. ターゲットの **VPC** と、CloudFormation スタックで使用する少なくとも 2 つのサブネットを選択します。
6. **Create new security group** をクリックし、その名前として `UID2SGALB` を入力します。
7. **Inbound rules** の下で、要件に応じて **HTTPS** と **Source IP range** を選択し、**Create security group** をクリックします。
8. ロードバランサーのページに戻り、新しく作成した UID2SGALB セキュリティグループを選択します。
9. **Listeners and routing** の下にある **Create target group** リンクをクリックし、[specify the target group details](#specifying-target-group-details) をクリックします。
10. ロードバランサーのページに戻り、**Forward to** で `UID2ALBTG` を選択し、**Port** を `443` に変更します。
11. [AWS ユーザーガイド](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html) の手順に従い、HTTPS リスナーを設定します。
12. **Create load balancer** をクリックします。

### Specifying Target Group Details

[ロードバランサーの作成](#creating-a-load-balancer) でターゲットグループを作成する場合は、次の手順で行います:

1. グループの詳細ページで、ターゲットタイプ に **Instances** を選択し、**Target group name** に `UID2ALBTG` を入力し、**Protocol version** に **HTTP1** を選択します。
2. **Health checks** の下で、**Health check path** として `/ops/healthcheck` を指定し、**Advanced health check settings** セクションを開きます。
3. **Port** で **Override** を選択し、デフォルト値を `9080` に変更します。
4. オートスケーリンググループで作成した UID2 Operator EC2 インスタンスを選択し、**Include as pending below** をクリックします。
5. 選択したインスタンスの **Ports** に `80` が含まれていることを確認します。
6. **Create target group** をクリックします。

## Upgrading UID2 Operator

ここでは、バージョンアップについて説明します:

- 新しいバージョンの提供に関する情報は、[UID2 Operator on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la) で提供されます。
- UID2 Operator をアップグレードするには、新しい CloudFormation スタックを作成します。詳しくは、[デプロイ](#deployment) を参照してください。

> TIP: スムーズに移行するために、最初に新しいスタックを作成します。新しいスタックがブートストラップされ、サービスを提供する準備ができたら、古いスタックを削除してください。ロードバランサーを作成している場合、新しいインスタンスが起動した後に、以前の DNS 名から新しい DNS 名に変換します。

## Technical Support

製品のサブスクライブや導入に問題がある場合は、[aws-mktpl-uid@thetradedesk.com](mailto:aws-mktpl-uid@thetradedesk.com) までご連絡ください。
