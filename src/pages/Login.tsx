import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Eye, EyeOff, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { authService } from '@/api/auth';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const userStr = localStorage.getItem('fusion_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/user/dashboard', { replace: true });
        }
      } catch {}
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };
    let isValid = true;

    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.password || formData.password.trim() === '') {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.login({
        email: formData.email.trim(),
        password: formData.password.trim()
      });
      
      if (response.success) {
        toast.success("Login successful!");
        if (response.user) {
          localStorage.setItem('fusion_user', JSON.stringify(response.user));
          // Redirect based on role
          if (response.user.role === 'admin') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/user/dashboard', { replace: true });
          }
        }
      } else {
        toast.error(response.error || "Invalid credentials");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("An error occurred while logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-md mx-auto w-full"
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
                  Welcome Back
                </span>
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Log in to your Fusion Network account
              </CardDescription>
            </CardHeader>

            <CardContent className="relative px-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
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
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`minecraft-input pl-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300 ${errors.email ? 'border-red-500' : ''}`}
                      />
                      <UserPlus className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
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
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`minecraft-input pl-10 pr-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300 ${errors.password ? 'border-red-500' : ''}`}
                      />
                      <ShieldCheck className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-end"
                >
                  <Link to="/forgot-password" className="text-sm text-emerald-400 hover:text-emerald-300 hover:underline">
                    Forgot your password?
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
                  <Button 
                    type="submit" 
                    className="relative w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-minecraft rounded-xl py-6 text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </motion.div>
              </form>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-center text-sm text-gray-400"
              >
                Don't have an account?{" "}
                <Link to="/register" className="text-emerald-400 font-bold hover:text-emerald-300 hover:underline">
                  Create Account
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Section */}
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
                  Welcome Back to Fusion Network
                </span>
              </h2>
              <p className="text-gray-400">Continue your adventure in our Minecraft community</p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  title: "Resume Your Progress",
                  description: "Jump right back into your ongoing adventures and projects",
                  color: "emerald"
                },
                {
                  title: "Connect with Friends",
                  description: "Join your friends and continue building together",
                  color: "sky"
                },
                {
                  title: "Daily Rewards Await",
                  description: "Don't forget to claim your daily rewards and bonuses",
                  color: "purple"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500`}></div>
                  <div className="relative p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
                    <h3 className="font-minecraft text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
