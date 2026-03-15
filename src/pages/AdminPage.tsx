import { useState } from 'react';
import { Plus, Pencil, Trash2, Upload, X, Video, Link as LinkIcon } from 'lucide-react';
import { Product } from '../data/products';
import { productCategories } from '../data/products';
import { useProducts } from '../context/ProductContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';

interface MediaFile {
  type: 'image' | 'video';
  url: string;
  isUrl?: boolean;
}

interface ProductFormData {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  detailedDescription: string;
  features: string[];
  primaryImage: string;
  additionalMedia: MediaFile[];
  technicalSpecs: { [key: string]: string };
}

const subcategoryOptions: { [key: string]: string[] } = {
  wireless: ['WiFi Controllers', 'LoRa Controllers', 'Bluetooth Controllers', 'Zigbee Controllers'],
  wired: ['Professional Controllers', 'Residential Controllers', 'Weather-Based Controllers'],
  fertigation: ['Complete Systems', 'Dosing Controllers', 'Monitoring Equipment'],
  iot: ['Mobile Applications', 'Gateway Devices', 'Sensor Packages'],
  solar: ['Complete Solar Kits', 'Battery Systems', 'Solar Controllers'],
};

export function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
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

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      detailedDescription: '',
      features: [...product.features],
      primaryImage: product.image,
      additionalMedia: [],
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
      features: formData.features,
      image: formData.primaryImage || 'https://images.unsplash.com/photo-1685475188388-2a266e6bd5c4?w=400',
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage your irrigation and fertigation products</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>View and manage all products</CardDescription>
              </div>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
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
                          {productCategories.find(c => c.id === product.category)?.name}
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
            </ScrollArea>
          </CardContent>
        </Card>

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
                        placeholder="Detailed product information (supports rich text)"
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
                    <Label>Additional Media (Images & Videos)</Label>
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
                        <div className="grid grid-cols-3 gap-4">
                          {formData.additionalMedia.map((media, index) => (
                            <div key={index} className="relative border rounded p-2">
                              {media.type === 'video' ? (
                                <div className="flex items-center gap-2">
                                  <Video className="h-8 w-8 text-gray-400" />
                                  <div className="flex-1 text-sm truncate">{media.url}</div>
                                </div>
                              ) : (
                                <img src={media.url} alt="" className="w-full h-24 object-cover rounded" />
                              )}
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-1 right-1"
                                onClick={() => handleRemoveMedia(index)}
                              >
                                <X className="h-3 w-3" />
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

              <DialogFooter className="mt-6">
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
    </div>
  );
}
