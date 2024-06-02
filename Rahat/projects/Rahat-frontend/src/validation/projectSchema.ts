import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  // donation: z
  //   .string()
  //   .transform((val) => parseFloat(val))
  //   .refine((val) => !isNaN(val), 'Donation must be a number'),
  // status: z.enum(['Pending', 'Running']),
  // token: z
  //   .string()
  //   .transform((val) => parseInt(val, 10))
  //   .refine((val) => !isNaN(val), 'Token must be a number'),
  imageUrl: z.string().url('Invalid URL'),

  // adminAddress: z.array(z.string()).min(1, 'Admin address is required'),
});

export default projectSchema;
