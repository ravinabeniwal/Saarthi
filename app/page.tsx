import Link from "next/link";
import { GraduationCap, Users, Sparkles, ArrowRight, Radio } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-20">
        <section className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium text-cyan-300">
            <Sparkles size={13} /> Built on Agora Conversational AI
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-white md:text-7xl">
            Saarthi
          </h1>
          <p className="mt-4 text-xl font-medium text-mist md:text-2xl">
            Your AI Co-Teacher for the Live Classroom
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-mist/60 md:text-base">
            Listens in real time. Understands the lesson. Speaks only when it truly helps.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/classroom"
              className="flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 text-sm font-medium text-navy-950 transition-transform hover:scale-[1.03]"
            >
              <GraduationCap size={16} /> Start Classroom
            </Link>
            <Link
              href="/classroom"
              className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              <Users size={16} /> Join Classroom
            </Link>
            <Link
              href="/live?channel=saarthi-demo&role=teacher&name=Ms.+Rao&topic=Quadratic+Equations"
              className="flex items-center gap-2 rounded-full border border-cyan-400/30 px-6 py-3 text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-400/10"
            >
              <Radio size={16} /> Try Live Demo <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <div className="glass-strong flex flex-col items-center gap-6 rounded-3xl p-10 md:flex-row md:justify-between">
            {[
              { icon: GraduationCap, label: "Teacher", desc: "Leads the lesson" },
              { icon: Radio, label: "Classroom", desc: "Live Agora channel" },
              { icon: Sparkles, label: "Saarthi AI", desc: "Listens & assists" },
              { icon: Users, label: "Students", desc: "Learn without gaps" },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center gap-6">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-cyan-400">
                    <step.icon size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{step.label}</p>
                    <p className="text-xs text-mist/50">{step.desc}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight size={18} className="hidden shrink-0 text-mist/30 md:block" />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Speaks only when it helps",
              body: "Saarthi waits for a natural pause and never interrupts the teacher mid-sentence.",
            },
            {
              title: "Understands the lesson",
              body: "Live transcript, topic tracking, and confusion detection keep Saarthi's context current.",
            },
            {
              title: "Teacher always in control",
              body: "Mute, pause, resume, or allow Saarthi to speak — one tap, any time.",
            },
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6">
              <p className="font-display text-base font-semibold text-white">{f.title}</p>
              <p className="mt-2 text-sm text-mist/60">{f.body}</p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
