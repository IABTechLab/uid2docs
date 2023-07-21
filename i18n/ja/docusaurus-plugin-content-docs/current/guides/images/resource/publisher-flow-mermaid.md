  sequenceDiagram
    participant U as User
    participant P as Publisher
    participant UID2 as UID2 Service
    participant SSP
    Note over U,SSP: 1. アイデンティティの確立
    U->>+P: 1-a. ユーザーがパブリッシャーアセットにアクセスします。
    P->>-U: 1-b. パブリッシャーは、オープンなインターネットの価値交換を説明し、ログインをリクエストします。
    activate U
    U->>P: 1-c. ユーザーが認証し、UID2 の作成を許可します。
    deactivate U
    activate P
    P->>UID2: 1-d. パブリッシャーはユーザーのDIIをトークン生成サービスに送信します。
    deactivate P
    activate UID2
    UID2->>P: 1-e. トークン生成サービスは、UID2 Tokenを返します。
    deactivate UID2
    activate P
    P->>U: 1-f. パブリッシャーはユーザーにUID2を設定します。
    deactivate P
    Note over U,SSP: 2. UID2 Tokenを用いた入札

    P->>SSP: 2-a. パブリッシャーはUID2 Tokenを使って広告のためにSSPを呼び出します。
    activate SSP
    SSP->>P: 2-b. SSPは、表示する広告を返します。
    deactivate SSP
    activate P
    P->>U: 2-c. パブリッシャーは、ユーザーに広告を表示します。
    deactivate P

    Note over U,SSP: 3. トークンのリフレッシュ
    U->>UID2: 3-a. SDKはRefresh Tokenを使用してUID2のリフレッシュ要求を送信します。
    activate UID2
    UID2->>U: 3-b. ユーザーがオプトアウトしていない場合、Refresh Token Serviceは新しいIDトークンを返します。
    deactivate UID2
    Note over U,SSP: 4. ユーザーログアウト
    U->>P: 4-a. ユーザーがパブリッシャーアセットからログアウトしました。
    activate P
    P->>U: 4-b. ユーザーのIDをクリアします。
    deactivate P

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqdVVtPGkEU_iubfa2aFH3iwSdeSNOGlO4bLysMdVMBuywmjTFhZ2yltdZLrfRiYlUkBBQ09JJSlR8zLNB_0XNmWemyQG15GGZn5nznm-9cZlmOpmJE9suSlCZPMyQZJQFNfayriUhSgt-iqhtaVFtUk4akSGpaUtJE926FcCuUmVvQ0vPD9pVgwCes8T9M9CUtSrynwuGQvfggZRAptUR0SZmARb90d0ri9IjTAmdrnNU5e8HpcW80q52jRqeybpsqk7Ozd9BiUgUbVuTsktNvOJqvOdvmbI-zMmeM0--cHYtdwP2JKyzHzYr4rOEK_cHNPDevufmBZ6mNHgL0SQXR5xB9GJxZ41mT0zLOWR7JmmVBvM5pUyxuOM6qretDK1toNQrtzU-c7nTLp-33b9ArILAzTs8dwx30grRKSAttB5mpUUNbUkE2pa-DkCHqkaFb3uiWLm03IiDI5Gq_ndtCDqULa7PmxY-RQQ8336G-NgiHTmNj1HGRqQaCQXG9nFiE3Xpn90BQ-SrEeiviUPmVNVvNw7G0QoNCAJeeFjBz5CDIbLyzmqPLo9QTkkRNmrvjBbnxNFQTdBu_rSAVBBNxOLOqH29zYU-x-KYkF_3Obombq9w8sJ6ftPfPIsk-N_u8XSrD2bmQWldNbkLFFa0Gs7ZfQfgAlVMTaAMSHLC2waZurTXGJOhNlcPEjooPqwkBhPTdw1Kn0EBTut7z8_cQ3ICOiIDProPRBesOQt9vj8z4MIwIxLQ711Au9P2Os1OHwUm_Wu3amcZghAP3gNZDEtdJev5P9UUogUtRZMkwvG7RbF9QOD2qYkbXh4Le57xdE3tZHi-CrbHodJ-iyKkyjNbnL9ZWDkR0EXbaPFykvXcuTFaDAZce_1JZHnFnBoj2-mWPoqsJzvzfW7DO6csBWIdsHvPeo6g75Wa8WlZBAGh2ePsyYo5NK3lCThA9oWoxeJ6XcT8iG_MkQSKyH6bxFGhtRORIcgVOqhkjFX6WjMp-Q8-QCTmzGAOQ3lMu--PqQhpWSUwzUvp9-8UXD__Kb-lF98Q -->
