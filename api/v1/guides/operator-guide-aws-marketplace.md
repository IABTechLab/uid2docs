rough list to cover (may need multiple pages):
- ~~why private operator (Elizabeth)~~
- why enclaves are used
- ~~prereqs~~
- ~~what is deployed~~
- how to deploy (config options)
- post-deployment steps (few options)
- how to verify/test
- how and when to upgrade
- logging and monitoring
- ~~faq~~





# Private Operator Integration on AWS



## Overview

UID2 Operator is the API server in UID2 ecosystem. The UID2 Operator solution is enhanced with AWS Nitro Enclave technology to protect Personally Identifiable Information (PII) from unauthorized access.

[UID2 Operator on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la) is a free product. The cost shows up on the product page is an estimation of infrastructure cost.

## Prerequisites

There are some prerequisites before you subscribe and deploy UID2 Operators on AWS:

- Register your organization as an Operator (**citation here**)
- Prepare an AWS account with [an IAM role](#minimal-iam-role) that has the minimal privileges

## The Product

By subscribing the product listed on AWS marketplace, you gain access to:

- Amazon Machine Image (AMI) with UID2 Operator service installed and ready to bootstrap
- CloudFormation template to deploy UID2 Operator AMIs

### AMI

The AMI contains a AmazonLinux2 OS with UID2 Operator service set up. When an EC2 instance based on the AMI boots up, it automatically fetches configuration from your AWS account and starts the UID2 Operator server inside an enclave.

### CloudFormation Template

The CloudFormation template will get you through the configuration and UID2 Operator deployment.

#### Resources created

- CloudFormation Stack: A logical representation of all the resources created. This helps you deploy and rollback resources as a group.
- KMS Key: The KMS key for secret encryption (for configuration string).
- Configuration as Secret: A secret named `uid2-operator-config-key` created in SecretsManager.
- Worker Role: The IAM role your UID2 Operators will run as.
- Worker Instance Profile: The Instance Profile your UID2 Operators will run as (refers to Worker Role)
- Virtual Private Cloud (VPC) and subnets: The virtual network UID2 Operators will run in. You can customize and use existing ones as well.
- Security Group: A security group providing minimal access for UID2 Operator to serve. It automatically refer to the VPC created/used above.
- Launch Template: A launch template with all the configurations in place. You can spawn new UID2 Operator instances from it.
- Auto Scaling Group: An ASG with the launch template attached. You can tune the desired number of instances with it later.
- UID2 Operator instances: the EC2 instances will start after the ASG is created.

#### Customization

- Virtual Private Cloud (VPC): you can choose from
  - Setting up a new VPC and subnets, or 
  - Using existing VPC and subnets
- Root Volume Size
- SSH Key: the SSH key you use to access the UID2 Operator EC2 instances
- Instance Type: m5.2xlarge, m5.4xlarge and so on

## Deployment Instructions

1. Subscribe to [Unified ID 2.0 Operator on AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-wdbccsarov5la). It might take several minutes before AWS completes your subscription.
2. Click Configuration and go to configuration page.
3. Click "Launch" to launch this software. When choosing action, select "Launch CloudFormation". This will open "Create stack" page under CloudFormation.
4. Step 1 - Specify template. There is nothing to customize in step 1. Click "Next".
5. Step 2 - Stack details. Make sure you fill in all required fields before clicking "Next"
   - Stack name: any name of your choice
   - OPERATOR_KEY: this is the Operator Key you received from UID2 admin team
   - Instance Type: m5.2xlarge is recommended
   - Instance root volume size: 15GB or more is recommended
   - Key Name for SSH: your EC2 key pair for SSH access to the EC2 instances deployed.
   - Trusted Network CIDR: this decides which IP address range have access to your operator service.
   - Choose to use Existing VPC: true = create new VPC and subnets; false = use user provided VPC and subnets;
     - If you decided to use existing VPC, you can find your own VPCs from [VPC dashboard](https://console.aws.amazon.com/vpc/home)
6. Step 3 - Configure stack options:
   - Tags: optionally tag your stack
   - Permissions: if you have separate IAM roles subscribing to AWS marketplace and deploying the stack, put the name/ARN of the role you are going to use to deploy the stack
   - Stack failure options: what happens when deployment fails. "roll back all stack resources" is recommended
   - Advanced options are optional.
7. Step 4 - Review. 
   - At the end of the page CloudFormation may ask your permission to create IAM roles. Check the box before "I acknowledge that AWS CloudFormation might create IAM resources"
   - If everything looks right, click "Create stack"
8. Wait for the stack creation to complete.

## Check UID2 Operator Status

It takes several minutes for the stack creation to complete. When you see an Auto Scaling Group (ASG) is created, you can go into the ASG and check the EC2 instances.



## Upgrade



## Technical Support

If you have trouble subscribing or deploying the product, please reach out to [aws-mktpl-uid@thetradedesk.com](mailto:aws-mktpl-uid@thetradedesk.com)

## References

### Minimal IAM Role

**Important**: To succeed in one-click deployment, your AWS account needs to have privilege to run the following actions.

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

