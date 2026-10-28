import Image from "next/image";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { PORTFOLIO } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio",
  description: "Selected projects from the SyntexDev team.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-8 pt-36">
      <p className="eyebrow">/ portfolio</p>
      <Headline
        className="mt-4 text-[clamp(2.4rem,5.5vw,4.4rem)] font-semibold leading-[1.05] tracking-tight"
        segments={[{ t: "Work we're" }, { t: "proud of.", em: true }]}
      />
      <p className="mt-4 max-w-xl text-muted">
        Projects from the wider SyntexDev portfolio. WordPress and WooCommerce case studies will be added as they are confirmed.
      </p>
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
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">{p.title}</h2>
                <p className="mt-1 text-sm text-muted">{p.text}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
