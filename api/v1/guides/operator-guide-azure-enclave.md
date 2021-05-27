# Microsoft Azure Confidential Compute Operator package

UID2 Operator service can be run within a trusted computing enclave powered by Intel SGX technology.
The Operator codebase contains scripts to package the service such that it could be deployed to Azure
Kubernetes Service (AKS) -- recommended -- or run directly on an Azure VM (via docker or not).

Building and running SGX enclave is powered by [Occlum](https://github.com/occlum/occlum): an open
source LibOS implementation.

## Build

Pre-requisites:

 - You must run the build on an Intel SGX enabled machine; tested configuration is Standard_DC8_v2
   VM running on Azure
 - Operating system must be Ubuntu 18.04 LTS (recommended Azure Image is of the "Server" variant)
 - Once you have the machine up and running, launch `setup_build_vm.sh` from the `uid2-attestation-azure`
   repo to install the necessary dependencies
 - You have sudo permissions during the build

Make sure the operator service is built using the `azure` profile:

```
# From the root source folder
export enclave_platform=azure-sgx
./setup_dependencies.sh
mvn package -P azure
```

Next, while in the `scripts/azure` directory, choose one of the operator config files to include
in the enclave. The configs are available under `conf/` folder and you should omit the `-config.json`
suffix.

Build the enclave and the docker image and specify the config file to use. For example:

```
./build.sh prod
```

The build script will produce a few artifacts:

 - `dev.docker.adsrvr.org/uid2/operator/occlum:dev` -- docker image containing occlum and the UID2
   operator service enclave
 - `build/uid2-operator-azure-sgx.tar.gz` -- tarball of the docker image above
 - `build/uid2-operator/uid2-operator.tar.gz` -- tarball of the occlum enclave package
 - output of `sgx_quote` application within the container -- this verifies that the occlum enclave
   can be launched and gives you basic details about the enclave (MRSIGNER, MRENCLAVE, PRODID, SVN)

## Test Run

You can test run the built image locally on the build box:

 - `./run.sh` -- starts the operator service
 - `./run.sh occlum run /bin/sgx_quote` -- dump basic information about the enclave

## Deployment

### Configuration

The following environment variables need to be set for the Operator enclave (either via docker or via a k8s deployment):

 - `core_api_token` -- API token to connect to the Core service
 - `optout_api_token` -- API token to connect to the UID2 OptOut service

### AKS (recommended)

Prepare an AKS cluster and node pool(s) according to your organisation policies and make sure
to [enable confidential computing](https://docs.microsoft.com/en-us/azure/confidential-computing/confidential-nodes-aks-get-started).

Make the docker image available in your docker repository (e.g. Azure Container Service). For example:

```
cat uid2-operator-azure-sgx.tar.gz | docker import - uid20.azurecr.io/uid2/operator/occlum:0.2
docker push uid20.azurecr.io/uid2/operator/occlum:0.2
```

Craft the k8s deployment and service as required. You can use `uid2-operator-aks.yml` as an example.

**Important**: make sure that the operator image targets SGX enabled nodes (e.g. by specifying a resource limit
for `kubernetes.azure.com/sgx_epc_mem_in_MiB`).

Operator service is designed to run on Standard_DC8_v2 instances. Running on smaller nodes is not supported.
Running multiple operator service instances on same node is not supported.

### Docker (advanced, not recommended)

This is not a recommended practice, it may be useful only for testing purposes.

Make sure the host has Intel SGX DCAP driver installed and configured. Follow the steps from the AKS section
to make the operator docker image available for running.

Example of running the image:

```
docker run \
        --device /dev/sgx/enclave --device /dev/sgx/provision \
        -p 8080:8080 \
        -p 9091:9091 \
        dev.docker.adsrvr.org/uid2/operator/occlum:dev
```

### Direct invocation of occlum (advanced, not recommended)

You can also run the occlum enclave either from host VM or from your own docker image:

```
tar xvf uid2-operator.tar.gz
cd uid2-operator
occlum run /bin/launcher
```

Dockerfile under `scripts/azure` in the Operator codebase has full details on preparing the occlum enclave package for execution.
