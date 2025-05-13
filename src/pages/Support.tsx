import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  HeadphonesIcon, 
  HelpCircleIcon, 
  BookIcon, 
  MessageSquareIcon, 
  ShieldIcon,
  UserIcon,
  ServerIcon,
  ShoppingBagIcon,
  HeartIcon,
  ExternalLink
} from 'lucide-react';


interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How do I join the server?",
    answer: "You can join our server by adding the IP address to your Minecraft client. The IP is: fusion-network.xyz"
  },
  {
    question: "What are the server rules?",
    answer: "Our server rules can be found in the #rules channel on our Discord server. Please make sure to read them before playing."
  },
  {
    question: "How do I report a player?",
    answer: "You can report a player by using the /report command in-game or by submitting a ticket on our Discord server."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including PayPal, credit cards, and cryptocurrency. All transactions are secure and encrypted."
  },
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking the 'Forgot Password' link on the login page or by contacting our support team."
  },
  {
    question: "What are the server requirements?",
    answer: "Our server requires Minecraft Java Edition 1.9 or higher. We recommend at least 4GB of RAM for optimal performance."
  },
  {
    question: "How do I claim my rank?",
    answer: "After purchasing a rank, you can claim it by using the /claimrank command in-game or by contacting our support team."
  },
  {
    question: "What is the server's uptime?",
    answer: "Our server maintains 99.9% uptime. Any scheduled maintenance will be announced in advance on our Discord server."
  },
  {
    question: "How do I appeal a ban?",
    answer: "You can appeal a ban by submitting a ticket on our Discord server. Please include your username, ban id, and the reason for your appeal."
  },
  {
    question: "How do I contact support?",
    answer: "You can contact our support team through Discord, email, or by submitting a support query on our website."
  }
];

const Support = () => {

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
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-purple-900/20 to-black">
      <div className="container py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            Welcome to Support
          </Badge>
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500">
            Support Center
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Get help with any issues you encounter on Fusion Network. Our support team is here to help!
          </p>
        </motion.div>

        {/* Support Options */}
        <motion.section 
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div variants={item}>
              <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                <CardHeader className="text-center">
                  <div className="p-3 rounded-full bg-emerald-500/20 group-hover:scale-110 transition-transform duration-300 mx-auto mb-4">
                    <HeadphonesIcon className="w-8 h-8 text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-emerald-200 transition-colors duration-500">Live Support</CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-white/90 transition-colors duration-500">Talk to our support team directly</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-400 mb-6">Available 10AM - 6PM IST every day</p>
                  <a href="https://discord.gg/wk6yJGHkKP" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:opacity-90 transform hover:scale-105 transition-all duration-300">
                      Join Discord Support
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                <CardHeader className="text-center">
                  <div className="p-3 rounded-full bg-purple-500/20 group-hover:scale-110 transition-transform duration-300 mx-auto mb-4">
                    <HelpCircleIcon className="w-8 h-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-purple-200 transition-colors duration-500">Knowledge Base</CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-white/90 transition-colors duration-500">Find answers to common questions</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-400 mb-6">Browse our extensive FAQ and guides</p>
                  <a href="https://docs.fusion-network.xyz" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:opacity-90 transform hover:scale-105 transition-all duration-300">
                      Browse Docs
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                <CardHeader className="text-center">
                  <div className="p-3 rounded-full bg-pink-500/20 group-hover:scale-110 transition-transform duration-300 mx-auto mb-4">
                    <BookIcon className="w-8 h-8 text-pink-400" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-pink-200 transition-colors duration-500">Submit a Ticket</CardTitle>
                  <CardDescription className="text-gray-400 group-hover:text-white/90 transition-colors duration-500">Get personalized support</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-400 mb-6">Response within 24 hours guaranteed</p>
                  <a href="https://discord.gg/wk6yJGHkKP" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transform hover:scale-105 transition-all duration-300">
                      Create Ticket
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-16"
        >
          <motion.div 
            variants={item}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">Frequently Asked Questions</h2>
            <p className="text-gray-400 mt-2">Find quick answers to common questions</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={item}>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.slice(0, 5).map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border-b border-gray-700/50 backdrop-blur-sm bg-black/20 rounded-lg mb-2 overflow-hidden"
                  >
                    <AccordionTrigger className="hover:text-emerald-400 text-left hover:no-underline px-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 px-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
            <motion.div variants={item}>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.slice(5, 10).map((item, index) => (
                  <AccordionItem 
                    key={index + 5} 
                    value={`item-${index + 5}`} 
                    className="border-b border-gray-700/50 backdrop-blur-sm bg-black/20 rounded-lg mb-2 overflow-hidden"
                  >
                    <AccordionTrigger className="hover:text-emerald-400 text-left hover:no-underline px-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 px-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>

          <motion.div 
            variants={item}
            className="text-center mt-8"
          >
            <Button variant="outline" className="border-emerald-500/50 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
              View All FAQs
            </Button>
          </motion.div>
        </motion.section>

        {/* Categories */}
        <motion.section 
          variants={container}
          initial="hidden"
          animate="show"
          className="mb-16"
        >
          <motion.div 
            variants={item}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">Support Categories</h2>
            <p className="text-gray-400 mt-2">Browse support by category</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: UserIcon, label: "Account Issues" },
              { icon: ServerIcon, label: "Connection Problems" },
              { icon: ShoppingBagIcon, label: "Store & Purchases" },
              { icon: ShieldIcon, label: "Report a Player" },
              { icon: HeartIcon, label: "Donation Support" }
            ].map((category, index) => (
              <motion.div key={index} variants={item}>
                <Button 
                  variant="outline" 
                  className="group flex flex-col h-32 w-full border-gray-700/50 backdrop-blur-sm bg-black/20 hover:border-purple-500/50 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
                >
                  <category.icon className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <span>{category.label}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 border-0 rounded-xl transform transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                    <MessageSquareIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-blue-200 transition-colors duration-500">Get in Touch</CardTitle>
                </div>
                <CardDescription className="text-gray-400 group-hover:text-white/90 transition-colors duration-500">
                  Can't find what you need? Send us a message and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action="https://formsubmit.co/support@fusion-network.xyz" method="POST" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="support@fusion-network.xyz"
                        required
                        className="bg-black/20 border-gray-700/50 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-md w-full p-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                      <input
                        id="subject"
                        name="subject"
                        placeholder="What is your issue about?"
                        required
                        className="bg-black/20 border-gray-700/50 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-md w-full p-2"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-300">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your issue in detail..."
                      required
                      className="w-full min-h-[150px] rounded-md p-3 bg-black/20 border border-gray-700/50 focus:border-blue-500/50 focus:ring-blue-500/20 focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transform hover:scale-105 transition-all duration-300"
                    >
                      Submit Ticket
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
};

export default Support;
