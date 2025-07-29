"use client"

import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock chart data
const temperatureData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i.toString().padStart(2, "0")}:00`,
  temperature: Math.round(20 + Math.sin(i / 4) * 8 + Math.random() * 4),
  humidity: Math.round(60 + Math.cos(i / 3) * 20 + Math.random() * 10),
}))

const weeklyData = Array.from({ length: 7 }, (_, i) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
  high: Math.round(25 + Math.random() * 8),
  low: Math.round(15 + Math.random() * 5),
  precipitation: Math.round(Math.random() * 100),
}))

export default function ChartPage() {
  const params = useParams()
  const city = params.city as string
  const cityName = city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, " ")

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/weather/${city}`}>
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Weather
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Weather Charts - {cityName}</h1>
          <p className="text-muted-foreground">Detailed weather data visualization</p>
        </div>
      </div>

      {/* Temperature Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            24-Hour Temperature Trend
          </CardTitle>
          <CardDescription>Temperature variations throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              temperature: {
                label: "Temperature (°C)",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="var(--color-temperature)"
                  fill="var(--color-temperature)"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Humidity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Humidity Levels
          </CardTitle>
          <CardDescription>Humidity percentage over 24 hours</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              humidity: {
                label: "Humidity (%)",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="humidity" stroke="var(--color-humidity)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weekly Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Temperature Range</CardTitle>
          <CardDescription>High and low temperatures for the week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              high: {
                label: "High (°C)",
                color: "hsl(var(--chart-3))",
              },
              low: {
                label: "Low (°C)",
                color: "hsl(var(--chart-4))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="high" stroke="var(--color-high)" strokeWidth={2} />
                <Line type="monotone" dataKey="low" stroke="var(--color-low)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
