  sequenceDiagram
    participant U as User
    participant P as Publisher
    participant EUID as EUID Service
    participant SSP
    Note over U,SSP: 1. Establish Identity
    U->>+P: 1-a. The user visits a publisher asset.
    P->>-U: 1-b. The publisher explains the value exchange of the open internet and requests a login.
    activate U
    U->>P: 1-c. The user authenticates and authorizes the creation of an EUID.
    deactivate U
    activate P
    P->>EUID: 1-d. The publisher sends the user's PII to the token generation service.
    deactivate P
    activate EUID
    EUID->>P: 1-e. The token generation service returns EUID tokens.
    deactivate EUID
    activate P
    P->>U: 1-f. The publisher sets an EUID for the user.
    deactivate P
    Note over U,SSP: 2. Bid Using EUID Tokens
  
    P->>SSP: 2-a. The publisher calls the SSP for ads using the EUID token.
    activate SSP
    SSP->>P: 2-b. The SSP returns ads to display.
    deactivate SSP
    activate P
    P->>U: 2-c. The publisher displays the ads to the user.
    deactivate P

    Note over U,SSP: 3. Refresh Tokens
    U->>P: 3-a. The user returns to a publisher asset.
    activate P
    P->>EUID: 3-b. The publisher uses a refresh token to request new identity tokens for the user.
    deactivate P
    activate EUID
    EUID->>P: 3-c. If a user hasn't opted out, the refresh token service returns new identity tokens.
    deactivate EUID
    activate P
    P->>U: 3-d. The publisher sets the new EUID for the user.
    deactivate P

    Note over U,SSP: 4. User Logout
    U->>P: 4-a. The user logs out from a publisher asset.
    activate P
    P->>U: 4-b. The user's identity clears.
    deactivate P

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqdVTtv2zAQ_isHLRliC6idyUOGIh4MFIVQR5sXmjzJRGVSISm3bpD_3iOpR21ZQZoskU_H73EP6jXhWmCySgAsvjSoOD5JVhp23Cmgv5oZJ7msmXKQA7OQWzTjV5l_lTX7StrDrffrfPPkU8L_LZqT5DjO2m6zGPyuHYI-oYF8RsEVfElhbR0L-LARqJx055ibzx8f733KnKXwfEBoSCGcpJXOAoO6E0X0Fl0aD2V0aJ77Q_t4aEjD33XFpLLgKHxiVYMU4gemSpJUhKiuUYFUDo1CB0wJML52NhBWupSqpWHcyRMjL_mgNUjl_0hlDWGSIU6JNqD5iDbyD0YR3CBzUitPz1SoYYsv8Jqh_50NRv0BTyqurVpUIlJ4IXfUwc0GnA4Rp3-SyRIVmkhuY9fGzNkVs6eLIf_UOcZIPgVLFXSNUe2EhCw7phqgb_kM_SzGJn1bYtmg0Kb3O-lkNH2LFL5KQaMvVRlxnoNAnz7Qx9RuCgcBnFVVrDJlBAWMqt4EMB8dHF9PTb8P9BDruOjm1UN1JfNw1DUhLU3ueWyrh5ko2qIbx0FzixVlt_jv1m2icssUfmBhkLZ2KFm_B8uLle3sENXU2k5P93K8yATq99G0_HHyCLzdVVD4C2R7lbQT97H5eHfSl76YG1rUaOrArLpzdGM4FKAbNwvwl5quV-CGsE-swvLWvrvYUc_wsX2Y6OtDGj4E8E2XZOqiqQ8XTaXb0HrfUBh9_K--5h5qP0DR9dQXhVfIzI2iZMksOaI5Minok_Ya9jMhf0fcJSt6JLvU-V2yU2-U2dSCDq2FdNokq4JVFmcJ3b16e1Y8WTnTYJfUfhPbrLe_espZMw-->
    
