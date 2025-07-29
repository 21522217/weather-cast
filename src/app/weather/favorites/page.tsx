"use client"

import { useState } from "react"
import { Star, MapPin, Trash2, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const initialFavorites = [
  { id: 1, name: "New York", country: "US", temp: 22, condition: "Sunny", lastUpdated: "2 min ago" },
  { id: 2, name: "London", country: "UK", temp: 18, condition: "Cloudy", lastUpdated: "5 min ago" },
  { id: 3, name: "Tokyo", country: "JP", temp: 25, condition: "Partly Cloudy", lastUpdated: "1 min ago" },
  { id: 4, name: "Sydney", country: "AU", temp: 20, condition: "Rainy", lastUpdated: "3 min ago" },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites)
  const [searchQuery, setSearchQuery] = useState("")

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
  }

  const filteredFavorites = favorites.filter(
    (fav) =>
      fav.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fav.country.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Star className="h-8 w-8 text-yellow-500" />
          Favorite Locations
        </h1>
        <p className="text-muted-foreground">Quick access to weather in your saved locations</p>
      </div>

      {/* Search and Add */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Favorites
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search your favorite cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Link href="/">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Favorites Grid */}
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFavorites.map((favorite) => (
            <Card key={favorite.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <h3 className="font-semibold">{favorite.name}</h3>
                      <p className="text-sm text-muted-foreground">{favorite.country}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFavorite(favorite.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <div className="text-3xl font-bold">{favorite.temp}°C</div>
                  <Badge variant="outline">{favorite.condition}</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Updated {favorite.lastUpdated}</span>
                  <Link href={`/weather/${favorite.name.toLowerCase().replace(/\s+/g, "-")}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">
              {searchQuery ? "No matching favorites found" : "No favorite locations yet"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Add cities to your favorites for quick weather access"}
            </p>
            <Link href="/">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Favorite
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      {favorites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Overview</CardTitle>
            <CardDescription>Weather summary across your favorite locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{favorites.length}</div>
                <div className="text-sm text-muted-foreground">Saved Locations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(favorites.reduce((acc, fav) => acc + fav.temp, 0) / favorites.length)}°C
                </div>
                <div className="text-sm text-muted-foreground">Average Temp</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {Math.max(...favorites.map((fav) => fav.temp))}°C
                </div>
                <div className="text-sm text-muted-foreground">Highest</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.min(...favorites.map((fav) => fav.temp))}°C
                </div>
                <div className="text-sm text-muted-foreground">Lowest</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
