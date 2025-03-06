import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Leaf, Sprout, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Farm field"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        </div>

        <div className="container relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Smart Farming with <span className="text-primary">AI-Powered</span> Crop Recommendations
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Get personalized crop recommendations based on your soil conditions, climate data, and farming practices
                to maximize your yield and sustainability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/recommend">Get Crop Recommendations</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/signup">Create Free Account</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Farmer using tablet in field"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Key Features</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive tools to help you make informed farming decisions
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <Leaf className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Crop Recommendation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get AI-powered crop suggestions based on your soil parameters and local climate conditions.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Droplets className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Rainfall Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access accurate rainfall forecasts to plan your planting and harvesting schedule effectively.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Sprout className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Soil Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Analyze your soil fertility and receive personalized recommendations for improvement.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <Users className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Farmer Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Connect with other farmers, share experiences, and learn from agricultural experts.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Simple steps to get personalized farming recommendations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Enter Soil Data</h3>
              <p className="text-muted-foreground">
                Input your soil's N, P, K values, pH level, and other parameters through our simple form.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Get AI Analysis</h3>
              <p className="text-muted-foreground">
                Our machine learning algorithm processes your data to generate accurate recommendations.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Implement Insights</h3>
              <p className="text-muted-foreground">
                Apply the recommendations to improve your crop yield and soil health for sustainable farming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Optimize Your Farm?</h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of farmers who are already using FarmAdvisor to improve their yields.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/recommend">Try It Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">Sign Up Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

