import React, { useState, useRef } from "react";

/**
 * Mindful Soundscape Vignette Player
 * Provides calming ambient Mysore sanctuary sound (Tanpura drone / flute meditation)
 */
export const AudioPlayerDock = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.4);

  const tracks = [
    { title: "Mysuru Shala Tanpura Drone", titleKn: "ಮೈಸೂರು ತಂಬೂರಿ ಧ್ಯಾನ ಧ್ವನಿ", duration: "10:00" },
    { title: "Sushii Night Bedtime Flute", titleKn: "ಸುಶಿ ನೈಟ್ಸ್ ನಿದ್ರಾ ಕೊಳಲು ಗಾನ", duration: "15:00" },
    { title: "Nadi Shodhana Gentle Rhythm", titleKn: "ನಾಡಿ ಶೋಧನ ಉಸಿರಾಟದ ಲಯ", duration: "08:30" }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-xs md:max-w-sm">
      <div className="flex items-center gap-3 p-2.5 px-3.5 rounded-full bg-[#FDFBF7]/90 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgba(28,51,37,0.12)]">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-[#1C3325] text-[#FDFBF7] flex items-center justify-center hover:bg-[#2D4A37] transition-transform active:scale-95 shadow-sm"
          title={isPlaying ? "Pause Soundscape" : "Play Mysore Sanctuary Drone"}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isPlaying ? "pause" : "play_arrow"}
          </span>
        </button>

        {/* Track Title */}
        <div className="min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#84A98C] animate-ping" : "bg-neutral-300"}`} />
            <p className="text-[12px] font-semibold text-[#1C3325] truncate">
              {tracks[currentTrackIndex].title}
            </p>
          </div>
          <p className="text-[10px] text-[#5B635E] truncate">
            {tracks[currentTrackIndex].titleKn}
          </p>
        </div>

        {/* Next Track Switcher */}
        <button
          onClick={nextTrack}
          className="text-[#5B635E] hover:text-[#1C3325] p-1 rounded-full hover:bg-[#EDE8DE] transition-colors"
          title="Next Soundscape"
        >
          <span className="material-symbols-outlined text-[18px]">skip_next</span>
        </button>
      </div>
    </div>
  );
};
