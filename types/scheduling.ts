export interface Surgeon {
  id: string
  name: string
  specialty: string
  availability: TimeSlot[]
  averageSurgeryDuration: Record<string, number> // procedure -> minutes
}

export interface Patient {
  id: string
  name: string
  priority: "emergency" | "urgent" | "routine"
  procedure: string
  estimatedDuration: number
  requiredEquipment: string[]
  surgeonId: string
}

export interface TimeSlot {
  start: Date
  end: Date
}

export interface OperatingRoom {
  id: string
  name: string
  equipment: string[]
  status: "available" | "occupied" | "maintenance" | "sterilization"
  currentSurgery?: Surgery
}

export interface Surgery {
  id: string
  patientId: string
  surgeonId: string
  roomId: string
  procedure: string
  scheduledStart: Date
  scheduledEnd: Date
  actualStart?: Date
  actualEnd?: Date
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  priority: "emergency" | "urgent" | "routine"
}

export interface AIRecommendation {
  id: string
  type: "schedule_optimization" | "conflict_resolution" | "resource_allocation"
  message: string
  confidence: number
  suggestedAction: string
  impact: "high" | "medium" | "low"
}

export interface ResourceUtilization {
  roomId: string
  utilizationRate: number
  scheduledHours: number
  availableHours: number
}
