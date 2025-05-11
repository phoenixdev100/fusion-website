import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, Award, Calendar, ExternalLink, Heart, Sparkles, Star, Trophy, LucideIcon, Sword } from 'lucide-react';

interface ForumPoster {
  name: string;
  avatar: string;
}

interface ForumCategory {
  title: string;
  description: string;
  posts: number;
  recentPosters: ForumPoster[];
}

interface CommunityBuild {
  title: string;
  description: string;
  creator: string;
  image: string;
  likes: number;
}

interface CommunityEvent {
  title: string;
  description: string;
  date: string;
  month: string;
  type: string;
  participants: number;
}

interface FeatureItem {
  icon: LucideIcon;
  text: string;
}

interface Achievement {
  title: string;
  description: string;
  player: string;
  date: string;
  type: 'milestone' | 'event' | 'build' | 'pvp';
  icon: LucideIcon;
  stats?: {
    label: string;
    value: string;
  }[];
}

interface Highlight {
  title: string;
  description: string;
  image: string;
  type: 'trending' | 'featured' | 'popular';
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
  author: {
    name: string;
    avatar: string;
  };
  date: string;
}

const forumCategories: ForumCategory[] = [
  {
    title: "Survival Strategies",
    description: "Share your best survival tips, base designs, and farming techniques.",
    posts: 1254,
    recentPosters: [
      { name: "MineKing", avatar: "https://i.pravatar.cc/150?img=1" },
      { name: "DiamondDigger", avatar: "https://i.pravatar.cc/150?img=2" },
      { name: "CaveExplorer", avatar: "https://i.pravatar.cc/150?img=3" },
    ]
  },
  {
    title: "Redstone Creations",
    description: "Showcase your redstone builds, circuits, and automation systems.",
    posts: 876,
    recentPosters: [
      { name: "RedstoneWiz", avatar: "https://i.pravatar.cc/150?img=4" },
      { name: "CircuitMaster", avatar: "https://i.pravatar.cc/150?img=5" },
      { name: "AutoBuilder", avatar: "https://i.pravatar.cc/150?img=6" },
    ]
  },
  {
    title: "Creative Builds",
    description: "Show off your creative mode masterpieces and architectural designs.",
    posts: 2103,
    recentPosters: [
      { name: "MasterBuilder", avatar: "https://i.pravatar.cc/150?img=7" },
      { name: "ArchitectPro", avatar: "https://i.pravatar.cc/150?img=8" },
      { name: "WorldCrafter", avatar: "https://i.pravatar.cc/150?img=9" },
    ]
  }
];

const communityBuilds: CommunityBuild[] = [
  {
    title: "Medieval Castle",
    description: "A massive castle with detailed interior and working redstone mechanisms.",
    creator: "CastleBuilder",
    image: "https://i.imgur.com/example1.jpg",
    likes: 1234
  },
  {
    title: "Automated Farm",
    description: "Fully automated crop and mob farm with sorting system.",
    creator: "RedstoneGuru",
    image: "https://i.imgur.com/example2.jpg",
    likes: 987
  },
  {
    title: "Modern City",
    description: "A sprawling modern city with skyscrapers and transportation.",
    creator: "CityPlanner",
    image: "https://i.imgur.com/example3.jpg",
    likes: 2345
  }
];

const events: CommunityEvent[] = [
  {
    title: "PvP Tournament",
    description: "Battle it out in our monthly PvP tournament for amazing prizes!",
    date: "15",
    month: "MAY",
    type: "Tournament",
    participants: 64
  },
  {
    title: "Build Competition",
    description: "Show off your building skills in our themed building contest.",
    date: "22",
    month: "MAY",
    type: "Competition",
    participants: 128
  }
];

const discordFeatures: FeatureItem[] = [
  { icon: Users, text: "6,000+ members and growing daily" },
  { icon: MessageCircle, text: "Active chat channels for every game mode" },
  { icon: Calendar, text: "Weekly events and giveaways" }
];

const achievements: Achievement[] = [
  {
    title: "First Player to Reach Level 100",
    description: "Achieved through dedication and skill, becoming the first player to reach the maximum level.",
    player: "MineMaster",
    date: "May 15, 2024",
    type: "milestone",
    icon: Trophy,
    stats: [
      { label: "Hours Played", value: "500+" },
      { label: "Quests Completed", value: "1,000+" }
    ]
  },
  {
    title: "PvP Tournament Champion",
    description: "Won the monthly PvP tournament with an impressive 25-2 win-loss ratio.",
    player: "BattlePro",
    date: "May 10, 2024",
    type: "pvp",
    icon: Sword,
    stats: [
      { label: "K/D Ratio", value: "12.5" },
      { label: "Tournament Wins", value: "3" }
    ]
  },
  {
    title: "Mega Build Competition Winner",
    description: "Created an impressive medieval castle that won the monthly build competition.",
    player: "ArchitectKing",
    date: "May 5, 2024",
    type: "build",
    icon: Award,
    stats: [
      { label: "Blocks Placed", value: "250,000+" },
      { label: "Votes Received", value: "1,500+" }
    ]
  }
];

const highlights: Highlight[] = [
  {
    title: "Epic PvP Tournament Finals",
    description: "Watch the intense final moments of our latest PvP tournament with amazing plays and strategies.",
    image: "https://i.imgur.com/example1.jpg",
    type: "trending",
    stats: {
      views: 25000,
      likes: 1500,
      comments: 300
    },
    author: {
      name: "BattlePro",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    date: "2 days ago"
  },
  {
    title: "Mega Base Tour: Sky Castle",
    description: "Take a tour of this incredible floating castle built by our community members.",
    image: "https://i.imgur.com/example2.jpg",
    type: "featured",
    stats: {
      views: 18000,
      likes: 1200,
      comments: 250
    },
    author: {
      name: "BuildMaster",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    date: "5 days ago"
  },
  {
    title: "Redstone Masterpiece: Automated City",
    description: "Check out this fully automated city with working transportation and resource systems.",
    image: "https://i.imgur.com/example3.jpg",
    type: "popular",
    stats: {
      views: 32000,
      likes: 2000,
      comments: 450
    },
    author: {
      name: "RedstoneWiz",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    date: "1 week ago"
  }
];

const Community = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // External links
  const DISCORD_INVITE = "https://discord.gg/wk6yJGHkKP";
  const FORUMS_URL = "https://forums.fusion-network.xyz";
  const EVENTS_URL = "https://discord.gg/wk6yJGHkKP";

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-purple-900/20 to-black">
      <div className="container py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500">
            Community Hub
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join thousands of players in our growing Minecraft community. Connect, share, and build together!
          </p>
        </motion.div>

        {/* Discord Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
            <div className="grid grid-cols-1 md:grid-cols-2 relative">
              <div className="p-8 flex flex-col justify-center">
                <Badge variant="secondary" className="w-fit mb-4 bg-purple-500/20 text-purple-300">JOIN OUR DISCORD</Badge>
                <CardTitle className="text-3xl mb-6 text-white group-hover:text-purple-200 transition-colors duration-500">Connect with 6,000+ Players</CardTitle>
                <CardDescription className="text-lg mb-8 text-gray-300 group-hover:text-white/90 transition-colors duration-500">
                  Our Discord server is the hub for all Fusion Network activities. Get support, join events, find teammates, and stay updated on the latest server news.
                </CardDescription>
                <div className="space-y-4">
                  {discordFeatures.map((feature, index) => (
                    <motion.div 
                      key={index}
                      variants={item}
                      className="flex items-center gap-3 group/item"
                    >
                      <feature.icon className="text-purple-400 group-hover/item:scale-110 transition-transform duration-300" />
                      <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
                <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                  <Button className="mt-8 w-fit bg-[#7289DA] hover:bg-[#5e73bc] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/30">
                    Join Our Discord
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
              <div className="relative overflow-hidden p-6 hidden md:flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#7289DA]/30 to-[#5e73bc]/30 opacity-50" />
                <motion.img 
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src="https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZGlzY29yZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" 
                  alt="Discord Community" 
                  className="rounded-lg max-h-[400px] object-cover shadow-xl relative z-10" 
                />
              </div>
            </div>
          </Card>
        </motion.section>

        {/* Forums Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Community Forums</h2>
            <Link to={FORUMS_URL}>
              <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                View All Forums
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {forumCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={item}
                initial="hidden"
                animate="show"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl text-white group-hover:text-blue-200 transition-colors duration-500">{category.title}</CardTitle>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                        {category.posts} posts
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4 group-hover:text-white/90 transition-colors duration-500">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {category.recentPosters.map((poster, i) => (
                          <Avatar key={i} className="border-2 border-background w-7 h-7 transition-transform duration-300 hover:scale-110 hover:z-10">
                            <AvatarImage src={poster.avatar} />
                            <AvatarFallback>{poster.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Link to={`${FORUMS_URL}/category/${category.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-300"
                        >
                          View Forum
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Events */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">Upcoming Events</h2>
            <Link to={EVENTS_URL}>
              <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
                View All Events
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={index}
                variants={item}
                initial="hidden"
                animate="show"
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-emerald-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-black/40 p-6 flex flex-col justify-center items-center md:w-1/5 relative overflow-hidden group-hover:bg-emerald-500/10 transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <span className="text-3xl font-bold text-emerald-400 relative z-10 group-hover:scale-110 transition-transform duration-300">{event.date}</span>
                      <span className="text-xl text-gray-400 relative z-10 group-hover:text-white/90 transition-colors duration-500">{event.month}</span>
                    </div>
                    <div className="p-6 md:w-4/5 relative z-10">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-emerald-200 transition-colors duration-500">{event.title}</h3>
                        <Badge className="w-fit mt-2 md:mt-0 bg-emerald-500/20 text-emerald-300 border-emerald-500/50">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-4 group-hover:text-white/90 transition-colors duration-500">{event.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Users size={16} className="text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                          <span className="text-sm text-gray-400 group-hover:text-white/90 transition-colors duration-500">{event.participants} participants</span>
                        </div>
                        <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:opacity-90 transform hover:scale-105 transition-all duration-300"
                          >
                            Join Event
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Community;
