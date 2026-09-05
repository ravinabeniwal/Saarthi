"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "saarthi_intro_seen";
const AUTO_DISMISS_MS = 2600;
const SKIP_APPEARS_MS = 700;

export default function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SEEN_KEY)) return;
    setVisible(true);

    const skipTimer = setTimeout(() => setShowSkip(true), SKIP_APPEARS_MS);
    const dismissTimer = setTimeout(dismiss, AUTO_DISMISS_MS);

    function dismiss() {
      setLeaving(true);
      window.sessionStorage.setItem(SEEN_KEY, "1");
      setTimeout(() => setVisible(false), 500);
    }

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="intro-name-wrap text-center">
        <h1 className="intro-name font-display text-5xl font-semibold tracking-tight text-white md:text-7xl">
          Saarthi
        </h1>
        <p className="intro-tagline mt-3 text-sm font-medium tracking-wide text-cyan-300/80 md:text-base">
          Your AI Co-Teacher for the Live Classroom
        </p>
      </div>

      {showSkip && (
        <button
          onClick={() => {
            setLeaving(true);
            window.sessionStorage.setItem(SEEN_KEY, "1");
            setTimeout(() => setVisible(false), 400);
          }}
          className="absolute bottom-8 right-8 rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-white/30 hover:text-white"
        >
          Skip intro
        </button>
      )}

      <style jsx>{`
        .intro-name-wrap {
          opacity: 0;
          animation: introRise 1s ease-out forwards;
        }
        .intro-name {
          text-shadow: 0 0 0 rgba(63, 224, 208, 0);
          animation: introGlow 2.2s ease-in-out 0.3s forwards;
        }
        .intro-tagline {
          opacity: 0;
          animation: introFadeIn 1s ease-out 0.6s forwards;
        }
        @keyframes introRise {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes introGlow {
          0% {
            text-shadow: 0 0 0 rgba(63, 224, 208, 0);
          }
          60% {
            text-shadow: 0 0 28px rgba(63, 224, 208, 0.55);
          }
          100% {
            text-shadow: 0 0 14px rgba(63, 224, 208, 0.25);
          }
        }
        @keyframes introFadeIn {
          to {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .intro-name-wrap,
          .intro-name,
          .intro-tagline {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
