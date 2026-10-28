import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/content/services";
import { SITE } from "@/content/site";

export function Footer() {
  return (
    <footer className="px-4 pb-8 pt-24">
      <div className="glass mx-auto max-w-6xl p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src={SITE.logo} alt="SyntexDev" width={240} height={56} className="h-14 w-auto" />
            <p className="mt-6 text-4xl font-semibold leading-tight tracking-tight">
              Build it <span className="text-gradient">properly.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted">{SITE.description}</p>
            <Link href="/get-a-quote" className="btn-primary mt-6">Get a quote</Link>
          </div>
          <nav aria-label="Services">
            <p className="eyebrow">Services</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="transition-colors hover:text-white">{s.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="SyntexDev">
            <p className="eyebrow">SyntexDev</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><a href={SITE.parentUrl} className="transition-colors hover:text-white">Main site</a></li>
              <li><a href={`${SITE.parentUrl}/about-us-syntexdev/`} className="transition-colors hover:text-white">About us</a></li>
              <li><a href={`${SITE.parentUrl}/services/`} className="transition-colors hover:text-white">All services</a></li>
              <li><a href={`${SITE.parentUrl}/blog/`} className="transition-colors hover:text-white">Blog</a></li>
              <li><Link href="/privacy-policy" className="transition-colors hover:text-white">Privacy policy</Link></li>
              <li><a href={`mailto:${SITE.email}`} className="transition-colors hover:text-white">{SITE.email}</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted">© {new Date().getFullYear()} SyntexDev. All rights reserved.</p>
    </footer>
  );
}
