import type { Surgery, Surgeon, OperatingRoom, Patient } from "@/types/scheduling"

export const mockSurgeons: Surgeon[] = [
  {
    id: "surgeon-1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiothoracic Surgery",
    availability: [],
    averageSurgeryDuration: {
      "Coronary Bypass": 240,
      "Valve Replacement": 180,
      Angioplasty: 90,
    },
  },
  {
    id: "surgeon-2",
    name: "Dr. Michael Chen",
    specialty: "Orthopedic Surgery",
    availability: [],
    averageSurgeryDuration: {
      "Hip Replacement": 120,
      "Knee Replacement": 90,
      Arthroscopy: 60,
    },
  },
  {
    id: "surgeon-3",
    name: "Dr. Emily Rodriguez",
    specialty: "Neurosurgery",
    availability: [],
    averageSurgeryDuration: {
      "Brain Tumor Removal": 300,
      "Spinal Fusion": 180,
      Craniotomy: 240,
    },
  },
]

export const mockOperatingRooms: OperatingRoom[] = [
  {
    id: "or-1",
    name: "OR 1 - Cardiac Suite",
    equipment: ["Heart-Lung Machine", "Defibrillator", "Anesthesia Machine"],
    status: "occupied",
  },
  {
    id: "or-2",
    name: "OR 2 - General Surgery",
    equipment: ["Laparoscopic Equipment", "Anesthesia Machine", "Electrocautery"],
    status: "available",
  },
  {
    id: "or-3",
    name: "OR 3 - Orthopedic Suite",
    equipment: ["C-Arm", "Orthopedic Table", "Anesthesia Machine"],
    status: "sterilization",
  },
  {
    id: "or-4",
    name: "OR 4 - Neurosurgery",
    equipment: ["Microscope", "Neuromonitoring", "Anesthesia Machine"],
    status: "available",
  },
]

export const mockSurgeries: Surgery[] = [
  {
    id: "surgery-1",
    patientId: "patient-1",
    surgeonId: "surgeon-1",
    roomId: "or-1",
    procedure: "Coronary Bypass",
    scheduledStart: new Date(2024, 0, 15, 8, 0),
    scheduledEnd: new Date(2024, 0, 15, 12, 0),
    status: "in-progress",
    priority: "urgent",
  },
  {
    id: "surgery-2",
    patientId: "patient-2",
    surgeonId: "surgeon-2",
    roomId: "or-3",
    procedure: "Hip Replacement",
    scheduledStart: new Date(2024, 0, 15, 9, 0),
    scheduledEnd: new Date(2024, 0, 15, 11, 0),
    status: "scheduled",
    priority: "routine",
  },
  {
    id: "surgery-3",
    patientId: "patient-3",
    surgeonId: "surgeon-3",
    roomId: "or-4",
    procedure: "Brain Tumor Removal",
    scheduledStart: new Date(2024, 0, 15, 13, 0),
    scheduledEnd: new Date(2024, 0, 15, 18, 0),
    status: "scheduled",
    priority: "urgent",
  },
  {
    id: "surgery-4",
    patientId: "patient-4",
    surgeonId: "surgeon-1",
    roomId: "or-2",
    procedure: "Valve Replacement",
    scheduledStart: new Date(2024, 0, 15, 14, 0),
    scheduledEnd: new Date(2024, 0, 15, 17, 0),
    status: "scheduled",
    priority: "routine",
  },
]

export const mockPatients: Patient[] = [
  {
    id: "patient-1",
    name: "John Smith",
    priority: "urgent",
    procedure: "Coronary Bypass",
    estimatedDuration: 240,
    requiredEquipment: ["Heart-Lung Machine", "Defibrillator"],
    surgeonId: "surgeon-1",
  },
  {
    id: "patient-2",
    name: "Maria Garcia",
    priority: "routine",
    procedure: "Hip Replacement",
    estimatedDuration: 120,
    requiredEquipment: ["C-Arm", "Orthopedic Table"],
    surgeonId: "surgeon-2",
  },
  {
    id: "patient-3",
    name: "David Wilson",
    priority: "urgent",
    procedure: "Brain Tumor Removal",
    estimatedDuration: 300,
    requiredEquipment: ["Microscope", "Neuromonitoring"],
    surgeonId: "surgeon-3",
  },
  {
    id: "patient-4",
    name: "Lisa Brown",
    priority: "routine",
    procedure: "Valve Replacement",
    estimatedDuration: 180,
    requiredEquipment: ["Heart-Lung Machine"],
    surgeonId: "surgeon-1",
  },
]
