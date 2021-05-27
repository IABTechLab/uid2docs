# UID2 Operator - Nitro Enclave

UID2 Operator within Nitro Enclave protects sensitive data, including PII.

Follow through this page to

- Deploy UID2 Operator AMI onto your AWS Auto Scaling Group
- Customize your UID2 Operator AMI

## Create Launch Template

This section introduces one way you can deploy and run your UID2 Operator on AWS, given you have an official build AMI, or a [customized AMI](#build-custom-ami).

You will follow the [AWS User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-launch-template.html) to create a launch template for auto scaling group, with these setups:

First, during the creation of Launch Template, create instances with at least 64GB of memory (for example, m5.4xlarge) to support 30-day worth of optout entries.

Second, in advance details, find the dropdown button for Enclave, and set to _Enclave: true_

Then moving on to User Data, provide a json with proper configuration parameters, example:

```
{ 
  "api_token": "your-api-token",
  "service_instances": 8,
  "enclave_cpu_count": 8,
  "enclave_memory_mb": 40000
}
```

Required configuration:
- api_token: your api token to serve as an uid2 operator
- service_instances: number of workers/threads the operator service can spawn, set according to the CPU_COUNT you allocate to enclave
- enclave_cpu_count: number of CPUs you allocate for enclave. Note: if your instance uses vCPUs, allocate even number (2, 4, 6...) and always keep at least 2 cores for the host, meaning if you have 12 cores, allocate maximum 10 cores for enclave.
- enclave_memory_mb: memory in MB you allocate for enclave. Note: always leaves at least 8GB memory for the host, meaning if you have 80G memory, allocate maximum 72G for enclave.

After finishing the Launch Template, you can move on to Create an Auto Scaling Group

## Create Auto Scaling Group

On EC2 auto scaling group panel, click *Create an Auto Scaling Group*

- Select the launch template you have just created for UID2 operator
- Choose your network and subnets
- Create load balancer, check [Serve HTTPS](#serve-https) for more info
- For healthcheck endpoint of UID2 Operator, you can use http://your-operator-node-ip:80/ops/healthcheck

For more configurations, see [AWS User Guide](https://docs.aws.amazon.com/autoscaling/ec2/userguide/create-asg-launch-template.html)

After creating an auto scaling group it should auto spin up some nodes, you can test if they start correctly by visiting /ops/healthcheck on your browser.

## Build Custom AMI

For partners who wish to add more applications on host machine, one can build one's own AMI containing UID2 Operator. To do that, you need to

- Get the latest release eif (enclave image file) of uid2 operator
- Setup nitro environment on 

Get current release version of UID2 operator (WIP)

```
wget -O uid2-operator-dist.tar "https://uid2-operator-dist.s3.amazonaws.com/uid2-operator-internal-dist.tar?release-link-in-the-future"
tar -xvf uid2-operator-dist.tar
cd uid2-operator-dist
```

**All steps below requires root access**

Setup nitro-cli

```
./setup_nitro.sh
```

Setup allocator (you can run this anytime you want, even on start up, to change mem allocated)

**warning**: be cautious not to over allocate, otherwise the instance can hang and you will never be able to login again, not even after reboot :(

```
./setup_allocator.sh <cpu_for_enclave> <mem_in_mb_for_enclave>
```

Restart allocator service to apply settings

```
systemctl restart nitro-enclaves-allocator.service
```

Install the dependencies and enclave helper scripts

```
./install.sh
```

Finally, build AMI from this EC2 instance - You are all set!

## Serve HTTPS

Using HTTPS is crucial for the security of your keys, customers' keys and confidentiality of PIIs. Be sure to establish secure connection when you host an uid2 operator for production.

However, setting up HTTPS on AWS is out of scope of UID2 operator setup. Depending on your solution, you can use Application Load Balancer for HTTPS setup and offloading.

More on [autoscaling load balancer](https://docs.aws.amazon.com/autoscaling/ec2/userguide/autoscaling-load-balancer.html)

More on [HTTPS offloading](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html)

## Change Listening Ports

WIP: this part might integrate into User Data json in the future.

If you would not like UID2 Operator to listen to port 80, you can change the ports and build your custom AMI. Setup on host side is in *proxies.host.yaml* (will be installed to */etc/uid2operator/proxy.yaml* by installation script). You can change the port arrangement inside.

```
operator-service:
  service: direct
  listen: tcp://0.0.0.0:80 <-- change here
  connect: vsock://42:8080
```

## Misc.

Other overridable configurations at start time (User Data):

- clients_metadata_path: url string, override if you want to point to another uid2 core service for fetching client keys. By default points to production uid2-core service endpoint.
- keys_metadata_path: url string, by default points to production uid2-core service endpoint.
- salts_metadata_path: url string, by default points to production uid2-core service endpoint.
- optout_metadata_path: url string, by default points to production uid2-optout service endpoint.
- optout_api_uri: url string, by default points to production uid2-optout service endpoint.
- optout_synthetic_logs_enabled: for test use internally
- optout_synthetic_logs_count: for test use internally
- loki_enabled: boolean, by default = false. Please see 'loki' section for more info (WIP).

