---
title: UID2 Private Operator for Azure Integration Guide
sidebar_label: Microsoft Azure
pagination_label: UID2 Private Operator for Azure Integration Guide
description: Integration information for Private Operator in Microsoft Azure.
hide_table_of_contents: false
sidebar_position: 18
---

# UID2 Private Operator for Azure Integration Guide

This guide provides information for setting up the UID2 Operator Service in a [Confidential Container](https://learn.microsoft.com/en-us/azure/confidential-computing/confidential-containers), a confidential computing option from Microsoft Azure. Confidential containers run in a hardware-backed Trusted Execution Environment (TEE) that provides intrinsic capabilities such as data integrity, data confidentiality, and code integrity.

When the Docker container for the UID2 Operator Confidential Container starts up, it completes the attestation process that allows the UID2 Core Service to verify the authenticity of the Operator Service and the enclave environment that the Operator Service is running in.

When the attestation is successful, the UID2 Core Service provides seed information such as salts and keys to bootstrap the UID2 Operator in the secure UID2 Operator Confidential Container.

>NOTE: UID2 Private Operator for Azure is not supported in these areas: Europe, China.

<!-- 
* [Prerequisites](#prerequisites)
   - [Complete UID2 Operator Account Setup](#complete-uid2-operator-account-setup)
   - [Install Azure CLI](#install-azure-cli)
   - [Get the Required Azure Permissions](#install-azure-cli)
* [Deployment](#deployment)
  - [Download UID2 Private Operator for Azure ZIP File](#download-uid2-private-operator-for-azure-zip-file)
  * [Create Resource Group](#create-resource-group)
  * [Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup)
  * [Set Up the VPC Network](#set-up-the-vpc-network)
  * [Complete the Operator Setup](#complete-the-operator-setup)
  * [Set Up Gateway Load Balancer](#set-up-gateway-load-balancer)
* [Running the Health Check](#running-the-health-check)
* [Upgrading](#upgrading)
 -->

## Prerequisites

Before deploying the UID2 Private Operator for Azure, complete these prerequisite steps:

- [Complete UID2 Operator Account Setup](#complete-uid2-operator-account-setup)
- [Install Azure CLI](#install-azure-cli)
- [Get the Required Azure Permissions](#install-azure-cli)

### Complete UID2 Operator Account Setup

Ask your UID2 contact to register your organization as a UID2 Operator. If you're not sure who to ask, see [Contact Info](../getting-started/gs-account-setup.md#contact-info).

When the registration process is complete, you'll receive the following:

- An operator key, exclusive to you, that identifies you with the UID2 service as a private operator. During configuration, use this as the value for `OPERATOR_KEY`. This value is both your unique identifier and a password; store it securely and do not share it.

  >NOTE: You'll receive a separate operator key for each deployment environment.

- A link to the Azure enclave GitHub release page. For example: [https://github.com/IABTechLab/uid2-operator/releases/tag/v5.20.39-SNAPSHOT-azure-cc](https://github.com/IABTechLab/uid2-operator/releases/tag/v5.20.39-SNAPSHOT-azure-cc).

### Install Azure CLI

Install the Azure command-line interface (Azure CLI), following the instructions in [How to install the Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) from Microsoft.

### Get the Required Azure Permissions

You'll need to have subscription owner permission so that you can create a resource group.

When that's done, you only need to have contributor permission on that resource group level.

For details, see [Azure Roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles#azure-roles) in the Microsoft documentation.

When all prerequisite steps are complete, you're ready to deploy the UID2 Private Operator.

{**GWH_YS: Do we need anything about deployment environments?**}


## Deployment

To deploy a new UID2 Private Operator for Azure, follow these steps:

- [Download UID2 Private Operator for Azure ZIP File](#download-uid2-private-operator-for-azure-zip-file)
- [Create Resource Group](#create-resource-group)
- [Complete Key Vault and Managed Identity Setup](#complete-key-vault-and-managed-identity-setup)
- [Set Up the VPC Network](#set-up-the-vpc-network)
- [Complete the Operator Setup](#complete-the-operator-setup)
- [Set Up Gateway Load Balancer](#set-up-gateway-load-balancer)

### Download UID2 Private Operator for Azure ZIP File and Extract Files

In the Azure Enclave GitHub release page that you were given after completing your UID2 account setup (see [Complete UID2 Operator Account Setup](#complete-uid2-operator-account-setup)), locate and download the ZIP file containing the files you'll need for your deployment. The ZIP file is named according to the following convention:

```
uid2-operator-deployment-artifacts-{VERSION_NUMBER}-azure-cc.zip
```

Unzip the `uid2-operator-deployment-artifacts-{VERSION_NUMBER}-azure-cc.zip` file to extracts the following files which you will use for the deployment:

- `vault.json` and `vault.parameters.json`

- `vnet.json` and `vnet.parameters.json`

- `operator.json` and `operator.parameters.json`

- `gateway.json` and `gateway.parameters.json`

### Create Resource Group

In Azure, run the following command to create a resource group to run the UID2 operator:

```
az  group create --name {RESOURCE_GROUP_NAME} --location {LOCATION}
```

All the resources are provisioned later under the name you provide as the {RESOURCE_GROUP_NAME} value.

There are some limitations with regard to location:
- UID2 Private Operator for Azure is not supported in these areas: Europe, China.

- For Azure virtual network deployment availability, check [Linux container groups](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-region-availability#linux-container-groups) in the Microsoft documentation. You can only deploy to regions with the **Confidential SKU** column set to **Y** in the table.

(**GWH_YS per this column they cannot deploy to Australia... is that correct? Just checking. There are a lot of "N" values in that table!**)

### Complete Key Vault and Managed Identity Setup

In this section we will set up a [key vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) and save the operator key in it.

We will also create a [managed identity](https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview) and grant it permission to access the created key vault.

Later ACIs will launch as this identity.

Below are the setup steps:

1. Update the vault.parameters.json file.

Required:

vaultName: the name of Key Vault for hosting the operator key secret. This name has to be globally unique.

operatorKeyValue: the OPERATOR_KEY secret value, you should have received from UID2 team. Remember this value is unique to you and should be protected like a password.

Optional (In most cases you don’t need to update these parameters, we will provide default value):

operatorIdentifier: the name of the managed identity that will launch the container. Defaults to “uid-operator”

operatorKeyName: the operator key secret name. Defaults to “uid-operator”

2. Run the following command:

```
az deployment group create --name vault --resource-group {RESOURCE_GROUP_NAME} --parameters vault.parameters.json  --template-file vault.json
```

### Set Up the VPC Network

In this section we will set up the VPC network.

The following diagram illustrates the virtual private cloud that hosts private operators.

**GWH FILL IN DIAGRAM HERE**

Below are the setup steps:

1.    Update the vnet.parameters.json file.

Optional (In most cases you don’t need to update these parameters, we provide default values):

vnetName: the virtual network name. Defaults to "unified-id-network"

computeSubnetName: the name of the subnet that runs the UID2 Operator. Defaults to “unified-id-subnet-operators”

gatewaySubnetName: the name of the subnet that runs the UID2 Gateway. Defaults to “unified-id-subnet-gateway”

VnetAddressPrefix: the vnet address prefix. Default to “10.0.0.0/20”

computeSubnetPrefix: the vnet address prefix of the subnet that is delegated to run the UID2 Operator. Defaults to “10.0.0.0/24”

gatewaySubnetPrefix: the vnet address prefix of the subnet that runs the UID2 Gateway. Defaults to “10.0.0.0/28”

2. Run the commands below:

az deployment group create --name vnet --resource-group {RESOURCE_GROUP_NAME} --parameters vnet.parameters.json  --template-file vnet.json

### Complete the Operator Setup

In this section we will bring up multiple Azure container instances in created VPC sub network.

Below are the setup steps:

1.    Update the operator.parameters.json file.

In most cases you don’t need to update these parameters.

Required:

vaultName: the name of Key Vault for hosting the operator key secret. Must be same as you created in Step “Key vault & Managed identity setup”

operatorKeyName: the operator key secret name. Must be same as you created in Step “Key vault & Managed identity setup”

deploymentEnvironment: “integ” for integration environment, “prod” for production environment.

Optional (In most cases you don’t need to update these parameters, we will provide default value):

operatorIdentifier: the name of the managed identity that will launch the container. Must be same as you created in Step “Key vault & Managed identity setup”

vnetName: the virtual network name. Must be same as you created in Step “Network setup”

computeSubnetName: the name of subnet that runs Operator. Must be same as you created in Step “Network setup”

count: the instance count you want to bring up. Defaults to 2.

2. Run the commands below to deploy ACIs:

```
az deployment group create --name operator --resource-group {RESOURCE_GROUP_NAME} --parameters operator.parameters.json  --template-file operator.json
```

3.Get the IPs of created ACI instances

```
az deployment group show -g {RESOURCE_GROUP_NAME} -n operator --query properties.outputs
```

You should see output like below:

```
{ "ipAddress": { "type": "Array", "value": [ "10.0.0.6", "10.0.0.5", "10.0.0.4" ] } }
```

### Set Up Gateway Load Balancer

In this section we will set up the [Gateway Load Balancer](https://learn.microsoft.com/en-us/azure/load-balancer/gateway-overview).

The load balancer will use private IPs of those ACIs as backend pool.

Below are the setup steps:

1.    Update the gateway.parameters.json file.

Required:

containerGroupIPs: the IPs of ACIs. The output of Setup “Operator setup”

Optional (In most cases you don’t need to update these parameters, we will provide default value):

vnetName: the virtual network name. Must be same as you created in Step “Network setup”

gatewaySubnetName: the name of subnet that runs Gateway. Must be same as you created in Step “Network setup”



2. Run the commands below:

```
az deployment group create --name gateway --resource-group {RESOURCE_GROUP_NAME} --parameters gateway.parameters.json  --template-file gateway.json

```

3.You can get the public IP of the Gateway Load Balancer by running the following command:

```
az deployment group show -g {RESOURCE_GROUP_NAME} -n gateway--query properties.outputs
```

You should see output like below:

```
{ "gatewayIP": { "type": "String", "value": "20.163.172.56" } }

```

NOTE: If you update the container, the Azure backend pool is not automatically updated with the IP address for the new container. See https://learn.microsoft.com/en-us/azure/architecture/web-apps/guides/networking/automation-application-gateway for azure recommended solutions. 

Note: here we will deploy a Gateway Load Balancer with http. We suggest you follow this link to set up SSL.

## Running the Health Check

Call the health check endpoint to test the health of your implementation.

Running the health check is the same for the integration and production environments, except for the endpoints.

To test operator status, in your browser, go to the following URL: `http://{LB_IP}/ops/healthcheck`.

An HTTP 200 with a response body of OK indicates healthy status.

## Upgrading

When a new version of UID2 Azure Confidential Container is released, private operators receive an email notification of the update, with a new release link. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported.

To upgrade, complete the following steps:

(**GWH_YS_01 Two things 1) don't we first need to tell them to download the new file? 2) And, Step 1 below says "new ARM file" but the download was a ZIP file**)

1. Follow the instructions in [Complete the Operator Setup](#complete-the-operator-setup) with new ARM file in release page to deploy ACIs with new versions.

1. Follow the instructions in [Set Up Gateway Load Balancer](#set-up-gateway-load-balancer) to add the new ACIs to the backend pool.

1. Check the health of the new ACIs and make sure the status is healthy, as shown in the following example:

   ```
   az network application-gateway show-backend-health --resource-group {RESOURCE_GROUP_NAME} --name uid-operator-gateway
   ```

(GWH_YS: below says re-Run step “LB setup” but there was nothing with that title, only "Gateway Load Balancer setup " mentioned in Step 2. Do they need to run that same step again for the below? I think it must be but making sure. )

1. Clean up old ACIs from the load balancer: Follow the instructions in [Set Up Gateway Load Balancer](#set-up-gateway-load-balancer) to remove the old ACIs from backend pool.

1. Shut down old ACIs by running the following command:

   ```
   for i in {0..COUNT}; az container delete --name uid-operator-OLD-VERSION-$i --resource-group {RESOURCE_GROUP} --yes
   ```
