import Image from "next/image";

// Glass window around a project screenshot.
export function ImageFrame({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  chrome = true,
  aspect = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  chrome?: boolean;
  aspect?: string;
}) {
  return (
    <div className={`glass overflow-hidden ${className}`}>
      {chrome && (
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </div>
      )}
      <div className={`relative ${aspect}`}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
      </div>
    </div>
  );
}
