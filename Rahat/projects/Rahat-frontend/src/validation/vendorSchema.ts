import { z } from 'zod';

const vendorSchema = z.object({
  name: z.string().min(1, 'Vendor name is required'),
  email : z.string().email('Invalid email address'),
  location: z.string().min(1, 'Location is required'),
  walletAddress: z.string().min(1, 'Wallet address is required'),
  // projectId: z.string().min(1, 'Project ID is required'),
});

export default vendorSchema;
