---
title: Server-Side Token Generation
description: Information for publishers about generating the token on the server side.
hide_table_of_contents: false
sidebar_position: 06
displayed_sidebar: docs
---

import Link from '@docusaurus/Link';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Server-Side Token Generation

If you're a publisher setting up a client-server or server-side UID2 integration, the first step is to generate the UID2 token on your server. Then, you can keep the token refreshed either on the client side or server side, and pass the token to the client side for sending to the RTB bidstream.

There are two approaches for publishers generating UID2 tokens on the server side by providing directly identifying information (<Link href="../ref-info/glossary-uid#gl-dii">DII</Link>) (email address or phone number):

- Integration with an SDK
- Direct integration to API endpoints

:::warning
For security reasons, the API key and secret used in token generation *must* be called on the server side. Do not store these values on the client side, whether on a web page, in a mobile app, or in Prebid. For details, see [Security of API Key and Client Secret](../getting-started/gs-credentials.md#security-of-api-key-and-client-secret).
:::

Options are summarized in the following table.

| Integration Solution | Generate Token | Refresh Token |
| :--- | :--- | :--- |
| [SDK for Java](../sdks/sdk-ref-java.md) | ✅ | ✅ |
| [SDK for Python](../sdks/sdk-ref-python.md) | ✅ | ✅ |
| [Direct integration (API endpoints with custom code)](../endpoints/post-token-generate.md) | ✅ | ✅ |

Whatever integration option you choose to generate the <Link href="../ref-info/glossary-uid#gl-identity">identity</Link> (UID2 token and associated values), you'll need to implement one of the following:

-  **SDK**: Use one of the Publisher Client classes, in one of the UID2 server-side SDKs. These classes simplify the request into a single method call. 

   For instructions, see one of the following:
   
   - [SDK for Java, Usage for Publishers, Basic Usage](../sdks/sdk-ref-java.md#basic-usage)
   - [SDK for Python, Usage for Publishers](../sdks/sdk-ref-python.md#usage-for-publishers)

   If you're using an SDK option, the `Identity` response that you need for the rest of this guide is the output of the applicable method, as follows:

   <Tabs groupId="language-selection">
   <TabItem value='java' label='Java'>

   ```java
   tokenGenerateResponse.getIdentityJsonString()
   ```

   </TabItem>
   <TabItem value='py' label='Python'>

   ```py
   token_generate_response.get_identity_json_string()
   ```

   </TabItem>
   </Tabs>

- **API**: Call the [POST&nbsp;/token/generate](../endpoints/post-token-generate.md) endpoint.

  The identity output that you need for the rest of this guide is the content inside the body section of a successful endpoint response. For an example, see [Successful Response](../endpoints/post-token-generate.md#successful-response).
  
:::important
The endpoint and SDK API return opt-out status if the <Link href="../ref-info/glossary-uid#gl-dii">DII</Link> you are generating the token for has been opted out of UID2. If this happens, save the information and do not call the token generation endpoint for the same DII again. 
:::
