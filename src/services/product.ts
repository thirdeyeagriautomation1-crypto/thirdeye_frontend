/**
 * Product Service
 *
 * All product-related API calls live here.
 * Uses the shared Axios instance from utils/api.ts and maps the
 * backend StandardResponse envelope via the `unwrap` helper.
 */
import apiClient, { unwrap } from '../utils/api';

const BASE = '/apistore/product';

// --- Types aligned with the FastAPI ProductResponse schema -------------------

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  isUrl?: boolean;
}

export interface ApiProduct {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  detailedDescription?: string;
  features: string[];
  image?: string;
  additionalMedia: MediaItem[];
  technicalSpecs: Record<string, string>;
  price: number;
  quantity: number;
  sku?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductListResponse {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface CreateProductPayload {
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  detailedDescription?: string;
  features?: string[];
  image?: string;
  additionalMedia?: MediaItem[];
  technicalSpecs?: Record<string, string>;
  price?: number;
  quantity?: number;
  sku?: string;
  is_active?: boolean;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;

// --- API calls ---------------------------------------------------------------

/**
 * Fetch a paginated list of products.
 * Pass `category` to filter server-side.
 */
export async function fetchProducts(params?: {
  skip?: number;
  limit?: number;
  category?: string;
  is_active?: boolean;
}): Promise<ProductListResponse> {
  const res = await apiClient.get(`${BASE}/list`, { params });
  return unwrap<ProductListResponse>(res);
}

/**
 * Fetch a single product by its Firestore document ID.
 */
export async function fetchProduct(id: string): Promise<ApiProduct> {
  const res = await apiClient.get(`${BASE}/view`, { params: { id } });
  return unwrap<ApiProduct>(res);
}

/**
 * Create a new product.
 */
export async function createProduct(payload: CreateProductPayload): Promise<ApiProduct> {
  const res = await apiClient.post(`${BASE}/create`, payload);
  return unwrap<ApiProduct>(res);
}

/**
 * Update an existing product (partial update — only send changed fields).
 */
export async function updateProduct(
  id: string,
  payload: UpdateProductPayload,
): Promise<ApiProduct> {
  const res = await apiClient.put(`${BASE}/update/${id}`, payload);
  return unwrap<ApiProduct>(res);
}

/**
 * Delete a product by ID.
 */
export async function deleteProduct(id: string): Promise<void> {
  await apiClient.delete(`${BASE}/delete`, { params: { id } });
}
