  sequenceDiagram
    participant U as ユーザー
    participant SSP
    participant DSP
    participant UID2 as UID2 Service
    participant TC as Transparency & Control Portal
    Note over U,TC: 1. ユーザーのオプトアウトを履行します。
    U->>TC: 1-a. ユーザーがオプトアウトします。
    activate TC
    TC->>UID2: 1-b. UID2サービスがオプトアウトを受け取ります。
    deactivate TC
    activate UID2
    UID2->>DSP: 1-c. DSPはオプトアウトを受け取ります。
    deactivate UID2
    Note over U,TC: 2. RTBで使用するUID2 Tokenを復号します。
    SSP-->>DSP: SSPは、DSPを呼び出して入札を行います。
    DSP->>DSP: 2-a. UID2 Tokenを復号します。
    DSP->>DSP: 2-b. ユーザーのオプトアウトを履行し入札ロジックを実行します。

<!-- Edit in Mermaid Live Editor: https://mermaid-js.github.io/mermaid-live-editor/edit#eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBVIGFzIOODpuODvOOCtuODvFxuICAgIHBhcnRpY2lwYW50IFNTUFxuICAgIHBhcnRpY2lwYW50IERTUFxuICAgIHBhcnRpY2lwYW50IFVJRDIgYXMgVUlEMiBTZXJ2aWNlXG4gICAgcGFydGljaXBhbnQgVEMgYXMgVHJhbnNwYXJlbmN5ICYgQ29udHJvbCBQb3J0YWxcbiAgICBOb3RlIG92ZXIgVSxUQzogMS4g44Om44O844K244O844Gu44Kq44OX44OI44Ki44Km44OI44KS5bGl6KGM44GX44G-44GZ44CCXG4gICAgVS0-PlRDOiAxLWEuIOODpuODvOOCtuODvOOBjOOCquODl-ODiOOCouOCpuODiOOBl-OBvuOBmeOAglxuICAgIGFjdGl2YXRlIFRDXG4gICAgVEMtPj5VSUQyOiAxLWIuIFVJRDLjgrXjg7zjg5PjgrnjgYzjgqrjg5fjg4jjgqLjgqbjg4jjgpLlj5fjgZHlj5bjgorjgb7jgZnjgIJcbiAgICBkZWFjdGl2YXRlIFRDXG4gICAgYWN0aXZhdGUgVUlEMlxuICAgIFVJRDItPj5EU1A6IDEtYy4gRFNQ44Gv44Kq44OX44OI44Ki44Km44OI44KS5Y-X44GR5Y-W44KK44G-44GZ44CCXG4gICAgZGVhY3RpdmF0ZSBVSUQyXG4gICAgTm90ZSBvdmVyIFUsVEM6IDIuIFJUQuOBp-S9v-eUqOOBmeOCi1VJRDIgVG9rZW7jgpLlvqnlj7fjgZfjgb7jgZnjgIJcbiAgICBTU1AtLT4-RFNQOiBTU1Djga_jgIFEU1DjgpLlkbzjgbPlh7rjgZfjgablhaXmnK3jgpLooYzjgYTjgb7jgZnjgIJcbiAgICBEU1AtPj5EU1A6IDItYS4gVUlEMuODiOODvOOCr-ODs-OCkuW-qeWPt-OBl-OBvuOBmeOAglxuICAgIERTUC0-PkRTUDogMi1iLiDjg6bjg7zjgrbjg7zjga7jgqrjg5fjg4jjgqLjgqbjg4jjgpLlsaXooYzjgZflhaXmnK3jg63jgrjjg4Pjgq_jgpLlrp_ooYzjgZfjgb7jgZnjgIIiLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZm9yZXN0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9 -->
