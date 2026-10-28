import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Faq } from "@/components/Faq";
import { Headline } from "@/components/Headline";
import { ImageFrame } from "@/components/ImageFrame";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { SERVICES, getService } from "@/content/services";
import { breadcrumbLd, faqLd, pageMetadata, serviceLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const path = `/${s.slug}`;
  const quote = `/get-a-quote?service=${encodeURIComponent(s.name)}`;

  return (
    <article className="mx-auto max-w-6xl px-4 pb-8 pt-36">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/" className="hover:text-white">Home</Link>
        <span aria-hidden="true"> / </span>
        <span>{s.name}</span>
      </nav>

      <header className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/8 text-accent-2 ring-1 ring-white/15">
            <ServiceIcon name={s.icon} className="h-6 w-6" />
          </span>
          <Headline
            className="mt-6 font-semibold tracking-tight text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.05]"
            segments={[{ t: s.name }]}
          />
          <Reveal delay={0.4}>
            <p className="mt-5 text-lg leading-relaxed text-muted">{s.summary}</p>
            <p className="mt-5 font-mono text-xs text-accent-2">{s.tags}</p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <ImageFrame
            src={s.image}
            alt={`Example project screenshot for ${s.name}`}
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            aspect="aspect-[16/11]"
          />
        </Reveal>
      </header>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-16">
          <Reveal>
            <section aria-labelledby="included">
              <h2 id="included" className="font-semibold tracking-tight text-3xl">What&apos;s included</h2>
              <ul className="glass mt-5 grid gap-4 p-7 md:grid-cols-2">
                {s.included.map((i) => (
                  <li key={i} className="flex gap-3 text-[0.95rem]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-2/20 text-accent-2">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="process">
              <h2 id="process" className="font-semibold tracking-tight text-3xl">How it works</h2>
              <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                {s.process.map((p, i) => (
                  <li key={p.title} className="glass glass-sm p-5">
                    <span className="font-mono text-xs text-accent-2">0{i + 1}</span>
                    <h3 className="mt-1 font-semibold tracking-tight text-xl">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted">{p.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          <Reveal>
            <section aria-labelledby="faq">
              <h2 id="faq" className="font-semibold tracking-tight text-3xl">Questions</h2>
              <div className="mt-5"><Faq items={s.faq} /></div>
            </section>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal delay={0.2}>
            <div className="glass space-y-6 p-7">
              <div>
                <p className="eyebrow">Typical timeline</p>
                <p className="mt-2 font-semibold tracking-tight text-2xl">{s.timeline.replace(" (placeholder)", "")}</p>
              </div>
              <div>
                <p className="eyebrow">You receive</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={quote} className="btn-primary w-full justify-center">Get a quote</Link>
            </div>
          </Reveal>
        </aside>
      </div>

      <JsonLd data={serviceLd(s.name, s.metaDescription, path)} />
      <JsonLd data={faqLd(s.faq)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: s.name, path }])} />
    </article>
  );
}
