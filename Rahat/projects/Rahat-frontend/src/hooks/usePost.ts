import API from '../utils/API';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Get QueryClient from the context

const usePost = (qkey: string) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  // Needs refactor, just for quick fix
  const [dataState, setDataState] = useState<any>();
  const {
    mutate: postMutation,
    isError,
    isSuccess,
    data,
    isPending,
  } = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await API.post(payload.urls, { ...payload.data });

      return data; // Ensure returning response.data
    },
    onError(error) {
      setSuccess(false);
      setError((error as any).response.data.message);
      setTimeout(() => {
        setError(false);
      }, 2000);
    },
    onSuccess: async () => {
      setSuccess(true);

      if (qkey != 'false') {
        console.log('invalidateQueries huna pugyo');
        queryClient.invalidateQueries({ queryKey: [qkey] });
      }
    },


  });
  console.log('dataayo', data);
  return { postMutation, data, isError, isSuccess, dataState, error, success, isPending };
};

export default usePost;
