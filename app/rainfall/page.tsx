"use client"

import type React from "react"

import { useState } from "react"

export default function RainfallPage() {
  const [location, setLocation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<null | {
    location: string;
    monthlyData: Array<{
      month: string;
      rainfall: number;
      probability: number;
    }>;
    seasonalOutlook: string;
    farmingRecommendations: string[];
  }>(null)
  
  const handleSubmit = (e: React.FormEvent\

