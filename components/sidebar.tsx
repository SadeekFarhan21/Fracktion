"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, MapPin, Kanban, Calendar, Shield, FileSpreadsheet, BarChart3 } from "lucide-react"

interface SidebarProps {
  activePage: string
  setActivePage: (page: string) => void
}

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "campaigns", label: "Campaigns", icon: MapPin, badge: "3" },
    { id: "tasks", label: "Task Board", icon: Kanban, badge: "12" },
    { id: "calendar", label: "Calendar", icon: Calendar, badge: "2" },
    { id: "compliance", label: "Compliance", icon: Shield, badge: "!" },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    // { id: "map", label: "Map View", icon: Map },
    { id: "data", label: "Data Import", icon: FileSpreadsheet },
    // { id: "users", label: "Users", icon: Users },
    // { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Fracktion</h1>
        <p className="text-sm text-gray-500 mt-1">Well Plugging Management</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activePage === item.id ? "secondary" : "ghost"}
                className="w-full justify-start text-left h-10 relative"
                onClick={() => setActivePage(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
                {item.badge && (
                  <Badge variant={item.badge === "!" ? "destructive" : "secondary"} className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-col items-center space-y-2">
          <Image 
            src="/vercel.svg" 
            alt="Vercel Logo" 
            width={80} 
            height={20}
            className="opacity-60 hover:opacity-100 transition-opacity duration-200"
          />
          <div className="text-xs text-gray-500 text-center">Demo Version v1.0</div>
        </div>
      </div>
    </div>
  )
}
