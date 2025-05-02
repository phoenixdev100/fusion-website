import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Sword, ShieldCheck, Gem, Pickaxe, UserPlus, ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '@/api/auth';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Validate form
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required");
      setIsLoading(false);
      return;
    }

    if (!formData.terms) {
      toast.error("Please accept the terms and conditions");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      
      if (response.success) {
        // Automatically log the user in after registration
        const loginResponse = await authService.login({
          email: formData.email,
          password: formData.password
        });
        if (loginResponse.success && loginResponse.user) {
          localStorage.setItem('fusion_user', JSON.stringify(loginResponse.user));
          toast.success('Account created and logged in!');
          if (loginResponse.user.role === 'admin') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/user/dashboard', { replace: true });
          }
        } else {
          toast.success('Account created successfully! Please log in.');
          navigate('/login');
        }
      } else {
        toast.error(response.error || "Failed to create account");
      }
    } catch (error) {
      toast.error("An error occurred while creating your account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="min-h-screen py-8 md:py-12 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/img/minecraft-panorama.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background"></div>
                </div>
                
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
                scale: [null, Math.random() * 0.5 + 0.5]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
                </div>
                
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
              
              <Card className="relative bg-black/40 backdrop-blur-sm border-2 border-white/10 rounded-[2rem] shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500 overflow-hidden">
                {/* Animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-purple-500/10 animate-gradient-xy"></div>
                
                <CardHeader className="text-center space-y-2 relative">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-md opacity-50"></div>
                    <div className="relative bg-black/50 p-3 rounded-full">
                      <Gamepad2 className="h-12 w-12 text-emerald-400" />
                    </div>
                  </motion.div>
                  <CardTitle className="text-4xl font-bold mt-4">
                    <span className="bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 text-transparent bg-clip-text">
                      Join Fusion Network
                    </span>
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Create your account to join our Minecraft community
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="username" className="text-gray-200 font-medium ml-1">Minecraft Username</Label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative">
                          <Input 
                            id="username"
                            name="username"
                            placeholder="Your in-game name"
                            value={formData.username}
                            onChange={handleChange}
                            required 
                            className="minecraft-input pl-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300"
                          />
                          <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="text-gray-200 font-medium ml-1">Email</Label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative">
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                            className="minecraft-input pl-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300"
                          />
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="password" className="text-gray-200 font-medium ml-1">Password</Label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative">
                          <Input 
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a secure password"
                            value={formData.password}
                            onChange={handleChange}
                            required 
                            className="minecraft-input pl-10 pr-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300"
                          />
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-emerald-400"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="confirmPassword" className="text-gray-200 font-medium ml-1">Confirm Password</Label>
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                        <div className="relative">
                          <Input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                            className="minecraft-input pl-10 pr-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300"
                          />
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-emerald-400"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox 
                        id="terms" 
                        name="terms"
                        checked={formData.terms}
                        onCheckedChange={(checked) => 
                          setFormData(prev => ({ ...prev, terms: checked === true }))
                        }
                        required 
                        className="border-emerald-400 data-[state=checked]:bg-emerald-400 rounded-md"
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-300">
                    I agree to the{" "}
                        <Link to="/rules" className="text-emerald-400 hover:text-emerald-300 hover:underline">
                      server rules
                    </Link>{" "}
                    and{" "}
                        <Link to="#" className="text-emerald-400 hover:text-emerald-300 hover:underline">
                      terms of service
                    </Link>
                  </Label>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="relative group"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                      <Button 
                        type="submit" 
                        className="relative w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-minecraft rounded-xl py-6 text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        disabled={isLoading}
                      >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                    </motion.div>
              </form>
              
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-6 text-center text-sm text-gray-400"
                  >
                    Already have an account?{" "}
                    <Link to="/login" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline">
                      Log in
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:block"
            >
              <div className="space-y-6">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-minecraft mb-2">
                    <span className="bg-gradient-to-r from-emerald-400 to-sky-400 text-transparent bg-clip-text">
                      Account Benefits
                    </span>
                  </h2>
                  <p className="text-gray-400">Join our community and unlock exclusive features</p>
                </div>
                
                <div className="grid gap-4">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Premium Support",
                      description: "Get priority support from our staff team",
                      color: "emerald"
                    },
                    {
                      icon: Gem,
                      title: "Daily Rewards",
                      description: "Claim daily rewards and special items",
                      color: "sky"
                    },
                    {
                      icon: Sword,
                      title: "Special Kits",
                      description: "Access exclusive kits and perks",
                      color: "purple"
                    },
                    {
                      icon: Pickaxe,
                      title: "Land Claims",
                      description: "Protect your builds with land claims",
                      color: "yellow"
                    }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="group relative"
                    >
                      <div className={`absolute -inset-0.5 bg-gradient-to-r from-${benefit.color}-500 to-${benefit.color}-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500`}></div>
                      <div className="relative p-4 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-xl bg-${benefit.color}-400/10 group-hover:bg-${benefit.color}-400/20 transition-colors duration-300`}>
                            <benefit.icon className={`h-6 w-6 text-${benefit.color}-400`} />
                  </div>
                          <div>
                            <h3 className="font-minecraft text-white mb-1">{benefit.title}</h3>
                            <p className="text-sm text-gray-400">{benefit.description}</p>
                  </div>
                  </div>
                  </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
