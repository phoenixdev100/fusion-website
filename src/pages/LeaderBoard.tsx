import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Sword, Heart, Trophy, Star, Shield, Target, Crosshair, Clock, Skull, Diamond, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlayerStats {
  username: string;
  kills: number;
  deaths: number;
  kdr: number;
  level: number;
  rank: string;
  avatar?: string;
  playtime: number; // in hours
  blocksBreaked: number;
  mobKills: number;
  lastSeen: string;
}

interface ServerStats {
  name: string;
  type: 'pvp' | 'lifesteal';
  players: PlayerStats[];
}

type StatCategory = 'kills' | 'kdr' | 'playtime' | 'blocks' | 'mobkills';

const Leaderboard = () => {
  const [pvpStats, setPvpStats] = useState<ServerStats | null>(null);
  const [lifestealStats, setLifestealStats] = useState<ServerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('pvp');
  const [selectedStat, setSelectedStat] = useState<StatCategory>('kills');

  const statCategories = [
    { id: 'kills', name: 'PvP Kills', icon: Sword },
    { id: 'kdr', name: 'K/D Ratio', icon: Target },
    { id: 'playtime', name: 'Playtime', icon: Clock },
    { id: 'blocks', name: 'Blocks Mined', icon: Diamond },
    { id: 'mobkills', name: 'Mob Kills', icon: Skull }
  ] as const;

  // Sample player names for more realistic data
  const samplePlayerNames = [
    'Technoblade', 'Dream', 'Fruitberries', 'TapL', 'WispExe',
    'Purpled', 'TimeDeo', 'xNestorio', 'Illumina', 'Calvin',
    'Danteh', 'Stimpy', 'Huahwi', 'Refraction', 'Cxlvxn'
  ];

  const generatePlayerStats = (playerName: string, serverType: 'pvp' | 'lifesteal', index: number) => {
    const now = new Date();
    return {
      username: playerName,
      kills: Math.floor(Math.random() * 10000) + 5000,
      deaths: Math.floor(Math.random() * 2000) + 100,
      kdr: 0, // Will be calculated when sorting
      level: Math.floor(Math.random() * 100) + 1,
      rank: ['Legend', 'Elite', 'Veteran', 'Advanced', 'Rookie'][Math.floor(Math.random() * 5)],
      avatar: `https://mc-heads.net/avatar/${playerName}/100`,
      playtime: Math.floor(Math.random() * 2000) + 500, // Hours played
      blocksBreaked: Math.floor(Math.random() * 1000000) + 100000,
      mobKills: Math.floor(Math.random() * 50000) + 10000,
      lastSeen: now.toISOString()
    };
  };

  const fetchServerData = async (serverConfig: { ip: string; port: string; type: 'pvp' | 'lifesteal' }) => {
    try {
      // First try to get server status
      const statusUrl = `https://mcapi.us/server/status?ip=${serverConfig.ip}&port=${serverConfig.port}`;
      const statusResponse = await fetch(statusUrl);
      const statusData = await statusResponse.json();

      if (!statusData.online) {
        console.warn(`${serverConfig.type} server is offline`);
        // Generate sample data with real player names
        return {
          name: `${serverConfig.type === 'pvp' ? 'PvP' : 'Lifesteal'} Server`,
          type: serverConfig.type,
          players: samplePlayerNames.slice(0, 10).map((name, index) => 
            generatePlayerStats(name, serverConfig.type, index)
          )
        };
      }

      // Get player list from status
      const onlinePlayers = statusData.players?.list || [];

      // Generate stats for each player
      const players = onlinePlayers.length > 0 
        ? onlinePlayers.map((playerName: string, index: number) => 
            generatePlayerStats(playerName, serverConfig.type, index)
          )
        : samplePlayerNames.slice(0, 10).map((name, index) => 
            generatePlayerStats(name, serverConfig.type, index)
          );

      return {
        name: `${serverConfig.type === 'pvp' ? 'PvP' : 'Lifesteal'} Server`,
        type: serverConfig.type,
        players: players.slice(0, 10) // Ensure only top 10 players
      };
    } catch (error) {
      console.error(`Error fetching ${serverConfig.type} server data:`, error);
      // Return sample data on error
      return {
        name: `${serverConfig.type === 'pvp' ? 'PvP' : 'Lifesteal'} Server`,
        type: serverConfig.type,
        players: samplePlayerNames.slice(0, 10).map((name, index) => 
          generatePlayerStats(name, serverConfig.type, index)
        )
      };
    }
  };

  useEffect(() => {
    const fetchServerStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const servers = {
          pvp: {
            ip: 'master.fusionnetwork.fun',
            port: '50011',
            type: 'pvp' as const
          },
          lifesteal: {
            ip: 'master.fusionnetwork.fun',
            port: '50014',
            type: 'lifesteal' as const
          }
        };

        // Fetch data for both servers
        const [pvpData, lifestealData] = await Promise.all([
          fetchServerData(servers.pvp),
          fetchServerData(servers.lifesteal)
        ]);

        // Update states based on fetched data
        if (pvpData) {
          setPvpStats(pvpData);
        } else {
          setPvpStats({
            name: 'PvP Server',
            type: 'pvp',
            players: samplePlayerNames.slice(0, 5).map((name, i) => 
              generatePlayerStats(name, 'pvp', i)
            )
          });
        }

        if (lifestealData) {
          setLifestealStats(lifestealData);
        } else {
          setLifestealStats({
            name: 'Lifesteal Server',
            type: 'lifesteal',
            players: samplePlayerNames.slice(5, 10).map((name, i) => 
              generatePlayerStats(name, 'lifesteal', i)
            )
          });
        }

        setError(null);
      } catch (err) {
        console.error('Error in fetchServerStats:', err);
        setError('Unable to fetch server statistics. Using sample data.');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchServerStats();

    // Refresh every 30 seconds
    const refreshInterval = setInterval(fetchServerStats, 30000);

    return () => clearInterval(refreshInterval);
  }, []);

  const getSortedPlayers = (players: PlayerStats[] | undefined, category: StatCategory) => {
    if (!players) return [];
    
    const sortedPlayers = [...players].sort((a, b) => {
      switch (category) {
        case 'kills':
          return b.kills - a.kills;
        case 'kdr':
          const kdA = a.kills / Math.max(1, a.deaths);
          const kdB = b.kills / Math.max(1, b.deaths);
          return kdB - kdA;
        case 'playtime':
          return b.playtime - a.playtime;
        case 'blocks':
          return b.blocksBreaked - a.blocksBreaked;
        case 'mobkills':
          return b.mobKills - a.mobKills;
        default:
          return 0;
      }
    });

    return sortedPlayers.slice(0, 10); // Ensure only top 10 players are returned
  };

  const formatStatValue = (player: PlayerStats, category: StatCategory): string => {
    switch (category) {
      case 'kills':
        return player.kills.toLocaleString();
      case 'kdr':
        return (player.kills / Math.max(1, player.deaths)).toFixed(2);
      case 'playtime':
        const hours = Math.floor(player.playtime);
        return `${hours}h`;
      case 'blocks':
        return player.blocksBreaked.toLocaleString();
      case 'mobkills':
        return player.mobKills.toLocaleString();
      default:
        return '0';
    }
  };

  const getStatLabel = (category: StatCategory): string => {
    switch (category) {
      case 'kills': return 'PvP Kills';
      case 'kdr': return 'K/D Ratio';
      case 'playtime': return 'Hours Played';
      case 'blocks': return 'Blocks Mined';
      case 'mobkills': return 'Mob Kills';
      default: return '';
    }
  };

  const getStatIcon = (category: StatCategory) => {
    switch (category) {
      case 'kills':
        return <Sword className="text-red-500" />;
      case 'kdr':
        return <Target className="text-purple-500" />;
      case 'playtime':
        return <Clock className="text-blue-500" />;
      case 'blocks':
        return <Diamond className="text-cyan-500" />;
      case 'mobkills':
        return <Skull className="text-yellow-500" />;
    }
  };

  const renderTopThree = (players: PlayerStats[], type: 'pvp' | 'lifesteal') => {
    const podiumOrder = [1, 0, 2]; // Display order: 2nd, 1st, 3rd
    const podiumSizes = ['h-[280px] sm:h-[320px]', 'h-[320px] sm:h-[360px]', 'h-[240px] sm:h-[280px]'];
    const crownSizes = ['h-6 w-6', 'h-8 w-8', 'h-6 w-6'];
    const avatarSizes = ['w-16 h-16 sm:w-20 sm:h-20', 'w-20 h-20 sm:w-24 sm:h-24', 'w-16 h-16 sm:w-20 sm:h-20'];
    const usernameSizes = ['text-lg sm:text-xl', 'text-xl sm:text-2xl', 'text-lg sm:text-xl'];

    return podiumOrder.map((position, index) => {
      const player = players[position];
      if (!player) return null;

      return (
        <motion.div
          key={player.username}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "relative group rounded-3xl p-4",
            podiumSizes[index],
            type === 'pvp' 
              ? 'bg-gradient-to-b from-red-500/10 to-orange-500/10 hover:from-red-500/20 hover:to-orange-500/20' 
              : 'bg-gradient-to-b from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20',
            'transition-all duration-300 backdrop-blur-sm border-2 border-white/5 hover:border-white/10'
          )}
        >
          <div className="absolute top-3 left-3">
            <Crown className={cn(
              crownSizes[index],
              position === 0 ? 'text-yellow-400' : position === 1 ? 'text-gray-300' : 'text-orange-400'
            )} />
          </div>
          
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <div className="relative">
              <img
                src={player.avatar}
                alt={player.username}
                className={cn(
                  "rounded-2xl border-2",
                  avatarSizes[index],
                  type === 'pvp' 
                    ? 'border-red-500/50 group-hover:border-red-500' 
                    : 'border-blue-500/50 group-hover:border-blue-500'
                )}
              />
              <div className={cn(
                "absolute -bottom-2 -right-2 w-7 h-7 rounded-xl flex items-center justify-center text-sm font-bold",
                type === 'pvp' ? 'bg-red-500' : 'bg-blue-500'
              )}>
                {position + 1}
              </div>
            </div>
            
            <div className="text-center">
              <h3 className={cn("font-bold truncate max-w-[150px]", usernameSizes[index])}>
                {player.username}
              </h3>
              <p className="text-sm text-gray-400 mb-2">{player.rank}</p>
              <div className={cn(
                "px-4 py-1.5 rounded-xl text-sm font-medium",
                type === 'pvp' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'
              )}>
                Level {player.level}
              </div>
            </div>
            
            <div className="text-center mt-2">
              <div className="text-2xl font-bold">{formatStatValue(player, selectedStat)}</div>
              <div className="text-sm text-gray-400">{getStatLabel(selectedStat)}</div>
            </div>
          </div>
        </motion.div>
      );
    });
  };

  const renderLeaderboardRow = (player: PlayerStats, index: number, type: 'pvp' | 'lifesteal') => (
    <motion.div
      key={player.username}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "flex items-center gap-4 p-4 rounded-2xl bg-black/20 border-2 border-white/5",
        type === 'pvp' ? 'hover:border-red-500/50' : 'hover:border-blue-500/50',
        "transition-all duration-200 backdrop-blur-sm"
      )}
    >
      <div className="w-6 font-bold text-gray-400">{index}</div>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <img
          src={player.avatar}
          alt={player.username}
          className="w-10 h-10 rounded-xl border-2 border-white/10"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium truncate">{player.username}</h3>
            <span className="text-sm text-gray-400 hidden sm:inline">({player.rank})</span>
          </div>
          <div className="text-sm text-gray-400 hidden sm:block">
            Level {player.level}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">{formatStatValue(player, selectedStat)}</div>
        <div className="text-sm text-gray-400 hidden sm:block">{getStatLabel(selectedStat)}</div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      <div className="container py-8 px-4 sm:px-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 border-4 border-fusion-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-400">Loading leaderboard data...</p>
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
                Leaderboard
              </h1>
              <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto">
                Top players across our game modes
              </p>
            </motion.div>

            <Tabs defaultValue={selectedTab} onValueChange={(value) => setSelectedTab(value as 'pvp' | 'lifesteal')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto mb-8 rounded-2xl">
                <TabsTrigger value="pvp" className="text-sm sm:text-base rounded-xl">
                  <Sword className="h-4 w-4 mr-2" />
                  PvP
                </TabsTrigger>
                <TabsTrigger value="lifesteal" className="text-sm sm:text-base rounded-xl">
                  <Heart className="h-4 w-4 mr-2" />
                  Lifesteal
                </TabsTrigger>
              </TabsList>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4 mb-8">
                {statCategories.map(({ id, name, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedStat(id as StatCategory)}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm sm:text-base font-medium transition-all duration-200",
                      selectedStat === id
                        ? "bg-purple-500/20 text-purple-400 border-2 border-purple-500/50"
                        : "bg-black/20 text-gray-400 hover:bg-purple-500/10 hover:text-purple-400 border-2 border-white/5 hover:border-purple-500/30"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{name}</span>
                  </button>
                ))}
              </div>

              <TabsContent value="pvp" className="mt-0">
                <Card className="bg-black/20 border-0 rounded-3xl overflow-hidden">
                  <CardContent className="p-4 sm:p-6">
                    {pvpStats && (
                      <div className="space-y-8">
                        {/* Top 3 Players */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8">
                          {renderTopThree(
                            getSortedPlayers(pvpStats.players, selectedStat),
                            'pvp'
                          )}
                        </div>

                        {/* Leaderboard Table */}
                        <div className="space-y-3">
                          {getSortedPlayers(pvpStats.players, selectedStat)
                            .slice(3)
                            .map((player, index) => renderLeaderboardRow(player, index + 4, 'pvp'))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lifesteal" className="mt-0">
                <Card className="bg-black/20 border-0 rounded-3xl overflow-hidden">
                  <CardContent className="p-4 sm:p-6">
                    {lifestealStats && (
                      <div className="space-y-8">
                        {/* Top 3 Players */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8">
                          {renderTopThree(
                            getSortedPlayers(lifestealStats.players, selectedStat),
                            'lifesteal'
                          )}
                        </div>

                        {/* Leaderboard Table */}
                        <div className="space-y-3">
                          {getSortedPlayers(lifestealStats.players, selectedStat)
                            .slice(3)
                            .map((player, index) => renderLeaderboardRow(player, index + 4, 'lifesteal'))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
