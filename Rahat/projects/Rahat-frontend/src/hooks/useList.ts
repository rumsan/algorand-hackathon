import { useQuery } from '@tanstack/react-query';
import API from '../utils/API';

const useList = (qkey: string, urls: string, page: number, limit: number, email?: string, id?: string) => {
  const str = JSON.stringify({ page, limit });

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: [qkey,str],
    queryFn: async () => {
      const params = {
        page,
        // Refactor: Asim
        limit,
        email,
        id: id,
      };
      const { data } = await API.get(urls, { params });
      console.log(data, 'hooks');
      return data;
    },
    
  });

  return { isError, isLoading, data, refetch };
};

export default useList;
