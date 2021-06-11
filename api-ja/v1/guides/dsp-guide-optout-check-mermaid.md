graph LR
A[UID2 Token復号化] --> B[UID2に対するオプトアウトの取得]
    B --> C{オプトアウトをチェック}
    C --> |Opted Out| D[UID2なしで入札]
    C --> |Not Opted Out| E[UID2で入札]

<!-- Edit in Mermaid Live Editor: https://mermaid-js.github.io/mermaid-live-editor/edit#eyJjb2RlIjoiZ3JhcGggTFJcbkFbVUlEMiBUb2tlbuW-qeWPt-WMll0gLS0-IEJbVUlEMuOBq-WvvuOBmeOCi-OCquODl-ODiOOCouOCpuODiOOBruWPluW-l11cbiAgICBCIC0tPiBDe-OCquODl-ODiOOCouOCpuODiOOCkuODgeOCp-ODg-OCr31cbiAgICBDIC0tPiB8T3B0ZWQgT3V0fCBEW1VJRDLjgarjgZfjgaflhaXmnK1dXG4gICAgQyAtLT4gfE5vdCBPcHRlZCBPdXR8IEVbVUlEMuOBp-WFpeacrV0iLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZm9yZXN0XCJcbn0iLCJ1cGRhdGVFZGl0b3IiOmZhbHNlLCJhdXRvU3luYyI6dHJ1ZSwidXBkYXRlRGlhZ3JhbSI6ZmFsc2V9 -->
