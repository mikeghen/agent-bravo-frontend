import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useState, useEffect } from "react";
import { CONTRACTS } from "../config/contracts";
import AgentCard from "../components/AgentCard";
import { sepolia } from "wagmi/chains";
import { toast } from "sonner";

export default function MyAgents() {
  const [agentCount, setAgentCount] = useState(0);
  const { address } = useAccount();

  const { data: agentCountData, isLoading: countLoading, isError: countError } = useReadContract({
    address: CONTRACTS.AgentBravoDelegateFactory.address,
    abi: CONTRACTS.AgentBravoDelegateFactory.abi,
    functionName: "getDeployedAgentsCount",
    args: [],
  });

  const { writeContract: deployAgentWrite, data: deployTxHash, isPending: isDeployPending, error: deployWriteError } = useWriteContract();

  const { isLoading: isDeployConfirming, isSuccess: isDeployConfirmed } = useWaitForTransactionReceipt({
    hash: deployTxHash,
  });

  const handleCreateAgent = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    try {
      await deployAgentWrite({
        address: CONTRACTS.AgentBravoDelegateFactory.address,
        abi: CONTRACTS.AgentBravoDelegateFactory.abi,
        functionName: "deployAgentBravoDelegate",
        args: [CONTRACTS.AgentBravoGovernor.address, address],
        chain: sepolia,
        account: address,
      });
      toast("Agent creation transaction sent. Waiting for confirmation...");
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed. Please try again.");
    }
  };

  useEffect(() => {
    if (agentCountData) {
      console.log("Deployed agents count:", agentCountData);
      setAgentCount(Number(agentCountData.toString()));
    } else {
      setAgentCount(0);
    }
  }, [agentCountData]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">My Agents</h1>
          <Button onClick={handleCreateAgent} className="gap-2 bg-primary hover:bg-primary/80 text-primary-foreground">
            <Plus size={20} />
            Create Agent
          </Button>
        </div>

        {countLoading ? (
          <div>Loading agents...</div>
        ) : (
          <>
            {agentCount === 0 ? (
              <div>No agents found. Create one now!</div>
            ) : (
              <div className="grid gap-6">
                {Array.from({ length: agentCount }).map((_, index) => (
                  <AgentCard key={index} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
