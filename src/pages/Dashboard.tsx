import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface UserStats {
  playtime: number;
  level: number;
  rank: string;
  achievements: number;
  lastLogin: string;
  kills: number;
  deaths: number;
  blocksMined: number;
  itemsCrafted: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/user/stats?userId=${user?.id}`);
        const data = await response.json();
        
        if (data.success) {
          setStats(data.data);
        } else {
          toast.error('Failed to fetch user stats');
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast.error('Error fetching user stats');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchStats();
    }
  }, [user?.id]);

  const formatPlaytime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.username}!</h1>
          <p className="text-gray-400">Last login: {stats?.lastLogin ? new Date(stats.lastLogin).toLocaleString() : 'Never'}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
          >
            <h3 className="text-lg font-semibold mb-2">Playtime</h3>
            <p className="text-3xl font-bold text-emerald-500">
              {stats ? formatPlaytime(stats.playtime) : '0h 0m'}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
          >
            <h3 className="text-lg font-semibold mb-2">Level</h3>
            <p className="text-3xl font-bold text-emerald-500">
              {stats?.level || 0}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
          >
            <h3 className="text-lg font-semibold mb-2">Rank</h3>
            <p className="text-3xl font-bold text-emerald-500">
              {stats?.rank || 'Default'}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
          >
            <h3 className="text-lg font-semibold mb-2">Achievements</h3>
            <p className="text-3xl font-bold text-emerald-500">
              {stats?.achievements || 0}
            </p>
          </motion.div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
          >
            <h3 className="text-xl font-semibold mb-4">Combat Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Kills:</span>
                <span className="text-emerald-500">{stats?.kills || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Deaths:</span>
                <span className="text-emerald-500">{stats?.deaths || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>K/D Ratio:</span>
                <span className="text-emerald-500">
                  {stats ? (stats.kills / (stats.deaths || 1)).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
          >
            <h3 className="text-xl font-semibold mb-4">Progress</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Blocks Mined:</span>
                <span className="text-emerald-500">{stats?.blocksMined || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Items Crafted:</span>
                <span className="text-emerald-500">{stats?.itemsCrafted || 0}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
} 