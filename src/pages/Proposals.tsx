import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import Navbar from "../components/Navbar";
import ProposalCard from "../components/ProposalCard";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTRACTS } from "../config/contracts";
import { toast } from "sonner";

const statusColors = {
  active: "bg-primary/20 text-primary border-primary/30",
  passed: "bg-green-900/20 text-green-400 border-green-500/30",
  failed: "bg-red-900/20 text-red-400 border-red-500/30",
  pending: "bg-gray-800/40 text-gray-400 border-gray-600/30",
};

const Proposals = () => {
  const [proposalCount, setProposalCount] = useState<number>(0);
  const [proposals, setProposals] = useState<{ id: number }[]>([]);

  // Read the proposal count from the AgentBravoGovernor contract
  const { data: countData, isLoading: countLoading, error: countError } = useReadContract({
    address: CONTRACTS.AgentBravoGovernor.address,
    abi: CONTRACTS.AgentBravoGovernor.abi,
    functionName: "proposalCount",
    args: [],
  });

  useEffect(() => {
    if (countData) { 
      console.log("Proposal count:", countData);
      setProposalCount(Number(countData.toString()));
    }
  }, [countData]);

  // Once we know the proposal count, generate an array of proposal IDs.
  useEffect(() => {
    if (proposalCount > 0) {
      // Create array in reverse order so newest proposals (highest IDs) appear first
      const proposalsArr = Array.from({ length: proposalCount }, (_, i) => ({ 
        id: proposalCount - 1 - i 
      }));
      setProposals(proposalsArr);
    } else {
      setProposals([]);
    }
  }, [proposalCount]);

  // Without search functionality, we directly use the proposals
  const filteredProposals = proposals;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">Governance Proposals</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View and participate in governance proposals for the protocol.
          </p>
        </div>

        {/* Render Proposal Cards */}
        <div className="grid gap-6">
          {filteredProposals.map((proposal) => (
            <ProposalCard key={proposal.id} id={proposal.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proposals;
