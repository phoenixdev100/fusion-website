import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ExternalLink, Gift, Check, Star, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

const voteLinks = [
  {
    name: 'TopMinecraftServers',
    image: '/img/vote/topminecraftservers.png',
    url: 'https://topminecraftservers.org/server/38274',
    rewards: 'In-game Currency + 1 Vote Key + Coinshop Coins',
    cooldown: 24, // hours
  },
  {
    name: 'Minecraft-Server-List',
    image: '/img/vote/minecraft-server-list.png',
    url: 'https://minecraft-server-list.com/server/508768/',
    rewards: 'In-game Currency + 1 Vote Key + Coinshop Coins',
    cooldown: 24,
  },
  {
    name: 'Minecraft-MP',
    image: '/img/vote/minecraft-mp.png',
    url: 'https://minecraft-mp.com/server-s338558',
    rewards: 'In-game Currency + 2 Vote Keys + Coinshop Coins',
    cooldown: 24,
  },
];

const rewardsStreak = [
  { days: 3 },
  { days: 7 },
  { days: 14 },
  { days: 30 },
];

interface VoteRecord {
  site: string;
  timestamp: number;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const Vote: React.FC = () => {
  const [votedSites, setVotedSites] = useState<Record<string, boolean>>({});
  const [currentStreak, setCurrentStreak] = useState(0);
  const [voteHistory, setVoteHistory] = useState<VoteRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState<Record<string, TimeLeft>>({});
  const [claimedRewards, setClaimedRewards] = useState<number[]>([]);

  // Load vote history and claimed rewards from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('vote_history');
    const savedRewards = localStorage.getItem('claimed_rewards');
    
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setVoteHistory(history);
      calculateStreak(history);
    }
    
    if (savedRewards) {
      setClaimedRewards(JSON.parse(savedRewards));
    }
  }, []);

  // Update countdown timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft: Record<string, TimeLeft> = {};
      voteLinks.forEach(site => {
        const lastVote = voteHistory.find(record => record.site === site.name);
        if (lastVote) {
          const timeSinceLastVote = Date.now() - lastVote.timestamp;
          const cooldownMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
          const remainingMs = Math.max(0, cooldownMs - timeSinceLastVote);
          
          const hours = Math.floor(remainingMs / (1000 * 60 * 60));
          const minutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);
          
          newTimeLeft[site.name] = { hours, minutes, seconds };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [voteHistory]);

  // Calculate current streak based on vote history
  const calculateStreak = (history: VoteRecord[]) => {
    if (history.length === 0) {
      setCurrentStreak(0);
      return;
    }

    // Get today's date at midnight for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sort history by timestamp in descending order and group by date
    const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);
    const dailyVotes = new Map<string, VoteRecord[]>();

    sortedHistory.forEach(vote => {
      const voteDate = new Date(vote.timestamp);
      voteDate.setHours(0, 0, 0, 0);
      const dateKey = voteDate.toISOString();
      if (!dailyVotes.has(dateKey)) {
        dailyVotes.set(dateKey, []);
      }
      dailyVotes.get(dateKey)?.push(vote);
    });

    // Convert to array of dates with votes
    const voteDates = Array.from(dailyVotes.keys())
      .map(date => new Date(date))
      .sort((a, b) => b.getTime() - a.getTime());

    // Check if voted today
    const lastVoteDate = voteDates[0];
    if (!lastVoteDate) {
      setCurrentStreak(0);
      return;
    }
    const hasVotedToday = lastVoteDate.getTime() === today.getTime();
    if (!hasVotedToday) {
      // If haven't voted today, check if last vote was yesterday
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      if (!lastVoteDate || lastVoteDate.getTime() !== yesterday.getTime()) {
        setCurrentStreak(0);
        return;
      }
    }

    // Calculate streak by checking consecutive days
    let streak = hasVotedToday ? 1 : 0;
    for (let i = hasVotedToday ? 1 : 0; i < voteDates.length; i++) {
      const currentDate = voteDates[i];
      const previousDate = voteDates[i - 1];
      if (!previousDate || !currentDate) break;
      // Check if dates are consecutive
      const diffTime = previousDate.getTime() - currentDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    setCurrentStreak(streak);
  };

  const canVote = (siteName: string) => {
    const lastVote = voteHistory.find(record => record.site === siteName);
    if (!lastVote) return true;

    const timeSinceLastVote = Date.now() - lastVote.timestamp;
    return timeSinceLastVote >= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  };

  const formatTimeLeft = (siteName: string) => {
    const time = timeLeft[siteName];
    if (!time) return null;
    
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
  };

  const handleVote = (siteName: string, url: string) => {
    if (!canVote(siteName)) {
      toast.error(`Please wait until the cooldown period is over to vote again on ${siteName}`);
      return;
    }

    window.open(url, '_blank');
    
    // Record the vote
    const newVote: VoteRecord = {
      site: siteName,
      timestamp: Date.now()
    };

    const newHistory = [...voteHistory, newVote];
    setVoteHistory(newHistory);
    localStorage.setItem('vote_history', JSON.stringify(newHistory));
    
    // Update streak
    calculateStreak(newHistory);
    
    // Update voted sites state
    setVotedSites(prev => ({...prev, [siteName]: true}));
    
    // Check if all sites have been voted on today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVotes = newHistory.filter(vote => {
      const voteDate = new Date(vote.timestamp);
      voteDate.setHours(0, 0, 0, 0);
      return voteDate.getTime() === today.getTime();
    });

    const uniqueSitesToday = new Set(todayVotes.map(vote => vote.site));
    
    if (uniqueSitesToday.size === voteLinks.length) {
      toast.success('🎉 Congratulations! You\'ve voted on all sites today!');
    } else {
      toast.success(`Thanks for voting on ${siteName}! Rewards sent to your account.`);
    }
  };

  const claimStreakReward = (days: number) => {
    if (!claimedRewards.includes(days)) {
      setClaimedRewards([...claimedRewards, days]);
      localStorage.setItem('claimed_rewards', JSON.stringify([...claimedRewards, days]));
      toast.success(`Claimed reward for ${days} day streak!`);
    }
  };

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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzFmMjkzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Wb3RlIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      <div className="container py-12 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
        >
          Vote for Fusion Network
        </motion.h1>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              <CardHeader className="text-center relative">
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Your Voting Streak</CardTitle>
                <CardDescription className="text-gray-300">Vote daily to increase your streak and earn rewards</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="bg-black/20 p-6 rounded-xl backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-200">Current Streak: {currentStreak} days</span>
                    <span className="text-sm text-gray-400">Next milestone: {rewardsStreak.find(r => !claimedRewards.includes(r.days))?.days || 30} days</span>
                  </div>
                  <Progress 
                    value={(currentStreak / (rewardsStreak.find(r => !claimedRewards.includes(r.days))?.days || 30)) * 100} 
                    className="h-3 rounded-full bg-gray-800" 
                  />
                </div>
                
                <motion.div 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 gap-4 mt-6"
                >
                  {rewardsStreak.map((milestone) => (
                    <motion.div key={milestone.days} variants={item}>
                      <Card className={`relative overflow-hidden rounded-xl backdrop-blur-sm bg-gray-900/50 border-0 transition-all duration-300 ${
                        claimedRewards.includes(milestone.days) ? 'hover:shadow-green-500/20' : 
                        currentStreak >= milestone.days ? 'hover:shadow-yellow-500/20 animate-pulse' : 
                        'hover:shadow-gray-500/20'
                      }`}>
                        <div className={`absolute inset-0 bg-gradient-to-br ${
                          claimedRewards.includes(milestone.days) ? 'from-green-500/10 to-emerald-500/10' : 
                          currentStreak >= milestone.days ? 'from-yellow-500/10 to-amber-500/10' : 
                          'from-gray-500/10 to-gray-700/10'
                        }`} />
                        <CardContent className="p-4 flex justify-between items-center relative">
                          <div>
                            <p className="font-bold text-lg text-gray-200">{milestone.days} Day Streak</p>
                          </div>
                          {claimedRewards.includes(milestone.days) ? (
                            <div className="bg-green-500/20 p-2 rounded-full">
                              <Check size={20} className="text-green-500" />
                            </div>
                          ) : currentStreak >= milestone.days ? (
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white rounded-full px-4 py-2"
                              onClick={() => claimStreakReward(milestone.days)}
                            >
                              Claim
                            </Button>
                          ) : (
                            <div className="bg-gray-800/50 text-gray-500 text-xs px-3 py-1.5 rounded-full">
                              Locked
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-2"
          >
            {voteLinks.map((site) => {
              const canVoteNow = canVote(site.name);
              const timer = formatTimeLeft(site.name);
              
              return (
                <motion.div key={site.name} variants={item}>
                  <Card className={`relative overflow-hidden rounded-xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group ${
                    votedSites[site.name] ? 'hover:shadow-green-500/20' : ''
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      votedSites[site.name] ? 'from-green-500/10 to-emerald-500/10' : 'from-purple-500/10 to-pink-500/10'
                    } opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <CardHeader className="relative">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                          {site.name}
                        </CardTitle>
                        {votedSites[site.name] && (
                          <div className="bg-green-500/20 p-2 rounded-full">
                            <Check size={20} className="text-green-500" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="relative">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Gift size={18} className="text-purple-400" />
                          <span className="text-gray-200">{site.rewards}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star size={18} className="text-yellow-400" />
                          <span className="text-gray-300">Vote every 24 hours</span>
                        </div>
                        {!canVoteNow && timer && (
                          <div className="flex items-center gap-3 text-amber-400">
                            <Clock size={18} />
                            <span className="font-mono">Next vote in: {timer}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="relative">
                      <Button 
                        onClick={() => handleVote(site.name, site.url)} 
                        className={`w-full rounded-full py-6 text-lg font-semibold transition-all duration-300 ${
                          votedSites[site.name] 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : canVoteNow
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                              : 'bg-gray-600 cursor-not-allowed'
                        }`}
                        disabled={votedSites[site.name] || !canVoteNow}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {votedSites[site.name] ? 'Voted' : canVoteNow ? 'Vote Now' : 'On Cooldown'}
                          {!votedSites[site.name] && canVoteNow && <ExternalLink size={18} className="ml-2" />}
                        </span>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12"
          >
            <Card className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
              <CardHeader className="relative">
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Vote Rewards</CardTitle>
                <CardDescription className="text-gray-300">Exclusive items and perks for voting</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Vote Keys',
                      description: 'Use keys at spawn to open vote crates with rare items and cosmetics.',
                      color: 'from-purple-500 to-pink-500'
                    },
                    {
                      title: 'In-game Currency',
                      description: 'Receive coins to spend in the server shop for items and upgrades.',
                      color: 'from-yellow-500 to-amber-500'
                    },
                    {
                      title: 'Monthly Rewards',
                      description: 'Top voters each month receive special perks and exclusive items.',
                      color: 'from-blue-500 to-cyan-500'
                    }
                  ].map((reward, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <div className={`bg-black/20 p-6 rounded-xl backdrop-blur-sm hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${reward.color}/10`}>
                        <h3 className="font-medium mb-3 text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                          {reward.title}
                        </h3>
                        <p className="text-sm text-gray-300">{reward.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Vote;
