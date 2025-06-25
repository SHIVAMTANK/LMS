"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Users,
  FileText,
  PlusCircle,
  Video,
  Layout,
  HelpCircle,
  Grid3X3,
  UserCog,
  ShoppingCart,
  UserCheck,
  Settings,
  LogOut,
  GraduationCap,
  Home,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ThemeSwitcher from "../../../utils/ThemeSwitcher"
import { useSelector } from "react-redux"
import defaultAvatar from '../../../../public/avatar.png'

// Define item props type
type ItemProps = {
  title: string
  url: string
  icon: React.ElementType
  section: string
  isActive: boolean
  onClick: () => void
  collapsed: boolean
}

// Menu items organized by sections
const dashboardItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
    section: "dashboard",
  },
]

const dataItems = [
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    section: "data",
  },
  {
    title: "Invoices",
    url: "/admin/invoices",
    icon: FileText,
    section: "data",
  },
]

const contentItems = [
  {
    title: "Create Course",
    url: "/admin/create-course",
    icon: PlusCircle,
    section: "content",
  },
  {
    title: "Live Courses",
    url: "/admin/courses",
    icon: Video,
    section: "content",
  },
]

const customizationItems = [
  {
    title: "Hero",
    url: "/admin/hero",
    icon: Layout,
    section: "customization",
  },
  {
    title: "FAQ",
    url: "/admin/faq",
    icon: HelpCircle,
    section: "customization",
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Grid3X3,
    section: "customization",
  },
]

const controllersItems = [
  {
    title: "Manage Team",
    url: "/admin/team",
    icon: UserCog,
    section: "controllers",
  },
]

const analyticsItems = [
  {
    title: "Course Analytics",
    url: "/admin/courses-analytics",
    icon: BarChart3,
    section: "analytics",
  },
  {
    title: "Orders Analytics",
    url: "/admin/orders-analytics",
    icon: ShoppingCart,
    section: "analytics",
  },
  {
    title: "Users Analytics",
    url: "/admin/users-analytics",
    icon: UserCheck,
    section: "analytics",
  },
]

const extrasItems = [
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
    section: "extras",
  },
  {
    title: "Logout",
    url: "/admin/logout",
    icon: LogOut,
    section: "extras",
  },
]

// Item component
const Item: React.FC<ItemProps> = ({ title, url, icon: Icon, isActive, onClick, collapsed }) => {
  const router = useRouter()

  return (
    <div className="relative group">
      <a
        href={url}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300",
          "hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20",
          "hover:text-white hover:scale-105 hover:shadow-lg",
          isActive && "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border-l-4 border-blue-500",
          collapsed && "justify-center px-0 py-2",
        )}
        onClick={(e) => {
          e.preventDefault()
          onClick()
          router.push(url)
        }}
      >
        <Icon
          className={cn(
            "size-5",
            isActive ? "text-blue-300" : "",
            "group-hover:text-blue-300 transition-colors duration-300",
          )}
        />
        {!collapsed && (
          <span
            className={cn(isActive ? "text-blue-100" : "", "group-hover:text-blue-100 transition-colors duration-300")}
          >
            {title}
          </span>
        )}
        {!collapsed && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out rounded-md" />
        )}
      </a>
      {collapsed && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          {title}
        </div>
      )}
    </div>
  )
}

export function AppSidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [isLaptopOrLarger, setIsLaptopOrLarger] = useState(false)

  // Check if screen is laptop or larger
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLaptopOrLarger(window.innerWidth >= 1024)
    }

    // Initial check
    checkScreenSize()

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // Get user data from Redux
  const { user } = useSelector((state: any) => state.auth)

  // Function to set active item
  const handleSetActive = (section: string, item: string) => {
    setActiveSection(section)
    setActiveItem(item)
  }

  // Calculate sidebar width based on state and screen size
  const sidebarWidth = sidebarCollapsed ? (isLaptopOrLarger ? "w-20" : "w-16") : isLaptopOrLarger ? "w-80" : "w-64"

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 left-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 transition-all duration-300 border-r border-white/10 z-40",
          sidebarWidth,
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm p-2 flex items-center justify-between">
            {!sidebarCollapsed && (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    <GraduationCap className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Learnex
                    </span>
                  </div>
                </div>
              </>
            )}
            {sidebarCollapsed && (
              <div className="flex aspect-square size-8 mx-auto items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                <GraduationCap className="size-4" />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-blue-500/20 transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              <span className="sr-only">{sidebarCollapsed ? "Expand" : "Collapse"} Sidebar</span>
            </Button>
          </div>

          {/* Content */}
          <div className={cn("flex-1", sidebarCollapsed ? "overflow-hidden" : "overflow-y-auto")}>
            {/* User Profile Section */}
            <div className="p-2">
              <div className="rounded-md hover:bg-blue-500/20 transition-all duration-300 p-2 flex items-center gap-2">
                <Avatar
                  className={cn(
                    "rounded-lg ring-2 ring-blue-400/50 hover:ring-blue-400 transition-all duration-300",
                    isLaptopOrLarger ? "h-10 w-10" : "h-8 w-8",
                  )}
                >
                  <AvatarImage src={user?.avatar || defaultAvatar} alt="Avatar" />
                  <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {user?.name
                      ? user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                {!sidebarCollapsed && (
                  <div className="grid flex-1 text-left leading-tight">
                    <span
                      className={cn(
                        "truncate font-semibold hover:text-blue-300 transition-colors duration-300",
                        isLaptopOrLarger ? "text-base" : "text-sm",
                      )}
                    >
                      {user?.name || "User"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground hover:text-blue-400 transition-colors duration-300">
                      {user?.role || "Admin"}
                    </span>
                  </div>
                )}
                {/* {!sidebarCollapsed && <ThemeSwitcher />} */}
              </div>
            </div>

            {/* Dashboard */}
            <div className="mt-2">
              {dashboardItems.map((item) => (
                <Item
                  key={item.title}
                  {...item}
                  isActive={activeSection === item.section && activeItem === item.title}
                  onClick={() => handleSetActive(item.section, item.title)}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </div>

            {/* Data Section */}
            <div className="mt-4">
              {!sidebarCollapsed && (
                <div className={cn("px-3 text-xs text-gray-400 mb-1", isLaptopOrLarger && "text-sm")}>Data</div>
              )}
              {dataItems.map((item) => (
                <Item
                  key={item.title}
                  {...item}
                  isActive={activeSection === item.section && activeItem === item.title}
                  onClick={() => handleSetActive(item.section, item.title)}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </div>

            {/* Content Section */}
            <div className="mt-4">
              {!sidebarCollapsed && (
                <div className={cn("px-3 text-xs text-gray-400 mb-1", isLaptopOrLarger && "text-sm")}>Content</div>
              )}
              {contentItems.map((item) => (
                <Item
                  key={item.title}
                  {...item}
                  isActive={activeSection === item.section && activeItem === item.title}
                  onClick={() => handleSetActive(item.section, item.title)}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </div>

            {/* Customization Section */}
            <div className="mt-4">
              {!sidebarCollapsed && (
                <div className={cn("px-3 text-xs text-gray-400 mb-1", isLaptopOrLarger && "text-sm")}>
                  Customization
                </div>
              )}
              {customizationItems.map((item) => (
                <Item
                  key={item.title}
                  {...item}
                  isActive={activeSection === item.section && activeItem === item.title}
                  onClick={() => handleSetActive(item.section, item.title)}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </div>

            {/* Controllers Section */}
            <div className="mt-4">
              {!sidebarCollapsed && (
                <div className={cn("px-3 text-xs text-gray-400 mb-1", isLaptopOrLarger && "text-sm")}>Controllers</div>
              )}
              {controllersItems.map((item) => (
                <Item
                  key={item.title}
                  {...item}
                  isActive={activeSection === item.section && activeItem === item.title}
                  onClick={() => handleSetActive(item.section, item.title)}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </div>

            {/* Analytics Section */}
            <div className="mt-4">
              {!sidebarCollapsed && (
                <div className={cn("px-3 text-xs text-gray-400 mb-1", isLaptopOrLarger && "text-sm")}>Analytics</div>
              )}
              {analyticsItems.map((item) => (
                <Item
                  key={item.title}
                  {...item}
                  isActive={activeSection === item.section && activeItem === item.title}
                  onClick={() => handleSetActive(item.section, item.title)}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm p-2">
            {extrasItems.map((item) => (
              <Item
                key={item.title}
                {...item}
                isActive={activeSection === item.section && activeItem === item.title}
                onClick={() => handleSetActive(item.section, item.title)}
                collapsed={sidebarCollapsed}
              />
            ))}
            {/* Theme Switcher for collapsed sidebar */}
            {sidebarCollapsed && (
              <div className="flex justify-center mt-2">
                {/* <ThemeSwitcher /> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? (isLaptopOrLarger ? "ml-20" : "ml-16") : isLaptopOrLarger ? "ml-80" : "ml-64",
        )}
      />
    </>
  )
}
