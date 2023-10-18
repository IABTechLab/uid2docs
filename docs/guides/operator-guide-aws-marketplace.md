---
title: UID2 Private Operator for AWS Integration Guide
sidebar_label: AWS Marketplace
pagination_label: UID2 Private Operator for AWS Integration Guide
description: Integration information for Private Operator in AWS.
hide_table_of_contents: false
sidebar_position: 17
---

# UID2 Private Operator for AWS Integration Guide

The UID2 Operator is the API server in the UID2 ecosystem. For a Private Operator service running in AWS Marketplace, the UID2 Operator solution is enhanced with [AWS Nitro](https://aws.amazon.com/ec2/nitro/) Enclave technology. This is an additional security measure to protect UID2 information from unauthorized access.

<!-- This guide includes the following information:

- [UID2 Private Operator for AWS](#uid2-private-operator-for-aws)
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

## UID2 Private Operator for AWS

>NOTE: [UID2 Private Operator for AWS](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la) is a free product. The cost displayed on the product page is an estimated cost for the necessary infrastructure.

By subscribing to UID2 Private Operator for AWS, you gain access to the following:

- [Amazon Machine Image (AMI)](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) with the UID2 Operator service installed and ready to bootstrap:<br/>
    The AMI contains an [Amazon Linux 2](https://aws.amazon.com/amazon-linux-2/?amazon-linux-whats-new.sort-by=item.additionalFields.postDateTime&amazon-linux-whats-new.sort-order=desc) operating system with the UID2 Operator service already set up. When an EC2 instance based on the AMI boots up, it automatically fetches the configuration from your AWS account and starts the UID2 Operator server inside an enclave.
- [CloudFormation](https://aws.amazon.com/cloudformation/) template:<br/>
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

The following table lists all resources that are created during the [deployment](#deployment).

| Name | Type | Description |
|:------|:------|:-------------|
| `KMSKey` | `AWS::KMS::Key` | The key for secret encryption (for configuration strings). |
| `SSMKeyAlias` | `AWS::KMS::Alias` | An alias that provides an easy way to access the [KMS](https://aws.amazon.com/kms/) key. |
| `TokenSecret` | `AWS::SecretsManager::Secret` | An encrypted configuration that includes the operator key. |
| `WorkerRole` | `AWS::IAM::Role` | The IAM role that your UID2 Operators run as. Roles provide access to configuration keys. |
| `WorkerInstanceProfile` | `AWS::IAM::InstanceProfile` | The instance profile with Worker Role to attach to Operator EC2 instances. |
| `SecurityGroup` | `AWS::EC2::SecurityGroup` | A security group policy that provides rules for operator instances. See also [Security Group Policy](#security-group-policy).|
| `LaunchTemplate` | `AWS::EC2::LaunchTemplate` | A launch template with all configurations in place. You can spawn new UID2 Operator instances from it. |
| `AutoScalingGroup` | `AWS::AutoScaling::AutoScalingGroup` | An auto-scaling group (ASG) to which the launch template is attached. You can use this to update the desired number of instances later, if needed. |

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
| 80 | Inbound | HTTP | Serves all UID2 APIs, including the healthcheck endpoint `/ops/healthcheck`.<br/>When everything is up and running, the endpoint returns HTTP 200 with a response body of `OK`. For details, see [Checking UID2 Operator Status](#checking-uid2-operator-status).|
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

It takes several minutes for the stack to be created. When you see an Auto Scaling Group (ASG) created, you can select it and check the EC2 instances (by default, there is only one instance to start with).

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

## Creating a Load Balancer

To create a load balancer and a target operator auto-scaling group, complete the following steps:

1. In the AWS Console, navigate to the EC2 dashboard and search for `Load Balancer`.
2. Click **Create Load Balancer**.
3. On the Load balancer types page, in the **Application Load Balancer** section, click **Create**.
4. Enter the UID2 **Load balancer name**. Depending on whether or not you need to access UID2 APIs from public internet, choose the **Internet-facing** or **Internal** scheme.
5. Select the **VPC** for your targets and at least two subnets used in your CloudFormation stack.
6. Under **Security groups**, click **Create new security group** and do the following:
    1. Enter `UID2SGALB` as its **Security group name**, as well as a relevant **Description**.
    2. Under **Inbound rules**, click **Add rule**, then select the **HTTPS** Type and an appropriate **Source** according to your requirements.
    3. Click **Create security group**.
8. Go back to the Load Balancer page and select the newly created `UID2SGALB` security group.
9. Under **Listeners and routing**, click the **Create target group** link and do the following:
    1. On the **Specify group details page**, select **Instances** as the target type, then enter `UID2ALBTG` as the **Target group name**.
    2. Ensure **HTTP1** is selected as the **Protocol version**.
    3. Under **Health checks**, provide `/ops/healthcheck` as the **Health check path**, and then click **Next**.
    4. Select UID2 Operator EC2 Instances created by your auto-scaling group and then click **Include as pending below**. 
    5. Make sure that all the ports for the targets contains `80`.
    6. Click **Create target group**.
10. Go back to the Load Balancer page, and under **Listeners and routing**, select `UID2ALBTG` as the target group to forward to as a default action. Note that you may have to refresh the target groups for your newly created target group to appear. Change the listener **Port** value to `443`.
11. Set up an HTTPS listener by following the instructions in the [AWS user guide](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html).
12. Click **Create load balancer**.
13. To verify the status of this load balancer, please continue in the below section: [Checking UID2 Operator Status](#checking-uid2-operator-status)

## Checking UID2 Operator Status

To check the UID2 Operator status of your Load Balancer, complete the following steps:

1. Identify the DNS name of your load balancer by going to **EC2 > Load balancers** and looking at the **DNS name** column of your load balancer.
2. In your browser, go to `https://{dns-name-of-your-load-balancer}/ops/healthcheck`. A response of `OK` indicates good operator status.

## Upgrading the UID2 Operator

For each operator version update, each private operator receives an email notification with an upgrade window. After the upgrade window, the old version is deactivated and is no longer supported.

Here's what you need to know about upgrading:

- Information on the availability of new versions is provided on the [Unified ID 2.0 Operator on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la) page.
- To upgrade your UID2 Operators, create a new CloudFormation stack. For details, see [Deployment](#deployment).

>TIP: For a smooth transition, create the new stack first. After the new stack is bootstrapped and ready to serve, delete the old stack. If you are using a load balancer, first get the new instances up and running and then convert the DNS name from the previous one to the new one.

## Technical Support

If you have trouble subscribing or deploying the product, contact us at [aws-mktpl-uid@thetradedesk.com](mailto:aws-mktpl-uid@thetradedesk.com).
