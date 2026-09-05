"use client";

// One continuous hero visual: both provided images sit side by side as a
// single wide band across the top of the hero, tinted to the site's teal
// palette and gradient-faded into the page background so the Saarthi
// content reads as part of the same composition rather than a separate
// card placed on top of two floating photos.

const images = ["/floating/ai-classroom-board.png", "/floating/ai-tutor-screen.png"];

export default function FloatingBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[320px] overflow-hidden sm:h-[400px]">
      <div className="flex h-full w-full">
        {images.map((src) => (
          <img key={src} src={src} alt="" className="h-full w-1/2 object-cover" />
        ))}
      </div>

      {/* brand color wash so the photos read as part of the same palette */}
      <div className="absolute inset-0 bg-cyan-600/15 mix-blend-multiply" />

      {/* fade into the page background at the bottom (this is what makes it feel continuous) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/70 to-slate-50" />

      {/* soften the outer left/right edges of the band */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-slate-50 to-transparent" />
    </div>
  );
}
