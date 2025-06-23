"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Clock, Users, Wrench, CheckCircle, X, Bell } from "lucide-react"

interface Alert {
  id: string
  type: "critical" | "warning" | "info"
  category: "scheduling" | "equipment" | "staff" | "system"
  title: string
  description: string
  timestamp: string
  acknowledged: boolean
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    category: "equipment",
    title: "Anesthesia Machine Malfunction",
    description: "Anesthesia Machine #3 in OR-5 showing pressure irregularities",
    timestamp: "2 minutes ago",
    acknowledged: false,
  },
  {
    id: "2",
    type: "warning",
    category: "scheduling",
    title: "Surgery Delay Risk",
    description: "Dr. Johnson's 14:00 surgery may be delayed due to current procedure overrun",
    timestamp: "5 minutes ago",
    acknowledged: false,
  },
  {
    id: "3",
    type: "warning",
    category: "staff",
    title: "Staffing Shortage",
    description: "Only 2 anesthesiologists available for evening shift (3 required)",
    timestamp: "12 minutes ago",
    acknowledged: true,
  },
  {
    id: "4",
    type: "info",
    category: "system",
    title: "AI Optimization Complete",
    description: "Schedule optimization completed - 8% efficiency improvement achieved",
    timestamp: "18 minutes ago",
    acknowledged: true,
  },
  {
    id: "5",
    type: "critical",
    category: "scheduling",
    title: "Emergency Surgery Required",
    description: "Trauma patient incoming - OR-2 needed immediately",
    timestamp: "25 minutes ago",
    acknowledged: true,
  },
]

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all")

  const acknowledgeAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, acknowledged: true } : alert)))
  }

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id))
  }

  const getAlertIcon = (category: string) => {
    switch (category) {
      case "scheduling":
        return <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
      case "equipment":
        return <Wrench className="h-3 w-3 sm:h-4 sm:w-4" />
      case "staff":
        return <Users className="h-3 w-3 sm:h-4 sm:w-4" />
      case "system":
        return <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
      default:
        return <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
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

  const filteredAlerts = filter === "all" ? alerts : alerts.filter((alert) => alert.type === filter)
  const unacknowledgedCount = alerts.filter((alert) => !alert.acknowledged).length

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Alerts</p>
                <p className="text-xl sm:text-2xl font-bold">{alerts.length}</p>
              </div>
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Critical</p>
                <p className="text-xl sm:text-2xl font-bold text-red-600">
                  {alerts.filter((a) => a.type === "critical").length}
                </p>
              </div>
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Warnings</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                  {alerts.filter((a) => a.type === "warning").length}
                </p>
              </div>
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Unacknowledged</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{unacknowledgedCount}</p>
              </div>
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Filters */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Real-time Alerts & Monitoring</CardTitle>
          <CardDescription className="text-sm">System alerts and notifications for OR operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className="text-xs sm:text-sm"
            >
              All ({alerts.length})
            </Button>
            <Button
              variant={filter === "critical" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("critical")}
              className="text-xs sm:text-sm"
            >
              Critical ({alerts.filter((a) => a.type === "critical").length})
            </Button>
            <Button
              variant={filter === "warning" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("warning")}
              className="text-xs sm:text-sm"
            >
              Warning ({alerts.filter((a) => a.type === "warning").length})
            </Button>
            <Button
              variant={filter === "info" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("info")}
              className="text-xs sm:text-sm"
            >
              Info ({alerts.filter((a) => a.type === "info").length})
            </Button>
          </div>

          <div className="space-y-3">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 sm:p-4 border rounded-lg ${getAlertColor(alert.type)} ${
                  alert.acknowledged ? "opacity-60" : ""
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="mt-0.5 flex-shrink-0">{getAlertIcon(alert.category)}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm sm:text-base">{alert.title}</h4>
                        <Badge className={`${getBadgeColor(alert.type)} text-xs`}>{alert.type}</Badge>
                        {alert.acknowledged && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Acknowledged</span>
                            <span className="sm:hidden">Ack</span>
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 mb-2">{alert.description}</p>
                      <p className="text-xs text-gray-500">{alert.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!alert.acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="text-xs"
                      >
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden sm:inline">Acknowledge</span>
                        <span className="sm:hidden">Ack</span>
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => dismissAlert(alert.id)}>
                      <X className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">System Health Status</CardTitle>
          <CardDescription className="text-sm">Real-time monitoring of critical systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-2 sm:p-3 border rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-2">
                <span className="text-xs sm:text-sm font-medium">AI Optimization Engine</span>
                <Badge className="bg-green-100 text-green-800 text-xs w-fit">Online</Badge>
              </div>
              <p className="text-xs text-gray-600">Last optimization: 18 min ago</p>
            </div>

            <div className="p-2 sm:p-3 border rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-2">
                <span className="text-xs sm:text-sm font-medium">ERP Integration</span>
                <Badge className="bg-green-100 text-green-800 text-xs w-fit">Connected</Badge>
              </div>
              <p className="text-xs text-gray-600">Data sync: Real-time</p>
            </div>

            <div className="p-2 sm:p-3 border rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-2">
                <span className="text-xs sm:text-sm font-medium">HL7 Interface</span>
                <Badge className="bg-green-100 text-green-800 text-xs w-fit">Active</Badge>
              </div>
              <p className="text-xs text-gray-600">Messages processed: 1,247</p>
            </div>

            <div className="p-2 sm:p-3 border rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0 mb-2">
                <span className="text-xs sm:text-sm font-medium">Database</span>
                <Badge className="bg-yellow-100 text-yellow-800 text-xs w-fit">High Load</Badge>
              </div>
              <p className="text-xs text-gray-600">Response time: 245ms</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
