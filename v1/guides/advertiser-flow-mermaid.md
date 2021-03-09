  sequenceDiagram
    participant DP as Data Provider
    participant UID2 as UID2 Service
    participant DSP
    DP->>UID2: A-1: Send PII to identity mapping service.
    UID2->>DP: A-2: Store the UID2 and salt bucket returned from the identity mapping service.
    DP-->>DSP: B-1. Send stored UID2 to DSPs to create audiences.
    loop Salt Bucket Rotation UID2 Refresh
       DP->>UID2: C-1: Monitor salt bucket rotations using the bucket service.
       UID2->>DP: C-2: Return salt buckets rotated since a given timestamp.
       DP->>UID2: C-3: Check if any stored UID2s salt buckets rotated.<br>If they did, resend PII to identity mapping service for a new UID2.
       UID2->>DP: C-4: Store the UID2 and salt bucket returned from the identity mapping service.
    end
    Data Provider->>UID2 Service: D-1: Incrementally update UID2s on a regular basis.
