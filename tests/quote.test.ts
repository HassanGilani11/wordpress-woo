import { describe, expect, it } from "vitest";
import { quoteSchema } from "@/lib/quote";
import { SERVICES } from "@/content/services";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  service: "WooCommerce store",
  budget: "$5k–$15k",
  message: "We need a WooCommerce store with ERP sync.",
};

describe("quoteSchema", () => {
  it("accepts a valid request", () => {
    expect(quoteSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects a bad email", () => {
    expect(quoteSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
  });
  it("rejects a filled honeypot", () => {
    expect(quoteSchema.safeParse({ ...valid, website: "http://spam" }).success).toBe(false);
  });
  it("rejects a too-short message", () => {
    expect(quoteSchema.safeParse({ ...valid, message: "hi" }).success).toBe(false);
  });
});

describe("services content", () => {
  it("has unique slugs and complete sections", () => {
    const slugs = SERVICES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of SERVICES) {
      expect(s.included.length).toBeGreaterThan(0);
      expect(s.process.length).toBe(4);
      expect(s.faq.length).toBeGreaterThanOrEqual(4);
      expect(s.metaDescription.length).toBeLessThanOrEqual(160);
    }
  });
});
