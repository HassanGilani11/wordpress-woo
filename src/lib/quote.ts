import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Custom theme development",
  "Custom plugin development",
  "Landing page",
  "SEO setup",
  "WooCommerce store",
  "Not sure yet",
] as const;

export const BUDGET_OPTIONS = ["Under $2k", "$2k–$5k", "$5k–$15k", "$15k+", "Not sure"] as const;

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  service: z.enum(SERVICE_OPTIONS),
  budget: z.enum(BUDGET_OPTIONS),
  message: z.string().trim().min(10, "Please tell us a little more").max(4000),
  // Honeypot: real users never fill this in.
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
