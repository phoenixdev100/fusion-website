import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Loader2, CheckCircle2, AlertCircle, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validations, setValidations] = useState({
    username: { isValid: true, message: '' },
    email: { isValid: true, message: '' },
    password: { isValid: true, message: '' },
    confirmPassword: { isValid: true, message: '' }
  });
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateField = (field: string, value: string) => {
    let isValid = true;
    let message = '';

    switch (field) {
      case 'username':
        if (value.length < 3) {
          isValid = false;
          message = 'Username must be at least 3 characters';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          message = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (value.length < 8) {
          isValid = false;
          message = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(value)) {
          isValid = false;
          message = 'Password must contain at least one uppercase letter';
        } else if (!/[0-9]/.test(value)) {
          isValid = false;
          message = 'Password must contain at least one number';
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          isValid = false;
          message = 'Passwords do not match';
        }
        break;
    }

    setValidations(prev => ({
      ...prev,
      [field]: { isValid, message }
    }));

    return isValid;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateForm = () => {
    const fields = ['username', 'email', 'password', 'confirmPassword'];
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field, formData[field as keyof typeof formData])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please check all fields and try again',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(
        formData.username.trim(),
        formData.email.trim(),
        formData.password
      );

      if (success) {
        toast({
          title: 'Success',
          description: 'Account created successfully! Redirecting to dashboard...',
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'An error occurred during registration';
      
      // Handle specific error cases
      if (error.response?.status === 400 && error.response?.data?.message?.includes('exists')) {
        toast({
          title: 'Registration Failed',
          description: 'An account with this email already exists',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Registration Failed',
          description: errorMessage,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
                  Join Fusion Network
                </span>
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Create your gaming account today
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
                  <Label htmlFor="username" className="text-gray-200 font-medium ml-1">Username</Label>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative">
                      <Input
                        id="username"
                        type="text"
                        placeholder="Choose your username"
                        value={formData.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        className={`minecraft-input pl-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300 ${
                          !validations.username.isValid ? 'border-red-500' : ''
                        }`}
                      />
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                    </div>
                    {!validations.username.isValid && (
                      <p className="text-red-500 text-sm mt-1">{validations.username.message}</p>
                    )}
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
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`minecraft-input pl-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300 ${
                          !validations.email.isValid ? 'border-red-500' : ''
                        }`}
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                    </div>
                    {!validations.email.isValid && (
                      <p className="text-red-500 text-sm mt-1">{validations.email.message}</p>
                    )}
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
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`minecraft-input pl-10 pr-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300 ${
                          !validations.password.isValid ? 'border-red-500' : ''
                        }`}
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {!validations.password.isValid && (
                      <p className="text-red-500 text-sm mt-1">{validations.password.message}</p>
                    )}
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
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`minecraft-input pl-10 pr-10 rounded-xl bg-black/50 border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/30 transition-all duration-300 ${
                          !validations.confirmPassword.isValid ? 'border-red-500' : ''
                        }`}
                      />
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-emerald-400" />
                    </div>
                    {!validations.confirmPassword.isValid && (
                      <p className="text-red-500 text-sm mt-1">{validations.confirmPassword.message}</p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-medium py-2 px-4 rounded-xl hover:from-emerald-600 hover:to-sky-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Creating Account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>

            <CardFooter className="relative">
              <div className="w-full text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors font-medium"
                >
                  Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Right side content - can be added later if needed */}
        <div className="hidden lg:block">
          {/* Add Minecraft-themed illustration or content here */}
        </div>
      </div>
    </div>
  );
};

export default Register;
