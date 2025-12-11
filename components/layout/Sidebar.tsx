"use client";
import React from "react";
import { Menu, X } from "lucide-react";
import SidebarLink from "@/components/ui/SidebarLink";
import { useState } from "react";
import { siteMap } from "@/lib/constants/siteMap";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (isOpen === false) {
    return (
      <div className="fixed w-[60px] h-full bg-primary ease-in-out duration-300">
        <div className="flex flex-col px-4 py-10 justify-center items-center">
          <button
            onClick={() => setIsOpen(true)}
            className=" px-1 py-1 hover:bg-sidebar-hover rounded-l cursor-pointer"
          >
            <Menu color="white" size={24} />
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed w-[260px] h-full bg-primary ease-in-out duration-300">
      <div className="flex flex-col px-4 py-10 justify-center gap-4">
        <div className="flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className=" p-1 hover:bg-sidebar-hover rounded-l cursor-pointer"
          >
            <X color="white" size={24} />
          </button>
        </div>

        <div className="flex justify-left">
          <div className="text-white text-xl">Car Production Manager</div>
        </div>

        {siteMap.map(({ href, label, Icon }) => (
          <SidebarLink key={href} href={href} label={label} Icon={Icon} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
