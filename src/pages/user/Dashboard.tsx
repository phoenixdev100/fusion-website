import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { UserCircle, Trophy, ShoppingCart, Sword, Clock, Users, Star, Gem, Pickaxe, Shield, Heart, ExternalLink, Ticket } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const DOCS_URL = 'https://docs.fusion-network.xyz'; // Change to your docs/website

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('fusion_user');
    if (!user) {
      toast.error('Please login to access your dashboard');
      navigate('/login');
      return;
    }
    try {
      const parsedUser = JSON.parse(user);
      setUserData(parsedUser);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error('Error loading user data');
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  if (!isAuthenticated || loading) return null;

  return (
    <div className="container py-8">
      {/* Profile Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex flex-col md:flex-row items-center gap-6"
      >
        <Avatar className="h-20 w-20 border-2 border-emerald-500/50">
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.username}`} />
          <AvatarFallback className="bg-emerald-500/20">
            <UserCircle className="h-10 w-10 text-emerald-400" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-1">
            {userData?.username}
          </h1>
          <p className="text-gray-400 mb-1">{userData?.email}</p>
          <span className="inline-block bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
            {userData?.role === 'admin' ? 'Admin' : 'Player'}
          </span>
        </div>
        <div className="flex-1 flex flex-wrap gap-3 justify-end">
          <Button variant="outline" onClick={() => navigate('/vote')} className="flex items-center gap-2">
            <Star size={18} /> Vote
          </Button>
          <Button variant="outline" onClick={() => navigate('/store')} className="flex items-center gap-2">
            <ShoppingCart size={18} /> Store
          </Button>
          <Button variant="outline" asChild className="flex items-center gap-2">
            <a href={DOCS_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} /> Docs
            </a>
          </Button>
          <Button variant="outline" onClick={() => navigate('/support')} className="flex items-center gap-2">
            <Ticket size={18} /> Create Ticket
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Playtime', value: '24h', icon: Clock, color: 'emerald' },
          { title: 'Level', value: '15', icon: Star, color: 'yellow' },
          { title: 'Friends', value: '8', icon: Users, color: 'blue' },
          { title: 'Rank', value: 'Diamond', icon: Gem, color: 'cyan' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative bg-black/40 backdrop-blur-sm border-2 border-white/10 rounded-[2rem] shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden">
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-400/20 rounded-[2rem] blur opacity-70 group-hover:opacity-100 transition duration-500`}></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <stat.icon className={`h-5 w-5 text-${stat.color}-400`} />
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievements & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="relative bg-black/40 backdrop-blur-sm border-2 border-white/10 rounded-[2rem] shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-[2rem] blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-400" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-full">
                    <Heart className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium">First Blood</p>
                    <p className="text-sm text-gray-400">Defeated your first enemy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-full">
                    <Pickaxe className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium">Master Miner</p>
                    <p className="text-sm text-gray-400">Mined 1000 blocks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="relative bg-black/40 backdrop-blur-sm border-2 border-white/10 rounded-[2rem] shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-[2rem] blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-blue-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-300">
                <li>Logged in 2 hours ago</li>
                <li>Voted for the server</li>
                <li>Purchased VIP rank</li>
                <li>Joined a new guild</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Announcements/Notifications (Optional) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="relative bg-black/40 backdrop-blur-sm border-2 border-white/10 rounded-[2rem] shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 rounded-[2rem] blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-emerald-400" />
              Announcements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-300">
              <li>Double XP weekend is live!</li>
              <li>Check out the new items in the store.</li>
              <li>Join our Discord for giveaways and events.</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
