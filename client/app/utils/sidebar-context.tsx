"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type SidebarContextType = {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  activeSection: string
  activeItem: string
  setActive: (section: string, item: string) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [activeItem, setActiveItem] = useState("Dashboard")

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)

  const setActive = (section: string, item: string) => {
    setActiveSection(section)
    setActiveItem(item)
  }

  return (
    <SidebarContext.Provider
      value={{
        sidebarCollapsed,
        toggleSidebar,
        activeSection,
        activeItem,
        setActive,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarContext() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebarContext must be used within a SidebarProvider")
  }
  return context
}
