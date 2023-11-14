---
title: UID2 Private Operator for Azure Integration Guide
sidebar_label: Microsoft Azure
pagination_label: UID2 Private Operator for Azure Integration Guide
description: Integration information for Private Operator in Microsoft Azure.
hide_table_of_contents: false
sidebar_position: 18
---

# UID2 Private Operator for Azure Integration Guide

This guide provides information for setting up the UID2 Operator Service in Confidential Container, a confidential computing option from Azure. Confidential containers run in a hardware backed Trusted Execution Environment (TEE) that provide intrinsic capabilities like data integrity, data confidentiality and code integrity.
|NOTE: UID2 Private Operator for Azure is not supported in these areas: Europe, China.

## Overview

When the Docker container for the UID2 Operator Confidential Container starts up, it completes the attestation process that allows the UID2 Core Service to verify the authenticity of the Operator Service and the enclave environment that the Operator Service is running in. 
When the attestation is successful, the UID2 Core Service provides seed information such as salts and keys to bootstrap the UID2 Operator in the secure UID2 Operator Confidential Container. 



## Prerequisites

1. Ask your UID2 contact to register your organization as a UID2 Operator. If you're not sure who to ask, see Contact Info. 
When the registration process is complete, you will receive an OPERATOR_KEY, and a link to Azure enclave GitHub release page (e.g. https://github.com/IABTechLab/uid2-operator/releases/tag/v5.20.39-SNAPSHOT-azure-cc , [TBD]). 
OPERATOR_KEY: An operator key, exclusive to you, that identifies you with the UID2 service as a private operator. Use this as the OPERATOR_KEY value during configuration. This value is both your unique identifier and a password; store it securely and do not share it. 
In GitHub release page, you can find below artifacts, which will be used by later deployment. 
uid2-operator-deployment-artifacts-5.20.39-SNAPSHOT-azure-cc.zip
 
2. Install Azure Cli: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli 
 
3. Azure Permission 
You need to have subscription owner permission to create resource group. 
Afterwards, you only need contributor permission on that resource group level. 
 
## Deployment

To deploy, complete the following steps:

1. Download deployment artifacts.

2. Create resource group.

3. Set up key value and save operator key to it.

4. Set up VPC network.
 
### Download deployment artifacts 

Download the deployment artifacts from the release page. E.g. https://github.com/IABTechLab/uid2-operator/releases/tag/v5.20.39-SNAPSHOT-azure-cc [TBD] 
Unzip uid2-operator-deployment-artifacts.zip file, the below files will be used in later sections: 
vault.json & vault.parameters.json 
vnet.json & vnet.parameters.json 
operator.json & operator.parameters.json 
gateway.json & gateway.parameters.json 
 
### Create Resource Group 
Run the commands below to create a resource group to run the UID2 operator 
az group create --name {RESOURCE_GROUP_NAME} --location {LOCATION} 
 
All the resources will be provisioned under this {RESOURCE_GROUP_NAME} later. 
For location, please note: UID2 Private Operator for Azure is not supported in these areas: Europe, China. 
Also check Resource availability by region - Azure Container Instances | Microsoft Learn 
 
### Set Up Key Vault and Save Operator Key
In this section we will set up a key vault and save the operator key in it. 
We will also create a managed identity and grant it permission to access the created key vault. 
Later ACIs will launch as this identity. 
 
Below are the setup steps: 
1. Update the vault.parameters.json file. 
Required: 
vaultName: the name of Key Vault for hosting the operator key secret. This name has to be globally unique. 
operatorKeyValue: the operator key secret value, you should have received from UID2 team 
Optional (In most cases you don’t need to update these parameters, we will provide default value): 
operatorIdentifier: the name of the managed identity that will launch the container. Defaults to “uid-operator” 
operatorKeyName: the operator key secret name. Defaults to “uid-operator” 
 
2. Run the following command: 
az deployment group create --name vault --resource-group {RESOURCE_GROUP_NAME} --parameters vault.parameters.json --template-file vault.json 
 
### Set Up VPC Network

In this section we will set up the VPC network. 
The following diagram illustrates the virtual private cloud that hosts private operators. 

(**GWH DIAGRAM HERE**)

Below are the setup steps: 
1. Update the vnet.parameters.json file. 
Optional (In most cases you don’t need to update these parameters, we will provide default value): 
vnetName: the virtual network name. Defaults to "unified-id-network" 
computeSubnetName: the name of subnet that runs Operator. Defaults to “unified-id-subnet-operators” 
gatewaySubnetName: the name of subnet that runs Gateway. Defaults to “unified-id-subnet-gateway” 
VnetAddressPrefix: the vnet address prefix. Default to “10.0.0.0/20” 
computeSubnetPrefix: the vnet address prefix of subnet that is delegated to run Operator. Defaults to “10.0.0.0/24” 
gatewaySubnetPrefix: the vnet address prefix of subnet that runs Gateway. Defaults to “10.0.0.0/28” 
 
2. Run the commands below: 
az deployment group create --name vnet --resource-group {RESOURCE_GROUP_NAME} --parameters vnet.parameters.json  --template-file vnet.json

## Implementation

To implement xxx, complete the following steps:

1. Set up operator.

2. Set up Azure Gateway load balancer.



 
### Set Up Operator
In this section we will bring up multiple Azure container instances in created VPC sub network. 
 
Below are the setup steps: 
1. Update the operator.parameters.json file. 
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
az deployment group create --name opeator --resource-group {RESOURCE_GROUP_NAME} --parameters operator.parameters.json  --template-file operator.json 
 
3. Get the IPs of created ACI instances 
az deployment group show -g {RESOURCE_GROUP_NAME} -n operator --query properties.outputs 
You should see output like below: 
{ "ipAddress": { "type": "Array", "value": [ "10.0.0.6", "10.0.0.5", "10.0.0.4" ] } } 
 
 
### Set up Azure Gateway Load Balancer
In this section we will set up Gateway load balancer. 
The load balancer will use private IPs of those ACIs as backend pool. 
 
Below are the setup steps: 
1. Update the gateway.parameters.json file. 
Required: 
containerGroupIPs: the IPs of ACIs. The output of Setup “Operator setup” 
Optional (In most cases you don’t need to update these parameters, we will provide default value): 
vnetName: the virtual network name. Must be same as you created in Step “Network setup” 
gatewaySubnetName: the name of subnet that runs Gateway. Must be same as you created in Step “Network setup” 
 
2. Run the commands below: 
az deployment group create --name gateway --resource-group {RESOURCE_GROUP_NAME} --parameters gateway.parameters.json  --template-file gateway.json 
 
3. You can get the public IP of Gateway Load Balancer from 
az deployment group show -g {RESOURCE_GROUP_NAME} -n gateway--query properties.outputs 
You should see output like below: 
{ "gatewayIP": { "type": "String", "value": "20.163.172.56" } } 
NOTE: Azure backend pool will not be automatically updated with new container IPs if containers update. See https://learn.microsoft.com/en-us/azure/architecture/web-apps/guides/networking/automation-application-gateway for azure recommended solutions.
 
## Running the Health Check 

To test the health of your implementation, call the health check endpoint.

Running the health check is the same for the integration and production environments, except for the endpoints. 
To test operator status, in your browser, go to http://{LB_IP}/ops/healthcheck. 
An HTTP 200 with a response body of OK indicates healthy status. 
 
## Upgrading 

When a new version of UID2 Azure Confidential Container is released, private operators receive an email notification of the update, with a new release link. There is a window of time for upgrade, after which the older version is deactivated and is no longer supported. 
You need to
Re-Run step “ACI setup” with new ARM file in release page to deploy ACIs with new versions. 
Re-Run step “LB setup” to add those new ACIs to backend pool. 
Ensure the new ACIs are showing success health 
az network application-gateway show-backend-health --resource-group {RESOURCE_GROUP_NAME} --name uid-operator-gateway 
Clean up old ACIs from LB: re-Run step “LB setup” to remove old ACIs from backend pool. 
Showdown old ACIs.
for i in {0..COUNT}; az container delete --name uid-operator-OLD-VERSION-$i --resource-group {RESOURCE_GROUP} --yes 
