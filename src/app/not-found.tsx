import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-48 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-semibold tracking-tight text-5xl">This page <span className="text-gradient">isn&apos;t here.</span></h1>
      <p className="mt-3 text-muted">The link may be old or mistyped.</p>
      <Link href="/" className="btn-primary mt-8">Back to home</Link>
    </section>
  );
}
