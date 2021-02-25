  sequenceDiagram
    participant Data Provider
    participant UID Service
    participant DSP
    Data Provider->>UID Service: 1. Map PII to UID2
    UID Service->>Data Provider: Mapped UID2s along with Bucket Info
    Data Provider-->>DSP: 2. Send UID2 based Audience
    loop Refresh
       Data Provider->>UID Service: 3. Check for Bucket Updates
    end
    Data Provider->>UID Service: 4. Incremental Update UID2.
