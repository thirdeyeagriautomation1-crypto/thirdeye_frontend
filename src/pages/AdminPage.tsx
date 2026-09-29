import { useState, useEffect } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Plus, Pencil, Trash2, Upload, X, Video, Link as LinkIcon, Download, LogOut, Eye, EyeOff, Play, ShieldCheck, RefreshCw } from 'lucide-react';
import { Product } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { fetchCategories, Category } from '../services/category';
import { fetchProduct } from '../services/product';
import { extractYouTubeVideoId } from '../utils/youtubeUtils';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { ProductFormDialog, ProductFormData } from '../components/forms/ProductFormDialog';



// 
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


// ─── Admin Login Page ────────────────────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const { login } = useAdminAuth();
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const ok = await login(email, password);
    setLoading(false);
    if (ok) {
      toast.success('Welcome back, Admin!');
      onLogin();
    } else {
      setError('Invalid email or password.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-slate-950 overflow-hidden">
      {/* Left side: Beautiful Graphic / Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-green-950 text-white items-center justify-center overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1592424001718-4e89791bc5a5?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-900/80 to-slate-950/95"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-green-500/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-400/20 blur-[100px]"></div>
        </div>

        <div className="relative z-10 p-16 max-w-2xl flex flex-col justify-between h-full">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <ShieldCheck className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-6 leading-tight">
              Control Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Smart Irrigation</span>
            </h1>
            <p className="text-green-100/80 text-lg leading-relaxed max-w-md">
              Securely manage your entire catalog of IoT controllers, fertigation systems, and smart sensors from one centralized command center.
            </p>
          </div>
          
          <div className="mt-12 flex items-center gap-4 text-green-200/60 text-sm font-medium">
            <span className="flex items-center gap-2"><RefreshCw size={16} /> Real-time Sync</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/50"></span>
            <span className="flex items-center gap-2"><ShieldCheck size={16} /> Secure Access</span>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative p-8 sm:p-12 lg:p-24 bg-slate-50 dark:bg-slate-950">
        
        {/* Mobile background gradient */}
        <div className="absolute top-0 right-0 w-full h-full lg:hidden overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[40%] rounded-full bg-green-500/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[100px]" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="lg:hidden text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Portal</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">ThirdEye Agri Automation</p>
          </div>

          <div className="mb-10 hidden lg:block">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Enter your credentials to access the dashboard.</p>
          </div>

          <div className="bg-white dark:bg-white/5 lg:bg-transparent lg:dark:bg-transparent lg:border-none lg:shadow-none p-8 lg:p-0 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</Label>
                <div className="relative group">
                  <Input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    placeholder="admin@example.com"
                    autoFocus
                    className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-green-500/50 focus-visible:border-green-500 transition-all duration-300 h-12 px-4 shadow-sm"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-pwd" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</Label>
                  <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500 transition-colors">Forgot password?</a>
                </div>
                <div className="relative group">
                  <Input
                    id="admin-pwd"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="••••••••"
                    className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus-visible:ring-green-500/50 focus-visible:border-green-500 transition-all duration-300 h-12 px-4 pr-12 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {error && (
                  <p className="text-red-500 dark:text-red-400 text-sm flex items-center gap-1.5 mt-2 animate-in fade-in slide-in-from-top-1">
                    <X size={14} /> {error}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium h-12 rounded-xl shadow-lg shadow-green-600/20 hover:shadow-green-600/30 transition-all duration-300 mt-2"
                disabled={loading || !password}
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin mr-2" />
                ) : (
                  <ShieldCheck size={18} className="mr-2" />
                )}
                {loading ? 'Authenticating…' : 'Sign in to Dashboard'}
              </Button>
            </form>
          </div>

          {/* Back link */}
          <p className="text-center mt-12 text-sm font-medium text-slate-500">
            <a href="/" className="hover:text-green-600 dark:hover:text-green-400 hover:underline transition-colors flex items-center justify-center gap-1.5">
              <span className="text-lg leading-none">←</span> Back to main website
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export function AdminPage() {
  const { isAdmin, login, logout } = useAdminAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdmin);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => { logout(); setIsAuthenticated(false); };

  // Sync if another tab logs in
  if (!isAuthenticated && isAdmin) setIsAuthenticated(true);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

// Main Admin Dashboard Component
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { products, loading, error, refresh, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
              const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(console.error);
  }, []);

  


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
      } else {
        await addProduct(productData);
      }
      toast.success('Product saved successfully!');
      setIsDialogOpen(false);
      setEditingProduct(null);
      refresh();
    } catch (err) {
      toast.error('Failed to save product: ' + (err instanceof Error ? err.message : 'Unknown error'));
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      toast.success('Product deleted successfully');
    }
  };
  const downloadJSON = () => {
    const dataToDownload = {
      exportDate: new Date().toISOString(),
      totalProducts: products.length,
      products: products,
    };

    const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], {
      type: 'application/json',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `products-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    toast.success('Products exported successfully! Replace public/products.json with this file.');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    onLogout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
            <p className="text-gray-600">Manage your irrigation and fertigation products</p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-green-600">{products.length}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Categories</p>
                <p className="text-3xl font-bold text-blue-600">{categories.length}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Last Modified</p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-2">Export</p>
                <Button
                  onClick={downloadJSON}
                  variant="outline"
                  size="sm"
                  className="w-full bg-white hover:bg-gray-100"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export JSON
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 rounded flex items-center justify-between">
            <div>
              <h3 className="font-bold">Error loading products</h3>
              <p className="text-sm">{error}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => refresh()}>
              <RefreshCw className="mr-2 h-4 w-4" /> Retry
            </Button>
          </div>
        )}

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>View and manage all products loaded from API</CardDescription>
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex items-center gap-6 animate-pulse p-2 border-b border-gray-100 last:border-0">
                      <div className="w-16 h-16 bg-gray-200 rounded shrink-0"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="flex gap-2">
                          <div className="h-4 bg-gray-200 rounded-full w-20"></div>
                          <div className="h-4 bg-gray-200 rounded-full w-24"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="flex gap-2 shrink-0">
                        <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <p>No products found in the database.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                    Create your first product
                  </Button>
                </div>
              ) : (
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Subcategory</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {categories.find(c => c.id === product.category)?.name || product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.subcategory}</TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-500">{product.features.length} features</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id, product.name)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Product Dialog */}
        <ProductFormDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleDialogSubmit}
          initialData={editingProduct}
          categories={categories}
        />
      </div>
    </div>
  );
}
