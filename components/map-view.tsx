"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Layers, Filter, Maximize, Route, Clock, DollarSign } from "lucide-react"

interface MapViewProps {
  setActivePage: (page: string) => void
}

export function MapView({ setActivePage }: MapViewProps) {
  const [selectedWell, setSelectedWell] = useState<string | null>(null)
  const [mapLayer, setMapLayer] = useState("satellite")
  const [showRoutes, setShowRoutes] = useState(false)

  const wells = [
    {
      id: "W-001",
      name: "Bakken Site A",
      lat: 47.7511,
      lng: -101.7777,
      status: "In Progress",
      depth: 2800,
      cost: "$124,000",
      progress: 65,
      team: "Team Alpha",
    },
    {
      id: "W-002",
      name: "Eagle Ford B",
      lat: 28.4158,
      lng: -98.4951,
      status: "Planning",
      depth: 3200,
      cost: "$89,000",
      progress: 20,
      team: "Team Beta",
    },
    {
      id: "W-003",
      name: "Permian C",
      lat: 31.8457,
      lng: -102.3676,
      status: "Completed",
      depth: 2400,
      cost: "$156,000",
      progress: 100,
      team: "Team Gamma",
    },
    {
      id: "W-004",
      name: "Marcellus D",
      lat: 40.2732,
      lng: -76.8867,
      status: "On Hold",
      depth: 3800,
      cost: "$98,000",
      progress: 45,
      team: "Team Alpha",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Planning":
        return "bg-yellow-500"
      case "On Hold":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadgeColor = (status: string) => {
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Map View</h1>
          <p className="text-gray-600">Interactive map of well locations and operations</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setShowRoutes(!showRoutes)}>
            <Route className="mr-2 h-4 w-4" />
            {showRoutes ? "Hide Routes" : "Show Routes"}
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter Wells
          </Button>
          <Button onClick={() => setActivePage("campaigns")}>
            <MapPin className="mr-2 h-4 w-4" />
            Campaign View
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Interactive Well Map</CardTitle>
                <div className="flex space-x-2">
                  <select
                    className="px-3 py-1 border border-gray-300 rounded text-sm"
                    value={mapLayer}
                    onChange={(e) => setMapLayer(e.target.value)}
                  >
                    <option value="satellite">Satellite</option>
                    <option value="terrain">Terrain</option>
                    <option value="roadmap">Roadmap</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Map Placeholder with Interactive Elements */}
              <div className="relative w-full h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                {/* Simulated Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100"></div>

                {/* Well Markers */}
                {wells.map((well, index) => (
                  <div
                    key={well.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                      selectedWell === well.id ? "z-20" : "z-10"
                    }`}
                    style={{
                      left: `${20 + index * 20}%`,
                      top: `${30 + index * 15}%`,
                    }}
                    onClick={() => setSelectedWell(selectedWell === well.id ? null : well.id)}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${getStatusColor(well.status)} ${
                        selectedWell === well.id ? "scale-150" : "hover:scale-125"
                      } transition-transform`}
                    ></div>

                    {selectedWell === well.id && (
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-48 border">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{well.name}</h4>
                          <Badge className={`text-xs ${getStatusBadgeColor(well.status)}`}>{well.status}</Badge>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Depth:</span>
                            <span>{well.depth.toLocaleString()} ft</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Cost:</span>
                            <span>{well.cost}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Progress:</span>
                            <span>{well.progress}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Team:</span>
                            <span>{well.team}</span>
                          </div>
                        </div>
                        <div className="flex space-x-1 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => setActivePage("campaigns")}
                          >
                            Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={() => setActivePage("tasks")}
                          >
                            Tasks
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Route Lines (when enabled) */}
                {showRoutes && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                      </marker>
                    </defs>
                    <path
                      d="M 20% 30% Q 35% 20% 40% 45%"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      markerEnd="url(#arrowhead)"
                    />
                    <path
                      d="M 40% 45% Q 55% 35% 60% 60%"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      markerEnd="url(#arrowhead)"
                    />
                  </svg>
                )}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    +
                  </Button>
                  <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                    -
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 border">
                  <h4 className="font-medium text-xs mb-2">Well Status</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>In Progress</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Planning</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                      <span>On Hold</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Well List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Wells Overview</CardTitle>
              <CardDescription>Click on map markers for details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {wells.map((well) => (
                  <div
                    key={well.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedWell === well.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedWell(selectedWell === well.id ? null : well.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{well.name}</h4>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(well.status)}`}></div>
                    </div>
                    <div className="text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>{well.team}</span>
                        <span>{well.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Map Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Map Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Navigation className="mr-2 h-4 w-4" />
                  Route Optimization
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Travel Time Analysis
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Cost by Location
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Layers className="mr-2 h-4 w-4" />
                  Layer Controls
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Total Wells:</span>
                  <span className="font-medium">{wells.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active:</span>
                  <span className="font-medium text-blue-600">
                    {wells.filter((w) => w.status === "In Progress").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span className="font-medium text-green-600">
                    {wells.filter((w) => w.status === "Completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Progress:</span>
                  <span className="font-medium">
                    {Math.round(wells.reduce((sum, w) => sum + w.progress, 0) / wells.length)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
