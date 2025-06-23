"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { OperatingRoom, Surgery } from "@/types/scheduling"
import { Clock, Users, Wrench, CheckCircle } from "lucide-react"

interface ORStatusProps {
  rooms: OperatingRoom[]
  surgeries: Surgery[]
}

export function ORStatus({ rooms, surgeries }: ORStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "occupied":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "sterilization":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available":
        return <CheckCircle className="h-4 w-4" />
      case "occupied":
        return <Users className="h-4 w-4" />
      case "maintenance":
        return <Wrench className="h-4 w-4" />
      case "sterilization":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getCurrentSurgery = (roomId: string) => {
    return surgeries.find((surgery) => surgery.roomId === roomId && surgery.status === "in-progress")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operating Room Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map((room) => {
            const currentSurgery = getCurrentSurgery(room.id)

            return (
              <div key={room.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{room.name}</h3>
                  <Badge className={getStatusColor(room.status)}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(room.status)}
                      {room.status}
                    </div>
                  </Badge>
                </div>

                {currentSurgery && (
                  <div className="bg-red-50 p-3 rounded text-sm">
                    <div className="font-medium text-red-800">Current Surgery: {currentSurgery.procedure}</div>
                    <div className="text-red-600">
                      {currentSurgery.scheduledStart.toLocaleTimeString()} -
                      {currentSurgery.scheduledEnd.toLocaleTimeString()}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Equipment</h4>
                  <div className="flex flex-wrap gap-1">
                    {room.equipment.map((equipment) => (
                      <Badge key={equipment} variant="outline" className="text-xs">
                        {equipment}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
