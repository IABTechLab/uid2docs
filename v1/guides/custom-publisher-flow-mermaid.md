 sequenceDiagram
   participant User
   participant Publisher
   participant UID Service
   participant SSP

   User->>Publisher: 1 Visits
   User->>Publisher: 2 Authenticates
   Publisher->>UID Service: 3-1 Generate UID2
   UID Service->>Publisher: 3-2 UID2 Tokens Returned
   Publisher-->>SSP: 4-1 Calling SSP for Ads
   Publisher-->>User: 4-2 Ads Displayed to User
   User->>Publisher: 5-1 Revisits Publisher
   Publisher-->>UID Service: 5-2 Refresh UID2 Tokens
   UID Service-->>Publisher: Refreshed UID2 Tokens
   User->>Publisher: 6 User Logout
