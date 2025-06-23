"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { OperatingRoom, Surgery } from "@/types/scheduling"
import { BarChart3, TrendingUp, Clock } from "lucide-react"

interface ResourceUtilizationProps {
  rooms: OperatingRoom[]
  surgeries: Surgery[]
}

export function ResourceUtilization({ rooms, surgeries }: ResourceUtilizationProps) {
  const calculateUtilization = (roomId: string) => {
    const roomSurgeries = surgeries.filter((s) => s.roomId === roomId)
    const totalScheduledMinutes = roomSurgeries.reduce((sum, surgery) => {
      return sum + (surgery.scheduledEnd.getTime() - surgery.scheduledStart.getTime()) / (1000 * 60)
    }, 0)

    const workingHours = 8 * 60 // 8 hours in minutes
    return Math.min((totalScheduledMinutes / workingHours) * 100, 100)
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "text-red-600"
    if (utilization >= 70) return "text-yellow-600"
    return "text-green-600"
  }

  const overallUtilization =
    rooms.reduce((sum, room) => {
      return sum + calculateUtilization(room.id)
    }, 0) / rooms.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Resource Utilization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{Math.round(overallUtilization)}%</div>
            <div className="text-sm text-gray-600">Overall Utilization</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {rooms.filter((r) => r.status === "available").length}
            </div>
            <div className="text-sm text-gray-600">Available Rooms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {surgeries.filter((s) => s.status === "in-progress").length}
            </div>
            <div className="text-sm text-gray-600">Active Surgeries</div>
          </div>
        </div>

        {/* Room-by-Room Utilization */}
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Room Utilization
          </h3>
          {rooms.map((room) => {
            const utilization = calculateUtilization(room.id)
            const roomSurgeries = surgeries.filter((s) => s.roomId === room.id)

            return (
              <div key={room.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{room.name}</span>
                  <span className={`font-semibold ${getUtilizationColor(utilization)}`}>
                    {Math.round(utilization)}%
                  </span>
                </div>
                <Progress value={utilization} className="h-2" />
                <div className="text-xs text-gray-600">{roomSurgeries.length} surgeries scheduled</div>
              </div>
            )
          })}
        </div>

        {/* Efficiency Insights */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-800">Efficiency Insights</span>
          </div>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Peak utilization: 2:00 PM - 5:00 PM</li>
            <li>• Average surgery duration: 2.5 hours</li>
            <li>• Sterilization time: 45 minutes between surgeries</li>
            <li>• Emergency buffer: 15% capacity reserved</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
