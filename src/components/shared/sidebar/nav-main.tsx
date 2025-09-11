"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, LogOut, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      icon?: LucideIcon;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  const handleLogOut = () => {
    Cookies.remove("accessToken", { path: "/" });

    toast.success("Logged out successfully!");

    // Optional: redirect after a short delay so user sees the toast
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[700px]">
      {/* Top menu */}
      <SidebarGroup className="flex-1 overflow-y-auto">
        <SidebarMenu>
          {items?.map((item) => {
            const isActive = item.isActive || pathname === item.url;

            if (item.items && item.items.length > 0) {
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={`${
                          isActive
                            ? "text-primary hover:bg-background/85 bg-background"
                            : ""
                        }`}
                      >
                        {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                {subItem.icon && (
                                  <subItem.icon className="mr-2 h-5 w-5" />
                                )}
                                <span
                                  className={
                                    pathname === subItem.url
                                      ? "text-primary"
                                      : ""
                                  }
                                >
                                  {subItem.title}
                                </span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`${
                    isActive
                      ? "text-primary hover:text-primary/85 font-bold hover:bg-background/85 bg-background py-5"
                      : "py-5 font-medium text-secondary"
                  }`}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>

      {/* Fixed bottom logout button */}
      <div className="mt-auto border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="text-red-600 hover:text-red-700 font-medium"
              onClick={handleLogOut}
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </div>
  );
}
