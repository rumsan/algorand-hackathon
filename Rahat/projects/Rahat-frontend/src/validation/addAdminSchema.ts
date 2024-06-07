import { z } from 'zod';

const addAdminSchema = z.object({
  address: z.string().min(10, 'Address not valid'),
});

export default addAdminSchema;
