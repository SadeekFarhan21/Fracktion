"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Users, Bell, MapPin, Shield, Database, Calendar } from "lucide-react"

interface SettingsProps {
  setActivePage: (page: string) => void
}

export function Settings({ setActivePage }: SettingsProps) {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Configure your Fracktion application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" placeholder="admin@company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" placeholder="Your Company Name" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="multi-user">Enable Multi-User Access</Label>
              <Switch id="multi-user" />
            </div>
            <Button className="w-full" onClick={() => setActivePage("users")}>
              Manage Users
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure alert and notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts">Email Alerts</Label>
              <Switch id="email-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compliance-alerts">Compliance Deadline Alerts</Label>
              <Switch id="compliance-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-reminders">Task Reminders</Label>
              <Switch id="task-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="schedule-conflicts">Schedule Conflict Alerts</Label>
              <Switch id="schedule-conflicts" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Google Maps Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Google Maps Integration
            </CardTitle>
            <CardDescription>Configure mapping and location services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maps-api-key">Google Maps API Key</Label>
              <Input id="maps-api-key" type="password" placeholder="Enter your API key" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-routing">Enable Auto-Routing</Label>
              <Switch id="auto-routing" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="traffic-data">Include Traffic Data</Label>
              <Switch id="traffic-data" />
            </div>
            <Button className="w-full" onClick={() => setActivePage("map")}>
              Test Connection
            </Button>
          </CardContent>
        </Card>

        {/* Calendar Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Calendar Integration
            </CardTitle>
            <CardDescription>Sync with external calendar applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="google-calendar">Google Calendar Sync</Label>
              <Switch id="google-calendar" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="outlook-calendar">Outlook Calendar Sync</Label>
              <Switch id="outlook-calendar" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-sync">Auto-Sync Schedules</Label>
              <Switch id="auto-sync" />
            </div>
            <Button className="w-full" onClick={() => setActivePage("calendar")}>
              Configure Calendar Access
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>Import/export and backup settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup">Enable Auto-Backup</Label>
              <Switch id="auto-backup" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={() => setActivePage("data")}>
                Export Data
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setActivePage("data")}>
                Import Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Security & Compliance
            </CardTitle>
            <CardDescription>Security settings and compliance features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="audit-log">Enable Audit Logging</Label>
              <Switch id="audit-log" defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" placeholder="60" />
            </div>
            <Button className="w-full" onClick={() => setActivePage("users")}>
              Security Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
