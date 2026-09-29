export type ServiceCategory = 
  | 'all'
  | 'video-editing'
  | 'short-form'
  | 'thumbnail'
  | 'social-media'
  | 'banners'
  | 'ai-video'
  | 'seo';

export interface VariationOption {
  id: string;
  label: string;
  colorHex?: string;
  extraPrice: number;
  image?: string; // If this option changes the displayed image (e.g. for Black, White, Blue, Red)
}

export interface ServiceVariation {
  id: string;
  name: string;
  type: 'color' | 'select' | 'radio';
  options: VariationOption[];
}

export interface Service {
  id: string;
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
  featured?: boolean;
  badge?: string;
}

export interface CartItemVariationChoice {
  variationId: string;
  variationName: string;
  optionId: string;
  optionLabel: string;
  extraPrice: number;
  colorHex?: string;
}

export interface CartItem {
  id: string;
  serviceId: string;
  serviceName: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  selectedVariations: CartItemVariationChoice[];
  displayImage: string;
  deliveryTime: string;
}

export type OrderStatus = 
  | 'New'
  | 'Contacted'
  | 'Confirmed'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  whatsappNumber: string;
  items: CartItem[];
  quantity: number;
  total: number;
  requirements: string;
  referenceUrl?: string;
  createdAt: string;
  status: OrderStatus;
  adminNotes?: string;
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'admin';
  loggedInAt: string;
}

export interface AdminStats {
  totalOrders: number;
  newOrders: number;
  inProgress: number;
  completed: number;
  totalOrderValue: number;
  activeServices: number;
}
