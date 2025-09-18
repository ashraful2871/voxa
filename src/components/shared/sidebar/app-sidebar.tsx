"use client";

// import Logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";


const data = {
  // user: {
  //   navMain: [
  //     {
  //       title: "Dashboard",
  //       url: "/user",
  //       icon: LayoutDashboard,
  //     },
  //     {
  //       title: "Your Profile",
  //       url: "/user/dashboard/profile",
  //       icon: User,
  //     },
  //     {
  //       title: "Go Back To Home",
  //       url: "/",
  //       icon: Home,
  //     },
  //   ],
  // },
  admin: {
    navMain: [
      {
        title: "Overview",
        url: "/admin/overview",
      },
      // {
      //   title: "Users",
      //   url: "/user/dashboard/users",

      //   items: [
      //     {
      //       title: "Users",
      //       url: "/user/dashboard/estimates",

      //     },
      //     {
      //       title: "Pending Users",
      //       url: "/user/dashboard/pending-users",

      //     },
      //   ],
      // },
      {
        title: "User Management",
        url: "/admin/user-management",
      },
      {
        title: "Voice Moderation",
        url: "/admin/voice-moderation",
      },
      {
        title: "Verifications",
        url: "/admin/verifications",
      },
      {
        title: "Reports",
        url: "/admin/reports",
      },
      {
        title: "Subscriptions",
        url: "/admin/subscriptions",
      },
    ],
  },
};

// add roles based on your requirements
interface AppSidebarProps {
  role: string;
}

export default function AppSidebar({ role, ...props }: AppSidebarProps) {
  const sidebarData = data[role?.toLowerCase() as keyof typeof data];

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 absolute z-[1] mt-20 mx-5 "
      {...props}
    >
      <SidebarHeader>
        {/* <Link
          href={"/"}
          className="flex items-center w-full max-h-40 justify-center"
        >
          <Image
            src={Logo.src}
            alt="Logo"
            width={300}
            height={300}
            className="size-auto "
          />
        </Link> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData?.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
