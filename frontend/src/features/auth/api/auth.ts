import client from '@/api/client';
import { type LoginInput, type SignupInput, type UserResponse } from '../types';

export const authApi = {
  login: async (data: LoginInput): Promise<{ access_token: string }> => {
    const response = await client.post('/auth/login', data);
    return response.data;
  },
  
  signup: async (data: SignupInput): Promise<{ access_token: string }> => {
    const response = await client.post('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await client.get('/auth/me');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await client.post('/auth/logout');
  }
};
