import React, { useState, useMemo, useRef } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useData } from '../context/DataContext';
import { Product, Category, Order } from '../types';
import { LogOut, Package, Grid, LayoutDashboard, Plus, Edit3, Trash2, Search, ShoppingCart, CheckCircle, Clock, XCircle, ExternalLink, Truck, PackageCheck, AlertCircle, ChevronDown, FileText, TrendingUp, Download, FileSpreadsheet } from 'lucide-react';
import ProductModal from '../components/admin/ProductModal';
import CategoryModal from '../components/admin/CategoryModal';
import GalleryModal from '../components/admin/GalleryModal';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { generateInvoice } from '../lib/invoiceGenerator';
import { exportToExcel, exportToPDF } from '../lib/exportUtils';

interface AdminDashboardProps {
  onLogout: () => void;
}

const StatusDropdown = ({ currentStatus, onStatusChange }: { currentStatus: string, onStatusChange: (status: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled') => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const statuses: { id: 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled', label: string, icon: any, color: string, bg: string }[] = [
    { id: 'pending', label: 'PENDING', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { id: 'confirmed', label: 'CONFIRMED', icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'dispatched', label: 'DISPATCHED', icon: Truck, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'delivered', label: 'DELIVERED', icon: PackageCheck, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'cancelled', label: 'CANCELLED', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  ];

  const current = statuses.find(s => s.id === currentStatus) || statuses[0];
  const CurrentIcon = current.icon;

  return (
    <div className={`relative inline-block text-left ${isOpen ? 'z-[100]' : 'z-auto'}`}>
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-black text-[9px] tracking-widest transition-all duration-300
          ${current.bg} ${current.color} border border-transparent hover:border-current/10
        `}
      >
        <CurrentIcon className="w-3.5 h-3.5" />
        {current.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60] bg-black/5 backdrop-blur-[1px] cursor-default pointer-events-auto" 
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[70] animate-dropdown">
            <div className="px-4 py-1.5 mb-1 border-b border-gray-50">
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Update Status</span>
            </div>
            {statuses.map((s) => {
              const SIcon = s.icon;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(s.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2 transition-all group
                    ${currentStatus === s.id ? 'bg-[#9EA233]/5' : 'hover:bg-gray-50'}
                  `}
                >
                  <div className={`p-1.5 rounded-lg transition-all ${currentStatus === s.id ? 'bg-[#9EA233] text-white' : 'bg-gray-50 text-gray-400 group-hover:text-gray-900'}`}>
                    <SIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${currentStatus === s.id ? 'text-gray-900' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'orders' | 'revenue' | 'gallery'>('overview');
  const { products, categories, orders, gallery, deleteProduct, deleteCategory, updateOrderStatus, deleteOrder, deleteGalleryImage } = useData();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Product Filters
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [productSizeFilter, setProductSizeFilter] = useState('all');

  // Stats
  const stats = useMemo(() => {
    const totalSales = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.totalAmount, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalProducts = products.length;
    return { totalSales, pendingOrders, totalProducts };
  }, [orders, products]);

  // Analytics Data
  const analyticsData = useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    }).reverse();

    return last7Days.map(date => {
      const dayOrders = orders.filter(o => {
        const oDate = o.createdAt?.toDate ? o.createdAt.toDate() : new Date();
        return oDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) === date;
      });
      return {
        name: date,
        sales: dayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
        orders: dayOrders.length
      };
    });
  }, [orders]);

  const categoryStats = useMemo(() => {
    return categories.map(cat => ({
      name: cat.name.toUpperCase(),
      value: orders.filter(o => o.items.some(i => i.product.category === cat.name)).length
    })).filter(c => c.value > 0);
  }, [categories, orders]);

  const topProducts = useMemo(() => {
    const productSales: { [key: string]: { name: string, count: number, image: string, total: number } } = {};
    orders.forEach(o => {
      o.items.forEach(item => {
        if (!productSales[item.product.id]) {
          productSales[item.product.id] = { 
            name: item.product.name, 
            count: 0, 
            image: item.product.image,
            total: 0
          };
        }
        productSales[item.product.id].count += item.quantity;
        productSales[item.product.id].total += item.unitPrice * item.quantity;
      });
    });
    return Object.values(productSales).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [orders]);

  // Filters
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const orderDate = order.createdAt?.toDate ? order.createdAt.toDate() : new Date();
        const now = new Date();
        if (dateFilter === 'today') {
          matchesDate = orderDate.toDateString() === now.toDateString();
        } else if (dateFilter === 'week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = orderDate >= weekAgo;
        } else if (dateFilter === 'month') {
          matchesDate = orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    }).sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
      return dateB - dateA;
    });
  }, [orders, searchTerm, statusFilter, dateFilter]);

  const COLORS = ['#9EA233', '#8B8F2D', '#787C27', '#656921', '#52561B'];

  // Export Handlers
  const handleExportProducts = (type: 'excel' | 'pdf') => {
    const data = products.map(p => ({
      ID: p.id.slice(0, 8),
      Name: p.name,
      Category: p.category.name,
      Description: p.description,
      'Active Status': p.isActive ? 'Active' : 'Inactive',
      'Total Variants': p.sizes.length,
      'Base Price (₹)': p.sizes[0]?.price || 0
    }));

    if (type === 'excel') {
      exportToExcel(data, 'Prakruthi_Products_Export');
    } else {
      const headers = ['ID', 'Name', 'Category', 'Status', 'Variants', 'Base Price (₹)'];
      const body = data.map(d => [d.ID, d.Name, d.Category, d['Active Status'], d['Total Variants'], d['Base Price (₹)']]);
      exportToPDF(headers, body, 'Product Inventory Report', 'Prakruthi_Products_Export');
    }
  };

  const handleExportCategories = (type: 'excel' | 'pdf') => {
    const data = categories.map(c => ({
      ID: c.id.slice(0, 8),
      Name: c.name,
      'Product Count': products.filter(p => p.category.name === c.name || p.category.id === c.id).length
    }));

    if (type === 'excel') {
      exportToExcel(data, 'Prakruthi_Categories_Export');
    } else {
      const headers = ['ID', 'Category Name', 'Total Products'];
      const body = data.map(d => [d.ID, d.Name, d['Product Count']]);
      exportToPDF(headers, body, 'Category Overview Report', 'Prakruthi_Categories_Export');
    }
  };

  const handleExportOrders = (type: 'excel' | 'pdf') => {
    const data = filteredOrders.map(o => ({
      'Order ID': o.id,
      'Date': o.createdAt?.toDate ? o.createdAt.toDate().toLocaleString('en-IN') : 'N/A',
      'Customer': o.customerName,
      'Phone': o.phone,
      'Total Amount (₹)': o.totalAmount,
      'Status': o.status.toUpperCase(),
      'Items Count': o.items.reduce((acc, item) => acc + item.quantity, 0)
    }));

    if (type === 'excel') {
      exportToExcel(data, 'Prakruthi_Orders_Export');
    } else {
      const headers = ['Order ID', 'Date', 'Customer', 'Amount (₹)', 'Status', 'Items'];
      const body = data.map(d => [d['Order ID'].slice(0,8), d['Date'], d['Customer'], d['Total Amount (₹)'], d['Status'], d['Items Count']]);
      exportToPDF(headers, body, 'Order Fulfillment Report', 'Prakruthi_Orders_Export');
    }
  };

  const handleExportRevenue = (type: 'excel' | 'pdf') => {
    const data = topProducts.map(tp => ({
      'Product Name': tp.name,
      'Units Sold': tp.count,
      'Revenue Generated (₹)': tp.total
    }));

    if (type === 'excel') {
      exportToExcel(data, 'Prakruthi_Revenue_Export');
    } else {
      const headers = ['Product Name', 'Units Sold', 'Revenue Generated (₹)'];
      const body = data.map(d => [d['Product Name'], d['Units Sold'], d['Revenue Generated (₹)']]);
      exportToPDF(headers, body, `Revenue Analytics`, 'Prakruthi_Revenue_Export');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Premium Obsidian Sidebar */}
      <aside className="w-80 bg-zinc-950 border-r border-zinc-800/50 flex flex-col fixed inset-y-0 z-40 transition-all duration-700 shadow-2xl overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 w-full h-96 bg-[#9EA233]/10 blur-[100px] pointer-events-none rounded-full -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#9EA233]/5 blur-[80px] pointer-events-none rounded-full translate-y-1/2 translate-x-1/4"></div>

        {/* Branding Section */}
        <div className="p-10 flex items-center gap-5 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl shadow-[#9EA233]/10 p-0.5 relative group">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#9EA233]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-md"></div>
             <img src="/coldLogo.jpg" className="w-full h-full object-cover rounded-2xl relative z-10" alt="Logo" />
          </div>
          <div className="flex flex-col">
            <span className="text-[22px] font-black text-white tracking-tighter leading-none group-hover:text-[#9EA233] transition-colors duration-300">Prakruthi</span>
            <span className="text-[9px] uppercase font-black tracking-[0.4em] text-[#9EA233]/80 mt-1">Premium Admin</span>
          </div>
        </div>

        {/* Quick Search in Sidebar */}
        <div className="px-8 mb-10 relative z-10">
           <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#9EA233] transition-colors" />
              <input 
                placeholder="Quick search..."
                className="w-full h-14 bg-zinc-900/50 backdrop-blur-md rounded-2xl pl-14 pr-6 text-xs font-bold text-white placeholder:text-zinc-600 border border-zinc-800/50 focus:border-[#9EA233]/50 focus:bg-zinc-900 transition-all outline-none focus:shadow-[0_0_20px_rgba(158,162,51,0.1)]"
              />
           </div>
        </div>
        
        <nav className="flex-1 px-6 space-y-10 overflow-y-auto custom-scrollbar pb-10 relative z-10">
          {/* Main Group */}
          <div className="space-y-2">
             <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${activeTab === 'overview' ? 'bg-gradient-to-r from-[#9EA233]/10 to-transparent border-l-2 border-[#9EA233] text-[#9EA233]' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white hover:translate-x-1 border-l-2 border-transparent'}`}
             >
                <LayoutDashboard className={`w-5 h-5 transition-transform duration-500 ${activeTab === 'overview' ? 'scale-110 drop-shadow-[0_0_8px_rgba(158,162,51,0.5)]' : 'group-hover:scale-110'}`} />
                <span className="font-black text-xs uppercase tracking-[0.2em]">Dashboard</span>
             </button>
          </div>

          {/* Inventory Section */}
          <div className="space-y-3">
             <p className="px-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Inventory</p>
             <div className="space-y-1.5">
                <button 
                  onClick={() => setActiveTab('categories')}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${activeTab === 'categories' ? 'bg-gradient-to-r from-[#9EA233]/10 to-transparent border-l-2 border-[#9EA233] text-[#9EA233]' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white hover:translate-x-1 border-l-2 border-transparent'}`}
                >
                  <Grid className={`w-5 h-5 transition-transform duration-500 ${activeTab === 'categories' ? 'scale-110 drop-shadow-[0_0_8px_rgba(158,162,51,0.5)]' : 'group-hover:scale-110'}`} />
                  <span className="font-black text-xs uppercase tracking-[0.2em]">Categories</span>
                </button>

                <button 
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${activeTab === 'products' ? 'bg-gradient-to-r from-[#9EA233]/10 to-transparent border-l-2 border-[#9EA233] text-[#9EA233]' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white hover:translate-x-1 border-l-2 border-transparent'}`}
                >
                  <Package className={`w-5 h-5 transition-transform duration-500 ${activeTab === 'products' ? 'scale-110 drop-shadow-[0_0_8px_rgba(158,162,51,0.5)]' : 'group-hover:scale-110'}`} />
                  <span className="font-black text-xs uppercase tracking-[0.2em]">Products</span>
                </button>

                <button 
                  onClick={() => setActiveTab('gallery')}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${activeTab === 'gallery' ? 'bg-gradient-to-r from-[#9EA233]/10 to-transparent border-l-2 border-[#9EA233] text-[#9EA233]' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white hover:translate-x-1 border-l-2 border-transparent'}`}
                >
                  <Plus className={`w-5 h-5 transition-transform duration-500 ${activeTab === 'gallery' ? 'scale-110 drop-shadow-[0_0_8px_rgba(158,162,51,0.5)]' : 'group-hover:scale-110'}`} />
                  <span className="font-black text-xs uppercase tracking-[0.2em]">Gallery</span>
                </button>
             </div>
          </div>

          {/* Sales & Revenue Section */}
          <div className="space-y-3">
             <p className="px-6 text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em]">Operations</p>
             <div className="space-y-1.5">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${activeTab === 'orders' ? 'bg-gradient-to-r from-[#9EA233]/10 to-transparent border-l-2 border-[#9EA233] text-[#9EA233]' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white hover:translate-x-1 border-l-2 border-transparent'}`}
                >
                  <ShoppingCart className={`w-5 h-5 transition-transform duration-500 ${activeTab === 'orders' ? 'scale-110 drop-shadow-[0_0_8px_rgba(158,162,51,0.5)]' : 'group-hover:scale-110'}`} />
                  <span className="font-black text-xs uppercase tracking-[0.2em]">Orders</span>
                </button>

                <button 
                  onClick={() => setActiveTab('revenue')}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${activeTab === 'revenue' ? 'bg-gradient-to-r from-[#9EA233]/10 to-transparent border-l-2 border-[#9EA233] text-[#9EA233]' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white hover:translate-x-1 border-l-2 border-transparent'}`}
                >
                  <TrendingUp className={`w-5 h-5 transition-transform duration-500 ${activeTab === 'revenue' ? 'scale-110 drop-shadow-[0_0_8px_rgba(158,162,51,0.5)]' : 'group-hover:scale-110'}`} />
                  <span className="font-black text-xs uppercase tracking-[0.2em]">Revenue</span>
                </button>
             </div>
          </div>
        </nav>

        {/* User / Logout Section */}
        <div className="p-8 border-t border-zinc-800/50 relative z-10 bg-zinc-950/50 backdrop-blur-xl">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 border border-transparent transition-all group"
          >
            <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" />
            <span className="font-black text-xs uppercase tracking-[0.2em]">Exit Portal</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 h-screen overflow-hidden flex flex-col transition-all duration-500">
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar animate-fadeIn bg-[#FAFAFA]">
            {/* Header */}
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[10px] font-black text-[#9EA233] uppercase tracking-[0.4em] mb-2">Performance Metrics</p>
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-none">System Overview</h1>
              </div>
              <div className="flex gap-4">
                <div className="px-5 py-2.5 bg-white rounded-xl border border-zinc-200 shadow-sm flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Live Data</span>
                </div>
              </div>
            </div>

            {/* Interactive Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Orders Card */}
              <button 
                onClick={() => setActiveTab('orders')}
                className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:border-[#9EA233]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col"
              >
                <div className="flex items-center justify-between mb-8 w-full">
                  <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-900 group-hover:bg-[#9EA233] group-hover:text-white transition-colors duration-300">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <ChevronDown className="-rotate-90 w-4 h-4 text-zinc-300 group-hover:text-[#9EA233] transition-colors" />
                </div>
                <h3 className="text-[32px] font-black text-zinc-900 tracking-tighter leading-none mb-2">{orders.length}</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Total Orders</p>
              </button>

              {/* Products Card */}
              <button 
                onClick={() => setActiveTab('products')}
                className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:border-[#9EA233]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col"
              >
                <div className="flex items-center justify-between mb-8 w-full">
                  <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-900 group-hover:bg-[#9EA233] group-hover:text-white transition-colors duration-300">
                    <Package className="w-5 h-5" />
                  </div>
                  <ChevronDown className="-rotate-90 w-4 h-4 text-zinc-300 group-hover:text-[#9EA233] transition-colors" />
                </div>
                <h3 className="text-[32px] font-black text-zinc-900 tracking-tighter leading-none mb-2">{products.length}</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Live Catalog</p>
              </button>

              {/* Categories Card */}
              <button 
                onClick={() => setActiveTab('categories')}
                className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:border-[#9EA233]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col"
              >
                <div className="flex items-center justify-between mb-8 w-full">
                  <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-zinc-900 group-hover:bg-[#9EA233] group-hover:text-white transition-colors duration-300">
                    <Grid className="w-5 h-5" />
                  </div>
                  <ChevronDown className="-rotate-90 w-4 h-4 text-zinc-300 group-hover:text-[#9EA233] transition-colors" />
                </div>
                <h3 className="text-[32px] font-black text-zinc-900 tracking-tighter leading-none mb-2">{categories.length}</h3>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Categories</p>
              </button>

              {/* Revenue Card */}
              <button 
                onClick={() => setActiveTab('revenue')}
                className="bg-zinc-950 p-8 rounded-3xl shadow-xl hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#9EA233]/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-[#9EA233]/30 transition-colors"></div>
                <div className="flex items-center justify-between mb-8 w-full relative z-10">
                  <div className="p-3 bg-white/10 border border-white/10 rounded-2xl text-white group-hover:bg-[#9EA233] group-hover:border-[#9EA233] transition-colors duration-300">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <ChevronDown className="-rotate-90 w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-[32px] font-black text-white tracking-tighter leading-none mb-2 relative z-10">₹{stats.totalSales.toLocaleString()}</h3>
                <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] relative z-10">Verified Sales</p>
              </button>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Sales Chart */}
              <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-sm font-black text-zinc-900 uppercase tracking-[0.1em]">Revenue Flow</h3>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] mt-1">7-Day Trajectory</p>
                  </div>
                  <div className="px-4 py-1.5 bg-zinc-50 border border-zinc-100 rounded-lg">
                     <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Last 7 Days</span>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9EA233" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#9EA233" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#a1a1aa', fontWeight: 700}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#a1a1aa', fontWeight: 700}} tickFormatter={(val) => `₹${val}`} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: '1px solid #f4f4f5', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '12px 16px' }}
                        itemStyle={{ color: '#18181b', fontWeight: 900, fontSize: '14px' }}
                        labelStyle={{ color: '#a1a1aa', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#9EA233" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Split */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
                 <div className="mb-8">
                  <h3 className="text-sm font-black text-zinc-900 uppercase tracking-[0.1em]">Market Share</h3>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] mt-1">By Category</p>
                </div>
                <div className="h-[250px] w-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryStats}
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {categoryStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                         contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', padding: '10px' }}
                         itemStyle={{ color: '#18181b', fontWeight: 900, fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                   {categoryStats.map((cat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                         <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest truncate">{cat.name}</span>
                      </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="flex-1 overflow-y-auto px-12 pt-12 pb-64 custom-scrollbar animate-fadeIn bg-[#FAFAFA]">
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-[10px] font-black text-[#9EA233] uppercase tracking-[0.4em] mb-2">Inventory Control</p>
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-none">Products Hub</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden h-12">
                   <button onClick={() => handleExportProducts('excel')} className="flex items-center gap-2 px-4 h-full bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest transition-colors border-r border-zinc-200" title="Export to Excel">
                      <FileSpreadsheet className="w-4 h-4" /> Excel
                   </button>
                   <button onClick={() => handleExportProducts('pdf')} className="flex items-center gap-2 px-4 h-full bg-red-50/50 hover:bg-red-50 text-red-700 text-[9px] font-black uppercase tracking-widest transition-colors" title="Export to PDF">
                      <FileText className="w-4 h-4" /> PDF
                   </button>
                </div>
                <button 
                  onClick={() => {
                    setEditingProduct(undefined);
                    setIsProductModalOpen(true);
                  }}
                  className="bg-zinc-900 hover:bg-[#9EA233] text-white px-6 h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 duration-300"
                >
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>
            </div>

            {/* PRODUCT FILTERS BAR */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-200 mb-8 flex flex-wrap items-center gap-4">
              <div className="flex-1 relative min-w-[250px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search product name or ID..."
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#9EA233] focus:bg-white focus:ring-4 focus:ring-[#9EA233]/10 font-bold text-sm text-zinc-900 transition-all outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                 <select 
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="h-12 px-4 pr-8 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#9EA233] font-black text-[10px] uppercase tracking-widest text-zinc-700 cursor-pointer outline-none transition-all"
                 >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                       <option key={cat.id} value={cat.name.toLowerCase()}>{cat.name}</option>
                    ))}
                 </select>

                 <select 
                    value={productSizeFilter}
                    onChange={(e) => setProductSizeFilter(e.target.value)}
                    className="h-12 px-4 pr-8 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#9EA233] font-black text-[10px] uppercase tracking-widest text-zinc-700 cursor-pointer outline-none transition-all"
                 >
                    <option value="all">All Weights</option>
                    {Array.from(new Set(products.flatMap(p => p.sizes.map(s => s.size)))).sort().map(size => (
                       <option key={size} value={size}>{size}</option>
                    ))}
                 </select>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-50/80 text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-black border-b border-zinc-200">
                      <th className="px-8 py-5">Product Details</th>
                      <th className="px-8 py-5">Category</th>
                      <th className="px-8 py-5">Inventory Specs</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {products
                      .filter(p => {
                         const matchesSearch = p.name.toLowerCase().includes(productSearchTerm.toLowerCase()) || p.id.toLowerCase().includes(productSearchTerm.toLowerCase());
                         const matchesCategory = productCategoryFilter === 'all' || 
                                                p.category.toLowerCase() === productCategoryFilter.toLowerCase() ||
                                                categories.find(c => c.name.toLowerCase() === productCategoryFilter.toLowerCase())?.id === p.category;
                         const matchesSize = productSizeFilter === 'all' || p.sizes.some(s => s.size === productSizeFilter);
                         return matchesSearch && matchesCategory && matchesSize;
                      })
                      .map((product) => (
                      <tr key={product.id} className="group hover:bg-zinc-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-5">
                            <div 
                              onClick={() => setPreviewImage(product.image)}
                              className="w-14 h-14 bg-white rounded-xl p-1.5 border border-zinc-200 cursor-zoom-in group-hover:border-[#9EA233]/40 transition-colors relative"
                            >
                              <img src={product.image} className="w-full h-full object-contain rounded-lg" />
                            </div>
                            <div>
                              <p className="font-black text-zinc-900 tracking-tight text-sm">{product.name}</p>
                              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">ID: {product.id.slice(0, 8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200 text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex flex-wrap gap-2">
                            {product.sizes.map((s, idx) => (
                              <div key={idx} className="flex flex-col bg-white border border-zinc-200 px-3 py-1.5 rounded-lg shadow-sm">
                                <span className="text-[9px] font-black text-[#9EA233] uppercase tracking-widest mb-0.5">{s.size}</span>
                                <div className="flex items-baseline gap-1.5">
                                  <span className="text-[11px] font-black text-zinc-900">₹{s.offerPrice ?? s.price}</span>
                                  {s.offerPrice && (
                                    <span className="text-[9px] text-zinc-400 line-through font-bold">₹{s.price}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => {
                                setEditingProduct(product);
                                setIsProductModalOpen(true);
                              }}
                              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => {if(window.confirm('Delete this product?')) deleteProduct(product.id)}}
                              className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.filter(p => {
                         const matchesSearch = p.name.toLowerCase().includes(productSearchTerm.toLowerCase()) || p.id.toLowerCase().includes(productSearchTerm.toLowerCase());
                         const matchesCategory = productCategoryFilter === 'all' || 
                                                p.category.toLowerCase() === productCategoryFilter.toLowerCase() ||
                                                categories.find(c => c.name.toLowerCase() === productCategoryFilter.toLowerCase())?.id === p.category;
                         const matchesSize = productSizeFilter === 'all' || p.sizes.some(s => s.size === productSizeFilter);
                         return matchesSearch && matchesCategory && matchesSize;
                    }).length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-20 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-center">
                              <Search className="w-6 h-6 text-zinc-300" />
                            </div>
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">No products found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar animate-fadeIn bg-[#FAFAFA]">
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-[10px] font-black text-[#9EA233] uppercase tracking-[0.4em] mb-2">Catalog Structure</p>
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-none">Categories</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden h-12">
                   <button onClick={() => handleExportCategories('excel')} className="flex items-center gap-2 px-4 h-full bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest transition-colors border-r border-zinc-200" title="Export to Excel">
                      <FileSpreadsheet className="w-4 h-4" /> Excel
                   </button>
                   <button onClick={() => handleExportCategories('pdf')} className="flex items-center gap-2 px-4 h-full bg-red-50/50 hover:bg-red-50 text-red-700 text-[9px] font-black uppercase tracking-widest transition-colors" title="Export to PDF">
                      <FileText className="w-4 h-4" /> PDF
                   </button>
                </div>
                <button 
                  onClick={() => {
                    setEditingCategory(undefined);
                    setIsCategoryModalOpen(true);
                  }}
                  className="bg-zinc-900 hover:bg-[#9EA233] text-white px-6 h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 duration-300"
                >
                  <Plus className="w-4 h-4" /> Add Category
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => {
                const productCount = products.filter(p => p.category.toLowerCase() === category.name.toLowerCase() || p.category === category.id).length;
                return (
                <div key={category.id} className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-200 group hover:border-[#9EA233]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col">
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div 
                      onClick={() => setPreviewImage(category.image)}
                      className="w-16 h-16 bg-zinc-50 rounded-2xl group-hover:scale-105 transition-transform overflow-hidden border border-zinc-100 shadow-sm cursor-zoom-in"
                    >
                      <img src={category.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => {
                          setEditingCategory(category);
                          setIsCategoryModalOpen(true);
                        }}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {if(window.confirm('Delete this category?')) deleteCategory(category.id)}}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 tracking-tight mb-1 uppercase relative z-10">{category.name}</h3>
                  <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6 relative z-10">
                    {productCount} Products Linked
                  </p>
                  
                  <div className="mt-auto relative z-10">
                    <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#9EA233] rounded-full transition-all duration-1000" style={{ width: productCount > 0 ? '100%' : '0%' }}></div>
                    </div>
                  </div>

                  {/* Subtle Background Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#9EA233]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#9EA233]/10 transition-colors pointer-events-none"></div>
                </div>
              )})}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="animate-fadeIn flex flex-col h-full bg-[#FAFAFA]">
            {/* STICKY HEADER */}
            <div className="sticky top-0 z-30 bg-[#FAFAFA]/90 backdrop-blur-xl px-12 pt-12 pb-6 space-y-6 border-b border-zinc-200">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-[#9EA233] uppercase tracking-[0.4em] mb-2">Fulfillment Pipeline</p>
                  <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-none">Order Management</h1>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-white px-4 py-2.5 rounded-xl border border-zinc-200 shadow-sm">
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span></span>
                      {orders.filter(o => o.status === 'pending').length} Action Required
                    </span>
                    <div className="w-px h-3 bg-zinc-200"></div>
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> {orders.filter(o => o.status === 'delivered').length} Completed
                    </span>
                  </div>
                  <div className="flex items-center bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden h-10">
                     <button onClick={() => handleExportOrders('excel')} className="flex items-center gap-2 px-3 h-full bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest transition-colors border-r border-zinc-200" title="Export to Excel">
                        <FileSpreadsheet className="w-4 h-4" /> Excel
                     </button>
                     <button onClick={() => handleExportOrders('pdf')} className="flex items-center gap-2 px-3 h-full bg-red-50/50 hover:bg-red-50 text-red-700 text-[9px] font-black uppercase tracking-widest transition-colors" title="Export to PDF">
                        <FileText className="w-4 h-4" /> PDF
                     </button>
                  </div>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-200 flex flex-wrap items-center gap-4">
                <div className="flex-1 relative min-w-[250px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input 
                    type="text" 
                    placeholder="Search by customer, phone, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#9EA233] focus:bg-white focus:ring-4 focus:ring-[#9EA233]/10 font-bold text-sm text-zinc-900 transition-all outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-2 bg-zinc-50 p-1.5 rounded-xl border border-zinc-200">
                  <button 
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === 'all' ? 'bg-white text-[#9EA233] shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-900'}`}
                  >
                    All Orders
                  </button>
                  <button 
                    type="button"
                    onClick={() => setStatusFilter('pending')}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === 'pending' ? 'bg-white text-orange-600 shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-900'}`}
                  >
                    Pending
                  </button>
                  <button 
                    type="button"
                     onClick={() => setStatusFilter('delivered')}
                    className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${statusFilter === 'delivered' ? 'bg-white text-green-600 shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-900'}`}
                  >
                    Fulfilled
                  </button>
                </div>

                <select 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="h-12 px-4 pr-8 rounded-xl bg-zinc-50 border border-zinc-200 focus:border-[#9EA233] font-black text-[10px] uppercase tracking-widest text-zinc-700 cursor-pointer outline-none transition-all"
                >
                  <option value="all">Lifetime</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>

            {/* SCROLLABLE TABLE AREA */}
            <div className="flex-1 overflow-y-auto px-12 pt-8 pb-64 custom-scrollbar">
              <div className="bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50/80 text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-black border-b border-zinc-200">
                        <th className="px-8 py-5">Order Reference</th>
                        <th className="px-8 py-5">Customer Profile</th>
                        <th className="px-8 py-5">Fulfillment Items</th>
                        <th className="px-8 py-5">Ledger</th>
                        <th className="px-8 py-5 text-center">Pipeline Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="px-8 py-5">
                            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1">ID: {order.id.slice(0, 8)}</p>
                            <p className="font-bold text-zinc-900 text-sm">
                              {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Pending'}
                            </p>
                          </td>
                          <td className="px-8 py-5">
                            <p className="font-black text-zinc-900 text-sm tracking-tight">{order.customerName}</p>
                            <p className="text-[10px] font-bold text-zinc-500 mt-0.5">{order.phone}</p>
                            <p className="text-[10px] text-zinc-400 mt-1 truncate max-w-[200px]" title={order.address}>{order.address}</p>
                          </td>
                          <td className="px-8 py-5">
                            <div className="space-y-1.5">
                              {order.items.map((item, idx) => (
                                <p key={idx} className="text-[11px] font-bold text-zinc-700 bg-zinc-50 inline-block px-2 py-1 rounded-md border border-zinc-100 mr-2 mb-1">
                                  {item.product.name} <span className="text-[#9EA233]">({item.selectedSize.size})</span> x {item.quantity}
                                </p>
                              ))}
                            </div>
                          </td>
                          <td className="px-8 py-5">
                            <p className="text-lg font-black text-zinc-900">₹{order.totalAmount}</p>
                          </td>
                          <td className="px-8 py-5 text-center">
                            <StatusDropdown 
                              currentStatus={order.status} 
                              onStatusChange={(status) => updateOrderStatus(order.id, status)} 
                            />
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={async () => await generateInvoice(order)}
                                className="w-8 h-8 flex items-center justify-center text-[#9EA233] hover:bg-[#9EA233]/10 rounded-lg transition-colors"
                                title="Download Invoice"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => {if(window.confirm('Delete this order?')) deleteOrder(order.id)}}
                                className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Order"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredOrders.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-20 text-center">
                             <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-center">
                                   <Search className="w-6 h-6 text-zinc-300" />
                                </div>
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">No matching orders found</p>
                             </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'revenue' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar animate-fadeIn flex flex-col h-full bg-[#FAFAFA]">
            {/* Revenue Sticky Header */}
            <div className="sticky top-0 z-30 bg-[#FAFAFA]/90 backdrop-blur-xl px-12 pt-12 pb-6 border-b border-zinc-200 space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-[#9EA233] uppercase tracking-[0.4em] mb-2">Financials</p>
                  <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-none">Revenue Analytics</h1>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-zinc-50 p-1.5 rounded-xl border border-zinc-200">
                    {['today', 'week', 'month', 'all'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setDateFilter(filter)}
                        className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${dateFilter === filter ? 'bg-white text-[#9EA233] shadow-sm border border-zinc-200/50' : 'text-zinc-500 hover:text-zinc-900'}`}
                      >
                        {filter === 'all' ? 'Lifetime' : filter}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden h-10">
                     <button onClick={() => handleExportRevenue('excel')} className="flex items-center gap-2 px-3 h-full bg-emerald-50/50 hover:bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase tracking-widest transition-colors border-r border-zinc-200" title="Export to Excel">
                        <FileSpreadsheet className="w-4 h-4" /> Excel
                     </button>
                     <button onClick={() => handleExportRevenue('pdf')} className="flex items-center gap-2 px-3 h-full bg-red-50/50 hover:bg-red-50 text-red-700 text-[9px] font-black uppercase tracking-widest transition-colors" title="Export to PDF">
                        <FileText className="w-4 h-4" /> PDF
                     </button>
                  </div>
                </div>
              </div>

              {/* Key Financial Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Gross Gain</p>
                    <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">₹{stats.totalSales.toLocaleString()}</h3>
                    <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md w-fit border border-emerald-100">
                       <TrendingUp className="w-3 h-3" /> +12.5% from last period
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Avg. Order Value</p>
                    <h3 className="text-3xl font-black text-zinc-900 tracking-tighter">₹{(stats.totalSales / (orders.length || 1)).toFixed(0)}</h3>
                    <p className="mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Based on {orders.length} transactions</p>
                 </div>
                 <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#9EA233]/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2 relative z-10">Potential Gain</p>
                    <h3 className="text-3xl font-black text-[#9EA233] tracking-tighter relative z-10">₹{(stats.totalSales * 1.2).toLocaleString()}</h3>
                    <p className="mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest relative z-10">Estimated next 30 days</p>
                 </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="p-12 space-y-8 pb-64">
               <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                     <h2 className="text-sm font-black text-zinc-900 tracking-tight uppercase tracking-[0.1em]">Performance Timeline</h2>
                     <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                           <div className="w-2.5 h-2.5 rounded-full bg-[#9EA233]"></div>
                           <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Revenue</span>
                        </div>
                     </div>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9EA233" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#9EA233" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#a1a1aa', fontWeight: 700}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#a1a1aa', fontWeight: 700}} tickFormatter={(val) => `₹${val}`} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '16px', border: '1px solid #f4f4f5', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', padding: '12px 16px' }}
                          itemStyle={{ color: '#18181b', fontWeight: 900, fontSize: '14px' }}
                          labelStyle={{ color: '#a1a1aa', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#9EA233" strokeWidth={3} fillOpacity={1} fill="url(#revenueGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>

               <div className="grid grid-cols-1 gap-8">
                  <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm">
                     <h3 className="text-sm font-black text-zinc-900 uppercase tracking-[0.1em] mb-6">Top Revenue Products</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {topProducts.slice(0, 4).map((product, i) => (
                           <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-zinc-50 border border-transparent hover:border-zinc-100 transition-all group">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 overflow-hidden group-hover:border-zinc-200 transition-colors p-1.5">
                                    <img src={product.image} className="w-full h-full object-contain rounded-lg" />
                                 </div>
                                 <div>
                                    <p className="font-black text-zinc-900 text-sm leading-none">{product.name}</p>
                                    <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-widest mt-1.5">{product.count} Sold</p>
                                 </div>
                              </div>
                              <p className="font-black text-zinc-900 text-lg">₹{product.total.toLocaleString()}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}
        {activeTab === 'gallery' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar animate-fadeIn flex flex-col h-full bg-[#FAFAFA]">
            {/* Gallery Sticky Header */}
            <div className="sticky top-0 z-30 bg-[#FAFAFA]/90 backdrop-blur-xl px-12 pt-12 pb-6 border-b border-zinc-200 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black text-[#9EA233] uppercase tracking-[0.4em] mb-2">Visual Branding</p>
                <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-none">Photo Gallery</h1>
              </div>
              <button 
                onClick={() => setIsGalleryModalOpen(true)}
                className="bg-zinc-900 hover:bg-[#9EA233] text-white px-6 h-12 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 duration-300"
              >
                <Plus className="w-4 h-4" /> Add Photo
              </button>
            </div>

            <div className="p-12 pb-64 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((img) => (
                <div key={img.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-zinc-200 group hover:shadow-xl hover:border-zinc-300 transition-all duration-300 flex flex-col">
                  <div className="aspect-[4/3] relative overflow-hidden bg-zinc-100">
                    <img src={img.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <button 
                        onClick={() => deleteGalleryImage(img.id)}
                        className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-all scale-90 group-hover:scale-100 duration-300 shadow-xl shadow-red-600/30"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-5 text-center flex-1 flex items-center justify-center">
                    <p className="font-black text-zinc-700 uppercase tracking-widest text-[9px] line-clamp-2">{img.caption || 'Untitled Asset'}</p>
                  </div>
                </div>
              ))}
              {gallery.length === 0 && (
                <div className="col-span-full py-32 text-center">
                  <div className="w-16 h-16 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                     <Image className="w-6 h-6 text-zinc-300" />
                  </div>
                  <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">No gallery photos added yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <ProductModal 
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={editingProduct}
      />
      <CategoryModal 
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        category={editingCategory}
      />
      <GalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
      />
      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/80 backdrop-blur-xl animate-fadeIn"
          onClick={() => setPreviewImage(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <XCircle className="w-12 h-12" />
          </button>
          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <img 
              src={previewImage} 
              className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl border-4 border-white/10" 
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
