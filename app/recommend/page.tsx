"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Leaf, ArrowRight, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function RecommendPage() {
  const [formData, setFormData] = useState({
    nitrogen: 50,
    phosphorus: 50,
    potassium: 50,
    temperature: 25,
    humidity: 50,
    ph: 7,
    rainfall: 100,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | {
    crop: string
    confidence: number
    description: string
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

    // Simulate API call to ML model
    setTimeout(() => {
      // Mock result based on input values
      // In a real app, this would come from your ML model
      const mockCrops = [
        { crop: "Rice", description: "A staple food crop that thrives in wet conditions with high rainfall." },
        {
          crop: "Wheat",
          description: "A versatile grain crop suitable for moderate temperatures and well-drained soil.",
        },
        { crop: "Maize", description: "A high-yielding crop that prefers warm temperatures and moderate rainfall." },
        {
          crop: "Cotton",
          description: "A cash crop that grows well in warm climates with moderate water requirements.",
        },
      ]

      // Simple logic to pick a crop based on inputs
      let selectedCrop
      if (formData.rainfall > 200) {
        selectedCrop = mockCrops[0] // Rice for high rainfall
      } else if (formData.temperature < 20) {
        selectedCrop = mockCrops[1] // Wheat for cooler temperatures
      } else if (formData.nitrogen > 80) {
        selectedCrop = mockCrops[2] // Maize for high nitrogen
      } else {
        selectedCrop = mockCrops[3] // Cotton as default
      }

      setResult({
        crop: selectedCrop.crop,
        confidence: Math.floor(Math.random() * 20) + 80, // Random confidence between 80-99%
        description: selectedCrop.description,
      })

      setIsLoading(false)
    }, 2000)
  }

  const resetForm = () => {
    setFormData({
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
      temperature: 25,
      humidity: 50,
      ph: 7,
      rainfall: 100,
    })
    setResult(null)
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Crop Recommendation System</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Enter your soil and climate parameters to get AI-powered crop recommendations
          </p>
        </div>

        {!result ? (
          <Card>
            <CardHeader>
              <CardTitle>Enter Soil & Climate Parameters</CardTitle>
              <CardDescription>Provide accurate values for the best recommendations</CardDescription>
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
                        <Label htmlFor="temperature">Temperature (°C)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                <HelpCircle className="h-3 w-3" />
                                <span className="sr-only">Temperature info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Average temperature in Celsius</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2">
                        <Slider
                          id="temperature"
                          name="temperature"
                          min={0}
                          max={45}
                          step={0.1}
                          value={[formData.temperature]}
                          onValueChange={(value) => handleSliderChange("temperature", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="temperature"
                          value={formData.temperature}
                          onChange={handleInputChange}
                          className="w-16"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="humidity">Humidity (%)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                <HelpCircle className="h-3 w-3" />
                                <span className="sr-only">Humidity info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Relative humidity percentage</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2">
                        <Slider
                          id="humidity"
                          name="humidity"
                          min={0}
                          max={100}
                          step={1}
                          value={[formData.humidity]}
                          onValueChange={(value) => handleSliderChange("humidity", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="humidity"
                          value={formData.humidity}
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

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="rainfall">Rainfall (mm)</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full p-0">
                                <HelpCircle className="h-3 w-3" />
                                <span className="sr-only">Rainfall info</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Annual rainfall in millimeters</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="flex items-center gap-2">
                        <Slider
                          id="rainfall"
                          name="rainfall"
                          min={0}
                          max={300}
                          step={1}
                          value={[formData.rainfall]}
                          onValueChange={(value) => handleSliderChange("rainfall", value)}
                          className="flex-1"
                        />
                        <Input
                          type="number"
                          name="rainfall"
                          value={formData.rainfall}
                          onChange={handleInputChange}
                          className="w-16"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Analyzing..." : "Get Crop Recommendation"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-primary">
            <CardHeader className="bg-primary/10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Recommendation Results</CardTitle>
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <CardDescription>Based on your soil and climate parameters</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-primary">{result.crop}</h2>
                  <p className="text-sm text-muted-foreground mt-1">Recommendation Confidence: {result.confidence}%</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-muted-foreground">{result.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Your Input Parameters</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Nitrogen</p>
                      <p className="font-medium">{formData.nitrogen} mg/kg</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Phosphorus</p>
                      <p className="font-medium">{formData.phosphorus} mg/kg</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Potassium</p>
                      <p className="font-medium">{formData.potassium} mg/kg</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Temperature</p>
                      <p className="font-medium">{formData.temperature} °C</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Humidity</p>
                      <p className="font-medium">{formData.humidity}%</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">pH Level</p>
                      <p className="font-medium">{formData.ph}</p>
                    </div>
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-xs text-muted-foreground">Rainfall</p>
                      <p className="font-medium">{formData.rainfall} mm</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" onClick={resetForm} className="w-full sm:w-auto">
                Try Another Prediction
              </Button>
              <Button asChild className="w-full sm:w-auto">
                <Link href="/soil">
                  Analyze Soil Fertility
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

