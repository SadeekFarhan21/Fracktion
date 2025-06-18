"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, FileSpreadsheet, CheckCircle, AlertTriangle, Clock, RefreshCw } from "lucide-react"

interface DataImportProps {
  setActivePage: (page: string) => void
}

export function DataImport({ setActivePage }: DataImportProps) {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const importHistory = [
    {
      id: 1,
      filename: "wells_data_2024.xlsx",
      type: "Well Data",
      status: "Completed",
      date: "2024-01-15 10:30 AM",
      records: 45,
      errors: 0,
    },
    {
      id: 2,
      filename: "compliance_records.csv",
      type: "Compliance",
      status: "Completed",
      date: "2024-01-14 2:15 PM",
      records: 23,
      errors: 2,
    },
    {
      id: 3,
      filename: "team_schedule.xlsx",
      type: "Schedule",
      status: "Failed",
      date: "2024-01-13 9:45 AM",
      records: 0,
      errors: 5,
    },
  ]

  const handleFileUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadComplete(true)
          setTimeout(() => setUploadComplete(false), 3000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "Processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <FileSpreadsheet className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Data Import/Export</h1>
        <p className="text-gray-600">Import well data, export reports, and manage data synchronization</p>
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Import Data
            </CardTitle>
            <CardDescription>
              Upload Excel or CSV files with well data, compliance records, or schedules
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-4">Drag and drop your files here, or click to browse</p>
                <Button onClick={handleFileUpload} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Files
                    </>
                  )}
                </Button>
              </div>

              {isUploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading wells_data_2024.xlsx</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {uploadComplete && (
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-700">File uploaded successfully! 32 records imported.</span>
                </div>
              )}

              <div className="text-xs text-gray-500">
                Supported formats: .xlsx, .csv, .xls
                <br />
                Maximum file size: 10MB
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="mr-2 h-5 w-5" />
              Export Data
            </CardTitle>
            <CardDescription>Download reports and data exports in various formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export All Wells Data
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export Compliance Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export Cost Analysis
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export Team Schedule
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => setActivePage("analytics")}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Custom Report Builder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Import History */}
      <Card>
        <CardHeader>
          <CardTitle>Import History</CardTitle>
          <CardDescription>Recent data import activities and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {importHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(item.status)}
                  <div>
                    <h4 className="font-medium text-sm">{item.filename}</h4>
                    <p className="text-xs text-gray-500">
                      {item.type} • {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right text-xs">
                    <p className="font-medium">{item.records} records</p>
                    {item.errors > 0 && <p className="text-red-500">{item.errors} errors</p>}
                  </div>
                  <Badge className={`text-xs ${getStatusColor(item.status)}`}>{item.status}</Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Templates */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Data Templates</CardTitle>
          <CardDescription>Download templates to ensure proper data formatting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileSpreadsheet className="h-6 w-6 mb-2" />
              <span className="text-xs">Well Data Template</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileSpreadsheet className="h-6 w-6 mb-2" />
              <span className="text-xs">Compliance Template</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileSpreadsheet className="h-6 w-6 mb-2" />
              <span className="text-xs">Schedule Template</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileSpreadsheet className="h-6 w-6 mb-2" />
              <span className="text-xs">Cost Data Template</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
