import { useQuery } from '@tanstack/react-query';
import API from '@/utils/API';

const useGetWithoutId = (qkey: string, urls: string) => {
  const { isError, isLoading, data } = useQuery({
    queryKey: [qkey],
    queryFn: async () => {
      const { data } = await API.get(`${urls}`);
console.log(data,'hooookss')
      return data;
    },
  });
  return { isError, isLoading, data };
};

export default useGetWithoutId;
