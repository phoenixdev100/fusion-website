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
import DMCA from "./pages/DMCA";
import COPPA from "./pages/COPPA";
import Team from "./pages/Team";
import ApplyCategory from "./pages/apply/index";
import ApplyGuidelines from "./pages/apply/guidelines";
import ApplyForm from "./pages/apply/form";

// Protected Pages


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

                <Route path="server-info" element={<ServerInfo />} />
                <Route path="store" element={<Store />} />
                <Route path="leaderboard" element={<LeaderBoard />} />
                <Route path="rules" element={<Rules />} />
                <Route path="community" element={<Community />} />
                <Route path="team" element={<Team />} />
                <Route path="support" element={<Support />} />
                <Route path="apply" element={<ApplyCategory />} />
                <Route path="apply/guidelines" element={<ApplyGuidelines />} />
                <Route path="apply/form" element={<ApplyForm />} />
                <Route path="vote" element={<Vote />} />
                <Route path="required-mods" element={<RequiredMods />} />
                <Route path="versions" element={<SupportedVersions />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="dmca" element={<DMCA />} />
                <Route path="coppa" element={<COPPA />} />
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