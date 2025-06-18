"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, DollarSign, AlertTriangle, Download, Filter } from "lucide-react"

interface CostAnalyticsProps {
  setActivePage: (page: string) => void
}

export function CostAnalytics({ setActivePage }: CostAnalyticsProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("total")

  const costMetrics = {
    totalBudget: 2450000,
    actualSpent: 1890000,
    projected: 2380000,
    variance: -70000,
    efficiency: 92.3,
  }

  const campaignCosts = [
    {
      id: "C-001",
      name: "North Dakota Q1",
      budget: 850000,
      actual: 782000,
      projected: 845000,
      variance: -5000,
      efficiency: 96.2,
      status: "On Track",
    },
    {
      id: "C-002",
      name: "Texas Permian Phase 2",
      budget: 1200000,
      actual: 890000,
      projected: 1180000,
      variance: -20000,
      efficiency: 94.1,
      status: "Under Budget",
    },
    {
      id: "C-003",
      name: "Pennsylvania Cleanup",
      budget: 400000,
      actual: 218000,
      projected: 355000,
      variance: -45000,
      efficiency: 88.8,
      status: "Completed",
    },
  ]

  const costBreakdown = [
    { category: "Labor", amount: 756000, percentage: 40, trend: "+5%" },
    { category: "Equipment", amount: 567000, percentage: 30, trend: "-2%" },
    { category: "Materials", amount: 378000, percentage: 20, trend: "+8%" },
    { category: "Permits", amount: 113400, percentage: 6, trend: "+12%" },
    { category: "Other", amount: 75600, percentage: 4, trend: "-1%" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-blue-100 text-blue-800"
      case "Under Budget":
        return "bg-green-100 text-green-800"
      case "Over Budget":
        return "bg-red-100 text-red-800"
      case "Completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cost Analytics</h1>
          <p className="text-gray-600">Comprehensive cost analysis and financial insights</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={() => setActivePage("campaigns")}>
            <BarChart3 className="mr-2 h-4 w-4" />
            View Campaigns
          </Button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="flex space-x-2 mb-6">
        {["week", "month", "quarter", "year"].map((period) => (
          <Button
            key={period}
            variant={selectedTimeframe === period ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTimeframe(period)}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">{formatCurrency(costMetrics.totalBudget)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Actual Spent</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(costMetrics.actualSpent)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Projected Total</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(costMetrics.projected)}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Variance</p>
                <p className={`text-2xl font-bold ${costMetrics.variance < 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatCurrency(costMetrics.variance)}
                </p>
              </div>
              <AlertTriangle className={`h-8 w-8 ${costMetrics.variance < 0 ? "text-green-500" : "text-red-500"}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Efficiency</p>
                <p className="text-2xl font-bold text-purple-600">{costMetrics.efficiency}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Campaign Cost Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Cost Performance</CardTitle>
            <CardDescription>Budget vs actual spending by campaign</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignCosts.map((campaign) => (
                <div key={campaign.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium text-sm">{campaign.name}</h4>
                      <p className="text-xs text-gray-500">{campaign.id}</p>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(campaign.status)}`}>{campaign.status}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3 text-xs">
                    <div>
                      <p className="text-gray-500">Budget</p>
                      <p className="font-medium">{formatCurrency(campaign.budget)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Actual</p>
                      <p className="font-medium">{formatCurrency(campaign.actual)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Projected</p>
                      <p className="font-medium">{formatCurrency(campaign.projected)}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">Budget Utilization</span>
                    <span className="text-xs font-medium">
                      {Math.round((campaign.actual / campaign.budget) * 100)}%
                    </span>
                  </div>
                  <Progress value={(campaign.actual / campaign.budget) * 100} className="h-2 mb-3" />

                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center space-x-4">
                      <span className={`font-medium ${campaign.variance < 0 ? "text-green-600" : "text-red-600"}`}>
                        Variance: {formatCurrency(campaign.variance)}
                      </span>
                      <span className="text-gray-500">Efficiency: {campaign.efficiency}%</span>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActivePage("campaigns")}>
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>Spending distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div
                      className="w-4 h-4 rounded-full bg-blue-500"
                      style={{
                        backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                      }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">{item.category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{formatCurrency(item.amount)}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${item.trend.startsWith("+") ? "text-red-600" : "text-green-600"}`}
                          >
                            {item.trend}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={item.percentage} className="h-2 flex-1" />
                        <span className="text-xs text-gray-500 w-8">{item.percentage}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">Total Spending</span>
                <span className="font-bold">
                  {formatCurrency(costBreakdown.reduce((sum, item) => sum + item.amount, 0))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trend Analysis */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cost Trends & Forecasting</CardTitle>
          <CardDescription>Historical spending patterns and future projections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Monthly Average</h4>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(630000)}</p>
              <p className="text-xs text-gray-500 mt-1">+12% vs last quarter</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">Cost per Well</h4>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(157500)}</p>
              <p className="text-xs text-gray-500 mt-1">-8% vs industry avg</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">ROI Efficiency</h4>
              <p className="text-2xl font-bold text-purple-600">94.2%</p>
              <p className="text-xs text-gray-500 mt-1">+3% improvement</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-3">Cost Optimization Recommendations</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Equipment utilization can be improved by 15% through better scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Material costs trending upward - consider bulk purchasing agreements</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Labor efficiency improved 8% with new training programs</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 text-left justify-start" variant="outline" onClick={() => setActivePage("campaigns")}>
          <div>
            <div className="font-medium">Campaign Cost Review</div>
            <div className="text-xs text-gray-500">Analyze individual campaign performance</div>
          </div>
        </Button>
        <Button className="h-16 text-left justify-start" variant="outline" onClick={() => setActivePage("data")}>
          <div>
            <div className="font-medium">Export Cost Report</div>
            <div className="text-xs text-gray-500">Generate detailed financial reports</div>
          </div>
        </Button>
        <Button className="h-16 text-left justify-start" variant="outline" onClick={() => setActivePage("dashboard")}>
          <div>
            <div className="font-medium">Budget Settings</div>
            <div className="text-xs text-gray-500">Configure cost tracking parameters</div>
          </div>
        </Button>
      </div>
    </div>
  )
}
