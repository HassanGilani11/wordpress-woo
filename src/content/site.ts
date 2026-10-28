export const SITE = {
  name: "SyntexDev WordPress & WooCommerce",
  shortName: "SyntexDev WP",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wp.syntexdev.com",
  parentUrl: "https://syntexdev.com",
  parentName: "SyntexDev",
  logo: "/brand/syntexdev-white-logo.webp",
  email: "info@syntexdev.com",
  tagline: "WordPress & WooCommerce, built to convert.",
  description:
    "Custom WordPress themes, plugins, landing pages, SEO setup and WooCommerce store builds from the SyntexDev team.",
} as const;

export const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/get-a-quote", label: "Get a Quote" },
] as const;
