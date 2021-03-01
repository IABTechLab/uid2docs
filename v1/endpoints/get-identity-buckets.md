[UID2 Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/buckets

# GET /identity/buckets

Monitor for rotated salt buckets. 

Integration workflows that use this endpoint:
* [Advertiser/Data Provider](../guides/advertiser-dataprovider-guide.md)

## Request 

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `since_timestamp` | `date-time` | | Return buckets with last updated UTC timestamps after the specified date and time. |

## Response

The endpoint returns a list of ```bucket_id``` and their last updated timestamps.

```json
[
    {
        "bucket_id" : "last_update_timestamp"
    }
]
```

<!--Open tasks:-->
<!--Add request example with date-time filled in once open questions are answered.-->

<!--Open questions:-->
<!--Is since_timestamp required? If it is optional and omitted, does this return all changed bucket_ids from the beginning?-->
<!--What is the accepted date-time format of since_timestamp as a query parameter?-->