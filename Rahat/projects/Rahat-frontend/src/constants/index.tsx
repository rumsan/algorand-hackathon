export const SERVER_URL: string = import.meta.env.VITE_BACKEND_BASE_URL;

const version: string = 'api/v1';
export const URLS = {
  BENEFICIARY: version + '/beneficiary',
  PROJECT: version + '/projects',
  VENDOR: version + '/vendor',
  VOUCHER: version + '/vouchers',
};
