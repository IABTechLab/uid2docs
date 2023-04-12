---
title: UID2 Operator - AWS Marketplace Integration
description: Integration information for AWS Marketplace private operator.
hide_table_of_contents: false
sidebar_position: 10
---

# UID2 Operator: AWS Marketplace Integration Guide

The UID2 Operator is the API server in the UID2 ecosystem. For a Private Operator service running in AWS Marketplace, the UID2 Operator solution is enhanced with [AWS Nitro](https://aws.amazon.com/ec2/nitro/) Enclave technology. This is an additional security measure to protect UID2 information from unauthorized access.

<!-- This guide includes the following information:

- [UID2 Operator on AWS Marketplace Product](#uid2-operator-on-aws-marketplace-product)
  -  [Prerequisites](#prerequisites)
  -  [Resources Created](#resources-created)
  -  [Customization Options](#customization-options)
  -  [Security Group Policy](#security-group-policy)
  -  [VPC Chart](#vpc-chart)
- [Deployment](#deployment)
- [Checking UID2 Operator Status](#checking-uid2-operator-status)
- [Creating a Load Balancer](#creating-a-load-balancer)
- [Upgrading the UID2 Operator](#upgrading-the-uid2-operator)
- [Technical Support](#technical-support) -->

## UID2 Operator on AWS Marketplace Product

>NOTE: [Unified ID 2.0 Operator on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la) is a free product. The cost displayed on the product page is an estimated cost for the necessary infrastructure.

By subscribing to the Unified ID 2.0 Operator on AWS Marketplace product, you gain access to the following:

- **[Amazon Machine Image (AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)** with the UID2 Operator service installed and ready to bootstrap:<br/>
    The AMI contains an [Amazon Linux 2](https://aws.amazon.com/amazon-linux-2/?amazon-linux-whats-new.sort-by=item.additionalFields.postDateTime&amazon-linux-whats-new.sort-order=desc) operating system with the UID2 Operator service already set up. When an EC2 instance based on the AMI boots up, it automatically fetches the configuration from your AWS account and starts the UID2 Operator server inside an enclave.
- **[CloudFormation](https://aws.amazon.com/cloudformation/) template**:<br/>
    The template deploys the UID2 Operator AMI.

### Prerequisites

To subscribe and deploy one or more UID2 Operators on AWS, complete the following steps:

1. Register your organization as a UID2 Operator.
2. Create an AWS account with an [IAM](https://aws.amazon.com/iam/) role that has the [minimal privileges](#minimal-iam-role-privileges).

#### Minimal IAM Role Privileges

>IMPORTANT: To succeed in a one-click deployment, your AWS account must have the privileges to run the following actions:

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

The following table lists all resources that are created during the [deployment](#deployment), and indicates which resource are always created and which ones depend on the `CreateVPC` condition in the CloudFormation template.

| Name | Type | Description | Created |
|:------|:------|:-------------|:--------------|
| `KMSKey` | `AWS::KMS::Key` | The key for secret encryption (for configuration strings). | Always |
| `SSMKeyAlias` | `AWS::KMS::Alias` | An alias that provides an easy way to access the [KMS](https://aws.amazon.com/kms/) key. | Always |
| `TokenSecret` | `AWS::SecretsManager::Secret` | An encrypted configuration that includes the operator key. | Always |
| `WorkerRole` | `AWS::IAM::Role` | The IAM role that your UID2 Operators run as. Roles provide access to configuration keys. | Always |
| `WorkerInstanceProfile` | `AWS::IAM::InstanceProfile` | The instance profile with Worker Role to attach to Operator EC2 instances. | Always |
| `VPC` | `AWS::EC2::VPC` | Virtual Private Cloud (VPC) is a virtual private network that hosts private operators. You can customize and use an existing VPC as well. See also [VPC Chart](#vpc-chart).| Conditionally |
| `Subnet1` | `AWS::EC2::Subnet` | The first subnet of the newly created VPC. | Conditionally |
| `Subnet2` | `AWS::EC2::Subnet` | The second subnet of the newly created VPC. | Conditionally |
| `RouteTable` | `AWS::EC2::RouteTable` | The Routing Table of the newly created VPC and subnets. | Conditionally |
| `InternetGateway` | `AWS::EC2::InternetGateway` | The Internet Gateway that allows operators to communicate with the UID2 Core Service and download security updates. | Conditionally|
| `AttachGateway` | `AWS::EC2::VPCGatewayAttachment` | A value that associates the Internet Gateway with the VPC. | Conditionally |
| `SecurityGroup` | `AWS::EC2::SecurityGroup` | A security group policy that provides rules for operator instances. See also [Security Group Policy](#security-group-policy).| Always |
| `LaunchTemplate` | `AWS::EC2::LaunchTemplate` | A launch template with all configurations in place. You can spawn new UID2 Operator instances from it. | Always |
| `AutoScalingGroup` | `AWS::AutoScaling::AutoScalingGroup` | An auto-scaling group (ASG) to which the launch template is attached. You can use this to update the desired number of instances later, if needed. | Always |

### Customization Options

Here's what you can customize during or after the [deployment](#deployment):

- VPC: You can either set up a new VPC and subnets or use existing ones.
- Root volume size (8G Minimum)
- SSH key: This is the SSH key that you use to access the UID2 Operator EC2 instances.
- [Instance type](https://aws.amazon.com/ec2/instance-types/m5/): m5.2xlarge, m5.4xlarge, and so on. If there is no customization, the default value, m5.2xlarge, is recommended.

### Security Group Policy

>NOTE: To avoid passing certificates associated with your domain into the enclave, inbound HTTP is allowed instead of HTTPS. This also avoids the cost of a secure layer, if used in a private network that is internal to your organization. 

| Port Number | Direction | Protocol | Description |
| ----------- | --------- | -------- | ------ |
| 80 | Inbound | HTTP | Serves all UID2 APIs, including the healthcheck endpoint `/opt/healthcheck`.<br/>When everything is up and running, the endpoint returns HTTP 200 with a response body of `OK`. For details, see [Checking UID2 Operator Status](#checking-uid2-operator-status).|
| 9080 | Inbound | HTTP | Serves Prometheus metrics (`/metrics`). |
| 443 | Outbound | HTTPS | Calls the UID2 Core Service; updates opt-out data and key store. |

### VPC Chart

The following diagram illustrates the virtual private cloud that hosts private operators.

![UID2 Operator VPC Chart](images/uid2-private-operator-aws-chart.svg)

## Deployment

To deploy UID2 Operator on AWS Marketplace, complete the following steps:

1. Subscribe to [Unified ID 2.0 Operator on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la). It might take several minutes before AWS completes your subscription.
2. Click **Configuration**.
3. On the Configuration page, click **Launch** and then select the **Launch CloudFormation** action.
4. In the Create stack wizard, specify the template and then click **Next**. The S3 path for the template file is automatically filled in.
5. Fill in the [stack details](#stack-details) and then click **Next**.
6. Configure the [stack options](#stack-configuration-options) and then click **Next**.
7. Review the information you have entered, and make changes if needed.
8. If you are prompted for permission to create IAM roles, select the **I acknowledge that AWS CloudFormation might create IAM resources** checkbox.
9. Click **Create stack**.

It takes several minutes for the stack to be created. When you see an Auto Scaling Group (ASG) created, you can select it and check the EC2 instances (by default, there is only one instance to start with).  For details, see [Checking UID2 Operator Status](#checking-uid2-operator-status).

### Stack Details

The following images show the **Specify stack details** page in the Create stack wizard ([deployment](#deployment) step 5). The table that follows provides a parameter value reference.

![Application Configuration](images/cloudformation-step-2.png) 

Lower part of the page:

![Infrastructure Configuration](images/cloudformation-step-2-2.png)

The following table explains the parameter values that you need to provide in step 5 during the [deployment](#deployment).

| Parameter | Description |
| :--- |:--- |
|Stack name |Any name of your choice. |
|OPERATOR_KEY |The Operator Key that you received from the UID2 Admin team. |
|UID2 Environment |Select `prod` for production environment or `integ` for the integration test environment. |
|Instance Type |`m5.2xlarge` is recommended. |
|Instance root volume size |15 GB or more is recommended. |
|Key Name for SSH |Your EC2 key pair for SSH access to the deployed EC2 instances. |
|Trusted Network CIDR |The CIDR (Classless Inter-Domain Routing) value determines the IP address range that can access your operator service.<br/>To limit access to the UID2 Operators so that they can only be accessed through an internal network or a load balancer, specify an internal IP range as the CIDR value. |
|Choose to use Existing VPC | To create a new VPC and subnets, set this parameter to `true`. To use an existing VPC and subnets which you provide, set the value to `false`.<br/>If you decide to use an existing VPC, you can find your own VPCs from the [VPC dashboard](https://console.aws.amazon.com/vpc/home). Otherwise, leave the **existing VPC Id**, **VpcSubnet1**, **VpcSubnet2** fields blank. |

### Stack Configuration Options

The following image shows the **Configure stack options** page in the Create stack wizard ([deployment](#deployment) step 6).

![Configure Stack Options](images/cloudformation-step-3.png)

The following table explains the parameter values that you need to provide in step 6 during the [deployment](#deployment).

| Parameter | Description |
| :--- |:--- |
|Tags | (Optional) Tag your stack. |
|Permissions |If you have separate IAM roles subscribing to AWS marketplace and deploying the stack, enter the name/ARN of the role you will use to deploy the stack. |
|Stack failure options |Choose what happens when deployment fails. The `Roll back all stack resources` option is recommended. |
|Advanced options | These are optional. |

## Checking UID2 Operator Status

To find the EC2 instances, complete the following steps:

1. In the CloudFormation stack, click the **Resources** tab and find the Auto Scaling Group (ASG). 
2. In the **Physical ID** column, click the ASG link.
3. Inside the selected ASG, go to the **Instance management** tab where you can find the ID of the available EC2 instances (by default it starts only one instance).
4. To test operator status, in your browser, go to `http://{public-dns-of-your-instance}/ops/healthcheck`. `OK` indicates good status.

![Stack Creation Resources](images/stack-creation-resources.png)

## Creating a Load Balancer

To create a load balancer and a target operator auto-scaling group, complete the following steps:

1. In the AWS Console, navigate to the EC2 dashboard and search for `Load Balancer`.
2. Click **Create Load Balancer**.
3. On the Load balancer types page, in the **Application Load Balancer** section, click **Create**.
4. Enter the UID2 **Load balancer name** and, depending on whether or not you need to access UID2 APIs from public internet, choose the **Internet-facing** or **Internal** scheme.
5. Select the **VPC** for your targets and at least two subnets used in your CloudFormation stack.
6. Click **Create new security group** and enter `UID2SGALB` as its name.
7. Under **Inbound rules**, select **HTTPS** and **Source IP range**, which depend on your requirements, and then click **Create security group**.
8. Go back to the Load Balancer page and select the newly created `UID2SGALB` security group.
9. Under **Listeners and routing**, click the **Create target group** link and [specify the target group details](#specifying-target-group-details).
10. Go back to the Load Balancer page. Under **Forward to**, select `UID2ALBTG`, and then change the **Port** value to `443`.
11. Set up an HTTPS listener by following the instructions in the [AWS user guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html).
12. Click **Create load balancer**.

### Specifying Target Group Details

To create a target group when [creating a load balancer](#creating-a-load-balancer), complete the following steps:

1. On the Specify group details page, select **Instances** as the target type, then enter `UID2ALBTG` as the **Target group name** and select **HTTP1** as the **Protocol version**.
2. Under **Health checks**, provide `/ops/healthcheck` as the **Health check path**, and then expand the **Advanced health check settings** section. 
3. Select **Override** as the **Port** and change the default value to `9080`.
4. Select UID2 Operator EC2 Instances created by your auto-scaling group and then click **Include as pending below**. 
5. Make sure the **Ports for the selected instances** contains `80`.
6. Click **Create target group**.

## Upgrading the UID2 Operator

For each operator version update, each private operator receives an email notification with an upgrade window. After the upgrade window, the old version is deactivated and is no longer supported.

Here's what you need to know about upgrading:

- Information on the availability of new versions is provided on the [Unified ID 2.0 Operator on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la) page.
- To upgrade your UID2 Operators, create a new CloudFormation stack. For details, see [Deployment](#deployment).

>TIP: For a smooth transition, create the new stack first. After the new stack is bootstrapped and ready to serve, delete the old stack. If you are using a load balancer, first get the new instances up and running and then convert the DNS name from the previous one to the new one.

## Technical Support

If you have trouble subscribing or deploying the product, please contact us at [aws-mktpl-uid@thetradedesk.com](mailto:aws-mktpl-uid@thetradedesk.com).
