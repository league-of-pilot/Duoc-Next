yarn add fastify

# Dependency

```bash
yarn add dotenv zod
```

# Dev Dependency

Tránh mất thời gian với eslint có thể downgrade xuống

```json
    "@typescript-eslint/eslint-plugin": "~5.59.8",
    "@typescript-eslint/parser": "~5.59.8",
    "eslint": "~8.41.0",
    "eslint-config-prettier": "~8.8.0",
```

```bash
yarn add -D @types/node @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-unused-imports nodemon prettier ts-node tsc-alias tsconfig-paths typescript tsx
```

# Fastify plugin

```bash
yarn add @fastify/cors fastify-plugin fastify-type-provider-zod
```

https://www.prisma.io/docs/getting-started/quickstart

# Prisma init

```bash
yarn add -D prisma
yarn prisma init --datasource-provider sqlite
yarn add @prisma/client

prisma generate
yarn prisma db push
```

```bash
yarn add @fastify/cookie
```

Note chú ý về server
Sẽ sử dụng postman được cung cấp để dùng
Mục đính chính là học nhanh fastify chứ ko phải học BE kỹ
1 số generic type của request đôi lúc code ko kỹ thiếu type
Các phần logic thuần ko quá thiên về tech thì copy-paste

1 lớp BE nhẹ để học FE - NEXT
ko phải là prj chính để học BE
