import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Store = () => {

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
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
          Server Store
        </motion.h1>

        {/* PvP Practice Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
            Practice PvP Ranks
          </h2>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <StoreItem
              title="VIP Rank"
              description="Entry-level rank for Practice PvP."
              price={4.00}
              benefits={["Exclusive chat prefix", "Access to VIP queue", "/nick command"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-1', '_blank', 'noopener,noreferrer')}
              color="from-blue-500 to-indigo-500"
            />
            <StoreItem
              title="VIP+ Rank"
              description="Enhanced perks for dedicated PvP players."
              price={8.00}
              benefits={["All VIP perks", "VIP+ chat badge", "Priority support"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-1', '_blank', 'noopener,noreferrer')}
              color="from-indigo-500 to-purple-500"
            />
            <StoreItem
              title="Elite Rank"
              description="Elite status with more features."
              price={14.00}
              benefits={["All VIP+ perks", "Elite chat color", "Special cosmetics"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-1', '_blank', 'noopener,noreferrer')}
              color="from-purple-500 to-pink-500"
            />
            <StoreItem
              title="MVP+ Rank"
              description="Top-tier Practice PvP rank."
              price={25.00}
              benefits={["All Elite perks", "MVP+ exclusive kit", "Lobby effects"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-1', '_blank', 'noopener,noreferrer')}
              color="from-pink-500 to-yellow-500"
            />
            <StoreItem
              title="Fusion Rank"
              description="Ultimate rank for Practice PvP."
              price={90.00}
              benefits={["All MVP+ perks", "Fusion chat tag", "Unique cosmetics"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-1', '_blank', 'noopener,noreferrer')}
              color="from-yellow-500 to-emerald-500"
            />
          </motion.div>
        </motion.div>

        {/* Lifesteal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500">
            Lifesteal Ranks
          </h2>
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <StoreItem
              title="Soul Rank"
              description="Entry-level rank for Lifesteal."
              price={4.99}
              benefits={["Soul chat prefix", "Basic perks", "Soul kit"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-2', '_blank', 'noopener,noreferrer')}
              color="from-red-500 to-pink-500"
            />
            <StoreItem
              title="Knight Rank"
              description="Knight rank with extra perks."
              price={8.99}
              benefits={["All Soul perks", "Knight chat badge", "Knight kit"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-2', '_blank', 'noopener,noreferrer')}
              color="from-pink-500 to-yellow-500"
            />
            <StoreItem
              title="Sentinel Rank"
              description="Sentinel rank with advanced features."
              price={11.99}
              benefits={["All Knight perks", "Sentinel chat color", "Sentinel kit"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-2', '_blank', 'noopener,noreferrer')}
              color="from-yellow-500 to-orange-500"
            />
            <StoreItem
              title="Master Rank"
              description="Master rank for experienced players."
              price={16.99}
              benefits={["All Sentinel perks", "Master chat tag", "Master kit"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-2', '_blank', 'noopener,noreferrer')}
              color="from-orange-500 to-emerald-500"
            />
            <StoreItem
              title="Mercenery Rank"
              description="Mercenery rank with premium perks."
              price={24.99}
              benefits={["All Master perks", "Mercenery chat badge", "Mercenery kit"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-2', '_blank', 'noopener,noreferrer')}
              color="from-emerald-500 to-blue-500"
            />
            <StoreItem
              title="Fusion Rank"
              description="Ultimate rank for Lifesteal."
              price={90}
              benefits={["All Mercenery perks", "Fusion chat tag", "Fusion kit"]}
              onPurchase={() => window.open('https://fusion-network.tebex.io/category/ranks-2', '_blank', 'noopener,noreferrer')}
              color="from-blue-500 to-purple-500"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300 text-lg">All purchases support the server and help us provide a better experience</p>
          <p className="text-gray-400 text-sm mt-2">Prices in USD. No refunds available.</p>
        </motion.div>
      </div>
    </div>
  );
};

interface StoreItemProps {
  title: string;
  description: string;
  price: number;
  benefits: string[];
  onPurchase: () => void;
  color: string;
}

const StoreItem = ({ title, description, price, benefits, onPurchase, color }: StoreItemProps) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={item}>
      <Card className="relative overflow-hidden rounded-xl backdrop-blur-sm bg-gray-900/50 border-0 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
        
        <CardHeader className="relative">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            {title}
          </CardTitle>
          <CardDescription className="text-gray-300">{description}</CardDescription>
        </CardHeader>
        
        <CardContent className="relative">
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 text-gray-200"
              >
                <span className="text-green-400 text-lg">✦</span>
                {benefit}
              </motion.li>
            ))}
          </ul>
        </CardContent>
        
        <CardFooter className="relative flex flex-col gap-4">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            ${price}
          </p>
          <Button 
            onClick={onPurchase} 
            className={`w-full bg-gradient-to-r ${color} hover:scale-105 transition-all duration-300 text-white font-semibold py-6 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/30 relative overflow-hidden group`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span className="text-lg">Purchase</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
            <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default Store;
