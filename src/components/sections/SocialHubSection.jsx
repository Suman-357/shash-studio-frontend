import React from "react";
import { INSTAGRAM_POSTS, YOUTUBE_VIDEOS } from "../../data/social";
import { useLanguage } from "../../context/LanguageContext";

export const SocialHubSection = () => {
  const { lang, t } = useLanguage();

  return (
    <section id="social-hub" className="w-full py-8 sm:py-12 bg-[#F6F3ED]/50">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-12">
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[12px] font-bold text-[#2D4A37] uppercase tracking-[0.2em] block mb-1">
              {t("socialTag")}
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#1C3325] tracking-tight">
              {t("socialTitle")}
            </h2>
          </div>
          <p className="text-[14px] text-[#5B635E] max-w-md">
            {t("socialDesc")}
          </p>
        </div>

        {/* Two-Column Editorial Media Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Instagram Feed */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-[#D48C46]/15 text-[#D48C46]">
                  <span className="material-symbols-outlined text-[22px]">photo_camera</span>
                </span>
                <div>
                  <h3 className="font-sans text-xl font-bold text-[#1C3325]">
                    {t("instaTitle")}
                  </h3>
                  <p className="text-[12px] text-[#5B635E]">
                    {t("instaSub")}
                  </p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/sushiidays/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[13px] font-semibold text-[#2D4A37] hover:text-[#1C3325]"
              >
                <span>Profile</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>

            {/* 4 Instagram Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INSTAGRAM_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-200">
                    <img
                      src={post.image}
                      alt="Mysuru Yoga Moment"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-[#FDFBF7]/90 backdrop-blur-sm flex items-center gap-1 text-[11px] font-bold text-[#1C3325]">
                      <span className="material-symbols-outlined text-[13px] text-red-500 fill-current">
                        favorite
                      </span>
                      <span>{post.likes}</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#1A1F1C] leading-snug">
                    {lang === "kn" ? post.captionKn : post.caption}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="https://www.instagram.com/sushiidays/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#F0EEE8] text-[#1C3325] font-semibold text-[14px] hover:bg-[#EDE8DE] transition-colors flex items-center justify-center gap-2"
            >
              <span>View Instagram Profile</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          {/* Right: YouTube Hub */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-red-100 text-red-600">
                  <span className="material-symbols-outlined text-[22px]">smart_display</span>
                </span>
                <div>
                  <h3 className="font-sans text-xl font-bold text-[#1C3325]">
                    {t("youtubeTitle")}
                  </h3>
                  <p className="text-[12px] text-[#5B635E]">
                    {t("youtubeSub")}
                  </p>
                </div>
              </div>
              <a
                href="https://www.youtube.com/@sushiidays"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 text-[13px] font-semibold text-red-600 hover:underline"
              >
                <span>Channel</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>

            {/* YouTube Featured Video Cards */}
            <div className="space-y-3.5">
              {YOUTUBE_VIDEOS.map((vid) => (
                <a
                  key={vid.id}
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 p-3 rounded-2xl bg-[#FDFBF7] border border-[#2D4A37]/10 shadow-xs hover:shadow-md transition-all"
                >
                  <div className="relative w-32 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-200">
                    <img
                      src={vid.image}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#1C3325]/20 flex items-center justify-center group-hover:bg-[#1C3325]/40 transition-colors">
                      <span className="w-8 h-8 rounded-full bg-[#FDFBF7]/90 flex items-center justify-center text-[#1C3325] shadow-xs">
                        <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      </span>
                    </div>
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-white font-mono font-medium">
                      {vid.duration}
                    </span>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h4 className="font-sans text-[15px] font-bold text-[#1C3325] group-hover:text-[#D48C46] transition-colors line-clamp-1">
                      {lang === "kn" ? vid.titleKn : vid.title}
                    </h4>
                    <p className="text-[12px] text-[#5B635E]">
                      {vid.duration} • {vid.views} • <span className="text-[#2D4A37] font-semibold">{lang === "kn" ? vid.tagKn : vid.tag}</span>
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <a
              href="https://www.youtube.com/@sushiidays"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full bg-[#1C3325] text-white font-semibold text-[14px] hover:bg-[#2D4A37] transition-colors flex items-center justify-center gap-2"
            >
              <span>Subscribe on YouTube</span>
              <span className="material-symbols-outlined text-[16px]">smart_display</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
