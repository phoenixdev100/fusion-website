import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, FileText, Shield, Mail, Users, Clock, HelpCircle, CheckCircle2 } from 'lucide-react';

const COPPA = () => {
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
            Parental Consent & COPPA Notice
          </h1>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
            Information for parents and guardians regarding children's privacy and online safety.
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
                  <Shield className="h-6 w-6 text-purple-400" />
                  <CardTitle>Children's Online Privacy Protection</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Fusion Network is committed to protecting the privacy of children who use our services. This COPPA Notice explains our practices regarding the collection, use, and disclosure of personal information from children under the age of 13, in accordance with the Children's Online Privacy Protection Act (COPPA).
                </p>
                <p>
                  We recognize the importance of maintaining the privacy of children and encourage parents and guardians to take an active role in their children's online activities and interests.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Information We Collect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-purple-400" />
                  <CardTitle>Information We Collect from Children</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Fusion Network may collect certain personal information from children under 13 only with verifiable parental consent. The information we may collect includes:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Username (we encourage non-identifying usernames)</li>
                  <li>In-game activity and statistics</li>
                  <li>Chat messages within our moderated environment</li>
                </ul>
                <p>
                  We do not condition a child's participation in any activity on our server on the disclosure of more personal information than is reasonably necessary to participate in the activity.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Parental Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-purple-400" />
                  <CardTitle>Parental Rights and Responsibilities</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  As a parent or legal guardian, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Review the personal information we have collected from your child</li>
                  <li>Request that we delete any personal information we have collected from your child</li>
                  <li>Refuse to allow any further collection or use of your child's information</li>
                  <li>Agree to the collection and use of your child's information without consenting to the disclosure of the information to third parties</li>
                </ul>
                <p>
                  To exercise these rights or if you have any questions about our children's privacy practices, please contact us at <span className="text-purple-400">support@fusion-network.xyz</span>.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Parental Consent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-purple-400" />
                  <CardTitle>Obtaining Parental Consent</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Before collecting, using, or disclosing personal information from children under 13, we require verifiable parental consent. We may obtain parental consent through:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>A signed consent form returned to us via email or physical mail</li>
                  <li>A credit card, debit card, or other online payment system that provides notification of each transaction to the account holder</li>
                  <li>Connecting to trained personnel via video conference</li>
                  <li>Verifying government-issued ID against databases of such information</li>
                </ul>
                <p>
                  To provide consent for your child to use our services, please contact us at <span className="text-purple-400">support@fusion-network.xyz</span> with the subject line "Parental Consent Request."
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Safety Measures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-purple-400" />
                  <CardTitle>Safety Measures and Moderation</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Fusion Network implements the following safety measures to protect children on our platform:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>24/7 moderation of chat and gameplay</li>
                  <li>Automatic filtering of inappropriate language and content</li>
                  <li>Strict enforcement of community guidelines</li>
                  <li>Limited collection of personal information</li>
                  <li>Regular staff training on child safety practices</li>
                </ul>
                <p>
                  We encourage parents to discuss online safety with their children and to monitor their online activities.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Third-Party Disclosure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-purple-400" />
                  <CardTitle>Third-Party Disclosure</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  We may share information collected from children with third-party service providers only when necessary to:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Maintain the functionality and security of our services</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <p>
                  These third parties are contractually obligated to maintain the confidentiality and security of the information and are prohibited from using the information for any purpose other than providing the requested services.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-purple-400" />
                  <CardTitle>Contact Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  If you have any questions about our children's privacy practices or would like to exercise your parental rights, please contact us at:
                </p>
                <div className="bg-black/30 p-4 rounded-lg">
                  <p>Email: <span className="text-purple-400">support@fusion-network.xyz</span></p>
                  <p>Discord: <span className="text-purple-400">https://discord.com/invite/wk6yJGHkKP</span></p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-center text-gray-400 text-sm pt-8"
          >
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last Updated: May 25, 2025</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default COPPA;
