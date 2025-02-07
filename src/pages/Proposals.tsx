import { useState } from "react";
import Navbar from "../components/Navbar";
import ProposalCard from "../components/ProposalCard";

// Mock data - replace with actual API calls
const mockProposals = [
  {
    id: 1,
    title: "Upgrade Protocol Parameters",
    status: "active",
    date: "2024-02-20",
    description: "Proposal to adjust key protocol parameters including interest rates and collateral factors.",
  },
  {
    id: 2,
    title: "Community Fund Allocation",
    status: "passed",
    date: "2024-02-15",
    description: "Allocate funds from the community treasury for ecosystem development and growth initiatives.",
  },
  {
    id: 3,
    title: "Governance Framework Update",
    status: "pending",
    date: "2024-02-25",
    description: "Updates to the governance framework to improve decision-making processes and participation.",
  },
] as const;

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProposals = mockProposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Governance Proposals</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View and participate in governance proposals for the protocol.
          </p>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProposals.map((proposal) => (
            <ProposalCard key={proposal.id} {...proposal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Proposals;