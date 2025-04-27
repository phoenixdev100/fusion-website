import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/Dashboard";
import UserProfile from "./pages/user/Profile";
import ServerInfo from "./pages/ServerInfo";
import Store from "./pages/Store";
import LeaderBoard from "./pages/LeaderBoard";
import Rules from "./pages/Rules";
import Community from "./pages/Community";
import Support from "./pages/Support";
import Vote from "./pages/Vote";
import RequiredMods from "./pages/RequiredMods";
import SupportedVersions from "./pages/SupportedVersions";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Content from "./pages/admin/Content";
import Server from "./pages/admin/Server";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <Router>
      <ThemeProvider defaultTheme="dark" attribute="class">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<MainLayout><Outlet /></MainLayout>}>
                <Route index element={<Index />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="user/dashboard" element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
                <Route path="user/profile" element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } />
                <Route path="server-info" element={<ServerInfo />} />
                <Route path="store" element={<Store />} />
                <Route path="leaderboard" element={<LeaderBoard />} />
                <Route path="rules" element={<Rules />} />
                <Route path="community" element={<Community />} />
                <Route path="support" element={<Support />} />
                <Route path="vote" element={<Vote />} />
                <Route path="required-mods" element={<RequiredMods />} />
                <Route path="versions" element={<SupportedVersions />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="admin/login" element={<AdminLogin />} />
                <Route path="admin" element={
                  <ProtectedRoute requireAdmin>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="admin/users" element={
                  <ProtectedRoute requireAdmin>
                    <Users />
                  </ProtectedRoute>
                } />
                <Route path="admin/content" element={
                  <ProtectedRoute requireAdmin>
                    <Content />
                  </ProtectedRoute>
                } />
                <Route path="admin/server" element={
                  <ProtectedRoute requireAdmin>
                    <Server />
                  </ProtectedRoute>
                } />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </Router>
  </AuthProvider>
);

export default App;
