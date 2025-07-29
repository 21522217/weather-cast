"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Star, StarOff, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock weather data - in real app, this would come from an API
const getWeatherData = (city: string) => ({
  city: city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, " "),
  country: "Country",
  current: {
    temp: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    uvIndex: 6,
    feelsLike: 27,
  },
  hourly: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    temp: Math.round(20 + Math.random() * 10),
    condition: ["Sunny", "Cloudy", "Partly Cloudy"][Math.floor(Math.random() * 3)],
    icon: "☀️",
  })),
  daily: Array.from({ length: 7 }, (_, i) => ({
    day: ["Today", "Tomorrow", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    high: Math.round(25 + Math.random() * 8),
    low: Math.round(15 + Math.random() * 5),
    condition: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][Math.floor(Math.random() * 4)],
    icon: "☀️",
    precipitation: Math.round(Math.random() * 100),
  })),
})

export default function WeatherPage() {
  const params = useParams()
  const city = params.city as string
  const [weatherData, setWeatherData] = useState(getWeatherData(city))
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // In real app, fetch weather data from API
    setWeatherData(getWeatherData(city))
  }, [city])

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In real app, save to favorites
  }

  const shareWeather = () => {
    if (navigator.share) {
      navigator.share({
        title: `Weather in ${weatherData.city}`,
        text: `Current temperature: ${weatherData.current.temp}°C - ${weatherData.current.condition}`,
        url: window.location.href,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              {weatherData.city}
            </h1>
            <p className="text-muted-foreground">{weatherData.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleFavorite}>
            {isFavorite ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={shareWeather}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Current Weather */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-6xl font-bold">{weatherData.current.temp}°C</div>
              <div className="text-xl text-muted-foreground">{weatherData.current.condition}</div>
              <div className="text-sm text-muted-foreground">Feels like {weatherData.current.feelsLike}°C</div>
            </div>
            <div className="text-8xl">☀️</div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Droplets className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{weatherData.current.humidity}%</div>
            <div className="text-sm text-muted-foreground">Humidity</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Wind className="h-8 w-8 mx-auto mb-2 text-gray-500" />
            <div className="text-2xl font-bold">{weatherData.current.windSpeed} km/h</div>
            <div className="text-sm text-muted-foreground">Wind Speed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{weatherData.current.visibility} km</div>
            <div className="text-sm text-muted-foreground">Visibility</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Gauge className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{weatherData.current.pressure} hPa</div>
            <div className="text-sm text-muted-foreground">Pressure</div>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Tabs */}
      <Tabs defaultValue="hourly" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
          <TabsTrigger value="daily">7-Day Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex overflow-x-auto gap-4 pb-4">
                {weatherData.hourly.slice(0, 12).map((hour, index) => (
                  <div key={index} className="flex flex-col items-center min-w-[80px] text-center">
                    <div className="text-sm text-muted-foreground">{hour.time}</div>
                    <div className="text-2xl my-2">{hour.icon}</div>
                    <div className="font-semibold">{hour.temp}°</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>7-Day Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weatherData.daily.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{day.icon}</div>
                      <div>
                        <div className="font-semibold">{day.day}</div>
                        <div className="text-sm text-muted-foreground">{day.condition}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-blue-500">{day.precipitation}%</div>
                      <div className="text-right">
                        <div className="font-semibold">{day.high}°</div>
                        <div className="text-sm text-muted-foreground">{day.low}°</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href={`/weather/${city}/chart`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Thermometer className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="font-semibold">Temperature Chart</div>
              <div className="text-sm text-muted-foreground">View detailed temperature trends</div>
            </CardContent>
          </Card>
        </Link>
        <Link href={`/weather/${city}/map`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="font-semibold">Weather Map</div>
              <div className="text-sm text-muted-foreground">Interactive weather radar</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/weather/favorites">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="font-semibold">Favorites</div>
              <div className="text-sm text-muted-foreground">Manage saved locations</div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
