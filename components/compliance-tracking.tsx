"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Shield, AlertTriangle, CheckCircle, Clock, FileText, Calendar, Plus, Bell, Search, Filter } from "lucide-react"

interface ComplianceTrackingProps {
  setActivePage: (page: string) => void
}

export function ComplianceTracking({ setActivePage }: ComplianceTrackingProps) {
  const [complianceItems] = useState([
    {
      id: "C-001",
      title: "EPA Well Plugging Permit",
      well: "Bakken Site A",
      status: "Active",
      dueDate: "2024-01-25",
      progress: 85,
      priority: "High",
      description: "Federal environmental permit for well plugging operations",
      agency: "EPA",
      lastUpdated: "2024-01-10",
    },
    {
      id: "C-002",
      title: "State Water Protection Compliance",
      well: "Eagle Ford B",
      status: "Pending",
      dueDate: "2024-02-01",
      progress: 45,
      priority: "Medium",
      description: "State-level groundwater protection requirements",
      agency: "State Commission",
      lastUpdated: "2024-01-08",
    },
    {
      id: "C-003",
      title: "Safety Inspection Certificate",
      well: "Permian C",
      status: "Overdue",
      dueDate: "2024-01-15",
      progress: 20,
      priority: "Critical",
      description: "Required safety inspection before operations",
      agency: "OSHA",
      lastUpdated: "2024-01-05",
    },
    {
      id: "C-004",
      title: "Waste Disposal Authorization",
      well: "Marcellus D",
      status: "Completed",
      dueDate: "2024-01-10",
      progress: 100,
      priority: "Low",
      description: "Authorization for proper waste disposal",
      agency: "State DEP",
      lastUpdated: "2024-01-09",
    },
  ])

  const [regulations] = useState([
    {
      id: "R-001",
      title: "Clean Water Act Compliance",
      agency: "EPA",
      lastUpdated: "2024-01-01",
      applicableWells: 8,
      description: "Federal regulations for water protection during well plugging",
      requirements: ["Water quality monitoring", "Discharge permits", "Spill prevention plans"],
    },
    {
      id: "R-002",
      title: "State Oil & Gas Commission Rules",
      agency: "State Commission",
      lastUpdated: "2023-12-15",
      applicableWells: 12,
      description: "State-specific regulations for oil and gas well abandonment",
      requirements: ["Plugging procedures", "Cement specifications", "Reporting requirements"],
    },
    {
      id: "R-003",
      title: "OSHA Safety Standards",
      agency: "OSHA",
      lastUpdated: "2023-11-30",
      applicableWells: 15,
      description: "Occupational safety and health standards for well operations",
      requirements: ["Safety training", "Equipment inspections", "Hazard assessments"],
    },
  ])

  const [alerts] = useState([
    {
      id: "A-001",
      message: "EPA filing due in 3 days for Bakken Site A",
      severity: "warning",
      dueDate: "2024-01-25",
      well: "Bakken Site A",
    },
    {
      id: "A-002",
      message: "Safety inspection overdue for Permian C",
      severity: "critical",
      dueDate: "2024-01-15",
      well: "Permian C",
    },
    {
      id: "A-003",
      message: "State permit renewal required for Eagle Ford B",
      severity: "info",
      dueDate: "2024-02-01",
      well: "Eagle Ford B",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Active":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Active":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const overallCompliance = Math.round(
    complianceItems.reduce((acc, item) => acc + item.progress, 0) / complianceItems.length,
  )

  const filteredItems = complianceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.well.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.agency.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Compliance Tracking</h1>
          <p className="text-gray-600">Monitor regulatory requirements with automated alerts and deadline tracking</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setActivePage("compliance")}>
            <Bell className="mr-2 h-4 w-4" />
            Alert Settings
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Requirement
          </Button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Compliance</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallCompliance}%</div>
            <Progress value={overallCompliance} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requirements</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {complianceItems.filter((item) => item.status === "Active").length}
            </div>
            <p className="text-xs text-gray-500">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {complianceItems.filter((item) => item.status === "Overdue").length}
            </div>
            <p className="text-xs text-gray-500">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {complianceItems.filter((item) => item.status === "Completed").length}
            </div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Compliance Alerts & Notifications
          </CardTitle>
          <CardDescription>Automated alerts for upcoming deadlines and compliance issues</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`flex items-center justify-between p-3 border rounded-lg ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-center space-x-3">
                  <div>
                    {alert.severity === "critical" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    {alert.severity === "warning" && <Clock className="h-4 w-4 text-yellow-500" />}
                    {alert.severity === "info" && <FileText className="h-4 w-4 text-blue-500" />}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500">
                      Well: {alert.well} • Due: {alert.dueDate}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    Resolve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search compliance requirements..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
          <option value="Completed">Completed</option>
        </select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Compliance Requirements</CardTitle>
            <CardDescription>Track progress on regulatory requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-gray-500">
                          {item.well} • {item.agency}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>{item.priority}</Badge>
                      <Badge className={`text-xs ${getStatusColor(item.status)}`}>{item.status}</Badge>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-3">{item.description}</p>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2 mb-3" />

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Due: {item.dueDate}
                    </div>
                    <span>Updated: {item.lastUpdated}</span>
                  </div>

                  <div className="flex space-x-2 mt-3">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Progress
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regulatory Database */}
        <Card>
          <CardHeader>
            <CardTitle>Regulatory Database</CardTitle>
            <CardDescription>Current regulations and standards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regulations.map((regulation) => (
                <div key={regulation.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{regulation.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {regulation.agency}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-600 mb-3">{regulation.description}</p>

                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-700 mb-1">Key Requirements:</p>
                    <div className="space-y-1">
                      {regulation.requirements.map((req, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Last Updated: {regulation.lastUpdated}</span>
                    <span>{regulation.applicableWells} wells affected</span>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Regulation
                    </Button>
                    <Button variant="outline" size="sm">
                      Check Compliance
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
