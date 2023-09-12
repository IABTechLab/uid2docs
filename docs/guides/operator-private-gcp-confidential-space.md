---
title: UID2 Operator - Google Cloud Platform Confidential Space
sidebar_label: GCP Confidential Space
pagination_label: UID2 Operator - Google Cloud Platform Confidential Space
description: Integration information for Google Cloud Platform private operator.
hide_table_of_contents: false
sidebar_position: 20
---

# UID2 Private Operator - Google Cloud Platform Confidential Space

This guide provides information for setting up the UID2 Operator Service in a secure enclave in a [Google Cloud](https://cloud.google.com/docs/overview/) platform [Confidential Space](https://cloud.google.com/confidential-computing#confidential-space).

<!-- It includes the following information:

- [Overview](#overview)
- [Terminology](#terminology)
- [Attestation Requirements](#attestation-requirements)
- [Integration Deployment](#integration-deployment)
  - [Cloud-init.yaml File](#cloud-inityaml-file)
  - [Cloud-init Example](#cloud-init-example)
  - [Create VM Instance](#create-vm-instance)
- [Production Deployment](#production-deployment)
- [Upgrading](#upgrading) 
-->

## Overview

Confidential Space, from Google Cloud Platform, is GCP's latest confidential computing option, with a GA date of March 2023.

The UID2 GCP Confidential Space private operator solution offers a secure enclave environment, known as a <a href="#gl-tee">Trusted Execution Environment (TEE)</a>.

Confidential Space enables the sharing of confidential data in an isolated and secure environment so that privacy, confidentiality, and ownership of the data are preserved.

(**GWH_YS01 do we need to say anything about how this is better than the previous solution?**)

## How It Works

You can run the UID2 Operator service on Google Cloud Platform within a trusted
[Confidential Space](https://cloud.google.com/confidential-computing/confidential-vm/docs/about-cvm#confidential-space) powered by Google.

When the Docker container for the UID2 Operator Confidential Space starts up, it does the following:

1. Fetches the OpenID Connect (OIDC) token from the shared mount volume.
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

- [Confidential Space Account Setup](#confidential-space-account-setup).
- [UID2 Operator Account Setup](#uid2-operator-account-setup).

### Confidential Space Account Setup

You can run the UID2 Operator service on any GCP account and project. However, to support attestation, you'll need to create a service account that you can use to run Confidential Space virtual machines (VMs), and then grant specific permissions to the account.

to set up and configure the account, go to [Google Cloud Console](https://console.cloud.google.com/) and complete the following steps.

These steps use placeholder values for the following: `PROJECT_ID`, `SERVICE_ACCOUNT_NAME`. (**GWH_YS02 where do they get these values from? Is it just their choice**)

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

### UID2 Operator Account Setup
Ask your UID2 contact to register your organization as a UID2 Operator. If you're not sure who to ask, see [Contact Info](../getting-started/gs-account-setup.md#contact-info).

(**GWH_YS03 what information do they need to provide for registration? In case you don't know, who should I ask?**)

When the registration process is complete, you'll receive the following:

 - `{IMAGE_SHA}`: A valid UID2 operator image digest, used in configuration. For details, see [Integration Deployment](#integration-deployment) and  [Production Deployment](#production-deployment).
 - `{API_TOKEN}`: An API token, exclusive to you, that identifies you with the UID2 service as a private operator. This value is used in configuration. For details, see [Integration Deployment](#integration-deployment) and  [Production Deployment](#production-deployment).

(**GWH_YS04 what exactly do we send them? Is there more than the above? GEN TO REVIEW THE RECORDING BEFORE ASKING THIS ALSO: do they use the same value for integ and prod? Or do they get separate values? We should be clear about that**)

When registration is complete, and your Confidential Space account is set up, it's time to download the Docker build and set up your GPC Confidential Space enclave.


## Build

To run UID2 Operator on a GCP Confidential Space enclave, download the official Docker image from the following Google Container Registry location:

- [ghcr.io/iabtechlab/uid2-operator](ghcr.io/iabtechlab/uid2-operator) (**GWH_YS05 this redirects to https://github.com/iabtechlab/uid2-operator/pkgs/container/uid2-operator. Should I use that?**)

For example:

```
docker pull ghcr.io/iabtechlab/uid2-operator
```

You can use the following command to build a non-certified UID2 operator container image from the source code:

```
# From the root source folder
# Update project version in pom to "1.0.0-SNAPSHOT"

mvn -B package -P gcp 
cp -r target scripts/gcp-oidc/
docker build ./scripts/gcp-oidc/. -t ghcr.io/iabtechlab/uid2-operator:v1.0.0-SNAPSHOT
```
## Deploy

(**GWH_YS06 is there something re can say re when they deploy integ versus production? Do they do integ then production? Do they generally have both, or transition one to the other? Some general info would be helpful.**)

The following environments are available:

- Integration environment: see [Integration Deployment](#integration-deployment)
- Production environment: see [Production Deployment](#production-deployment)

### Integration Deployment

To deploy a new UID2 Operator in the GCP Confidential Space Enclave into the integration environment, follow these steps.

#### (For uid2 admin) Register Enclave ID in the Admin Portal

1. Log in to the Admin Portal.

2.  Go to the [GCP Enclave ID page](https://admin-integ.uidapi.com/adm/enclave-gcp-v2.html) and provide the following values to generate the Enclave ID: (**GWH_YS07 I cannot access this URL. Sure it's valid?**)
    - The full digest for the image, with or without "sha256:".(**GWH_YS08 do we need the quotes and the colon on sha256?**)
    - Environment: `Production` or `Integration`.
    - Debug mode: `True` or `False`. (**GWH_YS09 Do they have to click any buttons or anything to generate the ID? (I can't get to this page)**)
    
      NOTE: Debug mode is only available in the integration environment. In Production, `False` is the only valid value.

3. Save the `GCP Enclave ID` for use in the next step.

2. Go to the [Enclave ID Management page](https://admin-integ.uidapi.com/adm/enclave-id.html) and provide the following values to register the GCP Enclave ID that you just generated:
    - Name: enclave name
    - Protocol: `gcp-oidc`
    - Enclave ID: the `GCP Enclave ID` value that was generated in Step 2.

(**GWH_YS10 I guess we don't need the above instructions but if so I need to clarify. For integration deployment does the partner ONLY do the below? Or do we have to do the above first, and if so, how does the partner know when we've done it? Not sure how it all fits together for the onboarding process.**)

#### Create VM Instance 
<!-- (for partner only) -->

To create a VM instance, run the following, using your own valid values instead of the following placeholders:

| Placeholder | Actual Value |
| :--- | :--- |
| `{INSTANCE_NAME}` | Your own valid VM name. |
| `{SERVICE_ACCOUNT}` | The value you provided during account creation, in this format: `{SERVICE_ACCOUNT_NAME}@{PROJECT_ID}.iam.gserviceaccount.com`.<br/>For details, see [Confidential Space Account Setup](#confidential-space-account-setup) (Step 4). |
| `{IMAGE_SHA}` | The SHA for your UID2 operator image digest, received during your UID2 account setup.<br/>For details, see [UID2 Operator Account Setup](#uid2-operator-account-setup). |
| `{API_TOKEN}` | Your UID2 `api_token` value, received during your UID2 account setup, which identifies the private operator service.<br/>For details, see [UID2 Operator Account Setup](#uid2-operator-account-setup). |

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

(**GWH_YS11 Is there any info we can provide re the results of running the above, how they can make sure it was successful?**)

### Production Deployment

To deploy a new UID2 Operator in the GCP Confidential Space Enclave into the integration environment, follow these steps.

(**GWH_YS12 if we're not including the Integ steps I should put all the steps here.**)

You will be provided a new `{API_TOKEN}`, and `~tee-env-DEPLOYMENT_ENVIRONMENT=integ~` needs to be changed to
`~tee-env-DEPLOYMENT_ENVIRONMENT=prod~`. (**GWH_YS13 re "you will be provided a new API token... when they request the account are they given both? If not, when should they request the prod API token? That isn't covered.**)

We recommend that you also specify the machine type in the gcloud script. The default value is `n2d-standard-2`; we recommend that you run the UID2 operator on a machine type of `n2d-standard-16`. (**GWH_YS14 is machine type something they might need to set up as part of the Google account setup? If so we should specify this info re machine type in the earlier section.**)

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

>NOTE: This script includes an additional option not used in the script for the integration environment, `--machine-type n2d-standard-16`. By specifying this value you can make sure that the production deployment of UID2 Operator runs on the recommended machine type that matches the production configuration.

## Upgrade

When a new version of UID2 Google Cloud Platform Confidential Space is released, private operators are informed via email. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported.

If you're upgrading to a new version, update the `{IMAGE_SHA}` in your configuration ([Integration Deployment](#integration-deployment) and/or [Production Deployment](#production-deployment)) to the new value.

(**GWH_YS15 1: where will they get a new `{IMAGE_SHA}` value from? What's the process? Earlier we said "You should have received this from UID2 team." and here we are not saying request anything from the UID2 team, so there is something missing on the process. 2: Is there really nothing else needed for upgrade, just update that one value? No other steps at all?**)
