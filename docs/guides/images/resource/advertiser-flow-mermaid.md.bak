  sequenceDiagram
    participant DP as Data Provider
    participant UID2 as UID2 Service
    participant DSP
    loop 1. Retrieve a UID2 for DII using the identity map endpoints.
    DP->>UID2: 1-a. Send a request containing DII to the identity mapping endpoints.
    UID2->>DP: 1-b. Store the UID2 and salt bucket returned from the identity mapping service.
    end
    DP-->>DSP: 2. Send stored UID2s to DSPs to create audiences.
    loop 3. Monitor for salt bucket rotations related to your stored UID2s.
       DP->>UID2: 3-a. Monitor salt bucket rotations using the bucket service.
       UID2->>DP: 3-b. Return salt buckets rotated since a given timestamp.
       DP->>UID2: 3-c. Compare the rotated salt buckets to stored UID2 salt buckets.<br/>If rotated, resend DII to identity mapping service for a new UID2.
       UID2->>DP: 3-d. Store the UID2 and salt bucket returned from the identity mapping service.
    end

    <!-- Mermaid Live Editor Source: https://mermaid-js.github.io/mermaid-live-editor/#/edit/eyJjb2RlIjoiICBzZXF1ZW5jZURpYWdyYW1cbiAgICBwYXJ0aWNpcGFudCBEUCBhcyBEYXRhIFByb3ZpZGVyXG4gICAgcGFydGljaXBhbnQgVUlEMiBhcyBVSUQyIFNlcnZpY2VcbiAgICBwYXJ0aWNpcGFudCBEU1BcbiAgICBsb29wIDEuIFJldHJpZXZlIGEgVUlEMiBmb3IgUElJIHVzaW5nIHRoZSBpZGVudGl0eSBtYXAgZW5kcG9pbnRzLlxuICAgIERQLT4-VUlEMjogMS1hLiBTZW5kIGEgcmVxdWVzdCBjb250YWluaW5nIFBJSSB0byB0aGUgaWRlbnRpdHkgbWFwcGluZyBlbmRwb2ludHMuXG4gICAgVUlEMi0-PkRQOiAxLWIuIFN0b3JlIHRoZSBVSUQyIGFuZCBzYWx0IGJ1Y2tldCByZXR1cm5lZCBmcm9tIHRoZSBpZGVudGl0eSBtYXBwaW5nIHNlcnZpY2UuXG4gICAgZW5kXG4gICAgRFAtLT4-RFNQOiAyLiBTZW5kIHN0b3JlZCBVSUQycyB0byBEU1BzIHRvIGNyZWF0ZSBhdWRpZW5jZXMuXG5cbiAgICBsb29wIDMuIE1vbml0b3IgZm9yIHNhbHQgYnVja2V0IHJvdGF0aW9ucyByZWxhdGVkIHRvIHlvdXIgc3RvcmVkIFVJRDJzLlxuICAgICAgIERQLT4-VUlEMjogMy1hLiBNb25pdG9yIHNhbHQgYnVja2V0IHJvdGF0aW9ucyB1c2luZyB0aGUgYnVja2V0IHNlcnZpY2UuXG4gICAgICAgVUlEMi0-PkRQOiAzLWIuIFJldHVybiBzYWx0IGJ1Y2tldHMgcm90YXRlZCBzaW5jZSBhIGdpdmVuIHRpbWVzdGFtcC5cbiAgICAgICBEUC0-PlVJRDI6IDMtYy4gQ29tcGFyZSB0aGUgcm90YXRlZCBzYWx0IGJ1Y2tldHMgdG8gc3RvcmVkIFVJRDIgc2FsdCBidWNrZXRzLjxicj5JZiByb3RhdGVkLCByZXNlbmQgUElJIHRvIGlkZW50aXR5IG1hcHBpbmcgc2VydmljZSBmb3IgYSBuZXcgVUlEMi5cbiAgICAgICBVSUQyLT4-RFA6IDMtZC4gU3RvcmUgdGhlIFVJRDIgYW5kIHNhbHQgYnVja2V0IHJldHVybmVkIGZyb20gdGhlIGlkZW50aXR5IG1hcHBpbmcgc2VydmljZS5cbiAgICBlbmRcbiIsIm1lcm1haWQiOnsidGhlbWUiOiJmb3Jlc3QifSwidXBkYXRlRWRpdG9yIjpmYWxzZX0 -->

<!-- 8/24/13 update: -->

<!-- Code: -->

  sequenceDiagram
    participant DP as Data Provider
    participant UID2 as UID2 Service
    participant DSP
    loop 1. Retrieve a UID2 for DII using the identity map endpoints.
    DP->>UID2: 1-a. Send a request containing DII to the identity mapping endpoints.
    UID2->>DP: 1-b. Store the UID2 and salt bucket returned from the identity mapping service.
    end
    DP-->>DSP: 2. Send stored UID2s to DSPs to create audiences.
    loop 3. Monitor for salt bucket rotations related to your stored UID2s.
       DP->>UID2: 3-a. Monitor salt bucket rotations using the bucket service.
       UID2->>DP: 3-b. Return salt buckets rotated since a given timestamp.
       DP->>UID2: 3-c. Compare the rotated salt buckets to stored UID2 salt buckets.<br/>If rotated, resend DII to identity mapping service for a new UID2.
       UID2->>DP: 3-d. Store the UID2 and salt bucket returned from the identity mapping service.
    end

<!-- Config:

{
  "theme": "forest"
}
 -->

<!--  URL:

https://mermaid.live/edit#pako:eNq1lMFu2zAMhl-F0Dn10OZmDLnMlxwKGA1284WR6ExYLHkSnSIo-u4lbaeL1-Q4X2yI4veTPyW_GRsdmdIAZPozULBUeTwk7JoA8vSY2FvfY2CoasAMFTJCneLJO0pfN_3cVk-6bXzvKJ28pRuoXT0tHmPs4bGAF-Lk6USAU2YbE1TbLQzZhwPwLwKRC-z5DB32QMH10QfOxYSp6ofNRhNLeHzAQoSDE1TSljKDjYHRB0UplOMXYq-xf6kKFG5VK3UvVI6JxtSpS9HIeGTYD_Y3sajxkAI5aFPsbivkyZCZL3qf5avOToSe5uKzarlRKGvBEhzfNhGy2DQ4r8O6lDr6uC7gOQYvmaN_i9oiI_sYslR5FIBT1jkOaSE0w5aGrtXQC_c28--U5tCyz6WVa7XyZfTqGpcnnpQiMKsH4eBPFIB9JyPErr9TnC3gR-zkcE2T-YRck6XXqzYXseL7Pn3bbNtL4koMyjqA-aDcG-HoMEKg15F5p1P3Xw6NWZmOUofeycV90-XGSGZHjSnlUyoTxxrThHfZiQPH3TlYU3IaaGWG3kmf8yU3ZYvHLKvkdLzP079ArkvrD-b9A3aZXBg -->
