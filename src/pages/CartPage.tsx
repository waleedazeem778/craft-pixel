import React from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartPage: React.FC = () => {
  const { 
    cart, 
    cartCount, 
    cartTotal, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    setCurrentView,
    navigateToServiceDetail 
  } = useApp();

  if (cart.length === 0) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 sm:px-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-950/20">
          <ShoppingBag className="w-10 h-10 text-slate-500" />
        </div>
        <h2 className="font-['Space_Grotesk'] text-3xl font-extrabold text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Looks like you haven't added any creative services yet. Browse our catalog for viral short-form editing, YouTube thumbnails, and high-impact design.
        </p>

        <button
          onClick={() => setCurrentView('services')}
          className="mt-8 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-950 flex items-center justify-center gap-2 mx-auto transition-all"
        >
          <span>Explore Services Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Order Review</span>
          </div>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white">
            Your Creative Cart ({cartCount} {cartCount === 1 ? 'Item' : 'Items'})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold self-start sm:self-auto flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All Items</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const itemSubtotal = item.unitPrice * item.quantity;

            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-3xl bg-[#0d0f1a] border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Item Thumbnail & Basic Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div 
                    onClick={() => navigateToServiceDetail(item.serviceId)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-950 shrink-0 cursor-pointer border border-slate-800/80 group"
                  >
                    <img
                      src={item.displayImage}
                      alt={item.serviceName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <button
                      onClick={() => navigateToServiceDetail(item.serviceId)}
                      className="text-left font-bold text-white text-base sm:text-lg hover:text-cyan-300 transition-colors line-clamp-1"
                    >
                      {item.serviceName}
                    </button>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>{item.deliveryTime} Turnaround</span>
                    </div>

                    {/* Selected Variations Breakdown */}
                    {item.selectedVariations.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.selectedVariations.map((v, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {v.colorHex && (
                              <span
                                className="w-2 h-2 rounded-full border border-white/20"
                                style={{ backgroundColor: v.colorHex }}
                              />
                            )}
                            <span className="text-slate-400">{v.variationName}:</span>
                            <span className="text-cyan-300 font-semibold">{v.optionLabel}</span>
                            {v.extraPrice > 0 && (
                              <span className="text-[10px] text-cyan-400 font-mono">
                                (+${v.extraPrice})
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Price, Quantity & Delete */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                  
                  {/* Quantity Controller */}
                  <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-sm font-bold text-white px-2 min-w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-20">
                    <span className="font-['Space_Grotesk'] text-xl font-black text-white block">
                      ${itemSubtotal}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      ${item.unitPrice} each
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </div>
            );
          })}

          {/* Continue Shopping CTA */}
          <div className="pt-4">
            <button
              onClick={() => setCurrentView('services')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping & Add More Services</span>
            </button>
          </div>
        </div>

        {/* Order Summary Box (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 shadow-2xl space-y-6">
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white pb-4 border-b border-slate-800">
              Order Summary
            </h3>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-center justify-between text-slate-300">
                <span>Items Subtotal</span>
                <span className="font-mono font-bold text-white">${cartTotal}</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>Estimated Turnaround</span>
                <span className="font-mono text-cyan-400 text-xs">24-48 Hours</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>Revision Guarantee</span>
                <span className="text-emerald-400 text-xs font-semibold">100% Unlimited</span>
              </div>

              <div className="flex items-center justify-between text-slate-300">
                <span>Online Gateway Fee</span>
                <span className="font-mono text-emerald-400 font-bold">$0 (Manual Flow)</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                  Total Order Value
                </span>
                <span className="text-[11px] text-slate-500">Payable after WhatsApp review</span>
              </div>

              <span className="font-['Space_Grotesk'] text-3xl font-black text-cyan-400">
                ${cartTotal}
              </span>
            </div>

            {/* Crucial Notice */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Online Payment Friction</span>
              </div>
              No online card charge right now. PixelCraft coordinates manually on WhatsApp after reviewing your project brief.
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => setCurrentView('checkout')}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-cyan-950/80 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            >
              <span>Proceed to Project Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Encrypted Brief</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Sync</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
