"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, AlertTriangle, CheckCircle, Clock, Bell } from "lucide-react"

interface NotificationCenterProps {
  onClose: () => void
  setActivePage: (page: string) => void
}

export function NotificationCenter({ onClose, setActivePage }: NotificationCenterProps) {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "EPA Filing Due Soon",
      message: "Bakken Site A EPA filing due in 2 days",
      time: "5 minutes ago",
      action: () => setActivePage("compliance"),
    },
    {
      id: 2,
      type: "success",
      title: "Well Plugging Completed",
      message: "Permian Site C successfully completed",
      time: "1 hour ago",
      action: () => setActivePage("campaigns"),
    },
    {
      id: 3,
      type: "warning",
      title: "Schedule Conflict Detected",
      message: "Team Alpha has conflicting assignments",
      time: "2 hours ago",
      action: () => setActivePage("calendar"),
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="absolute top-16 right-6 z-50">
      <Card className="w-80 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Notifications</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={notification.action}
              >
                {getIcon(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-xs text-gray-500">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t">
            <Button variant="outline" size="sm" className="w-full">
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
