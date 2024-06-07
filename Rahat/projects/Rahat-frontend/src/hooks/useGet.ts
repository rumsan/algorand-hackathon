import { useQuery } from '@tanstack/react-query';
import API from '@/utils/API';

const useGet = (qkey: string, urls: string, id?: string) => {
  const { isError, isLoading, data } = useQuery({
    queryKey: [qkey, id],
    queryFn: async () => {
      const { data } = id ? await API.get(`${urls}/${id}`) : await API.get(`${urls}`);

      return data;
    },
  });
  return { isError, isLoading, data };
};

export default useGet;
