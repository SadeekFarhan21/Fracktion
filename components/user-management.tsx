"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Users, Plus, Edit, Trash2, Shield, Mail, Phone, MapPin } from "lucide-react"

interface UserManagementProps {
  setActivePage: (page: string) => void
}

export function UserManagement({ setActivePage }: UserManagementProps) {
  const [users] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@company.com",
      role: "Admin",
      status: "Active",
      phone: "(555) 123-4567",
      location: "North Dakota",
      lastLogin: "2024-01-15 10:30 AM",
      campaigns: 3,
      tasks: 12,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Site Supervisor",
      status: "Active",
      phone: "(555) 234-5678",
      location: "Texas",
      lastLogin: "2024-01-15 9:15 AM",
      campaigns: 2,
      tasks: 8,
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@company.com",
      role: "Field Technician",
      status: "Active",
      phone: "(555) 345-6789",
      location: "Pennsylvania",
      lastLogin: "2024-01-14 4:45 PM",
      campaigns: 1,
      tasks: 15,
    },
    {
      id: 4,
      name: "Lisa Wilson",
      email: "lisa.wilson@company.com",
      role: "Compliance Officer",
      status: "Inactive",
      phone: "(555) 456-7890",
      location: "Texas",
      lastLogin: "2024-01-10 2:20 PM",
      campaigns: 0,
      tasks: 3,
    },
  ])

  const [showAddUser, setShowAddUser] = useState(false)

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-100 text-purple-800"
      case "Site Supervisor":
        return "bg-blue-100 text-blue-800"
      case "Field Technician":
        return "bg-green-100 text-green-800"
      case "Compliance Officer":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage team members, roles, and permissions</p>
        </div>
        <Button onClick={() => setShowAddUser(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admins</p>
                <p className="text-2xl font-bold text-purple-600">1</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Field Staff</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <Input placeholder="Search users..." />
        </div>
        <select className="px-3 py-2 border border-gray-300 rounded-md">
          <option>All Roles</option>
          <option>Admin</option>
          <option>Site Supervisor</option>
          <option>Field Technician</option>
          <option>Compliance Officer</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-md">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{user.name}</h4>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {user.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {user.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right text-xs">
                    <p className="font-medium">{user.campaigns} campaigns</p>
                    <p className="text-gray-500">{user.tasks} tasks</p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={`text-xs ${getRoleColor(user.role)}`}>{user.role}</Badge>
                    <Badge className={`text-xs ${getStatusColor(user.status)}`}>{user.status}</Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add User Modal Simulation */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-96">
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
              <CardDescription>Create a new team member account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Enter full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="Enter email address" />
              </div>
              <div>
                <label className="text-sm font-medium">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Select role</option>
                  <option>Site Supervisor</option>
                  <option>Field Technician</option>
                  <option>Compliance Officer</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Enter location" />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button className="flex-1">Create User</Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowAddUser(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Role Permissions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Configure permissions for different user roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Admin</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Full system access</li>
                <li>• User management</li>
                <li>• System settings</li>
                <li>• All campaigns</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Site Supervisor</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Campaign management</li>
                <li>• Task assignment</li>
                <li>• Team scheduling</li>
                <li>• Progress reporting</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Field Technician</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Task updates</li>
                <li>• Time tracking</li>
                <li>• Equipment logs</li>
                <li>• Safety reports</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-sm mb-2">Compliance Officer</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Compliance tracking</li>
                <li>• Regulatory reports</li>
                <li>• Audit management</li>
                <li>• Documentation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
