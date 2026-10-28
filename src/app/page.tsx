import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Headline } from "@/components/Headline";
import { HeroScene } from "@/components/HeroScene";
import { ImageFrame } from "@/components/ImageFrame";
import { JsonLd } from "@/components/JsonLd";
import { Magnetic } from "@/components/Magnetic";
import { Marquee } from "@/components/Marquee";
import { ProcessLine } from "@/components/ProcessLine";
import { Reveal } from "@/components/Reveal";
import { RotatingWords } from "@/components/RotatingWords";
import { ServiceCard } from "@/components/ServiceCard";
import { ShapesBackground } from "@/components/ShapesBackground";
import { HOME_FAQ, PORTFOLIO, SERVICES } from "@/content/services";
import { SITE } from "@/content/site";
import { faqLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "WordPress & WooCommerce Development Services",
  description: SITE.description,
  path: "/",
});

const POINTS = [
  "Custom code written for your business, not a template kit",
  "Performance and technical SEO built in from day one",
  "One accountable team from design to launch and support",
];

export default function Home() {
  return (
    <>
      <section className="noise relative overflow-hidden">
        <ShapesBackground />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pb-20 pt-36 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal y={12}>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-muted">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-2" />
                WordPress &amp; WooCommerce studio
              </span>
            </Reveal>
            <Headline
              className="mt-7 text-[clamp(2.6rem,5.6vw,5rem)] font-semibold leading-[1.04] tracking-tight"
              delay={0.2}
              segments={[
                { t: "Your site." },
                { t: "Our engineering." },
                { t: "Built to convert.", em: true },
              ]}
            />
            <Reveal delay={0.9}>
              <RotatingWords />
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                Custom themes and plugins, landing pages, technical SEO and store setup from the team at SyntexDev.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Magnetic>
                  <Link href="/get-a-quote" className="btn-primary">
                    Get a quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link href="#services" className="btn-ghost">See what we build</Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
          <HeroScene />
        </div>
      </section>

      <Marquee />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-32 lg:grid-cols-2">
        <Reveal>
          <ImageFrame
            src="/work/purepaws.png"
            alt="Screenshot of the PurePaws product website"
            sizes="(min-width: 1024px) 45vw, 90vw"
            aspect="aspect-[16/11]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">/ our approach</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            WordPress, built like <span className="text-gradient">software.</span>
          </h2>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex gap-3 text-muted">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-2/20 text-accent-2">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-32">
        <Reveal>
          <p className="eyebrow">/ what we build</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Services that meet you <span className="text-gradient">where you are.</span>
          </h2>
          <p className="mt-4 max-w-xl text-muted">Start with one, or combine them. Every project is scoped around what your site needs to do.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
          <Reveal delay={0.16}>
            <Link href="/get-a-quote" className="glass group relative flex h-full min-h-[22rem] flex-col justify-end overflow-hidden p-7">
              <Image src="/work/dhgate.png" alt="" fill sizes="30vw" className="object-cover object-top opacity-30 transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <span className="relative">
                <span className="block text-2xl font-semibold tracking-tight">Not sure what you need?</span>
                <span className="mt-2 block text-sm text-muted">Tell us the goal and we&apos;ll recommend a scope.</span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-2">
                  Talk to us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 pt-32" aria-labelledby="work-h">
        <div className="flex items-end justify-between gap-4">
          <Reveal>
            <p className="eyebrow">/ selected work</p>
            <h2 id="work-h" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Results we have <span className="text-gradient">shipped.</span>
            </h2>
          </Reveal>
          <Link href="/portfolio" className="hidden text-sm text-accent-2 hover:underline md:block">View all →</Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <article className="glass group relative overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Image src={p.image} alt={`Screenshot of the ${p.title} website`} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="font-mono text-xs text-accent-2">{p.tag}</span>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight">{p.title}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="process" className="mx-auto grid max-w-6xl scroll-mt-24 gap-12 px-6 pt-32 lg:grid-cols-2" aria-labelledby="process-h">
        <div>
          <Reveal>
            <p className="eyebrow">/ how we work</p>
            <h2 id="process-h" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              From first call <span className="text-gradient">to launch.</span>
            </h2>
            <p className="mt-4 max-w-md text-muted">Every build follows the same four steps, so you always know what is being built and when it ships.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 hidden lg:block">
            <ImageFrame
              src="/work/krispy-kreme.png"
              alt="Screenshot of the Krispy Kreme website"
              sizes="40vw"
              aspect="aspect-[16/10]"
            />
          </Reveal>
        </div>
        <ProcessLine />
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-32 lg:grid-cols-[0.8fr_1.2fr]" aria-labelledby="faq-h">
        <Reveal>
          <p className="eyebrow">/ faq</p>
          <h2 id="faq-h" className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Good <span className="text-gradient">questions.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Faq items={HOME_FAQ} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 pt-32">
        <Reveal>
          <div className="glass relative overflow-hidden px-8 py-20 text-center">
            <Image src="/work/reptile-park.png" alt="" fill sizes="80vw" className="object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/90" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Have a site or store to <span className="text-gradient">build?</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted">Tell us what you need. We reply within two business days.</p>
              <Magnetic>
                <Link href="/get-a-quote" className="btn-primary mt-8">Get a quote</Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </section>
      <JsonLd data={faqLd(HOME_FAQ)} />
    </>
  );
}
