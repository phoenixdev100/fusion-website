import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Public Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ServerInfo from "./pages/ServerInfo";
import Store from "./pages/Store";
import LeaderBoard from "./pages/LeaderBoard";
import Rules from "./pages/Rules";
import Community from "./pages/Community";
import Support from "./pages/Support";
import Vote from "./pages/Vote";
import RequiredMods from "./pages/RequiredMods";
import SupportedVersions from "./pages/SupportedVersions";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Team from "./pages/Team";

// Protected Pages
import UserDashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/Profile";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Content from "./pages/admin/Content";
import Server from "./pages/admin/Server";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <Router>
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes with MainLayout */}
              <Route element={<MainLayout><Outlet /></MainLayout>}>
                <Route index element={<Index />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="server-info" element={<ServerInfo />} />
                <Route path="store" element={<Store />} />
                <Route path="leaderboard" element={<LeaderBoard />} />
                <Route path="rules" element={<Rules />} />
                <Route path="community" element={<Community />} />
                <Route path="team" element={<Team />} />
                <Route path="support" element={<Support />} />
                <Route path="vote" element={<Vote />} />
                <Route path="required-mods" element={<RequiredMods />} />
                <Route path="versions" element={<SupportedVersions />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="admin/login" element={<AdminLogin />} />
              </Route>

              {/* Protected User Routes */}
              <Route path="user" element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>

              {/* Protected Admin Routes */}
              <Route path="admin" element={<ProtectedRoute requireAdmin><Outlet /></ProtectedRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="content" element={<Content />} />
                <Route path="server" element={<Server />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  </Router>
);

export default App;
