graph LR
A[Decrypt UID2 Token] --> B[Retrieve Opt-out for UID2]
    B --> C{Check Opt-out}
    C --> |Opted Out| D[Bid without UID2]
    C --> |Not Opted Out| E[Bid with UID2]
