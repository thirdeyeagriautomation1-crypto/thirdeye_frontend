import { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, X, Video, Play, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';
import { Category } from '../../services/category';
import { Product } from '../../data/products';
import { extractYouTubeVideoId } from '../../utils/youtubeUtils';

export interface MediaFile {
  type: 'image' | 'video';
  url: string;
  isUrl?: boolean;
}

export interface ProductFormData {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  detailedDescription: string;
  features: string[];
  image: string;
  additionalMedia: MediaFile[];
  technicalSpecs: { [key: string]: string };
  price: number;
  quantity: number;
  sku: string;
}

export const subcategoryOptions: { [key: string]: string[] } = {
  wireless: ['WiFi Controllers', 'LoRa Controllers', 'Bluetooth Controllers', 'Zigbee Controllers'],
  wired: ['Professional Controllers', 'Residential Controllers', 'Weather-Based Controllers'],
  fertigation: ['Complete Systems', 'Dosing Controllers', 'Monitoring Equipment'],
  iot: ['Mobile Applications', 'Gateway Devices', 'Sensor Packages'],
  solar: ['Complete Solar Kits', 'Battery Systems', 'Solar Controllers'],
};

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

export function getEmptyFormData(): ProductFormData {
  return {
    id: '',
    name: '',
    category: '',
    subcategory: '',
    description: '',
    detailedDescription: '',
    features: [],
    image: '',
    additionalMedia: [],
    technicalSpecs: {},
    price: 0,
    quantity: 0,
    sku: '',
  };
}

interface ProductFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  initialData: Product | null;
  categories: Category[];
  onDelete?: (id: string, name: string) => void;
}

export function ProductFormDialog({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categories,
  onDelete
}: ProductFormDialogProps) {
  const [formData, setFormData] = useState<ProductFormData>(getEmptyFormData());
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          id: initialData.id,
          name: initialData.name,
          category: initialData.category,
          subcategory: initialData.subcategory ?? '',
          description: initialData.description ?? '',
          detailedDescription: initialData.detailedDescription || '',
          features: [...initialData.features],
          image: initialData.image,
          additionalMedia: (initialData.additionalMedia as MediaFile[]) || [],
          technicalSpecs: initialData.technicalSpecs || {},
          price: initialData.price ?? 0,
          quantity: initialData.quantity ?? 0,
          sku: initialData.sku ?? '',
        });
      } else {
        setFormData(getEmptyFormData());
      }
      // Reset temporary states
      setNewFeature('');
      setNewSpecKey('');
      setNewSpecValue('');
      setVideoUrl('');
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const missingFields: string[] = [];
    if (!formData.name) missingFields.push("Product Name");
    if (!formData.category) missingFields.push("Category");
    if (!formData.subcategory) missingFields.push("Subcategory");
    if (!formData.description) missingFields.push("Short Description");

    if (missingFields.length > 0) {
      toast.error(`Missing required fields: ${missingFields.join(", ")}`);
      return;
    }
    
    onSubmit(formData);
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setFormData(prev => ({
        ...prev,
        technicalSpecs: { ...prev.technicalSpecs, [newSpecKey.trim()]: newSpecValue.trim() },
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
          setFormData(prev => ({ ...prev, image: event.target!.result as string }));
          toast.success('Image uploaded successfully');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
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
          setFormData(prev => ({ ...prev, image: event.target!.result as string }));
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
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0 border-none bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-white dark:bg-slate-950 px-8 py-6 border-b border-slate-100 dark:border-white/10 shrink-0">
            <DialogTitle className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              {initialData ? (
                <>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Save className="w-5 h-5" />
                  </div>
                  Edit Product Details
                </>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  Create New Product
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-slate-500 mt-2 ml-14">
              Comprehensive product setup. All fields marked with * are required.
            </DialogDescription>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="p-8">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 shadow-inner mb-6">
                  <TabsTrigger value="basic" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Basic Info</TabsTrigger>
                  <TabsTrigger value="media" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Media Gallery</TabsTrigger>
                  <TabsTrigger value="features" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Features</TabsTrigger>
                  <TabsTrigger value="specs" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-green-600 data-[state=active]:shadow-sm">Specifications</TabsTrigger>
                </TabsList>

                {/* BASIC INFO */}
                <TabsContent value="basic" className="space-y-6 outline-none focus:ring-0">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-8 space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., AgroSmart WiFi Pro Controller"
                        className="bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 h-12"
                        required
                      />
                    </div>
                    <div className="col-span-12 md:col-span-4 space-y-2">
                      <Label htmlFor="sku" className="text-sm font-semibold text-slate-700 dark:text-slate-300">SKU Code</Label>
                      <Input
                        id="sku"
                        value={formData.sku}
                        onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                        placeholder="e.g. AGRO-001"
                        className="bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 h-12"
                      />
                    </div>

                    <div className="col-span-12 md:col-span-6 space-y-2">
                      <Label htmlFor="category" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value, subcategory: '' }))}
                      >
                        <SelectTrigger className="bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 h-12">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-12 md:col-span-6 space-y-2">
                      <Label htmlFor="subcategory" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subcategory *</Label>
                      <Input
                        id="subcategory"
                        value={formData.subcategory}
                        onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
                        placeholder="e.g. WiFi Controllers"
                        className="bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 h-12"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                        placeholder="0.00"
                        className="bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Stock Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="0"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                        className="bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Short Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Punchy, marketing-focused summary..."
                      rows={3}
                      className="bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10 resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="detailedDescription" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Detailed Overview</Label>
                    <Textarea
                      id="detailedDescription"
                      value={formData.detailedDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, detailedDescription: e.target.value }))}
                      placeholder="In-depth explanation of the product's capabilities..."
                      rows={5}
                      className="bg-white dark:bg-slate-950 border-slate-200 dark:border-white/10"
                    />
                  </div>
                </TabsContent>

                {/* MEDIA */}
                <TabsContent value="media" className="space-y-8 outline-none focus:ring-0">
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm">
                    <Label className="text-base font-semibold text-slate-800 dark:text-white mb-4 block">Primary Product Hero *</Label>
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${
                        dragActive ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      {formData.image ? (
                        <div className="relative inline-block group">
                          <img
                            src={formData.image}
                            alt="Primary"
                            className="max-h-64 rounded-lg object-contain shadow-md"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="rounded-full h-10 w-10 p-0"
                              onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                            >
                              <X className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="pointer-events-none">
                          <div className="w-16 h-16 mx-auto bg-green-50 dark:bg-slate-800 text-green-600 dark:text-slate-400 rounded-full flex items-center justify-center mb-4">
                            <Upload className="h-8 w-8" />
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">
                            Drag and drop your high-res image
                          </p>
                          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">
                            PNG, JPG or WEBP up to 5MB
                          </p>
                        </div>
                      )}
                      
                      {!formData.image && (
                        <>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Button
                            type="button"
                            className="mt-6 pointer-events-auto bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700"
                            onClick={() => document.getElementById('image-upload')?.click()}
                          >
                            Browse Files
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm">
                    <Label className="text-base font-semibold text-slate-800 dark:text-white mb-4 block">Product Video URLs</Label>
                    <div className="flex gap-3 mb-6">
                      <div className="relative flex-1">
                        <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                          placeholder="Paste YouTube or Vimeo URL..."
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          className="pl-10 h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                        />
                      </div>
                      <Button type="button" onClick={handleAddVideoUrl} className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm">
                        Add Video
                      </Button>
                    </div>

                    {formData.additionalMedia.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.additionalMedia.map((media, index) => (
                          <div key={index} className="group relative border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-900 flex flex-col gap-3">
                            {media.type === 'video' ? (
                              <>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                      <Play className="h-4 w-4 fill-current" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-800 dark:text-white">Video #{index + 1}</span>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                                    onClick={() => handleRemoveMedia(index)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800">
                                  <YouTubePlayer url={media.url} />
                                </div>
                              </>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* FEATURES */}
                <TabsContent value="features" className="space-y-6 outline-none focus:ring-0">
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm">
                    <Label className="text-base font-semibold text-slate-800 dark:text-white mb-2 block">Key Selling Points</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                      Highlight the most important capabilities. Press enter to add quickly.
                    </p>

                    <div className="flex gap-3 mb-6">
                      <Input
                        placeholder="e.g. Real-time soil moisture monitoring..."
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                        className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      />
                      <Button type="button" onClick={handleAddFeature} className="h-12 w-12 bg-green-600 hover:bg-green-700 text-white shrink-0 p-0 rounded-xl">
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>

                    {formData.features.length > 0 && (
                      <div className="space-y-3">
                        {formData.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 group hover:border-green-200 transition-colors"
                          >
                            <span className="flex-1 text-slate-700 dark:text-slate-300 font-medium">{feature}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveFeature(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* SPECS */}
                <TabsContent value="specs" className="space-y-6 outline-none focus:ring-0">
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm">
                    <Label className="text-base font-semibold text-slate-800 dark:text-white mb-2 block">Technical Specifications</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                      Build the spec sheet table with key-value data points.
                    </p>

                    <div className="flex gap-3 mb-8 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-slate-500">Property</Label>
                        <Input
                          placeholder="e.g. Operating Temp"
                          value={newSpecKey}
                          onChange={(e) => setNewSpecKey(e.target.value)}
                          className="h-10 bg-white dark:bg-slate-950"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <Label className="text-xs text-slate-500">Value</Label>
                        <Input
                          placeholder="e.g. -10°C to 60°C"
                          value={newSpecValue}
                          onChange={(e) => setNewSpecValue(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpec())}
                          className="h-10 bg-white dark:bg-slate-950"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button type="button" onClick={handleAddSpec} className="h-10 w-10 bg-blue-600 hover:bg-blue-700 text-white shrink-0 p-0 rounded-lg">
                          <Plus className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>

                    {Object.keys(formData.technicalSpecs).length > 0 && (
                      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 font-medium">
                            <tr>
                              <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 w-1/3">Property</th>
                              <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">Value</th>
                              <th className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 w-16 text-center"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950">
                            {Object.entries(formData.technicalSpecs).map(([key, value]) => (
                              <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 group">
                                <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-300">{key}</td>
                                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{value}</td>
                                <td className="px-4 py-3 text-center">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => handleRemoveSpec(key)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer */}
            <div className="bg-white dark:bg-slate-950 px-8 py-5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between shrink-0">
              <div>
                {initialData && onDelete && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 font-medium"
                    onClick={() => onDelete(initialData.id, initialData.name)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Product
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" className="px-6 font-medium border-slate-200 dark:border-slate-700 hover:bg-slate-50" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="px-8 bg-green-600 hover:bg-green-700 text-white font-medium shadow-md shadow-green-600/20">
                  {initialData ? 'Save Changes' : 'Create Product'}
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Video Preview Modal inside the Form Component */}
      <Dialog open={isVideoModalOpen} onOpenChange={setIsVideoModalOpen}>
        <DialogContent className="max-w-4xl p-0 border-none bg-black overflow-hidden">
          {selectedVideo && <YouTubePlayer url={selectedVideo} title="Preview" />}
        </DialogContent>
      </Dialog>
    </>
  );
}
