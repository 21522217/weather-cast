"use client"

import { ArrowLeft, MapPin, Layers, Zap, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function MapPage() {
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
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Weather Map - {cityName}
          </h1>
          <p className="text-muted-foreground">Interactive weather radar and satellite imagery</p>
        </div>
      </div>

      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Map Layers
          </CardTitle>
          <CardDescription>Choose what weather data to display</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="cursor-pointer">
              Temperature
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Precipitation
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Wind
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Clouds
            </Badge>
            <Badge variant="outline" className="cursor-pointer">
              Pressure
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card>
        <CardContent className="p-0">
          <div className="h-[500px] bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg flex items-center justify-center relative overflow-hidden">
            {/* Mock Map Interface */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 mx-auto text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Interactive Weather Map</h3>
                <p className="text-blue-600 dark:text-blue-300">Real-time weather data visualization</p>
              </div>
              <div className="flex justify-center gap-4">
                <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                  <Cloud className="h-4 w-4" />
                  Cloud Cover: 45%
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                  <Zap className="h-4 w-4" />
                  Storm Activity: Low
                </div>
              </div>
            </div>

            {/* Mock Weather Markers */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
            <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-red-400 rounded-full animate-bounce" />
          </div>
        </CardContent>
      </Card>

      {/* Map Information */}
      <Tabs defaultValue="radar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="radar">Radar</TabsTrigger>
          <TabsTrigger value="satellite">Satellite</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="radar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weather Radar</CardTitle>
              <CardDescription>Real-time precipitation and storm tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Current Conditions</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Precipitation:</span>
                      <span className="text-blue-600">Light Rain</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Intensity:</span>
                      <span className="text-green-600">2.5 mm/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Movement:</span>
                      <span>NE at 15 km/h</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Radar Settings</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Cloud className="h-4 w-4 mr-2" />
                      Show Cloud Cover
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                      <Zap className="h-4 w-4 mr-2" />
                      Lightning Activity
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satellite" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Satellite Imagery</CardTitle>
              <CardDescription>High-resolution satellite weather data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Cloud className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Satellite View</h3>
                <p className="text-muted-foreground">
                  Real-time satellite imagery showing cloud formations and weather patterns
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Forecast Animation</CardTitle>
              <CardDescription>Predicted weather movement over the next 6 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Weather Forecast</h3>
                <p className="text-muted-foreground">
                  Animated forecast showing predicted weather patterns and movement
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
