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

Confidential Space offers a secure enclave environment, known as a <a href="#gl-tee">Trusted Execution Environment (TEE)</a>.

>NOTE: The UID2 Private Operator implementation for GCP Confidential Space is not supported in these regions: Europe, China.

<!-- It includes the following information:

- [Terminology](#terminology)
- [Prerequisites](#prerequisites)
  - [Confidential Space Account Setup](#confidential-space-account-setup)
  - [UID2 Operator Account Setup](#uid2-operator-account-setup)
- [Build](#build) 
- [Deploy](#deploy)
  - [Integration Deployment](#integration-deployment)
  - [Production Deployment](#production-deployment)
  - [Deployment Example Using Terraform for Load Balancing](#deployment-example-using-terraform-for-load-balancing)
- [Upgrade](#upgrade) 
-->

## How It Works

You can run the UID2 Operator service on Google Cloud Platform within a trusted
[Confidential Space](https://cloud.google.com/confidential-computing/confidential-vm/docs/about-cvm#confidential-space) powered by Google.

When the Docker container for the UID2 Operator Confidential Space starts up, it does the following:

1. Fetches an OpenID Connect (OIDC) token from the shared mount volume.
1. Puts the token inside an attestation document.
1. Sends the attestation document plus the UID2 `api_token` value, which identifies the private operator service, to the UID2 Core Service as an attestation request.

When the attestation is successful, the UID2 Core Service provides seed information such as salts and keys to bootstrap the UID2 Operator in the secure Confidential Space container.

## Terminology

This document uses the following key terms with specialized definitions relating to the Google Cloud Platform Confidential Space.

<dl>

<dt class="jump-anchor" id="gl-attestation-service">Attestation service</dt>
<dd>The attestation service is an OpenID Connect (OIDC) provider that verifies the attestation for the trusted execution environment and then issues an OIDC authentication token, which includes identification attributes.</dd>

<dt class="jump-anchor" id="gl-confidential-space">Confidential Space</dt>
<dd>Confidential Space is a highly secure solution for processing confidential data in Google Cloud Platform, within a trusted execution environment (TEE) in a secure enclave.</dd>
<dd>For details, see <a href="https://cloud.google.com/docs/security/confidential-space">Confidential Space security overview</a>.</dd>

<dt class="jump-anchor" id="gl-jwt">JSON Web Token (JWT)</dt>
<dd>A JSON Web Token (JWT) is a type of bearer token, meaning that it contains all the information needed to allow the bearer to get access to a protected resource. With a JWT, the information is structured as a JSON object in a predefined format. It is URL-safe and digitally signed.</dd>

<dt class="jump-anchor" id="gl-oidc-token">OpenID Connect (OIDC) token</dt>
<dd>OpenID Connect (OIDC) is an identity layer on top of the OAuth 2.0 protocol that allows the client to verify the identity of an end-user based on authentication by an authorization server.</dd>
<dd>In the context of Confidential Space, the Operator Service is the client and Confidential Space is the authorization server.</dd>

<dt class="jump-anchor" id="gl-tee">TEE</dt>
<dd>Acronym for Trusted Execution Environment. From the Confidential Space documentation:</dd>
<dd>"Confidential Space uses a trusted execution environment that is designed to release secrets only to authorized workloads."</dd>
<dd>For details, see <a href="https://cloud.google.com/docs/security/confidential-space#components-of-a-confidential-space-system">Components of a Confidential Space system</a> (Google Cloud documentation).</dd>

<dt class="jump-anchor" id="gl-workload">Workload</dt>
<dd>A containerized Docker image that runs in a cloud-based Trusted Execution Environment (see <a href="#gl-tee">TEE</a>) on top of the Confidential Space image.</dd>

</dl>

## Prerequisites

Before setting up your UID2 Operator service in the Google Cloud Platform using Confidential Space, complete these prerequisite steps:

- [Confidential Space Account Setup](#confidential-space-account-setup)
- [UID2 Operator Account Setup](#uid2-operator-account-setup)

### Confidential Space Account Setup

You can run the UID2 Operator service on any GCP account and project. However, to support attestation, you'll need to create a service account that you can use to run Confidential Space virtual machines (VMs), and then grant specific permissions to the account.

For the account setup, you'll need to provide valid values for the placeholders shown in the following tables.

| Placeholder | Actual Value |
| :--- | :--- |
| `{PROJECT_ID}` | The ID of the GCP project that you want the GCP Operator to run in. |
| `{SERVICE_ACCOUNT_NAME}` | A name you choose for this account. It's best to choose a clear but concise name. (**GWH_YS01 are there any naming constraints? I made that up re naming advice... we can take it out... just a guess.**)  |

(**GWH_YS02 still not sure re PROJECT_ID... is this likely to be a GCP project that already exists, since the audience is someone who wants to set this up in GCP therefore already has an account? Or should setting up a GCP project be a step? (not that we tell them how to do it, but that we say do it). Not sure what the scope of a "GCP project" is.**)

To set up and configure the account, go to [Google Cloud Console](https://console.cloud.google.com/) and complete the following steps. Replace the placeholder values with your own valid values.

1. Click **Active Cloud shell**.

2. Switch to your project:
    ```
    $ gcloud config set project {PROJECT_ID}
    ```
 
3. Enable required APIs:
    ```
    $ gcloud services enable compute.googleapis.com confidentialcomputing.googleapis.com
    ```

4. Create a service account to run the <a href="#gl-workload">workload</a>:
    ```
    $ gcloud iam service-accounts create {SERVICE_ACCOUNT_NAME}
    ```

(**GWH_YS03 re the above -- the command says service-accounts but we are creating only one account... just checking it's correct, not service-account create?**)

5. Grant the required permission, `confidentialcomputing.workloadUser`, to the service account. This permission grants the ability to generate an attestation token and run a workload in a VM:
    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/confidentialcomputing.workloadUser
    ```

6. (Optional) Grant the optional permission, `logging.logWriter`, to the service account. This permission grants access to write and view logs in debug mode, and is useful for testing:
    ```
    $ gcloud projects add-iam-policy-binding {PROJECT_ID} \
      --member=serviceAccount:{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com \
      --role=roles/logging.logWriter
    ```
  
7. Add a VPC rule to allow public access on port 8080, the default exposed port for the UID2 operator:
    ```
    $ gcloud compute firewall-rules create operator-tcp \
      --direction=INGRESS --priority=1000 --network=default --action=ALLOW \
      --rules=tcp:8080 \
      --source-ranges=0.0.0.0/0 \
      --target-service-accounts={SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com
    ```

(**GWH_YS04 just checking -- do we need the \ at end of line in the above code snippets, 5, 6, and 7?**)

### UID2 Operator Account Setup
Ask your UID2 contact to register your organization as a UID2 Operator. If you're not sure who to ask, see [Contact Info](../getting-started/gs-account-setup.md#contact-info).

>TIP: It's a good idea to set  up an internal email distribution list of individuals who should be kept informed about new versions and any other technical notifications or requests, and provide that as the email contact.

When the registration process is complete, you'll receive the following.

>NOTE: If you're using the integration environment as well as the production environment, you'll receive values for both environments.

 - `{IMAGE_SHA}`: A valid UID2 operator image digest, used in configuration. For details, see [Integration Deployment](#integration-deployment) and  [Production Deployment](#production-deployment).
 - `{API_TOKEN}`: An API token, exclusive to you, that identifies you with the UID2 service as a private operator. This value is used in configuration. For details, see [Integration Deployment](#integration-deployment) and [Production Deployment](#production-deployment).
 - Additional information details, such as instructions for setting up VMs or a link to the applicable information.

When registration is complete, and your Confidential Space account is set up, it's time to download the Docker build and set up your GPC Confidential Space enclave.

## Build

To run UID2 Operator on a GCP Confidential Space enclave, download the official Docker image from the following GitHub location:

- [UID2-Operator](https://github.com/iabtechlab/uid2-operator/pkgs/container/uid2-operator) (**GWH_YS05 is any additional guidance needed? There are several "tagged image versions" including Azure and AWS... to me it isn't obvious what they should go for. If it will be obvious to users, fine -- otherwise let's add detail.** )

For example: (**GWH_YS06 I am tagging ghcr.io URLs for update. They are in all the examples (4 instances) and I don't want to mess with them.**)

```
docker pull ghcr.io/iabtechlab/uid2-operator
```

(**GWH_YS07 URL update please for the above URL**)

You can use the following command to build a non-certified UID2 operator container image from the source code:

```
# From the root source folder
# Update project version in pom to "1.0.0-SNAPSHOT"

mvn -B package -P gcp 
cp -r target scripts/gcp-oidc/
docker build ./scripts/gcp-oidc/. -t ghcr.io/iabtechlab/uid2-operator:v1.0.0-SNAPSHOT
```

(**GWH_YS08 URL update please for the above URL**)

## Deploy

(**GWH_YS09 is there something re can say re when they deploy integ versus production? Do they do integ then production? Do they generally have both, or transition one to the other? Some general info would be helpful.**)

The following environments are available:

- Integration environment: see [Integration Deployment](#integration-deployment)
- Production environment: see [Production Deployment](#production-deployment)

>NOTE: As a best practice, we recommend that you test and verify your implementation in the integration environment before deploying in the production environment.

### Integration Deployment

To deploy a new UID2 Operator in the GCP Confidential Space Enclave into the integration environment, you'll need to create a VM instance.

Follow these steps:

1. [Update the Script with Valid Values](#update-the-script-with-valid-values)
1. [Run the Script](#run-the-script)
1. [Test Using the Health Check Endpoint](#test-using-the-health-check-endpoint)

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

(**GWH_YS10 URL update please for the above URL**)

(**GWH_YS11 Do we need the \ at the end of each line in the above?**)

Placeholder values are defined in the following table.

| Placeholder | Actual Value |
| :--- | :--- |
| `{INSTANCE_NAME}` | Your own valid VM name. |
| `{SERVICE_ACCOUNT}` | The value you provided during account creation, in this format: `{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com`.<br/>For details, see [Confidential Space Account Setup](#confidential-space-account-setup) (Step 4). |
| `{IMAGE_SHA}` | The SHA for your UID2 operator image digest, received during your UID2 account setup.<br/>For details, see [UID2 Operator Account Setup](#uid2-operator-account-setup). |
| `{API_TOKEN}` | Your UID2 `api_token` value, received during your UID2 account setup, which identifies the private operator service.<br/>For details, see [UID2 Operator Account Setup](#uid2-operator-account-setup). |

#### Run the Script

When you've replaced the placeholder values with valid values, run the script.

#### Test Using the Health Check Endpoint

Call the health check endpoint to test the health of your implementation. The expected result is an `OK` response.

```
Get the public Ip of the deployed instance
gcloud compute instances describe {INSTANCE_NAME} \
    --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
health check
  http://{IP}:8080/ops/healthcheck
```

(**GWH_YS12 Is the health check valid for both integration and production environments?**)

(**GWH_YS13 Is there any info we can provide re the results of running the above, how they can make sure it was successful? Andrei said: "Where would this be accessible from?" and "Just give full different command lines for prod and integ." please help with that.**)

### Production Deployment

To deploy a new UID2 Operator in the GCP Confidential Space Enclave into the production environment, the steps are similar to deploying in the integration environment (see [Integration Deployment](#integration-deployment)), but with the following important differences in the script values:

- You'll receive separate `{API_TOKEN}` values for each environment. Be sure to use the correct one.
- The following value is different depending on the environment:
  - `~tee-env-DEPLOYMENT_ENVIRONMENT=integ~` is for the integration environment.
  - `~tee-env-DEPLOYMENT_ENVIRONMENT=prod~` is for the production environment.
- When deploying to the production environment you must specify a machine type of `n2d-standard-16` in the gcloud script. The default value is `n2d-standard-2`, which is not supported. Only a value of `n2d-standard-16` is supported. 

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

(**GWH_YS14 URL update please for the above URL**)

(**GWH_YS15 Andrei said: "Where would this be accessible from?" and "Just give full different command lines for prod and integ." please help with that.**)

>NOTE: This script includes an additional option not used in the script for the integration environment, `--machine-type n2d-standard-16`. By specifying this value you can make sure that the production deployment of UID2 Operator runs on the recommended machine type that matches the production configuration.

### Deployment Example Using Terraform for Load Balancing

For ease of deployment and upgrade, you can use a Terraform template to deploy a UID2 Private Operator implementation with load balancing and auto-scaling features. In this scenario, all VM instances run on Confidential Space VMs, and are deployed in multiple AZs. (**GWH_YS16 what is AZ?**)

The Terraform template creates the following components:

- Network: VPC and subnetwork.
- Instances: Instance template, instance groups (with autoscaling enabled)
- Ingress: Load balancer (with health check), forwarding rules, firewall rules.
- Egress: NAT. (**GWH_YS17 what is NAT?**)

In this section:
- [Install Terraform](#install-terraform)
- [Set Up the Environment](#set-up-the-environment)
- [Run Terraform](#run-terraform)
- [Test](#test)
- [Clean Up](#clean-up)
- [Inputs](#inputs)
- [Outputs](#outputs)
- [Terraform Template&#8212;Notes](#terraform-templatenotes)

#### Install Terraform

Install Terraform if it is not already installed: visit [terraform.io](https://www.terraform.io/).

#### Set Up the Environment

1. Set the project, replacing the `{PROJECT_ID}` placeholder with your own project ID (see [Confidential Space Account Setup](#confidential-space-account-setup)):

   ```
   gcloud config set project {PROJECT_ID}
   ```

2. Configure the environment for Terraform:

   ```
   gcloud auth application-default login
   ```

#### Run Terraform

Run the following:

```
terraform init
terraform apply
```

#### Test

1. Get the public IP address for the load balancer:

   ```
   terraform output load-balancer-ip
   ```

2. Check health at the health check endpoint (for details, see [Test Using the Health Check Endpoint](#test-using-the-health-check-endpoint)):

   ```
   http://{PUBLIC_IP}/ops/healthcheck
   ```

#### Clean Up

Remove all resources created by Terraform:

```
terraform destroy
```

#### Inputs

(**GWH_YS18 I need more data re the inputs and outputs so we can have some little intro line to these tables. Is this something they clean up? Or something that's required? Please help with some explanation for both inputs and outputs.**)

| Name               | Description | Type     | Default             | Required |
|--------------------|-------------|----------|---------------------|:--------:|
| project_id         | n/a         | `string` | n/a                 |   yes    |
| service_account    | n/a         | `string` | n/a                 |   yes    |
| uid_operator_image | n/a         | `string` | n/a                 |   yes    |
| uid_api_token      | n/a         | `string` | n/a                 |   yes    |
| region             | n/a         | `string` | `"asia-southeast1"` |    no    |
| network_name       | n/a         | `string` | `"uid-operator"`    |    no    |
| uid_machine_type   | n/a         | `string` | `"n2d-standard-16"` |    no    |
| uid_deployment_env | n/a         | `string` | `"integ"`           |    no    |
| max_replicas       | n/a         | `number` | `5`                 |    no    |
| min_replicas       | n/a         | `number` | `1`                 |    no    |
| debug_mode         | n/a         | `bool`   | `false`             |    no    |

#### Outputs

| Name             | Description |
|------------------|-------------|
| load-balancer-ip | n/a         |

#### Terraform Template&#8212;Notes

1. You might want to change the load balancer from HTTP to HTTPS. To do this, follow these steps: (**GWH_YS19 surely they would have to use HTTPS? Should this be higher profile than a note at the end?**)

   - Provide your cert via terraform following this page:
  [google_compute_ssl_certificate](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_ssl_certificate.html)

   - Then add the following configuration values in `module "gce-lb-http"` (**GWH_YS20 is the syntax correct here? Is it a name/value pair? Don't understand this. Module not previously mentioned. It's a module of what?**)

     ```
       ssl                  = true
       ssl_certificates     = [google_compute_ssl_certificate.you_cert.self_link]
       use_ssl_certificates = true
       https_redirect       = true
     ```

2. Follow the [Prerequisites](https://github.com/IABTechLab/uid2-operator/tree/master/scripts/gcp-oidc#prerequisites)
   section to set up a service account. (**GWH_YS21 this seems a little unkind to make the last step something they still need to do. Is this really all the information needed? Will it all make sense to our users and be easy to follow and implement?**)

## Upgrade

When a new version of UID2 Google Cloud Platform Confidential Space is released, private operators receive an email notification of the update, with a new image version. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported.

If you're upgrading to a new version, all you need to do is update the `{IMAGE_SHA}` in your configuration ([Integration Deployment](#integration-deployment) and/or [Production Deployment](#production-deployment)) to the new value from the update notification.

(**GWH_YS22 Not sure that the addition of the Terraform template info resolved Andrei's comment re upgrade and how it would be done -- and we'd have to cover with and without load balancing if it's only an option.**)
