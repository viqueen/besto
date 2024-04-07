## besto

### dev requirements

- Git
- Docker
- Node.js (nvm)
- Yarn
- Golang

### dev setup

- clone the repo
```bash
git clone git@github.com:viqueen/besto.git
```

- install dependencies
```bash
cd besto
yarn
```

- build required tools
```bash
yarn tools
```

- codegen
```bash
yarn schema
```

- build sdks
```bash
yarn sdks
```

### dev run

- start the harness server
```bash
yarn harness
```

- start the platform server
```bash
yarn workspace @besto/platform server:dev
```

- start the platform web
```bash
yarn workspace @besto/platform web:dev
```
