import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, MessageSquare, Home, Users, 
  Swords, Crown, Ban, Scroll, Coins, Gift, Hammer
} from 'lucide-react';

const Rules = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

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
            Server Rules
          </h1>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
            To maintain a fair and enjoyable environment for all players, please follow these rules carefully.
          </p>
        </motion.div>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto space-y-8"
        >
          {[
            {
              title: "1. General Behavior",
              description: "Guidelines for player conduct",
              icon: Users,
              color: "emerald",
              badge: "Essential",
              rules: [
                "Be respectful to all players and staff members at all times",
                "No harassment, discrimination, hate speech, or bullying",
                "Keep chat family-friendly and avoid excessive profanity",
                "No spamming or flooding chat with repeated messages",
                "Follow staff instructions promptly and respectfully",
                "No impersonating staff members or other players"
              ]
            },
            {
              title: "2. PvP Rules",
              description: "Combat and player interaction guidelines",
              icon: Swords,
              color: "red",
              badge: "Critical",
              rules: [
                "PvP is only allowed in designated areas or with mutual consent",
                "No combat logging or using exploits during PvP",
                "Respect safe zones and non-PvP areas",
                "No spawn killing or repeated targeting of the same player",
                "Fair play is required - no teaming in solo PvP events",
                "Report any PvP-related bugs to staff immediately",
                "Kit abuse or exploiting PvP mechanics is prohibited"
              ]
            },
            {
              title: "3. Building Guidelines",
              description: "Construction and territory rules",
              icon: Home,
              color: "blue",
              badge: "Important",
              rules: [
                "Maintain a 100-block minimum distance between bases",
                "No inappropriate or offensive builds",
                "Clean up temporary structures and floating trees",
                "No lag-inducing redstone without staff approval",
                "Respect protected areas and server builds",
                "No claiming inactive players' territories"
              ]
            },
            {
              title: "4. Economy Rules",
              description: "Trading and currency guidelines",
              icon: Coins,
              color: "yellow",
              badge: "Important",
              rules: [
                "No scamming or misleading trades",
                "Real-money trading (RMT) is strictly prohibited",
                "Report economy exploits to staff",
                "No artificial inflation or market manipulation",
                "Keep trades within designated areas",
                "No exploiting auction house mechanics"
              ]
            },
            {
              title: "5. Hacking & Exploits",
              description: "Cheating and unfair advantage rules",
              icon: Ban,
              color: "purple",
              badge: "Critical",
              rules: [
                "No hacked clients or modified game files",
                "No auto-clickers or macro programs",
                "X-ray texture packs are prohibited",
                "No using glitches or exploits",
                "Report bugs instead of exploiting them",
                "No duplication glitches or item exploits"
              ]
            },
            {
              title: "6. Communication",
              description: "Chat and messaging guidelines",
              icon: MessageSquare,
              color: "pink",
              badge: "Essential",
              rules: [
                "English only in global chat",
                "No advertising other servers",
                "No sharing personal information",
                "Keep political/religious discussions private",
                "No spreading false information",
                "Use appropriate channels for support"
              ]
            },
            {
              title: "7. Events & Competitions",
              description: "Organized activity guidelines",
              icon: Crown,
              color: "orange",
              badge: "Important",
              rules: [
                "Follow specific event rules as posted",
                "No sabotaging other participants",
                "Report to staff if unable to attend",
                "Keep competition fair and friendly",
                "No teaming unless specifically allowed",
                "Accept staff decisions during events"
              ]
            },
            {
              title: "8. Donations & Ranks",
              description: "Premium feature guidelines",
              icon: Gift,
              color: "green",
              badge: "Important",
              rules: [
                "Rank privileges must not be abused",
                "No sharing premium features",
                "Refunds follow our refund policy",
                "Report rank-related bugs promptly",
                "Premium items are non-transferable",
                "Respect rank restrictions and limits"
              ]
            }
          ].map((section) => (
            <motion.div key={section.title} variants={item} className="group">
              <Card className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/40 border-0 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-black to-transparent opacity-50" />
                <div className="flex relative">
                  <div className={`relative bg-${section.color}-500/10 flex items-center justify-center p-6 group-hover:bg-${section.color}-500/20 transition-all duration-500 overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${section.color}-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                    <section.icon className={`h-10 w-10 text-${section.color}-500 relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`} />
                  </div>
                  <div className="flex-1 p-6 relative z-10">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-2xl font-bold text-white group-hover:text-${section.color}-200 transition-all duration-500 drop-shadow-lg`}>
                        {section.title}
                      </h3>
                      <Badge variant="outline" 
                        className={`bg-black/40 border-${section.color}-500/50 text-${section.color}-400 
                          group-hover:bg-${section.color}-500/20 group-hover:border-${section.color}-400 
                          group-hover:text-${section.color}-200 transition-all duration-500 
                          group-hover:shadow-lg group-hover:shadow-${section.color}-500/20`}>
                        {section.badge}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-4 group-hover:text-white/90 transition-colors duration-500">
                      {section.description}
                    </p>
                    <ul className="space-y-3">
                      {section.rules.map((rule, ruleIndex) => (
                        <motion.li
                          key={ruleIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * ruleIndex }}
                          className="flex items-start group/item"
                        >
                          <span className={`text-${section.color}-500 mr-2 text-lg transform group-hover/item:scale-125 group-hover:text-${section.color}-400 transition-all duration-500`}>
                            •
                          </span>
                          <span className="text-gray-300 group-hover:text-white transition-colors duration-500 drop-shadow-lg">
                            {rule}
                          </span>
                        </motion.li>
                      ))}
                  </ul>
              </div>
            </div>
          </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 space-y-8 max-w-4xl mx-auto"
        >
          {/* Punishment Guidelines */}
          <Card className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-black/40 border border-red-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
            <CardHeader className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Hammer className="h-8 w-8 text-red-500" />
                <CardTitle className="text-2xl font-bold text-red-500">Punishment Guidelines</CardTitle>
              </div>
              <CardDescription className="text-gray-400">
                Rule violations will be handled according to severity and frequency
              </CardDescription>
                </CardHeader>
            <CardContent className="relative">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white mb-2">Minor Violations</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-500">•</span>
                        Verbal warning
                    </li>
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-500">•</span>
                        Temporary mute (1-24 hours)
                    </li>
                      <li className="flex items-center gap-2">
                        <span className="text-yellow-500">•</span>
                        Temporary kick
                    </li>
                  </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-white mb-2">Major Violations</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">•</span>
                        Temporary ban (1-30 days)
                    </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">•</span>
                        Permanent ban
                    </li>
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">•</span>
                        Account reset/wiped
                    </li>
                  </ul>
              </div>
            </div>
                
                <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <h4 className="text-lg font-semibold text-yellow-500">Important Notes</h4>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      Punishments may be escalated for repeat offenders
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      Some violations may result in immediate permanent ban
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      Appeals can be made through our Discord server
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rules Update Notice */}
          <div className="flex items-center gap-3 text-gray-400 border-t border-gray-800 pt-8">
            <Scroll className="h-5 w-5 text-purple-400" />
            <p>Rules are subject to change. Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Rules;
