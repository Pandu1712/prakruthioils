import React, { useState } from 'react';
import { X, Upload, Link as LinkIcon } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { uploadToCloudinary } from '../../lib/cloudinary';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryModal({ isOpen, onClose }: GalleryModalProps) {
  const { addGalleryImage } = useData();
  const [isUploading, setIsUploading] = useState(false);
  const [imageType, setImageType] = useState<'url' | 'upload'>('upload');
  const [formData, setFormData] = useState({
    url: '',
    caption: ''
  });

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setFormData({ ...formData, url });
    } catch (error: any) {
      alert("Upload failed: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url) {
      alert("Please provide an image");
      return;
    }
    
    try {
      await addGalleryImage(formData);
      setFormData({ url: '', caption: '' });
      onClose();
    } catch (error: any) {
      alert("Failed to save image: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-xl transition-all duration-500">
      <div className="bg-white rounded-[40px] w-full max-w-xl max-h-[90vh] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-scaleIn flex flex-col overflow-hidden border border-white/20">
        {/* Sticky Premium Header */}
        <div className="relative p-8 pb-6 flex justify-between items-start border-b border-gray-100 bg-white/80 backdrop-blur-md z-20">
          <div className="relative z-10">
            <span className="text-[#9EA233] text-[9px] font-black uppercase tracking-[0.4em] mb-1 block">Curation Suite</span>
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter leading-none">Add Gallery Photo</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-all hover:rotate-90 group relative z-10">
            <X className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
          </button>
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#9EA233]/5 rounded-full blur-3xl -mr-24 -mt-24"></div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
          <div className="space-y-6">
            {/* Source Toggle - Compact */}
            <div className="bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100 flex gap-1">
              <button 
                type="button" 
                onClick={() => setImageType('url')} 
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${imageType === 'url' ? 'bg-white shadow-sm text-[#9EA233]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <LinkIcon className="w-3 h-3" /> Link
              </button>
              <button 
                type="button" 
                onClick={() => setImageType('upload')} 
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 ${imageType === 'upload' ? 'bg-white shadow-sm text-[#9EA233]' : 'text-gray-400'}`}
              >
                <Upload className="w-3 h-3" /> Upload
              </button>
            </div>

            <div className="space-y-4">
              {imageType === 'url' ? (
                <div className="group">
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Asset URL</label>
                  <input 
                    required 
                    type="url" 
                    placeholder="https://..."
                    value={formData.url} 
                    onChange={e => setFormData({ ...formData, url: e.target.value })} 
                    className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#9EA233] transition-all font-bold text-gray-900 text-sm" 
                  />
                </div>
              ) : (
                <div className="relative group">
                  <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Device Upload</label>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                  <div className={`p-8 bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center gap-3 transition-all duration-500 ${isUploading ? 'opacity-50' : 'group-hover:border-[#9EA233] group-hover:bg-[#9EA233]/5'}`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isUploading ? 'bg-gray-100 scale-90' : 'bg-white shadow-lg text-[#9EA233]'}`}>
                      <Upload className={`w-6 h-6 ${isUploading ? 'animate-bounce' : ''}`} />
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] font-black text-gray-900 uppercase tracking-widest">
                        {isUploading ? 'Uploading...' : 'Select Photo'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Area - Fixed height to avoid jumps */}
              {formData.url && (
                <div className="relative rounded-[32px] overflow-hidden border-8 border-gray-50 shadow-xl aspect-video bg-gray-900 group max-h-[240px]">
                  <img src={formData.url} className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" />
                  <button 
                    type="button" 
                    onClick={() => setFormData({ ...formData, url: '' })}
                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-red-500 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="group">
              <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">Caption</label>
              <input 
                required 
                type="text" 
                placeholder="Caption for this photo..."
                value={formData.caption} 
                onChange={e => setFormData({ ...formData, caption: e.target.value })} 
                className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#9EA233] transition-all font-bold text-gray-900 text-sm" 
              />
            </div>
          </div>
        </div>

        {/* Sticky Footer Actions */}
        <div className="p-8 border-t border-gray-100 bg-white/80 backdrop-blur-md z-20 flex gap-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all">Cancel</button>
          <button 
            type="submit" 
            disabled={isUploading || !formData.url}
            onClick={handleSubmit}
            className={`flex-[2] py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-[#9EA233] text-white hover:bg-[#8B8F2D] shadow-lg shadow-[#9EA233]/20 transition-all ${isUploading || !formData.url ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
          >
            {isUploading ? 'Securing Photo...' : 'Publish to Gallery'}
          </button>
        </div>
      </div>
    </div>
  );
}
