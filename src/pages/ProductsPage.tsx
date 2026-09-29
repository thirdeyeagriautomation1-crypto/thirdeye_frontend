import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, MessageSquare, Plus, Pencil, Trash2, Upload, Video, Play, Lock, LogOut, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Product } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { fetchCategories, Category } from '../services/category';
import { fetchProduct } from '../services/product';
import { extractYouTubeVideoId } from '../utils/youtubeUtils';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { ScrollArea } from '../components/ui/scroll-area';
import { ProductFormDialog, ProductFormData } from '../components/forms/ProductFormDialog';



// YouTube Video Player Component
function YouTubePlayer({ url, title }: { url: string; title?: string }) {
  const videoId = extractYouTubeVideoId(url);

  if (!videoId) {
    return (
      <div className="bg-gray-100 rounded p-4 text-center">
        <p className="text-sm text-gray-600">Invalid YouTube URL</p>
        <p className="text-xs text-gray-500 mt-2 break-all">{url}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black rounded overflow-hidden" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
        title={title || 'YouTube Video'}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}



function ProductSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[80vh] flex flex-col animate-pulse">
      <div className="aspect-[16/10] bg-gray-200 shrink-0"></div>
      <div className="p-6 flex-1 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="space-y-2 mt-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="p-6 pt-4 border-t border-gray-100 shrink-0">
        <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="space-y-2 mb-6">
      <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
}

export function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, refresh, loading: productsLoading } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error).finally(() => setCategoriesLoading(false));
  }, []);
  
  // Video modal state
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedVideoTitle, setSelectedVideoTitle] = useState<string >('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Admin auth
  const { isAdmin, logout } = useAdminAuth();
  
  // Admin dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
          
  
  // Get unique subcategories for selected category
  const subcategories = selectedCategory !== 'all'
    ? Array.from(new Set(products.filter(p => p.category === selectedCategory).map(p => p.subcategory)))
    : [];

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSubcategory, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory('all');
    if (category !== 'all') {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const handleEdit = async (product: Product) => {
    try {
      const apiProduct = await fetchProduct(product.id);
      setEditingProduct({
        id: apiProduct.id,
        name: apiProduct.name,
        category: apiProduct.category,
        subcategory: apiProduct.subcategory ?? '',
        description: apiProduct.description ?? '',
        detailedDescription: apiProduct.detailedDescription || '',
        features: apiProduct.features ?? [],
        image: apiProduct.image ?? '',
        additionalMedia: apiProduct.additionalMedia as any,
        technicalSpecs: apiProduct.technicalSpecs || {},
        price: apiProduct.price || 0,
        quantity: apiProduct.quantity || 0,
        sku: apiProduct.sku || '',
        is_active: apiProduct.is_active,
        created_at: apiProduct.created_at,
        updated_at: apiProduct.updated_at,
      });
    } catch (err) {
      console.warn("Failed to fetch fresh product:", err);
      setEditingProduct(product); // fallback
    }
    setIsDialogOpen(true);
  };

  const handleDialogSubmit = async (data: ProductFormData) => {
    const productData: Product = {
      id: editingProduct ? editingProduct.id : '',
      name: data.name,
      category: data.category,
      subcategory: data.subcategory,
      description: data.description,
      detailedDescription: data.detailedDescription,
      features: data.features,
      image: data.image || 'https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?w=400',
      additionalMedia: data.additionalMedia,
      technicalSpecs: data.technicalSpecs,
      price: data.price,
      quantity: data.quantity,
      sku: data.sku,
      is_active: true,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        toast.success('Product updated successfully');
      } else {
        await addProduct(productData);
        toast.success('Product added successfully');
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
      refresh();
    } catch (err) {
      toast.error('Save failed: ' + (err instanceof Error ? err.message : 'Unknown'));
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully');
      } catch (err) {
        toast.error('Delete failed: ' + (err instanceof Error ? err.message : 'Unknown'));
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Admin indicator in hero */}
          {isAdmin && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/30">
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Mode
              <button onClick={logout} className="ml-1 hover:text-red-200 transition" title="Logout">
                <LogOut className="h-3 w-3" />
              </button>
            </div>
          )}
          <h1 className="mb-4 text-white">Our Products & Solutions</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our comprehensive range of smart irrigation and fertigation automation systems
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-5 h-5" />
            Filters
            {showFilters && <X className="w-4 h-4 ml-auto" />}
          </button>

          {/* Filters Sidebar */}
          <aside className={`
            ${showFilters ? 'block' : 'hidden'} lg:block
            w-full lg:w-64 flex-shrink-0
          `}>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="mb-4 text-gray-900">Filter by Category</h3>
              
              {categoriesLoading ? <CategorySkeleton /> : (
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Products
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              )}

              {/* Subcategory Filter */}
              {subcategories.length > 0 && (
                <>
                  <h3 className="mb-4 text-gray-900 pt-4 border-t">Subcategory</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedSubcategory('all')}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedSubcategory === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      All {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                    </button>
                    
                    {subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcategory(sub)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedSubcategory === sub
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Active Filters Summary */}
              {(selectedCategory !== 'all' || selectedSubcategory !== 'all') && (
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Active Filters</span>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedSubcategory('all');
                        setSearchParams({});
                      }}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2">
                    {selectedCategory !== 'all' && (
                      <div className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full inline-block">
                        {categories.find(c => c.id === selectedCategory)?.name || selectedCategory}
                      </div>
                    )}
                    {selectedSubcategory !== 'all' && (
                      <div className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full inline-block ml-2">
                        {selectedSubcategory}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
              {isAdmin ? (
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-xl transition shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </button>
              ) : null}
            </div>

            {productsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <ProductSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500">No products found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group relative flex flex-col h-[120vh]">
                    {/* Edit button overlay — only visible to admin */}
                    {isAdmin && (
                      <button
                        onClick={() => handleEdit(product)}
                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-full shadow-lg"
                        title="Edit product"
                      >
                        <Pencil className="h-4 w-4 text-green-600" />
                      </button>
                    )}

                    {/* Play video button overlay */}
                    {product.additionalMedia && product.additionalMedia.some(m => m.type === 'video') && (
                      <button
                        onClick={() => {
                          const video = product.additionalMedia!.find(m => m.type === 'video');
                          if (video) {
                            setSelectedVideo(video.url);
                            setSelectedVideoTitle(`${product.name} - Video Demo`);
                            setIsVideoModalOpen(true);
                          }
                        }}
                        className="absolute top-2 left-2 z-10 bg-white/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                        title="Watch Video Demo"
                      >
                        <Play className="h-4 w-4 text-blue-600" fill="currentColor" />
                      </button>
                    )}

                    <div className="aspect-[16/10] overflow-hidden bg-gray-100 shrink-0">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-green-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                      <div className="text-sm text-blue-600 mb-2">{product.subcategory}</div>
                      <h3 className="mb-2 text-gray-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                      
                      <div className="mb-4">
                        <div className="text-sm text-gray-700 mb-2">Key Features:</div>
                        <ul className="space-y-1">
                          {product.features.slice(0, 3).map((feature, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-green-600 mt-1">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {product.technicalSpecs && (
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-700 mb-2">Technical Specs:</div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(product.technicalSpecs).slice(0, 4).map(([key, value]) => (
                              <div key={key}>
                                <div className="text-gray-500">{key}</div>
                                <div className="text-gray-900">{value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 pt-4 border-t border-gray-100 shrink-0 bg-white shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.02)] z-10 flex flex-col gap-3">
                      {product.additionalMedia && product.additionalMedia.length > 0 && (
                        <div className="space-y-2">
                          {product.additionalMedia.filter(m => m.type === 'video').map((video, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedVideo(video.url);
                                setSelectedVideoTitle(`${product.name} - Video ${index + 1}`);
                                setIsVideoModalOpen(true);
                              }}
                              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors group"
                            >
                              <Play className="h-4 w-4 text-blue-600 group-hover:text-blue-700" />
                              <span className="text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                                Watch Demo {product.additionalMedia.filter(m => m.type === 'video').length > 1 ? `(${index + 1})` : ''}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                      
                      <Link
                        to="/contact"
                        state={{ product: product.name }}
                        className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Get a Quote
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Product Video Demo</DialogTitle>
            <DialogDescription>
              {selectedVideoTitle}
            </DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <div className="w-full">
              <YouTubePlayer url={selectedVideo} title={selectedVideoTitle} />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVideoModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Product Add/Edit Dialog */}
      <ProductFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        initialData={editingProduct}
        categories={categories}
      />
    </div>
  );
}
