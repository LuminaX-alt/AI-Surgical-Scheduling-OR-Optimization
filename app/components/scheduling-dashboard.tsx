"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, User, Zap, AlertCircle, CheckCircle } from "lucide-react"

interface Surgery {
  id: string
  patient: string
  procedure: string
  surgeon: string
  duration: number
  priority: "High" | "Medium" | "Low"
  room: string
  startTime: string
  status: "Scheduled" | "In Progress" | "Completed" | "Delayed"
  aiOptimized: boolean
}

const mockSurgeries: Surgery[] = [
  {
    id: "1",
    patient: "John Smith",
    procedure: "Cardiac Bypass",
    surgeon: "Dr. Johnson",
    duration: 240,
    priority: "High",
    room: "OR-1",
    startTime: "08:00",
    status: "In Progress",
    aiOptimized: true,
  },
  {
    id: "2",
    patient: "Sarah Wilson",
    procedure: "Knee Replacement",
    surgeon: "Dr. Martinez",
    duration: 120,
    priority: "Medium",
    room: "OR-3",
    startTime: "10:30",
    status: "Scheduled",
    aiOptimized: true,
  },
  {
    id: "3",
    patient: "Michael Brown",
    procedure: "Appendectomy",
    surgeon: "Dr. Chen",
    duration: 60,
    priority: "High",
    room: "OR-2",
    startTime: "14:00",
    status: "Scheduled",
    aiOptimized: false,
  },
]

export default function SchedulingDashboard() {
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const [surgeries, setSurgeries] = useState(mockSurgeries)

  const optimizeSchedule = () => {
    setSurgeries((prev) =>
      prev.map((surgery) => ({
        ...surgery,
        aiOptimized: true,
      })),
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Delayed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            AI-Powered Schedule Optimization
          </CardTitle>
          <CardDescription className="text-sm">
            Optimize OR schedules considering surgeon availability, patient priority, and equipment sterilization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01-15">Today - Jan 15, 2024</SelectItem>
                  <SelectItem value="2024-01-16">Tomorrow - Jan 16, 2024</SelectItem>
                  <SelectItem value="2024-01-17">Jan 17, 2024</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs sm:text-sm">
                <Zap className="h-3 w-3 mr-1" />
                AI Suggestions Active
              </Badge>
            </div>
            <Button onClick={optimizeSchedule} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              <Zap className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Optimize Schedule</span>
              <span className="sm:hidden">Optimize</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Surgery Schedule */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Today's Surgery Schedule</CardTitle>
          <CardDescription className="text-sm">Real-time OR scheduling with AI optimization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {surgeries.map((surgery) => (
              <div key={surgery.id} className="border rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 flex-1">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">{surgery.startTime}</span>
                        <span className="text-gray-500 text-xs sm:text-sm">({surgery.duration} min)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-600">{surgery.room}</span>
                      </div>
                    </div>

                    <div className="flex flex-col min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base truncate">{surgery.patient}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{surgery.procedure}</p>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{surgery.surgeon}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:flex-nowrap">
                    <Badge className={`${getPriorityColor(surgery.priority)} text-xs`}>{surgery.priority}</Badge>
                    <Badge className={`${getStatusColor(surgery.status)} text-xs`}>{surgery.status}</Badge>
                    {surgery.aiOptimized && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">AI Optimized</span>
                        <span className="sm:hidden">AI</span>
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-blue-900 text-sm sm:text-base">Schedule Optimization</p>
                <p className="text-xs sm:text-sm text-blue-700">
                  Move Dr. Chen's appendectomy to 13:30 to reduce overall delay by 15 minutes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-yellow-900 text-sm sm:text-base">Equipment Conflict</p>
                <p className="text-xs sm:text-sm text-yellow-700">
                  Cardiac monitor needed for both OR-1 and OR-4 at 15:00. Consider rescheduling.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-green-900 text-sm sm:text-base">Efficiency Gain</p>
                <p className="text-xs sm:text-sm text-green-700">
                  Current schedule achieves 94% OR utilization - 7% above target
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
