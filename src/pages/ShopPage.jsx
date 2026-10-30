import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useProductsQuery } from "../hooks/useWorkshopsQuery";
import { useLanguage } from "../context/LanguageContext";
import { ProductDetailModal } from "../components/products/ProductDetailModal";
import { ArrowRight, Filter, Home, ChevronDown, Eye, Leaf, Star, Check, X } from "lucide-react";

export const ShopPage = ({ onBuyProduct }) => {
  const { lang } = useLanguage();
  const isKn = lang === "kn";
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState("all");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedDetailMat, setSelectedDetailMat] = useState(null);
  const { data: productsList = [] } = useProductsQuery();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const productParam = searchParams.get("product");
    if (productParam) {
      const found = productsList.find((p) => p.slug === productParam);
      if (found) setSelectedDetailMat(found);
    }
  }, [searchParams, productsList]);

  const filteredProducts =
    filter === "cotton"
      ? productsList.filter((p) => p.slug === "cotton-mat")
      : filter === "progrip"
      ? productsList.filter((p) => p.slug === "progrip-mat")
      : filter === "props"
      ? productsList.filter((p) => p.slug === "cork-props-kit")
      : productsList;

  const matFaqs = [
    {
      q: "How do I clean and wash the Handloom Organic Cotton Mat?",
      qKn: "ಕೈಮಗ್ಗದ ಹತ್ತಿ ಯೋಗ ಚಾಪೆಯನ್ನು ಹೇಗೆ ಸ್ವಚ್ಛಗೊಳಿಸುವುದು?",
      a: "Our organic cotton mats can be hand-washed in cold water with mild eco-detergent or machine-washed on a gentle cycle. Hang dry in shade. Avoid tumble drying or direct harsh sunlight to preserve the natural tree-rubber ribbed backing.",
      aKn: "ನೈಸರ್ಗಿಕ ಹತ್ತಿ ಚಾಪೆಯನ್ನು ತಣ್ಣೀರಿನಲ್ಲಿ ಮೃದುವಾದ ಮಾರ್ಜಕ ಬಳಸಿ ತೊಳೆಯಬಹುದು. ನೆರಳಿನಲ್ಲಿ ಒಣಗಿಸುವುದು ಉತ್ತಮ."
    },
    {
      q: "What makes the Pro-Grip Alignment Mat special for asanas?",
      qKn: "ಪ್ರೊ-ಗ್ರಿಪ್ ಯೋಗ ಚಾಪೆಯ ವಿಶೇಷತೆ ಏನು?",
      a: "The laser-etched lines serve as a non-distracting navigation grid. The central line balances symmetry, while the 45-degree angle marks help position your feet in Warrior and Triangle poses without straining knees or hips.",
      aKn: "ಲೇಸರ್ ಕೆತ್ತನೆಯ ರೇಖೆಗಳು ಸರಿಯಾದ ಭಂಗಿ ಮತ್ತು ಸಮತೋಲನಕ್ಕೆ ನೆರವಾಗುತ್ತವೆ. ಯಾವುದೇ ಬೆವರಿನಲ್ಲೂ ಜಾರದ ಗರಿಷ್ಠ ಹಿಡಿತ ನೀಡುತ್ತದೆ."
    },
    {
      q: "How long does shipping take across India?",
      qKn: "ಭಾರತದಾದ್ಯಂತ ಡೆಲಿವರಿ ಸಮಯ ಎಷ್ಟು?",
      a: "All orders are dispatched from our Mysuru Shala dispatch center within 24 hours. Transit takes 2–4 business days via Bluedart / India Post Speed Post. Delivery is 100% free with tracking link sent on WhatsApp.",
      aKn: "ಆರ್ಡರ್ ಮಾಡಿದ ೨೪ ಗಂಟೆಗಳಲ್ಲಿ ಮೈಸೂರಿನಿಂದ ರವಾನಿಸಲಾಗುತ್ತದೆ. ೨ ರಿಂದ ೪ ದಿನಗಳಲ್ಲಿ ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ ತಲುಪುತ್ತದೆ."
    }
  ];

  return (
    <div className="w-full bg-[#FCF9F3] text-[#1A1F1C]">
      {/* Sleek, Compact Shop Header Bar (No bulky banner, No tabs) */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2D4A37]/10">
          <div>
            <div className="flex items-center gap-2 text-[12px] text-[#5B635E] mb-1">
              <Link to="/" className="hover:text-[#1C3325] transition-colors flex items-center gap-1 font-medium">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-[#1C3325] font-semibold">Shop</span>
              <span>/</span>
              <span className="text-[#C26D38] font-bold">Studio Props &amp; Mats</span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-[#1C3325] tracking-tight">
                {isKn ? "ಪರಿಕರ & ಯೋಗ ಚಾಪೆಗಳ ಮಳಿಗೆ" : "Studio Equipment & Mats"}
              </h1>
              <span className="text-[13px] font-medium text-[#5B635E]">
                ({filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"})
              </span>
            </div>
          </div>

          {/* Right Action: Clean Modern Filter Button with Popover */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-[13px] font-semibold transition-all cursor-pointer shadow-xs ${
                  filter !== "all"
                    ? "bg-[#1C3325] text-white border-[#1C3325]"
                    : "bg-white text-[#1C3325] border-[#2D4A37]/15 hover:border-[#1C3325] hover:bg-[#FDFBF7]"
                }`}
              >
                <Filter className={`w-3.5 h-3.5 ${filter !== "all" ? "text-white" : "text-[#2D4A37]"}`} />
                <span>
                  {filter === "all"
                    ? (isKn ? "ಫಿಲ್ಟರ್ ಮಾಡಿ (Filter)" : "Filter")
                    : filter === "cotton"
                    ? "Organic Cotton"
                    : filter === "progrip"
                    ? "Pro-Grip Rubber"
                    : "Cork Props Duo"}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${filterMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {filter !== "all" && (
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className="px-2.5 py-1.5 rounded-lg bg-[#EDE8DE] hover:bg-[#DCDAD4] text-[11.5px] font-semibold text-[#1C3325] transition-colors cursor-pointer"
                  title="Clear filter"
                >
                  <span className="flex items-center gap-1">Clear <X className="w-3 h-3" /></span>
                </button>
              )}
            </div>

            {/* Dropdown Menu */}
            {filterMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setFilterMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white border border-[#2D4A37]/15 shadow-xl p-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#5B635E] uppercase tracking-wider border-b border-neutral-100">
                    Filter by Product Category
                  </div>
                  <div className="space-y-1 pt-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setFilter("all");
                        setFilterMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer ${
                        filter === "all" ? "bg-[#EDE8DE] text-[#1C3325] font-bold" : "text-[#5B635E] hover:bg-neutral-50 hover:text-[#1C3325]"
                      }`}
                    >
                      <span>All Products</span>
                      <span className="text-[11px] text-[#5B635E] font-mono">({productsList.length})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFilter("cotton");
                        setFilterMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer ${
                        filter === "cotton" ? "bg-[#EDE8DE] text-[#1C3325] font-bold" : "text-[#5B635E] hover:bg-neutral-50 hover:text-[#1C3325]"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>Organic Cotton &amp; Jute</span>
                        <span className="text-[11px] text-[#5B635E]">₹1,499 • Handloom</span>
                      </div>
                      {filter === "cotton" && <Check className="w-4 h-4 text-[#0E6848]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFilter("progrip");
                        setFilterMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer ${
                        filter === "progrip" ? "bg-[#EDE8DE] text-[#1C3325] font-bold" : "text-[#5B635E] hover:bg-neutral-50 hover:text-[#1C3325]"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>Pro-Grip Eco-Rubber</span>
                        <span className="text-[11px] text-[#5B635E]">₹2,199 • Alignment</span>
                      </div>
                      {filter === "progrip" && <Check className="w-4 h-4 text-[#0E6848]" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setFilter("props");
                        setFilterMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer ${
                        filter === "props" ? "bg-[#EDE8DE] text-[#1C3325] font-bold" : "text-[#5B635E] hover:bg-neutral-50 hover:text-[#1C3325]"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span>Cork Blocks &amp; Strap Duo</span>
                        <span className="text-[11px] text-[#5B635E]">₹899 • Alignment Kit</span>
                      </div>
                      {filter === "props" && <Check className="w-4 h-4 text-[#0E6848]" />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Micro-Bar for Delivery & Quality Assurances */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2.5 text-[12px] text-[#5B635E]">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-[#0E6848]" /> Free All-India Delivery (2–4 Days)</span>
            </span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <span className="hidden sm:flex items-center gap-1.5 font-medium">
              <span className="text-[#D48C46]">✦</span> Free Carrying Sling Included
            </span>
            <span className="hidden sm:inline text-neutral-300">•</span>
            <span className="hidden sm:flex items-center gap-1.5 font-medium">
              <span className="text-[#D48C46]">✦</span> 100% Biodegradable
            </span>
          </div>
          <span className="text-[11.5px] text-[#5B635E] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0E6848] animate-pulse" />
            Tap any mat for specs &amp; ordering
          </span>
        </div>
      </div>

      {/* Modern Compact E-Commerce Product Catalog Grid (Myntra / Flipkart Style) */}
      <section className="py-4 sm:py-6 max-w-[1280px] mx-auto px-4 md:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 max-w-[1240px] mx-auto">
            {filteredProducts.map((mat) => {
              const original = mat.originalPrice || mat.price;
              const savings = original - mat.price;
              const discountPercent = original > 0 ? Math.round((savings / original) * 100) : 0;

              return (
                <div
                  key={mat._id || mat.id || mat.slug}
                  onClick={() => setSelectedDetailMat(mat)}
                  className="group bg-[#FDFBF7] border border-[#2D4A37]/15 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-[#1C3325]/30 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Product Thumbnail with Badges */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-100">
                    <img
                      src={mat.image}
                      alt={mat.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Top Badge */}
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[10.5px] font-bold shadow-sm ${mat.badgeColor || "bg-[#1C3325]"}`}>
                      ✦ {isKn ? (mat.badgeKn || mat.badge) : mat.badge}
                    </span>

                    <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[11px] font-semibold backdrop-blur-xs flex items-center gap-1">
                      <Star className="w-3 h-3 text-[#FBBF24] fill-current" />
                      <span>{mat.rating || "4.9"}</span>
                      <span className="text-white/70">({mat.reviewsCount || 48})</span>
                    </span>

                    {/* Hover "Quick View" Overlay Indicator */}
                    <div className="absolute inset-0 bg-[#1C3325]/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-4 py-2 rounded-full bg-white text-[#1C3325] text-[12px] font-bold shadow-md flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>View Specs &amp; Details</span>
                      </span>
                    </div>
                  </div>

                  {/* Compact Product Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-[#C26D38] tracking-wider uppercase">
                          SHASH Studios
                        </span>
                        <span className="text-[#0E6848] font-bold bg-[#E3F5EE] px-2 py-0.5 rounded-full">
                          Free Delivery
                        </span>
                      </div>

                      <h3 className="font-sans text-base sm:text-lg font-bold text-[#1C3325] group-hover:text-[#2D4A37] transition-colors leading-snug line-clamp-1 tracking-tight">
                        {isKn ? (mat.titleKn || mat.title) : mat.title}
                      </h3>

                      <p className="text-[12px] text-[#5B635E] line-clamp-1">
                        {isKn ? (mat.subtitleKn || mat.subtitle) : mat.subtitle}
                      </p>

                      {/* Spec Chips (Compact) */}
                      {Array.isArray(mat.specs) && mat.specs.length > 0 && (
                        <div className="flex items-center gap-2 pt-1 flex-wrap text-[11px] text-[#5C665F]">
                          {mat.specs.slice(0, 2).map((spec, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-lg bg-[#F6F4ED] border border-[#2D4A37]/10 font-medium">
                              {spec.value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price & Action Row */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-sans text-2xl font-extrabold text-[#1C3325] tabular-nums tracking-tight">
                            ₹{mat.price}
                          </span>
                          {original > mat.price && (
                            <span className="text-[13px] text-[#5B635E] line-through font-sans tabular-nums">
                              ₹{original}
                            </span>
                          )}
                        </div>
                        {savings > 0 && (
                          <span className="text-[10.5px] font-bold text-[#945B09]">
                            {discountPercent}% OFF (Save ₹{savings})
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBuyProduct(mat);
                        }}
                        className="px-4 py-2 rounded-full bg-[#1C3325] text-white font-bold text-[12.5px] shadow-sm hover:bg-[#2D4A37] transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>Buy Now</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FDFBF7] border border-[#2D4A37]/15 text-center max-w-xl mx-auto space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#EDE8DE] flex items-center justify-center mx-auto text-[#2D4A37]">
              <Leaf className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-sans text-xl font-bold text-[#1C3325]">
                {isKn ? "ಪರಿಕರಗಳು ಶೀಘ್ರದಲ್ಲೇ ಲಭ್ಯವಾಗಲಿವೆ" : "No Products Found"}
              </h3>
              <p className="text-[14px] text-[#5B635E] leading-relaxed">
                {isKn
                  ? "ಈ ವಿಭಾಗದಲ್ಲಿ ಯಾವುದೇ ಪರಿಕರಗಳು ಸದ್ಯಕ್ಕೆ ಲಭ್ಯವಿಲ್ಲ. ಶೀಘ್ರದಲ್ಲೇ ಹೊಸ ಯೋಗ ಚಾಪೆಗಳನ್ನು ಸೇರಿಸಲಾಗುವುದು."
                  : "No products currently listed matching this filter. Handcrafted Mysuru mats and props are dispatched daily."}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Mat Care & FAQ Accordion Section */}
      <section className="py-10 max-w-[840px] mx-auto px-4 md:px-8 space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-[11.5px] font-bold text-[#2D4A37] uppercase tracking-[0.2em] block">
            Care &amp; Delivery Questions
          </span>
          <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C3325]">
            Mat Care &amp; Shipping FAQ
          </h3>
        </div>

        <div className="space-y-3">
          {matFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 shadow-xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-sans font-bold text-[15px] sm:text-base text-[#1C3325] hover:text-[#2D4A37] transition-colors"
                >
                  <span>{isKn ? faq.qKn : faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#2D4A37] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-[13.5px] text-[#5B635E] leading-relaxed border-t border-neutral-100">
                    <p className="pt-2">{isKn ? faq.aKn : faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Back to Home CTA */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#1C3325] hover:text-[#D48C46] transition-colors underline"
          >
            <span>← Return to Home Shala Classes &amp; Workshops</span>
          </Link>
        </div>
      </section>

      {/* Myntra / Flipkart Style Full Detail Modal */}
      <ProductDetailModal
        product={selectedDetailMat}
        isOpen={Boolean(selectedDetailMat)}
        onClose={() => setSelectedDetailMat(null)}
        onBuyNow={(mat) => {
          setSelectedDetailMat(null);
          onBuyProduct(mat);
        }}
      />
    </div>
  );
};
