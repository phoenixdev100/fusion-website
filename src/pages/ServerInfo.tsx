import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { 
  Copy, 
  Check, 
  Users, 
  Clock, 
  Shield, 
  Award, 
  Star, 
  Heart, 
  Zap, 
  Globe,
  Server,
  HardDrive,
  Cpu,
  Activity,
  Gamepad2,
  MessageSquare,
  Download,
  AlertTriangle,
  HelpCircle,
  ChartLine,
  Map,
  Sword
} from 'lucide-react';
import { motion } from 'framer-motion';

// Define types for server stats
interface ServerStats {
  online: boolean;
  players: {
    online: number;
    max: number;
    list: Array<{
      name: string;
      rank: string;
      playtime: string;
    }>;
  };
  performance: {
    tps: number;
    mspt: number;
  };
  plugins: {
    name: string;
    version: string;
    author: string;
    status: 'enabled' | 'disabled';
  }[];
}

const ServerInfo = () => {
  const [lobbyStats, setLobbyStats] = useState<ServerStats>({
    online: false,
    players: { online: 0, max: 0, list: [] },
    performance: { tps: 0, mspt: 0 },
    plugins: []
  });
  const [pvpStats, setPvpStats] = useState<ServerStats>({
    online: false,
    players: { online: 0, max: 0, list: [] },
    performance: { tps: 0, mspt: 0 },
    plugins: []
  });
  const [lifestealStats, setLifestealStats] = useState<ServerStats>({
    online: false,
    players: { online: 0, max: 0, list: [] },
    performance: { tps: 0, mspt: 0 },
    plugins: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServerStats = async () => {
      try {
        setLoading(true);
        
        // Define server configurations
        const servers = {
          lobby: { address: 'master.fusionnetwork.fun:50011', queryPort: 50011 },
          pvp: { address: 'master.fusionnetwork.fun:50012', queryPort: 50012 },
          lifesteal: { address: 'master.fusionnetwork.fun:50014', queryPort: 50014 }
        };

        // Function to fetch server data with multiple fallback options
        const fetchServerData = async (serverAddress: string, queryPort: number) => {
          try {
            // Try mcsrvstat.us first
            const response = await fetch(`https://api.mcsrvstat.us/2/${serverAddress}`);
            let data = await response.json();

            // If no player data, try alternative API
            if (!data.players?.list) {
              const altResponse = await fetch(`https://mcapi.us/server/status?ip=${serverAddress.split(':')[0]}&port=${queryPort}`);
              const altData = await altResponse.json();
              
              if (altData.players?.sample) {
                data = {
                  ...data,
                  players: {
                    ...data.players,
                    list: altData.players.sample.map((p: any) => p.name)
                  }
                };
              }
            }

            return data;
          } catch (error) {
            console.error(`Failed to fetch ${serverAddress}:`, error);
            return null;
          }
        };

        // Fetch all servers in parallel
        const [lobbyData, pvpData, lifestealData] = await Promise.all([
          fetchServerData(servers.lobby.address, servers.lobby.queryPort),
          fetchServerData(servers.pvp.address, servers.pvp.queryPort),
          fetchServerData(servers.lifesteal.address, servers.lifesteal.queryPort)
        ]);

        // Helper function to extract players
        const extractPlayers = (data: any) => {
          if (!data || !data.players) return [];

          const playerList = data.players?.list || data.players?.sample || [];
          return playerList.map((player: any) => ({
            name: typeof player === 'string' ? player : player.name || "Unknown Player",
            rank: "Player",
            playtime: "Active"
          }));
        };

        // Update Lobby Stats
        if (lobbyData?.online) {
          setLobbyStats({
            online: lobbyData.online,
            players: {
              online: lobbyData.players?.online || 0,
              max: lobbyData.players?.max || 0,
              list: extractPlayers(lobbyData)
            },
            performance: {
              tps: lobbyData.performance?.tps || 20,
              mspt: lobbyData.performance?.mspt || 0
            },
            plugins: []
          });
        }

        // Update PvP Stats
        if (pvpData?.online) {
          setPvpStats({
            online: pvpData.online,
            players: {
              online: pvpData.players?.online || 0,
              max: pvpData.players?.max || 0,
              list: extractPlayers(pvpData)
            },
            performance: {
              tps: pvpData.performance?.tps || 20,
              mspt: pvpData.performance?.mspt || 0
            },
            plugins: []
          });
        }

        // Update Lifesteal Stats
        if (lifestealData?.online) {
          setLifestealStats({
            online: lifestealData.online,
            players: {
              online: lifestealData.players?.online || 0,
              max: lifestealData.players?.max || 0,
              list: extractPlayers(lifestealData)
            },
            performance: {
              tps: lifestealData.performance?.tps || 20,
              mspt: lifestealData.performance?.mspt || 0
            },
            plugins: []
          });
        }

        // Log the raw data for debugging
        console.log('Raw Server Data:', {
          lobby: { data: lobbyData, players: extractPlayers(lobbyData) },
          pvp: { data: pvpData, players: extractPlayers(pvpData) },
          lifesteal: { data: lifestealData, players: extractPlayers(lifestealData) }
        });

      } catch (error) {
        console.error('Failed to fetch server stats:', error);
        toast.error('Failed to fetch server statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchServerStats();
    const interval = setInterval(fetchServerStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const copyIP = () => {
    navigator.clipboard.writeText('fusion-network.xyz');
    toast.success('Server IP copied to clipboard!');
  };

  const downloadModpack = async () => {
    try {
      // Show loading state
      toast.loading('Preparing modpack download...');
      
      // Replace this URL with your actual modpack download URL
      const modpackUrl = 'https://modrinth.com/modpacks';
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = modpackUrl;
      link.download = 'FusionNetwork-Modpack.zip';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      toast.success('Modpack download started!');
    } catch (error) {
      console.error('Failed to download modpack:', error);
      toast.error('Failed to download modpack. Please try again later.');
    }
  };

  // Add this function at the top of your component to get player avatar URL
  const getPlayerAvatar = (playerName: string) => {
    return `https://mc-heads.net/avatar/${playerName}/32`;  // 32px size avatar
  };

  const ServerCard = ({ title, stats, description, icon }: { title: string; stats: ServerStats; description: string; icon: React.ReactNode }) => (
    <Card className="minecraft-border animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
          <Badge variant="outline" className="ml-2">
            {stats.players.online}/{stats.players.max}
          </Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-black/20 p-4 rounded-lg border border-gray-800 hover:border-fusion-primary transition-colors">
              <div className="text-sm text-gray-400">Status</div>
              <div className="font-bold text-lg flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${stats.online ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {stats.online ? 'Online' : 'Offline'}
              </div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-gray-800 hover:border-fusion-primary transition-colors">
              <div className="text-sm text-gray-400">TPS</div>
              <div className="font-bold text-lg">{stats.performance.tps.toFixed(1)}</div>
            </div>
            <div className="bg-black/20 p-4 rounded-lg border border-gray-800 hover:border-fusion-primary transition-colors">
              <div className="text-sm text-gray-400">MSPT</div>
              <div className="font-bold text-lg">{stats.performance.mspt.toFixed(1)}ms</div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Active Players</h4>
            {stats.players.list.length === 0 ? (
              <div className="text-center text-gray-400 py-4">
                No players currently online
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {stats.players.list.map((player, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-black/20 p-3 rounded-lg border border-gray-800 hover:border-fusion-primary transition-colors"
                  >
                    <div className="relative">
                      <img 
                        src={getPlayerAvatar(player.name)}
                        alt={`${player.name}'s avatar`}
                        className="w-8 h-8 rounded-sm shadow-lg"
                        loading="lazy"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{player.name}</span>
                      <span className="text-xs text-gray-400">{player.rank}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      <div className="container py-8 px-4 sm:px-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-fusion-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400">Fetching server status...</p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h1 className="text-3xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Server Status
              </h1>
              <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Check out our server status, features, and how to connect
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6 sm:space-y-8"
            >
              {/* Network Overview Card */}
              <motion.div variants={item} className="w-full">
                <Card className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      Network Overview
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-base sm:text-lg">Current network statistics</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-black/30 p-4 sm:p-6 rounded-2xl">
                        <h3 className="text-sm font-medium mb-2">Total Players</h3>
                        <div className="text-2xl sm:text-3xl font-bold">
                          {lobbyStats.players.online + pvpStats.players.online + lifestealStats.players.online}/
                          {lobbyStats.players.max + pvpStats.players.max + lifestealStats.players.max}
                        </div>
                      </div>
                      <div className="bg-black/30 p-4 sm:p-6 rounded-2xl">
                        <h3 className="text-sm font-medium mb-2">Active Servers</h3>
                        <div className="text-2xl sm:text-3xl font-bold">
                          {[lobbyStats.online, pvpStats.online, lifestealStats.online].filter(Boolean).length}/3
                        </div>
                      </div>
                      <div className="bg-black/30 p-4 sm:p-6 rounded-2xl">
                        <h3 className="text-sm font-medium mb-2">Network Status</h3>
                        <div className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-green-500"></span>
                          Online
                        </div>
                      </div>
                      <div className="bg-black/30 p-4 sm:p-6 rounded-2xl">
                        <h3 className="text-sm font-medium mb-2">Peak Players</h3>
                        <div className="text-2xl sm:text-3xl font-bold">
                          {Math.max(lobbyStats.players.max, pvpStats.players.max, lifestealStats.players.max)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Server Cards Grid */}
              <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {/* Lobby Server Card */}
                <Card className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      Lobby Server
                      </CardTitle>
                    <CardDescription className="text-gray-300">
                      Main hub for all players
                      </CardDescription>
                    </CardHeader>
                  
                  <CardContent className="relative">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                        <span className="text-gray-400">Status</span>
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${lobbyStats.online ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span>{lobbyStats.online ? 'Online' : 'Offline'}</span>
                        </div>
                                </div>
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                        <span className="text-gray-400">Players</span>
                        <span>{lobbyStats.players.online}/{lobbyStats.players.max}</span>
                                </div>
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                        <span className="text-gray-400">Performance</span>
                        <span>{lobbyStats.performance.tps.toFixed(1)} TPS</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                {/* PvP Server Card */}
                <Card className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      PvP Server
                      </CardTitle>
                    <CardDescription className="text-gray-300">
                      Competitive combat arena
                      </CardDescription>
                    </CardHeader>
                  
                  <CardContent className="relative">
                          <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                        <span className="text-gray-400">Status</span>
                            <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${pvpStats.online ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span>{pvpStats.online ? 'Online' : 'Offline'}</span>
                        </div>
                            </div>
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                        <span className="text-gray-400">Players</span>
                        <span>{pvpStats.players.online}/{pvpStats.players.max}</span>
                            </div>
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                        <span className="text-gray-400">Performance</span>
                        <span>{pvpStats.performance.tps.toFixed(1)} TPS</span>
                          </div>
                        </div>
                  </CardContent>
                </Card>

                {/* Lifesteal Server Card */}
                <Card className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                  
                  <CardHeader className="relative">
                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      Lifesteal Server
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Hardcore survival with a twist
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                        <span className="text-gray-400">Status</span>
                          <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${lifestealStats.online ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span>{lifestealStats.online ? 'Online' : 'Offline'}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                        <span className="text-gray-400">Players</span>
                        <span>{lifestealStats.players.online}/{lifestealStats.players.max}</span>
            </div>
                      <div className="flex items-center justify-between p-4 bg-black/20 rounded-2xl">
                        <span className="text-gray-400">Performance</span>
                        <span>{lifestealStats.performance.tps.toFixed(1)} TPS</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12 mt-8 sm:mt-12"
            >
              <Card className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-gray-900/50 border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Server Features
                  </CardTitle>
                  <CardDescription>
                    What makes our server unique
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-purple-400 mt-1" />
                    <div>
                        <h3 className="font-medium">Advanced Anti-Cheat</h3>
                        <p className="text-sm text-gray-400">Custom protection system for fair gameplay</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-5 w-5 text-yellow-400 mt-1" />
                    <div>
                        <h3 className="font-medium">Custom Plugins</h3>
                        <p className="text-sm text-gray-400">Unique features and gameplay mechanics</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-blue-400 mt-1" />
                      <div>
                        <h3 className="font-medium">High Performance</h3>
                        <p className="text-sm text-gray-400">Optimized for smooth gameplay experience</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-gray-900/50 border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    How to Connect
                  </CardTitle>
                  <CardDescription>
                    Join our server in a few simple steps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <span className="font-medium">Server IP</span>
                      <div className="flex items-center gap-2">
                        <code className="bg-black/30 px-3 py-1 rounded">fusion-network.xyz</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            navigator.clipboard.writeText('fusion-network.xyz');
                            toast.success('Server IP copied to clipboard');
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <span className="font-medium">Version</span>
                      <span>1.12 - 1.21</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black/20 rounded-lg">
                      <span className="font-medium">Status</span>
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        Online
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Player List Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-gray-900/50 border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Online Players</CardTitle>
                  <CardDescription>Currently active players across all servers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Lobby Players */}
                    {lobbyStats.players.list.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Globe className="h-5 w-5 text-emerald-400" />
                          Lobby
                          <span className="text-sm text-gray-400">
                            ({lobbyStats.players.online} players)
                          </span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {lobbyStats.players.list.map((player, index) => (
                            <motion.div
                              key={`lobby-${player.name}-${index}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-black/30 p-3 rounded-xl border border-gray-800 hover:border-emerald-500/50 transition-all duration-300"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={`https://mc-heads.net/avatar/${player.name}/40`}
                                  alt={`${player.name}'s avatar`}
                                  className="w-8 h-8 rounded"
                                />
                                <div>
                                  <div className="font-medium truncate">{player.name}</div>
                                  <div className="text-xs text-gray-400">{player.rank}</div>
                              </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                          </div>
                    )}

                    {/* PvP Players */}
                    {pvpStats.players.list.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Sword className="h-5 w-5 text-red-400" />
                          PvP
                          <span className="text-sm text-gray-400">
                            ({pvpStats.players.online} players)
                        </span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {pvpStats.players.list.map((player, index) => (
                            <motion.div
                              key={`pvp-${player.name}-${index}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-black/30 p-3 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all duration-300"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={`https://mc-heads.net/avatar/${player.name}/40`}
                                  alt={`${player.name}'s avatar`}
                                  className="w-8 h-8 rounded"
                                />
                                <div>
                                  <div className="font-medium truncate">{player.name}</div>
                                  <div className="text-xs text-gray-400">{player.rank}</div>
                              </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                          </div>
                    )}

                    {/* Lifesteal Players */}
                    {lifestealStats.players.list.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Heart className="h-5 w-5 text-blue-400" />
                          Lifesteal
                          <span className="text-sm text-gray-400">
                            ({lifestealStats.players.online} players)
                        </span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {lifestealStats.players.list.map((player, index) => (
                            <motion.div
                              key={`lifesteal-${player.name}-${index}`}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-black/30 p-3 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={`https://mc-heads.net/avatar/${player.name}/40`}
                                  alt={`${player.name}'s avatar`}
                                  className="w-8 h-8 rounded"
                                />
                                <div>
                                  <div className="font-medium truncate">{player.name}</div>
                                  <div className="text-xs text-gray-400">{player.rank}</div>
                              </div>
                              </div>
                            </motion.div>
                          ))}
                          {lifestealStats.players.online > lifestealStats.players.list.length && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-black/30 p-3 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center"
                            >
                              <div className="text-gray-400">
                                +{lifestealStats.players.online - lifestealStats.players.list.length} more
                              </div>
                            </motion.div>
                          )}
                        </div>
                          </div>
                        )}

                    {/* No Players Online Message */}
                    {lobbyStats.players.list.length === 0 && 
                     pvpStats.players.list.length === 0 && 
                     lifestealStats.players.list.length === 0 && (
                      <div className="text-center py-8 text-gray-400">
                        <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No players are currently online</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default ServerInfo;
