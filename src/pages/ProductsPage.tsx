import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, MessageSquare, Plus, Pencil, Trash2, Upload, Video } from 'lucide-react';
import { productCategories, Product } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner@2.0.3';
import { ScrollArea } from '../components/ui/scroll-area';

interface ProductFormData {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  detailedDescription: string;
  features: string[];
  primaryImage: string;
  additionalMedia: Array<{
    type: 'image' | 'video';
    url: string;
    isUrl?: boolean;
  }>;
  technicalSpecs: { [key: string]: string };
}

const subcategoryOptions: { [key: string]: string[] } = {
  wireless: ['WiFi Controllers', 'LoRa Controllers', 'Bluetooth Controllers', 'Zigbee Controllers'],
  wired: ['Professional Controllers', 'Residential Controllers', 'Weather-Based Controllers'],
  fertigation: ['Complete Systems', 'Dosing Controllers', 'Monitoring Equipment'],
  iot: ['Mobile Applications', 'Gateway Devices', 'Sensor Packages'],
  solar: ['Complete Solar Kits', 'Battery Systems', 'Solar Controllers'],
};

export function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  // Admin dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(getEmptyFormData());
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  function getEmptyFormData(): ProductFormData {
    return {
      id: '',
      name: '',
      category: '',
      subcategory: '',
      description: '',
      detailedDescription: '',
      features: [],
      primaryImage: '',
      additionalMedia: [],
      technicalSpecs: {},
    };
  }

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

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      detailedDescription: product.detailedDescription || '',
      features: [...product.features],
      primaryImage: product.image,
      additionalMedia: product.additionalMedia || [],
      technicalSpecs: product.technicalSpecs || {},
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id);
      toast.success('Product deleted successfully');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.subcategory || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const productData: Product = {
      id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      description: formData.description,
      detailedDescription: formData.detailedDescription,
      features: formData.features,
      image: formData.primaryImage || 'https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?w=400',
      additionalMedia: formData.additionalMedia,
      technicalSpecs: formData.technicalSpecs,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      toast.success('Product updated successfully');
    } else {
      addProduct(productData);
      toast.success('Product added successfully');
    }

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData(getEmptyFormData());
    setNewFeature('');
    setNewSpecKey('');
    setNewSpecValue('');
    setVideoUrl('');
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        technicalSpecs: {
          ...prev.technicalSpecs,
          [newSpecKey.trim()]: newSpecValue.trim(),
        },
      }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const handleRemoveSpec = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.technicalSpecs };
      delete newSpecs[key];
      return { ...prev, technicalSpecs: newSpecs };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, primaryImage: event.target!.result as string }));
          toast.success('Image uploaded successfully');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData(prev => ({ ...prev, primaryImage: event.target!.result as string }));
          toast.success('Image uploaded successfully');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVideoUrl = () => {
    if (videoUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        additionalMedia: [...prev.additionalMedia, { type: 'video', url: videoUrl.trim(), isUrl: true }],
      }));
      setVideoUrl('');
      toast.success('Video URL added');
    }
  };

  const handleRemoveMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalMedia: prev.additionalMedia.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                
                {productCategories.map((category) => (
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
                      All {productCategories.find(c => c.id === selectedCategory)?.name}
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
                        {productCategories.find(c => c.id === selectedCategory)?.name}
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
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500">No products found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group relative">
                    {/* Edit button overlay */}
                    <button
                      onClick={() => handleEdit(product)}
                      className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 p-2 rounded-full shadow-lg"
                    >
                      <Pencil className="h-4 w-4 text-green-600" />
                    </button>

                    <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="p-6">
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
                      
                      <Link
                        to="/contact"
                        state={{ product: product.name }}
                        className="w-full inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors"
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

      {/* Product Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              Fill in the product details below. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., AgroSmart WiFi Pro Controller"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, subcategory: '' }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="subcategory">Subcategory *</Label>
                      <Select
                        value={formData.subcategory}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, subcategory: value }))}
                        disabled={!formData.category}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select subcategory" />
                        </SelectTrigger>
                        <SelectContent>
                          {formData.category && subcategoryOptions[formData.category]?.map((sub) => (
                            <SelectItem key={sub} value={sub}>
                              {sub}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Marketing-focused description (50-100 words)"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="detailedDescription">Detailed Description (Optional)</Label>
                    <Textarea
                      id="detailedDescription"
                      value={formData.detailedDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, detailedDescription: e.target.value }))}
                      placeholder="Detailed product information"
                      rows={5}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-4 mt-4">
                <div>
                  <Label>Primary Product Image *</Label>
                  <div
                    className={`mt-2 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.primaryImage ? (
                      <div className="relative inline-block">
                        <img
                          src={formData.primaryImage}
                          alt="Primary"
                          className="max-w-xs max-h-48 rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setFormData(prev => ({ ...prev, primaryImage: '' }))}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                          Drag and drop an image, or click to select
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-4"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          Select Image
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Additional Media (Videos)</Label>
                  <div className="mt-2 space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="YouTube or Vimeo URL"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                      />
                      <Button type="button" onClick={handleAddVideoUrl}>
                        <Video className="mr-2 h-4 w-4" />
                        Add Video
                      </Button>
                    </div>

                    {formData.additionalMedia.length > 0 && (
                      <div className="space-y-2">
                        {formData.additionalMedia.map((media, index) => (
                          <div key={index} className="relative border rounded p-3 flex items-center gap-3">
                            <Video className="h-5 w-5 text-gray-400" />
                            <div className="flex-1 text-sm truncate">{media.url}</div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveMedia(index)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4 mt-4">
                <div>
                  <Label>Key Features</Label>
                  <p className="text-sm text-gray-500 mb-4">
                    Add the main features and benefits of this product
                  </p>

                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Enter a feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <Button type="button" onClick={handleAddFeature}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {formData.features.length > 0 && (
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded border"
                        >
                          <span className="flex-1">{feature}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveFeature(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="specs" className="space-y-4 mt-4">
                <div>
                  <Label>Technical Specifications</Label>
                  <p className="text-sm text-gray-500 mb-4">
                    Add technical specifications as key-value pairs
                  </p>

                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Specification name (e.g., Zones)"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Value (e.g., 12)"
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      className="flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpec())}
                    />
                    <Button type="button" onClick={handleAddSpec}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {Object.keys(formData.technicalSpecs).length > 0 && (
                    <div className="space-y-2">
                      {Object.entries(formData.technicalSpecs).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded border"
                        >
                          <div className="flex-1">
                            <span className="font-medium">{key}:</span>{' '}
                            <span className="text-gray-600">{value}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveSpec(key)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6 gap-2">
              {editingProduct && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleDelete(editingProduct.id, editingProduct.name)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              )}
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
