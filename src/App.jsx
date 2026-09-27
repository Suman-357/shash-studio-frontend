import React from "react";
import { QueryProvider } from "./context/QueryProvider";
import { LanguageProvider } from "./context/LanguageContext";
import { BookingProvider } from "./context/BookingContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/sections/HeroSection";
import { WorkshopsSection } from "./components/sections/WorkshopsSection";
import { ComboPassBanner } from "./components/sections/ComboPassBanner";
import { TeacherSection } from "./components/sections/TeacherSection";
import { SocialHubSection } from "./components/sections/SocialHubSection";
import { FaqSection } from "./components/sections/FaqSection";
import { ContactSection } from "./components/sections/ContactSection";
import { AudioPlayerDock } from "./components/ui/AudioPlayerDock";
import { BookingModal } from "./components/booking/BookingModal";

export function App() {
  return (
    <QueryProvider>
      <LanguageProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#1A1F1C] selection:bg-[#BEE8DC] selection:text-[#082013]">
            {/* Header containing stacked AnnouncementBar + Navbar */}
            <Navbar />

            {/* Main Sanctuary Experience with clean top offset */}
            <main className="flex-1 w-full pt-28 lg:pt-32">
              <HeroSection />
              <WorkshopsSection />
              <ComboPassBanner />
              <TeacherSection />
              <SocialHubSection />
              <FaqSection />
              <ContactSection />
            </main>

            {/* Sanctuary Footer */}
            <Footer />

            {/* Mindful Soundscape Vignette Player */}
            <AudioPlayerDock />

            {/* Step 1 & 2 Registration & Checkout Modal */}
            <BookingModal />
          </div>
        </BookingProvider>
      </LanguageProvider>
    </QueryProvider>
  );
}

export default App;
