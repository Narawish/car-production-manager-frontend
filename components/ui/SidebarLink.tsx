import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SidebarLinkProps } from "@/types/common.types";

const SidebarLink = ({ href, label, Icon, Subpages }: SidebarLinkProps) => {
  return (
    <div className="flex py-4 pl-4 rounded-l-2xl hover:bg-sidebar-hover">
      <Link href={href}>
        <div className="flex gap-4 items-center">
          {Icon && <Icon size={24} color="white" />}
          {!Icon && <div style={{ width: 24, height: 24 }}></div>}
          <div className="text-base text-white">{label}</div>
        </div>
      </Link>
    </div>
  );
};

export default SidebarLink;
