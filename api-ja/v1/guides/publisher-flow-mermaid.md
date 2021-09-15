  sequenceDiagram
    participant U as ユーザー
    participant P as パブリッシャー
    participant UID2 as UID2 Service
    participant SSP
    Note over U,SSP: 1. アイデンティティの設定
    U->>+P: 1-a. ユーザーがパブリッシャーのアセットにアクセスします。
    P->>-U: 1-b. パブリッシャーは、オープンなインターネットの価値交換を説明し、ログインを要求します。
    activate U
    U->>P: 1-c. ユーザーは認証を行い、UID2の作成を許可します。
    deactivate U
    activate P
    P->>UID2: 1-d. パブリッシャーは、ユーザーのPIIをトークン生成サービスに送ります。
    deactivate P
    activate UID2
    UID2->>P: 1-e. トークン生成サービスはUID2 Tokenを返します。
    deactivate UID2
    activate P
    P->>U: 1-f. パブリッシャーは、ユーザーにUID2を設定します。
    deactivate P
    Note over U,SSP: 2. UID2 Tokenを利用した入札

    P->>SSP: 2-a. パブリッシャーは、UID2 Tokenを使って広告用SSPを呼び出します。
    activate SSP
    SSP->>P: 2-b. SSPは、表示する広告を返します。
    deactivate SSP
    activate P
    P->>U: 2-c. パブリッシャーは、ユーザーに広告を表示します。
    deactivate P

    Note over U,SSP: 3. トークンのリフレッシュ
    U->>UID2: 3-a. SDKは、Refresh Tokenを使用してUID2をリフレッシュするリクエストを送信します。
    activate UID2
    UID2->>U: 3-b. ユーザーがオプトアウトしていない場合、リフレッシュ・トークン・サービスは新しいID Tokenを返します。
    deactivate UID2
    Note over U,SSP: 4. ユーザーログアウト
    U->>P: 4-a. ユーザーがパブリッシャーのアセットからログアウトします。
    activate P
    P->>U: 4-b. ユーザーのIDがクリアされます。
    deactivate P

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/edit#eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIOODpuODvOOCtuODvFxuICAgIHBhcnRpY2lwYW50IFAgYXMg44OR44OW44Oq44OD44K344Oj44O8XG4gICAgcGFydGljaXBhbnQgVUlEMiBhcyBVSUQyIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBTU1BcbiAgICBOb3RlIG92ZXIgVSxTU1A6IDEuIOOCouOCpOODh-ODs-ODhuOCo-ODhuOCo-OBruioreWumlxuICAgIFUtPj4rUDogMS1hLiDjg6bjg7zjgrbjg7zjgYzjg5Hjg5bjg6rjg4Pjgrfjg6Pjg7zjga7jgqLjgrvjg4Pjg4jjgavjgqLjgq_jgrvjgrnjgZfjgb7jgZnjgIJcbiAgICBQLT4-LVU6IDEtYi4g44OR44OW44Oq44OD44K344Oj44O844Gv44CB44Kq44O844OX44Oz44Gq44Kk44Oz44K_44O844ON44OD44OI44Gu5L6h5YCk5Lqk5o-b44KS6Kqs5piO44GX44CB44Ot44Kw44Kk44Oz44KS6KaB5rGC44GX44G-44GZ44CCXG4gICAgYWN0aXZhdGUgVVxuICAgIFUtPj5QOiAxLWMuIOODpuODvOOCtuODvOOBr-iqjeiovOOCkuihjOOBhOOAgVVJRDLjga7kvZzmiJDjgpLoqLHlj6_jgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFVcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlVJRDI6IDEtZC4g44OR44OW44Oq44OD44K344Oj44O844Gv44CB44Om44O844K244O844GuUElJ44KS44OI44O844Kv44Oz55Sf5oiQ44K144O844OT44K544Gr6YCB44KK44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBQXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5QOiAxLWUuIOODiOODvOOCr-ODs-eUn-aIkOOCteODvOODk-OCueOBr1VJRDIgVG9rZW7jgpLov5TjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFVJRDJcbiAgICBhY3RpdmF0ZSBQXG4gICAgUC0-PlU6IDEtZi4g44OR44OW44Oq44OD44K344Oj44O844Gv44CB44Om44O844K244O844GrVUlEMuOCkuioreWumuOBl-OBvuOBmeOAglxuICAgIGRlYWN0aXZhdGUgUFxuICAgIE5vdGUgb3ZlciBVLFNTUDogMi4gVUlEMiBUb2tlbuOCkuWIqeeUqOOBl-OBn-WFpeacrVxuXG4gICAgUC0-PlNTUDogMi1hLiDjg5Hjg5bjg6rjg4Pjgrfjg6Pjg7zjga_jgIFVSUQyIFRva2Vu44KS5L2_44Gj44Gm5bqD5ZGK55SoU1NQ44KS5ZG844Gz5Ye644GX44G-44GZ44CCXG4gICAgYWN0aXZhdGUgU1NQXG4gICAgU1NQLT4-UDogMi1iLiBTU1Djga_jgIHooajnpLrjgZnjgovluoPlkYrjgpLov5TjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFNTUFxuICAgIGFjdGl2YXRlIFBcbiAgICBQLT4-VTogMi1jLiDjg5Hjg5bjg6rjg4Pjgrfjg6Pjg7zjga_jgIHjg6bjg7zjgrbjg7zjgavluoPlkYrjgpLooajnpLrjgZfjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFBcblxuICAgIE5vdGUgb3ZlciBVLFNTUDogMy4g44OI44O844Kv44Oz44Gu44Oq44OV44Os44OD44K344OlXG4gICAgVS0-PlVJRDI6IDMtYS4gU0RL44Gv44CB44Oq44OV44Os44OD44K344Ol44OI44O844Kv44Oz44KS5L2_55So44GX44GmVUlEMuOCkuODquODleODrOODg-OCt-ODpeOBmeOCi-ODquOCr-OCqOOCueODiOOCkumAgeS_oeOBl-OBvuOBmeOAglxuICAgIGFjdGl2YXRlIFVJRDJcbiAgICBVSUQyLT4-VTogMy1iLiDjg6bjg7zjgrbjg7zjgYzjgqrjg5fjg4jjgqLjgqbjg4jjgZfjgabjgYTjgarjgYTloLTlkIjjgIHjg6rjg5Xjg6zjg4Pjgrfjg6Xjg4jjg7zjgq_jg7Pjg7vjgrXjg7zjg5Pjgrnjga_mlrDjgZfjgYRJROODiOODvOOCr-ODs-OCkui_lOOBl-OBvuOBmeOAglxuICAgIGRlYWN0aXZhdGUgVUlEMlxuICAgIE5vdGUgb3ZlciBVLFNTUDogNC4g44Om44O844K244O844Ot44Kw44Ki44Km44OIXG4gICAgVS0-PlA6IDQtYS4g44Om44O844K244O844GM44OR44OW44Oq44OD44K344Oj44O844Gu44Ki44K744OD44OI44GL44KJ44Ot44Kw44Ki44Km44OI44GX44G-44GZ44CCXG4gICAgYWN0aXZhdGUgUFxuICAgIFAtPj5VOiA0LWIuIOODpuODvOOCtuODvOOBrklE44GM44Kv44Oq44Ki44GV44KM44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBQIiwibWVybWFpZCI6IntcbiAgXCJ0aGVtZVwiOiBcImZvcmVzdFwiXG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ -->
