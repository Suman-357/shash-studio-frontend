import React, { useState } from "react";
import { FAQS } from "../../data/faqs";
import { useLanguage } from "../../context/LanguageContext";

export const FaqSection = () => {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="w-full py-8 sm:py-12 bg-[#FCF9F3]">
      <div className="max-w-[840px] mx-auto px-4 md:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-[12px] font-bold text-[#2D4A37] uppercase tracking-[0.2em] block">
            {t("faqTag")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C3325] tracking-tight">
            {t("faqTitle")}
          </h2>
          <p className="text-[14px] text-[#5B635E]">
            {t("faqSub")}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 pt-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif text-lg sm:text-xl text-[#1C3325] hover:text-[#2D4A37] transition-colors"
                  type="button"
                >
                  <span>
                    {lang === "kn" ? faq.question : faq.questionEn}
                  </span>
                  <span className="material-symbols-outlined text-[22px] text-[#2D4A37] transition-transform duration-300">
                    {isOpen ? "remove" : "add"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-[15px] text-[#424843] leading-relaxed border-t border-neutral-100">
                    <p className="pt-3">
                      {lang === "kn" ? faq.answerKn : faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
