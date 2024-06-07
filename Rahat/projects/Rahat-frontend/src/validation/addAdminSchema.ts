import { z } from 'zod';

const addAdminSchema = z.object({
  adminIds: z.string().min(10, 'Address not valid'),
});

export default addAdminSchema;
