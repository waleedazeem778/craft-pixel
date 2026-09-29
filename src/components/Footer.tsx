import React from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  RefreshCw, 
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, navigateToServiceDetail, services } = useApp();

  return (
    <footer className="bg-[#05060a] border-t border-slate-900 text-slate-400 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800/80 mb-12">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">24-48h Fast Turnaround</h4>
              <p className="text-xs text-slate-400">Rapid delivery without sacrificing quality</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Unlimited Revisions</h4>
              <p className="text-xs text-slate-400">100% satisfaction guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Commercial License</h4>
              <p className="text-xs text-slate-400">Full ownership & monetizable rights</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Direct WhatsApp Sync</h4>
              <p className="text-xs text-slate-400">Real-time collaboration with editors</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-['Space_Grotesk'] text-xl font-bold text-white tracking-tight">
                PIXEL<span className="text-cyan-400">CRAFT</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              PixelCraft is a high-impact creative digital studio engineered for YouTubers, TikTok creators, podcasters, and forward-thinking brands. We build high-retention visual assets that dominate feeds and multiply conversions.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/?text=Hi%20PixelCraft%2C%20I%20have%20an%20inquiry%20regarding%20creative%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat with Creative Director on WhatsApp</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentView('home')} 
                  className="hover:text-cyan-400 transition-colors"
                >
                  Homepage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('services')} 
                  className="hover:text-cyan-400 transition-colors"
                >
                  All Services & Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('cart')} 
                  className="hover:text-cyan-400 transition-colors"
                >
                  Shopping Cart
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentView('admin')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Key Services */}
          <div className="lg:col-span-2">
            <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Featured Creative Services
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {services.slice(0, 6).map((service) => (
                <button
                  key={service.id}
                  onClick={() => navigateToServiceDetail(service.id)}
                  className="text-left py-1 hover:text-cyan-400 transition-colors flex items-center gap-1 text-slate-400 truncate"
                >
                  <ChevronRight className="w-3 h-3 text-cyan-500 shrink-0" />
                  <span className="truncate">{service.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PixelCraft Creative Digital Services Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Manual WhatsApp Verification System</span>
            <span>•</span>
            <span>Zero Payment Gateway Friction</span>
            <span>•</span>
            <button 
              onClick={() => setCurrentView('admin')} 
              className="text-slate-400 hover:text-cyan-400 transition-colors underline"
            >
              Studio Staff Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
