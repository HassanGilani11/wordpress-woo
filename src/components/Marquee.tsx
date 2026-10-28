const ITEMS = [
  "WordPress", "WooCommerce", "Elementor", "Gutenberg", "Advanced Custom Fields",
  "Rank Math", "Yoast SEO", "Stripe", "REST API", "Core Web Vitals",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="marquee relative overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      aria-label="Technologies we work with"
    >
      <div className="marquee-track flex gap-12">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap font-mono text-sm uppercase tracking-widest text-muted">
            {t}
            <span className="h-1 w-1 rounded-full bg-accent-2" aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}
