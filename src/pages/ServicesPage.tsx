import React, { useState } from 'react';
import { 
  Search, 
  Layers, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck,
  Tag,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';

export const ServicesPage: React.FC = () => {
  const { 
    services, 
    navigateToServiceDetail, 
    addToCart, 
    setCurrentView, 
    isAdminLoggedIn 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'short-form', label: 'Shorts & Reels' },
    { id: 'thumbnail', label: 'YouTube Thumbnails' },
    { id: 'video-editing', label: 'Cinematic Editing' },
    { id: 'social-media', label: 'Social Media Design' },
    { id: 'ai-video', label: 'AI Video Creation' },
    { id: 'banners', label: 'Banners & Graphics' },
    { id: 'seo', label: 'Video SEO & Strategy' },
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Catalog</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-extrabold text-white">
            Creative Digital Services
          </h1>
          <p className="text-slate-400 text-base mt-2 max-w-2xl">
            Choose from our specialized creative services engineered for high retention, viral reach, and conversion. All deliverables backed by unlimited revisions and manual WhatsApp coordination.
          </p>
        </div>

        {/* Quick Admin Action if logged in */}
        {isAdminLoggedIn && (
          <button
            onClick={() => setCurrentView('admin')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all self-start md:self-auto"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Manage Services in Admin</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-10">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search services (e.g. Shorts, Thumbnail, SEO, AI)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#0e111d] border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-950'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#0d0f19] border border-slate-800 text-center max-w-xl mx-auto my-12">
          <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-white font-bold text-lg">No services match your search</h3>
          <p className="text-slate-400 text-sm mt-1">Try clearing your search query or selecting a different category.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-6 px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`group flex flex-col justify-between rounded-3xl bg-[#0d0f1a] border transition-all duration-300 overflow-hidden ${
                service.isAvailable
                  ? 'border-slate-800/80 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-950/20'
                  : 'border-slate-900 opacity-70'
              }`}
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-[#0d0f1a]/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    {/* Availability Status Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                        service.isAvailable
                          ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40'
                          : 'bg-rose-950/90 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      {service.isAvailable ? '• Available' : '• Unavailable'}
                    </span>

                    {service.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Delivery time pill */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-xs font-mono text-cyan-300 border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{service.deliveryTime}</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {service.name}
                  </h3>
                  
                  <p className="text-slate-400 text-sm mt-2.5 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Features highlights */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Variations count indicator */}
                  {service.variations && service.variations.length > 0 && (
                    <div className="mt-4 flex items-center gap-2 text-[11px] text-cyan-400/90 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{service.variations.length} Option / Variation{service.variations.length > 1 ? 's' : ''} available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Bottom / Price & Actions */}
              <div className="p-6 pt-0">
                <div className="flex items-baseline justify-between mb-5">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
                      Starting Price
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-['Space_Grotesk'] text-3xl font-extrabold text-white">
                        ${service.price}
                      </span>
                      <span className="text-xs text-slate-400">USD</span>
                    </div>
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    Manual WhatsApp checkout
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => navigateToServiceDetail(service.id)}
                    className="w-full py-3 px-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all text-center border border-slate-700/60"
                  >
                    View Details
                  </button>

                  <button
                    disabled={!service.isAvailable}
                    onClick={() => {
                      if (!service.isAvailable) return;
                      const defaultVariations = service.variations.map((v) => ({
                        variationId: v.id,
                        variationName: v.name,
                        optionId: v.options[0]?.id || '',
                        optionLabel: v.options[0]?.label || '',
                        extraPrice: v.options[0]?.extraPrice || 0,
                        colorHex: v.options[0]?.colorHex
                      }));
                      addToCart(service, defaultVariations, 1, service.image);
                    }}
                    className={`w-full py-3 px-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${
                      service.isAvailable
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-950/60 cursor-pointer active:scale-95'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                    }`}
                  >
                    <span>{service.isAvailable ? 'Add to Cart' : 'Unavailable'}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Guarantee Notice */}
      <div className="mt-16 p-8 rounded-3xl bg-[#090b14] border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h4 className="text-white font-bold text-lg">Need a customized bundle or long-term retainer?</h4>
          <p className="text-slate-400 text-sm mt-1">
            PixelCraft offers custom multi-video packages and monthly dedicated creator retainer plans.
          </p>
        </div>

        <a
          href="https://wa.me/?text=Hi%20PixelCraft%2C%20I%20am%20looking%20for%20a%20custom%20monthly%20creator%20package."
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap"
        >
          Request Custom Quote on WhatsApp
        </a>
      </div>

    </div>
  );
};
