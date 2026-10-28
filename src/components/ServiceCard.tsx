"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/services";
import { spotlight } from "@/lib/spotlight";
import { ServiceIcon } from "./ServiceIcon";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/${service.slug}`}
      onMouseMove={spotlight}
      className="glass spotlight group flex h-full flex-col overflow-hidden transition-transform duration-500 [transition-timing-function:var(--ease)] hover:-translate-y-1"
    >
      <span className="relative block h-44 overflow-hidden">
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, 90vw"
          className="object-cover object-top transition-transform duration-700 [transition-timing-function:var(--ease)] group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <span className="absolute bottom-3 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-background/70 text-accent-2 ring-1 ring-white/20 backdrop-blur transition-colors duration-500 group-hover:bg-accent-2 group-hover:text-black">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
        <ArrowUpRight
          className="absolute right-5 top-4 h-5 w-5 text-foreground/70 transition-all duration-500 [transition-timing-function:var(--ease)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-2"
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-1 flex-col p-7 pt-5">
        <span className="block text-xl font-medium">{service.name}</span>
        <span className="mt-3 block flex-1 text-sm leading-relaxed text-muted">{service.summary}</span>
        <span className="mt-6 block font-mono text-xs text-accent-2">{service.tags}</span>
      </span>
    </Link>
  );
}
