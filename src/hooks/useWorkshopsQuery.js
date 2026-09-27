import { useQuery } from "@tanstack/react-query";
import { getWorkshops } from "../services/api";
import { WORKSHOPS, SECTIONS } from "../data/workshops";

/**
 * Custom hook to fetch workshops using TanStack Query
 * Includes automatic cache management and seamless offline fallback to seed data
 */
export const useWorkshopsQuery = (category = "all") => {
  return useQuery({
    queryKey: ["workshops", category],
    queryFn: async () => {
      try {
        const response = await getWorkshops(category);
        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
          return response.data.map((item) => ({
            id: item.slug || item._id,
            section: item.section || "yoga",
            sectionLabel: item.sectionLabel || (item.section === "music" ? "Music & Sound" : item.section === "other" ? "Other Activities" : "Yoga"),
            sectionLabelKn: item.sectionLabelKn || (item.section === "music" ? "ಸಂಗೀತ ಮತ್ತು ನಾದ" : item.section === "other" ? "ಇತರ ಚಟುವಟಿಕೆಗಳು" : "ಯೋಗ"),
            title: item.title,
            titleKn: item.titleKn,
            category: item.category,
            categoryLabel: item.categoryLabel,
            description: item.description,
            descriptionKn: item.descriptionKn,
            price: item.price,
            originalPrice: item.originalPrice,
            duration: item.duration,
            timingSlot: item.timingSlot,
            timingIcon: item.timingIcon || "alarm",
            badge: item.badge,
            image: item.image,
            features: item.features || [],
            spotsLeft: item.spotsLeft ?? 5,
          }));
        }
        return WORKSHOPS;
      } catch (err) {
        // Backend offline / disconnected: fallback to curated local seed data
        console.warn("Backend API offline, serving cached Mysore workshop catalog:", err.message);
        return WORKSHOPS;
      }
    },
    initialData: WORKSHOPS,
  });
};

/**
 * Custom hook to fetch dynamic sections collection from backend
 */
export const useSectionsQuery = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/v1/sections");
        if (response.ok) {
          const resJson = await response.json();
          if (Array.isArray(resJson.data) && resJson.data.length > 0) {
            return resJson.data.map((s) => ({
              id: s.slug || s._id,
              key: s.slug || s._id,
              name: s.name,
              nameKn: s.nameKn,
              icon: s.icon || "spa",
              emoji: s.emoji || "✨",
              tagline: s.tagline || "",
              taglineKn: s.taglineKn || "",
              badge: s.badge || "",
              badgeKn: s.badgeKn || "",
              accentColor: s.accentColor || "#1C3325",
              lightBg: s.lightBg || "bg-[#F4F8F5]",
              borderCol: s.borderCol || "border-[#1C3325]/15",
            }));
          }
        }
      } catch (err) {
        console.warn("Backend sections offline, serving default SECTIONS:", err.message);
      }
      return SECTIONS;
    },
    initialData: SECTIONS,
  });
};

