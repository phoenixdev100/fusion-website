import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  UserCircle,
  ShoppingCart,
  Star,
  LogOut,
  Home,
  Sparkles,
  Calendar,
  MessageSquare,
  Gift,
  Bell,
  Compass,
  Trophy,
  HelpCircle,
  ExternalLink,
  Crown,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

const DashboardNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0F1218]/80 backdrop-blur-lg border-b border-white/10 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white hover:text-purple-400 transition-colors">
              <Home className="h-6 w-6" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/store" className="text-white hover:text-purple-400 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link to="/vote" className="text-white hover:text-purple-400 transition-colors">
              <Star className="h-6 w-6" />
            </Link>
            <button onClick={handleLogout} className="text-white hover:text-purple-400 transition-colors">
              <LogOut className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const WelcomeMessage = ({ username }: { username: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-12"
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-block"
    >
      <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
    </motion.div>
    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
      Welcome back, {username}!
    </h1>
    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
      Ready to continue your adventure? Check out what's new on the server today.
    </p>
  </motion.div>
);

const QuickActions = () => {
  // Update these URLs with your actual social media links
  const SOCIAL_URLS = {
    DISCORD: 'https://discord.gg/wk6yJGHkKP',
    INSTAGRAM: 'https://www.instagram.com/fusionnetworkofficial/',
    FORUMS: 'https://forum.fusion-network.xyz',
    DOCS: 'https://docs.fusion-network.xyz'
  };

  const actions = [
    { 
      icon: MessageSquare, 
      label: 'Discord', 
      link: SOCIAL_URLS.DISCORD, 
      color: 'from-indigo-500 to-purple-500'
    },
    { 
      icon: Star, 
      label: 'Instagram', 
      link: SOCIAL_URLS.INSTAGRAM, 
      color: 'from-pink-500 to-rose-500'
    },
    { 
      icon: Users, 
      label: 'Forums', 
      link: SOCIAL_URLS.FORUMS, 
      color: 'from-orange-500 to-amber-500'
    },
    { 
      icon: ExternalLink, 
      label: 'Docs', 
      link: SOCIAL_URLS.DOCS, 
      color: 'from-blue-500 to-cyan-500'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <a 
            href={action.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="relative group cursor-pointer overflow-hidden bg-black/40 border-white/10 hover:border-white/20 transition-all duration-300">
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <CardContent className="p-6 text-center">
                <action.icon className="h-8 w-8 mx-auto mb-3 text-gray-400 group-hover:text-white transition-colors duration-300" />
                <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                  {action.label}
                </p>
              </CardContent>
            </Card>
          </a>
        </motion.div>
      ))}
    </div>
  );
};

const NewsAndUpdates = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="mb-8"
  >
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-purple-400" />
          Latest Updates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { title: 'Summer Event Starting Soon!', date: '2h ago', desc: 'Get ready for exclusive rewards and challenges.' },
            { title: 'New Survival World', date: '1d ago', desc: 'Explore the new world with enhanced features.' },
            { title: 'VIP Package Sale', date: '2d ago', desc: '50% off on all VIP packages this weekend.' }
          ].map((update, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-purple-400">{update.title}</h3>
                <span className="text-xs text-gray-500">{update.date}</span>
              </div>
              <p className="text-sm text-gray-400">{update.desc}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error('Please login to access your dashboard');
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1218] text-white">
      <DashboardNav />
      <div className="container py-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Avatar className="h-20 w-20 mx-auto mb-4 border-2 border-purple-500/50">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
            <AvatarFallback className="bg-purple-500/20">
              <UserCircle className="h-10 w-10 text-purple-400" />
            </AvatarFallback>
          </Avatar>
          <WelcomeMessage username={user.username} />
        </motion.div>

        {/* Quick Actions */}
        <QuickActions />

        {/* News and Updates */}
        <NewsAndUpdates />

        {/* Server Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                Server Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium">Server is online</span>
                </div>
                <span className="text-sm text-gray-400">128/500 players</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
