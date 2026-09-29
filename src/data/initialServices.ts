import { Service } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'shorts-reels-editing',
    name: 'Shorts / Reels / TikTok Viral Editing',
    category: 'short-form',
    shortDescription: 'High-retention vertical edits with dynamic captions, sound design, and viral pacing.',
    description: 'Transform your raw footage into addictive 9:16 short-form videos designed specifically for the YouTube Shorts, Instagram Reels, and TikTok algorithms. We craft custom kinetic typography, visual hooks in the first 2 seconds, punch-in zooms, curated sound effects (SFX), and color grading that commands attention on mobile feeds.',
    price: 49,
    deliveryTime: '24-48 Hours',
    isAvailable: true,
    featured: true,
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Hook optimization in the first 2.5 seconds',
      'Dynamic animated subtitles & emojis (Hormozi / Ali Abdaal style)',
      'Cinematic sound design & trending audio licensing',
      'Motion graphics, zooms, overlays & B-roll sourcing',
      '9:16 vertical 4K / 1080p high bitrate export',
      'Unlimited revisions until you are 100% satisfied'
    ],
    variations: [
      {
        id: 'color-theme',
        name: 'Color Theme & Aesthetic',
        type: 'color',
        options: [
          {
            id: 'cyan-neon',
            label: 'Neon Cyan & Cyber',
            colorHex: '#06b6d4',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'electric-blue',
            label: 'Electric Blue Studio',
            colorHex: '#2563eb',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'midnight-black',
            label: 'Obsidian Black Noir',
            colorHex: '#18181b',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'crimson-red',
            label: 'Crimson Red High Energy',
            colorHex: '#dc2626',
            extraPrice: 5,
            image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'minimal-white',
            label: 'Minimalist Clean White',
            colorHex: '#f8fafc',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      },
      {
        id: 'video-length',
        name: 'Video Length Tier',
        type: 'select',
        options: [
          { id: 'up-to-30s', label: 'Up to 30 Seconds (Fast Hook)', extraPrice: 0 },
          { id: 'up-to-60s', label: 'Up to 60 Seconds (Standard)', extraPrice: 15 },
          { id: 'up-to-90s', label: 'Up to 90 Seconds (Deep Story)', extraPrice: 30 }
        ]
      }
    ]
  },
  {
    id: 'youtube-thumbnails',
    name: 'YouTube High-CTR Thumbnails',
    category: 'thumbnail',
    shortDescription: 'Click-magnet thumbnails crafted with psychological framing, 3D typography, and lighting.',
    description: 'A great video without clicks is invisible. We produce world-class YouTube thumbnails engineered to maximize Click-Through Rate (CTR). Each design features custom cutouts, volumetric face/rim lighting, depth separation, emotion amplification, bold 3D typography, and high-contrast color theory proven to stand out in dark mode browsing.',
    price: 35,
    deliveryTime: '24 Hours',
    isAvailable: true,
    featured: true,
    badge: 'Top CTR Booster',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Multi-layer composition with depth map framing',
      'AI portrait enhancement and volumetric lighting',
      'Custom 3D lettering & hand-drawn attention pointers',
      'Delivered in uncompressed 1080p & optimized WebP',
      'Includes 1 free A/B test variation thumbnail',
      'Source PSD / layered file available upon request'
    ],
    variations: [
      {
        id: 'color-theme',
        name: 'Color Palette & Atmosphere',
        type: 'color',
        options: [
          {
            id: 'cyan-glow',
            label: 'Cyan Glow Cyber',
            colorHex: '#06b6d4',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'electric-blue',
            label: 'Electric Blue Studio',
            colorHex: '#2563eb',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'ruby-red',
            label: 'Alert Ruby Red',
            colorHex: '#ef4444',
            extraPrice: 5,
            image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'dark-black',
            label: 'Dark Matte Black',
            colorHex: '#0f172a',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'pure-white',
            label: 'Clean Studio White',
            colorHex: '#ffffff',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      },
      {
        id: 'pack-count',
        name: 'Pack Selection',
        type: 'select',
        options: [
          { id: 'single', label: 'Single Thumbnail (1 Concept)', extraPrice: 0 },
          { id: 'ab-bundle', label: 'A/B Test Pair (2 Concepts)', extraPrice: 25 },
          { id: 'trio-pack', label: 'Trio Creator Pack (3 Concepts)', extraPrice: 45 }
        ]
      }
    ]
  },
  {
    id: 'cinematic-video-editing',
    name: 'Long-Form Cinematic Video Editing',
    category: 'video-editing',
    shortDescription: 'Full production editing for YouTube essays, podcasts, course lessons, and documentaries.',
    description: 'Turn raw footage into compelling storytelling. We handle the heavy lifting: multicam synchronization, audio mastering (dialogue isolation, room noise cleanup, loudness normalization), narrative retention pacing, curated stock footage insertion, seamless transitions, motion infographics, and DaVinci Resolve color grading.',
    price: 149,
    deliveryTime: '2-4 Days',
    isAvailable: true,
    featured: true,
    badge: 'Pro Tier',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Multi-camera audio/video timecode alignment',
      'Pacing overhaul to eliminate dead time & filler words',
      'Studio grade sound design, EQ, and background ambiance',
      'Custom styled lower-thirds, callouts, and motion chapters',
      'Licensed 4K B-roll footage and premium music library',
      'Color grading in Rec.709 with cinematic contrast curve'
    ],
    variations: [
      {
        id: 'color-grading-style',
        name: 'Color Grading Profile',
        type: 'color',
        options: [
          {
            id: 'teal-cyan',
            label: 'Cinematic Cyan & Teal',
            colorHex: '#0891b2',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'cool-blue',
            label: 'Sapphire Blue Mood',
            colorHex: '#1d4ed8',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'warm-red',
            label: 'Warm Crimson Sunset',
            colorHex: '#b91c1c',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'charcoal-noir',
            label: 'Charcoal Noir Dramatic',
            colorHex: '#111827',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      },
      {
        id: 'duration-scope',
        name: 'Video Duration Tier',
        type: 'select',
        options: [
          { id: 'under-10m', label: 'Up to 10 Minutes', extraPrice: 0 },
          { id: '10-20m', label: '10 to 20 Minutes', extraPrice: 60 },
          { id: '20-40m', label: '20 to 40 Minutes', extraPrice: 120 }
        ]
      }
    ]
  },
  {
    id: 'social-media-design',
    name: 'Social Media Design & Carousel Kits',
    category: 'social-media',
    shortDescription: 'Scroll-stopping Instagram carousels, LinkedIn slide decks, and X graphic templates.',
    description: 'Elevate your personal brand or agency with modern, authoritative graphic assets. We develop high-converting multi-slide educational carousels, quote cards, stat breakdowns, and launch announcements that build trust and generate bookmarks.',
    price: 65,
    deliveryTime: '24-48 Hours',
    isAvailable: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Up to 8 high-density custom designed carousel slides',
      'Seamless swipe-through alignment & panoramic transitions',
      'Exported in crisp 1080x1350 (4:5) Instagram & PDF for LinkedIn',
      'Tailored to your specific brand hex codes and typography',
      'Editable Figma or Canva project file option'
    ],
    variations: [
      {
        id: 'color-theme',
        name: 'Theme Palette',
        type: 'color',
        options: [
          {
            id: 'cyan-future',
            label: 'Neon Cyan Accent',
            colorHex: '#06b6d4',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'electric-blue',
            label: 'Tech Blue Accent',
            colorHex: '#3b82f6',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'dark-black',
            label: 'Pitch Black & Grey',
            colorHex: '#090a0f',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'pure-white',
            label: 'Minimalist White & Grey',
            colorHex: '#ffffff',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 'ai-video-creation',
    name: 'AI Video Creation & Voice Synthesis',
    category: 'ai-video',
    shortDescription: 'Futuristic AI generated video clips, realistic voiceovers, and avatar product ads.',
    description: 'Harness state-of-the-art generative tools (Midjourney, Runway Gen-3, ElevenLabs, Kling) without needing prompt engineering expertise. We generate hyper-realistic commercial scenes, synthetic cinematic environments, and studio-grade AI voiceovers with human inflections.',
    price: 95,
    deliveryTime: '48 Hours',
    isAvailable: true,
    featured: true,
    badge: 'Cutting Edge',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Curated AI generations with consistent character seed',
      'Camera movement control: zoom, pan, orbit, and hyper-lapse',
      'Realistic human-grade voiceover in 30+ international accents',
      'AI upscaled to crystal-clear 4K resolution (60 FPS)',
      'Commercial usage rights for advertisements & organic social'
    ],
    variations: [
      {
        id: 'aesthetic-style',
        name: 'Visual Tone & Lighting',
        type: 'color',
        options: [
          {
            id: 'cyan-cyberpunk',
            label: 'Cyberpunk Cyan Neon',
            colorHex: '#06b6d4',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'deep-blue-scifi',
            label: 'Deep Sci-Fi Blue',
            colorHex: '#1e40af',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'red-dystopia',
            label: 'Neon Red Horizon',
            colorHex: '#dc2626',
            extraPrice: 10,
            image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'clean-white-futuristic',
            label: 'Futuristic Sterile White',
            colorHex: '#f1f5f9',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      },
      {
        id: 'voice-accent',
        name: 'AI Voice Style',
        type: 'select',
        options: [
          { id: 'us-deep-male', label: 'US Deep Cinematic Voiceover', extraPrice: 0 },
          { id: 'uk-sophisticated', label: 'UK Sophisticated Tech Voice', extraPrice: 0 },
          { id: 'energetic-creator', label: 'High Energy Modern Creator Voice', extraPrice: 0 }
        ]
      }
    ]
  },
  {
    id: 'banners-graphics',
    name: 'Banners & Creative Graphics Suite',
    category: 'banners',
    shortDescription: 'Branded YouTube headers, X/Twitter banners, Twitch overlays, and digital billboards.',
    description: 'Make a cohesive, powerhouse first impression across every digital platform. We design responsive header graphics that look flawless on mobile, desktop, and smart TVs, incorporating your handle, schedule, call to action, and core positioning statement.',
    price: 45,
    deliveryTime: '24-48 Hours',
    isAvailable: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Multi-platform export (YouTube, X, LinkedIn, Discord & Twitch)',
      'Safe-zone checked for mobile apps and widescreen displays',
      'High-resolution vector assets & custom 3D badges',
      'Includes matching profile avatar icon graphics',
      'Full commercial license included'
    ],
    variations: [
      {
        id: 'color-palette',
        name: 'Core Banner Palette',
        type: 'color',
        options: [
          {
            id: 'blue-gradient',
            label: 'Electric Blue Gradient',
            colorHex: '#2563eb',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'cyan-minimal',
            label: 'Cyan Glow Cyber',
            colorHex: '#06b6d4',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'pitch-black',
            label: 'Matte Charcoal & Gold',
            colorHex: '#0f172a',
            extraPrice: 0,
            image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'
          },
          {
            id: 'red-flame',
            label: 'Crimson Red Gaming',
            colorHex: '#ef4444',
            extraPrice: 5,
            image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 'basic-seo-optimization',
    name: 'Basic SEO & Content Optimization',
    category: 'seo',
    shortDescription: 'Algorithmic title keywords, metadata descriptions, chapter timestamps, and tags.',
    description: 'Ensure your videos and digital content actually rank in search and recommended feeds. We run competitive search volume analysis to identify high-converting, low-competition keywords, craft click-enticing titles, construct keyword-rich descriptions, and produce accurate chapter timestamps.',
    price: 39,
    deliveryTime: '24 Hours',
    isAvailable: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Keyword competitor audit & search volume ranking targets',
      '3 High-converting YouTube title formulas to test',
      'Optimized 500-word video description with natural keyword density',
      'Detailed video timestamps & chapter markers for Google Search SERP',
      'Up to 30 high-relevance algorithmic tags & hashtags',
      'Checklist for pinned comments, end cards, and playlists'
    ],
    variations: [
      {
        id: 'tier-scope',
        name: 'Optimization Level',
        type: 'select',
        options: [
          { id: 'single-video', label: 'Single Video Optimization', extraPrice: 0 },
          { id: 'triple-pack', label: '3-Video Strategy Bundle', extraPrice: 40 },
          { id: 'channel-audit', label: 'Full Channel Audit & 5 Videos', extraPrice: 90 }
        ]
      }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'PC-92041',
    customerName: 'Marcus Vance',
    whatsappNumber: '+1 (555) 382-9014',
    items: [
      {
        id: 'item-1',
        serviceId: 'shorts-reels-editing',
        serviceName: 'Shorts / Reels / TikTok Viral Editing',
        basePrice: 49,
        unitPrice: 49,
        quantity: 3,
        selectedVariations: [
          {
            variationId: 'color-theme',
            variationName: 'Color Theme & Aesthetic',
            optionId: 'cyan-neon',
            optionLabel: 'Neon Cyan & Cyber',
            extraPrice: 0,
            colorHex: '#06b6d4'
          }
        ],
        displayImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
        deliveryTime: '24-48 Hours'
      }
    ],
    quantity: 3,
    total: 147,
    requirements: 'Need 3 high-energy talking head reels from my podcast episode #14. Hormozi captions in cyan with sound effects on keyword emphasizes.',
    referenceUrl: 'https://drive.google.com/drive/folders/sample-podcast-vids',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: 'New' as const
  },
  {
    id: 'PC-91884',
    customerName: 'Elena Rostova',
    whatsappNumber: '+44 7911 123456',
    items: [
      {
        id: 'item-2',
        serviceId: 'youtube-thumbnails',
        serviceName: 'YouTube High-CTR Thumbnails',
        basePrice: 35,
        unitPrice: 60,
        quantity: 1,
        selectedVariations: [
          {
            variationId: 'color-theme',
            variationName: 'Color Palette & Atmosphere',
            optionId: 'ruby-red',
            optionLabel: 'Alert Ruby Red',
            extraPrice: 5,
            colorHex: '#ef4444'
          },
          {
            variationId: 'pack-count',
            variationName: 'Pack Selection',
            optionId: 'ab-bundle',
            optionLabel: 'A/B Test Pair (2 Concepts)',
            extraPrice: 20
          }
        ],
        displayImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1000&q=80',
        deliveryTime: '24 Hours'
      }
    ],
    quantity: 1,
    total: 60,
    requirements: 'Title is: "I Spent 30 Days in an Abandoned Bunker". Need high tension face expression cutout and dramatic red warning lights.',
    referenceUrl: 'https://youtube.com/@elenarostovatech',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: 'In Progress' as const
  },
  {
    id: 'PC-90512',
    customerName: 'David Chen',
    whatsappNumber: '+65 9123 4567',
    items: [
      {
        id: 'item-3',
        serviceId: 'cinematic-video-editing',
        serviceName: 'Long-Form Cinematic Video Editing',
        basePrice: 149,
        unitPrice: 209,
        quantity: 1,
        selectedVariations: [
          {
            variationId: 'color-grading-style',
            variationName: 'Color Grading Profile',
            optionId: 'teal-cyan',
            optionLabel: 'Cinematic Cyan & Teal',
            extraPrice: 0,
            colorHex: '#0891b2'
          },
          {
            variationId: 'duration-scope',
            variationName: 'Video Duration Tier',
            optionId: '10-20m',
            optionLabel: '10 to 20 Minutes',
            extraPrice: 60
          }
        ],
        displayImage: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80',
        deliveryTime: '2-4 Days'
      }
    ],
    quantity: 1,
    total: 209,
    requirements: 'Fintech documentary essay about digital banking disruption. Clean motion typography and sound design.',
    referenceUrl: 'https://dropbox.com/fintech-raw-assets',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    status: 'Completed' as const
  }
];
