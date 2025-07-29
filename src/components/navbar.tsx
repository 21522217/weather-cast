"use client"

import { Cloud, Settings, Star, Map } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Cloud className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">WeatherApp</span>
        </Link>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/weather/favorites">
              <Button variant="ghost" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Favorites
              </Button>
            </Link>
            <Link href="/weather/map">
              <Button variant="ghost" size="sm">
                <Map className="h-4 w-4 mr-2" />
                Map
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
