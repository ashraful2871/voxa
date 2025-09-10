"use client";
import AppSidebar from "@/components/shared/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useDecodedToken } from "@/hooks/useDecodedToken";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import logo from "@/assets/dashboard/logo.png";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import profile from "@/assets/dashboard/admin-profile.png";
import UserSidebar from "@/components/shared/user-sidebar/UserSidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector((state) => state.auth.token);
  const decodedToken = useDecodedToken(token);
  const role = decodedToken?.role || "ADMIN";

  const pathname = usePathname();

  return (
    <div className="bg-background">
      <SidebarProvider>
        {/* Pass the user role dynamically to AppSidebar */}
        <AppSidebar role={role} />
        <SidebarInset>
          <header className="flex h-20 b px-5 pt-5  shrink-0 bg-background  items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            {/* <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div> */}
            <div className="flex justify-between w-full">
              <div>
                <Image src={logo} width={185} height={40} alt="" />
              </div>
              <div className="relative xl:max-w-3xl lg:max-w-md md:max-w-sm xl:-ml-0 lg:-ml-9 w-full border-white/20 rounded-lg">
                <Input
                  className="peer border !border-white/20 text-white ps-9 w-full"
                  placeholder="Search by user name, or ID"
                  type="text"
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <IoSearchOutline className="text-white" aria-hidden="true" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <Image src={profile} height={40} width={40} alt="" />
                </div>
                <div className="text-white text-sm">
                  <h3 className="font-bold">Noah kamodoc</h3>
                  <p className="font-medium">Voxa Admin</p>
                </div>
              </div>
            </div>
          </header>
          <div className="p-4 pt-0  h-[1050px]">{children}</div>
        </SidebarInset>
        {pathname !== "/admin/overview" && <UserSidebar />}
      </SidebarProvider>
    </div>
  );
}
