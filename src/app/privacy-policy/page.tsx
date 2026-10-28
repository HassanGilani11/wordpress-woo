import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How SyntexDev handles information submitted through this site.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-8 pt-36">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-semibold tracking-tight text-5xl">Privacy policy</h1>
      <div className="glass mt-10 space-y-4 p-8 text-muted">
        <p><strong className="text-foreground">Draft, pending legal review.</strong></p>
        <p>
          When you submit the quote form we collect your name, email and project details. We use them only to reply to
          your enquiry and do not sell them.
        </p>
        <p>We keep enquiries only as long as needed to handle them. To request deletion, email {SITE.email}.</p>
      </div>
    </section>
  );
}
