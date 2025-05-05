import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Settings as SettingsIcon,
  Server,
  Shield,
  Bell,
  Mail,
  Globe,
  Users,
  Save
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Server Settings
  const [serverSettings, setServerSettings] = useState({
    serverName: 'Fusion MC Server',
    maxPlayers: '100',
    difficulty: 'normal',
    pvp: true,
    whitelist: false,
    maintenance: false
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    playerJoinAlerts: true,
    serverStatusAlerts: true,
    reportAlerts: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    requireEmailVerification: true,
    ipWhitelist: '',
    adminIPs: ''
  });

  const handleSaveSettings = async (settingType: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings Updated",
        description: `${settingType} settings have been saved successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1218] pt-16">
      <div className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-purple-400" />
            Admin Settings
          </h1>
          <p className="text-white/60">
            Configure your Minecraft server settings and administration preferences.
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="server" className="space-y-6">
          <TabsList className="bg-[#1A1D24] border-b border-white/10 p-1 rounded-lg">
            <TabsTrigger value="server" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Server className="h-4 w-4 mr-2" />
              Server
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Server Settings */}
          <TabsContent value="server">
            <Card className="bg-[#1A1D24] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Server Configuration</CardTitle>
                <CardDescription>
                  Manage your Minecraft server's basic settings and properties.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serverName" className="text-white">Server Name</Label>
                    <Input
                      id="serverName"
                      value={serverSettings.serverName}
                      onChange={(e) => setServerSettings({ ...serverSettings, serverName: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxPlayers" className="text-white">Max Players</Label>
                    <Input
                      id="maxPlayers"
                      type="number"
                      value={serverSettings.maxPlayers}
                      onChange={(e) => setServerSettings({ ...serverSettings, maxPlayers: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty" className="text-white">Difficulty</Label>
                    <select
                      id="difficulty"
                      value={serverSettings.difficulty}
                      onChange={(e) => setServerSettings({ ...serverSettings, difficulty: e.target.value })}
                      className="w-full rounded-md bg-white/5 border border-white/10 text-white px-3 py-2"
                    >
                      <option value="peaceful">Peaceful</option>
                      <option value="easy">Easy</option>
                      <option value="normal">Normal</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Enable PvP</Label>
                      <p className="text-sm text-white/60">Allow player versus player combat</p>
                    </div>
                    <Switch
                      checked={serverSettings.pvp}
                      onCheckedChange={(checked) => setServerSettings({ ...serverSettings, pvp: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Whitelist</Label>
                      <p className="text-sm text-white/60">Only allow whitelisted players to join</p>
                    </div>
                    <Switch
                      checked={serverSettings.whitelist}
                      onCheckedChange={(checked) => setServerSettings({ ...serverSettings, whitelist: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Maintenance Mode</Label>
                      <p className="text-sm text-white/60">Put server in maintenance mode</p>
                    </div>
                    <Switch
                      checked={serverSettings.maintenance}
                      onCheckedChange={(checked) => setServerSettings({ ...serverSettings, maintenance: checked })}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => handleSaveSettings('Server')}
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" /> Save Server Settings
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="bg-[#1A1D24] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications about server events.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Email Notifications</Label>
                      <p className="text-sm text-white/60">Receive important updates via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Player Join Alerts</Label>
                      <p className="text-sm text-white/60">Get notified when players join</p>
                    </div>
                    <Switch
                      checked={notificationSettings.playerJoinAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, playerJoinAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Server Status Alerts</Label>
                      <p className="text-sm text-white/60">Get notified about server status changes</p>
                    </div>
                    <Switch
                      checked={notificationSettings.serverStatusAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, serverStatusAlerts: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Report Alerts</Label>
                      <p className="text-sm text-white/60">Get notified about new player reports</p>
                    </div>
                    <Switch
                      checked={notificationSettings.reportAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, reportAlerts: checked })}
                    />
                  </div>
                </div>

                <Button
                  onClick={() => handleSaveSettings('Notification')}
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" /> Save Notification Settings
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card className="bg-[#1A1D24] border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Security Settings</CardTitle>
                <CardDescription>
                  Configure security settings and access controls for your server.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-sm text-white/60">Require 2FA for admin access</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Email Verification</Label>
                      <p className="text-sm text-white/60">Require email verification for new accounts</p>
                    </div>
                    <Switch
                      checked={securitySettings.requireEmailVerification}
                      onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireEmailVerification: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ipWhitelist" className="text-white">IP Whitelist</Label>
                    <Input
                      id="ipWhitelist"
                      placeholder="Enter IP addresses (comma separated)"
                      value={securitySettings.ipWhitelist}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <p className="text-sm text-white/60">Only allow these IPs to connect to the server</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adminIPs" className="text-white">Admin IP Addresses</Label>
                    <Input
                      id="adminIPs"
                      placeholder="Enter admin IP addresses (comma separated)"
                      value={securitySettings.adminIPs}
                      onChange={(e) => setSecuritySettings({ ...securitySettings, adminIPs: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <p className="text-sm text-white/60">IP addresses allowed to access admin features</p>
                  </div>
                </div>

                <Button
                  onClick={() => handleSaveSettings('Security')}
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save className="h-4 w-4" /> Save Security Settings
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings; 