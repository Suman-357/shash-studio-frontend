import React, { createContext, useContext, useState, useEffect } from "react";
import { TRANSLATIONS } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("shash_lang") || "kn"; // Default to Kannada (KN) as primary audience in Mysuru / Karnataka
  });

  const toggleLanguage = (selectedLang) => {
    const next = selectedLang || (lang === "kn" ? "en" : "kn");
    setLang(next);
    localStorage.setItem("shash_lang", next);
  };

  const t = (key) => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
