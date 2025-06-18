"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Calendar,
  Users,
  Truck,
  Plus,
  Filter,
  Map,
  Navigation,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  BarChart3,
} from "lucide-react"

// Cost estimation utility functions
const calculateBaseCost = (well: any) => {
  const depthFactor = well.depth * 45 // $45 per foot
  const ageFactor = well.age > 30 ? well.age * 150 : well.age * 100 // Older wells cost more
  const topographyMultiplier = well.topography === "mountainous" ? 1.4 : well.topography === "hilly" ? 1.2 : 1.0
  const geologyMultiplier = well.geology === "hard_rock" ? 1.5 : well.geology === "mixed" ? 1.2 : 1.0

  const materialCosts = well.materials.reduce((sum: number, material: any) => sum + material.cost, 0)
  const laborCosts = well.laborHours * well.laborRate

  const baseCost = (depthFactor + ageFactor + materialCosts + laborCosts) * topographyMultiplier * geologyMultiplier
  return Math.round(baseCost)
}

const calculateVariance = (well: any, historicalData: any[]) => {
  // Calculate variance based on historical similar projects
  const similarProjects = historicalData.filter(
    (project) => Math.abs(project.depth - well.depth) < 500 && project.geology === well.geology,
  )

  if (similarProjects.length < 2) return 0.15 // Default 15% variance if insufficient data

  const costs = similarProjects.map((p) => p.actualCost)
  const mean = costs.reduce((sum, cost) => sum + cost, 0) / costs.length
  const variance = costs.reduce((sum, cost) => sum + Math.pow(cost - mean, 2), 0) / (costs.length - 1)

  return Math.sqrt(variance) / mean // Coefficient of variation
}

const calculateConfidenceInterval = (baseCost: number, variance: number, confidenceLevel = 0.95) => {
  // Using normal distribution approximation
  const zScore = confidenceLevel === 0.95 ? 1.96 : confidenceLevel === 0.99 ? 2.576 : 1.645
  const standardError = baseCost * variance
  const marginOfError = zScore * standardError

  return {
    lower: Math.round(baseCost - marginOfError),
    upper: Math.round(baseCost + marginOfError),
    marginOfError: Math.round(marginOfError),
  }
}

interface CampaignManagerProps {
  setActivePage: (page: string) => void
}

export function CampaignManager({ setActivePage }: CampaignManagerProps) {
  // Historical data simulation for cost calculations
  const historicalData = useMemo(
    () => [
      { depth: 2500, geology: "sedimentary", actualCost: 125000, topography: "flat" },
      { depth: 3200, geology: "sedimentary", actualCost: 145000, topography: "flat" },
      { depth: 2800, geology: "mixed", actualCost: 165000, topography: "hilly" },
      { depth: 4100, geology: "hard_rock", actualCost: 285000, topography: "mountainous" },
      { depth: 1800, geology: "sedimentary", actualCost: 95000, topography: "flat" },
      { depth: 3500, geology: "mixed", actualCost: 195000, topography: "hilly" },
      { depth: 2200, geology: "sedimentary", actualCost: 115000, topography: "flat" },
      { depth: 3800, geology: "hard_rock", actualCost: 245000, topography: "mountainous" },
      { depth: 2900, geology: "mixed", actualCost: 175000, topography: "hilly" },
      { depth: 3300, geology: "sedimentary", actualCost: 155000, topography: "flat" },
    ],
    [],
  )

  const [campaigns] = useState([
    {
      id: "C-001",
      name: "North Dakota Q1 Campaign",
      wells: [
        {
          id: "W-001",
          name: "Bakken Site A",
          lat: 47.7511,
          lng: -101.7777,
          status: "In Progress",
          depth: 2800,
          age: 25,
          topography: "flat",
          geology: "sedimentary",
          materials: [
            { name: "Cement", quantity: 150, unit: "barrels", cost: 18750 },
            { name: "Steel Casing", quantity: 2800, unit: "feet", cost: 42000 },
            { name: "Drilling Mud", quantity: 50, unit: "barrels", cost: 3500 },
          ],
          laborHours: 120,
          laborRate: 85,
        },
        {
          id: "W-002",
          name: "Bakken Site B",
          lat: 47.8511,
          lng: -101.8777,
          status: "Planning",
          depth: 3200,
          age: 32,
          topography: "hilly",
          geology: "mixed",
          materials: [
            { name: "Cement", quantity: 180, unit: "barrels", cost: 22500 },
            { name: "Steel Casing", quantity: 3200, unit: "feet", cost: 48000 },
            { name: "Drilling Mud", quantity: 65, unit: "barrels", cost: 4550 },
          ],
          laborHours: 145,
          laborRate: 85,
        },
        {
          id: "W-003",
          name: "Bakken Site C",
          lat: 47.6511,
          lng: -101.6777,
          status: "Completed",
          depth: 2400,
          age: 18,
          topography: "flat",
          geology: "sedimentary",
          materials: [
            { name: "Cement", quantity: 130, unit: "barrels", cost: 16250 },
            { name: "Steel Casing", quantity: 2400, unit: "feet", cost: 36000 },
            { name: "Drilling Mud", quantity: 45, unit: "barrels", cost: 3150 },
          ],
          laborHours: 95,
          laborRate: 85,
        },
      ],
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      assignedTeam: "Team Alpha",
      equipment: ["Rig A", "Pump Unit 1", "Cement Truck 2"],
      location: "Bakken Formation, ND",
      progress: 65,
      estimatedTravelTime: "2.5 hours",
      totalDistance: "145 miles",
    },
    {
      id: "C-002",
      name: "Texas Permian Phase 2",
      wells: [
        {
          id: "W-004",
          name: "Permian Site A",
          lat: 31.8457,
          lng: -102.3676,
          status: "Planning",
          depth: 4200,
          age: 35,
          topography: "mountainous",
          geology: "hard_rock",
          materials: [
            { name: "Cement", quantity: 220, unit: "barrels", cost: 27500 },
            { name: "Steel Casing", quantity: 4200, unit: "feet", cost: 63000 },
            { name: "Drilling Mud", quantity: 85, unit: "barrels", cost: 5950 },
          ],
          laborHours: 180,
          laborRate: 90,
        },
        {
          id: "W-005",
          name: "Permian Site B",
          lat: 31.9457,
          lng: -102.4676,
          status: "Planning",
          depth: 3800,
          age: 28,
          topography: "hilly",
          geology: "mixed",
          materials: [
            { name: "Cement", quantity: 195, unit: "barrels", cost: 24375 },
            { name: "Steel Casing", quantity: 3800, unit: "feet", cost: 57000 },
            { name: "Drilling Mud", quantity: 75, unit: "barrels", cost: 5250 },
          ],
          laborHours: 155,
          laborRate: 90,
        },
      ],
      status: "Planning",
      startDate: "2024-02-15",
      endDate: "2024-05-15",
      assignedTeam: "Team Beta",
      equipment: ["Rig B", "Pump Unit 2", "Cement Truck 1"],
      location: "Permian Basin, TX",
      progress: 25,
      estimatedTravelTime: "4.2 hours",
      totalDistance: "287 miles",
    },
  ])

  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  // Calculate cost estimates for each campaign
  const campaignsWithCosts = useMemo(() => {
    return campaigns.map((campaign) => {
      const wellCosts = campaign.wells.map((well) => {
        const baseCost = calculateBaseCost(well)
        const variance = calculateVariance(well, historicalData)
        const confidenceInterval = calculateConfidenceInterval(baseCost, variance)

        return {
          ...well,
          costEstimate: {
            baseCost,
            variance: Math.round(variance * 100), // Convert to percentage
            confidenceInterval,
            riskLevel: variance > 0.2 ? "High" : variance > 0.1 ? "Medium" : "Low",
          },
        }
      })

      const totalBaseCost = wellCosts.reduce((sum, well) => sum + well.costEstimate.baseCost, 0)
      const avgVariance = wellCosts.reduce((sum, well) => sum + well.costEstimate.variance / 100, 0) / wellCosts.length
      const totalConfidenceInterval = calculateConfidenceInterval(totalBaseCost, avgVariance)

      return {
        ...campaign,
        wells: wellCosts,
        totalCostEstimate: {
          baseCost: totalBaseCost,
          variance: Math.round(avgVariance * 100),
          confidenceInterval: totalConfidenceInterval,
          riskLevel: avgVariance > 0.2 ? "High" : avgVariance > 0.1 ? "Medium" : "Low",
        },
      }
    })
  }, [campaigns, historicalData])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "On Hold":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getWellStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "In Progress":
        return "bg-blue-500"
      case "Planning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Campaign Manager</h1>
          <p className="text-gray-600">Manage campaigns with advanced cost estimation and risk analysis</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setActivePage("analytics")}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Cost Analytics
          </Button>
          <Button variant="outline" onClick={() => setActivePage("campaigns")}>
            <Map className="mr-2 h-4 w-4" />
            Map View
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex-1">
          <Input placeholder="Search campaigns..." />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <div className="lg:col-span-2 space-y-6">
          {campaignsWithCosts.map((campaign) => (
            <Card key={campaign.id} className={selectedCampaign === campaign.id ? "ring-2 ring-blue-500" : ""}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <CardDescription className="mt-1">Campaign ID: {campaign.id}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getRiskColor(campaign.totalCostEstimate.riskLevel)}>
                      {campaign.totalCostEstimate.riskLevel} Risk
                    </Badge>
                    <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Cost Estimation Section */}
                <Card className="mb-6 bg-blue-50 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Cost Estimation & Risk Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Base Cost Estimate</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(campaign.totalCostEstimate.baseCost)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Variance</p>
                        <p className="text-xl font-bold text-orange-600">±{campaign.totalCostEstimate.variance}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-600">Risk Level</p>
                        <Badge className={`${getRiskColor(campaign.totalCostEstimate.riskLevel)} text-sm`}>
                          {campaign.totalCostEstimate.riskLevel}
                        </Badge>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium text-sm mb-3 flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        95% Confidence Interval
                      </h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Cost Range:</span>
                        <span className="font-medium">
                          {formatCurrency(campaign.totalCostEstimate.confidenceInterval.lower)} -{" "}
                          {formatCurrency(campaign.totalCostEstimate.confidenceInterval.upper)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">Margin of Error:</span>
                        <span className="font-medium text-red-600">
                          ±{formatCurrency(campaign.totalCostEstimate.confidenceInterval.marginOfError)}
                        </span>
                      </div>

                      {/* Visual representation of confidence interval */}
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-500 h-3 rounded-full relative"
                            style={{ width: "60%", marginLeft: "20%" }}
                          >
                            <div className="absolute -top-1 left-0 w-1 h-5 bg-blue-700 rounded"></div>
                            <div className="absolute -top-1 right-0 w-1 h-5 bg-blue-700 rounded"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{formatCurrency(campaign.totalCostEstimate.confidenceInterval.lower)}</span>
                          <span className="font-medium">{formatCurrency(campaign.totalCostEstimate.baseCost)}</span>
                          <span>{formatCurrency(campaign.totalCostEstimate.confidenceInterval.upper)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-sm text-gray-600">{campaign.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-gray-600">
                        {campaign.startDate} - {campaign.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Team</p>
                      <p className="text-sm text-gray-600">{campaign.assignedTeam}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Wells</p>
                      <p className="text-sm text-gray-600">{campaign.wells.length} wells</p>
                    </div>
                  </div>
                </div>

                {/* Travel Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Navigation className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Total Distance</p>
                      <p className="text-sm text-gray-600">{campaign.totalDistance}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Est. Travel Time</p>
                      <p className="text-sm text-gray-600">{campaign.estimatedTravelTime}</p>
                    </div>
                  </div>
                </div>

                {/* Wells List with Individual Cost Estimates */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-3">Wells with Cost Estimates:</p>
                  <div className="space-y-3">
                    {campaign.wells.map((well) => (
                      <div key={well.id} className="border rounded-lg p-3 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getWellStatusColor(well.status)}`}></div>
                            <span className="text-sm font-medium">{well.name}</span>
                            <span className="text-xs text-gray-500">({well.id})</span>
                          </div>
                          <div className="flex space-x-2">
                            <Badge className={getRiskColor(well.costEstimate.riskLevel)} variant="outline">
                              {well.costEstimate.riskLevel} Risk
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {well.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                          <div>
                            <p className="text-gray-500">Base Cost</p>
                            <p className="font-medium">{formatCurrency(well.costEstimate.baseCost)}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Variance</p>
                            <p className="font-medium text-orange-600">±{well.costEstimate.variance}%</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Depth</p>
                            <p className="font-medium">{well.depth.toLocaleString()} ft</p>
                          </div>
                          <div>
                            <p className="text-gray-500">95% CI Range</p>
                            <p className="font-medium text-blue-600">
                              {formatCurrency(well.costEstimate.confidenceInterval.lower)} -{" "}
                              {formatCurrency(well.costEstimate.confidenceInterval.upper)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Equipment Assigned:</p>
                  <div className="flex flex-wrap gap-2">
                    {campaign.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCampaign(campaign.id)}>
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActivePage("analytics")}>
                    <BarChart3 className="mr-1 h-3 w-3" />
                    Cost Analysis
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setActivePage("campaigns")}>
                    <MapPin className="mr-1 h-3 w-3" />
                    View on Map
                  </Button>
                  <Button variant="outline" size="sm">
                    <Navigation className="mr-1 h-3 w-3" />
                    Plan Route
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cost Analytics Panel */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Cost Analytics
              </CardTitle>
              <CardDescription>Statistical analysis and risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Total Portfolio Cost</h4>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(campaignsWithCosts.reduce((sum, c) => sum + c.totalCostEstimate.baseCost, 0))}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Avg. Variance:{" "}
                    {Math.round(
                      campaignsWithCosts.reduce((sum, c) => sum + c.totalCostEstimate.variance, 0) /
                        campaignsWithCosts.length,
                    )}
                    %
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Risk Distribution</h4>
                  {["Low", "Medium", "High"].map((risk) => {
                    const count = campaignsWithCosts.filter((c) => c.totalCostEstimate.riskLevel === risk).length
                    const percentage = (count / campaignsWithCosts.length) * 100
                    return (
                      <div key={risk} className="flex items-center justify-between text-sm">
                        <span>{risk} Risk</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${risk === "Low" ? "bg-green-500" : risk === "Medium" ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-2">
                  <Button className="w-full" variant="outline" size="sm">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Detailed Analytics
                  </Button>
                  <Button className="w-full" variant="outline" size="sm">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Risk Assessment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Integration Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Google Maps Integration</CardTitle>
              <CardDescription>Visualize well locations and plan routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Placeholder for Google Maps */}
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <Map className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Google Maps Integration</p>
                    <p className="text-xs text-gray-400">Well locations and routes</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" variant="outline">
                    <MapPin className="mr-2 h-4 w-4" />
                    Show All Wells
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Navigation className="mr-2 h-4 w-4" />
                    Optimize Route
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Calculate Travel Times
                  </Button>
                </div>

                {selectedCampaign && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-sm mb-2">Selected Campaign</h4>
                    <p className="text-xs text-gray-600">
                      {campaignsWithCosts.find((c) => c.id === selectedCampaign)?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {campaignsWithCosts.find((c) => c.id === selectedCampaign)?.wells.length} wells to display
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
