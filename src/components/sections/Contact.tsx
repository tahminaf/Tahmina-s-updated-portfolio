"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { personalInfo } from "../../data/portfolioData";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

type Status = "idle" | "sending" | "success" | "error";

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
);
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const socialLinks = [
  {
    icon: <EmailIcon />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    value: "linkedin.com/in/tahmina-fayezi",
    href: personalInfo.linkedin,
  },
  {
    icon: <GitHubIcon />,
    label: "GitHub",
    value: "github.com/tahminaf",
    href: personalInfo.github,
  },
];

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", time: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    // Stamp the time right before sending
    const now = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
    setForm((prev) => ({ ...prev, time: now }));
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current!, EMAILJS_PUBLIC_KEY);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", time: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-[#e2ddd2] bg-[#fdfcf8]">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ── LEFT: header + socials ── */}
        <div className="px-8 md:px-16 py-24 lg:py-32 flex flex-col justify-center lg:border-r border-[#e2ddd2]">

          <motion.p {...fadeUp(0)} className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.18em] uppercase text-[#8a6800] mb-5">
            get in touch
          </motion.p>

          <motion.h2
            {...fadeUp(0.05)}
            className="font-['Cormorant_Garamond'] font-light text-[#16130e] leading-[1.0] tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(48px, 5vw, 68px)" }}
          >
            Let's <em className="text-[#0b3d2e] not-italic italic">Connect</em>
          </motion.h2>

          <motion.span {...fadeUp(0.08)} className="block w-8 h-[2px] bg-[#a07c20] mb-8" />

          <motion.p {...fadeUp(0.1)} className="font-['DM_Mono'] text-[15px] leading-[1.9] text-[#2a231a] mb-14 max-w-[420px]">
            I'd love to get to know you. Whether it's about a role, a collaboration, or just to say hi — my inbox is always open.
          </motion.p>

          {/* Social links */}
          <div className="flex flex-col gap-4 mb-12">
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.label}
                {...fadeUp(0.12 + i * 0.06)}
                href={s.href}
                target={s.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 px-6 py-4 rounded-2xl border-2 border-[#e2ddd2] bg-[#f7f4ed] hover:border-[#7fbfa0] hover:bg-[#edf5f0] transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0b3d2e] flex items-center justify-center text-white flex-shrink-0 group-hover:bg-[#145c42] transition-colors duration-200">
                  {s.icon}
                </div>
                <div>
                  <p className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.14em] uppercase text-[#928c82] mb-0.5">
                    {s.label}
                  </p>
                  <p className="font-['DM_Mono'] text-[14px] text-[#2a231a]">
                    {s.value}
                  </p>
                </div>
                <span className="ml-auto font-['DM_Mono'] text-[15px] text-[#c8c0b4] group-hover:text-[#0b3d2e] transition-colors duration-200">
                  →
                </span>
              </motion.a>
            ))}
          </div>

          {/* Résumé */}
          <motion.a
            {...fadeUp(0.3)}
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-['DM_Mono'] font-semibold text-[15px] tracking-[0.08em] lowercase px-8 py-4 rounded-full border-2 border-[#d4b86a] text-[#8a6800] hover:bg-[#faf3e0] transition-all duration-200 w-fit"
          >
            view my résumé ↗
          </motion.a>
        </div>

        {/* ── RIGHT: form ── */}
        <div className="px-8 md:px-16 py-24 lg:py-32 flex flex-col justify-center bg-[#f7f4ed]">

          <motion.p {...fadeUp(0.05)} className="font-['DM_Mono'] font-semibold text-[13px] tracking-[0.18em] uppercase text-[#928c82] mb-10">
            send a message
          </motion.p>

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-7">
            {/* Hidden time field for EmailJS template */}
            <input type="hidden" name="time" value={form.time} />

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div {...fadeUp(0.08)} className="flex flex-col gap-2">
                <label className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.14em] uppercase text-[#6b6358]">Name</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Your name" required
                  className="bg-[#fdfcf8] border-2 border-[#e2ddd2] rounded-xl px-5 py-3.5 font-['DM_Mono'] text-[15px] text-[#16130e] placeholder:text-[#c8c0b4] focus:border-[#0b3d2e] focus:outline-none transition-colors duration-200"
                />
              </motion.div>

              <motion.div {...fadeUp(0.1)} className="flex flex-col gap-2">
                <label className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.14em] uppercase text-[#6b6358]">Email</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="your@email.com" required
                  className="bg-[#fdfcf8] border-2 border-[#e2ddd2] rounded-xl px-5 py-3.5 font-['DM_Mono'] text-[15px] text-[#16130e] placeholder:text-[#c8c0b4] focus:border-[#0b3d2e] focus:outline-none transition-colors duration-200"
                />
              </motion.div>
            </div>

            {/* Subject */}
            <motion.div {...fadeUp(0.12)} className="flex flex-col gap-2">
              <label className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.14em] uppercase text-[#6b6358]">Subject</label>
              <input
                type="text" name="subject" value={form.subject} onChange={handleChange}
                placeholder="What's this about?" required
                className="bg-[#fdfcf8] border-2 border-[#e2ddd2] rounded-xl px-5 py-3.5 font-['DM_Mono'] text-[15px] text-[#16130e] placeholder:text-[#c8c0b4] focus:border-[#0b3d2e] focus:outline-none transition-colors duration-200"
              />
            </motion.div>

            {/* Message */}
            <motion.div {...fadeUp(0.14)} className="flex flex-col gap-2">
              <label className="font-['DM_Mono'] font-semibold text-[11px] tracking-[0.14em] uppercase text-[#6b6358]">Message</label>
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Tell me more — I'd love to hear about you, your project, or what you're working on..."
                required rows={9}
                className="bg-[#fdfcf8] border-2 border-[#e2ddd2] rounded-xl px-5 py-4 font-['DM_Mono'] text-[15px] text-[#16130e] placeholder:text-[#c8c0b4] focus:border-[#0b3d2e] focus:outline-none transition-colors duration-200 resize-none leading-[1.8]"
              />
            </motion.div>

            {/* Submit */}
            <motion.div {...fadeUp(0.16)} className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button
                type="submit" disabled={status === "sending"}
                className="font-['DM_Mono'] font-semibold text-[15px] tracking-[0.08em] lowercase px-8 py-4 rounded-full bg-[#0b3d2e] text-white hover:bg-[#145c42] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "sending..." : "send message →"}
              </button>

              {status === "success" && (
                <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  className="font-['DM_Mono'] text-[14px] text-[#0d5c40]">
                  ✓ Sent! I'll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  className="font-['DM_Mono'] text-[14px] text-[#8a6800]">
                  Something went wrong — email me at {personalInfo.email}
                </motion.p>
              )}
            </motion.div>

          </form>
        </div>

      </div>
    </section>
  );
}