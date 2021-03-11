  sequenceDiagram
    participant User
    participant Publisher
    participant SSP
    participant DSP
    participant T&C Portal
    User->>Publisher:1-1 Visits
    Publisher->>SSP:1-2 Makes RTB call
    SSP->>DSP:1-3 Calls DSP for Bid
    DSP->>DSP:1-4 Decrypts UID2 Token
    DSP->>DSP:1-5 Execute Bidding Logic
    User->>T&C Portal:2-1 User Opts Out
    T&C Portal-->>DSP:2-2 Handle Output
