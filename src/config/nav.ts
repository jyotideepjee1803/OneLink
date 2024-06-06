import { SidebarLink } from "@/components/SidebarItems";
import { Cog, PanelTop, CircleUserRound } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/account", title: "Account", icon: CircleUserRound },
  { href: "/settings", title: "Settings", icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Entities",
    links: [
      {
        href: "/pages",
        title: "Pages",
        icon: PanelTop,
      },
    ],
  },

];

