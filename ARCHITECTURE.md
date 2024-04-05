## architecture


### Auth Overview

```mermaid
sequenceDiagram
    participant Client
    participant EnvoyProxy
    participant AuthZCluster
    participant ServiceCluster
    Client->>EnvoyProxy: Request
    EnvoyProxy->>AuthZCluster: Delegate Authentication
    AuthZCluster-->>EnvoyProxy: Authentication Result
    Note over EnvoyProxy,AuthZCluster: If Authenticated
    EnvoyProxy->>ServiceCluster: Forward Request
    ServiceCluster-->>EnvoyProxy: Response
    EnvoyProxy-->>Client: Response
    Note over EnvoyProxy,AuthZCluster: If Not Authenticated
    EnvoyProxy-->>Client: Authentication Failed
```