import { z } from 'zod';

const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  imageUrl: z.string().url('Invalid URL'),

  asaName: z.string().min(3, 'ASA name should be at least 3 character'),

  asaSymbol: z.string().max(5, 'ASA symbol should be at max 5 character')

  // adminAddress: z.array(z.string()).min(1, 'Admin address is required'),
});

export default projectSchema;
