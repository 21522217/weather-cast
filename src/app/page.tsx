"use client"

import type React from "react"

import { useState } from "react"
import { Search, MapPin, Clock, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const popularCities = [
  { name: "New York", country: "US", temp: "22°C", condition: "Sunny" },
  { name: "London", country: "UK", temp: "18°C", condition: "Cloudy" },
  { name: "Tokyo", country: "JP", temp: "25°C", condition: "Partly Cloudy" },
  { name: "Sydney", country: "AU", temp: "20°C", condition: "Rainy" },
  { name: "Paris", country: "FR", temp: "19°C", condition: "Sunny" },
  { name: "Hanoi", country: "VN", temp: "28°C", condition: "Hot" },
]

const recentSearches = ["San Francisco", "Berlin", "Mumbai", "Dubai"]

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to weather page for the searched city
      window.location.href = `/weather/${searchQuery.toLowerCase().replace(/\s+/g, "-")}`
    }
  }

  const handleAutoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          console.log("Location:", position.coords.latitude, position.coords.longitude)
          // For demo, redirect to a default city
          window.location.href = "/weather/current-location"
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-600 bg-clip-text text-transparent">
          Weather Forecast
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get accurate weather information for any city worldwide. Search for a location or use your current position.
        </p>
      </div>

      {/* Search Section */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Weather
          </CardTitle>
          <CardDescription>Enter a city name to get current weather and forecast</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Enter city name (e.g., New York, London, Tokyo)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={!searchQuery.trim()}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleAutoLocation} className="flex items-center gap-2 bg-transparent">
              <MapPin className="h-4 w-4" />
              Use Current Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Searches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((city) => (
                <Link key={city} href={`/weather/${city.toLowerCase().replace(/\s+/g, "-")}`}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {city}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Popular Cities */}
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 flex items-center justify-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Popular Cities
          </h2>
          <p className="text-muted-foreground">Quick access to weather in major cities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {popularCities.map((city) => (
            <Link
              key={`${city.name}-${city.country}`}
              href={`/weather/${city.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{city.name}</h3>
                      <p className="text-sm text-muted-foreground">{city.country}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{city.temp}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{city.condition}</Badge>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Explore more features of the weather app</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/weather/favorites">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                <Star className="h-6 w-6" />
                <span>Favorites</span>
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                <MapPin className="h-6 w-6" />
                <span>Settings</span>
              </Button>
            </Link>
            <Link href="/weather/map">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <span>Weather Map</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
