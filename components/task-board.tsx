"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, MoreHorizontal, Calendar, User, AlertCircle, Filter, Settings } from "lucide-react"

interface TaskBoardProps {
  setActivePage: (page: string) => void
}

export function TaskBoard({ setActivePage }: TaskBoardProps) {
  const [columns, setColumns] = useState([
    {
      id: "planning",
      title: "Planning",
      color: "bg-yellow-100",
      tasks: [
        {
          id: "T-001",
          title: "Site Survey - Bakken A",
          description: "Conduct initial site survey and assessment",
          assignee: "John Smith",
          priority: "High",
          dueDate: "2024-01-20",
          well: "W-001",
          tags: ["Survey", "Initial"],
        },
        {
          id: "T-002",
          title: "Permit Application - Eagle Ford B",
          description: "Submit regulatory permits for plugging operation",
          assignee: "Sarah Johnson",
          priority: "Medium",
          dueDate: "2024-01-25",
          well: "W-002",
          tags: ["Permits", "Regulatory"],
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      color: "bg-blue-100",
      tasks: [
        {
          id: "T-003",
          title: "Equipment Setup - Permian C",
          description: "Deploy and setup plugging equipment on site",
          assignee: "Mike Davis",
          priority: "High",
          dueDate: "2024-01-18",
          well: "W-003",
          tags: ["Equipment", "Setup"],
        },
        {
          id: "T-004",
          title: "Cement Mixing - Marcellus D",
          description: "Prepare cement mixture for well plugging",
          assignee: "Lisa Wilson",
          priority: "Medium",
          dueDate: "2024-01-22",
          well: "W-004",
          tags: ["Cement", "Preparation"],
        },
      ],
    },
    {
      id: "review",
      title: "Review",
      color: "bg-orange-100",
      tasks: [
        {
          id: "T-005",
          title: "Quality Inspection - Bakken A",
          description: "Final quality check and documentation",
          assignee: "Tom Brown",
          priority: "Low",
          dueDate: "2024-01-24",
          well: "W-001",
          tags: ["Quality", "Inspection"],
        },
      ],
    },
    {
      id: "completed",
      title: "Completed",
      color: "bg-green-100",
      tasks: [
        {
          id: "T-006",
          title: "Final Report - Permian C",
          description: "Submit completion report to regulatory body",
          assignee: "Anna Garcia",
          priority: "Low",
          dueDate: "2024-01-15",
          well: "W-003",
          tags: ["Report", "Completion"],
        },
      ],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("")

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

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.well.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPriority = !filterPriority || task.priority === filterPriority
      return matchesSearch && matchesPriority
    }),
  }))

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Task Board</h1>
          <p className="text-gray-600">Track and manage plugging operation tasks with customizable workflows</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setActivePage("dashboard")}>
            <Settings className="mr-2 h-4 w-4" />
            Customize Board
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <Input
            placeholder="Search tasks, assignees, or wells..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Task Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredColumns.map((column) => (
          <div key={column.id} className={`${column.color} rounded-lg p-4`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-900">{column.title}</h3>
              <Badge variant="secondary" className="text-xs">
                {column.tasks.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow bg-white">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-medium leading-tight">{task.title}</CardTitle>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
                      <span className="text-xs text-gray-500 font-medium">{task.well}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {task.assignee}
                      </div>
                      <div className={`flex items-center ${isOverdue(task.dueDate) ? "text-red-500" : ""}`}>
                        {isOverdue(task.dueDate) && <AlertCircle className="h-3 w-3 mr-1" />}
                        <Calendar className="h-3 w-3 mr-1" />
                        {task.dueDate}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              variant="ghost"
              className="w-full mt-3 text-gray-500 border-2 border-dashed border-gray-300 hover:border-gray-400 bg-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        ))}
      </div>

      {/* Board Customization Panel */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Board Customization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Workflow Stages</h4>
              <p className="text-sm text-gray-600 mb-2">Customize stages to match your plugging process</p>
              <Button variant="outline" size="sm">
                Edit Stages
              </Button>
            </div>
            <div>
              <h4 className="font-medium mb-2">Task Templates</h4>
              <p className="text-sm text-gray-600 mb-2">Create templates for common plugging tasks</p>
              <Button variant="outline" size="sm">
                Manage Templates
              </Button>
            </div>
            <div>
              <h4 className="font-medium mb-2">Automation Rules</h4>
              <p className="text-sm text-gray-600 mb-2">Set up automatic task transitions and notifications</p>
              <Button variant="outline" size="sm">
                Configure Rules
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
