"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Surgery, Surgeon } from "@/types/scheduling"
import { Clock, User, AlertCircle } from "lucide-react"

interface ScheduleTimelineProps {
  surgeries: Surgery[]
  surgeons: Surgeon[]
}

export function ScheduleTimeline({ surgeries, surgeons }: ScheduleTimelineProps) {
  const getSurgeonName = (surgeonId: string) => {
    return surgeons.find((s) => s.id === surgeonId)?.name || "Unknown Surgeon"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "emergency":
        return "bg-red-100 text-red-800 border-red-200"
      case "urgent":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "routine":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "scheduled":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const sortedSurgeries = [...surgeries].sort((a, b) => a.scheduledStart.getTime() - b.scheduledStart.getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Surgery Schedule Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedSurgeries.map((surgery) => (
            <div key={surgery.id} className="border-l-4 border-blue-200 pl-4 pb-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{surgery.procedure}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    {getSurgeonName(surgery.surgeonId)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(surgery.priority)}>{surgery.priority}</Badge>
                  <Badge className={getStatusColor(surgery.status)}>{surgery.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Room:</span> {surgery.roomId.toUpperCase()}
                </div>
                <div>
                  <span className="font-medium">Patient ID:</span> {surgery.patientId}
                </div>
                <div>
                  <span className="font-medium">Scheduled:</span> {surgery.scheduledStart.toLocaleTimeString()} -{" "}
                  {surgery.scheduledEnd.toLocaleTimeString()}
                </div>
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {Math.round((surgery.scheduledEnd.getTime() - surgery.scheduledStart.getTime()) / (1000 * 60))} min
                </div>
              </div>

              {surgery.status === "in-progress" && (
                <div className="mt-2 flex items-center gap-2 text-blue-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Surgery in progress</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
