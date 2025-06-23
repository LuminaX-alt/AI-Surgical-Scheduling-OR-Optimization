"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import type { AIRecommendation } from "@/types/scheduling"

interface AIRecommendationsProps {
  recommendations: AIRecommendation[]
  onAcceptRecommendation: (id: string) => void
}

export function AIRecommendations({ recommendations, onAcceptRecommendation }: AIRecommendationsProps) {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "conflict_resolution":
        return <AlertTriangle className="h-4 w-4" />
      case "resource_allocation":
        return <Clock className="h-4 w-4" />
      case "schedule_optimization":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recommendations at this time</p>
        ) : (
          recommendations.map((rec) => (
            <div key={rec.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(rec.type)}
                  <span className="font-medium capitalize">{rec.type.replace("_", " ")}</span>
                </div>
                <Badge className={getImpactColor(rec.impact)}>{rec.impact} impact</Badge>
              </div>

              <p className="text-sm text-gray-700">{rec.message}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Confidence:</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${rec.confidence * 100}%` }} />
                  </div>
                  <span className="text-xs text-gray-500">{Math.round(rec.confidence * 100)}%</span>
                </div>

                <Button
                  size="sm"
                  onClick={() => onAcceptRecommendation(rec.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Apply
                </Button>
              </div>

              <div className="bg-blue-50 p-3 rounded text-sm">
                <strong>Suggested Action:</strong> {rec.suggestedAction}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
