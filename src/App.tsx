import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#07080d] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'services' && <ServicesPage />}
        {currentView === 'service-detail' && <ServiceDetailPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'confirmation' && <OrderConfirmationPage />}
        {currentView === 'admin' && <AdminPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Feedback System */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
