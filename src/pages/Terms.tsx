import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, Shield, UserCheck, FileCheck, AlertCircle } from 'lucide-react';

const Terms = () => {
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
            Terms of Service
          </h1>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <ScrollText className="h-6 w-6 text-purple-400" />
                  <CardTitle>Introduction</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Welcome to Fusion Network. By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-black/40 border-emerald-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <UserCheck className="h-6 w-6 text-emerald-400" />
                  <CardTitle>Account Terms</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>You must be at least 13 years old to use our services</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>You must provide accurate and complete information when creating an account</li>
                  <li>You may not use our services for any illegal purposes</li>
                  <li>We reserve the right to suspend or terminate accounts at our discretion</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Service Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-black/40 border-blue-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <CardTitle>Service Rules</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Follow our server rules and community guidelines</li>
                  <li>Do not attempt to gain unauthorized access to our services</li>
                  <li>Do not use cheats, hacks, or exploits</li>
                  <li>Respect other players and staff members</li>
                  <li>Do not engage in any form of harassment or bullying</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Purchases and Refunds */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-black/40 border-pink-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileCheck className="h-6 w-6 text-pink-400" />
                  <CardTitle>Purchases and Refunds</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>All purchases are final and non-refundable</li>
                  <li>Virtual items and ranks have no real-world value</li>
                  <li>We reserve the right to modify or remove virtual items</li>
                  <li>Purchases are for personal use only and may not be transferred</li>
                  <li>Chargebacks will result in account suspension</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-black/40 border-yellow-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-yellow-400" />
                  <CardTitle>Disclaimer</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Our services are provided "as is" without any warranties, expressed or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-gray-400 pt-8 border-t border-gray-800"
          >
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Terms; 