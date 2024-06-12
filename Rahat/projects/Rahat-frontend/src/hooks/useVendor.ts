import { useQuery } from '@tanstack/react-query';
import API from '@/utils/API';
import { URLS } from '@/constants';

const useVendor = (qkey: string, urls: string, id?: string, projectId?: string) => {
  const { isError, isLoading, data } = useQuery({
    queryKey: [qkey, id],
    queryFn: async () => {
      const { data } = await API.get(`${URLS.VENDOR}/${id}`) 

      return data;
    },
  });
  return { isError, isLoading, data };
};

export default useVendor;
