---
title: UID2 Private Operator for GCP Integration Guide
sidebar_label: GCP Confidential Space
pagination_label: UID2 Private Operator for GCP Integration Guide
description: Integration information for Private Operator in GCP.
hide_table_of_contents: false
sidebar_position: 18
---

import Link from '@docusaurus/Link';
import ReleaseMatrix from '../snippets/_private-operator-release-matrix.mdx';

# UID2 Private Operator for GCP Integration Guide

The UID2 Operator is the API server in the UID2 ecosystem. For details, see [The UID2 Operator](../ref-info/ref-operators-public-private.md).

This guide provides information for setting up the UID2 Operator Service as a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> instance in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. Confidential Space offers a secure enclave environment, known as a Trusted Execution Environment (TEE).

:::note
 UID2 Private Operator for GCP is not supported in these areas: Europe, China.
 :::

The Operator Service runs in a Confidential Space "workload"&#8212;a containerized Docker image that runs in a secure cloud-based enclave on top of the Confidential Space image.

When the Docker container for the UID2 Operator Confidential Space starts up, it completes the attestation process that allows the UID2 Core Service to verify the authenticity of the Operator Service and the enclave environment that the Operator Service is running in.

When the attestation is successful, the UID2 Core Service provides seed information such as salts and keys to bootstrap the UID2 Operator in the secure Confidential Space container.

## Setup Overview

At a high level, the setup steps are as follows:

1. Create your Confidential Space and UID2 Operator accounts and get, or create, the various values that you'll need for configuration and deployment: see [Prerequisites](#prerequisites).
1. Review information about [deployment environments](#deployment-environments).

   Best practice is to deploy in the integration environment first, and then the production environment.
1. Review information about the [deployment options](#deployment-options) available, including the benefits of each, and decide which to use.

   We recommend the Terraform template option.
1. Follow the applicable instructions for the deployment option you chose, out of the following:
   - [Terraform Template](#deployterraform-template)
   - [gcloud CLI](#deploygcloud-cli)
1. Enable egress rule if required.
   - See [Confidential Space Account Setup](#confidential-space-account-setup), Step 4.

When all steps are complete, your implementation should be up and running.

## Prerequisites

Before setting up your UID2 Operator Service in the Google Cloud Platform using Confidential Space, complete these prerequisite steps:

- [Confidential Space Account Setup](#confidential-space-account-setup)
- [UID2 Operator Account Setup](#uid2-operator-account-setup)

### Confidential Space Account Setup

You can run the UID2 Operator Service on any GCP account and project. However, to support attestation, you'll need to create a service account that you can use to run Confidential Space virtual machines (VMs).

Before choosing your deployment option, complete these Google Cloud setup steps:

1. Create the GCP project that you want the UID2 Operator to run in. We recommend creating a new project for the UID2 Operator Service, but you could also use an existing one. Follow these guidelines:

   - Choose a project name; for example, `UID2-Operator-Production`. You'll use this as the `{PROJECT_ID}` value in later steps.
   - Make sure that you define a GCP project with billing enabled.

1. Choose a name for the GCP service account that you'll use to run Confidential Space VMs; for example, `uid2-operator`. You'll use this as the `{SERVICE_ACCOUNT_NAME}` value in later steps.

1. Install the gcloud CLI, required by both deployment options. Follow the instructions provided by Google: [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install).

1. Enable egress rule. If your VPC infrastructure only allows egress to known endpoints, you will need to enable an egress rule to allow the operator to retrieve the certificates required for attestation. To enable this, follow the details in this document from Google: [VPC Service Controls](https://cloud.google.com/vpc-service-controls/docs/supported-products#table_confidential_space).

### UID2 Operator Account Setup
Ask your UID2 contact to register your organization as a UID2 Operator. If you're not sure who to ask, see [Contact Info](../getting-started/gs-account-setup.md#contact-info).

:::tip
It's a good idea to set  up an internal email distribution list of individuals who should be kept informed about new versions and any other technical notifications or requests, and provide that as the email contact.
:::

When the registration process is complete, you'll receive the following:

| Item | Description |
| :--- | :--- |
| `{OPERATOR_KEY}` | An operator key, exclusive to you, that identifies you with the UID2 service as a Private Operator. Use this as the `OPERATOR_KEY` value during configuration. This value is both your unique identifier and a password; store it securely and do not share it. The operator key is not specific to a version of the operator.<br/>NOTE: You'll receive a separate operator key for each deployment environment. |
| Instructions | Additional information details, such as instructions for setting up VMs or a link to the applicable information. |

When UID2 account registration is complete, and you've installed the gcloud CLI, your next steps are:
-  Review information about [deployment environments](#deployment-environments).
-  Review information about the [deployment options](#deployment-options) available, including the benefits of each, and decide which to use.

### Operator Versions

The latest ZIP file is linked in the GCP Download column in the following table.

<ReleaseMatrix />

## Deployment Environments

The following environments are available, and both [deployment options](#deployment-options) support both environments.

As a best practice, we recommend that you test and verify your implementation in the integration environment before deploying in the production environment.

:::note
You'll receive separate `{OPERATOR_KEY}` values for each environment. Be sure to use the correct one. The `{OPERATOR_IMAGE}` value is the same for both environments.
:::

| Environment | Details |
| :--- | :--- |
| Integration (`integ`) | For testing only. Debug mode is available in the integration environment. |
| Production (`prod`) | For managing production traffic. For this environment, we recommend deploying via the Terraform template, with load balancing, and with HTTPS enabled. See [Deployment Options](#deployment-options). |

## Deployment Options

There are two deployment options:

| Option | Details |
| :--- | :--- |
| [Terraform template](#deployterraform-template) | This option:<ul><li>Does not require manually setting up a service account. The setup is very simple.</li><li>Brings up a whole stack with a load balancer and a scaling group.</li><li>Is easier to maintain and operate than the `gcloud` option.</li><li>Is very simple to upgrade.</li><li>Is the recommended deployment solution.</li></ul> |
| [gcloud CLI](#deploygcloud-cli) | This option:<ul><li>Brings up one VM instance with a public IP address.</li><li>Can be easier for quick experimentation/evaluation.</li><li>For multiple instances, requires bringing up each instance manually, by running the command multiple times.</li><li>Requires setting up the load balancer manually.</li><li>Is more complex to upgrade, since more manual steps are needed.</li></ul> |

Both deployment options support both deployment environments.

To determine your next steps, choose the deployment option you want to use. Then, follow the applicable instructions:
- [Deploy&#8212;Terraform Template](#deployterraform-template)
- [Deploy&#8212;gcloud CLI](#deploygcloud-cli)

### Deploy&#8212;Terraform Template

For ease of deployment and upgrade, you can use a Terraform template to deploy a UID2 Private Operator implementation with load balancing and auto-scaling features. In this scenario, all VM instances run on Confidential Space VMs, and are deployed in multiple availability zones (AZs).

The Terraform template does the following:
- Activates the required Google Cloud Platform APIs.
- Sets up a service account to run Confidential Space VMs.
- Creates a secret to hold the `operator_key` value.
- Creates the following components:
  - Network: VPC and subnetwork.
  - Instances: Instance template, instance groups (with auto-scaling enabled).
  - Ingress: Load balancer (with health check), forwarding rules, and firewall rules.
  - Egress: [Cloud Network Address Translation (NAT)](https://cloud.google.com/nat/docs/overview).
- If HTTPS is enabled, provides your HTTPS certificate to Terraform.

:::note
The Terraform template uses the gcloud CLI that you installed in [Confidential Space Account Setup](#confidential-space-account-setup) Step 3.
:::

To deploy a new UID2 Operator in the GCP Confidential Space Enclave, using the Terraform template, follow these steps:

1. [Install Terraform](#install-terraform)
1. [Set Up the Terraform Environment](#set-up-the-terraform-environment)
1. [Download the Template Files](#download-the-template-files)
1. [Provide Input Values](#provide-input-values)
1. [Run Terraform](#run-terraform)
1. [Test Terraform Using the Health Check Endpoint](#test-terraform-using-the-health-check-endpoint)

For additional information, see:
- [Delete All Created Resources](#delete-all-created-resources)
- [Outputs](#outputs)

#### Install Terraform

Install Terraform if it is not already installed: visit [terraform.io](https://www.terraform.io/).

#### Set Up the Terraform Environment

1. Create a new project or select an existing one, replacing the `{PROJECT_ID}` placeholder with your own project ID (see [Confidential Space Account Setup](#confidential-space-account-setup)):

   ```
   gcloud config set project {PROJECT_ID}
   ```

2. Configure the environment for Terraform:

   ```
   gcloud auth application-default login
   ```

#### Download the Template Files

Download the ZIP file listed in [Operator Versions](#operator-versions) in the GCP Download column. Be sure to select the latest version. Unzip the files to a convenient location. You will have the files listed in the following table.

| File | Details |
| :--- | :--- |
| `main.tf` | The Terraform template file. |
| `variables.tf` | Contains the definitions for the template input variables, including name, type, and default value. |
| `outputs.tf` | Includes output definitions. |
| `terraform.tfvars` | Contains the values for the template input variables. |

#### Provide Input Values

Provide values for the input parameters, as needed, in the `terraform.tfvars` file that you downloaded. Some are required, others are optional.

1. Provide values for the required input parameters shown in the following table:

   | Name | Type | Default | Required | Description |
   | :--- | :--- | :--- | :--- | :--- |
   | `project_id` | `string` | `uid2-test` | yes | The ID of the GCP project that you want the UID2 Operator to run in; for example, `UID2-Operator-Production`. |
   | `service_account_name` | `string` | `tf-test` | yes | The name of the service account that you want to use for your UID2 Operator instance in GCP Confidential Space. |
   | `uid_operator_image` | `string` | `us-docker.pkg.dev/uid2-prod-project/iabtechlab/uid2-operator:{version_number}` | yes | The Docker image URL for the UID2 Private Operator for GCP, used in configuration. The version number changes depending on the version being deployed. |
   | `uid_operator_key` | `string` | n/a | yes | The UID2 operator key, which you received as part of [UID2 Operator Account Setup](#uid2-operator-account-setup). |
   | `uid_operator_key_secret_name` | `string` | `secret-operator-key` | yes | The name of the key to create in Secret Manager. |
   | `uid_deployment_env` | `string` | `integ` | yes | Valid values: `integ` for integration environment, `prod` for production environment.<br/>Machine type is determined by the deployment environment: `integ` uses `n2d-standard-2` and `prod` uses `n2d-standard-16`. |
   | `debug_mode` | `bool` | `true` | yes | Set to `true` to enable more diagnostic information. For the production environment, this must be set to `false` or the operator will not start. |

1. (Optional, strongly recommended) Set the load balancer to HTTPS. Provide values for the parameters shown in the following table:

   | Name | Type | Default | Required | Description |
   | :--- | :--- | :--- | :--- | :--- |
   | `ssl` | `bool`  | `false`| no | To set the load balancer to use HTTPS, which is recommended, set this flag to `true`.<br/>If you're using HTTPS you must also specify values for the `certificate` and `private_key` parameters. |
   | `certificate` | `string`  | n/a | no | The contents of the HTTPS certificate. The certificate should be in PEM format.<br/>For example: `file('path/to/certificate.pem')`.<br/>Required if `ssl` is set to `true`.<br/>For details, see [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate#certificate) in the Terraform documentation. |
   | `private_key` | `string`  | n/a | no | The contents of the private key for the HTTPS certificate. The private key should be in PEM format.<br/>For example: `file('path/to/private_key.pem')`. <br/>Required if `ssl` is set to `true`.<br/>For details, see [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate#private_key) in the Terraform documentation. |
   
1. (Optional) Provide parameter names and values for the additional input parameters shown in the following table. These parameters are always optional, but you might want to modify from the default values to better suit your requirements.

   | Name | Type | Default | Required | Description |
   | :--- | :--- | :--- | :--- | :--- |
   | `region` | `string` | `us-east1` | no | The region that you want to deploy to. For a list of valid regions, see [Available regions and zones](https://cloud.google.com/compute/docs/regions-zones#available) in the Google Cloud documentation.<br/>NOTE: The UID2 Private Operator implementation for GCP Confidential Space is not supported in these areas: Europe, China. |
   | `network_name` | `string` | `uid-operator` | no | The VPC resource name (also used for rules/ instance tags). |
   | `min_replicas` | `number` | `1` | no | Indicates the minimum number of replicas you want to deploy. |
   | `max_replicas` | `number` | `5` | no | Indicates the maximum number of replicas you want to deploy. |
   | `uid_operator_key_secret_name` | `string` | `"secret-operator-key"` | no | The name that you specify for your operator key secret. The Terraform template creates a secret in the GCP Secret Manager to hold the `uid_operator_key` value. You can define the name; for example, `uid2-operator-operator-key-secret-integ`. |
   | `debug_mode` | `bool`  | `false` | no | Do not set to `true` unless you are working with the UID2 team to debug an issue. In any other circumstances, if you set this flag to `true`, attestation will fail. |

#### Run Terraform

Run the following:

```
terraform init
terraform apply
```
When you run `terraform apply`, the following file is generated in the same folder: `terraform.tfstate`. This file stores state information about your managed infrastructure and configuration, and will be used for future maintenance.

:::note
Be sure to follow the recommended practices for Terraform `state` files: they are required for maintaining the deployed infrastructure, and they might contain sensitive information. For details, see [state](https://developer.hashicorp.com/terraform/language/state) in the Terraform documentation.
:::

#### Test Terraform Using the Health Check Endpoint

Call the health check endpoint to test the health of your implementation. The expected result is HTTP 200 with a response body of `OK`.

For instructions, see [Health Check&#8212;Terraform Template](#health-checkterraform-template).

#### Delete All Created Resources

In a scenario where you want to clean up, you can remove the resources created by the template. For example, you might want to test `integ` and remove the whole stack later.

To remove all resources created by Terraform, run the following:

```
terraform destroy
``` 

#### Outputs

The following table summarizes the output value from the Terraform template.

| Name | Description |
| :--- | :--- |
| `load_balancer_ip` | The public IP address of the load balancer.<br/>You can use this value to [perform the health check](#health-checkterraform-template) or to configure the DNS. |

### Deploy&#8212;gcloud CLI

To deploy a new UID2 Operator in the GCP Confidential Space Enclave using the gcloud CLI, follow these steps.

:::note
For deployment to the production environment we do not recommend this option. We recommend deploying via the Terraform template, with load balancing, and with HTTPS enabled.
:::

   1. [Set Up Service Account Rules and Permissions](#set-up-service-account-rules-and-permissions)
   1. [Create Secret for the Operator Key in Secret Manager](#create-secret-for-the-operator-key-in-secret-manager)
   1. [Update the Script with Valid Values](#update-the-script-with-valid-values)
   1. [Run the Script](#run-the-script)
   1. [Test gcloud Using the Health Check Endpoint](#test-gcloud-using-the-health-check-endpoint)

#### Set Up Service Account Rules and Permissions

To set up and configure the account that you created when you installed the gcloud CLI, complete the following steps. Replace the placeholder values with your own valid values.

1. Switch to the project that you created in [Confidential Space Account Setup](#confidential-space-account-setup):
    ```
    $ gcloud config set project {PROJECT_ID}
    ```
 
1. Enable the following APIs:

   | Name | Description |
   | :--- | :--- |
   | compute.googleapis.com | Compute Engine API | 
   | confidentialcomputing.googleapis.com | Confidential Computing API | 
   | logging.googleapis.com | Cloud Logging API | 
   | secretmanager.googleapis.com | Service Management API | 

    Run this command to enable the APIs:

    ```
    $ gcloud services enable compute.googleapis.com \
      confidentialcomputing.googleapis.com \
      logging.googleapis.com \
      secretmanager.googleapis.com
    ```

1. Create a service account to run the UID2 Operator Service:
    ```
    $ gcloud iam service-accounts create {SERVICE_ACCOUNT_NAME}
    ```

1. Grant the required permissions to the service account.

   Permissions are shown in the following table.

   | Permission | Description |
   | :--- | :--- |
   | `confidentialcomputing.workloadUser` | Provides the permission to generate an attestation token and run a workload in a VM. |
   | `logging.logWriter` | Provides the permission to write log entries in gcloud logging. |
   | `secretmanager.secretAccessor` | Provides the permission to access the operator key that is managed in the GCP Secret Manager. |

   Grant the `confidentialcomputing.workloadUser` permission:

    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/confidentialcomputing.workloadUser
    ```
   Grant the `logging.logWriter` permission:

    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/logging.logWriter
    ```
 
   Grant the `secretmanager.secretAccessor` permission:

    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/secretmanager.secretAccessor
    ```

1. Add a VPC rule to allow public access on port 8080, the default exposed port for the UID2 operator:
    ```
    $ gcloud compute firewall-rules create operator-tcp \
      --direction=INGRESS --priority=1000 --network=default --action=ALLOW \
      --rules=tcp:8080 \
      --source-ranges=10.0.0.0/8 \
      --target-service-accounts={SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com
    ```
:::warning
`source-ranges` specifies the range of IP addresses from which your clients will call the Private Operator. It is in CIDR notation, and you can use comma-separated values to provide multiple ranges. Example: `--source-ranges="10.0.0.0/8,10.10.0.0/16"`. Make sure the ranges are accurate and include only IP addresses that belong to you.
:::

#### Create Secret for the Operator Key in Secret Manager

As part of setting up your UID2 account (see [UID2 Operator Account Setup](#uid2-operator-account-setup)), you'll receive an operator key for each environment.

The next step is to store the `{OPERATOR_KEY}` value in GCP Secret Manager and get a full secret name for it, which you later use to replace the `{OPERATOR_KEY_SECRET_FULL_NAME}` placeholder in the deployment script (see [Update the Script with Valid Values](#update-the-script-with-valid-values)).

Follow these steps:
 1. Run the following script, which creates a new secret, first customizing with your own values:

    ```
    OPERATOR_KEY="{OPERATOR_KEY}"
    echo -n $OPERATOR_KEY | gcloud secrets create {OPERATOR_KEY_SECRET_NAME} \
         --replication-policy="automatic" \
       --data-file=-
    ```
 
    1. Prepare the script, using your own values: 

       - For `{OPERATOR_KEY}`, use your own operator key value for the environment.
       - For `{OPERATOR_KEY_SECRET_NAME}`, specify the name you want to use for your API secret, for this environment. For example: `uid2-operator-operator-key-secret-integ`.

    2. Run the script.

       The script creates the secret in GCP Secret Manager. The secret (display) name is `{OPERATOR_KEY_SECRET_NAME}` and the secret value is `{OPERATOR_KEY}`.

1. Run the following command to get the full secret name, including the path, first customizing with your own values:   

   ```
   $ gcloud secrets versions describe latest --secret {OPERATOR_KEY_SECRET_NAME} --format 'value(name)'
   ```

In this example, the full secret name might be: `projects/111111111111/secrets/uid2-operator-operator-key-secret-integ/versions/1`. This is the value that you would use to replace the `{OPERATOR_KEY_SECRET_FULL_NAME}` placeholder in the next section.

#### Update the Script with Valid Values

Update the example script, using your own valid values instead of the placeholder values.

This section includes:

- [Placeholder Values and Definitions](#placeholder-values-and-definitions)
- [Sample Deployment Script&#8212;Integ](#sample-deployment-scriptinteg)
- [Sample Deployment Script&#8212;Prod](#sample-deployment-scriptprod)

##### Placeholder Values and Definitions

Placeholder values are defined in the following table.

| Placeholder | Actual Value |
| :--- | :--- |
| `{INSTANCE_NAME}` | Your own valid VM name. |
| `{ZONE}` | The Google Cloud zone that the VM instance will be deployed on. |
| `{IMAGE_FAMILY}` | Use `confidential-space` for Integration and Production, `confidential-space-debug` for debugging purposes in Integration only. Note that `confidential-space-debug` will not work in Production. |
| `{SERVICE_ACCOUNT}` | The service account email that you created as part of creating your account, in this format: `{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com`.<br/>For details, see [Set Up Service Account Rules and Permissions](#set-up-service-account-rules-and-permissions) (Step 4). |
| `{OPERATOR_IMAGE}` | The Docker image URL for the UID2 Private Operator for GCP, used in configuration.<br/>This can be found in the `terraform.tfvars` file in the GCP download file (see [Operator Versions](#operator-versions)). |
| `{OPERATOR_KEY_SECRET_FULL_NAME}` | The full name that you specified for the Operator Key secret (see [Create Secret for the Operator Key in Secret Manager](#create-secret-for-the-operator-key-in-secret-manager)), including the path, in the format `projects/<project_id>/secrets/<secret_id>/versions/<version>`. For example: `projects/111111111111/secrets/uid2-operator-operator-key-secret-integ/versions/1`. |

##### Sample Deployment Script&#8212;Integ

The following example of the deployment script for the integration environment uses some placeholder values.

```
$ gcloud compute instances create {INSTANCE_NAME} \
  --zone {ZONE} \
  --machine-type n2d-standard-2 \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family {IMAGE_FAMILY} \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference={OPERATOR_IMAGE}~tee-container-log-redirect=true~tee-restart-policy=Never~tee-env-DEPLOYMENT_ENVIRONMENT=integ~tee-env-API_TOKEN_SECRET_NAME={OPERATOR_KEY_SECRET_FULL_NAME}~tee-env-CORE_BASE_URL=https://core-integ.uidapi.com~tee-env-OPTOUT_BASE_URL=https://optout-integ.uidapi.com
```

##### Sample Deployment Script&#8212;Prod

The following example of the deployment script for the production environment uses some placeholder values.

:::note
A `machine-type` value of `n2d-standard-16` is required for the production environment.
:::

```
$ gcloud compute instances create {INSTANCE_NAME} \
  --zone {ZONE} \
  --machine-type n2d-standard-16 \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family confidential-space \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference={OPERATOR_IMAGE}~tee-container-log-redirect=true~tee-restart-policy=Never~tee-env-DEPLOYMENT_ENVIRONMENT=prod~tee-env-API_TOKEN_SECRET_NAME={OPERATOR_KEY_SECRET_FULL_NAME}~tee-env-CORE_BASE_URL=https://core-prod.uidapi.com~tee-env-OPTOUT_BASE_URL=https://optout-prod.uidapi.com
```

#### Run the Script

When the script is ready, with the additional valid values, run it.

#### Test gcloud Using the Health Check Endpoint

Call the health check endpoint to test the health of your implementation. The expected result is HTTP 200 with a response body of `OK`.

For instructions, see [Health Check&#8212;gcloud CLI](#health-checkgcloud-cli).

## Running the Health Check

Call the health check endpoint to test the health of your implementation.

Running the health check is the same for the integration and production environments, except for the endpoints.

Follow the applicable instructions depending on the deployment option you chose:

- [Health Check&#8212;Terraform Template](#health-checkterraform-template)
- [Health Check&#8212;gcloud CLI](#health-checkgcloud-cli)

### Health Check&#8212;Terraform Template

The following example shows the health check for the Terraform template option:

1. Get the public IP address for the load balancer:

   ```
   terraform output load_balancer_ip
   ```

2. To test operator status, in your browser, go to the health check endpoint: `http://{IP}/ops/healthcheck`.

   An HTTP 200 with a response body of `OK` indicates healthy status.


### Health Check&#8212;gcloud CLI
The following example shows the health check for the `gcloud` command line option:

1. Get the public IP address of the deployed instance:

   ```
   $ gcloud compute instances describe {INSTANCE_NAME} \
     --zone={ZONE} \
     --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
   ```
2. To test operator status, in your browser, go to `http://{IP}:8080/ops/healthcheck`.

   An HTTP 200 with a response body of `OK` indicates healthy status.

import AttestFailure from '../snippets/_private-operator-attest-failure.mdx';

<AttestFailure />

## Upgrading

When a new version of UID2 Google Cloud Platform Confidential Space is released, private operators receive an email notification of the update, with a new image version. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported.

If you're upgrading to a new version, the upgrade process depends on the deployment option you chose. Follow the applicable steps:

- [Upgrading&#8212;Terraform Template](#upgradingterraform-template)
- [Upgrading&#8212;gcloud CLI](#upgradinggcloud-cli)

### Upgrading&#8212;Terraform Template

If you previously deployed the Private Operator for GCP using the Terraform template, compare the latest version of the template with the one you used when you deployed. If there are changes, make sure to redeploy to include all the updates.

### Upgrading&#8212;gcloud CLI

If you deployed using the gcloud CLI, you must manually bring up new instances that use the new `{OPERATOR_IMAGE}` and then shut down old instances.

If you previously set up a load balancer manually, you'll also need to update the mapping for the load balancer.

## Scraping Metrics
The Private Operator for GCP exposes [Prometheus-formatted metrics](https://prometheus.io/docs/concepts/data_model/) on port 9080 through the /metrics endpoint. You can use a Prometheus-compatible scraper to collect and aggregate these metrics for your own needs.
