
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "./providers/Web3Provider";
import Index from "./pages/Index";
import Proposals from "./pages/Proposals";
import ProposalDetail from "./pages/ProposalDetail";
import CreateAgent from "./pages/CreateAgent";
import MyAgents from "./pages/MyAgents";
import AgentDetail from "./pages/AgentDetail";
import EditAgent from "./pages/EditAgent";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Web3Provider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/proposals" element={<Proposals />} />
            <Route path="/proposals/:id" element={<ProposalDetail />} />
            <Route path="/agents" element={<MyAgents />} />
            <Route path="/agents/:id" element={<AgentDetail />} />
            <Route path="/agents/:id/edit" element={<EditAgent />} />
            <Route path="/create-agent" element={<CreateAgent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Web3Provider>
);

export default App;
