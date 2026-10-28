import { LayoutTemplate, Plug, Rocket, Search, ShoppingCart } from "lucide-react";
import type { IconName } from "@/content/services";

const ICONS = { layout: LayoutTemplate, plug: Plug, rocket: Rocket, search: Search, cart: ShoppingCart };

export function ServiceIcon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
