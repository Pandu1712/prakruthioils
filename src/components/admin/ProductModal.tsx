import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Link as LinkIcon, Upload } from 'lucide-react';
import { Product, ProductSize } from '../../types';
import { useData } from '../../context/DataContext';
import { uploadToCloudinary } from '../../lib/cloudinary';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { categories, addProduct, updateProduct } = useData();
  
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    category: categories[0]?.id || '',
    description: '',
    image: '',
    sizes: [],
    benefits: [],
    specifications: [],
    tags: [],
    howToUse: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const [imageType, setImageType] = useState<'url' | 'upload'>('url');

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        id: 'new-' + Date.now(),
        name: '',
        category: categories[0]?.id || '',
        description: '',
        image: '',
        sizes: [{ size: '', price: 0, inStock: true }],
        benefits: [''],
        specifications: [''],
        tags: [],
        howToUse: ''
      });
    }
  }, [product, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product) {
      updateProduct(product.id, formData as Product);
    } else {
      addProduct(formData as Product);
    }
    onClose();
  };

  const handleArrayChange = (field: 'benefits' | 'specifications', index: number, value: string) => {
    const newArray = [...(formData[field] || [])];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'benefits' | 'specifications') => {
    setFormData({ ...formData, [field]: [...(formData[field] || []), ''] });
  };

  const removeArrayItem = (field: 'benefits' | 'specifications', index: number) => {
    const newArray = [...(formData[field] || [])];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSizeChange = (index: number, field: keyof ProductSize, value: any) => {
    const newSizes = [...(formData.sizes || [])];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setFormData({ ...formData, sizes: newSizes });
  };

  const addSize = () => {
    setFormData({ ...formData, sizes: [...(formData.sizes || []), { size: '', price: 0, inStock: true }] });
  };

  const removeSize = (index: number) => {
    const newSizes = [...(formData.sizes || [])];
    newSizes.splice(index, 1);
    setFormData({ ...formData, sizes: newSizes });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData({ ...formData, image: url });
    } catch (error: any) {
      alert("Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-xl transition-all duration-500">
      <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-scaleIn flex flex-col overflow-hidden border border-white/20">
        {/* Fixed Header */}
        <div className="bg-white border-b border-gray-100 p-8 flex justify-between items-center z-10 shrink-0">
          <div>
            <h2 className="text-2xl font-medium text-gray-900 tracking-tight">{product ? 'Update Asset' : 'Create New Asset'}</h2>
            <p className="text-[10px] font-medium text-[#9EA233] uppercase tracking-widest mt-1">Product Inventory Portal</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-2xl flex items-center justify-center transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12">
          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-3">Product Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#9EA233] transition-all font-medium text-gray-900 shadow-inner" placeholder="e.g. Pure Cold Pressed Groundnut Oil" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-3">Category Selection</label>
                <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#9EA233] transition-all font-medium text-gray-900 appearance-none shadow-inner">
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] ml-2">Product Imagery</label>
                  <div className="flex gap-2 bg-gray-100 p-1 rounded-2xl">
                    <button type="button" onClick={() => setImageType('url')} className={`px-4 py-1.5 text-[9px] font-medium uppercase rounded-xl transition-all duration-300 ${imageType === 'url' ? 'bg-white shadow-sm text-[#9EA233]' : 'text-gray-400'}`}>URL</button>
                    <button type="button" onClick={() => setImageType('upload')} className={`px-4 py-1.5 text-[9px] font-medium uppercase rounded-xl transition-all duration-300 ${imageType === 'upload' ? 'bg-white shadow-sm text-[#9EA233]' : 'text-gray-400'}`}>Upload</button>
                  </div>
                </div>

                <div className="space-y-4">
                  {imageType === 'url' ? (
                    <input required type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-3xl outline-none focus:bg-white focus:border-[#9EA233] transition-all font-medium text-gray-900 shadow-inner text-sm" />
                  ) : (
                    <div className="relative group">
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                      <div className={`p-6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all duration-500 ${isUploading ? 'opacity-50' : 'group-hover:border-[#9EA233] group-hover:bg-[#9EA233]/5'}`}>
                        <Upload className={`w-6 h-6 ${isUploading ? 'animate-bounce text-gray-300' : 'text-[#9EA233]'}`} />
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest text-center">{isUploading ? 'Processing...' : 'Upload Media'}</span>
                      </div>
                    </div>
                  )}
                  {formData.image && (
                    <div className="relative rounded-[32px] overflow-hidden border-8 border-gray-50 shadow-xl aspect-square bg-gray-900 group max-h-[200px]">
                      <img src={formData.image} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button type="button" onClick={() => setFormData({ ...formData, image: '' })} className="w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-2xl flex items-center justify-center hover:bg-red-500 transition-all">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Brief Summary</label>
                <textarea required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows={2} className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-3xl outline-none focus:bg-white focus:border-[#9EA233] transition-all font-medium text-gray-700 shadow-inner text-sm" placeholder="A short summary..." />
              </div>
            </div>
          </div>

          {/* Variants Section */}
          <div className="bg-[#9EA233]/5 rounded-[40px] p-8 border border-[#9EA233]/10">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 tracking-tight">Pricing & Variants</h3>
                <p className="text-[10px] font-medium text-[#7D8128] uppercase tracking-widest mt-1">Manage sizes and MRP</p>
              </div>
              <button type="button" onClick={addSize} className="flex items-center gap-2 px-6 py-3 bg-[#9EA233] text-white rounded-xl text-[11px] font-medium uppercase tracking-widest shadow-lg shadow-[#9EA233]/20 hover:bg-[#7D8128] transition-all"><Plus className="w-4 h-4"/> Add Size</button>
            </div>

            <div className="space-y-4">
              {formData.sizes?.map((size, index) => (
                <div key={index} className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex flex-wrap lg:flex-nowrap gap-6 items-end group relative overflow-hidden">
                  <div className="flex-1 min-w-[120px]">
                    <label className="block text-[9px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-2">Volume</label>
                    <input required type="text" placeholder="e.g. 1L" value={size.size} onChange={e => handleSizeChange(index, 'size', e.target.value)} className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#9EA233]/20" />
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="block text-[9px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-2">MRP (₹)</label>
                    <input required type="number" placeholder="0" value={size.price} onChange={e => handleSizeChange(index, 'price', Number(e.target.value))} className="w-full p-3 bg-gray-50 border-none rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#9EA233]/20 text-gray-400" title="Manufacturer Recommended Price" />
                  </div>
                  <div className="flex-1 min-w-[100px]">
                    <label className="block text-[9px] font-medium text-[#9EA233] uppercase tracking-[0.2em] mb-2">Offer Price (₹)</label>
                    <input required type="number" placeholder="Actual Price" value={size.offerPrice || ''} onChange={e => handleSizeChange(index, 'offerPrice', Number(e.target.value))} className="w-full p-3 bg-[#9EA233]/5 border-2 border-[#9EA233]/10 rounded-xl text-sm font-medium outline-none focus:border-[#9EA233] focus:bg-white transition-all text-[#9EA233]" title="Final Selling Price" />
                  </div>
                  <div className="flex items-center gap-3 px-4 h-[44px] bg-gray-50 rounded-xl">
                    <input type="checkbox" checked={size.inStock} onChange={e => handleSizeChange(index, 'inStock', e.target.checked)} className="w-5 h-5 accent-[#9EA233] cursor-pointer" />
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">In Stock</span>
                  </div>
                  {formData.sizes!.length > 1 && (
                    <button type="button" onClick={() => removeSize(index)} className="w-[44px] h-[44px] flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  {/* Visual indication of selling price */}
                  <div className="absolute top-0 right-0">
                    <div className="bg-[#9EA233] text-white text-[8px] font-medium uppercase tracking-widest px-3 py-1 rounded-bl-xl shadow-sm">BILLING PRICE</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">Benefits</label>
                <button type="button" onClick={() => addArrayItem('benefits')} className="w-8 h-8 flex items-center justify-center bg-gray-50 text-[#9EA233] rounded-lg hover:bg-white hover:shadow-md transition-all"><Plus className="w-4 h-4"/></button>
              </div>
              <div className="space-y-3">
                {formData.benefits?.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center group">
                    <div className="w-2 h-2 bg-[#9EA233] rounded-full flex-shrink-0"></div>
                    <input type="text" value={item} onChange={e => handleArrayChange('benefits', index, e.target.value)} className="flex-1 bg-transparent border-b border-gray-100 py-2 text-sm font-medium focus:border-[#9EA233] outline-none" placeholder="Add benefit..." />
                    <button type="button" onClick={() => removeArrayItem('benefits', index)} className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X className="w-4 h-4"/></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">Specifications</label>
                <button type="button" onClick={() => addArrayItem('specifications')} className="w-8 h-8 flex items-center justify-center bg-gray-50 text-[#9EA233] rounded-lg hover:bg-white hover:shadow-md transition-all"><Plus className="w-4 h-4"/></button>
              </div>
              <div className="space-y-3">
                {formData.specifications?.map((item, index) => (
                  <div key={index} className="flex gap-3 items-center group">
                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                    <input type="text" value={item} onChange={e => handleArrayChange('specifications', index, e.target.value)} className="flex-1 bg-transparent border-b border-gray-100 py-2 text-sm font-medium focus:border-blue-400 outline-none" placeholder="Add specification..." />
                    <button type="button" onClick={() => removeArrayItem('specifications', index)} className="p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X className="w-4 h-4"/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* Fixed Footer */}
        <div className="bg-white border-t border-gray-100 p-8 flex gap-4 shrink-0 z-20">
          <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl font-medium text-[11px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors">Cancel</button>
          <button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isUploading} 
            className={`flex-[2] py-4 rounded-2xl font-medium text-[11px] uppercase tracking-widest bg-[#9EA233] text-white hover:bg-[#7D8128] shadow-2xl shadow-[#9EA233]/40 transition-all hover:-translate-y-1 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading ? 'Uploading...' : product ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
