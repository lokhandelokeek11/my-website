"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, HelpCircle, Sprout } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"

export default function SoilAnalysisPage() {
  const [formData, setFormData] = useState({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    ph: 7,
    organicMatter: 3,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | {
    fertilityScore: number
    status: "poor" | "moderate" | "good" | "excellent"
    recommendations: string[]
  }>(null)

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let numValue = Number.parseFloat(value)

    if (isNaN(numValue)) {
      numValue = 0
    }

    setFormData((prev) => ({
      ...prev,
      [name]: numValue,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call to soil analysis model
    setTimeout(() => {
      // Calculate a simple fertility score based on inputs
      // In a real app, this would use a more sophisticated model
      const npkAverage = (formData.nitrogen + formData.phosphorus + formData.potassium) / 3
      const phFactor = formData.ph >= 6 && formData.ph <= 7.5 ? 1 : 0.8
      const organicFactor = formData.organicMatter / 5

      const fertilityScore = Math.min(
        100,
        Math.round((npkAverage * 0.6 + formData.organicMatter * 20 * 0.3) * phFactor),
      )

      let status: "poor" | "moderate" | "good" | "excellent"
      let recommendations: string[] = []

      if (fertilityScore < 40) {
        status = "poor"
        recommendations = [
          "Apply balanced NPK fertilizer to improve overall soil fertility",
          "Add organic matter through compost or manure to enhance soil structure",
          "Consider liming if soil pH is below 6.0 to neutralize acidity",
          "Implement crop rotation with legumes to naturally fix nitrogen",
        ]
      } else if (fertilityScore < 60) {
        status = "moderate"
        recommendations = [
          "Add targeted nutrients based on specific deficiencies",
          "Increase organic matter content through cover crops or compost",
          "Monitor pH levels and adjust if necessary",
          "Consider soil testing every year to track improvements",
        ]
      } else if (fertilityScore < 80) {
        status = "good"
        recommendations = [
          "Maintain current fertility with regular additions of organic matter",
          "Apply maintenance fertilizer based on crop removal rates",
          "Practice conservation tillage to preserve soil structure",
          "Implement precision agriculture techniques for optimal nutrient management",
        ]
      } else {
        status = "excellent"
        recommendations = [
          "Continue current soil management practices",
          "Focus on maintaining organic matter levels",
          "Consider reducing fertilizer applications to prevent nutrient runoff",
          "Implement advanced soil health monitoring techniques",
        ]
      }

      setResult({
        fertilityScore,
        status,
        recommendations,
      })

      setIsLoading(false)
    }, 2000)
  }

  const resetForm = () => {
    setFormData({
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
      ph: 7,
      organicMatter: 3,
    })
    setResult(null)
  }

  const getFertilityColor = (score: number) => {
    if (score < 40) return "bg-red-500"
    if (score < 60) return "bg-yellow-500"
    if (score < 80) return "bg-green-500"
    return "bg-emerald-500"
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Soil Fertility Analysis</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Analyze your soil health and get personalized improvement recommendations
          </p>
        </div>

        {!result ? (
          <Card>
            <CardHeader>
              <CardTitle>Enter Soil Parameters</CardTitle>
              <CardDescription>Provide accurate values for the best analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                <HelpCircle className="h-3 w-3" />
                                <span className="sr-only">Nitrogen info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Nitrogen content in soil (mg/kg)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2">
                        <Slider
                          id="nitrogen"
                          name="nitrogen"
                          min={0}
                          max={140}
                          step={1}
                          value={[formData.nitrogen]}
                          onValueChange={(value) => handleSliderChange("nitrogen", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="nitrogen"
                          value={formData.nitrogen}
                          onChange={handleInputChange}
                          className="w-16"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                <HelpCircle className="h-3 w-3" />
                                <span className="sr-only">Phosphorus info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Phosphorus content in soil (mg/kg)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2">
                        <Slider
                          id="phosphorus"
                          name="phosphorus"
                          min={0}
                          max={140}
                          step={1}
                          value={[formData.phosphorus]}
                          onValueChange={(value) => handleSliderChange("phosphorus", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="phosphorus"
                          value={formData.phosphorus}
                          onChange={handleInputChange}
                          className="w-16"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="potassium">Potassium (K)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                <HelpCircle className="h-3 w-3" />
                                <span className="sr-only">Potassium info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Potassium content in soil (mg/kg)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2">
                        <Slider
                          id="potassium"
                          name="potassium"
                          min={0}
                          max={140}
                          step={1}
                          value={[formData.potassium]}
                          onValueChange={(value) => handleSliderChange("potassium", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="potassium"
                          value={formData.potassium}
                          onChange={handleInputChange}
                          className="w-16"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="ph">pH Level</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                <HelpCircle className="h-3 w-3" />
                                <span className="sr-only">pH info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">pH level of soil (0-14 scale)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2">
                        <Slider
                          id="ph"
                          name="ph"
                          min={0}
                          max={14}
                          step={0.1}
                          value={[formData.ph]}
                          onValueChange={(value) => handleSliderChange("ph", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="ph"
                          value={formData.ph}
                          onChange={handleInputChange}
                          className="w-16"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="organicMatter">Organic Matter (%)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                <HelpCircle className="h-3 w-3" />
                                <span className="sr-only">Organic Matter info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Percentage of organic matter in soil</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2">
                        <Slider
                          id="organicMatter"
                          name="organicMatter"
                          min={0}
                          max={10}
                          step={0.1}
                          value={[formData.organicMatter]}
                          onValueChange={(value) => handleSliderChange("organicMatter", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="organicMatter"
                          value={formData.organicMatter}
                          onChange={handleInputChange}
                          className="w-16"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Analyzing..." : "Analyze Soil Fertility"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-primary">
            <CardHeader className="bg-primary/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Soil Fertility Results</CardTitle>
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <CardDescription>Based on your soil parameters</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative mx-auto w-40 h-40 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-3xl font-bold">{result.fertilityScore}%</div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="10"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className={`${getFertilityColor(result.fertilityScore)} stroke-current`}
                        strokeWidth="10"
                        strokeLinecap="round"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={`${result.fertilityScore * 2.51} 251.2`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold capitalize">{result.status} Fertility</h2>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Soil Parameter Analysis</h3>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <Label>Nitrogen (N)</Label>
                        <span className="text-sm font-medium">{formData.nitrogen} mg/kg</span>
                      </div>
                      <Progress value={formData.nitrogen / 1.4} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <Label>Phosphorus (P)</Label>
                        <span className="text-sm font-medium">{formData.phosphorus} mg/kg</span>
                      </div>
                      <Progress value={formData.phosphorus / 1.4} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <Label>Potassium (K)</Label>
                        <span className="text-sm font-medium">{formData.potassium} mg/kg</span>
                      </div>
                      <Progress value={formData.potassium / 1.4} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <Label>pH Level</Label>
                        <span className="text-sm font-medium">{formData.ph}</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(formData.ph / 14) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <Label>Organic Matter</Label>
                        <span className="text-sm font-medium">{formData.organicMatter}%</span>
                      </div>
                      <Progress value={formData.organicMatter * 10} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Recommendations</h3>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                          <span className="text-xs text-primary font-medium">{index + 1}</span>
                        </div>
                        <span className="text-sm">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={resetForm} className="w-full sm:w-auto">
                New Analysis
              </Button>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/recommend">
                  Get Crop Recommendations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

