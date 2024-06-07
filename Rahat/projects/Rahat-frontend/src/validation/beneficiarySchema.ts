import { z } from 'zod';

const beneficiarySchema = z.object({
  email: z.string().email(),
  name: z.string(),
  age: z.number(),
  gender: z.string(),
 
});

export default beneficiarySchema;
