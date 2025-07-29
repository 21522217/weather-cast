"use client"

import { useState } from "react"
import { Settings, Thermometer, Globe, Bell, Shield, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    temperatureUnit: "celsius",
    language: "english",
    notifications: true,
    autoLocation: false,
    darkMode: true,
    weatherAlerts: true,
  })

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Settings className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground">Customize your weather app experience</p>
      </div>

      {/* Weather Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Weather Preferences
          </CardTitle>
          <CardDescription>Configure how weather data is displayed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="temperature-unit">Temperature Unit</Label>
            <Select value={settings.temperatureUnit} onValueChange={(value) => updateSetting("temperatureUnit", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                <SelectItem value="kelvin">Kelvin (K)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wind-speed">Wind Speed Unit</Label>
            <Select defaultValue="kmh">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kmh">km/h</SelectItem>
                <SelectItem value="mph">mph</SelectItem>
                <SelectItem value="ms">m/s</SelectItem>
                <SelectItem value="knots">knots</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pressure">Pressure Unit</Label>
            <Select defaultValue="hpa">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hpa">hPa</SelectItem>
                <SelectItem value="inhg">inHg</SelectItem>
                <SelectItem value="mmhg">mmHg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language & Region
          </CardTitle>
          <CardDescription>Set your preferred language and regional settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Español</SelectItem>
                <SelectItem value="french">Français</SelectItem>
                <SelectItem value="german">Deutsch</SelectItem>
                <SelectItem value="chinese">中文</SelectItem>
                <SelectItem value="japanese">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-format">Time Format</Label>
            <Select defaultValue="24h">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                <SelectItem value="24h">24-hour</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive weather updates and alerts</p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => updateSetting("notifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weather-alerts">Weather Alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified about severe weather</p>
            </div>
            <Switch
              id="weather-alerts"
              checked={settings.weatherAlerts}
              onCheckedChange={(checked) => updateSetting("weatherAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="daily-forecast">Daily Forecast</Label>
              <p className="text-sm text-muted-foreground">Morning weather summary</p>
            </div>
            <Switch id="daily-forecast" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Location
          </CardTitle>
          <CardDescription>Control location access and data privacy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-location">Auto-detect Location</Label>
              <p className="text-sm text-muted-foreground">Automatically use your current location</p>
            </div>
            <Switch
              id="auto-location"
              checked={settings.autoLocation}
              onCheckedChange={(checked) => updateSetting("autoLocation", checked)}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Data Usage</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Location Data</span>
                <Badge variant="outline">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm">Usage Analytics</span>
                <Badge variant="secondary">Optional</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>App Version</Label>
              <p className="text-sm text-muted-foreground">2.1.0</p>
            </div>
            <div className="space-y-2">
              <Label>Last Updated</Label>
              <p className="text-sm text-muted-foreground">January 2025</p>
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Privacy Policy
            </Button>
            <Button variant="outline" size="sm">
              Terms of Service
            </Button>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-center">
        <Button size="lg" className="px-8">
          Save Settings
        </Button>
      </div>
    </div>
  )
}
