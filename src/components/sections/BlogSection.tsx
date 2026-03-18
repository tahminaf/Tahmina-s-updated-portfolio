"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

export interface BlogPost {
  slug: string;
  kicker: string;
  headline: string;
  lede: string;
  date: string;
  readTime: string;
  image?: string;
  imageAlt?: string;
  href: string; // link to Medium, Substack, dev.to, wherever you publish
}

/* ── Swap these out for your real posts ── */
export const posts: BlogPost[] = [
  {
    slug: "why-trpc",
    kicker: "Engineering",
    headline: "Why I switched from REST to tRPC on my last project",
    lede: "Type safety across the entire stack changed how I think about API contracts. Here's what I learned building Saath.",
    date: "Mar 12, 2026",
    readTime: "5 min read",
    image: "/blog-trpc.png",
    imageAlt: "tRPC diagram",
    href: "https://medium.com/@tahmina", // replace with real link
  },
  {
    slug: "building-ease",
    kicker: "Hackathon",
    headline: "Building EASE in 24 hours: what worked, what broke",
    lede: "A post-mortem on winning the AI/ML track at UB Hacking — MediaPipe, sleep deprivation, and a lot of coffee.",
    date: "Nov 3, 2025",
    readTime: "8 min read",
    image: "/ease.png",
    imageAlt: "EASE app screenshot",
    href: "https://medium.com/@tahmina", // replace with real link
  },
  {
    slug: "pwc-lessons",
    kicker: "Career",
    headline: "What interviewing at PwC taught me about talking tech to non-engineers",
    lede: "Translating stack traces into business value is its own skill. Nobody teaches you this in class.",
    date: "Jan 28, 2026",
    readTime: "4 min read",
    image: "/blog-pwc.png",
    imageAlt: "PwC office",
    href: "https://medium.com/@tahmina", // replace with real link
  },
];

function ImagePlaceholder() {
  return (
    <div className="w-full h-full bg-[#f0ece3] flex flex-col items-center justify-center gap-2 text-[#b0a898]">
      <svg viewBox="0 0 48 48" className="w-8 h-8 opacity-30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="40" height="28" rx="3" />
        <path d="M4 30l10-8 8 6 8-10 14 10" />
        <circle cx="16" cy="18" r="3" />
      </svg>
      <span className="font-['DM_Mono'] text-[10px] tracking-[0.08em]">cover image</span>
    </div>
  );
}

function LeadArticle({ post }: { post: BlogPost }) {
  return (
    <motion.a
      {...fadeUp(0.08)}
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-2 border-[#e2ddd2] rounded-2xl overflow-hidden hover:border-[#7fbfa0] transition-colors duration-300 bg-[#fdfcf8]"
    >
      <div className="w-full overflow-hidden border-b-2 border-[#e2ddd2]" style={{ height: 260 }}>
        {post.image ? (
          <img src={post.image} alt={post.imageAlt ?? post.headline} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="px-6 sm:px-10 py-8 sm:py-10 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 md:gap-10">
        <div>
          <p className="font-['DM_Mono'] font-bold text-[11px] tracking-[0.14em] uppercase text-[#8a6800] mb-3">{post.kicker}</p>
          <h3 className="font-['Cormorant_Garamond'] font-light text-[#16130e] leading-[1.1] mb-4 group-hover:text-[#0b3d2e] transition-colors duration-200" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
            {post.headline}
          </h3>
          <p className="font-['DM_Mono'] text-[14px] leading-[1.85] text-[#3a342a]">{post.lede}</p>
        </div>
        <div className="flex md:flex-col md:justify-between md:items-end gap-3">
          <div className="text-right hidden md:block">
            <p className="font-['DM_Mono'] font-semibold text-[12px] text-[#928c82]">{post.date}</p>
            <p className="font-['DM_Mono'] text-[12px] text-[#b0a898]">{post.readTime}</p>
          </div>
          <span className="font-['DM_Mono'] font-bold text-[12px] tracking-[0.08em] lowercase px-5 py-2.5 rounded-full bg-[#0b3d2e] text-white group-hover:bg-[#145c42] transition-colors duration-200">
            read ↗
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function SupportingArticle({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.a
      {...fadeUp(0.12 + index * 0.07)}
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col border-2 border-[#e2ddd2] rounded-2xl overflow-hidden hover:border-[#7fbfa0] transition-colors duration-300 bg-[#fdfcf8]"
    >
      <div className="w-full overflow-hidden border-b-2 border-[#e2ddd2] flex-shrink-0" style={{ height: 180 }}>
        {post.image ? (
          <img src={post.image} alt={post.imageAlt ?? post.headline} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]" />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="px-5 sm:px-7 py-6 flex flex-col flex-1">
        <p className="font-['DM_Mono'] font-bold text-[11px] tracking-[0.14em] uppercase text-[#8a6800] mb-2">{post.kicker}</p>
        <h3 className="font-['Cormorant_Garamond'] font-light text-[22px] sm:text-[24px] text-[#16130e] leading-[1.15] mb-3 group-hover:text-[#0b3d2e] transition-colors duration-200">
          {post.headline}
        </h3>
        <p className="font-['DM_Mono'] text-[13px] leading-[1.8] text-[#3a342a] mb-5 flex-1">{post.lede}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#e2ddd2]">
          <div>
            <p className="font-['DM_Mono'] font-semibold text-[11px] text-[#928c82]">{post.date}</p>
            <p className="font-['DM_Mono'] text-[11px] text-[#b0a898]">{post.readTime}</p>
          </div>
          <span className="font-['DM_Mono'] font-bold text-[11px] tracking-[0.08em] lowercase px-4 py-2 rounded-full border-2 border-[#7fbfa0] text-[#0d5c40] group-hover:bg-[#d8f0e4] transition-colors duration-200">
            read ↗
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export function BlogSection() {
  const [lead, ...supporting] = posts;

  return (
    <section id="blogs" className="min-h-screen bg-[#fdfcf8]">

      {/* ── Page header — matches Experience/Projects ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-10 sm:pt-14 pb-10 sm:pb-14 border-b-2 border-[#e2ddd2]">
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="font-['DM_Mono'] font-semibold text-[11px] sm:text-[13px] tracking-[0.16em] sm:tracking-[0.18em] uppercase text-[#8a6800] mb-4 sm:mb-5"
        >
          professional dispatches
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}
          className="font-['Cormorant_Garamond'] font-light text-[#16130e] leading-[0.95] tracking-[-0.02em] mb-5 sm:mb-6"
          style={{ fontSize: "clamp(44px, 8vw, 96px)" }}
        >
          The <em className="text-[#0b3d2e]">Gazette</em>
        </motion.h1>
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.14 }}
          className="block w-10 h-[2px] bg-[#a07c20] mb-5 sm:mb-6"
        />
        <div className="flex items-end justify-between flex-wrap gap-4">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }}
            className="font-['DM_Mono'] text-[13px] sm:text-[15px] leading-[1.9] text-[#3a342a] max-w-[600px]"
          >
            Thoughts on engineering, hackathons, career, and everything in between.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.28 }}
            className="flex items-center gap-2"
          >
            <span className="font-['Cormorant_Garamond'] font-light italic text-[28px] sm:text-[32px] text-[#0b3d2e] leading-none">
              {String(posts.length).padStart(2, "0")}
            </span>
            <span className="font-['DM_Mono'] font-semibold text-[12px] sm:text-[13px] tracking-[0.14em] uppercase text-[#928c82]">
              posts
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Masthead rule ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-12">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between pb-3 border-b-[3px] border-double border-[#e2ddd2] mb-2"
        >
          <span className="font-['DM_Mono'] text-[10px] sm:text-[11px] tracking-[0.1em] text-[#928c82]">Buffalo, NY</span>
          <span className="font-['DM_Mono'] text-[10px] sm:text-[11px] tracking-[0.1em] text-[#928c82]">Vol. I &nbsp;·&nbsp; Est. 2024</span>
          <span className="font-['DM_Mono'] text-[10px] sm:text-[11px] tracking-[0.1em] text-[#928c82]">All opinions my own</span>
        </motion.div>
      </div>

      {/* ── Articles ── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 space-y-4 sm:space-y-5">
        {lead && <LeadArticle post={lead} />}
        {supporting.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {supporting.map((post, i) => (
              <SupportingArticle key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}

        {/* Footer rule */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex items-center gap-4 pt-4 border-t border-[#e2ddd2]"
        >
          <div className="flex-1 h-px bg-[#e2ddd2]" />
          <span className="font-['DM_Mono'] text-[11px] tracking-[0.1em] text-[#b0a898]">— more dispatches coming —</span>
          <div className="flex-1 h-px bg-[#e2ddd2]" />
        </motion.div>
      </div>

    </section>
  );
}