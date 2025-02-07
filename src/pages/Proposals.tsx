
import { useState } from "react";
import Navbar from "../components/Navbar";
import ProposalCard from "../components/ProposalCard";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

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

const statusColors = {
  active: "bg-primary/20 text-primary border-primary/30",
  passed: "bg-green-900/20 text-green-400 border-green-500/30",
  failed: "bg-red-900/20 text-red-400 border-red-500/30",
  pending: "bg-gray-800/40 text-gray-400 border-gray-600/30",
};

const Proposals = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProposals = mockProposals.filter((proposal) =>
    proposal.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search proposals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-2 rounded-lg glass-card focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Mobile View (Cards) */}
        <div className="grid gap-6 md:grid-cols-2 lg:hidden">
          {filteredProposals.map((proposal) => (
            <ProposalCard key={proposal.id} {...proposal} />
          ))}
        </div>

        {/* Desktop View (List) */}
        <div className="hidden lg:block">
          <div className="glass-card rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProposals.map((proposal) => (
                  <tr key={proposal.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-foreground">{proposal.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[proposal.status]}`}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {proposal.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted-foreground line-clamp-2">{proposal.description}</div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <Link 
                        to={`/proposals/${proposal.id}`} 
                        className="text-primary hover:text-primary/80 transition-colors flex items-center justify-end"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposals;
