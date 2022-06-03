# UID2 Operator: Nitro Enclave

UID2 Operator within Nitro Enclave protects sensitive data, including PII. This guide explains how to deploy UID2 Operator AMI onto your AWS Auto-Scaling Group and to customize your UID2 Operator AMI:

1. [Create Launch Template](#create-launch-template)
2. [Create Auto-Scaling Group](#create-auto-scaling-group)
3. [Build Custom AMI](#build-custom-ami)
4. [Serve HTTPS](#serve-https)
5. [Change Listening Ports](#change-listening-ports)


## Create Launch Template

This section introduces one way you can deploy and run your UID2 Operator on AWS, given you have an official build AMI, or a [customized AMI](#build-custom-ami).

To create a launch template for auto-scaling group, follow the [AWS User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html), with the following setups:

1. During the creation of Launch Template, create instances with at least 64GB of memory (for example, m5.4xlarge) to support 30-day worth of optout entries.
2. In advance details, find the dropdown button for Enclave, and set to `_Enclave: true_`.
3. Move to User Data, provide a JSON with proper configuration parameters, for example:

```
{ 
  "api_token": "your-api-token",
  "service_instances": 8,
  "enclave_cpu_count": 8,
  "enclave_memory_mb": 40000
}
```

### Required Parameters

| Parameter | Data Type | Description|
|:--- | :---| :---|
|`api_token` |String| Your API token to serve as an UID2 operator. |
|`service_instances` | Integer|  The number of workers/threads the operator service can spawn, set according to the `CPU_COUNT` you allocate to enclave.|
|`enclave_cpu_count` | Integer| The number of CPUs you allocate for enclave. <br/>NOTE: If your instance uses vCPUs, allocate even number (2, 4, 6, and so on) and always keep at least 2 cores for the host, meaning if you have 12 cores, allocate maximum 10 cores for enclave. |
|`enclave_memory_mb` | Integer| Memory in MB you allocate for enclave. <br/>NOTE: Always leave at least 8GB memory for the host, meaning if you have 80G memory, allocate maximum 72G for enclave.|

### Optional Parameters

Other overridable User Data configurations at start time include the following.

| Parameter | Data Type | Description|
|:--- | :---| :---|
|`clients_metadata_path` |String|A URL that by default points to the production uid2-core service endpoint. Override it if you want to point to another UID2 core service for fetching client keys.  |
|`keys_metadata_path` |String|A URL that by default points to the production uid2-core service endpoint. |
|`salts_metadata_path` |String| A URL that by default points to the production uid2-core service endpoint.|
|`optout_metadata_path` |String| A URL that by default points to the production uid2-optout service endpoint.|
|`optout_api_uri` |String|A URL that by default points to the production uid2-optout service endpoint. |
|`optout_synthetic_logs_enabled` |Boolean|For internal testing use. |
|`optout_synthetic_logs_count` |Integer|For internal testing use. |
 

## Create Auto-Scaling Group

To create an auto-scaling group:

1. On the *EC2 auto scaling group* panel, click **Create an Auto Scaling Group**.
2. Select the [launch template](#create-launch-template) you have just created for UID2 operator.
3. Choose your network and subnets.
4. Create load balancer. For details, see [Serve HTTPS](#serve-https).
5. For healthcheck endpoint of UID2 Operator, you can use http://your-operator-node-ip:80/ops/healthcheck.

For more configurations, see [AWS User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-launch-template.html).

After creating an auto scaling group it should auto spin up some nodes, you can test if they start correctly by visiting `/ops/healthcheck` on your browser.

## Build Custom AMI

If you wish to add more applications on host machine, you can build your own AMI containing UID2 Operator. 

To do that, you need to do complete the following steps.

>IMPORTANT: Steps 4-8 require root access.

1. Request the latest distributed version of UID2 operator with the latest Enclave image file (EIF) from the appropriate [UID2 Administrator](../../README.md#contact-info). 
3. Set up nitro environment. 
4. Get current version of UID2 operator:

      ```
      wget -O uid2-operator-dist.tar "https://uid2-operator-dist.s3.amazonaws.com/uid2-operator-internal-dist.tar?release-link-in-the-future"
      tar -xvf uid2-operator-dist.tar
      cd uid2-operator-dist
      ```

4. Set up `nitro-cli`:

      ```
      ./setup_nitro.sh
      ```

5. Set up allocator (you can run this anytime you want, even on start up, to change mem allocated):

      >IMPORTANT: Be sure not to over allocate, otherwise the instance can hang and you will never be able to login again, not even after reboot.

      ```
      ./setup_allocator.sh <cpu_for_enclave> <mem_in_mb_for_enclave>
      ```

6. Restart allocator service to apply settings:

      ```
      systemctl restart nitro-enclaves-allocator.service
      ```

7. Install the dependencies and enclave helper scripts:

      ```
      ./install.sh
      ```

8. Build AMI from this EC2 instance.

## Serve HTTPS

Using HTTPS is crucial for the security of your keys, customers' keys and confidentiality of PIIs. 

>IMPORTANT: Be sure to establish secure connection when you host an UID2 operator for production.

Setting up HTTPS on AWS, however, is out of scope of UID2 operator setup. Depending on your solution, you can use Application Load Balancer for HTTPS setup and offloading.

For details, see the following resources:

- [autoscaling load balancer](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html)

- [HTTPS offloading](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html)

## Change Listening Ports

If you prefer UID2 Operator *not* to listen to port 80, you can change the ports and build your custom AMI. Set up on host side is in *proxies.host.yaml* (will be installed to */etc/uid2operator/proxy.yaml* by installation script). You can change the port arrangement inside.

```
operator-service:
  service: direct
  listen: tcp://0.0.0.0:80 <-- change here
  connect: vsock://42:8080
```


