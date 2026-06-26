import z from 'zod';

export const environmentVariablesSchema = z.object({
  PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .default(4000),
  DB_DATABASE: z.string(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z
    .string()
    .transform((value) => parseInt(value, 10))
    .default(5432),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
});

export type EnviornmentVariablesType = z.infer<
  typeof environmentVariablesSchema
>;
