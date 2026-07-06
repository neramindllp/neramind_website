import {
  BrainCircuit,
  ScanEye,
  MessagesSquare,
  LineChart,
  Workflow,
  Database,
  Code2,
  AppWindow,
  Smartphone,
  Package,
  PlugZap,
  LifeBuoy,
  Search,
  Ruler,
  Hammer,
  Rocket,
  Globe,
  GraduationCap,
  FileText,
  Plane,
  Coins,
  Building2,
  Cloud,
  Users,
  Award,
  Briefcase,
  Compass,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

/**
 * General string-key → lucide icon registry, so serializable data modules
 * (lib/services.ts etc.) can be passed from Server Components into Client
 * Components without sending icon functions across the RSC boundary.
 */
const REGISTRY: Record<string, LucideIcon> = {
  brainCircuit: BrainCircuit,
  scanEye: ScanEye,
  messages: MessagesSquare,
  lineChart: LineChart,
  workflow: Workflow,
  database: Database,
  code: Code2,
  appWindow: AppWindow,
  smartphone: Smartphone,
  package: Package,
  plugZap: PlugZap,
  lifeBuoy: LifeBuoy,
  search: Search,
  ruler: Ruler,
  hammer: Hammer,
  rocket: Rocket,
  globe: Globe,
  graduationCap: GraduationCap,
  fileText: FileText,
  plane: Plane,
  coins: Coins,
  building: Building2,
  cloud: Cloud,
  users: Users,
  award: Award,
  briefcase: Briefcase,
  compass: Compass,
  listChecks: ListChecks,
};

export function getIcon(name: string): LucideIcon {
  return REGISTRY[name] ?? Code2;
}
