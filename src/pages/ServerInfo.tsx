import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import { 
  Copy, 
  Users, 
  Shield, 
  Award, 
  Heart, 
  Zap, 
  Globe,
  Sword,
  Settings
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
  const [duelsStats, setduelsStats] = useState<ServerStats>({
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
  // Removed Discord settings state

  useEffect(() => {
    const fetchServerStats = async () => {
      try {
        setLoading(true);
        
        // Define server configurations
        const servers = {
          duels: { address: 'master.fusionnetwork.fun:50015', queryPort: 50015 },
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
        const [duelsData, pvpData, lifestealData] = await Promise.all([
          fetchServerData(servers.duels.address, servers.duels.queryPort),
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

        // Update duels Stats
        if (duelsData?.online) {
          setduelsStats({
            online: duelsData.online,
            players: {
              online: duelsData.players?.online || 0,
              max: duelsData.players?.max || 0,
              list: extractPlayers(duelsData)
            },
            performance: {
              tps: duelsData.performance?.tps || 20,
              mspt: duelsData.performance?.mspt || 0
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
        // console.log('Raw Server Data:', {
        //   duels: { data: duelsData, players: extractPlayers(duelsData) },
        //   pvp: { data: pvpData, players: extractPlayers(pvpData) },
        //   lifesteal: { data: lifestealData, players: extractPlayers(lifestealData) }
        // });
        
        // Update the stats with the fetched data
        if (duelsData?.online) {
          setduelsStats({
            online: duelsData.online,
            players: {
              online: duelsData.players?.online || 0,
              max: duelsData.players?.max || 0,
              list: extractPlayers(duelsData)
            },
            performance: {
              tps: duelsData.performance?.tps || 20,
              mspt: duelsData.performance?.mspt || 0
            },
            plugins: []
          });
        }
        
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
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                          Network Overview
                        </CardTitle>
                        <CardDescription className="text-gray-300 text-base sm:text-lg">Current network statistics</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 bg-black/30 px-4 py-2 rounded-full">
                        <span className="h-3 w-3 rounded-full animate-pulse bg-green-500"></span>
                        <span className="text-green-400 font-medium">LIVE</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-black/30 p-4 sm:p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-medium">Total Players</h3>
                          <Users className="h-5 w-5 text-purple-400" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                          {duelsStats.players.online + pvpStats.players.online + lifestealStats.players.online}/
                          {(duelsStats.players.online + pvpStats.players.online + lifestealStats.players.online)+1}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Active players across all servers</div>
                      </div>
                      <div className="bg-black/30 p-4 sm:p-6 rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-medium">Active Servers</h3>
                          <Globe className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">
                          {[duelsStats.online, pvpStats.online, lifestealStats.online].filter(Boolean).length}/3
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Servers currently running</div>
                      </div>
                      <div className="bg-black/30 p-4 sm:p-6 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-medium">Network Status</h3>
                          <Zap className="h-5 w-5 text-blue-400" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-green-500"></span>
                          Online
                        </div>
                        <div className="text-xs text-gray-400 mt-1">All systems operational</div>
                      </div>
                      <div className="bg-black/30 p-4 sm:p-6 rounded-2xl border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-sm font-medium">Peak Players</h3>
                          <Award className="h-5 w-5 text-amber-400" />
                        </div>
                        <div className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-400">
                          {Math.max(duelsStats.players.max, pvpStats.players.max, lifestealStats.players.max)}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">Highest player count today</div>
                      </div>
                    </div>
                    <div className="mt-6 text-xs text-gray-400 text-center">
                      Last updated: {new Date().toLocaleTimeString()} • Auto-refreshes every 30 seconds
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Server Cards Grid */}
              <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                {/* Duels Server Card */}
                <Card className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                  
                  <CardHeader className="relative pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 flex items-center gap-2">
                          <Shield className="h-5 w-5 text-emerald-400" />
                          Duels Server
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Main hub for all players
                        </CardDescription>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${duelsStats.online ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                        {duelsStats.online ? 'ONLINE' : 'OFFLINE'}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
                          <div className="text-xs text-gray-400 mb-1">Players</div>
                          <div className="text-xl font-bold flex items-center gap-2">
                            <Users className="h-4 w-4 text-emerald-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                              {duelsStats.players.online}/{(duelsStats.players.online)+1}
                            </span>
                          </div>
                        </div>
                        <div className="bg-black/30 p-4 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300">
                          <div className="text-xs text-gray-400 mb-1">Performance</div>
                          <div className="text-xl font-bold flex items-center gap-2">
                            <Zap className="h-4 w-4 text-emerald-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400">
                              {duelsStats.performance.tps.toFixed(1)} TPS
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-xs text-gray-400 mb-2">Server Health</div>
                        <div className="w-full bg-black/30 rounded-full h-2.5 mb-1 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(duelsStats.performance.tps / 20 * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Poor</span>
                          <span>Good</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PvP Server Card */}
                <Card className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                  
                  <CardHeader className="relative pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 flex items-center gap-2">
                          <Sword className="h-5 w-5 text-red-400" />
                          PvP Server
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Competitive combat arena
                        </CardDescription>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${pvpStats.online ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                        {pvpStats.online ? 'ONLINE' : 'OFFLINE'}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-all duration-300">
                          <div className="text-xs text-gray-400 mb-1">Players</div>
                          <div className="text-xl font-bold flex items-center gap-2">
                            <Users className="h-4 w-4 text-red-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                              {pvpStats.players.online}/{(pvpStats.players.online)+1}
                            </span>
                          </div>
                        </div>
                        <div className="bg-black/30 p-4 rounded-2xl border border-red-500/10 hover:border-red-500/30 transition-all duration-300">
                          <div className="text-xs text-gray-400 mb-1">Performance</div>
                          <div className="text-xl font-bold flex items-center gap-2">
                            <Zap className="h-4 w-4 text-red-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                              {pvpStats.performance.tps.toFixed(1)} TPS
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-xs text-gray-400 mb-2">Server Health</div>
                        <div className="w-full bg-black/30 rounded-full h-2.5 mb-1 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-orange-400 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(pvpStats.performance.tps / 20 * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Poor</span>
                          <span>Good</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lifesteal Server Card */}
                <Card className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
                  
                  <CardHeader className="relative pb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 flex items-center gap-2">
                          <Heart className="h-5 w-5 text-blue-400" />
                          Lifesteal Server
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Hardcore survival with a twist
                        </CardDescription>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${lifestealStats.online ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                        {lifestealStats.online ? 'ONLINE' : 'OFFLINE'}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/30 p-4 rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                          <div className="text-xs text-gray-400 mb-1">Players</div>
                          <div className="text-xl font-bold flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                              {lifestealStats.players.online}/{(lifestealStats.players.online)+1}
                            </span>
                          </div>
                        </div>
                        <div className="bg-black/30 p-4 rounded-2xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300">
                          <div className="text-xs text-gray-400 mb-1">Performance</div>
                          <div className="text-xl font-bold flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-400" />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                              {lifestealStats.performance.tps.toFixed(1)} TPS
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-xs text-gray-400 mb-2">Server Health</div>
                        <div className="w-full bg-black/30 rounded-full h-2.5 mb-1 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(lifestealStats.performance.tps / 20 * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Poor</span>
                          <span>Good</span>
                          <span>Excellent</span>
                        </div>
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
                    {/* duels Players */}
                    {duelsStats.players.list.length > 0 && (
                      <div className="space-y-3">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Globe className="h-5 w-5 text-emerald-400" />
                          duels
                          <span className="text-sm text-gray-400">
                            ({duelsStats.players.online} players)
                          </span>
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {duelsStats.players.list.slice(0, 11).map((player, index) => (
                            <motion.div
                              key={`duels-${player.name}-${index}`}
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
                          {duelsStats.players.online > 11 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-black/30 p-3 rounded-xl border border-gray-800 hover:border-emerald-500/50 transition-all duration-300 flex items-center justify-center"
                            >
                              <div className="text-gray-400">
                                +{duelsStats.players.online - Math.min(duelsStats.players.list.length, 11)} more
                              </div>
                            </motion.div>
                          )}
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
                          {pvpStats.players.list.slice(0, 11).map((player, index) => (
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
                          {pvpStats.players.online > 11 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-black/30 p-3 rounded-xl border border-gray-800 hover:border-red-500/50 transition-all duration-300 flex items-center justify-center"
                            >
                              <div className="text-gray-400">
                                +{pvpStats.players.online - Math.min(pvpStats.players.list.length, 11)} more
                              </div>
                            </motion.div>
                          )}
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
                          {lifestealStats.players.list.slice(0, 11).map((player, index) => (
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
                          {lifestealStats.players.online > 11 && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="bg-black/30 p-3 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center"
                            >
                              <div className="text-gray-400">
                                +{lifestealStats.players.online - Math.min(lifestealStats.players.list.length, 11)} more
                              </div>
                            </motion.div>
                          )}
                        </div>
                          </div>
                        )}

                    {/* No Players Online Message */}
                    {duelsStats.players.list.length === 0 && 
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
            
            {/* Discord Webhook Settings section removed */}
          </>
        )}
      </div>
    </div>
  );
};

export default ServerInfo;
