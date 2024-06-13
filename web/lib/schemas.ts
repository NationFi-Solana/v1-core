import { z } from 'zod'
export const slugSchema = z
    .object({ _type: z.string(), current: z.string() })
    .nullable();