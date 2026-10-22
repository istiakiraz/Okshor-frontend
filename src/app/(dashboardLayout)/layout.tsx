import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AppSidebar } from "@/components/layout/common/app-sidebar";
import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";

export default async function DashboardLayout({
  admin,
  user,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const { data } = await userService.getSession();

  const userInfo = data.user;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SidebarProvider>
        <AppSidebar user={userInfo} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-border px-4 transition-[width,height] ease-linear">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-6">
            {userInfo.role === Roles.admin ? admin : user}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
