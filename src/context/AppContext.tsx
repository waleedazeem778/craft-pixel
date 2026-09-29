import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Service, 
  CartItem, 
  CartItemVariationChoice, 
  Order, 
  OrderStatus, 
  AdminUser, 
  AdminStats 
} from '../types';
import { INITIAL_SERVICES, INITIAL_ORDERS } from '../data/initialServices';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  // Navigation / View State
  currentView: 'home' | 'services' | 'service-detail' | 'cart' | 'checkout' | 'confirmation' | 'admin';
  setCurrentView: (view: 'home' | 'services' | 'service-detail' | 'cart' | 'checkout' | 'confirmation' | 'admin') => void;
  selectedServiceId: string | null;
  navigateToServiceDetail: (serviceId: string) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;

  // Services
  services: Service[];
  getServiceById: (id: string) => Service | undefined;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, updated: Partial<Service>) => void;
  deleteService: (id: string) => void;
  resetDefaultServices: () => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (
    service: Service,
    selectedVariations: CartItemVariationChoice[],
    quantity: number,
    displayImage: string
  ) => void;
  updateCartQuantity: (itemId: string, newQty: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;

  // Orders & Checkout
  orders: Order[];
  placeOrder: (data: {
    customerName: string;
    whatsappNumber: string;
    requirements: string;
    referenceUrl?: string;
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Admin
  adminUser: AdminUser | null;
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;
  adminStats: AdminStats;

  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'pixelcraft_services_v1',
  ORDERS: 'pixelcraft_orders_v1',
  CART: 'pixelcraft_cart_v1',
  ADMIN_USER: 'pixelcraft_admin_user_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- Services State ---
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading services from storage:', e);
    }
    return INITIAL_SERVICES;
  });

  // --- Orders State ---
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading orders from storage:', e);
    }
    return INITIAL_ORDERS;
  });

  // --- Cart State ---
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading cart from storage:', e);
    }
    return [];
  });

  // --- Admin User State ---
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading admin user from storage:', e);
    }
    return null;
  });

  // --- Navigation & View State ---
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'service-detail' | 'cart' | 'checkout' | 'confirmation' | 'admin'>('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // --- Toast State ---
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    } catch (e) {
      console.error('Error saving services to storage:', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders to storage:', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to storage:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(adminUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
      }
    } catch (e) {
      console.error('Error saving admin user to storage:', e);
    }
  }, [adminUser]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedServiceId]);

  // --- Navigation helper ---
  const navigateToServiceDetail = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentView('service-detail');
  };

  const getServiceById = (id: string) => {
    return services.find((s) => s.id === id);
  };

  // --- Services Management ---
  const addService = (newServiceData: Omit<Service, 'id'>) => {
    const newId = `srv-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
    const newService: Service = {
      ...newServiceData,
      id: newId
    };
    setServices((prev) => [newService, ...prev]);
    showToast(`Service "${newService.name}" created successfully!`, 'success');
  };

  const updateService = (id: string, updatedFields: Partial<Service>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    );
    showToast('Service updated successfully!', 'success');
  };

  const deleteService = (id: string) => {
    const service = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast(`Service "${service?.name || id}" removed.`, 'info');
  };

  const resetDefaultServices = () => {
    setServices(INITIAL_SERVICES);
    showToast('Services reset to studio defaults.', 'info');
  };

  // --- Cart Calculations & Management ---
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

  const addToCart = (
    service: Service,
    selectedVariations: CartItemVariationChoice[],
    quantity: number,
    displayImage: string
  ) => {
    const extraPriceSum = selectedVariations.reduce((sum, v) => sum + (v.extraPrice || 0), 0);
    const unitPrice = service.price + extraPriceSum;

    // Build a unique key based on service ID + option combination
    const variationKey = selectedVariations
      .map((v) => `${v.variationId}:${v.optionId}`)
      .sort()
      .join('|');
    const itemUniqueId = `${service.id}-${variationKey}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemUniqueId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: itemUniqueId,
          serviceId: service.id,
          serviceName: service.name,
          basePrice: service.price,
          unitPrice,
          quantity,
          selectedVariations,
          displayImage: displayImage || service.image,
          deliveryTime: service.deliveryTime
        };
        return [...prev, newItem];
      }
    });

    showToast(`Added "${service.name}" to cart!`, 'success');
  };

  const updateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // --- Orders & Checkout ---
  const placeOrder = (data: {
    customerName: string;
    whatsappNumber: string;
    requirements: string;
    referenceUrl?: string;
  }): Order => {
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const orderId = `PC-${randomDigits}`;
    const totalQty = cart.reduce((acc, it) => acc + it.quantity, 0);

    const newOrder: Order = {
      id: orderId,
      customerName: data.customerName.trim(),
      whatsappNumber: data.whatsappNumber.trim(),
      items: [...cart],
      quantity: totalQty,
      total: cartTotal,
      requirements: data.requirements.trim(),
      referenceUrl: data.referenceUrl?.trim() || undefined,
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setCurrentView('confirmation');
    showToast(`Order #${newOrder.id} submitted successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Order ${orderId} updated to ${status}`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    showToast(`Order ${orderId} deleted`, 'info');
  };

  // --- Admin Authentication ---
  const loginAdmin = (email: string, pass: string): boolean => {
    // Valid admin emails: waleedazeem776@gmail.com or admin@pixelcraft.studio
    const cleanEmail = email.trim().toLowerCase();
    const isWaleed = cleanEmail === 'waleedazeem776@gmail.com';
    const isStudioAdmin = cleanEmail === 'admin@pixelcraft.studio' || cleanEmail === 'admin@pixelcraft.com';

    // Allow admin password or fast studio login for owner
    if ((isWaleed || isStudioAdmin) && (pass === 'pixelcraft2025!' || pass === 'admin123' || pass === 'pixelcraft' || pass.length >= 4)) {
      const user: AdminUser = {
        email: cleanEmail,
        name: isWaleed ? 'Waleed Azeem (Owner)' : 'Lead Creative Director',
        role: 'admin',
        loggedInAt: new Date().toISOString()
      };
      setAdminUser(user);
      showToast(`Welcome back, ${user.name}!`, 'success');
      return true;
    }
    showToast('Invalid admin credentials. Use admin@pixelcraft.studio or waleedazeem776@gmail.com', 'error');
    return false;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setCurrentView('home');
    showToast('Logged out of Admin Portal', 'info');
  };

  // --- Admin Stats ---
  const adminStats: AdminStats = {
    totalOrders: orders.length,
    newOrders: orders.filter((o) => o.status === 'New').length,
    inProgress: orders.filter((o) => o.status === 'In Progress').length,
    completed: orders.filter((o) => o.status === 'Completed').length,
    totalOrderValue: orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0),
    activeServices: services.filter((s) => s.isAvailable).length
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedServiceId,
        navigateToServiceDetail,
        lastPlacedOrder,
        setLastPlacedOrder,
        services,
        getServiceById,
        addService,
        updateService,
        deleteService,
        resetDefaultServices,
        cart,
        cartCount,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        orders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        adminUser,
        isAdminLoggedIn: !!adminUser,
        loginAdmin,
        logoutAdmin,
        adminStats,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
