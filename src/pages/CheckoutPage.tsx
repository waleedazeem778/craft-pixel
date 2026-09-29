import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  Link2, 
  User, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutPage: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    cartCount, 
    placeOrder, 
    setCurrentView 
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [requirements, setRequirements] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // If cart is empty, prompt user to add services
  if (cart.length === 0) {
    return (
      <div className="py-24 max-w-xl mx-auto px-4 text-center">
        <h2 className="font-['Space_Grotesk'] text-3xl font-extrabold text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-sm mt-3">
          Please add at least one service before proceeding to project checkout.
        </p>
        <button
          onClick={() => setCurrentView('services')}
          className="mt-6 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm"
        >
          Browse Studio Services
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }

    if (!whatsappNumber.trim() || whatsappNumber.trim().length < 6) {
      setFormError('Please enter a valid WhatsApp number including country code (e.g. +1 555-123-4567).');
      return;
    }

    if (!requirements.trim() || requirements.trim().length < 10) {
      setFormError('Please provide some project requirements or instructions (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);

    try {
      placeOrder({
        customerName: fullName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        requirements: requirements.trim(),
        referenceUrl: referenceUrl.trim() || undefined
      });
    } catch (err) {
      console.error('Error placing order:', err);
      setFormError('Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="pb-8 mb-8 border-b border-slate-800/80">
        <button
          onClick={() => setCurrentView('cart')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Step 2 of 2: Project Brief & Verification</span>
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white">
          Order & Project Checkout
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Complete the details below to submit your creative brief directly to our production queue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Request Form (7 cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error banner if any */}
            {formError && (
              <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 flex items-center gap-3 text-rose-200 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Contact Details Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 space-y-5">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
                <User className="w-4 h-4 text-cyan-400" />
                <span>Your Contact Information</span>
              </h3>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* WhatsApp Number */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    WhatsApp Number <span className="text-cyan-400">*</span>
                  </label>
                  <span className="text-[11px] text-emerald-400 font-medium">With country code</span>
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 555-234-5678 or +44 7911 123456"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  Our creative team connects directly on WhatsApp to confirm details, share drafts, and coordinate payment.
                </p>
              </div>
            </div>

            {/* Project Requirements & Brief */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 space-y-5">
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Project Requirements & Creative Brief</span>
              </h3>

              {/* Requirements Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Project Requirements <span className="text-cyan-400">*</span>
                  </label>
                  <span className="text-[11px] text-slate-500">Be as descriptive as you like</span>
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your vision, target audience, preferred caption style, tone of voice, pacing, or any special requests..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors leading-relaxed"
                />
              </div>

              {/* Optional Reference Link */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Reference URL / Cloud Folder (Optional)
                  </label>
                  <span className="text-[11px] text-slate-500">Google Drive, Dropbox, YouTube, etc.</span>
                </div>
                <div className="relative">
                  <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="url"
                    placeholder="https://drive.google.com/drive/folders/... or YouTube link"
                    value={referenceUrl}
                    onChange={(e) => setReferenceUrl(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* MANDATORY PAYMENT NOTICE AS REQUESTED */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0d1525] to-[#0a101f] border border-cyan-500/40 text-slate-200 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Transparent WhatsApp Payment Policy</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                "No online payment is required at checkout. PixelCraft will contact you on WhatsApp after receiving your order and arrange payment manually."
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero card details exposed • Manual invoice and payment verification on WhatsApp</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-base uppercase tracking-wider shadow-2xl shadow-cyan-950 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
            >
              {isSubmitting ? (
                <span>Generating Order...</span>
              ) : (
                <>
                  <span>Place Order</span>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </>
              )}
            </button>

          </form>
        </div>

        {/* Sidebar Order Summary (5 cols) */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 p-6 sm:p-7 rounded-3xl bg-[#0d0f1b] border border-slate-800/80 shadow-2xl space-y-6">
            <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white pb-3 border-b border-slate-800">
              Selected Services & Variations ({cartCount})
            </h3>

            {/* Item list breakdown */}
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/60">
                  <img
                    src={item.displayImage}
                    alt={item.serviceName}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-950"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-xs truncate">{item.serviceName}</h4>
                    <span className="text-[11px] text-slate-400 block">
                      Qty: {item.quantity} × ${item.unitPrice}
                    </span>

                    {/* Variations */}
                    {item.selectedVariations.length > 0 && (
                      <div className="text-[10px] text-cyan-300 font-medium space-x-1 truncate mt-0.5">
                        {item.selectedVariations.map((v, i) => (
                          <span key={i}>
                            {v.optionLabel}
                            {i < item.selectedVariations.length - 1 ? ' • ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm font-bold text-white">
                      ${item.unitPrice * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary lines */}
            <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Total Items</span>
                <span className="font-mono font-bold text-white">{cartCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Production Turnaround</span>
                <span className="font-mono text-cyan-400">24-48 Hours</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode</span>
                <span className="text-emerald-400 font-semibold">Manual WhatsApp Confirmation</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-4 border-t border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                  Total Amount
                </span>
                <span className="text-[11px] text-slate-500">Zero upfront gateway fee</span>
              </div>
              <span className="font-['Space_Grotesk'] text-3xl font-black text-cyan-400">
                ${cartTotal}
              </span>
            </div>

            {/* Reassurance */}
            <div className="pt-2 border-t border-slate-800 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Instant human review on WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Unlimited revisions until 100% satisfied</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
