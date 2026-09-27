import React, { useRef, useEffect } from "react";
import { WORKSHOPS, COMBO_PASS, BATCH_SLOTS, SECTIONS } from "../../data/workshops";
import { useBooking } from "../../context/BookingContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  IconArrowRight,
  IconClose,
  IconCheck,
  IconLock,
  IconShield,
  IconWhatsApp,
  IconClock,
  IconLotus
} from "../ui/Icons";

export const BookingModal = () => {
  const { lang } = useLanguage();
  const modalContentRef = useRef(null);

  const {
    isModalOpen,
    closeBookingModal,
    selectedSection,
    setSelectedSection,
    selectedWorkshop,
    setSelectedWorkshop,
    selectedSlot,
    setSelectedSlot,
    currentStep,
    setCurrentStep,
    formData,
    handleFieldChange,
    isSubmitting,
    bookingSuccess,
    completeBooking
  } = useBooking();

  // Scroll to top whenever step changes
  useEffect(() => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, isModalOpen]);

  if (!isModalOpen) return null;

  const isKn = lang === "kn";

  const isFormValid =
    formData.fullName.trim() !== "" &&
    formData.phone.trim().length >= 10 &&
    formData.email.trim() !== "" &&
    Boolean(formData.consentGiven);

  // Dynamic localization strings
  const m = {
    modalTitle: isKn ? "SHASH Studios • ಆನ್‌ಲೈನ್ ನೋಂದಣಿ" : "SHASH Studios • Online Registration",
    step1Tag: isKn ? "ಹಂತ ೧ (೨ ರಲ್ಲಿ)" : "Step 1 of 2",
    step1Title: isKn ? "ಕಾರ್ಯಕ್ರಮ & ಬ್ಯಾಚ್ ಆಯ್ಕೆ" : "Program & Batch Selection",
    step2Tag: isKn ? "ಹಂತ ೨ (೨ ರಲ್ಲಿ)" : "Step 2 of 2",
    step2Title: isKn ? "ವಿದ್ಯಾರ್ಥಿ ವಿವರಗಳು & ಪಾವತಿ" : "Student Details & Checkout",
    selectProgram: isKn ? "ಕಾರ್ಯಕ್ರಮ ಆಯ್ಕೆಮಾಡಿ" : "Select Program",
    bestValue: isKn ? "ಶ್ರೇಷ್ಠ ಮೌಲ್ಯ" : "Best Value",
    selectTiming: isKn ? "ಸಮಯದ ಸ್ಲಾಟ್ ಆಯ್ಕೆಮಾಡಿ" : "Select Batch Timing",
    allTimingsIst: isKn ? "ಭಾರತೀಯ ಕಾಲಮಾನ (IST)" : "All timings in IST",
    spotsLeft: isKn ? "ಸೀಟುಗಳು ಲಭ್ಯ" : "spots left",
    continueToDetails: isKn ? "ವಿವರಗಳಿಗೆ ಮುಂದುವರಿಯಿರಿ" : "Continue to Details",
    studentDetails: isKn ? "ವಿದ್ಯಾರ್ಥಿಯ ವಿವರಗಳು" : "Student Details",
    changeProgram: isKn ? "ಕಾರ್ಯಕ್ರಮ ಬದಲಾಯಿಸಿ" : "Change Program",
    fullName: isKn ? "ಪೂರ್ಣ ಹೆಸರು *" : "Full Name *",
    fullNamePlaceholder: isKn ? "ಉದಾ: ರಮೇಶ್ ಹೆಗಡೆ / ಅನನ್ಯ ರಾವ್" : "e.g. Ramesh Hegde / Ananya Rao",
    whatsappLabel: isKn ? "ವಾಟ್ಸಾಪ್ ಸಂಖ್ಯೆ (ಜೂಮ್ ಲಿಂಕ್‌ಗಾಗಿ) *" : "WhatsApp Mobile (For Zoom Links) *",
    whatsappPlaceholder: isKn ? "೧೦-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ" : "10-digit mobile number",
    whatsappNote: isKn
      ? "ಖಾಸಗಿ ವಾಟ್ಸಾಪ್ ಗ್ರೂಪ್ ಮತ್ತು ಕ್ಲಾಸ್ ಲಿಂಕ್ ಈ ಸಂಖ್ಯೆಗೆ ನೇರವಾಗಿ ಬರುತ್ತದೆ."
      : "Class Zoom links & WhatsApp cohort invite will be sent directly here.",
    emailLabel: isKn ? "ಇಮೇಲ್ ವಿಳಾಸ (ರಶೀದಿಗಾಗಿ) *" : "Email Address (For Receipt & Calendar Invite) *",
    emailPlaceholder: isKn ? "ಹೆಸರು@domain.com" : "name@domain.com",
    languagePref: isKn ? "ಬೋಧನಾ ಭಾಷೆಯ ಆದ್ಯತೆ" : "Language Preference",
    experienceLabel: isKn ? "ಆರೋಗ್ಯ ಟಿಪ್ಪಣಿಗಳು / ಯೋಗದ ಅನುಭವ" : "Experience & Health Notes",
    expBeginner: isKn ? "ಪ್ರಾರಂಭಿಕ ಹಂತ (ಯೋಗದಲ್ಲಿ ಯಾವುದೇ ಅನುಭವವಿಲ್ಲ)" : "Complete Beginner to Yoga",
    expIntermediate: isKn ? "ಮಧ್ಯಮ ಹಂತ (ಸಾಂದರ್ಭಿಕವಾಗಿ ಯೋಗ ಅಭ್ಯಾಸ)" : "Intermediate (Occasional Practice)",
    expBackPain: isKn ? "ಬೆನ್ನು ಅಥವಾ ಮೊಣಕಾಲು ನೋವು / ದಣಿವು" : "Lower Back / Knee Stiffness",
    expPrenatal: isKn ? "ಗರ್ಭಿಣಿ / ಪ್ರಸವಾನಂತರದ ಯೋಗ" : "Pregnancy / Postpartum Care",
    expStress: isKn ? "ನಿದ್ದೆಯ ಸಮಸ್ಯೆ / ಮಾನಸಿಕ ಒತ್ತಡ" : "Insomnia / High Stress Relief",
    orderSummary: isKn ? "ನೋಂದಣಿ ಸಾರಾಂಶ" : "Order Summary",
    batchMonth: isKn ? "ಆಗಸ್ಟ್ ೨೦೨೬ ಬ್ಯಾಚ್" : "August 2026 Batch",
    selectedBatch: isKn ? "ಆಯ್ಕೆ ಮಾಡಿದ ಬ್ಯಾಚ್:" : "Selected Batch:",
    zoomReplays: isKn ? "೨೪-ಗಂಟೆಗಳ ಜೂಮ್ ರೆಕಾರ್ಡಿಂಗ್:" : "24-Hour Zoom Replays:",
    included: isKn ? "ಉಚಿತ (ಒಳಗೊಂಡಿದೆ)" : "Included (Free)",
    whatsappCohort: isKn ? "ಖಾಸಗಿ ವಾಟ್ಸಾಪ್ ಕಮ್ಯೂನಿಟಿ:" : "Private WhatsApp Cohort:",
    lifetimeAccess: isKn ? "ಜೀವಮಾನದ ಪ್ರವೇಶ" : "Lifetime Access",
    totalDue: isKn ? "ಒಟ್ಟು ಪಾವತಿ:" : "Total Due:",
    taxesIncluded: isKn ? "ಎಲ್ಲಾ ತೆರಿಗೆಗಳು ಮತ್ತು ಜೂಮ್ ಲಿಂಕ್‌ಗಳನ್ನು ಒಳಗೊಂಡಿದೆ" : "Includes all taxes and Zoom links",
    payButtonText: isKn
      ? `₹${selectedWorkshop?.price} ಪಾವತಿಸಿ & ಬ್ಯಾಚ್ ಸೇರಿ`
      : `Proceed to Pay ₹${selectedWorkshop?.price} & Join Batch`,
    submittingText: isKn ? "ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ..." : "Confirming Registration...",
    whatsappDirect: isKn
      ? "ವಾಟ್ಸಾಪ್ ಮೂಲಕ ನೋಂದಾಯಿಸಿ (+91 76764 05895)"
      : "Register via WhatsApp (+91 76764 05895)",
    secureBadge: isKn ? "೧೦೦% ಸುರಕ್ಷಿತ" : "100% Secure",
    secureSub: isKn ? "UPI / GPay / Cards" : "UPI / GPay / Cards",
    replayBadge: isKn ? "೨೪-ಗಂ ರೆಕಾರ್ಡಿಂಗ್" : "24-Hr Replay",
    replaySub: isKn ? "ಯಾವುದೇ ಕ್ಲಾಸ್ ಮಿಸ್ ಆಗಲ್ಲ" : "Never miss a class",
    lineageBadge: isKn ? "ಮೈಸೂರು ಪರಂಪರೆ" : "Mysuru Lineage",
    lineageSub: isKn ? "ಅಧಿಕೃತ ಗುರುಕುಲ ಶೈಲಿ" : "Authentic Shala",
    successTitle: isKn ? "ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ!" : "Registration Confirmed!",
    successDesc: isKn
      ? "ಶಶ್ ಸ್ಟುಡಿಯೋಸ್ ಯೋಗ ಸಮುದಾಯಕ್ಕೆ ಸ್ವಾಗತ. ನಿಮ್ಮ ಜೂಮ್ ಲಿಂಕ್ ವಾಟ್ಸಾಪ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ."
      : "Welcome to Shash Studios! Your live Zoom link & orientation packet have been dispatched to WhatsApp.",
    joinWhatsapp: isKn ? "ವಾಟ್ಸಾಪ್ ಬ್ಯಾಚ್ ಗ್ರೂಪ್ ಸೇರಿ" : "Join WhatsApp Batch Group",
    closeReturn: isKn ? "ಮುಖ್ಯ ಪುಟಕ್ಕೆ ಮರಳಿ" : "Close & Return to Home",
    consentText: isKn
      ? "ನಾನು ಸ್ಟುಡಿಯೋ ಆರೋಗ್ಯ ನಿಯಮಗಳನ್ನು ಒಪ್ಪುತ್ತೇನೆ ಮತ್ತು WhatsApp ಹಾಗೂ ಇಮೇಲ್‌ನಲ್ಲಿ ಜೂಮ್ ಲಿಂಕ್‌ಗಳು, ರಿಪ್ಲೇಗಳು ಮತ್ತು ರಶೀದಿಗಳನ್ನು ಪಡೆಯಲು ಸಮ್ಮತಿಸುತ್ತೇನೆ."
      : "I agree to the Studio Health Guidelines & Terms, and consent to receive live Zoom links, 24-hr replays, and receipts via WhatsApp & Email.",
    consentRequired: isKn
      ? "ದಯವಿಟ್ಟು ಮುಂದುವರಿಯಲು ಸಮ್ಮತಿ ಚೆಕ್‌ಬಾಕ್ಸ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ."
      : "Please agree to studio guidelines to proceed with booking."
  };

  const currentSectionWorkshops = WORKSHOPS.filter((w) => w.section === selectedSection);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FCF9F3] rounded-3xl shadow-2xl border border-white/80 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/85 backdrop-blur-md border-b border-[#2D4A37]/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1C3325]/10 text-[#1C3325]">
              <IconLotus className="w-5 h-5 text-[#1C3325]" />
            </span>
            <div>
              <span className="font-serif text-base sm:text-lg font-bold text-[#1C3325] block leading-tight">
                {m.modalTitle}
              </span>
              <span className="text-[11px] text-[#52796F] font-semibold uppercase tracking-wider">
                Mysuru Shala Live Portal
              </span>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="w-8 h-8 rounded-full bg-[#EDE8DE] hover:bg-[#DCDAD4] text-[#1C3325] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper Indicator (Hidden on Success) */}
        {!bookingSuccess && (
          <div className="px-6 pt-3 pb-2 bg-[#F9F6F0] border-b border-[#2D4A37]/10 shrink-0">
            <div className="flex items-center justify-between text-[12px] font-semibold mb-1.5">
              <span className="text-[#C26D38] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C26D38]" />
                {currentStep === 1 ? m.step1Tag : m.step2Tag}
              </span>
              <span className="text-[#5B635E]">
                {currentStep === 1 ? m.step1Title : m.step2Title}
              </span>
            </div>
            {/* Smooth Progress Bar */}
            <div className="w-full bg-[#EDE8DE] h-1.5 rounded-full overflow-hidden">
              <div
                className={`bg-[#1C3325] h-full transition-all duration-300 ${
                  currentStep === 1 ? "w-1/2" : "w-full"
                }`}
              />
            </div>
          </div>
        )}

        {/* Scrollable Modal Content */}
        <div ref={modalContentRef} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {bookingSuccess ? (
            /* SUCCESS CONFIRMATION STATE */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#BEE8DC] text-[#1C3325] flex items-center justify-center mx-auto shadow-md">
                <IconCheck className="w-8 h-8 text-[#1C3325]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C3325] font-bold">
                  {m.successTitle}
                </h3>
                <p className="text-[14px] text-[#5B635E] max-w-md mx-auto leading-relaxed">
                  {m.successDesc}
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#2D4A37]/15 text-left space-y-2.5 text-[13px] shadow-xs">
                <div className="flex justify-between pb-2 border-b border-neutral-100">
                  <span className="text-[#5B635E]">{isKn ? "ಬುಕಿಂಗ್ ಐಡಿ:" : "Booking ID:"}</span>
                  <span className="font-mono font-bold text-[#1C3325]">{bookingSuccess.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B635E]">{isKn ? "ಕಾರ್ಯಕ್ರಮ:" : "Workshop:"}</span>
                  <span className="font-semibold text-[#1C3325]">
                    {isKn && selectedWorkshop?.titleKn ? selectedWorkshop.titleKn : bookingSuccess.workshopTitle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B635E]">{isKn ? "ಬ್ಯಾಚ್ ಸಮಯ:" : "Batch Time:"}</span>
                  <span className="text-[#1C3325] font-medium">{bookingSuccess.slot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B635E]">WhatsApp:</span>
                  <span className="text-[#1C3325]">+91 {bookingSuccess.whatsapp}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-neutral-100 font-bold text-[14px]">
                  <span>{isKn ? "ಒಟ್ಟು ಪಾವತಿಸಿದ ಮೊತ್ತ:" : "Total Paid:"}</span>
                  <span className="text-[#1C3325]">₹{bookingSuccess.amount}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/917676405895?text=Namaskara%20Shashirekha%2C%20I%20have%20registered%20for%20${encodeURIComponent(bookingSuccess.workshopTitle)}%20(Booking%20ID%3A%20${bookingSuccess.bookingId}).`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-full bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 shadow-md hover:bg-green-600 transition-colors"
                >
                  <IconWhatsApp className="w-5 h-5 text-white" />
                  <span>{m.joinWhatsapp}</span>
                </a>
                <button
                  onClick={closeBookingModal}
                  className="w-full py-3 rounded-full bg-[#EDE8DE] text-[#1C3325] font-semibold text-[13px] hover:bg-[#DCDAD4] transition-colors cursor-pointer"
                >
                  {m.closeReturn}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: SEQUENTIAL SELECTION (DISCIPLINE -> CLASS -> BATCH) */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Discipline / Section Tabs */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] font-bold text-[#1C3325] uppercase tracking-wider">
                        1. {isKn ? "ವಿಭಾಗ ಆಯ್ಕೆಮಾಡಿ" : "Choose Discipline"}
                      </label>
                      <span className="text-[11px] text-[#52796F] font-medium">Phase 1 of 3</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {SECTIONS.map((sec) => {
                        const isSecSelected = selectedSection === sec.id && selectedWorkshop?.id !== COMBO_PASS.id;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => setSelectedSection(sec.id)}
                            className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                              isSecSelected
                                ? "bg-[#1C3325] text-white border-[#1C3325] shadow-xs"
                                : "bg-white text-[#1C3325] border-[#2D4A37]/15 hover:border-[#1C3325]/40 hover:bg-[#FAF8F5]"
                            }`}
                          >
                            <span className="text-xl">{sec.emoji}</span>
                            <span className="font-semibold text-[12px] leading-tight text-center">
                              {isKn ? sec.nameKn : sec.name}
                            </span>
                          </button>
                        );
                      })}

                      {/* Combo Pass Tab */}
                      <button
                        type="button"
                        onClick={() => setSelectedWorkshop(COMBO_PASS)}
                        className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          selectedWorkshop?.id === COMBO_PASS.id
                            ? "bg-[#1C3325] text-white border-[#1C3325] shadow-xs"
                            : "bg-white text-[#1C3325] border-[#2D4A37]/15 hover:border-[#1C3325]/40 hover:bg-[#FAF8F5]"
                        }`}
                      >
                        <span className="text-xl">🪷</span>
                        <span className="font-semibold text-[12px] leading-tight text-center">
                          {isKn ? "ಕಾಂಬೋ ಪಾಸ್" : "Combo Pass"}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Class Selection List */}
                  {selectedWorkshop?.id === COMBO_PASS.id ? (
                    /* Featured Combo Pass Details */
                    <div className="p-4 rounded-2xl bg-[#E8F3EE] border border-[#1C3325]/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#C26D38] text-white text-[10px] font-bold uppercase tracking-wide">
                          {m.bestValue}
                        </span>
                        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                          <span className="text-2xl font-bold text-[#1C3325]">₹{COMBO_PASS.price}</span>
                          <span className="text-[12px] text-[#5B635E] line-through">₹{COMBO_PASS.originalPrice}</span>
                        </div>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#1C3325]">
                        {isKn ? COMBO_PASS.titleKn : COMBO_PASS.title}
                      </h4>
                      <p className="text-[13px] text-[#5B635E] leading-relaxed">
                        {isKn ? COMBO_PASS.descriptionKn : COMBO_PASS.description}
                      </p>
                    </div>
                  ) : (
                    /* Classes for Selected Discipline */
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <label className="text-[12px] font-bold text-[#1C3325] uppercase tracking-wider">
                          2. {isKn ? "ತರಗತಿ ಆಯ್ಕೆಮಾಡಿ" : "Choose Class Offering"}
                        </label>
                        <span className="text-[11px] text-[#5B635E]">
                          {currentSectionWorkshops.length} options available
                        </span>
                      </div>

                      <div className="space-y-2">
                        {currentSectionWorkshops.map((w) => {
                          const isSelected = selectedWorkshop?.id === w.id;
                          return (
                            <div
                              key={w.id}
                              onClick={() => setSelectedWorkshop(w)}
                              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#E8F3EE] border-[#1C3325] ring-1 ring-[#1C3325] shadow-xs"
                                  : "bg-white border-[#2D4A37]/15 hover:border-[#1C3325]/40 hover:bg-[#FAF8F5]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div
                                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                      isSelected ? "border-[#1C3325] bg-[#1C3325]" : "border-neutral-300"
                                    }`}
                                  >
                                    {isSelected && <IconCheck className="w-3 h-3 text-white" />}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="font-bold text-[14px] text-[#1C3325]">
                                        {isKn ? w.titleKn : w.title}
                                      </span>
                                      {w.badge && (
                                        <span className="px-2 py-0.5 rounded-full bg-[#EDE8DE] text-[#1C3325] text-[10px] font-semibold shrink-0">
                                          {w.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[12px] text-[#5B635E] truncate">
                                      {isKn ? w.title : w.titleKn} · {w.duration}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right shrink-0 whitespace-nowrap">
                                  <span className="font-bold text-[15px] text-[#1C3325] block whitespace-nowrap">
                                    ₹{w.price}
                                  </span>
                                  {w.originalPrice > w.price && (
                                    <span className="text-[11px] text-[#5B635E] line-through block whitespace-nowrap">
                                      ₹{w.originalPrice}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Batch Slot Selection */}
                  <div className="space-y-2 pt-2 border-t border-[#2D4A37]/10">
                    <div className="flex items-center justify-between">
                      <label className="text-[12px] font-bold text-[#1C3325] uppercase tracking-wider">
                        3. {isKn ? "ಬ್ಯಾಚ್ ಸಮಯ ಆಯ್ಕೆಮಾಡಿ" : "Choose Batch Timing Slot"}
                      </label>
                      <span className="text-[11px] text-[#52796F] font-semibold">{m.allTimingsIst}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {(selectedWorkshop?.slots && selectedWorkshop.slots.length > 0
                        ? selectedWorkshop.slots
                        : BATCH_SLOTS
                      ).map((slot) => {
                        const isSlotSelected = selectedSlot?.id === slot.id || selectedSlot?.time === slot.time;
                        return (
                          <div
                            key={slot.id}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                              isSlotSelected
                                ? "bg-[#E8F3EE] border-[#1C3325] ring-1 ring-[#1C3325] shadow-xs"
                                : "bg-white border-[#2D4A37]/15 hover:border-[#1C3325]/40 hover:bg-[#FAF8F5]"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F]">
                                {isKn ? slot.label : slot.period}
                              </span>
                              <span className={`w-2 h-2 rounded-full ${isSlotSelected ? "bg-[#1C3325]" : "bg-green-600"}`} />
                            </div>
                            <span className="text-[13.5px] font-bold text-[#1C3325] block mt-1">
                              {slot.time}
                            </span>
                            <span className="text-[11px] text-[#5B635E] block mt-0.5">
                              {slot.spots || 5} {m.spotsLeft}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PARTICIPANT DETAILS & CHECKOUT */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  {/* Student Details Form */}
                  <div className="space-y-4 bg-white p-5 rounded-2xl border border-[#2D4A37]/10 shadow-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                      <h4 className="font-bold text-[#1C3325] text-[14px] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#1C3325]" />
                        <span>{m.studentDetails}</span>
                      </h4>
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-[12px] text-[#C26D38] font-bold hover:underline cursor-pointer"
                        type="button"
                      >
                        ← {m.changeProgram}
                      </button>
                    </div>

                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#1A1F1C] block">
                        {m.fullName}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleFieldChange("fullName", e.target.value)}
                        placeholder={m.fullNamePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#2D4A37]/15 text-[14px] text-[#1A1F1C] focus:outline-none focus:ring-2 focus:ring-[#1C3325]/30 focus:bg-white transition-all"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#1A1F1C] block">
                        {m.whatsappLabel}
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="px-3.5 py-2.5 rounded-xl bg-[#EDE8DE] text-[#1C3325] text-[13px] font-bold shrink-0">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={formData.phone}
                          onChange={(e) => handleFieldChange("phone", e.target.value)}
                          placeholder={m.whatsappPlaceholder}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#2D4A37]/15 text-[14px] text-[#1A1F1C] focus:outline-none focus:ring-2 focus:ring-[#1C3325]/30 focus:bg-white transition-all"
                        />
                      </div>
                      <p className="text-[11px] text-[#5B635E]">
                        {m.whatsappNote}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#1A1F1C] block">
                        {m.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        placeholder={m.emailPlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#2D4A37]/15 text-[14px] text-[#1A1F1C] focus:outline-none focus:ring-2 focus:ring-[#1C3325]/30 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Language Preference */}
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#1A1F1C] block">
                        {m.languagePref}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {["both", "kannada", "english"].map((pref) => (
                          <button
                            key={pref}
                            type="button"
                            onClick={() => handleFieldChange("languagePref", pref)}
                            className={`py-2 rounded-xl text-[12px] font-semibold border transition-all cursor-pointer ${
                              formData.languagePref === pref
                                ? "bg-[#1C3325] text-white border-[#1C3325] shadow-xs"
                                : "bg-[#FAF8F5] text-[#5B635E] border-neutral-200 hover:bg-white"
                            }`}
                          >
                            {pref === "both" ? "ಕನ್ನಡ + EN" : pref === "kannada" ? "ಕನ್ನಡ" : "English"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience Notes */}
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-[#1A1F1C] block">
                        {m.experienceLabel}
                      </label>
                      <select
                        value={formData.healthNotes}
                        onChange={(e) => handleFieldChange("healthNotes", e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#2D4A37]/15 text-[13px] text-[#1A1F1C] focus:outline-none focus:ring-2 focus:ring-[#1C3325]/30 focus:bg-white transition-all cursor-pointer"
                      >
                        <option value="beginner">{m.expBeginner}</option>
                        <option value="intermediate">{m.expIntermediate}</option>
                        <option value="back_pain">{m.expBackPain}</option>
                        <option value="prenatal">{m.expPrenatal}</option>
                        <option value="stress_sleep">{m.expStress}</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Summary Box */}
                  <div className="bg-white p-5 rounded-2xl border border-[#2D4A37]/15 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between pb-1.5 border-b border-neutral-100">
                      <span className="text-[13px] font-bold text-[#1C3325]">
                        {m.orderSummary}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#EDE8DE] text-[#1C3325] text-[10px] font-semibold">
                        {m.batchMonth}
                      </span>
                    </div>

                    <div className="space-y-2 text-[13px]">
                      <div className="flex justify-between">
                        <span className="text-[#5B635E]">
                          {isKn && selectedWorkshop?.titleKn ? selectedWorkshop.titleKn : selectedWorkshop?.title}
                        </span>
                        <span className="font-bold text-[#1C3325] whitespace-nowrap">₹{selectedWorkshop?.price}</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#5B635E]">{m.selectedBatch}</span>
                        <span className="text-[#1C3325] font-medium">
                          {isKn && selectedSlot?.label ? selectedSlot.label : selectedSlot?.time}
                        </span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#5B635E]">{m.zoomReplays}</span>
                        <span className="text-[#2D4A37] font-semibold">{m.included}</span>
                      </div>
                      <div className="flex justify-between text-[12px]">
                        <span className="text-[#5B635E]">{m.whatsappCohort}</span>
                        <span className="text-[#2D4A37] font-semibold">{m.lifetimeAccess}</span>
                      </div>
                    </div>
                    <div className="pt-2.5 border-t border-neutral-100 flex items-baseline justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#1C3325] text-[15px]">{m.totalDue}</span>
                        <span className="text-[11px] text-[#5B635E]">{m.taxesIncluded}</span>
                      </div>
                      <div className="flex items-baseline gap-1 whitespace-nowrap">
                        <span className="font-sans text-2xl font-extrabold text-[#1C3325] whitespace-nowrap tabular-nums tracking-tight">
                          ₹{selectedWorkshop?.price}
                        </span>
                        <span className="text-[11px] text-[#5B635E] font-medium">INR</span>
                      </div>
                    </div>
                  </div>

                  {/* User Consent & Privacy Terms Checkbox */}
                  <div className="p-3.5 rounded-2xl bg-[#EDE8DE]/60 border border-[#2D4A37]/15">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={Boolean(formData.consentGiven)}
                        onChange={(e) => handleFieldChange("consentGiven", e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-[#1C3325] focus:ring-[#1C3325] border-neutral-300 accent-[#1C3325] cursor-pointer"
                      />
                      <div className="text-[12px] text-[#2D4A37] leading-relaxed">
                        <span className="font-semibold">{m.consentText}</span>
                        {!formData.consentGiven && (
                          <span className="block text-[11px] text-[#C26D38] font-medium mt-0.5">
                            * {m.consentRequired}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#5B635E]">
                    <div className="p-2.5 rounded-xl bg-white border border-[#2D4A37]/10 flex flex-col items-center justify-center gap-0.5">
                      <IconShield className="w-4 h-4 text-[#1C3325]" />
                      <span className="font-bold text-[#1C3325]">{m.secureBadge}</span>
                      <span className="text-[9px] text-[#5B635E]">{m.secureSub}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#2D4A37]/10 flex flex-col items-center justify-center gap-0.5">
                      <IconClock className="w-4 h-4 text-[#1C3325]" />
                      <span className="font-bold text-[#1C3325]">{m.replayBadge}</span>
                      <span className="text-[9px] text-[#5B635E]">{m.replaySub}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#2D4A37]/10 flex flex-col items-center justify-center gap-0.5">
                      <IconLotus className="w-4 h-4 text-[#1C3325]" />
                      <span className="font-bold text-[#1C3325]">{m.lineageBadge}</span>
                      <span className="text-[9px] text-[#5B635E]">{m.lineageSub}</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* STICKY BOTTOM ACTION BAR (Never scrolls off-screen!) */}
        {!bookingSuccess && (
          <div className="p-4 px-6 bg-white/95 backdrop-blur-md border-t border-[#2D4A37]/10 shrink-0">
            {currentStep === 1 ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Summary Pill on Left */}
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
                  <div className="text-left">
                    <p className="text-[13px] font-bold text-[#1C3325] truncate max-w-[240px]">
                      {isKn ? selectedWorkshop?.titleKn : selectedWorkshop?.title}
                    </p>
                    <p className="text-[11px] text-[#52796F] font-medium">
                      {selectedSlot?.time}
                    </p>
                  </div>
                  <span className="text-xl font-sans font-bold text-[#1C3325] whitespace-nowrap tabular-nums">
                    ₹{selectedWorkshop?.price}
                  </span>
                </div>

                {/* Continue CTA on Right */}
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#1C3325] text-white font-semibold text-[14px] shadow-sm hover:bg-[#2D4A37] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  type="button"
                >
                  <span>{m.continueToDetails}</span>
                  <IconArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={completeBooking}
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3.5 rounded-full font-bold text-[15px] shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFormValid && !isSubmitting
                      ? "bg-[#1C3325] text-white hover:bg-[#2D4A37] active:scale-98"
                      : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  }`}
                  type="button"
                >
                  <IconLock className="w-4 h-4" />
                  <span>
                    {isSubmitting ? m.submittingText : m.payButtonText}
                  </span>
                </button>

                {/* Direct WhatsApp Alternative */}
                <a
                  href={`https://wa.me/917676405895?text=Namaskara%20Shashirekha%2C%20I%20want%20to%20register%20for%20${encodeURIComponent(selectedWorkshop?.title)}%20and%20need%20UPI%20assistance.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-full text-[#1C3325] text-[12px] font-medium flex items-center justify-center gap-1.5 hover:underline"
                >
                  <IconWhatsApp className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{m.whatsappDirect}</span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
