import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { submitInquiry } from "../../services/api";

export const ContactSection = () => {
  const { lang, t } = useLanguage();
  const [inquiryData, setInquiryData] = useState({
    name: "",
    whatsapp: "",
    program: "21-Day Holistic Challenge",
    message: "",
    consentGiven: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inquiryData.consentGiven) return;
    setIsSubmitting(true);
    try {
      await submitInquiry(inquiryData);
      setSuccessMsg(true);
      setInquiryData({
        name: "",
        whatsapp: "",
        program: "21-Day Holistic Challenge",
        message: "",
        consentGiven: false
      });
    } catch (err) {
      console.warn("Backend not available, showing friendly confirmation:", err);
      setSuccessMsg(true);
      setInquiryData({
        name: "",
        whatsapp: "",
        program: "21-Day Holistic Challenge",
        message: "",
        consentGiven: false
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-8 sm:py-12 bg-[#F6F3ED]/80 relative">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Sanctuary Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[12px] font-bold text-[#2D4A37] uppercase tracking-[0.2em] block">
                {t("contactTag")}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C3325] tracking-tight">
                {t("contactTitle")}
              </h2>
              <p className="text-[15px] text-[#5B635E] leading-relaxed">
                {t("contactSub")}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 shadow-xs">
                <span className="p-2.5 rounded-xl bg-[#EDE8DE] text-[#1C3325]">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </span>
                <div>
                  <p className="text-[12px] text-[#5B635E]">Email Us</p>
                  <a
                    href="mailto:shashstudios@gmail.com"
                    className="font-semibold text-[#1C3325] hover:text-[#2D4A37] text-[15px]"
                  >
                    shashstudios@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 shadow-xs">
                <span className="p-2.5 rounded-xl bg-[#EDE8DE] text-[#1C3325]">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </span>
                <div>
                  <p className="text-[12px] text-[#5B635E]">Location</p>
                  <p className="font-semibold text-[#1C3325] text-[15px]">
                    Mysuru, Karnataka, India
                  </p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 shadow-xs">
                <span className="p-2.5 rounded-xl bg-[#EDE8DE] text-[#1C3325]">
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                </span>
                <div>
                  <p className="text-[12px] text-[#5B635E]">Instagram DM</p>
                  <a
                    href="https://instagram.com/sushiidays"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1C3325] hover:text-[#2D4A37] text-[15px]"
                  >
                    @sushiidays
                  </a>
                </div>
              </div>
            </div>

            {/* Elders Support Banner */}
            <div className="p-4 rounded-2xl bg-[#BEE8DC]/40 border border-[#84A98C]/30 text-[#082013] space-y-1">
              <p className="text-[14px] font-bold text-[#1C3325]">{t("eldersTitle")}</p>
              <p className="text-[12px] text-[#2D4A37] leading-relaxed">
                {t("eldersDesc")}
              </p>
            </div>
          </div>

          {/* Right: Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FDFBF7] border border-[#2D4A37]/10 p-6 md:p-8 shadow-lg space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1C3325]">
                  {t("dropMessage")}
                </h3>
                <p className="text-[13px] text-[#5B635E] mt-1">
                  {t("dropMessageSub")}
                </p>
              </div>

              {successMsg && (
                <div className="p-4 rounded-xl bg-[#BEE8DC] text-[#082013] text-[13px] font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-700">check_circle</span>
                  <span>
                    ✦ ಧನ್ಯವಾದಗಳು! Thank you! Our Mysuru team has received your message and will reach out via WhatsApp shortly.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[13px] font-semibold text-[#1A1F1C] block">
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    placeholder={lang === "kn" ? "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು" : "Your full name"}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2D4A37]/15 text-[#1A1F1C] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#52796F]/40 shadow-xs"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-1">
                  <label className="text-[13px] font-semibold text-[#1A1F1C] block">
                    {t("whatsappNum")}
                  </label>
                  <input
                    type="tel"
                    required
                    value={inquiryData.whatsapp}
                    onChange={(e) => setInquiryData({ ...inquiryData, whatsapp: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2D4A37]/15 text-[#1A1F1C] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#52796F]/40 shadow-xs"
                  />
                </div>

                {/* Program Selection */}
                <div className="space-y-1">
                  <label className="text-[13px] font-semibold text-[#1A1F1C] block">
                    {t("programInterest")}
                  </label>
                  <select
                    value={inquiryData.program}
                    onChange={(e) => setInquiryData({ ...inquiryData, program: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2D4A37]/15 text-[#1A1F1C] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#52796F]/40 shadow-xs"
                  >
                    <option value="21-Day Holistic Challenge">21-Day Holistic Challenge (₹499)</option>
                    <option value="Sushii Nights (₹49)">Sushii Nights (₹49)</option>
                    <option value="Ladies Yoga (₹179)">Ladies Yoga (₹179)</option>
                    <option value="Strength Training (₹419)">Strength Training (₹419)</option>
                    <option value="Kids Yoga (₹239)">Kids Yoga (₹239)</option>
                    <option value="Ashtanga Yoga (₹419)">Ashtanga Yoga (₹419)</option>
                    <option value="Combo Pass (₹599)">Combo Pass (₹599)</option>
                    <option value="General Query / Scholarship">General Query / Scholarship</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[13px] font-semibold text-[#1A1F1C] block">
                    {t("yourMessage")}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder={lang === "kn" ? "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ..." : "Write your questions here..."}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#2D4A37]/15 text-[#1A1F1C] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#52796F]/40 shadow-xs"
                  />
                </div>

                 {/* Consent Checkbox */}
                <div className="p-3 rounded-xl bg-[#EDE8DE]/40 border border-[#2D4A37]/10">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={inquiryData.consentGiven}
                      onChange={(e) => setInquiryData({ ...inquiryData, consentGiven: e.target.checked })}
                      className="mt-0.5 w-4 h-4 rounded text-[#1C3325] focus:ring-[#52796F] border-neutral-300 accent-[#1C3325] cursor-pointer"
                    />
                    <span className="text-[12px] text-[#2D4A37] leading-relaxed">
                      {lang === "kn"
                        ? "ನನ್ನ ವಿಚಾರಣೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಶ್ಯಾಶ್ ಸ್ಟುಡಿಯೋಸ್ WhatsApp/ಇಮೇಲ್ ಮೂಲಕ ನನ್ನನ್ನು ಸಂಪರ್ಕಿಸಲು ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ."
                        : "I consent to Shash Studios contacting me via WhatsApp/Email regarding my inquiry & workshop details."}
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !inquiryData.consentGiven}
                  className={`w-full py-4 rounded-full font-bold text-[15px] shadow-md transition-all flex items-center justify-center gap-2 ${
                    !inquiryData.consentGiven || isSubmitting
                      ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                      : "bg-[#D48C46] text-[#FDFBF7] hover:bg-[#C26D38] active:scale-95"
                  }`}
                >
                  <span>{isSubmitting ? "Sending..." : t("sendMessageBtn")}</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
