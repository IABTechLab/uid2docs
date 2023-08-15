  sequenceDiagram
    participant U as User
    participant P as Publisher
    participant UID2 as UID2 Service
    participant SSP
    Note over U,SSP: 1. アイデンティティの確立
    U->>+P: 1-a. ユーザーがパブリッシャーアセットにアクセスした。
    P->>-U: 1-b. パブリッシャーは、オープンなインターネットの価値交換を説明し、ログインをリクエストします。
    activate U
    U->>P: 1-c. ユーザーが認証し、UID2 の作成を許可します。
    deactivate U
    activate P
    P->>UID2: 1-d. パブリッシャーはユーザーの DII をトークン生成サービスに送信します。
    deactivate P
    activate UID2
    UID2->>P: 1-e. トークン生成サービスは、UID2 Token を返します。
    deactivate UID2
    activate P
    P->>U: 1-f. パブリッシャーはユーザーに UID2 を設定します。
    deactivate P
    Note over U,SSP: 2. UID2 Token を用いた入札

    P->>SSP: 2-a. パブリッシャーは UID2 Token を使って広告のために SSP を呼び出します。
    activate SSP
    SSP->>P: 2-b. SSP は、表示する広告を返します。
    deactivate SSP
    activate P
    P->>U: 2-c. パブリッシャーは、ユーザーに広告を表示します。
    deactivate P

    Note over U,SSP: 3. トークンのリフレッシュ
    U->>P: 3-a. ユーザーがパブリッシャーアセットに戻ります。
    activate P
    P->>UID2: 3-b. パブリッシャーは Refresh Token を使って、ユーザーの新しいアイデンティティトークンを要求します。
    deactivate P
    activate UID2
    UID2->>P: 3-c. ユーザーがオプトアウトしていない場合、Refresh Token Service は新しいアイデンティティトークンを返します。
    deactivate UID2
    activate P
    P->>U: 3-d. パブリッシャーはユーザーの新しい UID2 を設定します。
    deactivate P

    Note over U,SSP: 4. ユーザーログアウト
    U->>P: 4-a. ユーザーがパブリッシャーアセットからログアウトしました。
    activate P
    P->>U: 4-b. ユーザーのIDをクリアします。
    deactivate P

   <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNqlVktP20AQ_iuWrwWkJpxy4JRLDq2ipr7lYpJNsUoc6jhIFUKKd2lJoZRCKfSBRIEQRQkkoPShpkB-zMZO-i-6s7ZpnBhT6MWP3Z1vvvl2ZnYXxFQujcSImEfPCkhNoagiP9HkbFIVhDlZ05WUMieruiAJcl6Q8kgbnojDRLwwPavkZ0ZnpVg0xC3hnUDavJJCw2sSiTgMPczpSMjNI02QxthQRLg_IVB8QHGZkmVKWpS8pPjQeRqN3kG7V18FQ2l8auoerB-XmQWpUHJO8Xd4Gq8p2aBkm5IaJYTiH5Qc8lmG-gtGSIkadf7bhBH8kxo71NijRQzAcQY8LgHwNAD7IRlNWjQorsE32QGWRo0zblHc4YNrrp9G93LfLJa77bK1_pnizX7t2PrwBhwyBHJC8alruAlegFEVGIEtI3VJjY8OLzmlK_MyU0tyw-fRp0ai79fW-tVz2wXfAWBxsWuV3oL_6pm53hzGTiMv-tVf3FUEgMBdOkATD42GEI3FBB5WiQ-z-VZva4_T-MZFeselr_8uGt3OfgCluDd8xoQrwN6uCAhYBbtpumo8zj1FKhDrd7aCdHDc-EgBHjP_qkPdrgIu_YnZ-HRTnCMFEZoQvLx7W1VqLLGENV8cWbsnSdUlZi-368Gf2hBS96JDDVZWFbNNzI0VtmlQBtgA1gwMlpgbzK5lLrevTUenkNnL3o0Q1A235pr396u9chvs8Krj5ibpHURf5UN2wl9flV7x_3p0aASJ7yt_2JtaoBH4fU_Jsev9aKAgw3dsR1aJNaIVf4WHijAc1JiERyijofyMzyaPqNOwtk-5IkvXdtzByJmIFcM6w_9RqWGfdsX76A54AhIVt_NVeI7X2NP88tV8W2LsvaE55wqk2a3juHvlh2_RAa9o3aoF-Gbh5JBszsnhCDaQf5N3y79Vil8NgbosB45GX0Um7XT0RB6LQuMHuWuAFxivOCZmkZaVlTS7jyzAfFLUZ1AWJcUI-8zk2J7rSTGpLrKVckHPJZ6rKTGiawU0Jhbm0gzGub2IkYw8m2ejKK3oOe2BfcXhN53FP78smtg -->

