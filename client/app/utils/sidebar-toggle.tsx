"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useSidebarContext } from "./sidebar-context"

export function SidebarToggle() {
  const { toggleSidebar } = useSidebarContext()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="fixed left-4 top-4 z-50 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:bg-blue-500/30 transition-colors shadow-lg"
    >
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Show Sidebar</span>
    </Button>
  )
}
