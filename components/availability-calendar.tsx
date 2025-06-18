"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, ChevronRight, Users, AlertTriangle, CheckCircle, Clock, CalendarIcon } from "lucide-react"

interface AvailabilityCalendarProps {
  setActivePage: (page: string) => void
}

export function AvailabilityCalendar({ setActivePage }: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [currentWeek, setCurrentWeek] = useState(new Date())

  const teamMembers = [
    { id: 1, name: "John Smith", role: "Site Supervisor", status: "available", conflicts: 0 },
    { id: 2, name: "Sarah Johnson", role: "Equipment Operator", status: "busy", conflicts: 1 },
    { id: 3, name: "Mike Davis", role: "Safety Inspector", status: "available", conflicts: 0 },
    { id: 4, name: "Lisa Wilson", role: "Compliance Officer", status: "conflict", conflicts: 2 },
    { id: 5, name: "Tom Brown", role: "Field Technician", status: "available", conflicts: 0 },
    { id: 6, name: "Anna Garcia", role: "Environmental Specialist", status: "busy", conflicts: 0 },
  ]

  const scheduledTasks = [
    {
      id: 1,
      title: "Site Inspection - Bakken A",
      time: "09:00 - 12:00",
      assignee: "John Smith",
      status: "confirmed",
      hasConflict: false,
    },
    {
      id: 2,
      title: "Equipment Delivery - Eagle Ford B",
      time: "14:00 - 16:00",
      assignee: "Sarah Johnson",
      status: "conflict",
      hasConflict: true,
      conflictReason: "Employee unavailable during scheduled time",
    },
    {
      id: 3,
      title: "Compliance Review - Permian C",
      time: "10:00 - 11:30",
      assignee: "Lisa Wilson",
      status: "pending",
      hasConflict: false,
    },
    {
      id: 4,
      title: "Safety Training Session",
      time: "13:00 - 15:00",
      assignee: "Lisa Wilson",
      status: "conflict",
      hasConflict: true,
      conflictReason: "Double-booked with compliance review",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "busy":
        return "bg-yellow-100 text-yellow-800"
      case "conflict":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "conflict":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Users className="h-4 w-4 text-gray-500" />
    }
  }

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "conflict":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Availability Calendar</h1>
          <p className="text-gray-600">Manage team schedules with conflict detection and calendar synchronization</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setActivePage("calendar")}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Sync with Google Calendar
          </Button>
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Resolve Conflicts
          </Button>
          <Button>Schedule Task</Button>
        </div>
      </div>

      {/* Conflict Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-green-600">
                  {teamMembers.filter((m) => m.status === "available").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Busy</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {teamMembers.filter((m) => m.status === "busy").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conflicts</p>
                <p className="text-2xl font-bold text-red-600">
                  {teamMembers.filter((m) => m.status === "conflict").length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-blue-600">{scheduledTasks.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border" />

            <div className="mt-4 space-y-2">
              <Button className="w-full" variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                View Week
              </Button>
              <Button className="w-full" variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                View Month
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Team Availability */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Team Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-3 border rounded-lg ${member.status === "conflict" ? "border-red-200 bg-red-50" : ""}`}
                >
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(member.status)}
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                      {member.conflicts > 0 && <p className="text-xs text-red-500">{member.conflicts} conflict(s)</p>}
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(member.status)}`}>{member.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Today's Schedule</CardTitle>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 border rounded-lg ${task.hasConflict ? "border-red-200 bg-red-50" : ""}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <Badge className={`text-xs ${getTaskStatusColor(task.status)}`}>{task.status}</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{task.time}</p>
                  <div className="flex items-center text-xs text-gray-500 mb-2">
                    <Users className="h-3 w-3 mr-1" />
                    {task.assignee}
                  </div>
                  {task.hasConflict && task.conflictReason && (
                    <div className="flex items-center text-xs text-red-600 bg-red-100 p-2 rounded">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {task.conflictReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Integration Panel */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Calendar Integration & Conflict Resolution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-2">Google Calendar Sync</h4>
              <p className="text-sm text-gray-600 mb-3">
                Synchronize with team members' Google Calendars for real-time availability
              </p>
              <Button variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Configure Sync
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Conflict Detection</h4>
              <p className="text-sm text-gray-600 mb-3">Automatically detect and highlight scheduling conflicts</p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View All Conflicts
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Auto-Resolve
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Availability Settings</h4>
              <p className="text-sm text-gray-600 mb-3">Manage team member availability and working hours</p>
              <Button variant="outline" size="sm">
                <Users className="mr-2 h-4 w-4" />
                Manage Availability
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
