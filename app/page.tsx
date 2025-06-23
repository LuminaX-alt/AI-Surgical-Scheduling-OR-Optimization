"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Activity, TrendingUp, Settings, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SchedulingDashboard from "./components/scheduling-dashboard"
import ResourceManagement from "./components/resource-management"
import Analytics from "./components/analytics"
import AlertsPanel from "./components/alerts-panel"

export default function LuminaXDashboard() {
  const [activeTab, setActiveTab] = useState("scheduling")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const TabNavigation = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
        <TabsTrigger value="scheduling" className="text-xs sm:text-sm px-2 py-2">
          <Activity className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">AI Scheduling</span>
          <span className="sm:hidden">Schedule</span>
        </TabsTrigger>
        <TabsTrigger value="resources" className="text-xs sm:text-sm px-2 py-2">
          <Users className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Resources</span>
          <span className="sm:hidden">Resources</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="text-xs sm:text-sm px-2 py-2">
          <TrendingUp className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Analytics</span>
          <span className="sm:hidden">Analytics</span>
        </TabsTrigger>
        <TabsTrigger value="alerts" className="text-xs sm:text-sm px-2 py-2">
          <Clock className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Alerts</span>
          <span className="sm:hidden">Alerts</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Activity className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">LuminaX-alt</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  AI Surgical Scheduling & OR Optimization
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs sm:text-sm">
                <span className="hidden sm:inline">System </span>Online
              </Badge>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="sm:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="space-y-4 mt-6">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Today's Surgeries</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-900">24</p>
                </div>
                <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">OR Utilization</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-900">87%</p>
                </div>
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Active ORs</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-900">12/14</p>
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Avg Delay</p>
                  <p className="text-xl sm:text-3xl font-bold text-gray-900">8min</p>
                </div>
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="sticky top-16 sm:top-20 bg-gradient-to-br from-blue-50 to-indigo-100 pb-2 z-30">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
              <TabsTrigger value="scheduling" className="text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2">
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline sm:hidden">Schedule</span>
                <span className="hidden sm:inline">AI Scheduling</span>
              </TabsTrigger>
              <TabsTrigger value="resources" className="text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Resources</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden xs:inline">Alerts</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="scheduling">
            <SchedulingDashboard />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
