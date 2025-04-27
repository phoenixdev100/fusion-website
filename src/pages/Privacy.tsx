import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Eye, Database, Shield, Bell } from 'lucide-react';

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your data.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Information Collection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Eye className="h-6 w-6 text-purple-400" />
                  <CardTitle>Information We Collect</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>We collect the following types of information:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Account information (username, email)</li>
                  <li>Game-related data (playtime, achievements)</li>
                  <li>Technical information (IP address, device info)</li>
                  <li>Communications with our support team</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-black/40 border-emerald-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-emerald-400" />
                  <CardTitle>How We Use Your Data</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>Your data is used for:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Providing and improving our services</li>
                  <li>Account management and security</li>
                  <li>Communication about updates and changes</li>
                  <li>Analytics and service optimization</li>
                  <li>Preventing fraud and abuse</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-black/40 border-blue-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <CardTitle>Data Protection</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>We protect your data through:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Encryption of sensitive information</li>
                  <li>Regular security audits and updates</li>
                  <li>Strict access controls and monitoring</li>
                  <li>Compliance with data protection regulations</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-black/40 border-pink-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-pink-400" />
                  <CardTitle>Your Rights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Access your personal data</li>
                  <li>Request data correction or deletion</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Lodge a complaint with authorities</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Updates to Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-black/40 border-yellow-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="h-6 w-6 text-yellow-400" />
                  <CardTitle>Updates to Privacy Policy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date.
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

export default Privacy; 