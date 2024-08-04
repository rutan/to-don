import { z } from 'zod';

export const instanceSchema = z.object({
  title: z.string(),
  domain: z.string(),
  description: z.string().default(''),
  thumbnail_url: z.string().optional(),
});

export type Instance = z.infer<typeof instanceSchema>;

export const appStorageDataSchema = z.object({
  instances: z.array(instanceSchema),
});

export type AppStorageData = z.infer<typeof appStorageDataSchema>;

export const shareParameterSchema = z.object({
  url: z
    .string()
    .regex(/^https?:\/\//)
    .optional(),
  text: z.string().optional(),
});

export type ShareParameter = z.infer<typeof shareParameterSchema>;
