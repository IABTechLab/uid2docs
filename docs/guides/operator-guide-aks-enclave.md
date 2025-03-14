---
title: UID2 Private Operator for AKS Integration Guide
sidebar_label: AKS
pagination_label: UID2 Private Operator for AKS Integration Guide
description: Integration information for Private Operator in AKS.
hide_table_of_contents: false
sidebar_position: 18
---

import Link from '@docusaurus/Link';
import ReleaseMatrix from '../snippets/_private-operator-release-matrix.mdx';

# UID2 Private Operator for AKS Integration Guide

The UID2 Operator is the API server in the UID2 ecosystem. For details, see [The UID2 Operator](../ref-info/ref-operators-public-private.md).

This guide provides information for setting up the UID2 Operator Service as a <Link href="../ref-info/glossary-uid#gl-private-operator">Private Operator</Link> in an AKS cluster, [running on virtual nodes on Azure Container Instances](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-virtual-nodes). Virtual nodes on Azure Container Instances enable us to take advantage of confidential container, which run in a hardware-backed Trusted Execution Environment (TEE) that provides intrinsic capabilities such as data integrity, data confidentiality, and code integrity. 

When the Docker container for the UID2 Operator Confidential Container instance starts up, it completes the attestation process that allows the UID2 Core Service to verify the authenticity of the Operator Service and the enclave environment that the Operator Service is running in.

When the attestation is successful, the UID2 Core Service provides seed information such as salts and keys to bootstrap the UID2 Operator in the secure UID2 Operator Confidential Containers instance.

:::caution
UID2 Private Operator for AKS is not supported in these areas: Europe, China.
:::

## Prerequisites

Before deploying the UID2 Private Operator for AKS, complete these prerequisite steps:

- [Set Up UID2 Operator Account](#set-up-uid2-operator-account)
- [Install Azure CLI](#install-azure-cli)
- [Get the Required Azure Permissions](#install-azure-cli)
- [Install kubectl CLI](#install-kubectl-cli)
- [Install Helm CLI](#install-helm-cli)

### Set Up UID2 Operator Account

Ask your UID2 contact to register your organization as a UID2 Operator. If you're not sure who to ask, see [Contact Info](../getting-started/gs-account-setup.md#contact-info).

When the registration process is complete, you'll receive an operator key, exclusive to you, that identifies you with the UID2 service as a Private Operator. During configuration, use this as the value for `OPERATOR_KEY`. This value is both your unique identifier and a password; store it securely and do not share it.

:::note
You'll receive a separate operator key for each deployment environment.
:::

### Install Azure CLI

Install the Azure command-line interface. For details, see [How to install the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) in the Azure documentation.

### Get the Required Azure Permissions

You'll need to have subscription owner permission so that you can create a resource group.

When that's done, you only need contributor permission on the resource group level for that resource.

For details, see [Azure roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles#azure-roles) in the Azure documentation.

When all prerequisite steps are complete, you're ready to deploy the UID2 Private Operator. See [Deployment](#deployment).

### Install kubectl CLI

Install the `kubectl` command-line interface. For details, see [Install Tools](https://kubernetes.io/docs/tasks/tools/) in the Kubernetes documentation.

### Install Helm CLI

Install the `helm` command-line interface. For details, see [How to install the Helm CLI](https://helm.sh/docs/intro/install/) in the Helm documentation.

## Deployment Environments

The following environments are available. As a best practice, we recommend that you test and verify your implementation in the integration environment before deploying in the production environment.

:::note
You'll receive separate `{OPERATOR_KEY}` values for each environment. Be sure to use the correct key for the environment you're using. The deployment artifacts and the process flow are the same for both environments.
:::

| Environment | Details |
| :--- | :--- |
| Integration (`integ`) | For testing only. Debug mode is available in the integration environment. |
| Production (`prod`) | For managing production traffic. |

## Deployment

To deploy a new UID2 Private Operator for AKS, you'll need to complete the following high-level steps:

- [Download ZIP File and Extract Files](#download-zip-file-and-extract-files)
- [Operator Version](#operator-version)
- [Prepare Environment Variables](#prepare-environment-variables)
- [Setup AKS and Node Pool](#setup-aks-and-node-pool)
- [Setup AKS Cluster](#setup-aks-cluster)
- [Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup)
- [Complete the UID2 Private Operator Setup](#complete-the-uid2-private-operator-setup)

### Download ZIP File and Extract Files

The first step is to get set up with the deployment files you'll need:

1. Download the ZIP file linked in the following table, AKS Download column, for the latest version. 

1. Unzip the ZIP file to extract the following files, needed for the deployment:

   - `operator.yaml`

### Operator Version

The latest ZIP file is linked in the AKS Download column in the following table.

<ReleaseMatrix />

### Prepare Environment Variables
Run below commands to prepare environment variables that will be used in the following commands. Change the name to suit your needs.
```
export RESOURCE_GROUP="my-vn-aks"
export LOCATION="eastus"
export VNET_NAME="my-vnet"
export PUBLIC_IP_ADDRESS_NAME="my-public-ip"
export NAT_GATEWAY_NAME="my-nat-gateway"
export AKS_CLUSTER_NAME="myvncluster"
export KEYVAULT_NAME="my-vn-aks-vault"
export KEYVAULT_SECRET_NAME="my-vn-aks-opr-key-name"
export MANAGED_IDENTITY="my-vn-aks-opr-id"
export AKS_NODE_RESOURCE_GROUP="MC_${RESOURCE_GROUP}_${AKS_CLUSTER_NAME}_${LOCATION}"
export SUBSCRIPTION_ID="$(az account show --query id --output tsv)"
export DEPLOYMENT_ENV="integ"
```

### Setup AKS and Node Pool
#### Create Resource Group
In Azure, run the following command to create a resource group to run the UID2 operator:

```
az group create --name "${RESOURCE_GROUP}" --location "${LOCATION}"
```

:::info
All the resources are provisioned later under the name you provide as the `${RESOURCE_GROUP}` value.
:::

There are some limitations with regard to location:
- UID2 Private Operator for AKS is not supported in these areas: Europe, China.

- For Azure virtual network deployment availability, check [Linux container groups](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-resource-and-quota-limits#confidential-container-resources-preview) in the Azure documentation to confirm the availability of Confidential Containers regional support.

- To get the alias for the location, run the following command:

```
az account list-locations -o table
```

#### Create Virtual Network
```
az network vnet create \
    --resource-group ${RESOURCE_GROUP} \
    --name ${VNET_NAME} \
    --location ${LOCATION} \
    --address-prefixes 10.0.0.0/8
```

#### Create Subnets
```
# Default Subnet (10.0.0.0/24)
az network vnet subnet create \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name default \
    --address-prefixes 10.0.0.0/24

# AKS Subnet (CIDR /16)
az network vnet subnet create \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name aks \
    --address-prefixes 10.1.0.0/16

# Container Groups Subnet (CIDR /16) with Delegation
az network vnet subnet create \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name cg \
    --address-prefixes 10.2.0.0/16 \
    --delegations Microsoft.ContainerInstance/containerGroups
```

#### Create Public IP Address
```
az network public-ip create --name ${PUBLIC_IP_ADDRESS_NAME} --resource-group ${RESOURCE_GROUP} --sku standard --allocation static
```

#### Create NAT Gateway
```
az network nat gateway create \
    --resource-group ${RESOURCE_GROUP} \
    --name ${NAT_GATEWAY_NAME} \
    --public-ip-addresses ${PUBLIC_IP_ADDRESS_NAME} \
    --idle-timeout 4
```

#### Configure NAT service for source subnet
```
az network vnet subnet update \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name cg \
    --nat-gateway ${NAT_GATEWAY_NAME}
```

#### Get the AKS Subnet ID
```
export AKS_SUBNET_ID=$(az network vnet subnet show \
    --resource-group ${RESOURCE_GROUP} \
    --vnet-name ${VNET_NAME} \
    --name aks \
    --query id \
    --output tsv)
```

#### Create an AKS Service
```
# Create the AKS cluster
az aks create \
    --resource-group ${RESOURCE_GROUP} \
    --name ${AKS_CLUSTER_NAME} \
    --location ${LOCATION} \
    --kubernetes-version 1.29.13 \
    --network-plugin azure \
    --network-policy calico \
    --vnet-subnet-id ${AKS_SUBNET_ID} \
    --service-cidr 10.4.0.0/16 \
    --dns-service-ip 10.4.0.10 \
    --node-vm-size Standard_D4d_v5 \
    --node-count 2 \
    --enable-cluster-autoscaler \
    --min-count 2 \
    --max-count 5 \
    --auto-upgrade-channel patch \
    --enable-managed-identity \
    --nodepool-name oprnodepool \
    --os-sku Ubuntu
```

#### Get Managed Identity Principal ID
```
export MANAGED_IDENTITY_PRINCIPAL_ID="$(az aks show --resource-group ${RESOURCE_GROUP} --name ${AKS_CLUSTER_NAME} --query "identityProfile.kubeletidentity.clientId" --output tsv)"
```

#### Create contributor role for the two resource groups
```
az role assignment create \
  --assignee ${MANAGED_IDENTITY_PRINCIPAL_ID} \
  --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${AKS_NODE_RESOURCE_GROUP} \
  --role Contributor

az role assignment create \
  --assignee ${MANAGED_IDENTITY_PRINCIPAL_ID} \
  --scope /subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP} \
  --role Contributor
```

Doc Reference:
- [Tutorial: Deploy virtual nodes on Azure Container Instances in your Azure Kubernetes Service cluster](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-tutorial-virtual-nodes-helm)
- [Setting up a virtual node Environment](https://github.com/microsoft/VirtualNodesOnAzureContainerInstances?tab=readme-ov-file#setting-up-a-virtual-node-environment)

### Setup AKS Cluster
```
az aks get-credentials --name ${AKS_CLUSTER_NAME} --resource-group ${RESOURCE_GROUP}

az provider register -n Microsoft.ContainerInstance

git clone git@github.com:microsoft/virtualnodesOnAzureContainerInstances.git

helm install virtualnode virtualnodesOnAzureContainerInstances/Helm/virtualnode
 
# Wait for ~1 minute for virtualnode-0 to appear.
kubectl get nodes
```

### Complete Key Vault and Managed Identity Setup

The next step is to set up a [key vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) and save the operator key in it.

When you've created the key vault, you can create a [managed identity](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) and grant it permission to access the key vault.

Later [AKS cluster will launch as this identity](https://github.com/microsoft/virtualnodesOnAzureContainerInstances/blob/main/Docs/PodCustomizations.md#running-pods-with-an-azure-managed-identity).

Follow these steps:
```
az identity create --name "${MANAGED_IDENTITY}" --resource-group "${RESOURCE_GROUP}" --location "${LOCATION}"

az keyvault create --name "${KEYVAULT_NAME}" --resource-group "${RESOURCE_GROUP}" --location "${LOCATION}" --enable-purge-protection --enable-rbac-authorization

export KEYVAULT_RESOURCE_ID="$(az keyvault show --resource-group "${RESOURCE_GROUP}" --name "${KEYVAULT_NAME}" --query id --output tsv)"

az keyvault secret set --vault-name "${KEYVAULT_NAME}" --name "${KEYVAULT_SECRET_NAME}" --value "<some value>"

export IDENTITY_PRINCIPAL_ID="$(az identity show --name "${MANAGED_IDENTITY}" --resource-group "${RESOURCE_GROUP}" --query principalId --output tsv)"

az role assignment create --assignee-object-id "${IDENTITY_PRINCIPAL_ID}" --role "Key Vault Secrets User" --scope "${KEYVAULT_RESOURCE_ID}" --assignee-principal-type ServicePrincipal
```

### Complete the UID2 Private Operator Setup

#### Update Placeholder Values
After running previous steps, you can get the managed identity ID by running:
```
MANAGED_IDENTITY_ID=$("az identity show --name "${MANAGED_IDENTITY}" --resource-group "${RESOURCE_GROUP}" --query id --output tsv")
```
Update the `microsoft.containerinstance.virtualnode.identity` value in `operator.yaml` file with above value:
```
sed -i "s#IDENTITY_PLACEHOLDER#$MANAGED_IDENTITY_ID#g" "operator.yaml"
```
Update the Vault Key and Secret names with the environment variables:
```
sed -i "s#VAULT_NAME_PLACEHOLDER#$KEYVAULT_NAME#g" "operator.yaml"
sed -i "s#OPERATOR_KEY_SECRET_NAME_PLACEHOLDER#$KEYVAULT_SECRET_NAME#g" "operator.yaml"
sed -i "s#DEPLOYMENT_ENVIRONMENT_PLACEHOLDER#$DEPLOYMENT_ENV#g" "operator.yaml"
```

#### Deploy Operator
Retrieve the Kubernetes configuration credentials for the AKS cluster you just created:
```
az aks get-credentials --name ${AKS_CLUSTER_NAME} --resource-group ${RESOURCE_GROUP}
```

Once you have retrieved the Kubernetes configuration credentials, deploy the operator by running:
```
kubectl apply -f operator.yaml
```

## Running the Health Check

Call the health check endpoint to test the health of your implementation.

Running the health check is the same for the integration and production environments, except for the endpoints.

Follow these steps:

1. Get the public IP address for the service:
```
IP=$(az network public-ip list --resource-group ${AKS_NODE_RESOURCE_GROUP} --query "[?starts_with(name, 'kubernetes')].ipAddress" --output tsv)
```

2. To test operator status, in your browser, go to the health check endpoint: `http://${IP}/ops/healthcheck`.

   An HTTP 200 with a response body of `OK` indicates healthy status.

import AttestFailure from '../snippets/_private-operator-attest-failure.mdx';

<AttestFailure />

## Upgrading

When a new version of UID2 Azure AKS is released, private operators receive an email notification of the update, with a new release link. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported.

To upgrade, complete the following steps:

1. Follow the instructions in [Download ZIP File and Extract Files](#download-zip-file-and-extract-files) to download the deployment file for the new version and then unzip it.

2. Follow the instructions in [Complete the UID2 Private Operator Setup](#complete-the-uid2-private-operator-setup), using the new files, to deploy AKS deployment with new versions.

3. Check the health of the new AKS deployment and make sure the status is healthy.

4. Double check the old AKS pods are shut down properly:

   ```
   kubectl get pods
   ```
