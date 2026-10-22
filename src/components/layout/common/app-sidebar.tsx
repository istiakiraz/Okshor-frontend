import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { userRoutes } from "@/routes/userRoutes";
import { Route } from "@/types";
import { SearchForm } from "./search-form";
import { Roles } from "@/constants/roles";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let routes: Route[] = [];

  switch (user.role) {
    case Roles.admin:
      routes = adminRoutes;
      break;

    case Roles.user:
      routes = userRoutes;
      break;

    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-medium text-sidebar-foreground/70">
            Theme
          </span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
