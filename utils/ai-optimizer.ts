import type { Surgery, Surgeon, OperatingRoom, AIRecommendation } from "@/types/scheduling"

export class AIScheduleOptimizer {
  static predictSurgeryDuration(procedure: string, surgeon: Surgeon, patientComplexity = 1): number {
    const baseDuration = surgeon.averageSurgeryDuration[procedure] || 120
    const complexityFactor = 0.8 + patientComplexity * 0.4
    const surgeonExperienceFactor = 0.9 // Assume experienced surgeons are 10% faster

    return Math.round(baseDuration * complexityFactor * surgeonExperienceFactor)
  }

  static generateOptimizationRecommendations(
    surgeries: Surgery[],
    rooms: OperatingRoom[],
    surgeons: Surgeon[],
  ): AIRecommendation[] {
    const recommendations: AIRecommendation[] = []

    // Check for scheduling conflicts
    const conflicts = this.detectConflicts(surgeries)
    conflicts.forEach((conflict, index) => {
      recommendations.push({
        id: `conflict-${index}`,
        type: "conflict_resolution",
        message: `Scheduling conflict detected: ${conflict.message}`,
        confidence: 0.95,
        suggestedAction: conflict.suggestion,
        impact: "high",
      })
    })

    // Suggest room optimization
    const roomOptimization = this.optimizeRoomAllocation(surgeries, rooms)
    if (roomOptimization) {
      recommendations.push({
        id: "room-optimization",
        type: "resource_allocation",
        message: roomOptimization.message,
        confidence: 0.87,
        suggestedAction: roomOptimization.action,
        impact: "medium",
      })
    }

    // Suggest schedule optimization
    const scheduleOptimization = this.optimizeSchedule(surgeries, surgeons)
    if (scheduleOptimization) {
      recommendations.push({
        id: "schedule-optimization",
        type: "schedule_optimization",
        message: scheduleOptimization.message,
        confidence: 0.82,
        suggestedAction: scheduleOptimization.action,
        impact: "medium",
      })
    }

    return recommendations
  }

  private static detectConflicts(surgeries: Surgery[]) {
    const conflicts: Array<{ message: string; suggestion: string }> = []

    // Check for surgeon double-booking
    const surgeonSchedules = new Map<string, Surgery[]>()
    surgeries.forEach((surgery) => {
      if (!surgeonSchedules.has(surgery.surgeonId)) {
        surgeonSchedules.set(surgery.surgeonId, [])
      }
      surgeonSchedules.get(surgery.surgeonId)!.push(surgery)
    })

    surgeonSchedules.forEach((surgeonSurgeries, surgeonId) => {
      for (let i = 0; i < surgeonSurgeries.length - 1; i++) {
        const current = surgeonSurgeries[i]
        const next = surgeonSurgeries[i + 1]

        if (current.scheduledEnd > next.scheduledStart) {
          conflicts.push({
            message: `Surgeon ${surgeonId} has overlapping surgeries`,
            suggestion: `Reschedule surgery ${next.id} to start after ${current.scheduledEnd.toLocaleTimeString()}`,
          })
        }
      }
    })

    return conflicts
  }

  private static optimizeRoomAllocation(surgeries: Surgery[], rooms: OperatingRoom[]) {
    const roomUtilization = new Map<string, number>()

    rooms.forEach((room) => {
      const roomSurgeries = surgeries.filter((s) => s.roomId === room.id)
      const totalMinutes = roomSurgeries.reduce((sum, surgery) => {
        return sum + (surgery.scheduledEnd.getTime() - surgery.scheduledStart.getTime()) / (1000 * 60)
      }, 0)

      roomUtilization.set(room.id, totalMinutes / (8 * 60)) // 8-hour day
    })

    const underutilizedRooms = Array.from(roomUtilization.entries())
      .filter(([_, utilization]) => utilization < 0.6)
      .map(([roomId]) => roomId)

    if (underutilizedRooms.length > 0) {
      return {
        message: `${underutilizedRooms.length} rooms are underutilized (< 60%)`,
        action: `Consider consolidating surgeries to rooms ${underutilizedRooms.slice(0, 2).join(", ")}`,
      }
    }

    return null
  }

  private static optimizeSchedule(surgeries: Surgery[], surgeons: Surgeon[]) {
    const emergencySurgeries = surgeries.filter((s) => s.priority === "emergency")
    const routineSurgeries = surgeries.filter((s) => s.priority === "routine")

    if (emergencySurgeries.length > 0 && routineSurgeries.length > 0) {
      return {
        message: `${emergencySurgeries.length} emergency surgeries may delay routine procedures`,
        action: "Consider rescheduling non-urgent routine surgeries to accommodate emergencies",
      }
    }

    return null
  }
}
