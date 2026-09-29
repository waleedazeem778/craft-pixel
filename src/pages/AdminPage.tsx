import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  LogOut, 
  ShoppingBag, 
  Layers, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  ExternalLink, 
  Search, 
  Filter, 
  Sparkles, 
  X, 
  Check,
  Eye,
  RefreshCw,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderStatus, Service, ServiceVariation, VariationOption, ServiceCategory } from '../types';

export const AdminPage: React.FC = () => {
  const {
    adminUser,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    adminStats,
    orders,
    updateOrderStatus,
    deleteOrder,
    services,
    addService,
    updateService,
    deleteService,
    resetDefaultServices,
    setCurrentView,
    navigateToServiceDetail
  } = useApp();

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active admin tab: 'orders' | 'services'
  const [activeTab, setActiveTab] = useState<'orders' | 'services'>('orders');

  // Orders filter & search
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState<string>('');

  // Service Edit / Add Modal state
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

  // Service form fields
  const [serviceForm, setServiceForm] = useState<{
    name: string;
    category: ServiceCategory;
    shortDescription: string;
    description: string;
    price: number;
    deliveryTime: string;
    isAvailable: boolean;
    image: string;
    features: string[];
    variations: ServiceVariation[];
    badge: string;
  }>({
    name: '',
    category: 'short-form',
    shortDescription: '',
    description: '',
    price: 49,
    deliveryTime: '24-48 Hours',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
    features: ['Hook optimization', 'Subtitles & sound design'],
    variations: [],
    badge: ''
  });

  const [featureInput, setFeatureInput] = useState('');

  // --- Login Handler ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const success = loginAdmin(email, password);
    if (!success) {
      setLoginError('Invalid credentials. Check your email and password.');
    }
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('pixelcraft2025!');
    loginAdmin(demoEmail, 'pixelcraft2025!');
  };

  // --- Open Service Modal (Add or Edit) ---
  const openAddServiceModal = () => {
    setEditingServiceId(null);
    setServiceForm({
      name: '',
      category: 'video-editing',
      shortDescription: '',
      description: '',
      price: 50,
      deliveryTime: '24-48 Hours',
      isAvailable: true,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
      features: ['High-retention editing', 'Full sound design', 'Unlimited revisions'],
      variations: [
        {
          id: 'color-theme',
          name: 'Color Aesthetic',
          type: 'color',
          options: [
            {
              id: 'cyan-cyber',
              label: 'Neon Cyan & Black',
              colorHex: '#06b6d4',
              extraPrice: 0,
              image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80'
            },
            {
              id: 'electric-blue',
              label: 'Electric Blue',
              colorHex: '#2563eb',
              extraPrice: 0,
              image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80'
            },
            {
              id: 'ruby-red',
              label: 'Ruby Red',
              colorHex: '#ef4444',
              extraPrice: 5,
              image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80'
            },
            {
              id: 'minimal-white',
              label: 'Minimalist White',
              colorHex: '#ffffff',
              extraPrice: 0,
              image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80'
            }
          ]
        }
      ],
      badge: ''
    });
    setServiceModalOpen(true);
  };

  const openEditServiceModal = (service: Service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      name: service.name,
      category: service.category,
      shortDescription: service.shortDescription,
      description: service.description,
      price: service.price,
      deliveryTime: service.deliveryTime,
      isAvailable: service.isAvailable,
      image: service.image,
      features: [...service.features],
      variations: JSON.parse(JSON.stringify(service.variations || [])),
      badge: service.badge || ''
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.name.trim()) return;

    if (editingServiceId) {
      updateService(editingServiceId, serviceForm);
    } else {
      addService(serviceForm);
    }
    setServiceModalOpen(false);
  };

  // --- Add Feature to form ---
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setServiceForm((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setServiceForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx)
    }));
  };

  // --- Variation Management inside Modal ---
  const handleAddVariationOption = (varIndex: number) => {
    const newOptId = `opt-${Date.now().toString(36)}`;
    const newOption: VariationOption = {
      id: newOptId,
      label: 'New Option / Style',
      extraPrice: 0,
      colorHex: '#06b6d4',
      image: serviceForm.image
    };

    setServiceForm((prev) => {
      const nextVariations = [...prev.variations];
      nextVariations[varIndex].options.push(newOption);
      return { ...prev, variations: nextVariations };
    });
  };

  const handleRemoveVariationOption = (varIndex: number, optIndex: number) => {
    setServiceForm((prev) => {
      const nextVariations = [...prev.variations];
      nextVariations[varIndex].options = nextVariations[varIndex].options.filter((_, i) => i !== optIndex);
      return { ...prev, variations: nextVariations };
    });
  };

  const handleAddVariationGroup = (type: 'color' | 'select') => {
    const newVarId = `var-${Date.now().toString(36)}`;
    const newVariation: ServiceVariation = {
      id: newVarId,
      name: type === 'color' ? 'Color Variation' : 'Package Tier / Style',
      type,
      options: [
        {
          id: `${newVarId}-opt1`,
          label: type === 'color' ? 'Neon Cyan & Black' : 'Standard Tier',
          colorHex: type === 'color' ? '#06b6d4' : undefined,
          extraPrice: 0,
          image: serviceForm.image
        }
      ]
    };

    setServiceForm((prev) => ({
      ...prev,
      variations: [...prev.variations, newVariation]
    }));
  };

  const handleRemoveVariationGroup = (varIndex: number) => {
    setServiceForm((prev) => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== varIndex)
    }));
  };

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    const matchesFilter = orderFilter === 'all' || ord.status === orderFilter;
    const matchesSearch = 
      ord.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      ord.whatsappNumber.includes(orderSearch);
    return matchesFilter && matchesSearch;
  });

  // If not logged in as Admin, show login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="py-20 max-w-md mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-3xl bg-[#0c0e18] border border-slate-800/80 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-950/40">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl font-extrabold text-white">
              Studio Admin Portal
            </h2>
            <p className="text-slate-400 text-xs">
              Secure authentication for PixelCraft creative directors & staff.
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="admin@pixelcraft.studio"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-950 transition-all cursor-pointer"
            >
              Sign In to Admin Portal
            </button>
          </form>

          {/* Quick-fill helpers for evaluation */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] text-slate-500 block text-center font-medium">
              Quick One-Click Demo Access:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('waleedazeem776@gmail.com')}
                className="py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 text-[11px] font-semibold transition-colors truncate"
              >
                Owner (Waleed)
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('admin@pixelcraft.studio')}
                className="py-2 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-400 text-[11px] font-semibold transition-colors truncate"
              >
                Studio Admin
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // --- LOGGED IN ADMIN DASHBOARD ---
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 shadow-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-['Space_Grotesk'] text-2xl font-extrabold text-white">
                PixelCraft Studio Command Center
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800">
                Live Admin
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Authenticated as <strong className="text-cyan-300">{adminUser?.name}</strong> ({adminUser?.email})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto">
          <button
            onClick={() => setCurrentView('services')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors"
          >
            Preview Live Website
          </button>
          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold border border-rose-500/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* 7. ADMIN DASHBOARD: SIMPLE STATISTICS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        
        {/* Total Orders */}
        <div className="p-5 rounded-2xl bg-[#0c0e18] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-white">
            {adminStats.totalOrders}
          </span>
        </div>

        {/* New Orders */}
        <div className="p-5 rounded-2xl bg-[#0c0e18] border border-cyan-500/40 shadow-lg shadow-cyan-950/30">
          <div className="flex items-center justify-between text-cyan-400 text-xs font-bold mb-1">
            <span>New Orders</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-cyan-300">
            {adminStats.newOrders}
          </span>
        </div>

        {/* In Progress */}
        <div className="p-5 rounded-2xl bg-[#0c0e18] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>In Progress</span>
            <Clock className="w-4 h-4 text-sky-400" />
          </div>
          <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-sky-400">
            {adminStats.inProgress}
          </span>
        </div>

        {/* Completed */}
        <div className="p-5 rounded-2xl bg-[#0c0e18] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-emerald-400">
            {adminStats.completed}
          </span>
        </div>

        {/* Total Order Value */}
        <div className="p-5 rounded-2xl bg-[#0c0e18] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Order Value</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-white">
            ${adminStats.totalOrderValue}
          </span>
        </div>

        {/* Active Services */}
        <div className="p-5 rounded-2xl bg-[#0c0e18] border border-slate-800/80">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-1">
            <span>Active Services</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-purple-300">
            {adminStats.activeServices}
          </span>
        </div>

      </div>

      {/* Main Admin Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Client Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'services'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Manage Services Catalog ({services.length})</span>
          </button>
        </div>

        {activeTab === 'services' && (
          <button
            onClick={openAddServiceModal}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-950 flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        )}
      </div>

      {/* TAB 1: CLIENT ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by Order ID, name, WhatsApp..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
              {['all', 'New', 'Contacted', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    orderFilter === st
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {st === 'all' ? 'All Orders' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Cards Grid */}
          {filteredOrders.length === 0 ? (
            <div className="p-16 rounded-3xl bg-[#0c0e18] border border-slate-800 text-center">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-white font-bold text-base">No orders found</h3>
              <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or status filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.map((order) => {
                const cleanPhone = order.whatsappNumber.replace(/[^0-9+]/g, '');
                const waText = encodeURIComponent(
                  `Hi ${order.customerName}! This is PixelCraft Creative Studio regarding your order #${order.id} for "${order.items.map(i => i.serviceName).join(', ')}" (Total: $${order.total}). We reviewed your requirements and would love to confirm details with you!`
                );
                const waUrl = `https://wa.me/${cleanPhone.replace('+', '')}?text=${waText}`;

                return (
                  <div
                    key={order.id}
                    className="p-6 sm:p-7 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 hover:border-slate-700 transition-all space-y-6"
                  >
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="font-['Space_Grotesk'] text-xl font-black text-cyan-400 font-mono">
                          #{order.id}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Status Selector & WhatsApp Contact Button */}
                      <div className="flex flex-wrap items-center gap-3">
                        {/* Status dropdown */}
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-slate-400 font-medium">Status:</label>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                            className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-cyan-400"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>

                        {/* Contact on WhatsApp Button */}
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Contact on WhatsApp</span>
                        </a>

                        {/* Delete Order button */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete order #${order.id}?`)) {
                              deleteOrder(order.id);
                            }
                          }}
                          className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Customer & Items Details */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Customer Info (4 cols) */}
                      <div className="md:col-span-4 space-y-2 text-xs">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Client Info
                        </span>
                        <p className="text-white font-bold text-sm">{order.customerName}</p>
                        <p className="text-emerald-400 font-mono font-medium flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{order.whatsappNumber}</span>
                        </p>
                        <div className="pt-2 text-slate-400">
                          <span>Total Items: <strong className="text-white">{order.quantity}</strong></span>
                          <span className="mx-2">•</span>
                          <span>Total: <strong className="text-cyan-400 font-mono text-sm">${order.total}</strong></span>
                        </div>
                      </div>

                      {/* Ordered Services (8 cols) */}
                      <div className="md:col-span-8 space-y-3">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Ordered Services & Variations
                        </span>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.displayImage}
                                  alt={item.serviceName}
                                  className="w-10 h-10 rounded-lg object-cover bg-slate-950"
                                />
                                <div>
                                  <h5 className="text-white font-bold">{item.serviceName}</h5>
                                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-400 mt-0.5">
                                    <span>Qty: {item.quantity} × ${item.unitPrice}</span>
                                    {item.selectedVariations.map((v, i) => (
                                      <span key={i} className="text-cyan-300 font-medium">
                                        • {v.optionLabel}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <span className="font-mono font-bold text-white text-sm">
                                ${item.unitPrice * item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Requirements / Brief Box */}
                    <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Project Brief / Requirements:
                      </span>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "{order.requirements}"
                      </p>
                      {order.referenceUrl && (
                        <div className="pt-2 text-xs flex items-center gap-2">
                          <span className="text-slate-400 font-medium">Reference Cloud Link:</span>
                          <a
                            href={order.referenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline flex items-center gap-1 font-mono truncate"
                          >
                            <span>{order.referenceUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* TAB 2: MANAGE SERVICES */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Add new services, update pricing, descriptions, color variation image swatches, or toggle availability.
            </p>
            <button
              onClick={resetDefaultServices}
              className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset to Default Studio Services</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-3xl bg-[#0d0f1b] border border-slate-800/80 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Service image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <button
                        onClick={() => updateService(service.id, { isAvailable: !service.isAvailable })}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md cursor-pointer transition-all ${
                          service.isAvailable
                            ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40'
                            : 'bg-rose-950/90 text-rose-400 border border-rose-500/40'
                        }`}
                      >
                        {service.isAvailable ? '• Available' : '• Unavailable'}
                      </button>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-xs font-mono text-cyan-300">
                      ${service.price}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-white text-base leading-snug">
                        {service.name}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="text-[11px] text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                      <div>Turnaround: <strong className="text-white">{service.deliveryTime}</strong></div>
                      <div>
                        Variations: <strong className="text-cyan-300">{service.variations?.length || 0} configured</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openEditServiceModal(service)}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Edit Service</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to remove "${service.name}"?`)) {
                        deleteService(service.id);
                      }
                    }}
                    className="py-2.5 px-3 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 text-rose-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-rose-800/40"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SERVICE EDIT / ADD MODAL */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0c0e18] border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                {editingServiceId ? 'Edit Creative Service' : 'Add New Creative Service'}
              </h3>
              <button
                onClick={() => setServiceModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-6">
              
              {/* Row 1: Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Category
                  </label>
                  <select
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value as ServiceCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-cyan-400"
                  >
                    <option value="short-form">Shorts & Reels</option>
                    <option value="thumbnail">YouTube Thumbnails</option>
                    <option value="video-editing">Cinematic Video Editing</option>
                    <option value="social-media">Social Media Design</option>
                    <option value="ai-video">AI Video Creation</option>
                    <option value="banners">Banners & Graphics</option>
                    <option value="seo">Video SEO Optimization</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Price, Delivery Time, Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Base Price (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Delivery Time
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceForm.deliveryTime}
                    onChange={(e) => setServiceForm({ ...serviceForm, deliveryTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Availability
                  </label>
                  <select
                    value={serviceForm.isAvailable ? 'true' : 'false'}
                    onChange={(e) => setServiceForm({ ...serviceForm, isAvailable: e.target.value === 'true' })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-cyan-400"
                  >
                    <option value="true">Available for Orders</option>
                    <option value="false">Unavailable / Booked</option>
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Base Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-cyan-400"
                />
              </div>

              {/* Short & Long Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Short Description (For Cards)
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.shortDescription}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Full Detailed Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-cyan-400"
                />
              </div>

              {/* Features Editor */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Features / Included Items:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a feature (e.g. 4K Bitrate Export, SFX Included)..."
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {serviceForm.features.map((feat, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs bg-slate-800 text-slate-200"
                    >
                      <span>{feat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-slate-400 hover:text-rose-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Variations Manager (Color & Options) */}
              <div className="space-y-4 p-5 rounded-2xl bg-[#090b14] border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-cyan-400" />
                      <span>Variations & Color Options</span>
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Color variations can specify a custom image URL so selecting that color changes the image!
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleAddVariationGroup('color')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold"
                    >
                      + Add Color Theme
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddVariationGroup('select')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-bold"
                    >
                      + Add Tier/Option
                    </button>
                  </div>
                </div>

                {serviceForm.variations.map((vGroup, vIdx) => (
                  <div key={vIdx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={vGroup.name}
                        onChange={(e) => {
                          const next = [...serviceForm.variations];
                          next[vIdx].name = e.target.value;
                          setServiceForm({ ...serviceForm, variations: next });
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-white font-bold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveVariationGroup(vIdx)}
                        className="text-xs text-rose-400 hover:underline"
                      >
                        Remove Group
                      </button>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2">
                      {vGroup.options.map((opt, optIdx) => (
                        <div key={optIdx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                          {/* Color Hex swatch */}
                          {vGroup.type === 'color' && (
                            <input
                              type="color"
                              value={opt.colorHex || '#06b6d4'}
                              onChange={(e) => {
                                const next = [...serviceForm.variations];
                                next[vIdx].options[optIdx].colorHex = e.target.value;
                                setServiceForm({ ...serviceForm, variations: next });
                              }}
                              className="w-7 h-7 rounded border border-slate-700 cursor-pointer"
                              title="Variation Color"
                            />
                          )}

                          {/* Option Label */}
                          <input
                            type="text"
                            placeholder="Option Label (e.g. Neon Cyan)"
                            value={opt.label}
                            onChange={(e) => {
                              const next = [...serviceForm.variations];
                              next[vIdx].options[optIdx].label = e.target.value;
                              setServiceForm({ ...serviceForm, variations: next });
                            }}
                            className="flex-1 min-w-[120px] px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-white text-xs"
                          />

                          {/* Extra Price */}
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400">+$</span>
                            <input
                              type="number"
                              min={0}
                              value={opt.extraPrice}
                              onChange={(e) => {
                                const next = [...serviceForm.variations];
                                next[vIdx].options[optIdx].extraPrice = Number(e.target.value);
                                setServiceForm({ ...serviceForm, variations: next });
                              }}
                              className="w-16 px-2 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-white font-mono text-xs"
                              title="Extra price"
                            />
                          </div>

                          {/* Custom Image URL for this variation */}
                          <input
                            type="url"
                            placeholder="Variation Image URL (switches main image when selected)"
                            value={opt.image || ''}
                            onChange={(e) => {
                              const next = [...serviceForm.variations];
                              next[vIdx].options[optIdx].image = e.target.value;
                              setServiceForm({ ...serviceForm, variations: next });
                            }}
                            className="w-full sm:w-60 px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-white text-xs"
                          />

                          <button
                            type="button"
                            onClick={() => handleRemoveVariationOption(vIdx, optIdx)}
                            className="text-slate-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => handleAddVariationOption(vIdx)}
                        className="text-xs text-cyan-400 hover:underline font-semibold block pt-1"
                      >
                        + Add Option / Color to {vGroup.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit / Cancel */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold"
                >
                  {editingServiceId ? 'Save Changes' : 'Create Service'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
