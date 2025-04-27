import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Users, Diamond, Sword, Crown, Gift, Shield, Calendar, MessageSquare, Star, Trophy, Heart, Clock, Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';

const SERVER_IP = 'fusion-network.xyz';

const Index = () => {
  const navigate = useNavigate();
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyIP = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setHasCopied(true);
      toast.success('Server IP Copied!', {
        description: `${SERVER_IP} has been copied to your clipboard`,
        duration: 3000,
        position: 'bottom-right',
        icon: <Check className="h-5 w-5 text-green-500" />,
        style: {
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
        },
      });
      setTimeout(() => setHasCopied(false), 3000);
    } catch (err) {
      toast.error('Failed to copy IP', {
        description: 'Please try copying manually: fusion-network.xyz',
        position: 'bottom-right',
      });
    }
  };

  const handlePlayGameMode = (mode: string) => {
    handleCopyIP();
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLearnMore = () => {
    navigate('/community');
  };

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/wk6yJGHkKP', '_blank');
  };

  const handleCommunityAction = (action: string) => {
    switch (action) {
      case 'discord':
        window.open('https://discord.gg/wk6yJGHkKP', '_blank');
        break;
      case 'events':
        navigate('/community');
        break;
      case 'support':
        navigate('/support');
        break;
      case 'rewards':
        navigate('/rewards');
        break;
      default:
        break;
    }
  };

  const handleJoinEvent = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <>
      <Toaster />
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20 lg:py-32"
      >
        {/* Minecraft-style animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/img/minecraft-panorama.jpg')] bg-cover bg-center animate-pan-bg"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.7)_100%)]"></div>
          <div className="absolute inset-0 bg-[url('/img/minecraft-pattern.png')] opacity-10"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
                scale: [null, Math.random() * 0.5 + 0.5]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="container px-4 sm:px-6 relative">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-minecraft mb-4 sm:mb-6 animate-float text-white drop-shadow-glow">
              Welcome to
              <span className="block text-4xl sm:text-6xl md:text-8xl bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 text-transparent bg-clip-text animate-gradient font-bold tracking-wide mt-2">
                Fusion Network
              </span>
                </h1>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-200 font-minecraft-alt animate-fade-in px-4"
            >
              Join thousands of players in an epic Minecraft adventure!
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 sm:mb-12 px-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto"
              >
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="minecraft-button bg-emerald-500 hover:bg-emerald-600 text-white font-minecraft rounded-3xl px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Diamond className="h-5 w-5 sm:h-6 sm:w-6" />
                    Get Started
                  </span>
                  </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto"
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleLearnMore}
                  className="minecraft-button-outline font-minecraft rounded-3xl px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto relative overflow-hidden group border-2"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight className="h-5 w-5" />
                  </span>
                  </Button>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto px-4"
            >
              {[
                { icon: Users, text: "200+ Players", color: "sky-400" },
                { icon: Sword, text: "Custom Games", color: "red-400" },
                { icon: Crown, text: "Daily Events", color: "yellow-400" },
                { icon: Gift, text: "Rewards", color: "purple-400" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-3 sm:p-6 border border-white/10 hover:border-white/20 transition-all group relative overflow-hidden"
                >
                  <item.icon className={`h-6 w-6 sm:h-10 sm:w-10 mb-2 sm:mb-3 text-${item.color} mx-auto group-hover:scale-110 transition-transform`} />
                  <p className="text-gray-200 font-minecraft-alt text-sm sm:text-base md:text-lg">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
                </div>
      </motion.section>

      {/* Game Modes Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 bg-gradient-to-b from-background to-gray-900 relative overflow-hidden"
      >
        <div className="container px-4 sm:px-6 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-minecraft text-center mb-4 text-white drop-shadow-glow">
              Game Modes
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-minecraft-alt px-4">
              Explore our diverse range of game modes, each offering unique challenges and adventures
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                title: "Practice PvP",
                subtitle: "Sharpen Your Skills", 
                color: "emerald-400",
                image: "/src/img/mc-pvp.avif",
                description: "Jump into fast-paced PvP arenas to practice and improve your combat skills against other players.",
                features: ["Multiple Arenas", "ELO Ranking", "Instant Queue"]
              },
              { 
                title: "Lifesteal",
                subtitle: "Survive & Conquer", 
                color: "red-400",
                image: "/src/img/mc-ls.jpg",
                description: "Experience the thrill of Lifesteal SMP where every kill makes you stronger and every death is a setback.",
                features: ["Heart Stealing", "Clans & Alliances", "Custom Events"]
              },
              { 
                title: "Duels",
                subtitle: "1v1 Battles", 
                color: "purple-400",
                image: "/src/img/mc-duels.jpg",
                description: "Challenge friends or rivals to intense 1v1 duels with custom kits and fair matchmaking.",
                features: ["Custom Kits", "Fair Matchmaking", "Leaderboards"]
              }
            ].map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="minecraft-card group hover:shadow-[0_0_30px_rgba(68,166,117,0.3)] relative overflow-hidden bg-black/40 backdrop-blur-sm border-0 rounded-3xl">
                  <CardHeader className="relative p-0">
                    <div className="h-64 rounded-t-3xl overflow-hidden relative">
                      <img 
                        src={mode.image} 
                        alt={mode.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                      <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                        <p className={`text-${mode.color} font-minecraft mb-2`}>{mode.subtitle}</p>
                        <h3 className="text-3xl font-minecraft text-white mb-2">{mode.title}</h3>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-300 font-minecraft-alt mb-4 line-clamp-2">
                      {mode.description}
                    </p>
                    <ul className="space-y-2">
                      {mode.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-400">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${mode.color}`} />
                          <span className="font-minecraft-alt text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePlayGameMode(mode.title)}
                      className={`mt-6 w-full py-3 px-4 rounded-2xl bg-${mode.color}/20 hover:bg-${mode.color}/30 border border-${mode.color}/30 text-${mode.color} font-minecraft transition-colors group relative`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {hasCopied ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <Copy className="h-5 w-5 group-hover:hidden" />
                        )}
                        <span className="group-hover:hidden">Play Now</span>
                        <span className="hidden group-hover:inline">Copy IP</span>
                      </span>
                    </motion.button>
                  </CardContent>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Events Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-background relative overflow-hidden"
      >
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-minecraft mb-4 text-white">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                Featured Events
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-minecraft-alt px-4">
              Join our exciting community events and win amazing rewards!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Weekly PvP Tournament",
                date: "Every Saturday",
                prize: "50,000 Coins",
                image: "/src/img/mc-tournament.jpg",
                icon: Sword
              },
              {
                title: "Build Competition",
                date: "Sunday Special",
                prize: "Exclusive Ranks",
                image: "/src/img/mc-build.avif",
                icon: Trophy
              },
              {
                title: "Treasure Hunt",
                date: "This Weekend",
                prize: "Rare Items",
                image: "/src/img/mc-treasure.png",
                icon: Diamond
              }
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-3xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/50 hover:bg-gray-800/70">
                  <div className="aspect-[16/9] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                    <img
                      src={event.image}
                      alt={event.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6 relative z-20 -mt-20">
                    <event.icon className="h-8 w-8 text-yellow-400 mb-4" />
                    <h3 className="text-xl font-minecraft text-white mb-2">{event.title}</h3>
                    <p className="text-gray-400 font-minecraft-alt mb-2">{event.date}</p>
                    <p className="text-emerald-400 font-minecraft-alt">Prize: {event.prize}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* News & Updates Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 bg-gradient-to-b from-gray-900 to-background relative overflow-hidden"
      >
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-minecraft mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
                News & Updates
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto font-minecraft-alt px-4">
              Stay informed about the latest server updates and announcements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "New Lifesteal Season",
                date: "15 day ago",
                description: "Get ready for an epic new lifesteal season with custom enchants and more!",
                icon: Sparkles
              },
              {
                title: "Weekend Event Schedule",
                date: "1 week ago",
                description: "Check out our action-packed weekend events schedule for this month.",
                icon: Calendar
              }
            ].map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                      <news.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-minecraft text-white mb-2">{news.title}</h3>
                      <p className="text-gray-400 font-minecraft-alt mb-2">{news.description}</p>
                      <p className="text-sm text-gray-500">{news.date}</p>
                </div>
              </div>
            </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Server Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-background to-gray-900 relative overflow-hidden"
      >
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-minecraft mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
                Server Features
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-minecraft-alt">
              Discover what makes our server unique and exciting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Custom Enchants",
                description: "Enhance your gear with unique and powerful enchantments",
                icon: Sparkles,
                color: "purple"
              },
              {
                title: "Player Shops",
                description: "Create your own shop and trade with other players",
                icon: Diamond,
                color: "blue"
              },
              {
                title: "Ranks & Perks",
                description: "Unlock special features and benefits as you progress",
                icon: Crown,
                color: "yellow"
              },
              {
                title: "Active Staff",
                description: "Our dedicated team is here to help 24/7",
                icon: Shield,
                color: "red"
              },
              {
                title: "Community Events",
                description: "Regular events with amazing prizes and rewards",
                icon: Gift,
                color: "green"
              },
              {
                title: "Discord Integration",
                description: "Stay connected with our community on Discord",
                icon: MessageSquare,
                color: "indigo"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                viewport={{ once: true }}
                className="group"
              >
                <div className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-${feature.color}-500/50 transition-all duration-300`}>
                  <div className={`p-3 rounded-lg bg-${feature.color}-500/10 text-${feature.color}-400 w-fit mb-4`}>
                    <feature.icon className="h-6 w-6" />
                </div>
                  <h3 className="text-xl font-minecraft text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 font-minecraft-alt">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Community Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-b from-gray-900 to-background relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/img/community-bg.jpg')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-background"></div>
        </div>

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-minecraft text-center mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                Join Our Community
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-minecraft-alt">
              Be part of an amazing Minecraft community where friendships are forged and adventures await
            </p>
          </motion.div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "8K+", label: "Discord Members", icon: MessageSquare, color: "indigo" },
              { value: "500+", label: "Active Players", icon: Users, color: "green" },
              { value: "1000+", label: "Projects Built", icon: Trophy, color: "yellow" },
              { value: "50+", label: "Events Monthly", icon: Calendar, color: "pink" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className={`p-6 rounded-3xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-${stat.color}-500/20`}>
                  <stat.icon className={`h-8 w-8 text-${stat.color}-400 mb-4`} />
                  <h3 className={`text-2xl font-minecraft text-${stat.color}-400 mb-2`}>{stat.value}</h3>
                  <p className="text-gray-400 font-minecraft-alt text-sm">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Player Testimonials */}
          <div className="mb-16">
            <h3 className="text-2xl font-minecraft text-center mb-8 text-white">
              What Players Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "DragonSlayer",
                  role: "Builder",
                  avatar: "https://crafatar.com/avatars/da192e95-bcc6-45d6-b2e5-09e2f2895d7d",
                  quote: "Best community I've ever been part of. The building competitions are amazing!",
                  rating: 5
                },
                {
                  name: "PixelWarrior",
                  role: "PvP Champion",
                  avatar: "https://crafatar.com/avatars/da192e95-bcc6-45d6-b2e5-09e2f2895d7d",
                  quote: "The events are super fun and the staff is always helpful. Can't recommend enough!",
                  rating: 5
                },
                {
                  name: "RedstoneGuru",
                  role: "Technical Player",
                  avatar: "https://crafatar.com/avatars/da192e95-bcc6-45d6-b2e5-09e2f2895d7d",
                  quote: "Love the custom plugins and the friendly community. It's like a second home!",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="p-6 rounded-3xl bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/70">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-purple-500/50">
                        <img src={testimonial.avatar} alt={testimonial.name} className="object-cover" />
                  </div>
                  <div>
                        <h4 className="text-lg font-minecraft text-white">{testimonial.name}</h4>
                        <p className="text-sm text-purple-400 font-minecraft-alt">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 font-minecraft-alt mb-4">{testimonial.quote}</p>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Community Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Discord Community */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="p-8 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-indigo-500/20">
                <MessageSquare className="h-12 w-12 text-indigo-400 mb-6" />
                <h3 className="text-2xl font-minecraft text-white mb-4">Discord Community</h3>
                <p className="text-gray-300 font-minecraft-alt mb-6">
                  Join our active Discord community. Chat with players, get support, and stay updated with server news!
                </p>
                <Button 
                  onClick={handleJoinDiscord}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-minecraft rounded-2xl"
                >
                  Join Discord
                </Button>
                </div>
            </motion.div>

            {/* Community Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="p-8 rounded-3xl bg-pink-500/10 border border-pink-500/20 backdrop-blur-sm transition-all duration-300 hover:bg-pink-500/20">
                <Calendar className="h-12 w-12 text-pink-400 mb-6" />
                <h3 className="text-2xl font-minecraft text-white mb-4">Community Events</h3>
                <p className="text-gray-300 font-minecraft-alt mb-6">
                  Participate in building contests, PvP tournaments, treasure hunts, and special holiday events!
                </p>
                <Button 
                  onClick={() => handleCommunityAction('events')}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-minecraft rounded-2xl"
                >
                  View Events
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Server Stats Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-[url('/img/stats-bg.jpg')] bg-cover bg-center relative"
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="container px-4 md:px-6 relative">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: "200+", label: "Daily Players", color: "emerald-400" },
              { value: "50+", label: "Custom Features", color: "sky-400" },
              { value: "24/7", label: "Online Support", color: "yellow-400" },
              { value: "99.9%", label: "Uptime", color: "purple-400" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-3xl bg-black/40 border border-white/10 transform transition-transform hover:shadow-[0_0_20px_rgba(68,166,117,0.3)] relative overflow-hidden group"
              >
                <h3 className={`text-4xl font-minecraft text-${stat.color} mb-2`}>
                  {stat.value}
                </h3>
                <p className="text-gray-300 font-minecraft-alt">
                  {stat.label}
                </p>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-16 sm:py-20 bg-gradient-to-t from-background to-gray-900"
      >
        <div className="container px-4 sm:px-6">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-minecraft mb-4 sm:mb-6 text-white">
              Ready to Join the Adventure?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 font-minecraft-alt mb-6 sm:mb-8 px-4">
              Connect to <span className="text-emerald-400">fusion-network.com</span> and start your journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto"
              >
                <Button 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="minecraft-button bg-emerald-500 hover:bg-emerald-600 text-white font-minecraft rounded-3xl px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Diamond className="h-5 w-5 sm:h-6 sm:w-6" />
                    Get Started
                  </span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto"
              >
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleLearnMore}
                  className="minecraft-button-outline font-minecraft rounded-3xl px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto relative overflow-hidden group border-2"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Learn More
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default Index;
