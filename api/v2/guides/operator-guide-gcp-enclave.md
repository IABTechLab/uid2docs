# UID2 Operator - Google Cloud Platform Confidential Compute package

UID2 Operator service can be run within a trusted computing enclave powered by Google.
Scripts in this folder help to package the service.

UID2 Operator Enclave runs on Google Compute Platform in a
[Confidential VM](https://cloud.google.com/compute/confidential-vm/docs/about-cvm).
The enclave must use a [Container-Optimized OS](https://cloud.google.com/container-optimized-os/docs)
boot disk, which can be customized through the provided [cloud-init](https://cloudinit.readthedocs.io/)
config.

The cloud-init config will disable remote SSH access to the VM and allowing only the UID2 traffic
in and out. It also creates a systemd service that will docker pull certified UID2 operator docker
image from UID2 project's docker registry on GCP and starts the container.

When UID2 Operator's docker container starts up, it will obtain an
[Instance Document](https://cloud.google.com/compute/docs/instances/verifying-instance-identity) -
a unique JSON Web Token that includes details of the VM instance it is running on, as well as
Google's RS256 signature. It then sends the Instance Document plus the UID2 `api_token`
specified in the cloud-init config to UID2 Core as Attestation Request.

UID2 Core service receives Attestation Request, verifies `api_token` and Instance Document.
As part of Attestation Process for the operator, UID2 Core will also issue GCP API calls
to retrieve VM instance metadata, such as the boot disk, cloud-init config, and AuditLogs.

Once the attestation is successful, UID2 Core will provide seed information such as Salts,
and Keys, to bootstrap UID2 Operator.

## Build

The official Docker image to run UID2 Operator on GCP Confidential VM enclave can be
pulled from the following Google Container Registry location:
 - docker pull ghcr.io/iabtechlab/uid2-operator

You can use the following command to build a non-certified UID2 operator container image from source code:

```
scripts/gcp/build.sh ghcr.io/iabtechlab/uid2-operator:v1.0.0-snapshot
```

## Attestation Requirements

UID2 Operator can be run on any GCP account and project, however to support Attestation, it must grant several
permissions to the service account UID2 Core uses to issue the GCP API calls during Attestation.

The following permissions needs to be granted to UID2 Core for accessing resource metadata in the GCP account and project
that hosts UID2 Operator VM:
 - `compute.instances.get`, UID2 Core uses this permission to retrieve VM instance information, e.g. cloud-init config.
 - `compute.disks.get`, UID2 Core uses this permission to get details of VM boot disk.
 - `logging.logEntries.list`, UID2 Core uses this permission to list AuditLogs of the VM instance.

It is also possible to grant the following pre-defined GCP Roles to UID2 Core's service account,
which include the above required permissions:
 - `Compute Viewer`, this Role contains `compute.instances.get` and `compute.disks.get` permissions.
 - `Logs Viewer`, this Role contains `logging.logEntries.list` permission.

## Integration Deployment

We can deploy new UID2 Operator in GCP VM Enclave into Integration Environment by preparing a certified
cloud-init config for Integration or Production Environment, and create a new Confidential VM that uses the cloud-init.

This section describes the deployment process.

### Cloud-init.yaml file
During the registration process, you will be provided with a certified cloud-init-`<timestamp>`.yaml file. This file cannot be modified in any way as the sha256sum of the file is used as part of the attestation process. The contents of the file is discussed below, but the file is never created manually during the deployment process - it will always be created by IABTechLab during the process of setting up a new private operator.

Note that the cloud-init.yaml file is specific to an environment, so you will have one for the Integration Environment, and one for the Production environment.

### cloud-init example

This is the cloud-init template to use for deploying UID2 Operator Enclave into Integration Environment. This section discusses the contents of the file, but you must use the one provided during the registration process.

The file content should be provided as custom metadata under the key `user-data` when creating the VM instance. This `user-data`
metadata will be read and interpreted by the Container-Optimized OS (COS) VM disk during
booting.

As shown in the example below, it first disables remote SSH access, and then tells
COS VM to docker pull certified UID2 operator docker image from UID2 project's official
Container Registry and run the UID2 operator container as a systemd service.

```
#cloud-config

bootcmd:
- iptables -D INPUT -p tcp -m tcp --dport 22 -j ACCEPT
- iptables -A INPUT -p tcp -m tcp --dport 22 -j DROP
- systemctl mask --now serial-getty@ttyS0.service

runcmd:
- systemctl daemon-reload
- systemctl start uid2-operator.service

write_files:
- path: /etc/systemd/system/uid2-operator.service
  permissions: 0644
  owner: root
  content: |
    [Unit]
    Description=Start UID 2.0 operator as docker container

    [Service]
    Environment="UID2_ENCLAVE_API_TOKEN=<INPUT_API_TOKEN>"
    Environment="UID2_ENCLAVE_IMAGE_ID=<INPUT_IMAGE_ID>"
    Environment="GHCR_RO_ACCESS_TOKEN=<GHCR_TOKEN>"
    Environment="HOME=/run/uid2"
    ExecStartPre=mkdir -p /run/uid2/.config/gcloud
    ExecStartPre=docker login ghcr.io -u gcp-uid2-docker -p ${GHCR_RO_ACCESS_TOKEN}
    ExecStartPre=/usr/bin/docker-credential-gcr configure-docker
    ExecStart=/usr/bin/docker run --rm --name uid2-operator -v /run/uid2/operator.json:/app/conf/config.json -e KUBERNETES_SERVICE_HOST=1 -e core_api_token=${UID2_ENCLAVE_API_TOKEN} -e optout_api_token=${UID2_ENCLAVE_API_TOKEN} -p 80:8080 ghcr.io/iabtechlab/uid2-operator@sha256:${UID2_ENCLAVE_IMAGE_ID}
    ExecStop=/usr/bin/docker stop uid2-operator
    ExecStopPost=/usr/bin/docker rm uid2-operator
- path: /run/uid2/operator.json
  permissions: 0644
  owner: root
  content: |
    {
      "clients_metadata_path": "https://core-integ.uidapi.com/clients/refresh",
      "keys_metadata_path": "https://core-integ.uidapi.com/key/refresh",
      "keys_acl_metadata_path": "https://core-integ.uidapi.com/key/acl/refresh",
      "salts_metadata_path": "https://core-integ.uidapi.com/salt/refresh",
      "core_attest_url": "https://core-integ.uidapi.com/attest",
      "optout_metadata_path": "https://optout-integ.uidapi.com/optout/refresh",
      "optout_api_uri": "https://optout-integ.uidapi.com/optout/replicate",
      "optout_s3_folder": "optout-v2/",
      "optout_inmem_cache": true,
      "identity_token_expires_after_seconds": 14400,
      "refresh_token_expires_after_seconds": 2592000,
      "refresh_identity_token_after_seconds": 3600,
      "enclave_platform": "gcp-vmid",
      "enforce_https": true,
      "service_instances": 16,
      "allow_legacy_api": false
    }
```

### Create VM Instance

Copy the provided cloud-init-`<timestamp>`.yaml file into a temporary location, and run the given gcloud script file 
that was provided during the registration process from the same folder. This will create a new GCP Confidential VM that 
uses the correct VM image as well as the cloud-init file. 

An example of the gcloud script file is:

```
$ gcloud compute instances \
  create uid2-operator-gcp-01 \
  --confidential-compute \
  --maintenance-policy Terminate \
  --image https://www.googleapis.com/compute/v1/projects/cos-cloud/global/images/cos-stable-101-17162-40-56 \
  --metadata-from-file user-data=./cloud-init-1674598899.yaml \
  --tags http-server
```

The name of the VM (uid2-operator-gcp-01 in the example above) can be changed, but no other parameters can be changed, 
or attestation will fail. 

## Production Deployment

We can deploy new UID2 Operator in GCP VM Enclave into Production Environment by following the same process as for 
Integration.
You will need to be provided with a new instance of the cloud-init-`<timestamp>`.yaml. This will use your production 
API-Token as well as the production URLs for the core service. 
You will also be provided with a new gcloud script file, but it will only differ in the name of the cloud-init-`<timestamp>`.yaml 
file used.
It is recommended that you also specify the machine type in the gcloud script. Currently, it is recommended to run the
UID2 operator on a machine type of n2d-standard-16.
An example of the script is given below:


```
$ gcloud compute instances \
  create uid2-operator-gcp-01 \
  --machine-type n2d-standard-16 \
  --confidential-compute \
  --maintenance-policy Terminate \
  --image https://www.googleapis.com/compute/v1/projects/cos-cloud/global/images/cos-stable-101-17162-40-56 \
  --metadata-from-file user-data=./cloud-init-1674598899.yaml \
  --tags http-server

Note that compared to the `gcloud` command used in the prior section, an additional option
`--machine-type n2d-standard-16` is added, which ensures production deployment of UID2 Operator runs on
the recommended machine type that matches the production configuration.

## Upgrading

For each operator version update, private operators receive an email notification with an upgrade window, 
after which the old version is deactivated and no longer supported. 
To upgrade to the latest version, deploy the new cloud-init provided in the email in the same manner as the original operator.
