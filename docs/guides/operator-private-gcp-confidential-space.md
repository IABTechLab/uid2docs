---
title: UID2 Operator - Google Cloud Platform Confidential Space
sidebar_label: GCP Confidential Space
pagination_label: UID2 Operator - Google Cloud Platform Confidential Space
description: Integration information for Google Cloud Platform private operator.
hide_table_of_contents: false
sidebar_position: 20
---

# UID2 Private Operator - Google Cloud Platform Confidential Space

This guide provides information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. Confidential Space offers a secure enclave environment, known as a Trusted Execution Environment (TEE).

>NOTE: The UID2 Private Operator implementation for GCP Confidential Space is not supported in these regions: Europe, China.

## Overview

You can run the UID2 Operator Service on Google Cloud Platform within a trusted
[Confidential Space](https://cloud.google.com/confidential-computing/confidential-vm/docs/about-cvm#confidential-space) enclave.

The Operator Service runs in a Confidential Space "workload"&#8212;a containerized Docker image that runs in a secure cloud-based enclave on top of the Confidential Space image.

When the Docker container for the UID2 Operator Confidential Space starts up, it does the following:

1. Fetches an OpenID Connect (OIDC) token from the shared mount volume.
1. Puts the token inside an attestation document.
1. Sends the attestation document plus the UID2 `api_token` value, which identifies the private Operator Service, to the UID2 Core Service as an attestation request.

When the attestation is successful, the UID2 Core Service provides seed information such as salts and keys to bootstrap the UID2 Operator in the secure Confidential Space container.

## Prerequisites

Before setting up your UID2 Operator Service in the Google Cloud Platform using Confidential Space, complete these prerequisite steps:

- [Confidential Space Account Setup](#confidential-space-account-setup)
- [UID2 Operator Account Setup](#uid2-operator-account-setup)

(**GWH_YS30 Unfortunately we have a big flaw in the organization. The Confidential Space Account Setup is for Terraform, but we're saying FIRST do the setup steps and THEN choose the deployment option. So they haven't yet chosen their deployment option, but they have to do different steps depending on the deployment option. Unless we move those 7 steps to the Terraform section I'm not sure what to do. Any input?**)

### Confidential Space Account Setup

You can run the UID2 Operator Service on any GCP account and project. However, to support attestation, you'll need to create a service account that you can use to run Confidential Space virtual machines (VMs), and then grant specific permissions to the account.

>NOTE: If you choose the Terraform template deployment option (see [Deploy&#8212;Terraform Template](#deployterraform-template)), the Terraform template takes care of setting up the Confidential Space account. In this case, all you need to do is determine the values you want to use. You could still review this section for information about what the Terraform template does behind the scenes.

For the account setup, you'll need to provide valid values for the placeholders shown in the following tables.

| Placeholder | Actual Value |
| :--- | :--- |
| `{PROJECT_ID}` | The ID of the GCP project that you want the UID2 Operator to run in; for example, `UID2_Operator_Production`.<br/>Make sure that you have a GCP project with billing enabled. We recommend creating a new project for the UID2 Operator Service, but you could also use an existing one. |
| `{SERVICE_ACCOUNT_NAME}` | A name you choose for the [Google Cloud Platform service account](https://cloud.google.com/iam/docs/service-accounts-create#creating) that you create for your UID2 Operator Service; for example, `GCP_UID2`. |

To set up and configure the account, go to [Google Cloud Console](https://console.cloud.google.com/) and complete the following steps. Replace the placeholder values with your own valid values.

1. Click **Active Cloud shell**.

2. Switch to your project:
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

    For example:

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

5. Grant the `confidentialcomputing.workloadUser` permission to the service account.

   This permission grants the ability to generate an attestation token and run the UID2 Operator in a Confidential Space VM.
    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/confidentialcomputing.workloadUser
    ```

6. Grant the `logging.logWriter` permission to the service account.

    This permission grants access to write and view logs in debug mode, and is useful for testing.
    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/logging.logWriter
    ```
    For details, see [Viewing the UID2 Private Operator Logs](#viewing-the-uid2-private-operator-logs).
  
7. Add a VPC rule to allow public access on port 8080, the default exposed port for the UID2 operator:
    ```
    $ gcloud compute firewall-rules create operator-tcp \
      --direction=INGRESS --priority=1000 --network=default --action=ALLOW \
      --rules=tcp:8080 \
      --source-ranges=0.0.0.0/0 \
      --target-service-accounts={SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com
    ```

### UID2 Operator Account Setup
Ask your UID2 contact to register your organization as a UID2 Operator. If you're not sure who to ask, see [Contact Info](../getting-started/gs-account-setup.md#contact-info).

>TIP: It's a good idea to set  up an internal email distribution list of individuals who should be kept informed about new versions and any other technical notifications or requests, and provide that as the email contact.

When the registration process is complete, you'll receive the following.

>NOTE: If you're using the integration environment as well as the production environment, you'll receive values for both environments.

 - `{IMAGE_SHA}`: A valid UID2 operator image digest, used in configuration.
 - `{API_TOKEN}`: An API token, exclusive to you, that identifies you with the UID2 service as a private operator. This value is used in configuration.
 - Additional information details, such as instructions for setting up VMs or a link to the applicable information.

When registration is complete, and your Confidential Space account is set up, it's time to download the Docker build and set up your GPC Confidential Space enclave. (**GWH_YS31 is this statement for both deployment options?**)

## Deployment Environments

The following environments are available, and both [deployment options](#deployment-options) support both environments.

As a best practice, we recommend that you test and verify your implementation in the integration environment before deploying in the production environment.

>NOTE: You'll receive separate `{API_TOKEN}` values for each environment. Be sure to use the correct one. The `{IMAGE_SHA}` value is the same for both environments.

| Deployment Environment | Details |
| :--- | :--- |
| Integration (`integ`) | For testing only. Debug mode is available in the integration environment. |
| Production (`prod`) | For managing production traffic. For this environment, we recommend deploying via the Terraform template, with load balancing, and with HTTPS enabled. See [Deployment Options](#deployment-options). |

## Deployment Options

There are two deployment options:

| Option | Details |
| :--- | :--- |
| [Terraform template](#deployterraform-template) | This option:<ul><li>Brings up a whole stack with a load balancer and a scaling group.</li><li>Is slightly more complex to set up than the `gcloud` option.</li><li>Is very simple to upgrade.</li><li>Is the recommended deployment solution.</li></ul> |
| [gcloud command line](#deploy-at-the-gcloud-command-line) | This option:<ul><li>Brings up one public instance with the public IP address.</li><li>Is simpler to set up than the Terraform option, for a single instance.</li><li>For multiple instances, requires bringing up each instance manually, by running the command multiple times.</li><li>Requires setting up load balancing manually.</li><li>Is more complex to upgrade, since more manual steps are needed.</li></ul> |

Both deployment options support both deployment environments.

To determine your deployment steps, do the following:
1. First, choose the deployment option you want to use.
2. Then, follow the applicable instructions:
   - [Deploy&#8212;Terraform Template](#deployterraform-template)
   - [Deploy&#8212;gcloud Command Line](#deploygcloud-command-line)

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

1. (Optional) Provide values for these additional input parameters that are always optional. These parameters have defaults, but you might want to modify the values to better suit your requirements:
   - `region`
   - `network_name`
   - `min_replicas`
   - `max_replicas`
   - `debug_mode`

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
| `uid_operator_image` | `string` | n/a | yes | The SHA for your UID2 operator image digest, received during your UID2 account setup. Provide the full image address. For example: `ghcr.io/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}`. |
| `uid_api_token` | `string` | n/a | yes | The UID2 `api_token` value. |
| `uid_api_token_secret_name` | `string` | `"secret-api-token"` | no |  The name for the `api_token` secret value.<br/>( **GWH_YS32 any other info about the secret? Is it another value, or the secret, encrypted (with what encryption algorithm, if we want to share that)? And if so how is it encrypted? Or, what is it? Also why is it lower case here and upper case in the sample script?** ) |
| `region` | `string` | `asia-southeast1` | no | The region that you want to deploy to. For a list of valid regions, see [Available regions and zones](https://cloud.google.com/compute/docs/regions-zones#available) in the Google Cloud documentation.<br/>NOTE: The UID2 Private Operator implementation for GCP Confidential Space is not supported in these regions: Europe, China. |
| `network_name` | `string` | `uid-operator` | no | The VPC resource name (also used for rules/ instance tags). |
| `uid_machine_type` | `string` | `n2d-standard-16` | no | The machine type. `n2d-standard-16` is the only value supported in the Production environment. For the Integration environment you can change it if needed, but not for Production. |
| `uid_deployment_env` | `string` | `integ` | no | Valid values: `integ` or `prod`. The default is `integ`, so for your production deployment you'll need to include this input with a value of `prod`. |
| `min_replicas` | `number` | `1` | no | Indicates the minimum number of replicas you want to deploy. Default value: `1`. |
| `max_replicas` | `number` | `5` | no | Indicates the maximum number of replicas you want to deploy. Default value: `5`. |
| `debug_mode` | `bool`  | `false` | no | Do not set to `true` unless you are working with the UID2 team to debug an issue. In any other circumstances, if you set this flag to `true`, attestation will fail. |

#### Outputs

The following table summarizes the output value from the Terraform template.

| Name | Description |
| :--- | :--- |
| `load-balancer-ip` | The public IP address of the load balancer.<br/>You can use this value to [perform the health check](#health-checkterraform-template) or to configure the DNS. |

#### Terraform Template&#8212;Changing the Load Balancer to HTTPS

If you want to change the load balancer from HTTP to HTTPS, follow these steps:

1. Provide your certificate via Terraform, following the instructions on the Terraform [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate.html) documentation page.

2. Add the following configuration values in the `main.tf` file, in the `module "gce-lb-http" ` section:

  ```
   ssl                  = true
   ssl_certificates     = [google_compute_ssl_certificate.you_cert.self_link]
   use_ssl_certificates = true
   https_redirect       = true
  ```

### Deploy&#8212;gcloud Command Line

To deploy a new UID2 Operator in the GCP Confidential Space Enclave, using the gCloud command line, follow these steps.

1. For the integration environment:
   1. [Update the Script with Valid Values&#8212;Integ](#update-the-script-with-valid-valuesinteg)
   1. [Run the Script&#8212;Integ](#run-the-scriptinteg)
   1. [Test gcloud Using the Health Check Endpoint&#8212;Integ](#test-gcloud-using-the-health-check-endpointinteg)
1. For the production environment:
   1. [Update the Script with Valid Values&#8212;Prod](#update-the-script-with-valid-valuesprod)
   1. [Run the Script&#8212;Prod](#run-the-scriptprod)
   1. [Test gcloud Using the Health Check Endpoint&#8212;Prod](#test-gcloud-using-the-health-check-endpointprod)

#### Update the Script with Valid Values&#8212;Integ

Update the example script, using your own valid values instead of the placeholder values.

The following example of the deployment script for the integration environment uses placeholder values.

```
$ gcloud compute instances create {INSTANCE_NAME} \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family confidential-space \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference=us-docker.pkg.dev/uid2-prod-project/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}~tee-restart-policy=Never~tee-container-log-redirect=true~tee-env-DEPLOYMENT_ENVIRONMENT=integ~tee-env-API_TOKEN_SECRET_NAME={API_TOKEN_SECRET_NAME}
```

Placeholder values are defined in the following table.

| Placeholder | Actual Value |
| :--- | :--- |
| `{INSTANCE_NAME}` | Your own valid VM name. |
| `{SERVICE_ACCOUNT}` | The service account email that you created as part of creating your account, in this format: `{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com`.<br/>For details, see [Confidential Space Account Setup](#confidential-space-account-setup) (Step 4). |
| `{IMAGE_SHA}` | The SHA for your UID2 operator image digest, received during your UID2 account setup.<br/>For details, see [UID2 Operator Account Setup](#uid2-operator-account-setup). |
| `{API_TOKEN}` | Your UID2 `api_token` value, received during your UID2 account setup, which identifies the private Operator Service.<br/>For details, see [UID2 Operator Account Setup](#uid2-operator-account-setup). |
(**GWH_YS33 do we need API_TOKEN_SECRET_NAME here also?**)

#### Run the Script&#8212;Integ

When you've replaced the placeholder values with valid values, run the script.

#### Test gcloud Using the Health Check Endpoint&#8212;Integ

Call the health check endpoint to test the health of your implementation. The expected result is HTTP 200 with a response body of `OK`.

For instructions, see [Health Check&#8212;Google Cloud](#health-checkgoogle-cloud).

#### Update the Script with Valid Values&#8212;Prod

To deploy a new UID2 Operator in the GCP Confidential Space Enclave into the production environment, the steps are similar to deploying in the integration environment, but with the following important differences in the script values:

The following values are different depending on the environment:

- `uid_deployment_env` parameter:
  - `~tee-env-DEPLOYMENT_ENVIRONMENT=integ~` is for the integration environment.
  - `~tee-env-DEPLOYMENT_ENVIRONMENT=prod~` is for the production environment.
- `uid_machine_type` parameter:
  - In the integration environment, the default value of `n2d-standard-2` is acceptable, so you do not need to define this parameter in the gcloud script.
  - When deploying to the production environment, you must specify a machine type of `n2d-standard-16` in the gcloud script. This is the only value supported for production.
- The `uid_api_token_secret_name` is derived from the `api_token` value, which is different for each environment. There are two changes to the last line of the script:
  - Different `uid_api_token_secret_name` value for each environment.
  - Last line of the script includes the environment definition. For Production:<br/>`~tee-restart-policy=Never~tee-container-log-redirect=true~tee-env-DEPLOYMENT_ENVIRONMENT=prod`.

(**GWH_YS34 I added the "secret" info but I think it could be explained better. How do they arrive at the secret value? There are no steps for that. And, how does that apply to the GCP command-line option?**)

The following example of the deployment script for the production environment uses placeholder values.

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
  --metadata ^~^tee-image-reference=us-docker.pkg.dev/uid2-prod-project/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}~tee-restart-policy=Never~tee-container-log-redirect=true~tee-env-DEPLOYMENT_ENVIRONMENT=prod~tee-env-API_TOKEN_SECRET_NAME={API_TOKEN_SECRET_NAME}
```

#### Run the Script&#8212;Prod

When the production script is ready, with the additional valid values, run it.

#### Test gcloud Using the Health Check Endpoint&#8212;Prod

Call the health check endpoint to test the health of your production implementation. The expected result is HTTP 200 with a response body of `OK`.

For instructions, see [Health Check&#8212;Google Cloud](#health-checkgoogle-cloud).

## Viewing the UID2 Private Operator Logs

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

## Running the Health Check

Call the health check endpoint to test the health of your implementation.

Running the health check is the same for the integration and production environments, except for the endpoints and the credentials.

Follow the applicable instructions depending on the type of implementation you've chosen:

- [Health Check&#8212;Terraform Template](#health-checkterraform-template)
- [Health Check&#8212;Google Cloud](#health-checkgoogle-cloud)

### Health Check&#8212;Terraform Template

The following example shows the health check for the Terraform template option:

1. Get the public IP address for the load balancer:

   ```
   terraform output load-balancer-ip
   ```

2. To test operator status, in your browser, go to the health check endpoint: `http://{IP}/ops/healthcheck`.

   An HTTP 200 with a response body of `OK` indicates healthy status.


### Health Check&#8212;Google Cloud

The following example shows the health check for the `gcloud` command line option:

1. Get the public IP address of the deployed instance:

   ```
   $ gcloud compute instances describe {INSTANCE_NAME} \
     --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
   ```
2. To test operator status, in your browser, go to `http://{IP}:8080/ops/healthcheck`.

   An HTTP 200 with a response body of `OK` indicates healthy status.

## Upgrade

When a new version of UID2 Google Cloud Platform Confidential Space is released, private operators receive an email notification of the update, with a new image version. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported.

If you're upgrading to a new version, the upgrade process depends on the deployment option you chose. Follow the applicable steps:

- [Upgrading&#8212;Terraform Template](#upgradingterraform-template)
- [Upgrading&#8212;gcloud Command Line](#upgradinggcloud-command-line)

### Upgrading&#8212;Terraform Template

If you deployed using the Terraform template, all you need to do to upgrade is update your deployment with the new `{IMAGE_SHA}` that you received in the upgrade notification.

### Upgrading&#8212;gcloud Command Line

If you deployed using the gcloud command line, you must manually bring up new instances that use the new `{IMAGE_SHA}` and then shut down old instances.

If you have manual load balancing in place, you'll also need to update the load balancing mapping.
