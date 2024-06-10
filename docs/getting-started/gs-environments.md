---
title: Environments
description: Information about the environments for UID2.
hide_table_of_contents: false
sidebar_position: 07
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Link from '@docusaurus/Link';

# Environments

Learn about the different environments available, and tips to reduce latency by making the best choice.

## UID2 Testing and Production Environments

The following table lists all current testing and production environments for UID2.

| Environment | Cloud Region | Code | Base URL |
| :--- | :--- | :--- | :--- |
| Integration Testing | AWS US East (Ohio) | `us-east-2` | `https://operator-integ.uidapi.com` |
| Production | Automatically optimized region routing via <a href='https://aws.amazon.com/global-accelerator/'>AWS Global Accelerator</a> | `n/a` | `https://global.prod.uidapi.com` |
| Production | AWS US East (Ohio) | `us-east-2` | `https://prod.uidapi.com` |
| Production | AWS US West (Oregon) | `us-west-2` | `https://usw.prod.uidapi.com` |
| Production | AWS Asia Pacific (Sydney) | `ap-southeast-2` | `https://au.prod.uidapi.com` |
| Production | AWS Asia Pacific (Tokyo) | `ap-northeast-1` | `https://jp.prod.uidapi.com` |
| Production | AWS Asia Pacific (Singapore) | `ap-southeast-1` | `https://sg.prod.uidapi.com` |

For example, `https://operator-integ.uidapi.com/v2/token/generate`.

Notes:

- All UID2 endpoints use the same base URL.
- The integration environment and the production environment require different <Link href="../ref-info/glossary-uid#gl-api-key">API keys</Link>.
- The expiration time of the <Link href="../ref-info/glossary-uid#gl-uid2-token">UID2 token</Link> returned by the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) or [POST&nbsp;/token/refresh](../endpoints/post-token-refresh.md) endpoints is subject to change, but is always significantly shorter in the integration environment than it is in the production environment.


## Optional: Reduce Latency by Setting the API Base URL for the Production Environment

By default, UID2 SDKs make API calls to a UID2 production environment server in the USA. Depending on where your users are based, you might consider choosing a server closer to your users to reduce latency.

For example, a publisher in Singapore can set the base URL to `https://sg.prod.uidapi.com`. This is still the UID2 production environment, but the servers are in Singapore.

You can also set the base URL to `https://global.prod.uidapi.com`. This URL directs readers to a region geographically close to them, which is ideal if your audience is geographically distributed.

The following implementation examples update the configuration to specify a different UID2 server.

<Tabs groupId="language-selection">
<TabItem value='pbid' label='Prebid.js'>

For Prebid.js (client-side or client-server implementation), to specify a different UID2 server, set the optional `params.uid2ApiBase` parameter, as shown in the following example.

```js
pbjs.setConfig({ 
  userSync: { 
    userIds: [{ 
      name: 'uid2', 
      params: { 
        uid2ApiBase: baseUrl, 
        // ... 
      } 
    }] 
  } 
}); 
```

</TabItem>
<TabItem value='js' label='JavaScript'>

For JavaScript, to specify a different UID2 server, you can change it in the `init` call:

```js
__uid2.init({
  baseUrl: "https://global.prod.uidapi.com",
});
```

</TabItem>
<TabItem value='android' label='Android'>

For Android, to specify a different UID2 server, you can make config changes, as shown in the following example.
 
```js
UID2Manager.init(
  context = this,
  serverUrl = "https://global.prod.uidapi.com"
)
```

</TabItem>
<TabItem value='ios' label='iOS'>

For iOS, to specify a different UID2 server, you can make config changes, as shown in the following example.

```js
// Must be set before UID2Manager.shared is accessed
UID2Settings.shared.environment = .custom(
  url: URL(string: "https://global.prod.uidapi.com")!
)
// or use a named environment
UID2Settings.shared.environment = .singapore
```

</TabItem>
</Tabs>
