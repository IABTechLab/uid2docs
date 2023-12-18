---
title: The UID2 Operator
description: Information about Private and Public Operators and the differences between them.
hide_table_of_contents: false
sidebar_position: 06
---

# The UID2 Operator

The 

xxxxx


The operator is the code that does the work for UID2. This is the code that any UID2 or EUID participant "hits" when they are calling any UID2/EUID API. It is the operational code of Unified Id 2.0 -  it's the code that turns an email into a UID2, EUID, UID2 token or EUID token. It is the code that a participant who is sharing uses to refresh their decryption keys.

## UID2 Operator: Overview

The UID2 Operator includes a selection of specific API endpoints. Users have to have the correct credentials to access these endpoints, either via a UID2 SDK or by a direct API call to the endpoint.

There are two possible implementations of the UID2 Operator code:
- [Public Operator](#public-operator)
- [Private Operator](#private-operator)

## Public Operator

In most cases, UID2 participants will be using the public operator.

The public operator is owned and managed by the UID2 administration. The which is TTD. 



Key Points

TTD manages 
TTD runs the code
TTD makes the code changes
TTD updates the code
TTD pays for the infrastructure cost
Data has to leave a participant's infrastructure to hit the endpoint 
For example, the email has to go from P&G to the public operator endpoint, which is outside of P&G's walls


Benefits

No additional work for maintenance on the participant
(Private operators require the participant to update their instance each time TTD releases an update – any change or update to any endpoint requires a private operator update)
No cost to the participant
Participant must sign a contract to gain keys to hit the public operator
Service providers who act on behalf of a participant, can use the api keys of the participant and are not required to sign a contract. 
Downfall

Data leaves the participant's infrastructure
Due to privacy, participants at times do not want DII to leave their infrastructure, in this case we recommend going the private operator route



#  Private Operator

