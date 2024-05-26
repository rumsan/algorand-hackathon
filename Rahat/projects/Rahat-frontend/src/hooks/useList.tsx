import { useQuery } from '@tanstack/react-query';
import API from '../utils/API';

const useList = (qkey: string, urls: string, page: number, limit: number, email?: string, walletAddress?: string) => {
  const str = JSON.stringify({ page, limit });

  const { isError, isLoading, data } = useQuery({
    queryKey: [qkey, str],
    queryFn: async () => {
      const params = {
        page: page,
        limit: limit,
        email: email,
        walletAddress: walletAddress,
      };
      const { data } = await API.get(urls, { params });

      return data;
    },
  });

  return { isError, isLoading, data };
};

export default useList;
