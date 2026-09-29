import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  ShieldCheck, 
  Menu, 
  X, 
  MessageSquare,
  ArrowRight,
  Compass,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    cartCount, 
    cartTotal,
    isAdminLoggedIn, 
    adminUser,
    logoutAdmin 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: 'home' | 'services' | 'cart' | 'admin') => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07080d]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-[#090b14] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-[#090b14] animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                PIXEL<span className="text-cyan-400">CRAFT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                STUDIO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block tracking-wide">
              Creative Digital Media Agency
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNav('home')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              currentView === 'home'
                ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => handleNav('services')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              currentView === 'services' || currentView === 'service-detail'
                ? 'text-cyan-300 bg-cyan-500/10 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Services & Pricing
          </button>

          <a
            href="#portfolio"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                setCurrentView('home');
                setTimeout(() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            Portfolio
          </a>

          <a
            href="#why-us"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                setCurrentView('home');
                setTimeout(() => {
                  document.getElementById('why-us')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            Why PixelCraft
          </a>

          <a
            href="#faq"
            onClick={(e) => {
              if (currentView !== 'home') {
                e.preventDefault();
                setCurrentView('home');
                setTimeout(() => {
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            FAQ
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart Trigger */}
          <button
            onClick={() => handleNav('cart')}
            className={`relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all border ${
              cartCount > 0
                ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-cyan-500/50 text-white shadow-lg shadow-cyan-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="text-xs font-mono text-cyan-300 font-bold ml-0.5">
                ${cartTotal}
              </span>
            )}
          </button>

          {/* Admin Portal Button */}
          <button
            onClick={() => handleNav('admin')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              isAdminLoggedIn
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/40'
                : currentView === 'admin'
                ? 'bg-cyan-950/50 border-cyan-500 text-cyan-300'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            title={isAdminLoggedIn ? `Logged in as ${adminUser?.name}` : 'Admin Portal Access'}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isAdminLoggedIn ? 'text-emerald-400' : 'text-cyan-400'}`} />
            <span>{isAdminLoggedIn ? 'Admin Panel' : 'Admin'}</span>
          </button>

          {/* Direct WhatsApp CTA */}
          <a
            href="https://wa.me/?text=Hi%20PixelCraft%2C%20I%20would%20like%20to%20discuss%20a%20creative%20project%20for%20my%20brand."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all transform active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Menu & Cart Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleNav('cart')}
            className="relative p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090b14]/98 px-4 pt-3 pb-6 space-y-2.5 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => handleNav('home')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left ${
              currentView === 'home' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 bg-slate-900/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Home</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => handleNav('services')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left ${
              currentView === 'services' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 bg-slate-900/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>All Services & Pricing</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>

          <button
            onClick={() => handleNav('cart')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left ${
              currentView === 'cart' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-300 bg-slate-900/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Shopping Cart ({cartCount})</span>
            </div>
            <span className="font-mono text-cyan-400 font-bold">${cartTotal}</span>
          </button>

          <button
            onClick={() => handleNav('admin')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-left text-slate-300 bg-slate-900/50 border border-slate-800"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isAdminLoggedIn ? 'Admin Dashboard (Logged In)' : 'Admin Portal Login'}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </button>

          <a
            href="https://wa.me/?text=Hi%20PixelCraft%2C%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>
      )}
    </header>
  );
};
