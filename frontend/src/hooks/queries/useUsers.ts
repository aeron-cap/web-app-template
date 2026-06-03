import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';

export function useHelloUser() {
  return useQuery({
    queryKey: ['hello-user'],
    queryFn: async () => {
      const { data } = await api.get('/user');
      return data;
    },
  });
}
