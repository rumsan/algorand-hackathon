import { useQuery } from "@tanstack/react-query";
import API from "../utils/API";

const useList = (
  qkey: string,
  urls: string,
  page: number,
  limit: number,
  email?: string,
  id?: string,
  status?: "NOT_ASSIGNED" | "FREEZED" | "UNFREEZED"
) => {
  const str = JSON.stringify({ page, limit });

  const { isError, isLoading, data, refetch } = useQuery({
    queryKey: [qkey, str],
    queryFn: async () => {
      const params = {
        limit,
        page,
        email,
        id: id,
        status,
      };

      const { data } = await API.get(urls, { params });

      return data;
    },
  });

  return { isError, isLoading, data, refetch };
};

export default useList;
