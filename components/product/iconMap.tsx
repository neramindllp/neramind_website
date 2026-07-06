import {
  History,
  Filter,
  BarChart3,
  Zap,
  CheckSquare,
  Plug,
  Shield,
  Wallet,
  Boxes,
  Building2,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

/** Resolves the string icon keys used in lib/products.ts to lucide icons. */
const MAP: Record<string, LucideIcon> = {
  history: History,
  filter: Filter,
  barChart: BarChart3,
  zap: Zap,
  checkSquare: CheckSquare,
  plug: Plug,
  shield: Shield,
  wallet: Wallet,
  boxes: Boxes,
  building: Building2,
  cart: ShoppingCart,
};

export function getIcon(name: string): LucideIcon {
  return MAP[name] ?? BarChart3;
}
