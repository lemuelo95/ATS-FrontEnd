import { NavLink } from "react-router-dom"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({ items }) {
  return (
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                          `w-full ${
                              isActive ? "bg-muted text-primary" : "text-muted-foreground"
                          }`
                      }
                  >
                    <SidebarMenuButton
                        tooltip={item.title}
                        className="flex items-center gap-2 w-full"
                    >
                      {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
  )
}
