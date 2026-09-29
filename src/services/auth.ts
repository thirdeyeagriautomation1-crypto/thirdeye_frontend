import apiClient, { unwrap } from '../utils/api';

export interface AdminAuthResponse {
  email: string;
  name: string;
  role: string;
}

export interface LoginResponseData {
  admin: AdminAuthResponse;
  token: string;
}

export async function adminLoginApi(email: string, password: string): Promise<LoginResponseData> {
  const res = await apiClient.post('/apistore/auth/login', { email, password });
  return unwrap<LoginResponseData>(res);
}
