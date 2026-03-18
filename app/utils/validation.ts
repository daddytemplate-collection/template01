import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const contactSchema = toTypedSchema(
  z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    subject: z.string().min(3, 'Subject too short'),
    message: z.string().min(10, 'Message too short'),
  })
);