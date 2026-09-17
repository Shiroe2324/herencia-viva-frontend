import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: process.env.SWAGGER_URL ?? 'http://localhost:4000/swagger-yaml',
    output: {
      target: './src/lib/api/endpoints/endpoints.ts',
      schemas: './src/lib/api/models',
      client: 'react-query',
      httpClient: 'fetch',
      mode: 'tags-split',
      clean: true,
      formatter: 'prettier',
      override: {
        header: false,
        mutator: { path: './src/lib/api/custom-fetch.ts', name: 'customFetch' },
      },
    },
  },
  apiZod: {
    input: process.env.SWAGGER_URL ?? 'http://localhost:4000/swagger-yaml',
    output: {
      target: './src/lib/api/schemas/zod-schemas.ts',
      client: 'zod',
      mode: 'single',
      clean: true,
      formatter: 'prettier',
    },
  },
});
