import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Smartphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroVisual } from "@/components/hero-visual";

const methods = [
  {
    title: "Face authentication",
    body: "Recognize workers on shared tablets, kiosks, and rugged devices in seconds — no username or password.",
  },
  {
    title: "Badge, NFC & QR",
    body: "Pair physical credentials workers already carry with verified identity so every session is attributable.",
  },
  {
    title: "Risk-tiered assurance",
    body: "When help-desk requests get sensitive, Aura steps up verification with HRIS context, ID checks, or photo match.",
  },
];

const steps = [
  {
    n: "01",
    title: "Worker authenticates",
    body: "Face, badge, or mobile credential — built for shared devices and frontline floors.",
  },
  {
    n: "02",
    title: "Identity is attributed",
    body: "Every action ties to a verified person, even across shifts and multi-user workstations.",
  },
  {
    n: "03",
    title: "Sensitive requests escalate",
    body: "Password resets, MFA recovery, and access changes trigger policy-driven assurance with Aura.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="font-display text-[1.35rem] font-bold tracking-tight text-ink"
          >
            OLOID
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-ink/70 md:flex">
            <a href="#platform" className="transition-colors hover:text-ink">
              Platform
            </a>
            <a href="#how" className="transition-colors hover:text-ink">
              How it works
            </a>
            <a href="#aura" className="transition-colors hover:text-ink">
              Aura
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex" render={<a href="#contact" />}>
              Sign in
            </Button>
            <Button className="h-9 px-3.5" render={<a href="#contact" />}>
              Book a demo
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative min-h-[100svh] overflow-hidden">
          <HeroVisual />
          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-center lg:pb-24">
            <div className="max-w-xl">
              <p className="animate-rise font-display text-5xl font-bold tracking-tight text-ink sm:text-6xl md:text-7xl">
                OLOID
              </p>
              <h1 className="animate-rise-delay-1 mt-5 max-w-[18ch] font-display text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
                Passwordless identity for the frontline workforce
              </h1>
              <p className="animate-rise-delay-2 mt-5 max-w-[36ch] text-base leading-relaxed text-ink/70 sm:text-lg">
                Replace shared passwords with phishing-resistant access on shared
                devices — and verify workers in real time when help-desk requests
                demand higher assurance.
              </p>
              <div className="animate-rise-delay-3 mt-8 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  className="h-11 gap-2 px-5 text-base"
                  render={<a href="#contact" />}
                >
                  Book a demo
                  <ArrowRight data-icon="inline-end" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 border-ink/15 bg-white/50 px-5 text-base backdrop-blur-sm"
                  render={<a href="#platform" />}
                >
                  Explore the platform
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="platform"
          className="border-t border-border/70 bg-white px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-sea">
              Platform
            </p>
            <h2 className="mt-3 max-w-[20ch] font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Built for shared devices and distributed teams
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65">
              Frontline work runs on tablets, kiosks, scanners, and POS systems.
              OLOID makes every login fast, attributable, and free of shared secrets.
            </p>

            <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
              {methods.map((item) => (
                <div key={item.title} className="border-t border-ink/10 pt-6">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink px-5 py-20 text-white sm:px-8 sm:py-28">
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-sea/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#1f4d6b]/50 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[#9fd9cf]">
                Why OLOID
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Shared passwords are a liability. Attributed sessions are the fix.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
                Eliminate credential sharing, speed up shift changes, and keep a
                clean audit trail for every action on multi-user devices —
                without asking workers to carry a corporate laptop.
              </p>
            </div>
            <ul className="space-y-5">
              {[
                {
                  icon: Users,
                  title: "Fast user switching",
                  body: "Seconds to authenticate between shifts — no shared logins, no stuck sessions.",
                },
                {
                  icon: ShieldCheck,
                  title: "Phishing-resistant by design",
                  body: "Presence and possession factors replace passwords that can be stolen or reused.",
                },
                {
                  icon: BadgeCheck,
                  title: "Full identity attribution",
                  body: "Every authentication event maps to a verified individual for compliance and ops.",
                },
              ].map((row) => (
                <li key={row.title} className="flex gap-4">
                  <row.icon className="mt-0.5 size-5 shrink-0 text-[#9fd9cf]" />
                  <div>
                    <p className="font-display text-lg font-semibold">{row.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">
                      {row.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how" className="bg-mist/60 px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-sea">
              How it works
            </p>
            <h2 className="mt-3 max-w-[18ch] font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              From device access to identity assurance
            </h2>
            <ol className="mt-14 grid gap-10 md:grid-cols-3">
              {steps.map((step) => (
                <li key={step.n} className="relative">
                  <span className="font-display text-4xl font-bold text-sea/35">
                    {step.n}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink/65">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="aura"
          className="border-t border-border/70 bg-white px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-sea">
                OLOID Aura
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                AI identity assurance for workforce help desks
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ink/65">
                When password resets, MFA recovery, or access changes need higher
                assurance, Aura verifies the worker in real time — with
                policy-driven methods and zero stored PII.
              </p>
              <ul className="mt-8 space-y-3 text-[0.95rem] text-ink/75">
                <li className="flex gap-3">
                  <Smartphone className="mt-0.5 size-4 shrink-0 text-sea" />
                  Mobile-first ID verification for distributed and deskless workers
                </li>
                <li className="flex gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sea" />
                  HRIS-informed dynamic questions tied to live workforce context
                </li>
                <li className="flex gap-3">
                  <BadgeCheck className="mt-0.5 size-4 shrink-0 text-sea" />
                  Session-based processing — no personal identification data retained
                </li>
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(145deg,#14324a_0%,#0f2438_55%,#0a5f53_100%)] p-8 text-white shadow-[0_30px_80px_-40px_rgba(16,36,58,0.7)] sm:p-10">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-[#9fd9cf]">
                Sample assurance flow
              </p>
              <div className="mt-8 space-y-4">
                {[
                  "Help-desk request flagged as high risk",
                  "Aura invokes policy for this request type",
                  "Worker completes stepped-up verification",
                  "Outcome returned to IT / HR workflow",
                ].map((line, i) => (
                  <div
                    key={line}
                    className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sea/25 font-display text-xs font-bold text-[#9fd9cf]">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-white/85">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-mist/50 px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Integrates with the systems you already run
            </h2>
            <p className="mt-3 max-w-2xl text-ink/65">
              Connect HRIS and IAM so access follows the worker — from onboarding
              through role changes and offboarding.
            </p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-display text-sm font-semibold tracking-wide text-ink/45 sm:text-base">
              {[
                "Workday",
                "SAP SuccessFactors",
                "Okta",
                "Microsoft Entra ID",
                "BambooHR",
                "UKG",
                "ADP",
              ].map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,#d7ebe6_0%,transparent_50%),linear-gradient(180deg,#f4f7fa_0%,#e4eef5_100%)]" />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
              See OLOID on your floor
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink/65">
              Walk through passwordless shared-device access and Aura identity
              assurance with your IT and HR stakeholders.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="h-11 gap-2 px-5 text-base"
                render={<a href="mailto:hello@oloid.com" />}
              >
                Book a demo
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 border-ink/15 bg-white/60 px-5 text-base"
                render={<a href="https://www.oloid.com" target="_blank" rel="noopener noreferrer" />}
              >
                Visit oloid.com
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-display text-lg font-bold tracking-tight text-ink">
            OLOID
          </p>
          <p className="text-sm text-ink/50">
            Passwordless identity & workforce assurance · Demo landing
          </p>
        </div>
      </footer>
    </div>
  );
}
