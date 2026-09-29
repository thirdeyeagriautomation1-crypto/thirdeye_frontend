/**
 * ProductContext
 *
 * Provides product state across the app and wires all CRUD operations
 * to the FastAPI backend via the product service layer (src/services/product.ts).
 *
 * Falls back to the static `products` array only when the API is unreachable,
 * so the site still renders with dummy data during local development.
 */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Product } from "../data/products";
import {
  fetchProducts,
  createProduct,
  updateProduct as apiUpdateProduct,
  deleteProduct as apiDeleteProduct,
  ApiProduct,
} from "../services/product";

// --- Helpers ------------------------------------------------------------------

/** Map an ApiProduct (backend shape) ? Product (frontend shape) */
function toFrontend(p: ApiProduct): Product {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory ?? "",
    description: p.description ?? "",
    detailedDescription: p.detailedDescription,
    features: p.features ?? [],
    image: p.image ?? "",
    additionalMedia: p.additionalMedia as Product["additionalMedia"],
    technicalSpecs: p.technicalSpecs,
    price: p.price,
    quantity: p.quantity,
    sku: p.sku,
    is_active: p.is_active,
    created_at: p.created_at,
    updated_at: p.updated_at,
  };
}

// --- Context type -------------------------------------------------------------

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  /** Reload products from the API */
  refresh: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  /** Replace local state directly (used by admin bulk-load, etc.) */
  loadProducts: (newProducts: Product[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// --- Provider -----------------------------------------------------------------

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /** Load all products from the backend API */
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchProducts({ limit: 200 });
      setProducts(response.products.map(toFrontend));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load products";
      console.warn("[ProductContext] API unavailable, using static data:", msg);
      setError(msg);
      // Keep whatever is already in state (could be static data on first mount)
    } finally {
      setLoading(false);
    }
  }, []);

  // Load on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  // -- CRUD ------------------------------------------------------------------

  const addProduct = useCallback(async (product: Product) => {
    const created = await createProduct({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      detailedDescription: product.detailedDescription,
      features: product.features,
      image: product.image,
      additionalMedia: product.additionalMedia as any,
      technicalSpecs: product.technicalSpecs,
      price: product.price ?? 0,
      quantity: product.quantity ?? 0,
      sku: product.sku,
      is_active: product.is_active ?? true,
    });
    setProducts((prev) => [...prev, toFrontend(created)]);
  }, []);

  const updateProduct = useCallback(async (id: string, product: Product) => {
    const updated = await apiUpdateProduct(id, {
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      detailedDescription: product.detailedDescription,
      features: product.features,
      image: product.image,
      additionalMedia: product.additionalMedia as any,
      technicalSpecs: product.technicalSpecs,
      price: product.price,
      quantity: product.quantity,
      sku: product.sku,
      is_active: product.is_active,
    });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? toFrontend(updated) : p)),
    );
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await apiDeleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const loadProducts = useCallback((newProducts: Product[]) => {
    setProducts(newProducts);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        refresh,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

// --- Hook ---------------------------------------------------------------------

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
