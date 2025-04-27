import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Info, 
  Package, 
  Check, 
  AlertTriangle, 
  Zap,
  Settings,
  Sparkles,
  Shield,
  Server,
  Clock,
  X
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

interface Mod {
  name: string;
  version: string;
  description: string;
  downloadUrl: string;
  required: boolean;
  type: 'core' | 'optimization' | 'utility' | 'cosmetic';
  size: string;
  features: string[];
}

const requiredMods: Mod[] = [
  {
    name: 'Forge API',
    version: '47.1.0',
    description: 'The core modding API that provides functionality for other mods to work properly.',
    downloadUrl: 'https://files.minecraftforge.net/net/minecraftforge/forge/',
    required: true,
    type: 'core',
    size: '5.2 MB',
    features: [
      'Base modding framework',
      'Essential for all mods',
      'Performance optimized',
      'Regular security updates'
    ]
  },
  {
    name: 'FusionCore',
    version: '2.4.3',
    description: 'Custom server-side mod required to connect to Fusion Network. Enhances gameplay with server-specific features.',
    downloadUrl: '#',
    required: true,
    type: 'core',
    size: '3.7 MB',
    features: [
      'Server connectivity',
      'Custom game mechanics',
      'Enhanced player interactions',
      'Exclusive features access'
    ]
  },
  {
    name: 'OptiFine',
    version: 'HD U H8',
    description: 'Optimization mod that increases performance and allows for better graphics settings.',
    downloadUrl: 'https://optifine.net/downloads',
    required: false,
    type: 'optimization',
    size: '7.8 MB',
    features: [
      'FPS boost',
      'Dynamic lighting',
      'Custom textures support',
      'Shader compatibility'
    ]
  },
  {
    name: 'JEI (Just Enough Items)',
    version: '11.5.0.297',
    description: 'View recipes for items and blocks in-game with an enhanced inventory interface.',
    downloadUrl: 'https://www.curseforge.com/minecraft/mc-mods/jei',
    required: false,
    type: 'utility',
    size: '4.2 MB',
    features: [
      'Item recipe lookup',
      'Crafting guide',
      'Search functionality',
      'Mod item integration'
    ]
  },
  {
    name: 'Xaero\'s Minimap',
    version: '23.4.4',
    description: 'Adds an in-game minimap to help navigate the server world.',
    downloadUrl: 'https://www.curseforge.com/minecraft/mc-mods/xaeros-minimap',
    required: false,
    type: 'utility',
    size: '2.8 MB',
    features: [
      'Real-time navigation',
      'Waypoint system',
      'World mapping',
      'Player tracking'
    ]
  },
  {
    name: 'FusionTextures',
    version: '1.5.0',
    description: 'Custom resource pack for enhanced server textures and effects.',
    downloadUrl: '#',
    required: false,
    type: 'cosmetic',
    size: '18.3 MB',
    features: [
      'HD textures',
      'Custom UI elements',
      'Animated blocks',
      'Enhanced particles'
    ]
  },
] as const;

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

const RequiredMods = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-purple-900/20 to-black">
      <div className="container py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            Mod Guide
          </Badge>
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500">
            Required Mods
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enhance your gameplay experience with our carefully selected mods
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Card className="backdrop-blur-sm bg-black/40 border-0 rounded-xl mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-emerald-400" />
                Installation Guide
              </CardTitle>
              <CardDescription>
                Follow these steps to properly install and configure the required mods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-4 top-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        1
                      </span>
                    </div>
                    <div className="bg-black/20 p-6 pl-16 rounded-xl">
                      <h3 className="font-medium mb-2">Install Forge</h3>
                      <p className="text-sm text-gray-400">Download and install Forge 47.1.0 for Minecraft 1.20.1</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        2
                      </span>
                    </div>
                    <div className="bg-black/20 p-6 pl-16 rounded-xl">
                      <h3 className="font-medium mb-2">Download Required Mods</h3>
                      <p className="text-sm text-gray-400">Install all mods marked as Required</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-4 top-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        3
                      </span>
                    </div>
                    <div className="bg-black/20 p-6 pl-16 rounded-xl">
                      <h3 className="font-medium mb-2">Configure Settings</h3>
                      <p className="text-sm text-gray-400">Adjust mod settings for optimal performance</p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                        4
                      </span>
                    </div>
                    <div className="bg-black/20 p-6 pl-16 rounded-xl">
                      <h3 className="font-medium mb-2">Launch Game</h3>
                      <p className="text-sm text-gray-400">Start Minecraft with the Forge profile</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="grid grid-cols-1 md:grid-cols-5 bg-black/40 border border-white/10 p-1 rounded-lg">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-500/20">
                <Package className="w-4 h-4 mr-2" />
                All Mods
              </TabsTrigger>
              <TabsTrigger value="required" className="data-[state=active]:bg-purple-500/20">
                <Shield className="w-4 h-4 mr-2" />
                Required
              </TabsTrigger>
              <TabsTrigger value="optimization" className="data-[state=active]:bg-purple-500/20">
                <Zap className="w-4 h-4 mr-2" />
                Optimization
              </TabsTrigger>
              <TabsTrigger value="utility" className="data-[state=active]:bg-purple-500/20">
                <Settings className="w-4 h-4 mr-2" />
                Utility
              </TabsTrigger>
              <TabsTrigger value="cosmetic" className="data-[state=active]:bg-purple-500/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Cosmetic
              </TabsTrigger>
            </TabsList>

            {["all", "required", "optimization", "utility", "cosmetic"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="grid gap-4"
                >
                  {requiredMods
                    .filter(mod => 
                      tab === "all" ? true :
                      tab === "required" ? mod.required :
                      mod.type === tab
                    )
                    .map((mod) => (
                      <ModCard key={mod.name} mod={mod} />
                    ))}
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          <Card className="backdrop-blur-sm bg-black/40 border-0 rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                Compatibility Notes
              </CardTitle>
              <CardDescription>
                Important information about mod compatibility and server rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-xl">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-400" />
                      Compatible Mods
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>Performance optimization mods</li>
                      <li>Quality of life improvements</li>
                      <li>Visual enhancement mods</li>
                      <li>Interface modifications</li>
                    </ul>
                  </div>

                  <div className="bg-black/20 p-4 rounded-xl">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <X className="h-4 w-4 text-red-400" />
                      Prohibited Mods
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>Hacked clients</li>
                      <li>Auto-clicking mods</li>
                      <li>X-ray or ore finders</li>
                      <li>Unfair advantage mods</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-black/20 p-4 rounded-xl">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Server className="h-4 w-4 text-blue-400" />
                      Server Requirements
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>Keep mods updated to latest version</li>
                      <li>Report any compatibility issues</li>
                      <li>Follow server mod guidelines</li>
                      <li>Regular mod list updates</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      Update Schedule
                    </h3>
                    <p className="text-sm text-gray-400">
                      We regularly update our mod requirements to ensure the best possible gameplay experience. Check back frequently for the latest updates and changes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const ModCard = ({ mod }: { mod: Mod }) => {
  return (
    <motion.div variants={item}>
      <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl">
        <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-500 ${
          mod.required ? 'from-emerald-500/10 via-emerald-500/5' :
          mod.type === 'optimization' ? 'from-blue-500/10 via-blue-500/5' :
          mod.type === 'utility' ? 'from-purple-500/10 via-purple-500/5' :
          'from-pink-500/10 via-pink-500/5'
        } to-transparent`} />
        
        <CardContent className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{mod.name}</h3>
                  {mod.required ? (
                    <Badge className="bg-emerald-500">Required</Badge>
                  ) : (
                    <Badge variant="outline" className="border-purple-500 text-purple-400">Optional</Badge>
                  )}
                </div>
                <p className="text-gray-400">{mod.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {mod.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="h-4 w-4 text-emerald-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className="border-blue-500 text-blue-400">
                  v{mod.version}
                </Badge>
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  {mod.size}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RequiredMods;
