"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Clock, Users, Target, BarChart3 } from "lucide-react"

export default function Analytics() {
  const kpis = [
    {
      title: "OR Utilization Rate",
      value: "87.3%",
      change: "+5.2%",
      trend: "up",
      target: "85%",
      description: "Average utilization across all ORs",
    },
    {
      title: "Average Surgery Duration",
      value: "142 min",
      change: "-8 min",
      trend: "down",
      target: "150 min",
      description: "Compared to historical average",
    },
    {
      title: "Schedule Adherence",
      value: "94.1%",
      change: "+2.3%",
      trend: "up",
      target: "90%",
      description: "Surgeries starting on time",
    },
    {
      title: "Patient Throughput",
      value: "28.5",
      change: "+3.2",
      trend: "up",
      target: "25",
      description: "Patients per day average",
    },
  ]

  const surgeryTypes = [
    { type: "Cardiac", count: 45, duration: 240, utilization: 92 },
    { type: "Orthopedic", count: 38, duration: 120, utilization: 85 },
    { type: "General", count: 52, duration: 90, utilization: 78 },
    { type: "Neurosurgery", count: 12, duration: 300, utilization: 95 },
    { type: "Emergency", count: 23, duration: 75, utilization: 88 },
  ]

  const surgeonPerformance = [
    { name: "Dr. Johnson", surgeries: 24, avgDuration: 185, efficiency: 96 },
    { name: "Dr. Martinez", surgeries: 31, avgDuration: 142, efficiency: 94 },
    { name: "Dr. Chen", surgeries: 28, avgDuration: 98, efficiency: 92 },
    { name: "Dr. Williams", surgeries: 19, avgDuration: 220, efficiency: 89 },
    { name: "Dr. Davis", surgeries: 26, avgDuration: 156, efficiency: 91 },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 truncate">{kpi.title}</h3>
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                ) : (
                  <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 flex-shrink-0" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-2xl sm:text-3xl font-bold">{kpi.value}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <Badge
                    variant="outline"
                    className={`${kpi.trend === "up" ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"} text-xs w-fit`}
                  >
                    {kpi.change}
                  </Badge>
                  <span className="text-xs text-gray-500">vs target: {kpi.target}</span>
                </div>
                <p className="text-xs text-gray-600">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Surgery Analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
              Surgery Type Analysis
            </CardTitle>
            <CardDescription className="text-sm">Performance metrics by procedure type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {surgeryTypes.map((surgery, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
                    <span className="font-medium text-sm sm:text-base">{surgery.type}</span>
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <span>{surgery.count} cases</span>
                      <span>{surgery.duration} min avg</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={surgery.utilization} className="flex-1" />
                    <span className="text-xs sm:text-sm font-medium w-8 sm:w-12 text-right">
                      {surgery.utilization}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              Surgeon Performance
            </CardTitle>
            <CardDescription className="text-sm">Individual surgeon metrics and efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {surgeonPerformance.map((surgeon, index) => (
                <div key={index} className="p-2 sm:p-3 border rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-medium text-sm sm:text-base">{surgeon.name}</span>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs w-fit">
                      {surgeon.efficiency}% efficiency
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2">
                    <div>
                      <span className="block">Surgeries: {surgeon.surgeries}</span>
                    </div>
                    <div>
                      <span className="block">Avg: {surgeon.avgDuration}min</span>
                    </div>
                  </div>
                  <Progress value={surgeon.efficiency} className="mt-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Target className="h-4 w-4 sm:h-5 sm:w-5" />
            AI Predictive Insights
          </CardTitle>
          <CardDescription className="text-sm">Machine learning predictions and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Demand Forecast</h4>
              <p className="text-xl sm:text-2xl font-bold text-blue-700 mb-1">+15%</p>
              <p className="text-xs sm:text-sm text-blue-600">Expected increase in cardiac surgeries next week</p>
            </div>

            <div className="p-3 sm:p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2 text-sm sm:text-base">Efficiency Opportunity</h4>
              <p className="text-xl sm:text-2xl font-bold text-green-700 mb-1">12 min</p>
              <p className="text-xs sm:text-sm text-green-600">Average time savings possible with AI optimization</p>
            </div>

            <div className="p-3 sm:p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-2 text-sm sm:text-base">Resource Alert</h4>
              <p className="text-xl sm:text-2xl font-bold text-orange-700 mb-1">3 days</p>
              <p className="text-xs sm:text-sm text-orange-600">Until cardiac monitor maintenance required</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Trends */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            Historical Performance Trends
          </CardTitle>
          <CardDescription className="text-sm">30-day performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-2">
                <span className="text-sm font-medium">OR Utilization Trend</span>
                <span className="text-xs sm:text-sm text-gray-600">Target: 85%</span>
              </div>
              <Progress value={87} className="h-2 sm:h-3" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs text-gray-500 mt-1">
                <span>Week 1: 82%</span>
                <span>Week 2: 85%</span>
                <span>Week 3: 89%</span>
                <span>Week 4: 87%</span>
              </div>
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-2">
                <span className="text-sm font-medium">On-Time Performance</span>
                <span className="text-xs sm:text-sm text-gray-600">Target: 90%</span>
              </div>
              <Progress value={94} className="h-2 sm:h-3" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-xs text-gray-500 mt-1">
                <span>Week 1: 88%</span>
                <span>Week 2: 92%</span>
                <span>Week 3: 96%</span>
                <span>Week 4: 94%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
