import { useQuery } from "@tanstack/react-query";
import { getWorkshops, getSections, getProducts, getBatches } from "../services/api";
import { ASSETS } from "../assets";

/**
 * Authentic Shashirekha yoga images and framing configs
 */
const WORKSHOP_IMAGE_MAP = {
  // 8 Batches from the new poster
  "hatha-yoga": {
    image: ASSETS.poseAdiyogiSplitPrayer,
    objectPosition: "center 88%"
  },
  "kids-yoga": {
    image: ASSETS.poseHimalayaPeakClimb,
    objectPosition: "center 60%"
  },
  "ashtanga-strength": {
    image: ASSETS.poseBeachSplit,
    objectPosition: "center 75%"
  },
  "ladies-batch": {
    image: ASSETS.poseTempleMeditation,
    objectPosition: "center 78%"
  },
  "ashtanga-strength-intensive": {
    image: ASSETS.poseHeadstandSirsasana,
    objectPosition: "center 70%"
  },
  "carnatic-music": {
    image: ASSETS.studioGuitarsNeon,
    objectPosition: "center center"
  },
  "light-music": {
    image: ASSETS.studioGuitarsNeon,
    objectPosition: "center center"
  },
  "postpartum-wellness": {
    image: ASSETS.studioWallPilates,
    objectPosition: "center 65%"
  },
  "combo-pass": {
    image: ASSETS.onlineClassesPoster || ASSETS.poseAdiyogiGraceStanding,
    objectPosition: "center top"
  },

  // Legacy mappings for backward compatibility
  "strength-training": {
    image: ASSETS.poseBeachSplit,
    objectPosition: "center 75%"
  },
  "ladies-yoga": {
    image: ASSETS.poseTempleMeditation,
    objectPosition: "center 78%"
  },
  "ashtanga-yoga": {
    image: ASSETS.poseAdiyogiSplitPrayer,
    objectPosition: "center 88%"
  },
  "21day": {
    image: ASSETS.challenge21DayPoster,
    objectPosition: "center top"
  },
  "sushii-nights": {
    image: ASSETS.studioGuitarsNeon,
    objectPosition: "center center"
  }
};

/**
 * Custom hook to fetch workshops directly from backend MongoDB database
 */
export const useWorkshopsQuery = (category = "all") => {
  return useQuery({
    queryKey: ["workshops", category],
    queryFn: async () => {
      const response = await getWorkshops(category);
      const list = response?.data || response;
      if (Array.isArray(list)) {
        return list.map((item) => {
          const assetConfig = WORKSHOP_IMAGE_MAP[item.slug] || WORKSHOP_IMAGE_MAP[item.category];
          const resolvedImage = assetConfig?.image || item.image || ASSETS.poseAdiyogiNatarajasana;
          const resolvedPosition = assetConfig?.objectPosition || item.objectPosition || "center";

          return {
            id: item.slug || item._id,
            _id: item._id,
            slug: item.slug,
            order: item.order ?? 99,
            section: item.section || "yoga",
            sectionLabel: item.sectionLabel || (item.section === "music" ? "Music & Sound" : item.section === "other" ? "Other Activities" : "Yoga"),
            sectionLabelKn: item.sectionLabelKn || (item.section === "music" ? "ಸಂಗೀತ ಮತ್ತು ನಾದ" : item.section === "other" ? "ಇತರ ಚಟುವಟಿಕೆಗಳು" : "ಯೋಗ"),
            title: item.title,
            titleKn: item.titleKn,
            category: item.category,
            categoryLabel: item.categoryLabel,
            batchSchedule: item.batchSchedule || item.categoryLabel,
            description: item.description,
            descriptionKn: item.descriptionKn,
            price: item.price,
            originalPrice: item.originalPrice,
            duration: item.duration,
            timingSlot: item.timingSlot,
            timingIcon: item.timingIcon || "alarm",
            badge: item.badge,
            image: resolvedImage,
            objectPosition: resolvedPosition,
            features: item.features || [],
            spotsLeft: item.spotsLeft ?? 0,
            slots: item.slots || []
          };
        }).sort((a, b) => (a.order || 0) - (b.order || 0));
      }
      return [];
    }
  });
};

/**
 * Custom hook to fetch dynamic sections collection directly from backend database
 */
export const useSectionsQuery = () => {
  return useQuery({
    queryKey: ["sections"],
    queryFn: async () => {
      const response = await getSections();
      const list = response?.data || response;
      if (Array.isArray(list)) {
        return list.map((s) => ({
          id: s.slug || s._id,
          _id: s._id,
          slug: s.slug,
          key: s.slug || s._id,
          name: s.name,
          nameKn: s.nameKn,
          icon: s.icon || "spa",
          emoji: "",
          tagline: s.tagline || "",
          taglineKn: s.taglineKn || "",
          badge: s.badge || "",
          badgeKn: s.badgeKn || "",
          accentColor: s.accentColor || "#1C3325",
          lightBg: s.lightBg || "bg-[#F4F8F5]",
          borderCol: s.borderCol || "border-[#1C3325]/15",
        }));
      }
      return [];
    }
  });
};

const PRODUCT_IMAGE_MAP = {
  "cotton-mat": ASSETS.mysuruCottonMat,
  "progrip-mat": ASSETS.progripRubberMat,
  "cork-props-kit": ASSETS.corkPropsKit,
  "/src/assets/mysuru_organic_cotton_mat.jpg": ASSETS.mysuruCottonMat,
  "/src/assets/progrip_rubber_yoga_mat.jpg": ASSETS.progripRubberMat,
  "/src/assets/cork_yoga_blocks_strap_set.jpg": ASSETS.corkPropsKit,
};

/**
 * Custom hook to fetch store products directly from backend database
 */
export const useProductsQuery = (category = "all") => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const response = await getProducts(category);
      const list = response?.data || response;
      if (Array.isArray(list)) {
        return list.map((item) => ({
          ...item,
          image:
            PRODUCT_IMAGE_MAP[item.image] ||
            PRODUCT_IMAGE_MAP[item.slug] ||
            item.image,
        }));
      }
      return [];
    }
  });
};

/**
 * Custom hook to fetch batch schedules directly from backend database
 */
export const useBatchesQuery = (workshopId = "") => {
  return useQuery({
    queryKey: ["batches", workshopId],
    queryFn: async () => {
      const response = await getBatches(workshopId);
      const list = response?.data || response;
      return Array.isArray(list) ? list : [];
    }
  });
};
