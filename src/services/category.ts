import apiClient, { unwrap } from '../utils/api';

export interface Category {
  id: string;
  name: string;
  description?: string;
  active_flag: number;
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await apiClient.get('/apistore/category');
  return unwrap<Category[]>(response as any);
}
