import { LucideIcon } from "lucide-react";

export type SidebarLinkProps = {
  href: string;
  label: string;
  Icon?: LucideIcon;
  Subpages?: SidebarLinkProps[];
};
