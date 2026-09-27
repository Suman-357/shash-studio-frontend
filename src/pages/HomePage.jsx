import React from "react";
import { HeroSection } from "../components/sections/HeroSection";
import { WorkshopsSection } from "../components/sections/WorkshopsSection";
import { ComboPassBanner } from "../components/sections/ComboPassBanner";
import { ShopTeaserBanner } from "../components/sections/ShopTeaserBanner";
import { TeacherSection } from "../components/sections/TeacherSection";
import { SocialHubSection } from "../components/sections/SocialHubSection";
import { FaqSection } from "../components/sections/FaqSection";
import { ContactSection } from "../components/sections/ContactSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <WorkshopsSection />
      <ComboPassBanner />
      <ShopTeaserBanner />
      <TeacherSection />
      <SocialHubSection />
      <FaqSection />
      <ContactSection />
    </>
  );
};
