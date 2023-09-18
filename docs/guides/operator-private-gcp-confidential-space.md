---
title: UID2 Operator - Google Cloud Platform Confidential Space
sidebar_label: GCP Confidential Space
pagination_label: UID2 Operator - Google Cloud Platform Confidential Space
description: Integration information for Google Cloud Platform private operator.
hide_table_of_contents: false
sidebar_position: 20
---

# UID2 Private Operator - Google Cloud Platform Confidential Space

This guide provides information for setting up the UID2 Operator Service in [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space), a confidential computing option from [Google Cloud](https://cloud.google.com/docs/overview/) Platform. 

Confidential Space offers a secure enclave environment, known as a Trusted Execution Environment (TEE).

>NOTE: The UID2 Private Operator implementation for GCP Confidential Space is not supported in these regions: Europe, China.

It includes the following information:

- [Overview](#overview)
- [Prerequisites](#prerequisites)
  - [Confidential Space Account Setup](#confidential-space-account-setup)
  - [UID2 Operator Account Setup](#uid2-operator-account-setup)
- [Deployment Environments](#deployment-environments)
- [Deployment Options](#deployment-options)
  - [Deploy&#8212;Terraform Template](#deployterraform-template)
  - [Deploy&#8212;gcloud Command Line](#deploygcloud-command-line)
- [Viewing the UID2 Private Operator Logs](#viewing-the-uid2-private-operator-logs) 
- [Running the Health Check](#running-the-health-check)
   - [Health Check&#8212;Google Cloud](#health-checkgoogle-cloud)
   - [Health Check&#8212;Terraform Template](#health-checkterraform-template)
- [Upgrade](#upgrade)
  - [Upgrading&#8212;Terraform Template](#upgradingterraform-template)
  - [Upgrading&#8212;gcloud Command Line](#upgradinggcloud-command-line)

## Overview

You can run the UID2 Operator service on Google Cloud Platform within a trusted
[Confidential Space](https://cloud.google.com/confidential-computing/confidential-vm/docs/about-cvm#confidential-space) powered by Google.

The Operator service runs in a Confidential Space "workload"&#8212;a containerized Docker image that runs in a secure cloud-based enclave on top of the Confidential Space image.

When the Docker container for the UID2 Operator Confidential Space starts up, it does the following:

1. Fetches an OpenID Connect (OIDC) token from the shared mount volume.
1. Puts the token inside an attestation document.
1. Sends the attestation document plus the UID2 `api_token` value, which identifies the private operator service, to the UID2 Core Service as an attestation request.

When the attestation is successful, the UID2 Core Service provides seed information such as salts and keys to bootstrap the UID2 Operator in the secure Confidential Space container.

## Prerequisites

Before setting up your UID2 Operator service in the Google Cloud Platform using Confidential Space, complete these prerequisite steps:

- [Confidential Space Account Setup](#confidential-space-account-setup)
- [UID2 Operator Account Setup](#uid2-operator-account-setup)

### Confidential Space Account Setup

You can run the UID2 Operator service on any GCP account and project. However, to support attestation, you'll need to create a service account that you can use to run Confidential Space virtual machines (VMs), and then grant specific permissions to the account.

For the account setup, you'll need to provide valid values for the placeholders shown in the following tables.

| Placeholder | Actual Value |
| :--- | :--- |
| `{PROJECT_ID}` | The ID of the GCP project that you want the GCP Operator to run in; for example, `UID2_Operator_Production`.<br/>Make sure you have a GCP project with billing enabled. We recommend that you create a new project for UID2 operator, but you could also re-use an existing one. |
| `{SERVICE_ACCOUNT_NAME}` | A name you choose for the [Google Cloud Platform service account](https://cloud.google.com/iam/docs/service-accounts-create#creating) you create for your UID2 Operator Service; for example, `GCP_UID2`. |

To set up and configure the account, go to [Google Cloud Console](https://console.cloud.google.com/) and complete the following steps. Replace the placeholder values with your own valid values.

1. Click **Active Cloud shell**.

2. Switch to your project:
    ```
    $ gcloud config set project {PROJECT_ID}
    ```
 
3. Enable the Confidential Computing APIs: (**GWH_YS03 Andrei said: "How about "Enable Confidential Computing APIs"? If this could be a link to some google docs even better." Is there somewhere we could link to?**)
    ```
    $ gcloud services enable compute.googleapis.com confidentialcomputing.googleapis.com
    ```

4. Create a service account to run the UID2 Operator service:
    ```
    $ gcloud iam service-accounts create {SERVICE_ACCOUNT_NAME}
    ```

5. Grant the `confidentialcomputing.workloadUser` permission to the service account.

   This permission grants the ability to generate an attestation token and run the UID2 Operator in a ConfidentialSpaces VM.
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
    For information on viewing the logs, see [Viewing the UID2 Private Operator Logs](#viewing-the-uid2-private-operator-logs).
  
7. Add a VPC rule to allow public access on port 8080, the default exposed port for the UID2 operator:
    ```
    $ gcloud compute firewall-rules create operator-tcp \
      --direction=INGRESS --priority=1000 --network=default --action=ALLOW \
      --rules=tcp:8080 \
      --source-ranges=0.0.0.0/0 \
      --target-service-accounts={SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com
    ```

(**GWH_YS04 Re the above, port 8080, various comments to be resolved:**
**Andrei: This is not a good practice. We should not be recommending exposing port 8080 publicly -- it is not standard. We should also not be recommending exposing HTTP publicly. HTTP can be fine for internal use, but our recommendation should be to set up a TLS (HTTPS), e.g. on load balancer in front of the VM(s).**

**Andrei: There should also be instructions for how to access the prometheus metrics port.**

**Yishi: This is one deploy option to bring up only one VM with public IP. Partner probably could use this option for integ deployment. / We could also provide other options to deploy a LB with 80/443 port then forward to instances (with in a VPC) with 8080 port.**)

### UID2 Operator Account Setup
Ask your UID2 contact to register your organization as a UID2 Operator. If you're not sure who to ask, see [Contact Info](../getting-started/gs-account-setup.md#contact-info).

>TIP: It's a good idea to set  up an internal email distribution list of individuals who should be kept informed about new versions and any other technical notifications or requests, and provide that as the email contact.

When the registration process is complete, you'll receive the following.

>NOTE: If you're using the integration environment as well as the production environment, you'll receive values for both environments.

 - `{IMAGE_SHA}`: A valid UID2 operator image digest, used in configuration. For details, see [Integration Deployment](#integration-deployment) and  [Production Deployment](#production-deployment).
 - `{API_TOKEN}`: An API token, exclusive to you, that identifies you with the UID2 service as a private operator. This value is used in configuration. For details, see [Integration Deployment](#integration-deployment) and [Production Deployment](#production-deployment).
 - Additional information details, such as instructions for setting up VMs or a link to the applicable information.

When registration is complete, and your Confidential Space account is set up, it's time to download the Docker build and set up your GPC Confidential Space enclave.

## Deployment Environments

The following environments are available, and the two available deployment options support both environments.

As a best practice, we recommend that you test and verify your implementation in the integration environment before deploying in the production environment.

>NOTE: You'll receive separate `{API_TOKEN}` values for each environment. Be sure to use the correct one. The `{IMAGE_SHA}` value is the same for both environments.

| Deployment Environment | Details |
| :--- | :--- |
| Integration (`integ`) | For testing only. Debug mode is available in the integration environment. |
| Production (`prod`) | For managing production traffic, we recommend deploying via the Terraform template, with load balancing, and with HTTPS enabled. |

## Deployment Options

There are two deployment options:

| Option | Details |
| :--- | :--- |
| [Terraform template](#deployterraform-template) | This option:<ul><li>Brings up a whole stack with a load balancer and a scaling group.</li><li>Is slightly more complex to set up than the `gcloud` option.</li><li>Is very simple to upgrade.</li><li>Is the recommended deployment solution.</li></ul> |
| [gcloud command line](#deploy-at-the-gcloud-command-line) | This option:<ul><li>Brings up one public instance with the public IP address.</li><li>Is simpler to set up than the Terraform option.</li><li>For multiple instances, requires bringing up each instance manually, by running the command multiple times.</li><li>Requires setting up load balancing manually.</li><li>Upgrade is more complex with this option since more manual steps are needed.</li></ul> |

Both deployment options support both deployment environments.

To determine your deployment steps, do the following:
1. First, choose the deployment option you want to use.
2. Then, follow the applicable instructions:
   - [Deploy&#8212;Terraform Template](#deployterraform-template)
   - [Deploy at the gcloud Command Line](#deploy-at-the-gcloud-command-line)

### Deploy&#8212;Terraform Template

For ease of deployment and upgrade, you can use a Terraform template to deploy a UID2 Private Operator implementation with load balancing and auto-scaling features. In this scenario, all VM instances run on Confidential Space VMs, and are deployed in multiple availability zones (AZs).

The Terraform template creates the following components:

- Network: VPC and subnetwork.
- Instances: Instance template, instance groups (with auto-scaling enabled).
- Ingress: Load balancer (with health check), forwarding rules, and firewall rules.
- Egress: [NAT](https://cloud.google.com/nat/docs/overview).

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
- [Terraform Template&#8212;Notes](#terraform-templatenotes)

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

From the [uid2-operator GitHub repository](https://github.com/IABTechLab/uid2-operator), download the template files listed in the following table.

| File | Details |
| :--- | :--- |
| [main.tf](https://github.com/IABTechLab/uid2-operator/scripts/gcp-oidc/terraform/main.tf) | The Terraform template file. |
| [variables.tf](https://github.com/IABTechLab/uid2-operator/scripts/gcp-oidc/terraform/variables.tf) | Includes input definitions. |
| [outputs.tf](https://github.com/IABTechLab/uid2-operator/scripts/gcp-oidc/terraform/outputs.tf) | Includes output definitions. |

For more information, refer to the readme file for the Terraform template: [Future, published URL (to keep)](https://github.com/IABTechLab/uid2-operator/scripts/gcp-oidc/terraform/README.md) | [PR URL (to delete when PR is merged)](https://github.com/IABTechLab/uid2-operator/pull/212/files#diff-154a1adda6944684fff3b5e1fc4a5afa2ae6173790c206ae062f4b173f585d05). (**GWH_YS05 to be updated when the template files are published**)

#### Provide Input Values

Provide values for input parameters, as needed. Some are required, others are optional.

(**GWH_YS06 Provide them where, actually? In the template file? Is it in variables.tf actually? If so we should definitely say... and what if we include an example with fictitious values? Just a suggestion.**)

For details about the fields and valid values, see [Input Parameters and Values](#input-parameters-and-values).

1. Provide values for the following required input fields:
   - project_id
   - service_account_name
   - uid_operator_image
   - uid_api_token 

1. (Conditional, for Production environment) Provide values for the following fields that are required for the Production environment:
   - uid_machine_type: For Production, the value must be `n2d-standard-16`
   - uid_deployment_env: For Production, the value must be `prod`

1. (Optional) Provide values for these additional input fields that are always optional. These fields have default values, but you might want to modify them to better suit your requirements:
   - region
   - network_name
   - min_replicas
   - max_replicas
   - debug_mode

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

The following table summarizes all the input values for the Terraform template.

| Name               | Type     | Default  | Required | Description |
| :---               | :--- | :--- | :--- | :--- |
| project_id         | `string` | n/a   |   yes    | The ID of the GCP project that you want the GCP Operator to run in; for example, `UID2_Operator_Production`.**GWH_YS07 Guessing that's what it is though not sure why it would be project_id vs PROJECT_ID?** |
| service_account_name    | `string` | n/a                 |   yes    | The input value is the name of the service account you want to use for your UID2 Operator instance in GCP Confidential Space. |
| uid_operator_image | `string` | n/a                 |   yes    | The SHA for your UID2 operator image digest, received during your UID2 account setup. Provide the full image address. For example: `ghcr.io/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}`. **GWH_YS09 do we send them the full image address? If not, how will they get it?** |
| uid_api_token      | `string` | n/a                 |   yes    | **GWH_YS10 This is not mentioned elsewhere. Is it the UID2 `api_token` value?** |
| region             | `string` | `asia-southeast1` |    no    | The region that you want to deploy to. You can choose any region. **GWH_YS11 Is there a list of valid values somewhere?** |
| network_name       | `string` | `uid-operator`    |    no    | The VPC resource name (also used for rules/ instance tags). |
| uid_machine_type   | `string` | `n2d-standard-16` |    no    | The machine type. The default value is the only value supported in the Production environment For the Integration environment you can change it if needed, but not for Production. |
| uid_deployment_env | `string` | `integ`           |    no    | Valid values: `integ` or `prod`. The default is `integ`, so for your production deployment you'll need to include this input with a value of `prod`. |
| max_replicas       | `number` | `5`                 |    no    | Indicates the maximum number of replicas you want to deploy. |
| min_replicas       | `number` | `1`                 |    no    | Indicates the minimum number of replicas you want to deploy. |
| debug_mode         | `bool`   | `false`             |    no    | Do not set to `true` unless you are working with UID2 team to debug issues. In any other circumstances, if you set this flag to `true`, attestation will fail. |

#### Outputs

The following table summarizes the output value from the Terraform template.

| Name             | Description |
| :---             | :--- |
| load-balancer-ip | The public IP address of the load balancer.<br/>You can use this value to [perform the health check](#health-checkterraform-template) or to configure the DNS. |

#### Terraform Template&#8212;Notes

You might want to change the load balancer from HTTP to HTTPS. To do this, follow these steps:

1. Provide your certificate via Terraform, following the instructions on this Terraform documentation page:
  [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate.html).

2. Add the following configuration values in `module "gce-lb-http"` (**GWH_YS12 (old 20) is the syntax correct here? Is it a name/value pair? Don't understand this. Module not previously mentioned. It's a module of what? (Yi added info re downloading template files, https://github.com/IABTechLab/uid2docs/pull/291/files#r1325754579, but not sure it was an answer to this query).**)

  ```
   ssl                  = true
   ssl_certificates     = [google_compute_ssl_certificate.you_cert.self_link]
   use_ssl_certificates = true
    https_redirect       = true
  ```

### Deploy&#8212;gcloud Command Line

To deploy a new UID2 Operator in the GCP Confidential Space Enclave, using the gCloud command line, follow these steps:

1. [Update the Script with Valid Values](#update-the-script-with-valid-values)
1. [Run the Script](#run-the-script)
1. [Test gcloud Using the Health Check Endpoint](#test-gcloud-using-the-health-check-endpoint)

#### Update the Script with Valid Values

Update the example script, using your own valid values instead of the placeholder values shown in the table.

The following example uses placeholder values.

```
$ gcloud compute instances create {INSTANCE_NAME} \
  --confidential-compute \
  --shielded-secure-boot \
  --maintenance-policy Terminate \
  --scopes cloud-platform \
  --image-project confidential-space-images \
  --image-family confidential-space \
  --service-account {SERVICE_ACCOUNT} \
  --metadata ^~^tee-image-reference=ghcr.io/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}~tee-restart-policy=Never~tee-env-DEPLOYMENT_ENVIRONMENT=integ~tee-env-API_TOKEN={API_TOKEN}
```

Placeholder values are defined in the following table.

| Placeholder | Actual Value |
| :--- | :--- |
| `{INSTANCE_NAME}` | Your own valid VM name. |
| `{SERVICE_ACCOUNT}` | The service account email that you created as part of creating your account, in this format: `{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com`.<br/>For details, see [Confidential Space Account Setup](#confidential-space-account-setup) (Step 4). |
| `{IMAGE_SHA}` | The SHA for your UID2 operator image digest, received during your UID2 account setup.<br/>For details, see [UID2 Operator Account Setup](#uid2-operator-account-setup). |
| `{API_TOKEN}` | Your UID2 `api_token` value, received during your UID2 account setup, which identifies the private operator service.<br/>For details, see [UID2 Operator Account Setup](#uid2-operator-account-setup). |

#### Run the Script

When you've replaced the placeholder values with valid values, run the script.

#### Test gcloud Using the Health Check Endpoint

Call the health check endpoint to test the health of your implementation. The expected result is HTTP 200 with a response body of `OK`.

For instructions, see [Health Check&#8212;Google Cloud](#health-checkgoogle-cloud).

#### Deploying via the gCloud command line (production deployment instructions)

To deploy a new UID2 Operator in the GCP Confidential Space Enclave into the production environment, the steps are similar to deploying in the integration environment (see [Integration Deployment](#integration-deployment)), but with the following important differences in the script values:

- The following value is different depending on the environment:
  - `~tee-env-DEPLOYMENT_ENVIRONMENT=integ~` is for the integration environment.
  - `~tee-env-DEPLOYMENT_ENVIRONMENT=prod~` is for the production environment.
- When deploying to the production environment you must specify a machine type of `n2d-standard-16` in the gcloud script. The default value is `n2d-standard-2`, which is not supported. Only `n2d-standard-16` is supported. 

The following example of the production deployment script uses placeholder values:

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
  --metadata ^~^tee-image-reference=ghcr.io/iabtechlab/uid2-operator@sha256:{IMAGE_SHA}~tee-restart-policy=Never~tee-env-DEPLOYMENT_ENVIRONMENT=prod~tee-env-API_TOKEN={API_TOKEN}
```

## Viewing the UID2 Private Operator Logs

<!-- If you've enabled the ability to view the logs, xxx. -->

To view the logs, follow these steps. (**GWH_YS13 we had "if you've enabled the ability to view the logs"... do we need that wording? If so, how do they enable the ability to view the logs?**)

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

- [Health Check&#8212;Google Cloud](#health-checkgoogle-cloud)
- [Health Check&#8212;Terraform Template](#health-checkterraform-template)

### Health Check&#8212;Google Cloud

The following example shows the health check for the `gcloud` command line option:

1. Get the public IP address of the deployed instance:

   ```
   $ gcloud compute instances describe {INSTANCE_NAME} \
     --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
   ```
2. To test operator status, in your browser, go to `http://{IP}:8080/ops/healthcheck`.

   An HTTP 200 with a response body of `OK` indicates healthy status.


### Health Check&#8212;Terraform Template

The following example shows the health check for the Terraform template option:

1. Get the public IP address for the load balancer:

   ```
   terraform output load-balancer-ip
   ```

2. To test operator status, in your browser, go to the health check endpoint: `http://{IP}/ops/healthcheck`.

   An HTTP 200 with a response body of `OK` indicates healthy status.

## Upgrade

When a new version of UID2 Google Cloud Platform Confidential Space is released, private operators receive an email notification of the update, with a new image version. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported.

If you're upgrading to a new version, the upgrade process depends on the deployment option you chose. Follow the applicable steps:

- [Upgrading&#8212;Terraform Template](#upgradingterraform-template)
- [Upgrading&#8212;gcloud Command Line](#upgradinggcloud-command-line)

### Upgrading&#8212;Terraform Template

If you deployed using the Terraform template, all you need to do to upgrade is update your deployment with the new `{IMAGE_SHA}` that you received in the upgrade notification.

### Upgrading&#8212;gcloud Command Line

If you deployed using the gcloud command line, you must manually bring up new instances that use the new with the new `{IMAGE_SHA}` and then shut down old instances.

If you have manual load balancing in place, you'll also need to update the load balancing mapping.
