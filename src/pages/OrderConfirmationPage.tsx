import React, { useState } from 'react';
import { 
  CheckCircle2, 
  MessageSquare, 
  Copy, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  FileText, 
  ExternalLink 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderConfirmationPage: React.FC = () => {
  const { lastPlacedOrder, setCurrentView, isAdminLoggedIn } = useApp();
  const [copied, setCopied] = useState(false);

  // If no order in memory, fallback
  if (!lastPlacedOrder) {
    return (
      <div className="py-24 max-w-md mx-auto text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">No Active Order Found</h2>
        <p className="text-slate-400 text-sm mb-6">You can browse our services or place a new order anytime.</p>
        <button
          onClick={() => setCurrentView('services')}
          className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
        >
          Browse Services
        </button>
      </div>
    );
  }

  const order = lastPlacedOrder;

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Pre-filled WhatsApp message for immediate customer connection
  const encodedMsg = encodeURIComponent(
    `Hello PixelCraft Studio! I just placed order #${order.id} for "${order.items.map(i => i.serviceName).join(', ')}" (Total: $${order.total}). Looking forward to discussing the project brief!`
  );
  const cleanPhone = order.whatsappNumber.replace(/[^0-9+]/g, '');
  const waUrl = `https://wa.me/?text=${encodedMsg}`;

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Success Badge & Headline */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
        <div className="inline-flex p-4 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-xl shadow-cyan-950/50 mb-2 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Order Successfully Received</span>
        </div>

        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-extrabold text-white">
          Thank You, {order.customerName}!
        </h1>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Your creative project brief has been recorded. PixelCraft will contact you directly on WhatsApp to confirm details and arrange payment manually.
        </p>
      </div>

      {/* Unique Order ID Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0d1322] via-[#09101d] to-[#070b14] border border-cyan-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
            Unique Order Reference ID
          </span>
          <div className="flex items-center gap-3 mt-1">
            <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-wider">
              #{order.id}
            </span>
            <button
              onClick={handleCopyId}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>
      </div>

      {/* Order Summary & Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
        
        {/* Ordered Services List (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 space-y-6">
          <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white pb-3 border-b border-slate-800">
            Ordered Services Breakdown
          </h3>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/60">
                <img
                  src={item.displayImage}
                  alt={item.serviceName}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-950"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-bold text-sm leading-snug">{item.serviceName}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>Qty: {item.quantity}</span>
                    <span>•</span>
                    <span className="text-cyan-400 font-mono font-bold">${item.unitPrice} each</span>
                  </div>

                  {item.selectedVariations.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.selectedVariations.map((v, i) => (
                        <span key={i} className="text-[10px] text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                          {v.variationName}: <strong className="text-cyan-300">{v.optionLabel}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-base font-bold text-white">
                    ${item.unitPrice * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
            <span className="font-bold text-slate-300 text-sm">Total Order Value</span>
            <span className="font-['Space_Grotesk'] text-2xl font-black text-cyan-400">
              ${order.total} USD
            </span>
          </div>
        </div>

        {/* Order Details & WhatsApp Instructions (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 space-y-4">
            <h3 className="font-['Space_Grotesk'] text-base font-bold text-white pb-3 border-b border-slate-800">
              Customer Contact Info
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Customer Name:</span>
                <span className="text-white font-bold text-sm">{order.customerName}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">WhatsApp Number:</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">{order.whatsappNumber}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Order Status:</span>
                <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {order.status}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Order Date:</span>
                <span className="text-slate-300">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Project Requirements Preview */}
          <div className="p-6 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 space-y-3">
            <h3 className="font-['Space_Grotesk'] text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Project Brief Submitted</span>
            </h3>
            <p className="text-xs text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 italic leading-relaxed">
              "{order.requirements}"
            </p>
            {order.referenceUrl && (
              <div className="text-xs pt-1">
                <span className="text-slate-400 block">Reference Link:</span>
                <a
                  href={order.referenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline flex items-center gap-1 mt-0.5 truncate"
                >
                  <span className="truncate">{order.referenceUrl}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setCurrentView('home')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
        >
          Return to Homepage
        </button>

        <button
          onClick={() => setCurrentView('services')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-800 transition-colors"
        >
          Browse More Services
        </button>

        {isAdminLoggedIn && (
          <button
            onClick={() => setCurrentView('admin')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/40 text-emerald-300 text-sm font-semibold border border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>View In Admin Dashboard</span>
          </button>
        )}
      </div>

    </div>
  );
};
