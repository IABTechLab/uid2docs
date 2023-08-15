  sequenceDiagram
    participant DP as Data Provider
    participant UID2 as UID2 Service
    participant DSP
    loop 1. IDマップエンドポイントを使用して、DIIのUID2を取得します。
    DP->>UID2: 1-a. DIIを含むリクエストをIDマッピングエンドポイントに送信します。
    UID2->>DP: 1-b. ID マッピングサービスから返された UID2 とソルトバケットを格納します。
    end
    DP-->>DSP: 2. 蓄積したUID2をDSPに送信し、オーディエンスを作成します。
    loop 3. 蓄積されているUID2に関連するソルトバケットのローテーションを監視します。
       DP->>UID2: 3-a. バケットサービスを利用して、ソルトバケットのローテーションを監視します。
       UID2->>DP: 3-b. 指定されたタイムスタンプ以降にローテーションされたソルトバケットを返します。
       DP->>UID2: 3-c. ローテーションしたソルトバケットと保存されているUID2ソルトバケットを比較します。<br/>ローテーションした場合は、新しいUID2のためにDIIをIDマッピングサービスに再送信します。
       UID2->>DP: 3-d. ID マッピングサービスから返された UID2 とソルトバケットを保存します。
    end

  <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNq1lM9PGkEUx_-VyZ6VRrmRhtNeODQhIb1xWdmx3URYuiwmjTFhZohi1JQohdrWSktLUSLY1KZpiu4f81h-_BedmcUCy-qpvcBm5s37fOd935stJWXqWIkoOfwijzMprBraM0tLJzMIZTXLNlJGVsvYSI0jLYdUzdZQ3DI3DR1b_pCnMXVVBMn_BLY2jRReSJOIi6UN08yilRCKqcA-AGPAakBbwL4D2wN2CvSz_C4BPerfOMNKC0gNSBMKRI3FgHQEgu-5r6rubU3u3QI5gQIVydX4cjQqIiJoZVkLIXGEx5bbQAvALoB2BYv-8vJPJVQEk14FCyHtcYH0nY9-mOBwnBoXsDVxI7SQ7wewHrBjgST7QPdGTgXIa6AHQM68agHhgm6AtQWKlYF-kxmEvkG9N7w-9GNxRp9cVcATnL4aQqPj4vDcCz2bVIhvzUkvEKAXUs4u0MbkqlyXqPP7Qans50ijwtPUnuomkCLQfcng2aufxoWGOEP3g29BOsAuJXVH_NKfwL5K8NHwXWPUrPqpaM7EsDBxviozFeXOls5nO-SfSZixNiysHRzsup23f50D6sj2qEsVjuyTWv_3l_EJr1M7mDY9G2y27IyHa5EStQjMXbs3MWn1nVP38k2Qf_e1Xbcy6rFZMY_XrEfRB9Bu_dotc1aXezCoXsnFotciHamM8LJ4sxgwc7Mz0nZ3DoOnze-K_h8G7q5UCwOnLClpbKU1Q-fP5ZZYTCr2c5zGSSXCP9dNC-fspJLMbPNILW-biZeZlBKxrTxeUvJZXbPvHlclsq5t5Pgq1g3btJ54L7B8iLf_AASCEgM -->
