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
 - docker pull gcr.io/uid2-316818/uid2-operator

You can use the following command to build a non-certified UID2 operator container image from source code:

```
scripts/gcp/build.sh gcr.io/uid2-316818/uid2-operator:v1.0.0-snapshot
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
cloud-init config for Integration Environment, and create a new Confidential VM that uses the cloud-init.

This section describes the deployment process.

### Input Variables

The following variables need to be replaced in the cloud-init config template
provided in the section below for running UID2 Operator enclave:

 - `<INPUT_API_TOKEN>` -- API token to connect to the Core service
 - `<INPUT_IMAGE_ID>` -- Digest id of the certified UID2 Operator container image to run
 - `<INPUT_DOCKER_PULL_CREDENTIAL>` -- Docker credential to pull

Search for '<INPUT_xxx>' in the template file below and replace with actual values.

Note that value for `api_token` can only be used with the designated UID2 Core environment
(core-integ.uidapi.com for deploying to Integration Environment), and cannot be used
against a different environment.

### cloud-init template

This is the cloud-init template to use for deploying UID2 Operator Enclave into
Integration Environment.

Once the variables in it are replaced with actual values, the file content should be provided
as custom metadata under the key `user-data` when creating the VM instance. This `user-data`
metadata will be read and interpreted by the Container-Optimized OS (COS) VM disk during
booting.

As shown in the template below, it first disables remote SSH access, and then tells
COS VM to docker pull certified UID2 operator docker image from UID2 project's official
Container Registry and run the UID2 operator container as a systemd service.

```
#cloud-config

bootcmd:
- iptables -D INPUT -p tcp -m tcp --dport 22 -j ACCEPT
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
    Environment="HOME=/run/uid2"
    ExecStartPre=mkdir -p /run/uid2/.config/gcloud
    ExecStartPre=sh -c 'base64 -d /run/uid2/docker-credential.txt > /run/uid2/.config/gcloud/application_default_credentials.json'
    ExecStartPre=/usr/bin/docker-credential-gcr configure-docker
    ExecStart=/usr/bin/docker run --rm --name uid2-operator -v /run/uid2/operator.json:/app/conf/config.json -e KUBERNETES_SERVICE_HOST=1 -e core_api_token=${UID2_ENCLAVE_API_TOKEN} -e optout_api_token=${UID2_ENCLAVE_API_TOKEN} -p 80:8080 gcr.io/uid2-316818/uid2-operator@sha256:${UID2_ENCLAVE_IMAGE_ID}
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
      "enclave_platform": "gcp-vmid",
      "enforce_https": true
    }
- path: /run/uid2/docker-credential.txt
  permission: 0644
  owner: root
  content: <INPUT_DOCKER_PULL_CREDENTIAL>
```

### Create VM Instance

Create a file called `./uid2-operator-integ.cloud-config.yaml`, using the above provided cloud-init
config template, make sure the 3 input variables in the template are all replaced with actual values.

Then, we can use the following `gcloud` command to create a GCP Confidential VM that uses the provided
cloud init config `./uid2-operator-integ.cloud-config.yaml` to run UID2 Operator.

```
$ gcloud compute instances create uid2-operator-test \
    --confidential-compute \
    --maintenance-policy Terminate \
    --image-family cos-stable \
    --image-project cos-cloud \
    --metadata-from-file user-data=./uid2-operator-integ.cloud-config.yaml
```

## Production Deployment

We can deploy new UID2 Operator in GCP VM Enclave into Production Environment by preparing a certified
cloud-init config for Production Environment, and create a new Confidential VM that uses the cloud-init.

This section describes the deployment process.

### Input Variables

The following variables need to be replaced in the cloud-init config template
provided in the section below for running UID2 Operator enclave:

- `<INPUT_API_TOKEN>` -- API token to connect to the Core service
- `<INPUT_IMAGE_ID>` -- Digest id of the certified UID2 Operator container image to run
- `<INPUT_DOCKER_PULL_CREDENTIAL>` -- Docker credential to pull

Search for '<INPUT_xxx>' in the template file below and replace with actual values.

Note that value for `api_token` can only be used with the designated UID2 Core environment
(core-prod.uidapi.com for deploying to Production Environment), and cannot be used
against a different environment.


### cloud-init template for core-prod.uidapi.com

This is the cloud-init template to use for deploying UID2 Operator Enclave into
Production Environment.

Once the variables in it are replaced with actual values, the file content should be provided
as custom metadata under the key `user-data` when creating the VM instance. This `user-data`
metadata will be read and interpreted by the Container-Optimized OS (COS) VM disk during
booting.

As shown in the template below, it first disables remote SSH access, and then tells
COS VM to docker pull certified UID2 operator docker image from UID2 project's official
Container Registry and run the UID2 operator container as a systemd service.

```
#cloud-config

bootcmd:
- iptables -D INPUT -p tcp -m tcp --dport 22 -j ACCEPT
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
    Environment="HOME=/run/uid2"
    ExecStartPre=mkdir -p /run/uid2/.config/gcloud
    ExecStartPre=sh -c 'base64 -d /run/uid2/docker-credential.txt > /run/uid2/.config/gcloud/application_default_credentials.json'
    ExecStartPre=/usr/bin/docker-credential-gcr configure-docker
    ExecStart=/usr/bin/docker run --rm --name uid2-operator -v /run/uid2/operator.json:/app/conf/config.json -e KUBERNETES_SERVICE_HOST=1 -e core_api_token=${UID2_ENCLAVE_API_TOKEN} -e optout_api_token=${UID2_ENCLAVE_API_TOKEN} -p 80:8080 gcr.io/uid2-316818/uid2-operator@sha256:${UID2_ENCLAVE_IMAGE_ID}
    ExecStop=/usr/bin/docker stop uid2-operator
    ExecStopPost=/usr/bin/docker rm uid2-operator
- path: /run/uid2/operator.json
  permissions: 0644
  owner: root
  content: |
    {
      "clients_metadata_path": "https://core-prod.uidapi.com/clients/refresh",
      "keys_metadata_path": "https://core-prod.uidapi.com/key/refresh",
      "keys_acl_metadata_path": "https://core-prod.uidapi.com/key/acl/refresh",
      "salts_metadata_path": "https://core-prod.uidapi.com/salt/refresh",
      "core_attest_url": "https://core-prod.uidapi.com/attest",
      "optout_metadata_path": "https://optout-prod.uidapi.com/optout/refresh",
      "optout_api_uri": "https://optout-prod.uidapi.com/optout/replicate",
      "optout_s3_folder": "optout-v2/",
      "optout_inmem_cache": true,
      "enclave_platform": "gcp-vmid",
      "enforce_https": true,
      "service_instances": 16
    }
- path: /run/uid2/docker-credential.txt
  permission: 0644
  owner: root
  content: <INPUT_DOCKER_PULL_CREDENTIAL>
```
### Using gcloud to create instance

Create a file called `./uid2-operator-prod.cloud-config.yaml`, using the above provided cloud-init
config template, make sure the 3 input variables in the template are all replaced with actual values.

Then, we can use the following `gcloud` command to create a GCP Confidential VM that uses the provided
cloud init config `./uid2-operator-prod.cloud-config.yaml` to run UID2 Operator.

```
$ gcloud compute instances create uid2-operator-test \
    --machine-type n2d-standard-16 \
    --confidential-compute \
    --maintenance-policy Terminate \
    --image-family cos-stable \
    --image-project cos-cloud \
    --metadata-from-file user-data=./uid2-operator-prod.cloud-config.yaml
```

Note that compared to the `gcloud` command used in the prior section, an additional option
`--machine-type n2d-standard-16` is added, which ensures production deployment of UID2 Operator runs on
the recommended machine type that matches the production configuration.
