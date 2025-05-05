import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  Server,
  Settings,
  FileText,
  Home,
  LogOut,
  ArrowRight,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const NavLink = ({ children, to, isActive, className }: { 
  children: React.ReactNode, 
  to: string, 
  isActive: boolean,
  className?: string 
}) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
      isActive
        ? "bg-purple-500/20 text-purple-400"
        : "text-gray-300 hover:bg-purple-500/10 hover:text-purple-400",
      className
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ children, to, isActive, onClick }: { 
  children: React.ReactNode, 
  to: string, 
  isActive: boolean,
  onClick: () => void
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
      isActive
        ? "bg-purple-500/20 text-purple-400"
        : "text-gray-300 hover:bg-purple-500/10 hover:text-purple-400"
    )}
  >
    {children}
  </Link>
);

const TopNav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Server, label: 'Server', path: '/admin/server' },
    { icon: FileText, label: 'Content', path: '/admin/content' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-[#0A0C10] border-b border-white/10 z-50">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/admin" className="flex items-center gap-3">
              <img src="/src/img/fusion-logo.png" alt="Logo" className="h-8 w-8" />
              <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Admin Panel
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center flex-1 gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  isActive={isActive(item.path)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Desktop Logout */}
            <div className="hidden md:flex items-center">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-full px-3 py-1.5"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-purple-500/10"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0F1218] border-t border-white/10">
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.path}
                  to={item.path}
                  isActive={isActive(item.path)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </MobileNavLink>
              ))}
              
              {/* Mobile Logout */}
              <div className="pt-4 border-t border-white/10">
                <Button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 rounded-full flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage player accounts, permissions, and roles",
      icon: Users,
      path: "/admin/users",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Server Controls",
      description: "Monitor server status and perform maintenance tasks",
      icon: Server,
      path: "/admin/server",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Content Management",
      description: "Update announcements, rules, and server information",
      icon: FileText,
      path: "/admin/content",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Settings",
      description: "Configure server settings and administration options",
      icon: Settings,
      path: "/admin/settings",
      gradient: "from-amber-500 to-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F1218]">
      <TopNav />
      <div className="pt-16">
        <div className="p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
          {/* Welcome Hero Section */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/10 p-8 mb-8">
            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Welcome back, <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{user?.username}</span>!
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mb-6">
                Welcome to your Minecraft server administration dashboard. From here, you can manage all aspects of your server,
                monitor performance, and ensure an amazing experience for your players.
              </p>
              <Button 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                onClick={() => navigate('/admin/server')}
              >
                View Server Status
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-3xl" />
          </div>

          {/* Quick Actions Grid */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="bg-[#1A1D24] border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(action.path)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white group-hover:text-white/90">{action.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 group-hover:text-white/70">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
