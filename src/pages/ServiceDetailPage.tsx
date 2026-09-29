import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  Plus, 
  Minus, 
  MessageSquare,
  ChevronRight,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CartItemVariationChoice } from '../types';

export const ServiceDetailPage: React.FC = () => {
  const { 
    selectedServiceId, 
    getServiceById, 
    setCurrentView, 
    addToCart,
    services,
    navigateToServiceDetail 
  } = useApp();

  const service = selectedServiceId ? getServiceById(selectedServiceId) : services[0];

  // If service not found, go back
  if (!service) {
    return (
      <div className="py-20 max-w-xl mx-auto text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Service Not Found</h2>
        <button
          onClick={() => setCurrentView('services')}
          className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold"
        >
          Back to All Services
        </button>
      </div>
    );
  }

  // Active display image (switches when color variation is chosen!)
  const [activeImage, setActiveImage] = useState<string>(service.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Initialize default options for all variations on service load
  useEffect(() => {
    setActiveImage(service.image);
    setQuantity(1);

    const initialOptions: Record<string, string> = {};
    service.variations.forEach((variation) => {
      if (variation.options.length > 0) {
        initialOptions[variation.id] = variation.options[0].id;
        // If the first variation option has an image, preview it
        if (variation.type === 'color' && variation.options[0].image) {
          setActiveImage(variation.options[0].image);
        }
      }
    });
    setSelectedOptions(initialOptions);
  }, [service.id]);

  // Handle variation option change
  const handleSelectOption = (variationId: string, optionId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [variationId]: optionId
    }));

    // Check if this option has an associated image (e.g. Color variations: Black, White, Blue, Red)
    const variation = service.variations.find((v) => v.id === variationId);
    if (variation) {
      const option = variation.options.find((o) => o.id === optionId);
      if (option && option.image) {
        // Change displayed image to that variation's image!
        setActiveImage(option.image);
      }
    }
  };

  // Calculate live dynamic price
  const extraPriceSum = service.variations.reduce((acc, variation) => {
    const selectedOptionId = selectedOptions[variation.id];
    const option = variation.options.find((o) => o.id === selectedOptionId);
    return acc + (option?.extraPrice || 0);
  }, 0);

  const unitPrice = service.price + extraPriceSum;
  const totalPrice = unitPrice * quantity;

  // Prepare variation choices for cart
  const handleAddToCart = () => {
    const choices: CartItemVariationChoice[] = service.variations.map((v) => {
      const selectedOptionId = selectedOptions[v.id];
      const opt = v.options.find((o) => o.id === selectedOptionId) || v.options[0];
      return {
        variationId: v.id,
        variationName: v.name,
        optionId: opt?.id || '',
        optionLabel: opt?.label || '',
        extraPrice: opt?.extraPrice || 0,
        colorHex: opt?.colorHex
      };
    });

    addToCart(service, choices, quantity, activeImage);
  };

  // Recommended other services
  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-8">
        <button 
          onClick={() => setCurrentView('home')} 
          className="hover:text-cyan-400 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <button 
          onClick={() => setCurrentView('services')} 
          className="hover:text-cyan-400 transition-colors"
        >
          Services
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-cyan-300 font-medium truncate max-w-xs">{service.name}</span>
      </div>

      {/* Main Service Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Large Image Showcase & Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl overflow-hidden bg-[#0c0e18] border border-slate-800/80 shadow-2xl group">
            {/* Large Showcase Image */}
            <div className="aspect-[16/11] overflow-hidden bg-slate-950 relative">
              <img
                src={activeImage}
                alt={service.name}
                className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e18] via-transparent to-transparent opacity-60" />

              {/* Status and Badge Overlays */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${
                  service.isAvailable 
                    ? 'bg-emerald-950/90 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-rose-950/90 text-rose-400 border border-rose-500/40'
                }`}>
                  {service.isAvailable ? '• Available Now' : '• Currently Booked'}
                </span>
                {service.badge && (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Live Preview Switch Notice */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 rounded-xl bg-black/75 backdrop-blur-md border border-slate-800 text-xs">
                <span className="text-slate-300">
                  Selecting a color variation updates the visual preview above in real time.
                </span>
                <span className="text-cyan-400 font-mono font-bold shrink-0 ml-2">4K Master</span>
              </div>
            </div>
          </div>

          {/* Color Variation Image Switcher Previews */}
          {service.variations.some(v => v.type === 'color') && (
            <div className="p-5 rounded-2xl bg-[#0d0f1a] border border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                Select Aesthetic / Color Palette:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {service.variations
                  .find(v => v.type === 'color')
                  ?.options.map((opt) => {
                    const isSelected = selectedOptions['color-theme'] === opt.id || 
                                       selectedOptions['color-palette'] === opt.id ||
                                       selectedOptions['color-grading-style'] === opt.id ||
                                       selectedOptions['aesthetic-style'] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          const colorVar = service.variations.find(v => v.type === 'color');
                          if (colorVar) handleSelectOption(colorVar.id, opt.id);
                        }}
                        className={`group relative p-2 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950/60 ring-1 ring-cyan-400'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {opt.image && (
                          <div className="aspect-[4/3] rounded-lg overflow-hidden mb-2 bg-slate-950">
                            <img 
                              src={opt.image} 
                              alt={opt.label} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                            />
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          {opt.colorHex && (
                            <span 
                              className="w-3 h-3 rounded-full border border-white/20 shrink-0" 
                              style={{ backgroundColor: opt.colorHex }}
                            />
                          )}
                          <span className="text-[11px] font-bold text-slate-200 truncate block">
                            {opt.label}
                          </span>
                        </div>
                        {opt.extraPrice > 0 && (
                          <span className="text-[10px] text-cyan-400 font-mono block mt-0.5">
                            +${opt.extraPrice}
                          </span>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Detailed Deliverables & Features */}
          <div className="p-8 rounded-3xl bg-[#0c0e18] border border-slate-800/80 space-y-4">
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>What's Included in This Service</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800/50">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300 leading-snug">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Service Info, Variations & Add to Cart (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 shadow-2xl relative">
            
            {/* Top info */}
            <div className="space-y-3 pb-6 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  PixelCraft Studio Service
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{service.deliveryTime} Turnaround</span>
                </div>
              </div>

              <h1 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {service.name}
              </h1>

              <p className="text-slate-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Variations / Options Selector */}
            <div className="py-6 space-y-6 border-b border-slate-800">
              {service.variations.map((variation) => {
                const selectedOptionId = selectedOptions[variation.id];

                return (
                  <div key={variation.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                        {variation.name}:
                      </label>
                      <span className="text-xs text-cyan-400 font-medium">
                        {variation.options.find(o => o.id === selectedOptionId)?.label}
                      </span>
                    </div>

                    {/* Color Swatch Option Layout */}
                    {variation.type === 'color' ? (
                      <div className="flex flex-wrap gap-2.5">
                        {variation.options.map((opt) => {
                          const isSelected = selectedOptionId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption(variation.id, opt.id)}
                              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                                isSelected
                                  ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              {opt.colorHex && (
                                <span
                                  className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"
                                  style={{ backgroundColor: opt.colorHex }}
                                />
                              )}
                              <span>{opt.label}</span>
                              {opt.extraPrice > 0 && (
                                <span className="font-mono text-[10px] text-cyan-400">
                                  +${opt.extraPrice}
                                </span>
                              )}
                              {isSelected && <Check className="w-3 h-3 text-cyan-400 ml-0.5" />}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      /* Select / Radio Pills */
                      <div className="grid grid-cols-1 gap-2">
                        {variation.options.map((opt) => {
                          const isSelected = selectedOptionId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleSelectOption(variation.id, opt.id)}
                              className={`flex items-center justify-between p-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-left ${
                                isSelected
                                  ? 'bg-cyan-950/40 border-cyan-400 text-white'
                                  : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'border-cyan-400 bg-cyan-500' : 'border-slate-600'
                                }`}>
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                                </span>
                                <span>{opt.label}</span>
                              </div>
                              {opt.extraPrice > 0 ? (
                                <span className="font-mono text-xs text-cyan-400 font-bold">
                                  +${opt.extraPrice}
                                </span>
                              ) : (
                                <span className="text-[11px] text-slate-500">Included</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Quantity Selector */}
              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                    Quantity / Assets:
                  </span>
                  <span className="text-[11px] text-slate-400">Select count of items to produce</span>
                </div>

                <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white flex items-center justify-center transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="font-mono text-base font-extrabold text-white px-2 min-w-8 text-center">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Price Breakdown & Add to Cart */}
            <div className="pt-6 space-y-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                    Total Estimate
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-['Space_Grotesk'] text-4xl font-black text-white">
                      ${totalPrice}
                    </span>
                    <span className="text-xs text-slate-400">
                      (${unitPrice} each {quantity > 1 ? `× ${quantity}` : ''})
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>WhatsApp Booking</span>
                  </span>
                  <span className="text-[11px] text-slate-500 block">No card charge now</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  disabled={!service.isAvailable}
                  onClick={handleAddToCart}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-base transition-all shadow-xl flex items-center justify-center gap-2 ${
                    service.isAvailable
                      ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-950/80 active:scale-98 cursor-pointer'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>{service.isAvailable ? 'Add to Cart' : 'Service Currently Unavailable'}</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentView('services')}
                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Catalog</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentView('cart')}
                    className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 text-xs font-semibold border border-cyan-800/40 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Cart</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Trust Pillars */}
              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>100% Unlimited Revisions until you're satisfied</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Commercial rights & high-bitrate source files</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct WhatsApp chat with PixelCraft editors</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Recommended Services Section */}
      <div className="mt-24 pt-16 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
              Other Creative Studio Services
            </h3>
            <p className="text-slate-400 text-sm mt-1">Combine multiple services for a complete brand upgrade</p>
          </div>
          <button
            onClick={() => setCurrentView('services')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherServices.map((other) => (
            <div
              key={other.id}
              onClick={() => navigateToServiceDetail(other.id)}
              className="p-5 rounded-2xl bg-[#0c0e18] border border-slate-800/80 hover:border-cyan-500/40 transition-all cursor-pointer group"
            >
              <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-950">
                <img
                  src={other.image}
                  alt={other.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h4 className="text-white font-bold text-base group-hover:text-cyan-300 transition-colors">
                {other.name}
              </h4>
              <p className="text-slate-400 text-xs mt-1.5 line-clamp-2">
                {other.shortDescription}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <span className="font-['Space_Grotesk'] font-black text-cyan-400 text-base">
                  ${other.price}
                </span>
                <span className="text-slate-400">{other.deliveryTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
