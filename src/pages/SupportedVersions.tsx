import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Check, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  X, 
  Download, 
  Cpu, 
  Layers, 
  Settings, 
  Zap,
  Server,
  Shield
} from 'lucide-react';

const versions = [
  {
    version: "1.20.4",
    status: "recommended",
    features: "Full",
    notes: "Optimized for the best experience on our server with all features available.",
    clientDownloadUrl: "https://www.minecraft.net/en-us/download",
    specificFeatures: [
      "Full support for all custom items and blocks",
      "Enhanced particle effects and animations",
      "Access to all server features and game modes",
      "Best performance and stability",
      "Compatible with all server events"
    ]
  },
  {
    version: "1.20.2",
    status: "supported",
    features: "Full",
    notes: "All features are supported, but 1.20.4 is recommended for the best experience.",
    clientDownloadUrl: "https://www.minecraft.net/en-us/download",
    specificFeatures: [
      "Full support for most custom items",
      "Complete access to game modes",
      "Minor visual differences in newer blocks",
      "Good overall performance"
    ]
  },
  {
    version: "1.20.1",
    status: "supported",
    features: "Partial",
    notes: "Most features work, but some new items and blocks will appear differently.",
    clientDownloadUrl: "https://www.minecraft.net/en-us/download",
    specificFeatures: [
      "Basic support for custom items",
      "Access to most game modes",
      "Some visual differences in newer content",
      "Acceptable performance"
    ]
  },
  {
    version: "1.19.x",
    status: "legacy",
    features: "Basic",
    notes: "Basic gameplay works but many custom features are limited or unavailable.",
    clientDownloadUrl: "https://www.minecraft.net/en-us/download",
    specificFeatures: [
      "Limited custom item support",
      "Basic game mode access",
      "Significant visual differences",
      "Reduced feature set"
    ]
  },
  {
    version: "1.18.x - 1.16.x",
    status: "legacy",
    features: "Limited",
    notes: "Connection support with limited features. Many custom elements will not display correctly.",
    clientDownloadUrl: "https://www.minecraft.net/en-us/download",
    specificFeatures: [
      "Basic connection support",
      "Limited feature availability",
      "Major visual differences",
      "Not recommended for optimal gameplay"
    ]
  },
  {
    version: "1.15.x - 1.12.x",
    status: "deprecated",
    features: "Minimal",
    notes: "Basic connection only. Most custom features will not work correctly.",
    clientDownloadUrl: "https://www.minecraft.net/en-us/download",
    specificFeatures: [
      "Minimal feature support",
      "Basic connection only",
      "Most features unavailable",
      "For legacy players only"
    ]
  },
  {
    version: "1.11.x and older",
    status: "unsupported",
    features: "None",
    notes: "These versions cannot connect to our server.",
    clientDownloadUrl: null,
    specificFeatures: [
      "No connection support",
      "Completely incompatible",
      "Unable to join server"
    ]
  },
];

const performanceRecommendations = [
  {
    title: "Minimum Requirements",
    icon: Cpu,
    specs: [
      "CPU: Intel Core i3-3210 / AMD A8-7600",
      "RAM: 4GB Allocated",
      "Storage: 4GB Free Space",
      "GPU: Intel HD Graphics 4000 / AMD Radeon R5",
      "OS: Windows 10, macOS 10.14+, Linux"
    ]
  },
  {
    title: "Recommended Specs",
    icon: Zap,
    specs: [
      "CPU: Intel Core i5-4690 / AMD A10-7800",
      "RAM: 8GB Allocated",
      "Storage: 8GB Free Space",
      "GPU: NVIDIA GeForce 700 Series / AMD Radeon RX 200 Series",
      "OS: Windows 10/11, macOS 12+, Linux"
    ]
  },
  {
    title: "Optimal Experience",
    icon: Shield,
    specs: [
      "CPU: Intel Core i7-6700 / AMD Ryzen 5 1600",
      "RAM: 16GB Allocated",
      "Storage: 16GB Free Space",
      "GPU: NVIDIA GeForce GTX 1060 / AMD Radeon RX 580",
      "OS: Latest Windows 11, macOS, Linux"
    ]
  }
];

const modCompatibility = {
  recommended: [
    "OptiFine HD U I8",
    "Sodium",
    "Lithium",
    "Phosphor",
    "FerriteCore"
  ],
  compatible: [
    "JourneyMap",
    "MouseOverInfo",
    "AppleSkin",
    "JEI (Just Enough Items) 15.2.0+",
    "Xaero's Minimap 24.0+"
  ],
  incompatible: [
    "Hack Clients",
    "X-Ray Mods",
    "Auto-Clickers",
    "Advantage-giving mods",
    "PvP Enhancement mods",
    "Outdated mod versions"
  ]
};

const SupportedVersions = () => {
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
            Version Guide
          </Badge>
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500">
            Supported Versions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find out which Minecraft versions work best with our server and get detailed compatibility information.
          </p>
        </motion.div>

        <Tabs defaultValue="versions" className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 bg-black/40 border border-white/10 p-1 rounded-lg mb-8">
            <TabsTrigger value="versions" className="data-[state=active]:bg-purple-500/20">
              <Layers className="w-4 h-4 mr-2" />
              Versions
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-purple-500/20">
              <Cpu className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="mods" className="data-[state=active]:bg-purple-500/20">
              <Settings className="w-4 h-4 mr-2" />
              Mod Support
            </TabsTrigger>
            <TabsTrigger value="bedrock" className="data-[state=active]:bg-purple-500/20">
              <Server className="w-4 h-4 mr-2" />
              Bedrock
            </TabsTrigger>
          </TabsList>

          <TabsContent value="versions" className="space-y-8">
            <Alert className="border-fusion-accent bg-fusion-accent/10">
            <AlertTitle className="flex items-center gap-2">
              <Check className="h-4 w-4" />
              Recommended Version
            </AlertTitle>
            <AlertDescription>
              We recommend using Minecraft 1.20.1 for the best gameplay experience on Fusion Network.
            </AlertDescription>
          </Alert>
          
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4"
            >
              {versions.map((version) => (
                <motion.div key={version.version} variants={item}>
                  <Card className={`group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl ${
                    version.status === 'recommended' ? 'hover:shadow-emerald-500/20' : 
                    version.status === 'unsupported' ? 'hover:shadow-red-500/20' : 
                    'hover:shadow-purple-500/20'
                  }`}>
                    <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                      version.status === 'recommended' ? 'from-emerald-500/10 via-emerald-500/5' :
                      version.status === 'supported' ? 'from-blue-500/10 via-blue-500/5' :
                      version.status === 'legacy' ? 'from-amber-500/10 via-amber-500/5' :
                      version.status === 'deprecated' ? 'from-gray-500/10 via-gray-500/5' :
                      'from-red-500/10 via-red-500/5'
                    } to-transparent`} />
                    
                    <CardContent className="p-6">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-2xl font-bold text-white">Minecraft {version.version}</h3>
                            <Badge className={
                              version.status === 'recommended' ? "bg-emerald-500" :
                              version.status === 'supported' ? "bg-blue-500" :
                              version.status === 'legacy' ? "bg-amber-500" :
                              version.status === 'deprecated' ? "bg-gray-500" :
                              "bg-red-500"
                            }>
                              {version.status.charAt(0).toUpperCase() + version.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-gray-400">{version.notes}</p>
                  </div>
                  
                        <div className="flex flex-col items-end gap-3">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                            version.status === 'recommended' ? "bg-emerald-500/20 text-emerald-400" :
                            version.status === 'supported' ? "bg-blue-500/20 text-blue-400" :
                            version.status === 'legacy' ? "bg-amber-500/20 text-amber-400" :
                            version.status === 'deprecated' ? "bg-gray-500/20 text-gray-400" :
                            "bg-red-500/20 text-red-400"
                          }`}>
                            {version.status === 'recommended' && <Check className="h-4 w-4" />}
                            {version.status === 'supported' && <Shield className="h-4 w-4" />}
                            {version.status === 'legacy' && <Clock className="h-4 w-4" />}
                            {version.status === 'deprecated' && <AlertTriangle className="h-4 w-4" />}
                            {version.status === 'unsupported' && <X className="h-4 w-4" />}
                            <span className="text-sm">
                              {version.status === 'recommended' && "Recommended Version"}
                              {version.status === 'supported' && "Fully Supported"}
                              {version.status === 'legacy' && "Legacy Support"}
                              {version.status === 'deprecated' && "Limited Support"}
                              {version.status === 'unsupported' && "Not Supported"}
                            </span>
                  </div>
                  
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <Server className="h-4 w-4" />
                              <span>Server Status:</span>
                              <Badge variant="outline" className={
                                version.features === "Full" ? "border-emerald-500 text-emerald-400" :
                                version.features === "Partial" ? "border-blue-500 text-blue-400" :
                                version.features === "Basic" ? "border-amber-500 text-amber-400" :
                                version.features === "Limited" ? "border-gray-500 text-gray-400" :
                                "border-red-500 text-red-400"
                              }>
                                {version.features} Support
                              </Badge>
                  </div>
                  
                            {/* {version.clientDownloadUrl && (
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-400">Official Client:</span>
                                <Badge variant="outline" className="border-purple-500 text-purple-400 cursor-pointer hover:bg-purple-500/10">
                                  <div className="flex items-center gap-1">
                                    <Download className="h-3 w-3" />
                                    Available
                                  </div>
                                </Badge>
                  </div>
                            )} */}
                </div>
              </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Version-Specific Features</h4>
                          <ul className="space-y-2">
                            {version.specificFeatures.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="h-4 w-4 text-emerald-400" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                    </div>
                    
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Feature Support</h4>
                      <Badge variant="outline" className={
                              version.features === "Full" ? "border-emerald-500 text-emerald-500" :
                        version.features === "Partial" ? "border-blue-500 text-blue-500" :
                        version.features === "Basic" ? "border-amber-500 text-amber-500" :
                        version.features === "Limited" ? "border-gray-500 text-gray-400" :
                        "border-red-500 text-red-500"
                      }>
                              {version.features} Support
                      </Badge>
                    </div>
                  
                    <div className="flex items-center gap-2 text-sm">
                      {version.status === 'recommended' || version.status === 'supported' ? (
                              <span className="flex items-center gap-1 text-emerald-500">
                          <Check size={16} /> Fully compatible
                        </span>
                      ) : version.status === 'legacy' ? (
                        <span className="flex items-center gap-1 text-amber-500">
                          <Clock size={16} /> Limited compatibility
                        </span>
                      ) : version.status === 'deprecated' ? (
                        <span className="flex items-center gap-1 text-gray-500">
                          <AlertTriangle size={16} /> Minimal compatibility
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-500">
                          <X size={16} /> Not compatible
                        </span>
                      )}
                    </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-8">
            <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardHeader>
                <CardTitle className="text-2xl">Performance Requirements</CardTitle>
                <CardDescription>
                  Recommended specifications for different gameplay experiences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {performanceRecommendations.map((spec, index) => (
                    <Card key={index} className="bg-black/20 border-0">
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-purple-500/20">
                            <spec.icon className="h-5 w-5 text-purple-400" />
                          </div>
                          <CardTitle className="text-lg">{spec.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {spec.specs.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                              <Check className="h-4 w-4 text-emerald-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardHeader>
                <CardTitle className="text-2xl">Performance Tips</CardTitle>
                <CardDescription>
                  Optimize your gameplay experience with these recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Client Optimization</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="h-4 w-4 text-emerald-400" />
                        Use performance-enhancing mods like OptiFine or Sodium
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="h-4 w-4 text-emerald-400" />
                        Allocate appropriate amount of RAM
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="h-4 w-4 text-emerald-400" />
                        Update graphics drivers regularly
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="h-4 w-4 text-emerald-400" />
                        Optimize video settings
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Connection Optimization</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="h-4 w-4 text-emerald-400" />
                        Use a wired connection when possible
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="h-4 w-4 text-emerald-400" />
                        Close background applications
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="h-4 w-4 text-emerald-400" />
                        Reduce render distance during lag spikes
                      </li>
                      <li className="flex items-center gap-2 text-gray-400">
                        <Check className="h-4 w-4 text-emerald-400" />
                        Configure Java arguments correctly
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mods" className="space-y-8">
            <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <CardHeader>
                <CardTitle className="text-2xl">Mod Compatibility</CardTitle>
                <CardDescription>
                  Information about which mods work with our server
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-black/20 border-0">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-500">Recommended</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {modCompatibility.recommended.map((mod, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                            <Check className="h-4 w-4 text-emerald-400" />
                            {mod}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-black/20 border-0">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500">Compatible</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {modCompatibility.compatible.map((mod, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                            <Check className="h-4 w-4 text-blue-400" />
                            {mod}
                          </li>
                        ))}
                      </ul>
                </CardContent>
              </Card>

                  <Card className="bg-black/20 border-0">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-500">Not Allowed</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {modCompatibility.incompatible.map((mod, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-400">
                            <X className="h-4 w-4 text-red-400" />
                            {mod}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
          </div>
              </CardContent>
            </Card>

            <Alert className="border-yellow-500/30 bg-yellow-500/10">
              <AlertTitle className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Important Note
              </AlertTitle>
              <AlertDescription className="text-gray-400">
                Always check for the latest mod compatibility information and recommended mod configurations.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="bedrock" className="space-y-8">
            <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
            <CardHeader>
                <CardTitle className="text-2xl">Bedrock Edition Support</CardTitle>
                <CardDescription>
                  Connect to Fusion Network using Minecraft Bedrock Edition
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-black/20 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4">Connection Details</h3>
              <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-400 mb-1">Server Address</p>
                          <code className="block bg-black/30 px-4 py-2 rounded-lg text-emerald-400">
                            Coming soon
                          </code>
                        </div>
                    <div>
                          <p className="text-sm font-medium text-gray-400 mb-1">Port</p>
                          <code className="block bg-black/30 px-4 py-2 rounded-lg text-emerald-400">
                            N/A
                          </code>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/20 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4">Supported Versions</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-400">
                          <Check className="h-4 w-4 text-emerald-400" />
                          Bedrock 1.20.0 and newer
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <Check className="h-4 w-4 text-emerald-400" />
                          Windows 10/11 Edition
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <Check className="h-4 w-4 text-emerald-400" />
                          Mobile/Pocket Edition
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <Check className="h-4 w-4 text-emerald-400" />
                          Console Editions
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-black/20 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-white mb-4">Feature Compatibility</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-gray-400">
                          <Check className="h-4 w-4 text-emerald-400" />
                          Cross-play with Java Edition players
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <Check className="h-4 w-4 text-emerald-400" />
                          Access to all game modes
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          Some Java-specific features may have limitations
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          Custom resource packs may behave differently
                        </li>
                      </ul>
                </div>
                
                    <Alert className="border-fusion-accent bg-fusion-accent/10">
                      <AlertTitle className="flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        Need Help?
                      </AlertTitle>
                      <AlertDescription className="text-gray-400">
                        Check our documentation for detailed guides on connecting with Bedrock Edition and troubleshooting common issues.
                      </AlertDescription>
                    </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SupportedVersions;
