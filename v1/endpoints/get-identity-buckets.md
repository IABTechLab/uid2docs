[UID2 Documentation](../../README.md) > v1 > [Endpoints](./README.md) > GET /identity/buckets

# GET /identity/buckets

Monitor for rotated salt buckets. 

## Request 

###  Query Parameters

| Query Parameter | Data Type | Attributes | Description |
| --- | --- | --- | --- |
| `since_timestamp` | `date-time` | | Return buckets with last updated UTC timestamps after the specified date and time. |

## Response

```json
[
    {
        "bucket_id" : "last_update_timestamp"
    }
]
```

## Body Response Properties