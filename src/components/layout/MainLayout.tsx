import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  MenuIcon,
  X,
  Globe,
  ServerCrash,
  ShoppingCart,
  Shield,
  Trophy,
  BookOpen,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  LogIn,
  UserPlus,
  Users,
  UserCircle,
  LogOut
} from 'lucide-react';
import { FaDiscord, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#121212] text-white bg-[url('/img/minecraft_bg_dark.jpg')] bg-fixed bg-cover">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"></div>
      
      <header className="sticky top-0 z-50 w-full">
        <div className="w-full bg-[#0F1218] rounded-b-2xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/" className="flex items-center gap-2 sm:gap-3 font-semibold group">
                <img 
                  src="/img/fusion-logo.png" 
                  alt="Fusion Network" 
                  className="h-8 sm:h-10 w-auto transform transition-transform duration-200 group-hover:scale-105"
                />
                <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                  FUSION NETWORK
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center justify-center flex-1 gap-2 sm:gap-4">
              <NavLink to="/" isActive={isActive('/')}>
                <Globe className="h-4 w-4" />
                <span>Home</span>
              </NavLink>
              <NavLink to="/server-info" isActive={isActive('/server-info')}>
                <ServerCrash className="h-4 w-4" />
                <span>Server</span>
              </NavLink>
              <NavLink to="/store" isActive={isActive('/store')}>
                <ShoppingCart className="h-4 w-4" />
                <span>Store</span>
              </NavLink>
              <NavLink to="/vote" isActive={isActive('/vote')}>
                <Shield className="h-4 w-4" />
                <span>Vote</span>
              </NavLink>
              
              {/* Dropdown Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full hover:bg-purple-500/10 transition-all duration-200"
                >
                  <span>More</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isDropdownOpen && "transform rotate-180"
                  )} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#1A1D24] border border-white/10 shadow-lg py-1 z-50">
                    <NavLink to="/leaderboard" isActive={isActive('/leaderboard')} className="px-4 py-2">
                      <Trophy className="h-4 w-4" />
                      <span>Leaderboard</span>
                    </NavLink>
                    <NavLink to="/rules" isActive={isActive('/rules')} className="px-4 py-2">
                      <BookOpen className="h-4 w-4" />
                      <span>Rules</span>
                    </NavLink>
                    <NavLink to="/community" isActive={isActive('/community')} className="px-4 py-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Community</span>
                    </NavLink>
                    <NavLink to="/team" isActive={isActive('/team')} className="px-4 py-2">
                      <Users className="h-4 w-4" />
                      <span>Our Team</span>
                    </NavLink>
                    <NavLink to="/support" isActive={isActive('/support')} className="px-4 py-2">
                      <HelpCircle className="h-4 w-4" />
                      <span>Support</span>
                    </NavLink>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Auth/Profile Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Link to="/apply">
                <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-3 py-1.5 transition-colors duration-200">
                  Apply Now
                </Button>
              </Link>
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
              <MobileNavLink to="/" isActive={isActive('/')} onClick={() => setIsMenuOpen(false)}>
                <Globe className="h-4 w-4" />
                <span>Home</span>
              </MobileNavLink>
              <MobileNavLink to="/server-info" isActive={isActive('/server-info')} onClick={() => setIsMenuOpen(false)}>
                <ServerCrash className="h-4 w-4" />
                <span>Server</span>
              </MobileNavLink>
              <MobileNavLink to="/store" isActive={isActive('/store')} onClick={() => setIsMenuOpen(false)}>
                <ShoppingCart className="h-4 w-4" />
                <span>Store</span>
              </MobileNavLink>
              <MobileNavLink to="/vote" isActive={isActive('/vote')} onClick={() => setIsMenuOpen(false)}>
                <Shield className="h-4 w-4" />
                <span>Vote</span>
              </MobileNavLink>
              <MobileNavLink to="/leaderboard" isActive={isActive('/leaderboard')} onClick={() => setIsMenuOpen(false)}>
                <Trophy className="h-4 w-4" />
                <span>Leaderboard</span>
              </MobileNavLink>
              <MobileNavLink to="/rules" isActive={isActive('/rules')} onClick={() => setIsMenuOpen(false)}>
                <BookOpen className="h-4 w-4" />
                <span>Rules</span>
              </MobileNavLink>
              <MobileNavLink to="/community" isActive={isActive('/community')} onClick={() => setIsMenuOpen(false)}>
                <MessageSquare className="h-4 w-4" />
                <span>Community</span>
              </MobileNavLink>
              <MobileNavLink to="/team" isActive={isActive('/team')} onClick={() => setIsMenuOpen(false)}>
                <Users className="h-4 w-4" />
                <span>Our Team</span>
              </MobileNavLink>
              <MobileNavLink to="/support" isActive={isActive('/support')} onClick={() => setIsMenuOpen(false)}>
                <HelpCircle className="h-4 w-4" />
                <span>Support</span>
              </MobileNavLink>
              
              {/* Mobile Auth/Profile Buttons */}
              <div className="pt-4 space-y-2 border-t border-white/10">
                <Link to="/apply" onClick={() => setIsMenuOpen(false)} className="block">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-full">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className={cn("flex-1 relative z-10", className)}>
        {children}
      </main>

      <footer className="relative z-10 bg-[#0F1218] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <img src="/img/fusion-logo.png" alt="Fusion Network" className="h-8 w-auto" />
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                  FUSION NETWORK
                </span>
              </Link>
              <p className="text-gray-400 text-sm">
                Join our Minecraft community and experience the best gameplay with your friends.
              </p>
              <div className="flex gap-4">
                <SocialButton href="https://discord.com/invite/wk6yJGHkKP">
                  <FaDiscord className="h-6 w-6 text-[#5865F2] hover:text-[#7289DA]" />
                </SocialButton>
                <SocialButton href="https://www.instagram.com/fusionnetworkofficial/">
                  <FaInstagram className="h-6 w-6 text-[#E4405F] hover:text-[#E8647B]" />
                </SocialButton>
                <SocialButton href="https://www.youtube.com/@FusionNetworkMC">
                  <FaYoutube className="h-6 w-6 text-[#FF0000] hover:text-[#FF4444]" />
                </SocialButton>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <FooterLink to="/server-info">Server Info</FooterLink>
                <FooterLink to="/store">Store</FooterLink>
                <FooterLink to="/vote">Vote</FooterLink>
                <FooterLink to="/leaderboard">Leaderboard</FooterLink>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold">Community</h3>
              <div className="space-y-2">
                <FooterLink to="/rules">Rules</FooterLink>
                <FooterLink to="/community">Community</FooterLink>
                <FooterLink to="/team">Our Team</FooterLink>
                <FooterLink to="/support">Support</FooterLink>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold">Legal</h3>
              <div className="space-y-2">
                <FooterLink to="/terms">Terms of Service</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Fusion Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

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

const SocialButton = ({ children, href }: { children: React.ReactNode, href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
  >
    {children}
  </a>
);

const FooterLink = ({ children, to }: { children: React.ReactNode, to: string }) => (
  <Link
    to={to}
    className="text-gray-400 hover:text-purple-400 transition-colors block"
  >
    {children}
  </Link>
);
