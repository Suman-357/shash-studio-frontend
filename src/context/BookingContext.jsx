import React, { createContext, useContext, useState, useEffect } from "react";
import { submitRegistration } from "../services/api";
import { useWorkshopsQuery, useSectionsQuery, useBatchesQuery } from "../hooks/useWorkshopsQuery";
import { useRazorpay } from "../hooks/useRazorpay";

const BookingContext = createContext();

// Helper to resolve dynamic database batches for any workshop
const getSlotsForWorkshop = (workshop, allBatches = []) => {
  if (!workshop) return [];

  const wId = workshop._id ? String(workshop._id) : null;
  const wSlug = workshop.slug || workshop.id;

  const matchingBatches = allBatches.filter((b) => {
    const bWorkshopId = b.workshopId?._id ? String(b.workshopId._id) : String(b.workshopId || "");
    const bSlug = b.workshopId?.slug || b.workshopSlug;
    return (
      (wId && bWorkshopId === wId) ||
      (wSlug && bSlug === wSlug)
    );
  });

  if (matchingBatches.length > 0) {
    return matchingBatches.map((b) => ({
      id: b._id || b.batchCode,
      batchId: b._id,
      batchCode: b.batchCode,
      time: b.slotTime,
      label: b.title,
      labelKn: b.titleKn,
      period: b.slotTime.includes("AM") ? "Morning" : b.slotTime.includes("PM") ? "Evening" : "Batch",
      spots: b.spotsAvailable ?? Math.max(0, (b.capacity || 20) - (b.enrolledCount || 0))
    }));
  }

  // If workshop has its own timingSlot defined in database
  if (workshop.timingSlot) {
    return [
      {
        id: "timing-slot",
        time: workshop.timingSlot,
        label: workshop.batchSchedule || workshop.title,
        labelKn: workshop.titleKn,
        period: workshop.timingSlot.includes("AM") ? "Morning" : "Evening",
        spots: workshop.spotsLeft ?? 5
      }
    ];
  }

  return [];
};

export const BookingProvider = ({ children }) => {
  const { pay: launchRazorpay } = useRazorpay();
  const { data: workshops = [] } = useWorkshopsQuery("all");
  const { data: sections = [] } = useSectionsQuery();
  const { data: batches = [] } = useBatchesQuery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("yoga");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  // Sync default workshop once workshops load from database
  useEffect(() => {
    if (!selectedWorkshop && workshops.length > 0) {
      const initial = workshops[0];
      setSelectedWorkshop(initial);
    }
  }, [workshops, selectedWorkshop]);

  // Sync active slot when selectedWorkshop or batches update
  useEffect(() => {
    if (selectedWorkshop) {
      const slots = getSlotsForWorkshop(selectedWorkshop, batches);
      if (slots.length > 0) {
        const stillValid = slots.find((s) => s.id === selectedSlot?.id || s.time === selectedSlot?.time);
        if (!stillValid) {
          setSelectedSlot(slots[0]);
        }
      } else {
        setSelectedSlot(null);
      }
    } else {
      setSelectedSlot(null);
    }
  }, [selectedWorkshop, batches]);

  // Form fields
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    languagePref: "both",
    healthNotes: "beginner",
    consentGiven: false
  });

  const selectSection = (sectionId) => {
    setSelectedSection(sectionId);
    const matching = workshops.filter((w) => w.section === sectionId);
    if (matching.length > 0) {
      const nextWorkshop = matching[0];
      setSelectedWorkshop(nextWorkshop);
      const slots = getSlotsForWorkshop(nextWorkshop, batches);
      setSelectedSlot(slots[0] || null);
    } else {
      setSelectedWorkshop(null);
      setSelectedSlot(null);
    }
  };

  const selectComboPass = (comboPassObj) => {
    setSelectedSection("combo");
    setSelectedWorkshop(comboPassObj);
    const slots = getSlotsForWorkshop(comboPassObj, batches);
    setSelectedSlot(slots[0] || null);
  };

  const selectWorkshop = (workshop) => {
    setSelectedWorkshop(workshop);
    if (workshop?.section) {
      setSelectedSection(workshop.section);
    }
    const slots = getSlotsForWorkshop(workshop, batches);
    setSelectedSlot(slots[0] || null);
  };

  const selectSlot = (slot) => {
    setSelectedSlot(slot);
  };

  const openBookingModal = (workshopId = null, sectionId = null) => {
    setBookingError(null);
    setBookingSuccess(null);

    const aliasMap = {
      combo: "combo-pass",
      sushii_nights: "sushii-nights",
      ladies: "ladies-yoga",
      strength: "strength-training",
      kids: "kids-yoga",
      ashtanga: "ashtanga-yoga",
    };
    const targetId = aliasMap[workshopId] || workshopId;

    if (workshopId === "combo" || targetId === "combo-pass") {
      const combo = workshops.find(
        (w) => w.slug === "combo-pass" || w.id === "combo-pass" || w.slug === "combo"
      ) || workshops[0];
      if (combo) {
        setSelectedSection(combo.section || "yoga");
        setSelectedWorkshop(combo);
        const slots = getSlotsForWorkshop(combo, batches);
        setSelectedSlot(slots[0] || null);
      }
    } else if (workshopId) {
      const found = workshops.find(
        (w) =>
          w.id === targetId ||
          w.slug === targetId ||
          w.id === workshopId ||
          w.slug === workshopId ||
          w.title === workshopId
      );
      if (found) {
        setSelectedSection(found.section || "yoga");
        setSelectedWorkshop(found);
        const slots = getSlotsForWorkshop(found, batches);
        setSelectedSlot(slots[0] || null);
      }
    } else if (sectionId) {
      selectSection(sectionId);
    } else if (workshops.length > 0) {
      selectSection(workshops[0].section || "yoga");
    }
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsModalOpen(false);
    setBookingError(null);
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const availableSlots = getSlotsForWorkshop(selectedWorkshop, batches);

  const completeBooking = async () => {
    if (!selectedWorkshop) return;
    setIsSubmitting(true);
    setBookingError(null);
    try {
      const rawSlug = selectedWorkshop.slug || selectedWorkshop.id || selectedWorkshop._id;
      const normalizedSlug = rawSlug === "combo" ? "combo-pass" : rawSlug;

      const currentSlotString =
        selectedSlot?.time ||
        selectedSlot?.label ||
        selectedWorkshop.timingSlot ||
        "Mysuru Shala Live Batch";

      const payload = {
        fullName: formData.fullName,
        whatsapp: formData.phone,
        email: formData.email,
        workshopId: normalizedSlug,
        workshopTitle: selectedWorkshop.title,
        slot: currentSlotString,
        amount: selectedWorkshop.price,
        languagePref: formData.languagePref,
        healthNotes: formData.healthNotes,
        consentGiven: formData.consentGiven,
        paymentMethod: "razorpay"
      };

      const result = await submitRegistration(payload);
      const bookingData = result?.data;
      if (!bookingData) {
        throw new Error(result?.message || "Registration failed. Please try again.");
      }

      // Launch Razorpay checkout popup
      await launchRazorpay({
        type: "workshop",
        workshopId: normalizedSlug,
        bookingId: bookingData.bookingId,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        description: `${selectedWorkshop.title} — ${currentSlotString}`,
        onSuccess: (verifiedData) => {
          setIsSubmitting(false);
          setBookingSuccess({
            ...bookingData,
            paymentStatus: "completed",
            razorpayPaymentId: verifiedData.razorpay_payment_id || verifiedData.paymentId,
            razorpayOrderId: verifiedData.razorpay_order_id,
          });
        },
        onFailure: (err) => {
          setIsSubmitting(false);
          if (err?.cancelled) {
            setBookingError("Payment was cancelled. You can retry whenever you're ready.");
          } else {
            setBookingError(err?.message || "Payment could not be completed. Please try again.");
          }
        }
      });
    } catch (err) {
      console.error("Booking & payment error:", err.message || err);
      setIsSubmitting(false);
      setBookingError(err.message || "Failed to initiate payment. Please check your network and try again.");
    }
  };

  return (
    <BookingContext.Provider
      value={{
        isModalOpen,
        openBookingModal,
        closeBookingModal,
        selectedSection,
        setSelectedSection: selectSection,
        selectedWorkshop,
        setSelectedWorkshop: selectWorkshop,
        selectComboPass,
        selectedSlot,
        setSelectedSlot: selectSlot,
        currentStep,
        setCurrentStep,
        formData,
        handleFieldChange,
        isSubmitting,
        bookingSuccess,
        bookingError,
        completeBooking,
        workshops,
        sections,
        batches,
        availableSlots
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
