import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Zap, 
  MessageSquare, 
  ShieldCheck, 
  Star, 
  Flame, 
  ChevronDown,
  Video,
  Layers,
  Palette,
  TrendingUp,
  Cpu,
  Clock,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const { setCurrentView, navigateToServiceDetail, services, addToCart } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [portfolioTab, setPortfolioTab] = useState<'all' | 'short-form' | 'thumbnails' | 'cinematic'>('all');

  // Featured services for the overview
  const featuredServices = services.slice(0, 4);

  const portfolioItems = [
    {
      id: 'p1',
      title: 'Hormozi-Style Viral Short Series',
      category: 'short-form',
      client: 'Alex T. (Fintech Creator)',
      result: '4.8M Views & +38K Followers',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
      badge: 'Short-Form Viral',
      accent: 'cyan'
    },
    {
      id: 'p2',
      title: 'High-CTR Cyber Defense Thumbnails',
      category: 'thumbnails',
      client: 'TechDecoded Channel (850K Subs)',
      result: '14.2% Click-Through Rate',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
      badge: 'YouTube Thumbnails',
      accent: 'blue'
    },
    {
      id: 'p3',
      title: 'Full 4K Documentary Essay: "AI Empires"',
      category: 'cinematic',
      client: 'Silicon Stories Studio',
      result: '82% Average View Duration',
      image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
      badge: 'Cinematic Long-Form',
      accent: 'cyan'
    },
    {
      id: 'p4',
      title: 'TikTok Brand Transformation 30-Pack',
      category: 'short-form',
      client: 'DTC Skincare Brand',
      result: '+$140k Tracked Revenue',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
      badge: 'Shorts & TikTok',
      accent: 'blue'
    },
    {
      id: 'p5',
      title: 'Gaming & Challenge Thumbnail Suite',
      category: 'thumbnails',
      client: 'HyperNexus Gaming',
      result: 'Over 1.2M Impressions First 24h',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
      badge: 'YouTube Thumbnails',
      accent: 'cyan'
    },
    {
      id: 'p6',
      title: 'B2B Founder Video Podcast Overhaul',
      category: 'cinematic',
      client: 'The Modern Operator Podcast',
      result: 'Top 10 Business Apple Podcasts',
      image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
      badge: 'Podcast & Long-Form',
      accent: 'blue'
    }
  ];

  const filteredPortfolio = portfolioTab === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioTab);

  const testimonials = [
    {
      name: 'Ryan Kester',
      role: 'YouTuber & Tech Reviewer',
      subscribers: '620K Subscribers',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote: 'PixelCraft completely transformed my channel’s CTR. Their thumbnails alone boosted my average views from 45k to 190k per upload. Plus having direct WhatsApp contact with the editors is an absolute game-changer.',
      metric: '+320% CTR Lift'
    },
    {
      name: 'Sophia Martinez',
      role: 'Growth Lead at ViralLaunch Media',
      subscribers: 'Manages 12 TikTok Accounts',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      quote: 'The turnaround speed is unmatched. We order batches of 20 shorts on Monday and have polished, sound-designed cuts ready by Wednesday. The retention hooks they build into the first 2 seconds keep viewers hooked.',
      metric: '18M+ Reels Views'
    },
    {
      name: 'Liam Sterling',
      role: 'Host of The Sterling Capital Show',
      subscribers: 'Top 50 Spotify Business',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: 'I used to spend 15 hours editing podcasts every weekend. Handing off full audio mastering, multicam switching, and B-roll to PixelCraft gave me my weekends back. Their work is high-caliber broadcast quality.',
      metric: 'Saved 20h / Week'
    }
  ];

  const faqs = [
    {
      q: 'How does the order and payment process work?',
      a: 'We keep things simple and 100% human. You select your services and submit your project requirements via our checkout form without needing to enter any credit card or online payment details. Once received, PixelCraft will immediately reach out to you directly on WhatsApp to review your brief, confirm timelines, and coordinate payment via your preferred arrangement.'
    },
    {
      q: 'What is your standard delivery turnaround time?',
      a: 'Most YouTube thumbnails and single short-form videos are delivered within 24 to 48 hours. Comprehensive long-form video editing and multi-slide carousel suites typically take 2 to 4 business days. Need it faster? Express rush turnaround is available upon request on WhatsApp.'
    },
    {
      q: 'Are revisions really unlimited?',
      a: 'Yes! We stand behind every creative asset we deliver. If you need pacing tweaks, caption font changes, color grading adjustments, or alternate thumbnail expressions, our editors will refine the work until you are completely thrilled with the final cut.'
    },
    {
      q: 'Can I choose custom color themes for my videos and graphics?',
      a: 'Absolutely! Many of our services feature distinct color variations (such as Neon Cyan, Electric Blue, Obsidian Black, Crimson Red, and Minimalist White). Selecting a color in our service detail page gives you a real-time preview of the aesthetic style.'
    },
    {
      q: 'In what formats will I receive my finished files?',
      a: 'Videos are delivered in high-bitrate MP4/MOV formats in full 4K or 1080p 60fps (9:16 vertical or 16:9 widescreen). Thumbnails and graphic kits are delivered in ultra-sharp uncompressed PNG/WebP files, with editable layered source files (Figma, PSD, or Premiere/Resolve project files) available on request.'
    },
    {
      q: 'Do I get full commercial rights to monetize my content?',
      a: 'Yes, 100%. You retain full commercial ownership over all delivered assets. All background music, sound effects, and stock footage assets we use are properly licensed for commercial monetization across YouTube, Meta, TikTok, and web advertising.'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      
      {/* Background glowing ambient light orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[550px] h-[550px] bg-cyan-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-[5%] right-[15%] w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[250px] bg-sky-500/10 rounded-full blur-[120px]" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Glowing Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs sm:text-sm font-medium text-cyan-300 shadow-lg shadow-cyan-950/50 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Creative Digital Services Studio • 2026 Ready</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-['Space_Grotesk'] text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Visuals That Stop The Scroll &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Multiply Conversions
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            PixelCraft crafts elite video editing, viral short-form retention edits, click-magnet YouTube thumbnails, and high-impact digital graphics for creators and brands who refuse to look average.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('services')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>Explore Services & Pricing</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/?text=Hi%20PixelCraft%2C%20I%20am%20interested%20in%20your%20creative%20services.%20Can%20we%20discuss%20my%20project%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 hover:border-cyan-500/50 shadow-lg backdrop-blur-md transition-all flex items-center justify-center gap-2.5"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>Direct WhatsApp Consultation</span>
            </a>
          </div>

          {/* Sub-headline Features Strip */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>No Upfront Credit Card Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Direct WhatsApp Sync</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>24-48h Delivery Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>100% Unlimited Revisions</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Media Showcase Frame */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-1.5 bg-gradient-to-b from-cyan-500/30 via-slate-800/40 to-slate-900/60 shadow-2xl shadow-cyan-950/40">
            <div className="relative rounded-[22px] overflow-hidden bg-[#090b12] border border-slate-800/80 aspect-[16/9] sm:aspect-[21/9]">
              <img
                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80"
                alt="PixelCraft Studio Suite"
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/40 to-transparent" />

              {/* Floating Live Showcase Badges */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/75 border border-cyan-500/40 backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-300">STUDIO RENDER ENGINE 4K</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 backdrop-blur-xl">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Live Showcase
                    </span>
                    <span className="text-xs text-slate-400">Viral Short-Form & High-CTR Packaging</span>
                  </div>
                  <h3 className="text-white font-bold text-base sm:text-lg">
                    Transforming Raw Footage Into High-Retention Masterpieces
                  </h3>
                </div>

                <button
                  onClick={() => setCurrentView('services')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>View Services</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-extrabold text-cyan-400">150M+</div>
              <p className="text-xs text-slate-400 mt-1">Client Views Generated</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-extrabold text-blue-400">&lt; 24h</div>
              <p className="text-xs text-slate-400 mt-1">Fast Turnaround Option</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-extrabold text-sky-400">99.8%</div>
              <p className="text-xs text-slate-400 mt-1">Satisfaction Rating</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center">
              <div className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-extrabold text-cyan-300">500+</div>
              <p className="text-xs text-slate-400 mt-1">Projects Delivered</p>
            </div>
          </div>
        </div>

      </section>

      {/* 2. SERVICES OVERVIEW SECTION */}
      <section className="py-20 bg-[#080910] border-y border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>Our Core Capabilities</span>
              </div>
              <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                Engineered For Maximum Impact
              </h2>
              <p className="text-slate-400 text-base mt-2 max-w-xl">
                Every service is backed by retention analytics, psychological hooks, and studio-grade post-production.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('services')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 font-semibold text-sm transition-all self-start md:self-auto"
            >
              <span>View All {services.length} Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between rounded-3xl bg-[#0d0f19] border border-slate-800/80 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/30 overflow-hidden"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f19] via-transparent to-transparent" />
                    
                    {/* Badge */}
                    {service.badge && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
                        {service.badge}
                      </span>
                    )}

                    <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-900/40">
                      {service.deliveryTime}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg leading-snug group-hover:text-cyan-300 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Key features preview */}
                    <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-1.5">
                      {service.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer / Action */}
                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">Starting at</span>
                      <span className="font-['Space_Grotesk'] text-2xl font-black text-white">
                        ${service.price}
                      </span>
                    </div>

                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                      Available Now
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigateToServiceDetail(service.id)}
                      className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => {
                        // Quick add with default variations
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
                      className="px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-950"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentView('services')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide transition-all shadow-lg shadow-cyan-500/20"
            >
              <span>Explore All Studio Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. PORTFOLIO SHOWCASE */}
      <section id="portfolio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Palette className="w-3.5 h-3.5" />
            <span>Creative Portfolio</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-extrabold text-white">
            Results That Speak Louder Than Words
          </h2>
          <p className="text-slate-400 text-base mt-3">
            Browse real client projects across viral short-form, high-CTR YouTube packaging, and cinematic long-form storytelling.
          </p>

          {/* Portfolio Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPortfolioTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                portfolioTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setPortfolioTab('short-form')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                portfolioTab === 'short-form'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Shorts & Reels
            </button>
            <button
              onClick={() => setPortfolioTab('thumbnails')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                portfolioTab === 'thumbnails'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              YouTube Thumbnails
            </button>
            <button
              onClick={() => setPortfolioTab('cinematic')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                portfolioTab === 'cinematic'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Long-Form Videos
            </button>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/30 to-transparent" />
              </div>

              {/* Card Meta Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    {item.badge}
                  </span>
                  <span className="text-xs text-slate-400">{item.client}</span>
                </div>

                <h3 className="text-white font-bold text-lg group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>{item.result}</span>
                  </div>

                  <button
                    onClick={() => setCurrentView('services')}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-cyan-500 hover:text-slate-950 transition-all"
                    aria-label="Order service like this"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. WHY CHOOSE PIXELCRAFT */}
      <section id="why-us" className="py-24 bg-[#090b14] border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>The PixelCraft Advantage</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-extrabold text-white">
              Why Elite Creators & Brands Trust Us
            </h2>
            <p className="text-slate-400 text-base mt-3">
              We aren’t generalist freelancers. We are specialized retention engineers and visual strategists who treat your content as a revenue asset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-3xl bg-[#0e111d] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Retention-Engineered Hooks</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We spend the bulk of our creative energy locking in the first 2.5 seconds with curiosity gaps, pacing variations, and kinetic motion that prevents viewer drop-off.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e111d] border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">24-48h Delivery Cadence</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Consistency is oxygen for social algorithms. Our organized pipeline guarantees quick turnaround so you never miss an upload window or trending audio.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e111d] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Direct WhatsApp Workflow</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No complex ticketing portals or buried emails. Talk directly with your creative director on WhatsApp for instant feedback, voice notes, and fast asset handoffs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e111d] border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">100% Unlimited Revisions</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We edit until it is flawless. Whether it’s an alternate thumbnail facial expression or a caption tweak, we revise until you are completely thrilled.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e111d] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mb-6">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Studio Sound & DaVinci Color</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Broadcast audio mastering (loudness normalization, spectral de-noise) and rich cinematic color grading in Rec.709 so your videos look undeniably premium.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0e111d] border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Full Commercial Ownership</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                You retain complete, unencumbered rights to monetize, sponsor, and distribute. All music, sound effects, and stock elements are 100% licensed.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SIMPLE 3-STEP PROCESS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Effortless Collaboration</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-extrabold text-white">
            Simple 3-Step Production Flow
          </h2>
          <p className="text-slate-400 text-base mt-3">
            From brief submission to final cut in three seamless steps. Zero payment friction upfront.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="relative p-8 rounded-3xl bg-[#0d101a] border border-slate-800/80 hover:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between mb-6">
              <span className="font-['Space_Grotesk'] text-4xl font-black text-cyan-400/40">01</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Step 1
              </span>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Select Services & Place Order</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pick your desired services, select color themes and duration options, and submit your project requirements and reference links through our simple order form.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-8 rounded-3xl bg-[#0d101a] border border-slate-800/80 hover:border-sky-500/50 transition-all">
            <div className="flex items-center justify-between mb-6">
              <span className="font-['Space_Grotesk'] text-4xl font-black text-sky-400/40">02</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Step 2
              </span>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Direct WhatsApp Strategy Sync</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our lead creative director contacts you directly on WhatsApp to review your goals, clarify any vision details, and manually confirm the payment arrangement.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-8 rounded-3xl bg-[#0d101a] border border-slate-800/80 hover:border-blue-500/50 transition-all">
            <div className="flex items-center justify-between mb-6">
              <span className="font-['Space_Grotesk'] text-4xl font-black text-blue-400/40">03</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Step 3
              </span>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Delivery & Polish</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Receive your high-res exports within 24-48 hours. Request any adjustments with unlimited revisions until your assets are 100% ready to publish and go viral.
            </p>
          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-[#080910] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Star className="w-3.5 h-3.5 fill-cyan-400" />
              <span>Creator Endorsements</span>
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-extrabold text-white">
              Loved By Serious Creators
            </h2>
            <p className="text-slate-400 text-base mt-3">
              Hear directly from creators and marketing leads scaling their digital presence with PixelCraft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div
                key={index}
                className="p-8 rounded-3xl bg-[#0d0f19] border border-slate-800/80 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
              >
                <div>
                  <div className="flex items-center gap-1 text-cyan-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cyan-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic mb-6">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      className="w-11 h-11 rounded-full object-cover border border-cyan-500/30"
                    />
                    <div>
                      <h4 className="text-white font-bold text-sm">{test.name}</h4>
                      <p className="text-xs text-slate-400">{test.role}</p>
                      <span className="text-[10px] text-cyan-400 font-mono">{test.subscribers}</span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                    {test.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-base mt-3">
            Everything you need to know about ordering, turnaround times, and our creative process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#0d0f19] border border-slate-800/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 text-white font-bold text-base sm:text-lg hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-800/50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* 8. FINAL HIGH-IMPACT CTA BANNER */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden bg-gradient-to-br from-slate-900 via-[#0d1222] to-[#080b14] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-4 inline-block">
              Ready To Upgrade Your Brand?
            </span>
            <h2 className="font-['Space_Grotesk'] text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Let’s Build Content That Actually Drives Clicks & Revenue.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-xl">
              No long contract lock-ins. No upfront credit cards. Just select your service, share your vision, and sync with PixelCraft on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentView('services')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-base transition-all shadow-xl shadow-cyan-400/25 flex items-center justify-center gap-2 group"
              >
                <span>Browse All Services & Pricing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/?text=Hi%20PixelCraft%2C%20I%20am%20ready%20to%20start%20a%20project%20with%20your%20studio."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
