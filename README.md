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
yarn
```

- schema: build required tools

```bash
yarn schema:tools
```

- schema: codegen

```bash
yarn schema:codegen
```

- build sdks

```bash
yarn build:sdks
```

### dev run

- start the harness server

```bash
yarn start harness
```

- start the platform server

```bash
yarn workspace @besto/platform server:dev
```

- start the platform web

```bash
yarn workspace @besto/platform web:dev
```
