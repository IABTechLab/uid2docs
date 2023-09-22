---
title: UID2 Operator - Google Cloud Platform Confidential Space
sidebar_label: GCP Confidential Space
pagination_label: UID2 Operator - Google Cloud Platform Confidential Space
description: Integration information for Google Cloud Platform private operator.
hide_table_of_contents: false
sidebar_position: 20
---

# UID2 Private Operator&#8212;Google Cloud Platform Confidential Space

This guide provides information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. Confidential Space offers a secure enclave environment, known as a Trusted Execution Environment (TEE).

>NOTE: The UID2 Private Operator implementation for GCP Confidential Space is not supported in these areas: Europe, China.

The Operator Service runs in a Confidential Space "workload"&#8212;a containerized Docker image that runs in a secure cloud-based enclave on top of the Confidential Space image.

When the Docker container for the UID2 Operator Confidential Space starts up, it manages the attestation process. When the attestation is successful, the UID2 Core Service provides seed information such as salts and keys to bootstrap the UID2 Operator in the secure Confidential Space container.

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

When all steps are complete, your implementation should be up and running.

## Prerequisites

Before setting up your UID2 Operator Service in the Google Cloud Platform using Confidential Space, complete these prerequisite steps:

- [Confidential Space Account Setup](#confidential-space-account-setup)
- [UID2 Operator Account Setup](#uid2-operator-account-setup)

### Confidential Space Account Setup

You can run the UID2 Operator Service on any GCP account and project. However, to support attestation, you'll need to create a service account that you can use to run Confidential Space virtual machines (VMs).

Before choosing your deployment option, complete these Google Cloud setup steps:

1. Create the GCP project that you want the UID2 Operator to run in. We recommend creating a new project for the UID2 Operator Service, but you could also use an existing one. Follow these guidelines:

   - Choose a project name; for example, `UID2_Operator_Production`. You'll use this as the `{PROJECT_ID}` value in later steps.
   - Make sure that you define a GCP project with billing enabled.

1. Choose a name for the GCP service account that you'll use to run Confidential Space VMs; for example, `GCP_UID2`. You'll use this as the `{SERVICE_ACCOUNT_NAME}` value in later steps.

1. Install the gcloud CLI, required by both deployment options. Follow the instructions provided by Google: [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install).

### UID2 Operator Account Setup
Ask your UID2 contact to register your organization as a UID2 Operator. If you're not sure who to ask, see [Contact Info](../getting-started/gs-account-setup.md#contact-info).

>TIP: It's a good idea to set  up an internal email distribution list of individuals who should be kept informed about new versions and any other technical notifications or requests, and provide that as the email contact.

When the registration process is complete, you'll receive the following:

| Item | Description |
| :--- | :--- |
| `{OPERATOR_IMAGE}` | The Docker image URL for the UID2 Private Operator for GCP, used in configuration. For example: `us-docker.pkg.dev/uid2-prod-project/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}`.<br/>NOTE: Use the same image for both deployment environments. (**GWH_YS61 TM commented "I think the example should include the full Image_SHA so that the reader knows what it looks like (i.e. is it the full sha or the short one)" -- could you help me with that example please?**) |
| `{API_TOKEN}` | An API token, exclusive to you, that identifies you with the UID2 service as a private operator. This value is used in configuration. The API token is your unique identifier, like a password; store it securely and do not share it.<br/>NOTE: You'll receive a separate API token for each deployment environment. |
| Instructions | Additional information details, such as instructions for setting up VMs or a link to the applicable information. |

When UID2 account registration is complete, and you've installed the gcloud CLI, your next steps are:
-  Review information about [deployment environments](#deployment-environments).
-  Review information about the [deployment options](#deployment-options) available, including the benefits of each, and decide which to use.

## Deployment Environments

The following environments are available, and both [deployment options](#deployment-options) support both environments.

As a best practice, we recommend that you test and verify your implementation in the integration environment before deploying in the production environment.

>NOTE: You'll receive separate `{API_TOKEN}` values for each environment. Be sure to use the correct one. The `{OPERATOR_IMAGE}` value is the same for both environments.

| Environment | Details |
| :--- | :--- |
| Integration (`integ`) | For testing only. Debug mode is available in the integration environment. |
| Production (`prod`) | For managing production traffic. For this environment, we recommend deploying via the Terraform template, with load balancing, and with HTTPS enabled. See [Deployment Options](#deployment-options). |

## Deployment Options

There are two deployment options:

| Option | Details |
| :--- | :--- |
| [Terraform template](#deployterraform-template) | This option:<ul><li>Does not require manually setting up a service account. The setup is very simple.</li><li>Brings up a whole stack with a load balancer and a scaling group.</li><li>Is easier to maintain and operate than the `gcloud` option.</li><li>Is very simple to upgrade.</li><li>Is the recommended deployment solution.</li></ul> |
| [gcloud CLI](#deploygcloud-cli) | This option:<ul><li>Brings up one VM instance with a public IP address.</li><li>For multiple instances, requires bringing up each instance manually, by running the command multiple times.</li><li>Requires setting up the load balancer manually.</li><li>Is more complex to upgrade, since more manual steps are needed.</li></ul> |

Both deployment options support both deployment environments.

To determine your deployment steps, do the following:
1. First, choose the deployment option you want to use.
2. Then, follow the applicable instructions:
   - [Deploy&#8212;Terraform Template](#deployterraform-template)
   - [Deploy&#8212;gcloud CLI](#deploygcloud-cli)

### Deploy&#8212;Terraform Template

For ease of deployment and upgrade, you can use a Terraform template to deploy a UID2 Private Operator implementation with load balancing and auto-scaling features. In this scenario, all VM instances run on Confidential Space VMs, and are deployed in multiple availability zones (AZs).

The Terraform template does the following:
- Activates the required Google Cloud Platform APIs.
- Sets up a service account to run Confidential Space VMs.
- Creates a secret to hold the `api_token` value.
- Creates the following components:
  - Network: VPC and subnetwork.
  - Instances: Instance template, instance groups (with auto-scaling enabled).
  - Ingress: Load balancer (with health check), forwarding rules, and firewall rules.
  - Egress: [Cloud Network Address Translation (NAT)](https://cloud.google.com/nat/docs/overview).

>NOTE: The Terraform template uses the gcloud CLI. These deployment instructions assume that you completed this earlier step: [Install the gloud CLI](#install-gcloud-cli).

To deploy a new UID2 Operator in the GCP Confidential Space Enclave, using the Terraform template, follow these steps:

1. [Install Terraform](#install-terraform)
1. [Set Up the Environment](#set-up-the-environment)
1. [Download the Template Files](#download-the-template-files)
1. [Provide Input Values](#provide-input-values)
1. [Run Terraform](#run-terraform)
1. [Test Terraform Using the Health Check Endpoint](#test-terraform-using-the-health-check-endpoint)
1. [Clean Up](#clean-up)

For additional information, see:
- [Input Parameters and Values](#input-parameters-and-values)
- [Outputs](#outputs)
- [Terraform Template&#8212;Changing the Load Balancer to HTTPS](#terraform-templatechanging-the-load-balancer-to-https)

#### Install Terraform

Install Terraform if it is not already installed: visit [terraform.io](https://www.terraform.io/).

#### Set Up the Environment

1. Create the project, replacing the `{PROJECT_ID}` placeholder with your own project ID (see [Confidential Space Account Setup](#confidential-space-account-setup)):

   ```
   gcloud config set project {PROJECT_ID}
   ```

2. Configure the environment for Terraform:

   ```
   gcloud auth application-default login
   ```

#### Download the Template Files

From the UID2 Operator GitHub repository, download the template files listed in the following table.

| File | Details |
| :--- | :--- |
| [main.tf](https://github.com/IABTechLab/uid2-operator/blob/master/scripts/gcp-oidc/terraform/main.tf) | The Terraform template file. |
| [variables.tf](https://github.com/IABTechLab/uid2-operator/blob/master/scripts/gcp-oidc/terraform/variables.tf) | Contains the definitions for the template input variables, including name, type, and default value. |
| [outputs.tf](https://github.com/IABTechLab/uid2-operator/blob/master/scripts/gcp-oidc/terraform/outputs.tf) | Includes output definitions. |
| [terraform.tfvars](https://github.com/IABTechLab/uid2-operator/blob/master/scripts/gcp-oidc/terraform/terraform.tfvars) | Contains the values for the template input variables. |

For more information, refer to the [readme file for the Terraform template](https://github.com/IABTechLab/uid2-operator/tree/master/scripts/gcp-oidc/terraform).

#### Provide Input Values

Provide values for the input parameters, as needed, in the `terraform.tfvars` file that you downloaded. Some are required, others are optional.

For details about the parameters and valid values, see [Input Parameters and Values](#input-parameters-and-values).

1. Provide values for the following required input parameters:
   - `project_id`
   - `service_account_name`
   - `uid_operator_image`
   - `uid_api_token` 

1. (Conditional: Production environment only) Provide values for the following parameters that are required for the Production environment:
   - `uid_machine_type`: For Production, the value must be `n2d-standard-16`.
   - `uid_deployment_env`: For Production, the value must be `prod`.

1. (Optional) Provide parameter names and values for these additional input parameters that are always optional. These parameters have defaults, but you might want to modify the values to better suit your requirements:
   - `region`
   - `network_name`
   - `min_replicas`
   - `max_replicas`
   - `debug_mode`
   - `uid_api_token_secret_name`

#### Run Terraform

Run the following:

```
terraform init
terraform apply
```

#### Test Terraform Using the Health Check Endpoint

Call the health check endpoint to test the health of your implementation. The expected result is HTTP 200 with a response body of `OK`.

For instructions, see [Health Check&#8212;Terraform Template](#health-checkterraform-template).

#### Clean Up

Remove all resources created by Terraform:

```
terraform destroy
```

#### Input Parameters and Values

The following table summarizes all the input parameters and values for the Terraform template.

| Name | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `project_id` | `string` | n/a | yes | The ID of the GCP project that you want the UID2 Operator to run in; for example, `UID2_Operator_Production`. |
| `service_account_name` | `string` | n/a | yes | The name of the service account that you want to use for your UID2 Operator instance in GCP Confidential Space. |
| `uid_operator_image` | `string` | n/a | yes | The Docker image URL for the UID2 Private Operator for GCP, used in configuration, which you received as part of [UID2 Operator Account Setup](#uid2-operator-account-setup). For example: `us-docker.pkg.dev/uid2-prod-project/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}`. |
| `uid_api_token` | `string` | n/a | yes | The UID2 `api_token` value. |
| `uid_api_token_secret_name` | `string` | `"secret-api-token"` | no |  The name for the `api_token` secret value. The Terraform template creates a secret in the GCP Secret Manager to hold the `uid_api_token` value. You can define the name; for example, `uid2_operator_api_token_secret_integ`. |
| `uid_machine_type` | `string` | `n2d-standard-16` | no | The machine type. `n2d-standard-16` is the only value supported in the Production environment. For the Integration environment you can change it if needed, but not for Production. |
| `uid_deployment_env` | `string` | `integ` | no | Valid values: `integ` or `prod`. The default is `integ`, so for your production deployment you'll need to include this input with a value of `prod`. |
| `region` | `string` | `us-east1` | no | The region that you want to deploy to. For a list of valid regions, see [Available regions and zones](https://cloud.google.com/compute/docs/regions-zones#available) in the Google Cloud documentation.<br/>NOTE: The UID2 Private Operator implementation for GCP Confidential Space is not supported in these areas: Europe, China. |
| `network_name` | `string` | `uid-operator` | no | The VPC resource name (also used for rules/ instance tags). |
| `min_replicas` | `number` | `1` | no | Indicates the minimum number of replicas you want to deploy. Default value: `1`. |
| `max_replicas` | `number` | `5` | no | Indicates the maximum number of replicas you want to deploy. Default value: `5`. |
| `debug_mode` | `bool`  | `false` | no | Do not set to `true` unless you are working with the UID2 team to debug an issue. In any other circumstances, if you set this flag to `true`, attestation will fail. |
| `ssl` | `bool`  | `false`| no | To set the load balancer to use HTTPS, which is recommended, set this flag to `true`.<br/>If you're using HTTPS you must also specify values for the `certificate` and `private_key` parameters. |
| `certificate` | `string`  | n/a | no | The contents of the certificate.<br/>For example: `file('path/to/certificate.crt')`.<br/>Required if `ssl` is set to `true`. |
| `private_key` | `string`  | n/a | no | The contents of the private SSL key. For example: `file('path/to/private.key')`. <br/>Required if `ssl` is set to `true`. |

#### Outputs

The following table summarizes the output value from the Terraform template.

| Name | Description |
| :--- | :--- |
| `load_balancer_ip` | The public IP address of the load balancer.<br/>You can use this value to [perform the health check](#health-checkterraform-template) or to configure the DNS. |

#### Terraform Template&#8212;Changing the Load Balancer to HTTPS

If you want to change the load balancer from HTTP to HTTPS, which is highly recommended, follow these steps:

1. Provide your certificate via Terraform, following the instructions on the Terraform [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate.html) documentation page. (**GWH_YS62 Do we need this? Thomas said: "It looks like the mechanism has changed, so I don't think we need a link to that document, but Yi should have the final say on that one" please let me know.**)

2. Add the following additional input parameters in the `terraform.tfvars` file:

   - `ssl`: set to `true`.
   - `certificate`: The contents of the certificate. 
   - `private_key`: The contents of the private SSL key.

For parameter details, see [Input Parameters and Values](#input-parameters-and-values).

### Deploy&#8212;gcloud CLI

To deploy a new UID2 Operator in the GCP Confidential Space Enclave using the gcloud CLI, follow these steps.

>NOTE: For deployment to the production environment we do not recommend this option. We recommend deploying via the Terraform template, with load balancing, and with HTTPS enabled.

   1. [Set Up Service Account Rules and Permissions](#set-up-service-account-rules-and-permissions)
   1. [Create Secret for the API Token in Secret Manager](#create-secret-for-the-api-token-in-secret-manager)
   1. [Update the Script with Valid Values](#update-the-script-with-valid-values)
   1. [Run the Script](#run-the-script)
   1. [Test gcloud Using the Health Check Endpoint](#test-gcloud-using-the-health-check-endpoint)

#### Set Up Service Account Rules and Permissions

To set up and configure the account that you created in [Install the gcloud CLI](#install-gcloud-cli), complete the following steps. Replace the placeholder values with your own valid values.

2. Switch to the project that you created in [Create GCP Service Account and Project](#create-gcp-service-account-and-project):
    ```
    $ gcloud config set project {PROJECT_ID}
    ```
 
3. Enable the following APIs:

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

4. Create a service account to run the UID2 Operator Service:
    ```
    $ gcloud iam service-accounts create {SERVICE_ACCOUNT_NAME}
    ```

5. Grant the required permissions to the service account.

   Permissions are shown in the following table:

   | Permission | Description |
   | :--- | :--- |
   | `confidentialcomputing.workloadUser` | Provides the permission to generate an attestation token and run a workload in a VM. |
   | `logging.logWriter` | Provides the permission to write log entries in gcloud logging. |
   | `secretmanager.secretAccessor` | Provides the permission to access the operator API token that is managed in the GCP Secret Manager. |

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

6. Add a VPC rule to allow public access on port 8080, the default exposed port for the UID2 operator:
    ```
    $ gcloud compute firewall-rules create operator-tcp \
      --direction=INGRESS --priority=1000 --network=default --action=ALLOW \
      --rules=tcp:8080 \
      --source-ranges=0.0.0.0/0 \
      --target-service-accounts={SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com
    ```

#### Create Secret for the API Token in Secret Manager

As part of setting up your UID2 account (see [UID2 Operator Account Setup](#uid2-operator-account-setup)), you'll receive an API token for each environment.

The next step is to store the `{API_TOKEN}` value in GCP Secret Manager and get a secret name for it, which you later use to replace the `{API_TOKEN_SECRET_NAME}` placeholder in the deployment script (see [Update the Script with Valid Values](#update-the-script-with-valid-values)).

Follow these steps:
 1. Run the following script, which creates a new secret for the integration environment, first customizing with your own values:

    ```
    API_TOKEN="{API_TOKEN}"
    echo -n $API_TOKEN | gcloud secrets create {API_TOKEN_SECRET_NAME} \
         --replication-policy="automatic" \
       --data-file=-
    ```
 
    1. Prepare the script, using your own values: 

       - For `{API_TOKEN}`, use your own API token value for the environment.
       - For  `{API_TOKEN_SECRET_NAME}`, specify the name you want to use for your API secret, for this environment. For example: `uid2_operator_api_token_secret_integ`.

    2. Run the script.

       The result of the script is the secret name that you specified; for example, `uid2_operator_api_token_secret_integ`. (**GWH_YS63 Yi commented "Remove this setence, not correct." but if I remove it, there is no info about the result of the script. Is there nothing? We said earlier that it creates a new secret for the integration environment. How do they get the secret? Clarify and fix.**)

1. Run the following command to get the full secret name, including the path, first customizing with your own values:   

   ```
   gcloud secrets versions describe latest --secret {API_TOKEN_SECRET_NAME} --format 'value(name)'
   ```

In this example, the full secret name might be: `projects/111111111111/secrets/uid2_operator_api_token_secret_integ/versions/1`. This is the value that you would use to replace the `{API_TOKEN_SECRET_FULL_NAME}` placeholder in the next section.

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
| `{SERVICE_ACCOUNT}` | The service account email that you created as part of creating your account, in this format: `{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com`.<br/>For details, see [Set Up Service Account Rules and Permissions](#set-up-service-account-rules-and-permissions) (Step 4). |
| `{OPERATOR_IMAGE}` | The Docker image URL for the UID2 Private Operator for GCP, used in configuration.<br/>For details, see [UID2 Operator Account Setup](#uid2-operator-account-setup). |
| `{API_TOKEN_SECRET_FULL_NAME}` | The full name of the secret value that you created for the API token (see [Create Secret for the API Token in Secret Manager](#create-secret-for-the-api-token-in-secret-manager)), including the path, in the format `projects/<project_id>/secrets/<secret_id>/versions/<version>`. For example: `projects/111111111111/secrets/uid2_operator_api_token_secret_integ/versions/1`. |
| `{ZONE}` | The Google Cloud availability zone that the VM instance will be deployed on. (**GWH_YS64 please verify this explanation**) |

##### Sample Deployment Script&#8212;Integ

The following example of the deployment script for the integration environment uses some placeholder values.
(**GWH_YS65 below is a fresh copy from https://github.com/IABTechLab/uid2-operator/tree/master/scripts/gcp-oidc#for-partner-create-vm-instance and has more differences than you pointed out. last line, machine type. Should I refresh to this?**)

```
$ gcloud compute instances create {INSTANCE_NAME} \
  --zone {ZONE} \
  --machine-type n2d-standard-2 \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family confidential-space \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference=us-docker.pkg.dev/uid2-prod-project/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}~tee-restart-policy=Never~tee-container-log-redirect=true~tee-env-DEPLOYMENT_ENVIRONMENT=integ~tee-env-API_TOKEN_SECRET_NAME={API_TOKEN_SECRET_FULL_NAME}
```

(**GWH_YS66 below is what I previously had**)
```
$ gcloud compute instances create {INSTANCE_NAME} \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family confidential-space \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference={OPERATOR_IMAGE}~tee-restart-policy=Never~tee-container-log-redirect=true~tee-env-DEPLOYMENT_ENVIRONMENT=integ~tee-env-API_TOKEN_SECRET_NAME={API_TOKEN_SECRET_FULL_NAME}
```

##### Sample Deployment Script&#8212;Prod

The following example of the deployment script for the production environment uses placeholder values.

>NOTE: A `machine-type` value of `n2d-standard-16` is required for the production environment.

```
$ gcloud compute instances create {INSTANCE_NAME} \
  --machine-type n2d-standard-16 \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family confidential-space \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference={OPERATOR_IMAGE}~tee-restart-policy=Never~tee-container-log-redirect=true~tee-env-DEPLOYMENT_ENVIRONMENT=prod~tee-env-API_TOKEN_SECRET_NAME={API_TOKEN_SECRET_NAME}
```

#### Run the Script

When the script is ready, with the additional valid values, run it.

#### Test gcloud Using the Health Check Endpoint

Call the health check endpoint to test the health of your implementation. The expected result is HTTP 200 with a response body of `OK`.

For instructions, see [Health Check&#8212;gcloud CLI](#health-checkgcloud-cli).

## Tasks

This section provides instructions for completing the following tasks. Where applicable, instructions are provided for both environments. It includes:

- [Viewing the UID2 Private Operator Logs](#viewing-the-uid2-private-operator-logs)
- [Running the Health Check](#running-the-health-check)
- [Upgrading](#upgrading)

### Viewing the UID2 Private Operator Logs

>NOTE: You must have the following permission, from the project administrator, so that you can view logs: `The Logs Viewer ( roles/logging.viewer ) role`.

To view the logs, follow these steps.

1. Go to https://console.cloud.google.com/logs.

2. Verify that the correct Google Cloud project is displayed in the title area. If needed, specify the UID2 project.

3. Put the following filter info into the query:

   ```
      resource.type="gce_instance"
      log_name="projects/{PROJECT_ID}/logs/confidential-space-launcher"
   ```

You could also add or select more filters on the left panel; for example, filter by `INSTANCE_ID`.

### Running the Health Check

Call the health check endpoint to test the health of your implementation.

Running the health check is the same for the integration and production environments, except for the endpoints.

Follow the applicable instructions depending on the deployment option you chose:

- [Health Check&#8212;Terraform Template](#health-checkterraform-template)
- [Health Check&#8212;gcloud CLI](#health-checkgcloud-cli)

#### Health Check&#8212;Terraform Template

The following example shows the health check for the Terraform template option:

1. Get the public IP address for the load balancer:

   ```
   terraform output load_balancer_ip
   ```

2. To test operator status, in your browser, go to the health check endpoint: `http://{IP}/ops/healthcheck`.

   An HTTP 200 with a response body of `OK` indicates healthy status.


#### Health Check&#8212;gcloud CLI
The following example shows the health check for the `gcloud` command line option:

1. Get the public IP address of the deployed instance:

   ```
   $ gcloud compute instances describe {INSTANCE_NAME} \
     --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
   ```
2. To test operator status, in your browser, go to `http://{IP}:8080/ops/healthcheck`.

   An HTTP 200 with a response body of `OK` indicates healthy status.

### Upgrading

When a new version of UID2 Google Cloud Platform Confidential Space is released, private operators receive an email notification of the update, with a new image version. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported.

If you're upgrading to a new version, the upgrade process depends on the deployment option you chose. Follow the applicable steps:

- [Upgrading&#8212;Terraform Template](#upgradingterraform-template)
- [Upgrading&#8212;gcloud CLI](#upgradinggcloud-cli)

#### Upgrading&#8212;Terraform Template

If you deployed using the Terraform template, all you need to do to upgrade is update your deployment with the new `{OPERATOR_IMAGE}` that you received in the upgrade notification.

#### Upgrading&#8212;gcloud CLI

If you deployed using the gcloud CLI, you must manually bring up new instances that use the new `{OPERATOR_IMAGE}` and then shut down old instances.

If you previously set up a load balancer manually, you'll also need to update the mapping for the load balancer.
