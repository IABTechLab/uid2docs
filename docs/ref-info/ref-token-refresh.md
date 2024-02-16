---
title: Refreshing the UID2 Token
description: Sample code for UID2 token refresh
hide_table_of_contents: false
sidebar_position: 11
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Refreshing the UID2 Token



THIS IS A DRAFT STUB ARTICLE STARTED 2/16/24 FOR apidocs-1964. uptohere in review of meeting with Sunny 2/14.



This article offers a couple of code examples for UID2 token refresh in different languages.

There are many ways you could refresh the UID2 token. If you are using an SDK, the SDK takes care of token refresh for you.



## When to Refresh the UID2 Token

Refreshing more frequently than needed causes overhead, but if you allow a token to expire without refreshing it you have to request a new token.

We recommend that, in determining when to refresh a UID2 token, you use the "refresh from" time stamp in the most recent token/generate or token/refresh response call.



## xxx

The following table describes the field layout for request encryption code.

| Offset (Bytes) | Size (Bytes) | Description |
| :--- | :--- | :--- |
| 0 | 8 | xxx |

### Prerequisites and Notes

Before using the code example, check the prerequisites and notes for the language you're using.

### Code Example

Choose the code example you want to use. Remember to review the [Prerequisites and Notes](#prerequisites-and-notes).

<Tabs groupId="language-selection">
<TabItem value='py' label='Python'>

```py title="uid2_request.py"
xxx
```
</TabItem>
<TabItem value='java' label='Java'>

```java title="Uid2Request.java"
xxx
```
</TabItem>
<TabItem value='cs' label='C#'>

```cs title="uid2_request.cs"
xxx
```
</TabItem>
</Tabs>
