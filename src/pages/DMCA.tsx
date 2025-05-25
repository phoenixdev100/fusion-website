import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, FileText, Shield, Mail, Scale, Clock, HelpCircle } from 'lucide-react';

const DMCA = () => {
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
            DMCA & Copyright Policy
          </h1>
          <p className="text-xl text-gray-400 mt-4 max-w-2xl mx-auto">
            We respect intellectual property rights and are committed to complying with the Digital Millennium Copyright Act (DMCA).
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Copyright Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-purple-400" />
                  <CardTitle>Copyright Statement</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Fusion Network respects the intellectual property rights of others and expects its users to do the same. 
                  We respond to notices of alleged copyright infringement that comply with applicable law and are properly provided to us.
                </p>
                <p>
                  If you believe that your content has been copied in a way that constitutes copyright infringement, please provide us with the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf</li>
                  <li>Identification of the copyrighted work claimed to have been infringed</li>
                  <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed</li>
                  <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and email address</li>
                  <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law</li>
                  <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* How to Submit a DMCA Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-purple-400" />
                  <CardTitle>How to Submit a DMCA Notice</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  To submit a DMCA notice, please send an email to <span className="text-purple-400">support@fusion-network.xyz</span> with the subject line "DMCA Notice" and include all the required information listed above.
                </p>
                <p className="text-sm italic">
                  Please note that under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Counter-Notice Procedure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Scale className="h-6 w-6 text-purple-400" />
                  <CardTitle>Counter-Notice Procedure</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  If you believe that your content was removed by mistake or misidentification, you may submit a counter-notice to us with the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Your physical or electronic signature</li>
                  <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled</li>
                  <li>A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification</li>
                  <li>Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal court for the judicial district in which your address is located, or if your address is outside of the United States, for any judicial district in which the service provider may be found, and that you will accept service of process from the person who provided the original notification</li>
                </ul>
                <p>
                  Upon receipt of a valid counter-notice, we will forward it to the person who submitted the original DMCA notice and inform them that the removed material may be restored in 10 business days unless they notify us that they have filed a court action to restrain you from engaging in the allegedly infringing activity.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Repeat Infringers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-purple-400" />
                  <CardTitle>Repeat Infringer Policy</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  In accordance with the DMCA and other applicable laws, we have adopted a policy of terminating, in appropriate circumstances and at our sole discretion, users who are deemed to be repeat infringers. We may also at our sole discretion limit access to our service and/or terminate the accounts of any users who infringe any intellectual property rights of others, whether or not there is any repeat infringement.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Fair Use */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-black/40 border-purple-500/30">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-purple-400" />
                  <CardTitle>Fair Use and User Content</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Fusion Network respects fair use principles and encourages users to consider these principles when creating and sharing content on our platform. Fair use allows limited use of copyrighted material without permission for purposes such as criticism, comment, news reporting, teaching, scholarship, or research.
                </p>
                <p>
                  When determining if your use of copyrighted material constitutes fair use, consider:
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>The purpose and character of the use (commercial vs. non-commercial)</li>
                  <li>The nature of the copyrighted work</li>
                  <li>The amount and substantiality of the portion used</li>
                  <li>The effect of the use upon the potential market for the copyrighted work</li>
                </ul>
                <p>
                  Please note that Fusion Network cannot provide legal advice regarding fair use. If you are uncertain about whether your use of content constitutes fair use, we recommend consulting with a legal professional.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
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
                  If you have any questions about our DMCA and Copyright Policy, please contact us at:
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
            transition={{ delay: 0.8 }}
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

export default DMCA;
