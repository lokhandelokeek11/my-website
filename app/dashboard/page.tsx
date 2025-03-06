"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Calendar, CloudRain, Droplets, Leaf, Sprout } from "lucide-react"

// Mock data for charts
const mockRecommendationHistory = [
  { id: 1, date: "2023-05-15", crop: "Rice", confidence: 92 },
  { id: 2, date: "2023-06-20", crop: "Wheat", confidence: 87 },
  { id: 3, date: "2023-07-10", crop: "Maize", confidence: 95 },
  { id: 4, date: "2023-08-05", crop: "Cotton", confidence: 89 },
]

const mockSoilHistory = [
  { id: 1, date: "2023-05-15", fertility: 78, nitrogen: 60, phosphorus: 45, potassium: 55 },
  { id: 2, date: "2023-06-20", fertility: 65, nitrogen: 50, phosphorus: 40, potassium: 45 },
  { id: 3, date: "2023-07-10", fertility: 82, nitrogen: 65, phosphorus: 55, potassium: 60 },
  { id: 4, date: "2023-08-05", fertility: 75, nitrogen: 55, phosphorus: 50, potassium: 50 },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Farmer Dashboard</h1>
          <p className="text-muted-foreground">Monitor your farm data and get personalized recommendations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/recommend">New Prediction</Link>
          </Button>
          <Button asChild>
            <Link href="/soil">Analyze Soil</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="soil">Soil Analysis</TabsTrigger>
          <TabsTrigger value="rainfall">Rainfall</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Recent Crop</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Maize</div>
                <p className="text-xs text-muted-foreground">Recommended on Jul 10, 2023</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Soil Fertility</CardTitle>
                <Sprout className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82%</div>
                <p className="text-xs text-muted-foreground">Last analyzed on Jul 10, 2023</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Rainfall Forecast</CardTitle>
                <CloudRain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120mm</div>
                <p className="text-xs text-muted-foreground">Expected for next month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">Predictions Made</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">Total crop recommendations</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Recommendations</CardTitle>
                <CardDescription>Your last 4 crop recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecommendationHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Leaf className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{item.crop}</p>
                          <p className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">{item.confidence}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Soil Fertility Trend</CardTitle>
                <CardDescription>Your soil fertility over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {mockSoilHistory.map((item) => (
                    <div key={item.id} className="relative flex-1 flex flex-col items-center">
                      <div className="w-full bg-primary rounded-t-md" style={{ height: `${item.fertility}%` }}></div>
                      <div className="text-xs mt-2">
                        {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                      <div className="absolute -top-6 text-xs font-medium">{item.fertility}%</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                    <span className="text-xs text-muted-foreground">Fertility Score</span>
                  </div>
                  <Button variant="link" size="sm" asChild>
                    <Link href="/soil">View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crop Recommendation History</CardTitle>
              <CardDescription>View all your past crop recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockRecommendationHistory.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Leaf className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{item.crop}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(item.date).toLocaleDateString()} • Confidence: {item.confidence}%
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/recommend">Get New Recommendation</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="soil" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Soil Fertility Analysis</CardTitle>
              <CardDescription>Track your soil health over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockSoilHistory.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <h3 className="font-semibold">Analysis from {new Date(item.date).toLocaleDateString()}</h3>
                        <p className="text-sm text-muted-foreground">Overall Fertility Score: {item.fertility}%</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Nitrogen</p>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${item.nitrogen}%` }}></div>
                        </div>
                        <p className="text-xs font-medium">{item.nitrogen}%</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Phosphorus</p>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${item.phosphorus}%` }}
                          ></div>
                        </div>
                        <p className="text-xs font-medium">{item.phosphorus}%</p>
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Potassium</p>
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${item.potassium}%` }}></div>
                        </div>
                        <p className="text-xs font-medium">{item.potassium}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/soil">New Soil Analysis</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="rainfall" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rainfall Predictions</CardTitle>
              <CardDescription>Monthly rainfall forecasts for your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end gap-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  // Mock rainfall data
                  const rainfall = Math.floor(Math.random() * 150) + 50
                  const month = new Date(2023, i, 1).toLocaleString("default", { month: "short" })

                  return (
                    <div key={i} className="relative flex-1 flex flex-col items-center">
                      <div className="w-full bg-blue-500 rounded-t-md" style={{ height: `${rainfall / 2}px` }}></div>
                      <div className="text-xs mt-2">{month}</div>
                      <div className="absolute -top-6 text-xs font-medium">{rainfall}mm</div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <h3 className="font-semibold">Rainfall Insights</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on historical data and weather forecasts, your area is expected to receive above-average
                  rainfall in the coming months. This is favorable for crops like rice and wheat.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/rainfall">Detailed Rainfall Analysis</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Farming Calendar</CardTitle>
              <CardDescription>Important dates and farming activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 border rounded-lg bg-muted/50">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Planting Season</h3>
                    <p className="text-sm text-muted-foreground">May 15 - June 10, 2023</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Droplets className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Irrigation Schedule</h3>
                    <p className="text-sm text-muted-foreground">Every 3 days until July 15, 2023</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Sprout className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Fertilizer Application</h3>
                    <p className="text-sm text-muted-foreground">June 20, 2023</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 border rounded-lg">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Harvest Period</h3>
                    <p className="text-sm text-muted-foreground">September 10 - 25, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

