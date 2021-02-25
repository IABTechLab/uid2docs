 sequenceDiagram
   participant User
   participant Publisher
   participant UID Service
   participant SSP

   User->>Publisher: 1 Visits
   User->>Publisher: 2 Authenticates
   Publisher->>UID Service: 3 Generate UID2
   Publisher->>User: 4 UID2 Set for User
   Publisher-->>SSP: 5-1 Calling SSP for Ads
   Publisher-->>User: 5-2 Ads Displayed to User
   User-->>UID Service: 6 Refresh UID2
   UID Service-->User: UID Tokens Refreshed
   User->>Publisher: 7-1 Logout
   Publisher->>User: 7-2 User Identity Cleared