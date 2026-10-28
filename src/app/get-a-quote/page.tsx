import { Mail } from "lucide-react";
import { Headline } from "@/components/Headline";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/content/site";
import { SERVICE_OPTIONS } from "@/lib/quote";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Get a Quote",
  description: "Tell us about your WordPress or WooCommerce project and get a reply within two business days.",
  path: "/get-a-quote",
});

const NAME_TO_OPTION: Record<string, string> = {
  "Custom Theme Development": "Custom theme development",
  "Custom Plugin Development": "Custom plugin development",
  "Landing Page Design & Build": "Landing page",
  "SEO Setup": "SEO setup",
  "WooCommerce Store Setup": "WooCommerce store",
};

const NEXT = [
  { t: "We read your message", d: "And note any questions about scope or content." },
  { t: "You hear back in two business days", d: "With questions or an estimate." },
  { t: "We confirm scope on a short call", d: "If it looks like a fit." },
];

export default async function QuotePage({ searchParams }: PageProps<"/get-a-quote">) {
  const sp = await searchParams;
  const raw = typeof sp.service === "string" ? sp.service : undefined;
  const mapped = raw ? NAME_TO_OPTION[raw] : undefined;
  const defaultService = SERVICE_OPTIONS.find((o) => o === mapped);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-8 pt-36">
      <header className="max-w-3xl">
        <p className="eyebrow">/ get a quote</p>
        <Headline
          inline
          className="mt-4 text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-[1.05] tracking-tight"
          segments={[{ t: "Tell us what you" }, { t: "need.", em: true }]}
        />
        <Reveal delay={0.4}>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Share a few details about your site or store. We reply within two business days.
          </p>
        </Reveal>
      </header>

      <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_1.25fr]">
        <div className="flex flex-col gap-6">
          <Reveal delay={0.15} className="flex-1">
            <div className="glass flex h-full flex-col p-7">
              <h2 className="text-xl font-medium">What happens next</h2>
              <ol className="mt-6 flex flex-1 flex-col justify-around gap-5">
                {NEXT.map((n, i) => (
                  <li key={n.t} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent font-mono text-xs">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-medium">{n.t}</span>
                      <span className="block text-sm text-muted">{n.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <a href={`mailto:${SITE.email}`} className="glass glass-sm flex items-center gap-4 p-5 transition-colors hover:bg-white/10">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-2/15 text-accent-2">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted">Prefer email?</span>
                <span className="block font-medium">{SITE.email}</span>
              </span>
            </a>
          </Reveal>

        </div>

        <Reveal delay={0.2}>
          <QuoteForm defaultService={defaultService} />
        </Reveal>
      </div>
    </section>
  );
}
