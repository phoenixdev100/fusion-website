import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Crown, 
  Shield, 
  Code, 
  Users, 
  Star, 
  Award, 
  Sparkles,
  Github as GithubIcon
} from 'lucide-react';
import { FaLinkedin, FaGlobe } from 'react-icons/fa';

interface TeamMember {
  name: string;
  role: string;
  category: 'ownership' | 'development' | 'moderation' | 'helper';
  minecraftUsername: string;
}

const teamMembers: TeamMember[] = [
  // Ownership Team
  {
    name: "CoolAllRounder",
    role: "Server Founder",
    category: "ownership",
    minecraftUsername: "CoolAllRounder"
  },
  {
    name: "Beast",
    role: "Server Owner",
    category: "ownership",
    minecraftUsername: "Beast"
  },
  // Development Team
  {
    name: "MstrChief100",
    role: "System Admin & Website Developer",
    category: "development",
    minecraftUsername: "Spyder_xD_"
  },
  {
    name: "n0step_",
    role: "Development Manager",
    category: "development",
    minecraftUsername: "n0step_"
  },
  {
    name: "kespyy",
    role: "Developer",
    category: "development",
    minecraftUsername: "kespyy"
  },
  {
    name: "lished",
    role: "Developer",
    category: "development",
    minecraftUsername: "lished"
  },
  {
    name: "airzz_",
    role: "Developer",
    category: "development",
    minecraftUsername: "airzz_"
  },
  {
    name: "JimSpecter",
    role: "Developer",
    category: "development",
    minecraftUsername: "JimSpecter"
  },
  // Moderation Team
  {
    name: "KiriNaved",
    role: "Admin",
    category: "moderation",
    minecraftUsername: "KiriNaved"
  },
  {
    name: "winnowed",
    role: "Moderator",
    category: "moderation",
    minecraftUsername: "winnowed"
  },
  {
    name: "_Aquaking",
    role: "Moderator",
    category: "moderation",
    minecraftUsername: "_Aquaking"
  },
  {
    name: "cubed",
    role: "Moderator",
    category: "moderation",
    minecraftUsername: "cubed"
  },
  {
    name: "zWillX0",
    role: "Moderator",
    category: "moderation",
    minecraftUsername: "zWillX0"
  },
  // Helper Team
  {
    name: "Winzyy_y",
    role: "Helper",
    category: "helper",
    minecraftUsername: "Winzyy_y"
  },
  {
    name: "As_h_",
    role: "Helper",
    category: "helper",
    minecraftUsername: "As_h_"
  },
  {
    name: "Hatch",
    role: "Helper",
    category: "helper",
    minecraftUsername: "Hatch"
  },
  {
    name: "v7try",
    role: "Helper",
    category: "helper",
    minecraftUsername: "v7try"
  },
  {
    name: "Valor",
    role: "Helper",
    category: "helper",
    minecraftUsername: "ValorReign"
  },
  {
    name: "Vorduen",
    role: "Helper",
    category: "helper",
    minecraftUsername: "Vorduen"
  },
  {
    name: "Searce",
    role: "Helper",
    category: "helper",
    minecraftUsername: "Searce"
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'ownership':
      return <Crown className="h-8 w-8 text-yellow-400" />;
    case 'development':
      return <Code className="h-8 w-8 text-blue-400" />;
    case 'moderation':
      return <Shield className="h-8 w-8 text-red-400" />;
    case 'helper':
      return <Users className="h-8 w-8 text-green-400" />;
    default:
      return <Star className="h-8 w-8 text-purple-400" />;
  }
};

const getCategoryTitle = (category: string) => {
  switch (category) {
    case 'ownership':
      return 'Leadership Team';
    case 'development':
      return 'Development Team';
    case 'moderation':
      return 'Moderation Team';
    case 'helper':
      return 'Helper Team';
    default:
      return 'Other Team';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ownership':
      return 'from-yellow-500/20 to-yellow-600/10';
    case 'development':
      return 'from-blue-500/20 to-blue-600/10';
    case 'moderation':
      return 'from-red-500/20 to-red-600/10';
    case 'helper':
      return 'from-green-500/20 to-green-600/10';
    default:
      return 'from-purple-500/20 to-purple-600/10';
  }
};

const mstrChiefSocials = [
  {
    icon: <FaGlobe className="h-5 w-5" />, url: 'https://phoenixdev100.tech', label: 'Portfolio'
  },
  {
    icon: <FaLinkedin className="h-5 w-5" />, url: 'https://linkedin.com/in/phoenixdev100', label: 'LinkedIn'
  },
  {
    icon: <GithubIcon className="h-5 w-5" />, url: 'https://github.com/PhoenixDev100', label: 'GitHub'
  }
];

const nostepSocials = [
  {
    icon: <GithubIcon className="h-5 w-5" />, url: 'https://github.com/krushna06', label: 'GitHub'
  },
  {
    icon: <FaGlobe className="h-5 w-5" />, url: 'https://nostep.xyz', label: 'Website'
  }
];

const Team = () => {
  const categories = ['ownership', 'development', 'moderation', 'helper'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-black">
      <div className="container py-8 px-4 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-3"
          >
            <Sparkles className="h-10 w-10 text-purple-500 mx-auto" />
          </motion.div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            Our Team
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Meet the amazing people behind Fusion Network
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const categoryMembers = teamMembers.filter(member => member.category === category);
            const memberCount = categoryMembers.length;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <Card className={`relative overflow-hidden rounded-2xl backdrop-blur-sm bg-gray-900/50 border-0 shadow-xl`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(category)} opacity-50`}></div>
                  <CardHeader className="relative py-4">
                    <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
                      {getCategoryIcon(category)}
                      {getCategoryTitle(category)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`grid gap-4 ${
                      memberCount === 1 ? 'grid-cols-1' :
                      memberCount === 2 ? 'grid-cols-1 md:grid-cols-2' :
                      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {categoryMembers.map((member, index) => (
                        <motion.div
                          key={member.minecraftUsername}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="group relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                          <div className="relative bg-black/40 p-5 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
                            <div className="flex flex-col items-center text-center">
                              <div className="relative mb-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                                <img
                                  src={`https://mc-heads.net/avatar/${member.minecraftUsername}/200`}
                                  alt={member.name}
                                  className="w-28 h-28 rounded-full border-4 border-purple-400 shadow-lg bg-black relative z-10 transform transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center z-20 border-2 border-black">
                                  <Award className="h-4 w-4 text-white" />
                                </div>
                              </div>
                              <h3 className="font-semibold text-lg mb-1 group-hover:text-purple-400 transition-colors duration-300">
                                {member.name}
                              </h3>
                              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-3">
                                {member.role}
                              </p>
                              {/* Socials for MstrChief100, Spyder_xD_, and n0step_ */}
                              {(['MstrChief100', 'Spyder_xD_'].includes(member.minecraftUsername)) && (
                                <div className="flex gap-3 justify-center mb-2 mt-1">
                                  {mstrChiefSocials.map((social) => (
                                    <a
                                      key={social.label}
                                      href={social.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 hover:text-white transition-colors duration-200 shadow"
                                      title={social.label}
                                    >
                                      {social.icon}
                                    </a>
                                  ))}
                                </div>
                              )}
                              {member.minecraftUsername === 'n0step_' && (
                                <div className="flex gap-3 justify-center mb-2 mt-1">
                                  {nostepSocials.map((social) => (
                                    <a
                                      key={social.label}
                                      href={social.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-2 rounded-full bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 hover:text-white transition-colors duration-200 shadow"
                                      title={social.label}
                                    >
                                      {social.icon}
                                    </a>
                                  ))}
                                </div>
                              )}
                              {/* Minecraft Username */}
                              <div className="text-xs text-gray-500 bg-black/30 px-3 py-1.5 rounded-full">
                                <span className="inline-flex items-center gap-1.5">
                                  <img 
                                    src={`https://mc-heads.net/head/${member.minecraftUsername}/16`} 
                                    alt="Minecraft" 
                                    className="w-4 h-4"
                                  />
                                  {member.minecraftUsername}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Team;
