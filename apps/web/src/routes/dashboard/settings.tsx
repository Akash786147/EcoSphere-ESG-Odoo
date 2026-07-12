import { createFileRoute } from "@tanstack/react-router";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Mail,
  MapPin,
  Building,
  LogOut,
  Camera,
  Shield,
  Bell,
  User,
  Clock,
  Briefcase
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsComponent,
});

function SettingsComponent() {
  return (
    <div className="max-w-[1200px] mx-auto pt-6 pb-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.15fr] gap-8 items-start">
        {/* Left Column: Profile Card */}
        <div className="flex flex-col gap-6">
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24 ring-2 ring-primary/10">
                    <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Alex Turner" />
                    <AvatarFallback className="text-2xl">AT</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">Alex Turner</h3>
                  <p className="text-sm text-muted-foreground mt-1">alex.turner@ecosphere.com</p>
                  <Badge variant="secondary" className="mt-3 font-medium">Sustainability Lead</Badge>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Building className="h-4 w-4 mr-3" />
                  <span>EcoSphere Corp</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Briefcase className="h-4 w-4 mr-3" />
                  <span>ESG Department</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Tab Content */}
        <div className="w-full">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1 border rounded-lg h-auto">
              <TabsTrigger value="profile" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="notifications" className="py-2.5 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
            </TabsList>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-0">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal details and public profile.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full name</Label>
                      <Input id="fullName" defaultValue="Alex Turner" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job title</Label>
                      <Input id="jobTitle" defaultValue="Sustainability Lead" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workEmail">Work email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input id="workEmail" type="email" defaultValue="alex.turner@ecosphere.com" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select defaultValue="esg">
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="esg">ESG & Sustainability</SelectItem>
                          <SelectItem value="engineering">Engineering</SelectItem>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="timezone">Time zone</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 h-4 w-4 z-10 text-muted-foreground" />
                        <Select defaultValue="pst">
                          <SelectTrigger id="timezone" className="pl-9">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                            <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t px-6 py-4 mt-2">
                  <Button className="ml-auto">Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-0 space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2 max-w-md">
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t px-6 py-4 mt-2">
                  <Button className="ml-auto">Update password</Button>
                </CardFooter>
              </Card>

              <Card className="shadow-sm border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Sessions
                  </CardTitle>
                  <CardDescription>
                    Manage your active sessions and log out of other devices.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    If you notice any suspicious activity, you can log out of all other devices. This will end all active sessions except for this one.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    Log out of other devices
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-0">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Choose what you want to be notified about.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-16 flex flex-col items-center justify-center text-center">
                  <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Bell className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mt-2">
                    Advanced notification preferences will be available in the next update.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
