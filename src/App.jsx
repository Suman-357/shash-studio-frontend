import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryProvider } from "./context/QueryProvider";
import { LanguageProvider } from "./context/LanguageContext";
import { BookingProvider } from "./context/BookingContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { AudioPlayerDock } from "./components/ui/AudioPlayerDock";
import { BookingModal } from "./components/booking/BookingModal";
import { ProductOrderModal } from "./components/products/ProductOrderModal";

export function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <QueryProvider>
      <LanguageProvider>
        <BookingProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1A1F1C] selection:bg-[#BEE8DC] selection:text-[#082013]">
              {/* Header containing stacked AnnouncementBar + Navbar */}
              <Navbar />

              {/* Main Sanctuary Experience with clean top offset */}
              <main className="flex-1 w-full pt-28 lg:pt-32">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/shop"
                    element={<ShopPage onBuyProduct={(mat) => setSelectedProduct(mat)} />}
                  />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </main>

              {/* Sanctuary Footer */}
              <Footer />

              {/* Mindful Soundscape Vignette Player */}
              <AudioPlayerDock />

              {/* Step 1 & 2 Registration & Checkout Modal */}
              <BookingModal />

              {/* Yoga Mat Product Checkout Modal */}
              <ProductOrderModal
                product={selectedProduct}
                isOpen={Boolean(selectedProduct)}
                onClose={() => setSelectedProduct(null)}
              />
            </div>
          </BrowserRouter>
        </BookingProvider>
      </LanguageProvider>
    </QueryProvider>
  );
}

export default App;
