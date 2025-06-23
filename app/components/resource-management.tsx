"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, Wrench, Bed, Clock, CheckCircle } from "lucide-react"

interface Resource {
  id: string
  name: string
  type: "staff" | "equipment" | "room"
  status: "Available" | "In Use" | "Maintenance" | "Sterilizing"
  utilization: number
  nextAvailable?: string
}

const mockResources: Resource[] = [
  { id: "1", name: "Dr. Johnson", type: "staff", status: "In Use", utilization: 85, nextAvailable: "16:30" },
  { id: "2", name: "Dr. Martinez", type: "staff", status: "Available", utilization: 60 },
  { id: "3", name: "OR-1", type: "room", status: "In Use", utilization: 90, nextAvailable: "14:00" },
  { id: "4", name: "OR-2", type: "room", status: "Sterilizing", utilization: 75, nextAvailable: "13:45" },
  { id: "5", name: "Cardiac Monitor #1", type: "equipment", status: "In Use", utilization: 70, nextAvailable: "15:30" },
  {
    id: "6",
    name: "Anesthesia Machine #3",
    type: "equipment",
    status: "Maintenance",
    utilization: 0,
    nextAvailable: "18:00",
  },
]

export default function ResourceManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200"
      case "In Use":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Maintenance":
        return "bg-red-100 text-red-800 border-red-200"
      case "Sterilizing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "staff":
        return <Users className="h-3 w-3 sm:h-4 sm:w-4" />
      case "equipment":
        return <Wrench className="h-3 w-3 sm:h-4 sm:w-4" />
      case "room":
        return <Bed className="h-3 w-3 sm:h-4 sm:w-4" />
      default:
        return <Users className="h-3 w-3 sm:h-4 sm:w-4" />
    }
  }

  const staffResources = mockResources.filter((r) => r.type === "staff")
  const roomResources = mockResources.filter((r) => r.type === "room")
  const equipmentResources = mockResources.filter((r) => r.type === "equipment")

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Resource Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              Medical Staff
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Available: 8</span>
                <span>In Surgery: 6</span>
              </div>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-gray-600">75% utilization</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Bed className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              Operating Rooms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Active: 12</span>
                <span>Available: 2</span>
              </div>
              <Progress value={86} className="h-2" />
              <p className="text-xs text-gray-600">86% utilization</p>
            </div>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Wrench className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
              Equipment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Available: 45</span>
                <span>In Use: 32</span>
              </div>
              <Progress value={71} className="h-2" />
              <p className="text-xs text-gray-600">71% utilization</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Resource Status */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Staff Resources */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" />
              Surgical Staff
            </CardTitle>
            <CardDescription className="text-sm">Current availability and utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {staffResources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {getResourceIcon(resource.type)}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{resource.name}</p>
                      {resource.nextAvailable && (
                        <p className="text-xs sm:text-sm text-gray-500">Next: {resource.nextAvailable}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs sm:text-sm font-medium">{resource.utilization}%</p>
                      <Progress value={resource.utilization} className="w-12 sm:w-16 h-1" />
                    </div>
                    <Badge className={`${getStatusColor(resource.status)} text-xs`}>{resource.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Resources */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Bed className="h-4 w-4 sm:h-5 sm:w-5" />
              Operating Rooms
            </CardTitle>
            <CardDescription className="text-sm">Room status and sterilization schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {roomResources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {getResourceIcon(resource.type)}
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base truncate">{resource.name}</p>
                      {resource.nextAvailable && (
                        <p className="text-xs sm:text-sm text-gray-500">Available: {resource.nextAvailable}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs sm:text-sm font-medium">{resource.utilization}%</p>
                      <Progress value={resource.utilization} className="w-12 sm:w-16 h-1" />
                    </div>
                    <Badge className={`${getStatusColor(resource.status)} text-xs`}>{resource.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Equipment Status */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Wrench className="h-4 w-4 sm:h-5 sm:w-5" />
            Critical Equipment Status
          </CardTitle>
          <CardDescription className="text-sm">
            Real-time equipment availability and maintenance schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {equipmentResources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  {getResourceIcon(resource.type)}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm sm:text-base truncate">{resource.name}</p>
                    {resource.nextAvailable && (
                      <p className="text-xs sm:text-sm text-gray-500">Available: {resource.nextAvailable}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge className={`${getStatusColor(resource.status)} text-xs`}>{resource.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sterilization Schedule */}
      <Card>
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            Sterilization Schedule
          </CardTitle>
          <CardDescription className="text-sm">Equipment sterilization timeline and availability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-600 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">OR-2 Sterilization</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-600">Completes at 13:45</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 text-xs">
                  In Progress
                </Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 sm:gap-3">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">Surgical Instruments Set A</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-600">Ready for use</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">
                  Complete
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
