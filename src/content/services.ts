// NOTE: timelines and FAQ answers are placeholders until confirmed by SyntexDev.
export type IconName = "layout" | "plug" | "rocket" | "search" | "cart";

export type Service = {
  slug: string;
  icon: IconName;
  name: string;
  summary: string;
  tags: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  included: string[];
  process: { title: string; text: string }[];
  deliverables: string[];
  timeline: string;
  faq: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "custom-wordpress-theme-development",
    tags: "Design-to-code • Accessible • Fast",
    image: "/work/reptile-park.png",
    icon: "layout",
    name: "Custom Theme Development",
    summary: "Hand-built, fast, accessible themes designed around your brand, with no bloated templates.",
    metaTitle: "Custom WordPress Theme Development",
    metaDescription:
      "Bespoke WordPress themes built from your design: fast, accessible, block-editor ready and easy for your team to manage.",
    included: [
      "Design-to-code build from your Figma or brand guidelines",
      "Block editor and page-builder friendly templates",
      "Responsive layouts and WCAG 2.2 AA accessibility",
      "Performance tuning for Core Web Vitals",
      "Child-theme-safe structure and clean, documented code",
    ],
    process: [
      { title: "Discover", text: "We review your brand, content and goals." },
      { title: "Design", text: "Layouts are agreed before any code is written." },
      { title: "Build", text: "Theme development with weekly check-ins." },
      { title: "Launch", text: "QA, migration and go-live support." },
    ],
    deliverables: ["Production theme", "Style guide", "Editor training notes", "30-day post-launch support"],
    timeline: "Typically 3–6 weeks (placeholder)",
    faq: [
      { q: "Can you work from our existing design?", a: "Yes. We build from Figma, Sketch or a brand guide." },
      { q: "Will we be able to edit content ourselves?", a: "Yes. Themes are built so your team can edit without developers." },
      { q: "Do you support Elementor or Gutenberg?", a: "Both. We pick whichever fits your team's workflow." },
      { q: "Is the theme SEO-ready?", a: "Yes. Semantic markup, fast loading and schema support are built in." },
    ],
  },
  {
    slug: "custom-wordpress-plugin-development",
    tags: "Secure • REST API • Tested",
    image: "/work/dhgate.png",
    icon: "plug",
    name: "Custom Plugin Development",
    summary: "Secure, maintainable plugins and integrations that do exactly what your business needs.",
    metaTitle: "Custom WordPress Plugin Development",
    metaDescription:
      "Custom WordPress plugins and API integrations: secure, documented and built to WordPress coding standards.",
    included: [
      "Requirements workshop and technical specification",
      "Secure code: nonces, capability checks, sanitised input",
      "Admin settings screens and custom blocks or widgets",
      "REST API and third-party integrations (ERP, CRM, payments)",
      "Automated tests and developer documentation",
    ],
    process: [
      { title: "Specify", text: "We define scope, data and edge cases." },
      { title: "Prototype", text: "A working slice you can try early." },
      { title: "Build", text: "Iterative development with tests." },
      { title: "Hand over", text: "Docs, deployment and support." },
    ],
    deliverables: ["Installable plugin", "Source and documentation", "Test suite", "Update path for future versions"],
    timeline: "Typically 2–8 weeks depending on scope (placeholder)",
    faq: [
      { q: "Who owns the code?", a: "You do. We hand over full source on delivery." },
      { q: "Can you extend an existing plugin?", a: "Yes. We can extend or safely fork where licences allow." },
      { q: "How do you keep plugins secure?", a: "Capability checks, nonces, escaping and sanitising are standard in every build." },
      { q: "Do you maintain plugins after launch?", a: "Yes. Support plans are available." },
    ],
  },
  {
    slug: "landing-page-design-development",
    tags: "Conversion • Tracking • A/B-ready",
    image: "/work/purepaws.png",
    icon: "rocket",
    name: "Landing Page Design & Build",
    summary: "Conversion-focused landing pages that load instantly and are ready for campaigns.",
    metaTitle: "Landing Page Design & Development",
    metaDescription:
      "High-converting landing pages for WordPress: clear messaging, fast load times, tracking and A/B-test ready.",
    included: [
      "Conversion-focused layout and copy guidance",
      "Lead forms with spam protection",
      "Analytics, pixel and event tracking setup",
      "Mobile-first, sub-2-second load targets",
      "A/B-test-ready sections",
    ],
    process: [
      { title: "Brief", text: "Offer, audience and success metric." },
      { title: "Wireframe", text: "Structure before styling." },
      { title: "Build", text: "Design and development in one pass." },
      { title: "Optimise", text: "Measure, then improve." },
    ],
    deliverables: ["Live landing page", "Tracking configured", "Form notifications", "Optimisation notes"],
    timeline: "Typically 1–2 weeks (placeholder)",
    faq: [
      { q: "Do you write the copy?", a: "We can guide or write it, depending on your needs." },
      { q: "Can it plug into our CRM?", a: "Yes. Common CRMs and email tools are supported." },
      { q: "Will it work with ad campaigns?", a: "Yes. Tracking and UTM handling are included." },
      { q: "Can we reuse the design?", a: "Yes. Sections are modular for later pages." },
    ],
  },
  {
    slug: "wordpress-seo-setup",
    tags: "Schema • Sitemaps • Redirects",
    image: "/work/krispy-kreme.png",
    icon: "search",
    name: "SEO Setup",
    summary: "Technical SEO, schema, sitemaps and redirects configured properly the first time.",
    metaTitle: "WordPress SEO Setup & Technical SEO",
    metaDescription:
      "Technical SEO for WordPress: Rank Math or Yoast configuration, schema markup, sitemaps, redirects and Core Web Vitals.",
    included: [
      "Technical SEO audit and fix list",
      "Rank Math or Yoast configuration",
      "Schema markup (Organization, Service, FAQ, Product)",
      "XML sitemaps, robots.txt and canonical setup",
      "301 redirect mapping for migrations",
      "Core Web Vitals improvements",
    ],
    process: [
      { title: "Audit", text: "Crawl, index and speed review." },
      { title: "Plan", text: "Prioritised fixes and keyword map." },
      { title: "Implement", text: "Configuration and on-page work." },
      { title: "Monitor", text: "Search Console tracking and reports." },
    ],
    deliverables: ["Audit report", "Configured SEO plugin", "Schema and sitemap live", "Redirect map"],
    timeline: "Typically 1–3 weeks (placeholder)",
    faq: [
      { q: "Rank Math or Yoast?", a: "We configure either, and recommend one based on your needs." },
      { q: "Can you migrate SEO during a redesign?", a: "Yes. Redirect and metadata migration is a core service." },
      { q: "Do you guarantee rankings?", a: "No one honestly can. We fix what's in our control and report transparently." },
      { q: "Do you handle local SEO?", a: "Yes. Local schema and listings are covered on request." },
    ],
  },
  {
    slug: "woocommerce-store-setup",
    tags: "Payments • Shipping • Tax",
    image: "/work/dhgate.png",
    icon: "cart",
    name: "WooCommerce Store Setup",
    summary: "Stores that are configured to sell: products, shipping, tax, payments and a smooth checkout.",
    metaTitle: "WooCommerce Store Setup & Configuration",
    metaDescription:
      "WooCommerce store configuration: products, shipping, tax, payment gateways, checkout optimisation and ERP integrations.",
    included: [
      "Product, category and attribute structure",
      "Shipping zones, table rates and carrier integrations",
      "Tax setup and compliant checkout",
      "Payment gateways (Stripe, WooPayments and more)",
      "Checkout optimisation and B2B/wholesale options",
      "ERP, inventory and product-feed sync",
    ],
    process: [
      { title: "Plan", text: "Catalogue, rules and integrations mapped." },
      { title: "Configure", text: "Store, payments, shipping and tax." },
      { title: "Test", text: "Full order-flow testing." },
      { title: "Launch", text: "Go-live, monitoring and support." },
    ],
    deliverables: ["Configured store", "Tested checkout", "Admin training", "Launch checklist"],
    timeline: "Typically 3–8 weeks (placeholder)",
    faq: [
      { q: "Can you migrate our existing store?", a: "Yes. Products, customers and orders can be migrated." },
      { q: "Do you support B2B pricing?", a: "Yes. Wholesale tiers and quotes are supported." },
      { q: "Can it sync with our ERP?", a: "Yes. We build custom integrations." },
      { q: "Which payment gateways?", a: "Stripe, WooPayments and others, depending on your region." },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

export const HOME_FAQ = [
  { q: "What do you build?", a: "Custom WordPress themes and plugins, landing pages, SEO setups and WooCommerce stores." },
  { q: "Do you work with businesses outside Australia?", a: "Yes. We work with clients remotely worldwide." },
  { q: "How do quotes work?", a: "Send the quote form. We reply with questions or an estimate, usually within two business days." },
  { q: "Will I own the code?", a: "Yes. You receive full source and documentation." },
];

// PLACEHOLDER case studies. Replace with real projects before launch.
export const PORTFOLIO = [
  { title: "Krispy Kreme", tag: "Retail integration", text: "Retail and ecommerce integration work.", image: "/work/krispy-kreme.png" },
  { title: "Australian Reptile Park", tag: "Tourism and ticketing", text: "Ticketing and visitor experience website.", image: "/work/reptile-park.png" },
  { title: "PurePaws", tag: "Product platform", text: "Pet health platform with a conversion-focused front end.", image: "/work/purepaws.png" },
  { title: "DHgate", tag: "Marketplace", text: "Marketplace storefront and integrations.", image: "/work/dhgate.png" },
];
