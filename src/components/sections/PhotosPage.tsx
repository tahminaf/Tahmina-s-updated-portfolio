"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ────────────────────────────────────────────── */

export interface Photo {
  filename: string;
  src: string;        // image path, or poster frame for video
  caption: string;
  tags: string[];
  video?: string;     // optional .MOV/.mp4 path
  subtitle?: string;  // shown under username in lightbox
}

export interface PhotoDir {
  name: string;
  label: string;
  photos: Photo[];
}

// Filler colors for placeholder tiles
const FILLERS = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70",
  "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=70",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=70",
  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=70",
  "https://images.unsplash.com/photo-1489447068241-b3490214e879?w=600&q=70",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=70",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=70",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=70",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=70",
];

function filler(i: number, label: string, caption: string, tags: string[]): Photo {
  return {
    filename: `${label}-${i + 1}.jpg`,
    src: FILLERS[i % FILLERS.length],
    caption,
    tags,
  };
}

export const photoDirs: PhotoDir[] = [
  {
    name: "college-life",
    label: "college life",
    photos: [
      filler(0, "college", "UB Hacking 2025 · AI/ML Track Win", ["hackathon","ub","team"]),
      filler(1, "college", "UB Forge · First Light Fall 2025", ["forge","community"]),
      filler(2, "college", "M&T Bank Internship · Summer 2025", ["work","internship"]),
      filler(3, "college", "UB Campus · Spring 2024", ["ub","campus"]),
      filler(4, "college", "Red Bull Basement Workshop", ["leadership","redbull"]),
      filler(5, "college", "Late nights in the library", ["ub","study"]),
    ],
  },
  {
    name: "mt-bank",
    label: "m&t bank",
    photos: [
      { filename: "IMG_6733.jpeg",  src: "/internship/IMG_6733.jpeg",  caption: "my first day at M&T Bank! I was able to meet my team, as well as other Power Up Tech interns!",              tags: ["mtbank","internship","work"],     subtitle: "M&T TIP Program" },
      { filename: "IMG_8242.jpeg",  src: "/internship/IMG_8242.jpeg",  caption: "The dream team! The other interns on my team, Christabel and Sofie, were the kindest, and they made my first swe experience so memorable!",            tags: ["mtbank","internship","team"],     subtitle: "M&T TIP Program" },
      { filename: "IMG_9464.JPG",   src: "/internship/IMG_9464.JPG",   caption: "My team for TechBuffalo's build a pitch ideathon! We were able to create solutions for small businesses, and pitch them to the CEO of the companies.",               tags: ["mtbank","internship","team"],     subtitle: "M&T TIP Program" },
      { filename: "IMG_9704.jpeg",  src: "/internship/IMG_9704.jpeg",  caption: "My final intern showcase! I pitched to fellow interns and developers about the web apps I made in the summer! It was a bittersweet moment, since I loved my experience, but I had to say goodbye to my cohort and team.",  tags: ["mtbank","internship","showcase"], subtitle: "M&T TIP Program" },
      { filename: "IMG_8909.MOV",   src: "",  caption: "going to the game room after hours with other interns!",         tags: ["mtbank","internship","video"], video: "/internship/IMG_8909.MOV", subtitle: "M&T TIP Program" },
      { filename: "IMG_9097.MOV",   src: "",   caption: "a typical day of work at the office!",                           tags: ["mtbank","internship","video"], video: "/internship/IMG_9097.MOV", subtitle: "M&T TIP Program" },
    ],
  },
    {
    name: "malaysia",
    label: "malaysia",
    photos: [
      { filename: "DSCN0226.jpeg",  src: "/malaysia/DSCN0226.jpeg",  caption: "KL at night ✨",                                               tags: ["malaysia","kl","night"],        subtitle: "malaysia" },
      { filename: "IMG_1060.jpeg",  src: "/malaysia/IMG_1060.jpeg",  caption: "touring KL on a hop on bus with my digicam 📷",                                     tags: ["malaysia","kl","travel"],       subtitle: "malaysia" },
      { filename: "IMG_5225.jpeg",  src: "/malaysia/IMG_5225.jpeg",  caption: "Putra Mosque at night 🕌",           tags: ["malaysia","mosque","putrajaya"],subtitle: "malaysia" },
      { filename: "IMG_0331.jpeg",  src: "/malaysia/IMG_0331.jpeg",  caption: "exploring the central market with my bestie 🌸",                         tags: ["malaysia","ipoh","family"],     subtitle: "malaysia" },
      { filename: "IMG_0159.jpeg",  src: "/malaysia/IMG_0159.jpeg",  caption: "Best ramen I have ever had",              tags: ["malaysia","food","ramen"],      subtitle: "malaysia" },
      { filename: "IMG_4555.MOV",   src: "",                         caption: "Bukit Bintang! 🎥",                                                                  tags: ["malaysia","video"],             subtitle: "malaysia", video: "/malaysia/IMG_4555.MOV" },
      { filename: "IMG_5737.MOV",   src: "",                         caption: "the view of the cable cars in genting highlands!",                                                             tags: ["malaysia","video"],             subtitle: "malaysia", video: "/malaysia/IMG_5737.MOV" },
    { filename: "IMG_2285.jpeg",  src: "/malaysia/IMG_2285.jpeg",  caption: "after an incredible 10 days, I didn't want to go home 🇲🇾",                                tags: ["malaysia","travel","airport"],  subtitle: "malaysia" },

    ],
  },

    {
    name: "puerto-rico",
    label: "puerto rico",
    photos: [
      { filename: "IMG_3292.JPG",    src: "/puerto%20rico/IMG_3292.JPG",    caption: "made it to the top of El Yunque rainforest! 🌿 ",                       tags: ["puertorico","hike","nature"],    subtitle: "puerto rico" },
      { filename: "IMG_9964.jpeg",   src: "/puerto%20rico/IMG_9964.jpeg",   caption: "went to an oasis, and found natural clay",        tags: ["puertorico","adventure","water"],subtitle: "puerto rico" },
      { filename: "smoothie.jpg", src: "/puerto%20rico/smoothie.jpg", caption: "post-hike smoothie bowls in Río Grande 🌺 ",                                   tags: ["puertorico","food","riogrande"], subtitle: "puerto rico" },
      { filename: "IMG_3336.JPG",    src: "/puerto%20rico/IMG_3336.JPG",    caption: "golden hour at El Morro castle ",                             tags: ["puertorico","elmorro","history"],subtitle: "puerto rico" },
      { filename: "IMG_3396.JPG",    src: "/puerto%20rico/IMG_3396.JPG",    caption: "Old San Juan streets at night — the colors here are unreal",                                          tags: ["puertorico","sanjuan","city"],   subtitle: "puerto rico" },
      { filename: "IMG_3486.JPG",    src: "/puerto%20rico/IMG_3486.JPG",    caption: "street murals of Old San Juan by night ",                                        tags: ["puertorico","art","night"],      subtitle: "puerto rico" },
      { filename: "IMG_3462.JPG",    src: "/puerto%20rico/IMG_3462.JPG",    caption: "Cabo Rojo coastline 🌊 ",                           tags: ["puertorico","nature","coast"],   subtitle: "puerto rico" },
    ],
  },
  {
    name: "bangladesh",
    label: "bangladesh",
    photos: [
      { filename: "IMG_4447.MOV", src: "", caption: "a walk through my grandmother's village",     tags: ["bangladesh","video"], subtitle: "bangladesh", video: "/bangladesh/IMG_4447.MOV" },
      { filename: "IMG_4456.MOV", src: "", caption: "playing ludo with relatives",    tags: ["bangladesh","video"], subtitle: "bangladesh", video: "/bangladesh/IMG_4456.MOV" },
      { filename: "IMG_8128.MOV", src: "", caption: "wedding season!",      tags: ["bangladesh","video"], subtitle: "bangladesh", video: "/bangladesh/IMG_8128.MOV" },
      { filename: "IMG_8239.MOV", src: "", caption: "the food at my brother's wedding!",       tags: ["bangladesh","video"], subtitle: "bangladesh", video: "/bangladesh/IMG_8239.MOV" },
    ],
  },

  {
    name: "turkey",
    label: "turkey",
    photos: [
      filler(0, "tr", "Istanbul · Blue Mosque at Dusk", ["turkey","istanbul","travel"]),
      filler(1, "tr", "Hagia Sophia · Istanbul", ["turkey","history","architecture"]),
      filler(2, "tr", "Cappadocia · Hot Air Balloons", ["turkey","cappadocia","travel"]),
      filler(3, "tr", "Grand Bazaar · Istanbul", ["turkey","market"]),
      filler(4, "tr", "Bosphorus Strait · Istanbul", ["turkey","water"]),
      filler(5, "tr", "Turkish Breakfast Spread", ["turkey","food"]),
    ],
  },
    {
    name: "studytok",
    label: "studytok",
    photos: [
      { filename: "tok.jpeg",  src: "/studytok/tok.jpeg", caption: "when studying for my systems programming final", tags: ["studytok","study"],   subtitle: "studytok" },
      { filename: "tok.MOV",   src: "",                   caption: "study with me 📚",                                              tags: ["studytok","study"],   subtitle: "studytok", video: "/studytok/tok.MOV"   },
      { filename: "tokk.MOV",  src: "",                   caption: "productive study session for my intro to AI midterm",                                      tags: ["studytok","night"],   subtitle: "studytok", video: "/studytok/tokk.MOV"  },
      { filename: "tokky.MOV", src: "",                   caption: "spend 24 hours with us for UB Hacking 2025!",                                 tags: ["studytok","morning"], subtitle: "studytok", video: "/studytok/tokky.MOV" },
    ],
  },
    {
    name: "forge",
    label: "ub forge",
    photos: [
      { filename: "IMG_1491.JPEG",                         src: "/forge/IMG_1491.JPEG",                         caption: "Red Bull Basement x UB Forge — one idea, one impact 🐂",                                      tags: ["forge","redbull","community"],  subtitle: "ub forge" },
      { filename: "IMG_1557.JPEG",                         src: "/forge/IMG_1557.JPEG",                         caption: "the whole Forge crew at Red Bull Basement! so proud of this community ",                     tags: ["forge","redbull","team"],       subtitle: "ub forge" },
      { filename: "IMG_0521.JPG",                          src: "/forge/IMG_0521.JPG",                          caption: "me and my codirector, dev !!",                               tags: ["forge","ub","campus"],          subtitle: "ub forge" },
      { filename: "joe.png", src: "/forge/joe.png", caption: "Forge x Joseph Chen SunSesh Fall 2025 ⚡",               tags: ["forge","event","sunsesh"],      subtitle: "ub forge" },
      { filename: "IMG_0974.MOV",                          src: "",                                             caption: "Apple Picking with Forge 🍎",                                                                             tags: ["forge","video"],                subtitle: "ub forge", video: "/forge/IMG_0974.MOV" },
    ],
  },

  {
    name: "family",
    label: "family",
    photos: [
      filler(0, "family", "Eid ul-Fitr · 2025", ["family","eid","celebration"]),
      filler(1, "family", "Family dinner · Buffalo", ["family","home"]),
      filler(2, "family", "Eid ul-Adha · 2024", ["family","eid"]),
      filler(3, "family", "Road trip · 2023", ["family","travel"]),
      filler(4, "family", "Home · Buffalo NY", ["family","home","buffalo"]),
    ],
  },
];

/* ─── Instagram-style lightbox ────────────────────────── */

function Lightbox({ photo, onClose, onBack }: { photo: Photo; onClose: () => void; onBack?: () => void }) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  function handleDownload() {
    const src = photo.video ?? photo.src;
    if (!src) return;
    const a = document.createElement("a");
    a.href = src;
    a.download = photo.filename;
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-sm sm:max-w-md bg-[#fdfcf8] rounded-2xl overflow-hidden border-2 border-[#e2ddd2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — like Instagram */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#e2ddd2]">
          <button
            onClick={() => onBack ? onBack() : onClose()}
            className="flex items-center gap-1 font-['DM_Mono'] text-[12px] text-[#928c82] hover:text-[#0b3d2e] transition-colors duration-150 flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            back
          </button>
          <div className="w-8 h-8 rounded-full bg-[#0b3d2e] flex items-center justify-center flex-shrink-0">
            <span className="font-['DM_Mono'] font-bold text-[11px] text-white">TF</span>
          </div>
          <div className="min-w-0">
            <p className="font-['DM_Mono'] font-semibold text-[12px] text-[#16130e]">tahmina.fayezi</p>
            <p className="font-['DM_Mono'] text-[10px] text-[#928c82] truncate">{photo.subtitle ?? photo.tags[0]}</p>
          </div>
          <button onClick={onClose} className="ml-auto w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#f0ece3] text-[#928c82] hover:text-[#16130e] transition-colors text-sm flex-shrink-0">✕</button>
        </div>

        {/* Photo or Video */}
        <div className="w-full aspect-square overflow-hidden bg-[#f0ece3]">
          {photo.video ? (
            <video
              src={photo.video}
              controls
              playsInline
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Actions row */}
        <div className="px-4 pt-3 pb-1 flex items-center gap-4">
          {/* Heart — toggles red fill */}
          <button
            onClick={() => setLiked((v) => !v)}
            className="transition-transform duration-150 active:scale-90 focus:outline-none"
            aria-label={liked ? "Unlike" : "Like"}
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 transition-colors duration-200" fill={liked ? "#e2483d" : "none"} stroke={liked ? "#e2483d" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: liked ? "#e2483d" : "#16130e" }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#16130e]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {/* Download */}
          <button
            onClick={handleDownload}
            className="ml-auto focus:outline-none transition-opacity duration-150 hover:opacity-60 active:scale-90"
            aria-label="Download"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#16130e]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
        </div>

        {/* Caption */}
        <div className="px-4 pb-4">
          <p className="font-['DM_Mono'] text-[13px] text-[#16130e] leading-relaxed">
            <span className="font-semibold">tahmina.fayezi </span>{photo.caption}
          </p>
          <div className="flex gap-1.5 flex-wrap mt-2">
            {photo.tags.map((t) => (
              <span key={t} className="font-['DM_Mono'] text-[11px] text-[#0b3d2e]">#{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Instagram grid popup ────────────────────────────── */

function GridModal({ dir, onClose, onPhoto }: { dir: PhotoDir; onClose: () => void; onPhoto: (p: Photo) => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full sm:max-w-lg bg-[#fdfcf8] rounded-t-3xl sm:rounded-2xl overflow-hidden border-t-2 sm:border-2 border-[#e2ddd2]"
        style={{ maxHeight: "85vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pull bar (mobile) */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-[#e2ddd2]" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#e2ddd2]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 font-['DM_Mono'] text-[12px] text-[#928c82] hover:text-[#0b3d2e] transition-colors duration-150"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              back
            </button>
            <span className="text-[#e2ddd2]">|</span>
            <div>
              <p className="font-['Cormorant_Garamond'] font-light text-[22px] text-[#16130e] leading-none">{dir.label}</p>
              <p className="font-['DM_Mono'] text-[11px] text-[#928c82] mt-0.5">{dir.photos.length} photos · tap to open</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#f0ece3] border border-[#e2ddd2] flex items-center justify-center text-[#928c82] hover:text-[#16130e] hover:bg-[#e8e4dc] transition-colors text-sm">✕</button>
        </div>

        {/* Grid */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(85vh - 80px)" }}>
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {dir.photos.map((photo, i) => (
              <motion.button
                key={photo.filename}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                onClick={() => { onPhoto(photo); }}
                className="group relative aspect-square overflow-hidden bg-[#f0ece3] focus:outline-none"
              >
                {photo.video ? (
                  <video
                    src={photo.video + "#t=3"}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ background: "#f0ece3" }}
                  />
                ) : (
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-[#0b3d2e]/0 group-hover:bg-[#0b3d2e]/25 transition-colors duration-200" />
                {photo.video && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#0b3d2e]" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Terminal line types ─────────────────────────────── */

interface HistoryLine {
  type: "prompt" | "output" | "error";
  content?: string;
  promptPath?: string;
}

/* ─── Main page ───────────────────────────────────────── */

export function PhotosPage() {
  const [cwd, setCwd] = useState("/");
  const [lines, setLines] = useState<HistoryLine[]>([
    { type: "output", content: '<span class="font-semibold text-[#0b3d2e]">welcome to the photo archive.</span>' },
    { type: "output", content: '<span class="text-[#928c82]">type <span class="text-[#8a6800] font-semibold">ls</span> to see all albums</span>' },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [gridDir, setGridDir] = useState<PhotoDir | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [lightboxDir, setLightboxDir] = useState<PhotoDir | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Always start at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Always start at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const cwdLabel = useCallback(() => {
    return "~/photos" + (cwd === "/" ? "" : "/" + cwd);
  }, [cwd]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function addLines(newLines: HistoryLine[]) {
    setLines((prev) => [...prev, ...newLines]);
  }

  function openGrid(dir: PhotoDir) {
    setGridDir(dir);
  }

  function runCmd(raw: string) {
    const cmd = raw.trim();
    const promptLine: HistoryLine = { type: "prompt", content: cmd, promptPath: cwdLabel() };

    if (!cmd) { addLines([promptLine]); return; }

    setCmdHistory((prev) => [cmd, ...prev]);
    setHistIdx(-1);

    const [op, ...args] = cmd.split(/\s+/);
    const arg = args[0] ?? "";
    const out: HistoryLine[] = [promptLine];

    if (op === "help") {
      out.push({ type: "output", content: `<div class="my-2 rounded-xl border-2 border-[#e2ddd2] bg-[#f7f4ed] p-4 font-['DM_Mono'] text-[12px]">
  <p class="text-[#0b3d2e] font-semibold mb-3 text-[13px]">photo archive — command guide</p>

  <p class="text-[#928c82] mb-2 text-[11px] uppercase tracking-widest">navigation</p>
  <div class="space-y-2 mb-4">
    <div class="flex gap-3"><span class="text-[#0b3d2e] font-semibold min-w-[130px]">ls</span><span class="text-[#6b6358]">list all available photo albums from root, or show photos inside the current album</span></div>
    <div class="flex gap-3"><span class="text-[#0b3d2e] font-semibold min-w-[130px]">cd &lt;album&gt;</span><span class="text-[#6b6358]">enter an album — e.g. <span class="text-[#8a6800]">cd turkey</span> takes you into the turkey album and opens the grid automatically</span></div>
    <div class="flex gap-3"><span class="text-[#0b3d2e] font-semibold min-w-[130px]">cd ..</span><span class="text-[#6b6358]">go back up to the root — shows all albums again</span></div>
    <div class="flex gap-3"><span class="text-[#0b3d2e] font-semibold min-w-[130px]">cd</span><span class="text-[#6b6358]">shortcut to jump straight back to root from anywhere</span></div>
  </div>

  <p class="text-[#928c82] mb-2 text-[11px] uppercase tracking-widest">viewing photos</p>
  <div class="space-y-2 mb-4">
    <div class="flex gap-3"><span class="text-[#0b3d2e] font-semibold min-w-[130px]">open</span><span class="text-[#6b6358]">once inside an album, pops open the instagram-style grid of all photos — tap any photo to view it fullscreen</span></div>
    <div class="flex gap-3"><span class="text-[#0b3d2e] font-semibold min-w-[130px]">ls</span><span class="text-[#6b6358]">inside an album, same as open — shows the photo grid</span></div>
  </div>

  <p class="text-[#928c82] mb-2 text-[11px] uppercase tracking-widest">utilities</p>
  <div class="space-y-2 mb-4">
    <div class="flex gap-3"><span class="text-[#0b3d2e] font-semibold min-w-[130px]">pwd</span><span class="text-[#6b6358]">print your current location — e.g. /photos/turkey</span></div>
    <div class="flex gap-3"><span class="text-[#0b3d2e] font-semibold min-w-[130px]">clear</span><span class="text-[#6b6358]">wipe the terminal output and start fresh</span></div>
    <div class="flex gap-3"><span class="text-[#0b3d2e] font-semibold min-w-[130px]">help</span><span class="text-[#6b6358]">show this guide again anytime</span></div>
  </div>

  <p class="text-[#928c82] mb-2 text-[11px] uppercase tracking-widest">pro tips</p>
  <div class="space-y-1.5">
    <p class="text-[#6b6358]">↑ / ↓ arrow keys cycle through your command history</p>
    <p class="text-[#6b6358]">Tab autocompletes album names — type <span class="text-[#8a6800]">cd tu</span> then press Tab to complete <span class="text-[#8a6800]">cd turkey</span></p>
    <p class="text-[#6b6358]">this works just like a real unix terminal — if you know bash, you already know how to use this</p>
    <p class="text-[#6b6358]">you can also tap any album pill above the terminal to skip typing entirely</p>
  </div>
</div>` });
    } else if (op === "clear") {
      setLines([]);
      return;
    } else if (op === "ls") {
      if (cwd === "/") {
        const list = photoDirs.map(d =>
          `<span class="text-[#0b3d2e] font-semibold cursor-pointer hover:underline" data-cd="${d.name}">${d.name}/</span>`
        ).join("  ");
        out.push({ type: "output", content: list + `<span class="text-[#b0a898] text-[11px] block mt-1">→ type <span class="text-[#8a6800]">cd &lt;album&gt;</span> to explore</span>` });
      } else {
        const dir = photoDirs.find(d => d.name === cwd);
        if (dir) {
          out.push({ type: "output", content: `<span class="text-[#928c82]">${dir.photos.length} photos in <span class="text-[#0b3d2e] font-semibold">${dir.label}</span> → opening grid...</span>` });
          setTimeout(() => openGrid(dir), 200);
        }
      }
    } else if (op === "cd") {
      if (!arg || arg === "/") {
        setCwd("/");
        out.push({ type: "output", content: '<span class="text-[#928c82]">back to root. type <span class="text-[#8a6800]">ls</span> to see albums.</span>' });
      } else if (arg === "..") {
        setCwd("/");
        out.push({ type: "output", content: '<span class="text-[#928c82]">back to root.</span>' });
      } else {
        const found = photoDirs.find(d => d.name === arg.replace(/\/$/, "") || d.label === arg);
        if (!found) {
          out.push({ type: "error", content: `no album named <span class="font-semibold">${arg}</span> — type <span class="text-[#0b3d2e] font-semibold">ls</span> to see all albums` });
        } else {
          setCwd(found.name);
          out.push({ type: "output", content: `<span class="text-[#928c82]">entered <span class="text-[#0b3d2e] font-semibold">${found.label}</span> · ${found.photos.length} photos · type <span class="text-[#8a6800]">open</span> to view grid</span>` });
          setTimeout(() => openGrid(found), 300);
        }
      }
    } else if (op === "open") {
      const dir = cwd === "/" ? null : photoDirs.find(d => d.name === cwd);
      if (!dir) {
        out.push({ type: "error", content: 'cd into an album first, e.g. <span class="text-[#8a6800]">cd turkey</span>' });
      } else {
        out.push({ type: "output", content: `<span class="text-[#928c82]">opening <span class="text-[#0b3d2e] font-semibold">${dir.label}</span>...</span>` });
        setTimeout(() => openGrid(dir), 150);
      }
    } else if (op === "pwd") {
      out.push({ type: "output", content: "/photos" + (cwd === "/" ? "" : "/" + cwd) });
    } else {
      out.push({ type: "error", content: `command not found: <span class="font-semibold">${cmd}</span> — type <span class="text-[#0b3d2e] font-semibold">help</span>` });
    }

    addLines(out);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { runCmd(input); setInput(""); }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistIdx(i => { const n = Math.min(i + 1, cmdHistory.length - 1); setInput(cmdHistory[n] ?? ""); return n; });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistIdx(i => { if (i <= 0) { setInput(""); return -1; } setInput(cmdHistory[i - 1] ?? ""); return i - 1; });
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.split(/\s+/).pop() ?? "";
      const candidates = cwd === "/" ? photoDirs.map(d => d.name) : [];
      const matches = candidates.filter(c => c.startsWith(partial));
      if (matches.length === 1) {
        const parts = input.split(/\s+/);
        parts[parts.length - 1] = matches[0];
        setInput(parts.join(" "));
      }
    }
  }

  // Handle clicking folder names in output
  function handleOutputClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    const cdName = target.getAttribute("data-cd");
    if (cdName) { runCmd("cd " + cdName); inputRef.current?.focus(); }
  }

  return (
    <section id="photos" className="min-h-screen bg-[#fdfcf8]">

      {/* ── Page header ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-10 sm:pt-14 pb-10 sm:pb-14 border-b-2 border-[#e2ddd2]">
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-['DM_Mono'] font-semibold text-[11px] sm:text-[13px] tracking-[0.16em] uppercase text-[#8a6800] mb-4 sm:mb-5"
        >
          photo archive
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}
          className="font-['Cormorant_Garamond'] font-light text-[#16130e] leading-[0.95] tracking-[-0.02em] mb-5 sm:mb-6"
          style={{ fontSize: "clamp(44px, 8vw, 96px)" }}
        >
          My <em className="text-[#0b3d2e]">Photos</em>
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.14 }}
          className="block w-10 h-[2px] bg-[#a07c20] mb-5 sm:mb-6"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
          className="font-['DM_Mono'] text-[13px] sm:text-[15px] leading-[1.9] text-[#3a342a] max-w-[560px]"
        >
          Browse my photo albums through a terminal. Start with <span className="text-[#0b3d2e] font-semibold">ls</span> to see all albums, then <span className="text-[#0b3d2e] font-semibold">cd &lt;album&gt;</span> to dive in.
        </motion.p>
      </div>

      {/* ── Quick-access album pills ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-6 sm:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {photoDirs.filter(dir => !["turkey","college-life","family"].includes(dir.name)).map((dir) => (
            <button
              key={dir.name}
              onClick={() => { openGrid(dir); }}
              className="font-['DM_Mono'] text-[11px] sm:text-[12px] font-semibold tracking-[0.06em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-[#e2ddd2] bg-[#f7f4ed] text-[#3a342a] hover:border-[#7fbfa0] hover:bg-[#edf5f0] hover:text-[#0b3d2e] transition-all duration-200"
            >
              {dir.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Terminal ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="border-2 border-[#e2ddd2] rounded-2xl overflow-hidden bg-[#fdfcf8]"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="bg-[#f0ece3] px-4 sm:px-5 py-3 border-b-2 border-[#e2ddd2] flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#e2736a] flex-shrink-0" />
            <span className="w-3 h-3 rounded-full bg-[#d4a843] flex-shrink-0" />
            <span className="w-3 h-3 rounded-full bg-[#5aab6e] flex-shrink-0" />
            <span className="font-['DM_Mono'] text-[11px] sm:text-[12px] text-[#928c82] ml-1 tracking-[0.04em] truncate">
              tahmina@portfolio &nbsp;{cwdLabel()}
            </span>
          </div>

          {/* Output */}
          <div
            className="p-4 sm:p-5 min-h-[260px] sm:min-h-[320px] max-h-[420px] overflow-y-auto cursor-text"
            style={{ scrollbarWidth: "thin" }}
            onClick={handleOutputClick}
          >
            {lines.map((line, i) => {
              if (line.type === "prompt") {
                return (
                  <div key={i} className="flex flex-wrap items-baseline gap-x-1.5 mb-1 font-['DM_Mono'] text-[11px] sm:text-[12px]">
                    <span className="text-[#0b3d2e] font-semibold">tahmina</span>
                    <span className="text-[#928c82]">@portfolio</span>
                    <span className="text-[#8a6800] font-semibold">{line.promptPath}</span>
                    <span className="text-[#928c82]">%</span>
                    <span className="text-[#2a231a]">{line.content}</span>
                  </div>
                );
              }
              if (line.type === "error") {
                return <div key={i} className="font-['DM_Mono'] text-[11px] sm:text-[12px] text-[#b03000] mb-1" dangerouslySetInnerHTML={{ __html: line.content ?? "" }} />;
              }
              return <div key={i} className="font-['DM_Mono'] text-[11px] sm:text-[12px] text-[#2a231a] mb-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: line.content ?? "" }} />;
            })}

            {/* Active prompt row */}
            <div className="flex flex-wrap items-baseline gap-x-1.5 mt-1 font-['DM_Mono'] text-[11px] sm:text-[12px]">
              <span className="text-[#0b3d2e] font-semibold">tahmina</span>
              <span className="text-[#928c82]">@portfolio</span>
              <span className="text-[#8a6800] font-semibold">{cwdLabel()}</span>
              <span className="text-[#928c82]">%</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="bg-transparent border-none outline-none font-['DM_Mono'] text-[11px] sm:text-[12px] text-[#2a231a] flex-1 min-w-[100px] caret-[#0b3d2e]"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="type a command..."
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>

        {/* Help hint strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 px-1"
        >
          {[["ls","lists all your photo albums"], ["cd malaysia","enters the malaysia album & opens grid"], ["cd ..","goes back to root from any album"], ["open","pops the grid for current album"], ["clear","wipes the terminal"]].map(([cmd, desc]) => (
            <button
              key={cmd}
              onClick={() => { setInput(cmd); inputRef.current?.focus(); }}
              className="font-['DM_Mono'] text-[11px] text-[#928c82] hover:text-[#0b3d2e] transition-colors duration-150"
            >
              <span className="text-[#8a6800] font-semibold">{cmd}</span>
              <span className="text-[#b0a898]"> — {desc}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* ── Grid modal ── */}
      <AnimatePresence>
        {gridDir && (
          <GridModal
            dir={gridDir}
            onClose={() => setGridDir(null)}
            onPhoto={(photo) => { setLightboxDir(gridDir); setGridDir(null); setTimeout(() => setLightboxPhoto(photo), 50); }}
          />
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxPhoto && (
          <Lightbox
            photo={lightboxPhoto}
            onClose={() => { setLightboxPhoto(null); setLightboxDir(null); }}
            onBack={() => { setLightboxPhoto(null); setTimeout(() => setGridDir(lightboxDir), 50); }}
          />
        )}
      </AnimatePresence>

    </section>
  );
}