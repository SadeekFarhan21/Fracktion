"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, CheckCircle, AlertTriangle, Clock, TrendingUp, Users, ArrowRight } from "lucide-react"

interface DashboardProps {
  setActivePage: (page: string) => void
}

export function Dashboard({ setActivePage }: DashboardProps) {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  const activeWells = [
    {
      id: "W-001",
      name: "Bakken Site A",
      status: "In Progress",
      progress: 65,
      location: "North Dakota",
      deadline: "2024-01-15",
      cost: "$124,000",
      risk: "Medium",
    },
    {
      id: "W-002",
      name: "Eagle Ford B",
      status: "Planning",
      progress: 20,
      location: "Texas",
      deadline: "2024-01-22",
      cost: "$89,000",
      risk: "Low",
    },
    {
      id: "W-003",
      name: "Permian C",
      status: "Completed",
      progress: 100,
      location: "Texas",
      deadline: "2024-01-10",
      cost: "$156,000",
      risk: "High",
    },
    {
      id: "W-004",
      name: "Marcellus D",
      status: "On Hold",
      progress: 45,
      location: "Pennsylvania",
      deadline: "2024-02-01",
      cost: "$98,000",
      risk: "Medium",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      title: "Site inspection - Bakken A",
      assignee: "John Smith",
      due: "Today",
      priority: "High",
      wellId: "W-001",
    },
    {
      id: 2,
      title: "Equipment delivery - Eagle Ford B",
      assignee: "Sarah Johnson",
      due: "Tomorrow",
      priority: "Medium",
      wellId: "W-002",
    },
    {
      id: 3,
      title: "Compliance review - Permian C",
      assignee: "Mike Davis",
      due: "Jan 18",
      priority: "Low",
      wellId: "W-003",
    },
    {
      id: 4,
      title: "Final inspection - Marcellus D",
      assignee: "Lisa Wilson",
      due: "Jan 20",
      priority: "High",
      wellId: "W-004",
    },
  ]

  const complianceAlerts = [
    {
      id: 1,
      message: "EPA filing due in 3 days for Bakken Site A",
      severity: "warning",
      wellId: "W-001",
      dueDate: "Jan 18",
    },
    {
      id: 2,
      message: "State permit renewal required for Eagle Ford B",
      severity: "info",
      wellId: "W-002",
      dueDate: "Feb 1",
    },
    {
      id: 3,
      message: "Safety inspection overdue for Marcellus D",
      severity: "error",
      wellId: "W-004",
      dueDate: "Overdue",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "On Hold":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleWellClick = (wellId: string) => {
    setActivePage("campaigns")
  }

  const handleTaskClick = (taskId: number) => {
    setActivePage("tasks")
  }

  const handleComplianceClick = (alertId: number) => {
    setActivePage("compliance")
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your oil well plugging operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${selectedMetric === "active" ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => {
            setSelectedMetric("active")
            setActivePage("campaigns")
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Wells</CardTitle>
            <MapPin className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">+2 from last month</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${selectedMetric === "completed" ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => {
            setSelectedMetric("completed")
            setActivePage("campaigns")
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">+33% from last month</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${selectedMetric === "tasks" ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => {
            setSelectedMetric("tasks")
            setActivePage("tasks")
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">-12% from last week</p>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:shadow-md ${selectedMetric === "compliance" ? "ring-2 ring-blue-500" : ""}`}
          onClick={() => {
            setSelectedMetric("compliance")
            setActivePage("compliance")
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-gray-500">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Active Wells */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Wells</CardTitle>
              <CardDescription>Current plugging operations status</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActivePage("campaigns")}>
              View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeWells.map((well) => (
                <div
                  key={well.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleWellClick(well.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{well.name}</h4>
                      <div className="flex space-x-1">
                        <Badge className={`text-xs ${getRiskColor(well.risk)}`}>{well.risk}</Badge>
                        <Badge className={`text-xs ${getStatusColor(well.status)}`}>{well.status}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      {well.location}
                      <span className="mx-2">•</span>
                      Due: {well.deadline}
                      <span className="mx-2">•</span>
                      {well.cost}
                    </div>
                    <Progress value={well.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks requiring attention</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActivePage("tasks")}>
              View Board <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleTaskClick(task.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Users className="h-3 w-3 mr-1" />
                      {task.assignee}
                      <span className="mx-2">•</span>
                      {task.due}
                      <span className="mx-2">•</span>
                      {task.wellId}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Compliance Alerts</CardTitle>
            <CardDescription>Regulatory requirements and deadlines</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setActivePage("compliance")}>
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {complianceAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleComplianceClick(alert.id)}
              >
                <div className="mr-3">
                  {alert.severity === "error" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  {alert.severity === "warning" && <Clock className="h-4 w-4 text-yellow-500" />}
                  {alert.severity === "info" && <CheckCircle className="h-4 w-4 text-blue-500" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500">
                    Well: {alert.wellId} • Due: {alert.dueDate}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 text-left justify-start" variant="outline" onClick={() => setActivePage("campaigns")}>
          <div>
            <div className="font-medium">Create New Campaign</div>
            <div className="text-xs text-gray-500">Start a new well plugging project</div>
          </div>
        </Button>
        <Button className="h-16 text-left justify-start" variant="outline" onClick={() => setActivePage("calendar")}>
          <div>
            <div className="font-medium">Schedule Team</div>
            <div className="text-xs text-gray-500">Manage team availability</div>
          </div>
        </Button>
        <Button className="h-16 text-left justify-start" variant="outline" onClick={() => setActivePage("analytics")}>
          <div>
            <div className="font-medium">View Analytics</div>
            <div className="text-xs text-gray-500">Cost and performance insights</div>
          </div>
        </Button>
      </div>
    </div>
  )
}
