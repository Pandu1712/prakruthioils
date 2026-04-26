import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { Category } from '../../types';
import { useData } from '../../context/DataContext';
import { uploadToCloudinary } from '../../lib/cloudinary';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category | null;
}

export default function CategoryModal({ isOpen, onClose, category }: CategoryModalProps) {
  const { addCategory, updateCategory, deleteCategory, products } = useData();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    image: '',
    description: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const [imageType, setImageType] = useState<'url' | 'upload'>('url');

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        id: 'cat-' + Date.now(),
        name: '',
        image: '',
        description: ''
      });
    }
    setShowConfirmDelete(false);
  }, [category, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      updateCategory(category.id, formData as Category);
    } else {
      addCategory(formData as Category);
    }
    onClose();
  };

  const handleDelete = async () => {
    if (!category) return;
    const categoryProducts = products.filter(p => p.category === category.id);
    
    if (categoryProducts.length > 0) {
      alert(`Cannot delete category "${category.name}" because it contains ${categoryProducts.length} products.`);
      return;
    }

    try {
      await deleteCategory(category.id);
      onClose();
    } catch (err) {
      console.error(err);
    }
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-md">
      <div className="bg-white rounded-[40px] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 p-8 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{category ? 'Edit Category' : 'Create Category'}</h2>
            <p className="text-[10px] font-black text-[#9EA233] uppercase tracking-widest mt-1">Classification Management</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-2xl flex items-center justify-center transition-colors">
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Category Identity</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Cold Pressed Oils"
                value={formData.name} 
                onChange={e => setFormData({ ...formData, name: e.target.value })} 
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#9EA233] transition-all font-bold text-gray-900" 
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Visual Asset</label>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                  <button type="button" onClick={() => setImageType('url')} className={`px-3 py-1 text-[9px] font-black uppercase rounded-md transition-all ${imageType === 'url' ? 'bg-white shadow-sm text-[#9EA233]' : 'text-gray-400'}`}>URL</button>
                  <button type="button" onClick={() => setImageType('upload')} className={`px-3 py-1 text-[9px] font-black uppercase rounded-md transition-all ${imageType === 'upload' ? 'bg-white shadow-sm text-[#9EA233]' : 'text-gray-400'}`}>Upload</button>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                {imageType === 'url' ? (
                  <input 
                    required 
                    type="url" 
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image} 
                    onChange={e => setFormData({ ...formData, image: e.target.value })} 
                    className="flex-1 p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#9EA233] transition-all font-bold text-gray-900" 
                  />
                ) : (
                  <div className="flex-1 relative">
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                    <div className={`p-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center font-bold text-sm text-gray-400 transition-all ${isUploading ? 'opacity-50' : 'hover:border-[#9EA233] hover:text-[#9EA233]'}`}>
                      {isUploading ? 'Uploading to Cloudinary...' : 'Click to select or drop image'}
                    </div>
                  </div>
                )}
                {formData.image && (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-gray-50 flex-shrink-0">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Story / Description</label>
              <textarea 
                placeholder="Briefly describe what makes this category special..."
                value={formData.description || ''} 
                onChange={e => setFormData({ ...formData, description: e.target.value })} 
                rows={4} 
                className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#9EA233] transition-all font-medium text-gray-700" 
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
            {showConfirmDelete ? (
              <div className="bg-red-50 p-6 rounded-[30px] border border-red-100 animate-fadeIn">
                <p className="text-[11px] font-black text-red-600 uppercase tracking-[0.2em] text-center mb-4">Confirm permanent deletion?</p>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setShowConfirmDelete(false)} className="flex-1 py-4 bg-white border border-red-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 transition-colors">No, Keep It</button>
                  <button type="button" onClick={handleDelete} className="flex-1 py-4 bg-red-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 shadow-xl shadow-red-500/20 transition-all">Yes, Delete</button>
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                {category && (
                  <button 
                    type="button" 
                    onClick={() => setShowConfirmDelete(true)} 
                    className="w-[60px] h-[60px] bg-red-50 text-red-400 rounded-2xl flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-all group" 
                    title="Delete Category"
                  >
                    <Trash2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </button>
                )}
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="flex-1 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className={`flex-[2] py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest bg-[#9EA233] text-white hover:bg-[#7D8128] shadow-xl shadow-[#9EA233]/30 transition-all hover:-translate-y-0.5 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isUploading ? 'Uploading...' : (category ? 'Save Changes' : 'Create Category')}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
