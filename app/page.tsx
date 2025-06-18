"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { CampaignManager } from "@/components/campaign-manager"
import { TaskBoard } from "@/components/task-board"
import { AvailabilityCalendar } from "@/components/availability-calendar"
import { ComplianceTracking } from "@/components/compliance-tracking"
import { DataImport } from "@/components/data-import"
import { CostAnalytics } from "@/components/cost-analytics"
// import { MapView } from "@/components/map-view"
// import { UserManagement } from "@/components/user-management"
// import { Settings } from "@/components/settings"
import { NotificationCenter } from "@/components/notification-center"

export default function App() {
  const [activePage, setActivePage] = useState("dashboard")
  const [showNotifications, setShowNotifications] = useState(false)

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard setActivePage={setActivePage} />
      case "campaigns":
        return <CampaignManager setActivePage={setActivePage} />
      case "tasks":
        return <TaskBoard setActivePage={setActivePage} />
      case "calendar":
        return <AvailabilityCalendar setActivePage={setActivePage} />
      case "compliance":
        return <ComplianceTracking setActivePage={setActivePage} />
      case "data":
        return <DataImport setActivePage={setActivePage} />
      case "analytics":
        return <CostAnalytics setActivePage={setActivePage} />
      // Hidden components - keeping imports but not rendering
      // case "map":
      //   return <MapView setActivePage={setActivePage} />
      // case "users":
      //   return <UserManagement setActivePage={setActivePage} />
      // case "settings":
      //   return <Settings setActivePage={setActivePage} />
      default:
        return <Dashboard setActivePage={setActivePage} />
    }
  }

  return (
    <div className="flex h-screen bg-white">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          setActivePage={setActivePage}
        />
        {showNotifications && (
          <NotificationCenter onClose={() => setShowNotifications(false)} setActivePage={setActivePage} />
        )}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">{renderActivePage()}</main>
      </div>
    </div>
  )
}
