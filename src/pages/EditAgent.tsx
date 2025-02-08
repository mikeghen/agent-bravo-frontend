import { useParams, Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import { ArrowLeft, Brain } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
import { CONTRACTS } from "../config/contracts";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  backstory: z.string().min(1, "Backstory is required"),
  voteNoConditions: z.string().min(1, "Vote NO conditions are required"),
  voteYesConditions: z.string().min(1, "Vote YES conditions are required"),
  voteAbstainConditions: z.string().min(1, "Vote ABSTAIN conditions are required"),
});

export default function EditAgent() {
  const { id } = useParams();
  const agentContractAddress = id as string;

  // Read the voting policy from the agent contract.
  const { data: votingPolicy, isLoading: policyLoading, error: policyError } = useReadContract({
    address: agentContractAddress as `0x${string}`,
    abi: CONTRACTS.AgentBravoDelegate.abi,
    functionName: "votingPolicy",
  });

  // Initialize form with empty values; we will update these via reset() once the contract data is loaded.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Name is not stored on-chain; we display a shortened version of the contract address.
      name: agentContractAddress
        ? `Agent ${agentContractAddress.substring(0, 6)}...${agentContractAddress.substring(agentContractAddress.length - 4)}`
        : "",
      backstory: "",
      voteNoConditions: "",
      voteYesConditions: "",
      voteAbstainConditions: "",
    },
  });

  const { writeContract: updatePolicyWrite, data: updateTxHash, isPending: isUpdatePending, error: updateWriteError } = useWriteContract();
  const { isLoading: isUpdateConfirming, isSuccess: isUpdateConfirmed } = useWaitForTransactionReceipt({
    hash: updateTxHash,
  });

  // Declare useAccount at the top level of the component
  const { address } = useAccount();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    try {
      await updatePolicyWrite({
        address: agentContractAddress as `0x${string}`,
        abi: CONTRACTS.AgentBravoDelegate.abi,
        functionName: "updateVotingPolicy",
        args: [
          values.backstory,
          values.voteNoConditions,
          values.voteYesConditions,
          values.voteAbstainConditions,
        ],
        chain: arbitrumSepolia,
        account: address,
      });
      toast("Voting policy update transaction sent. Waiting for confirmation...");
      toast.success("Agent updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed. Please try again.");
    }
  }

  // Trigger a success toast once the update transaction is confirmed.
  useEffect(() => {
    if (isUpdateConfirmed) {
      toast.success("Agent updated successfully!");
    }
  }, [isUpdateConfirmed]);

  useEffect(() => {
    if (votingPolicy) {
      form.reset({
        name: agentContractAddress
          ? `Agent ${agentContractAddress.substring(0, 6)}...${agentContractAddress.substring(agentContractAddress.length - 4)}`
          : "",
        backstory: votingPolicy[0] ?? "",
        voteNoConditions: votingPolicy[1] ?? "",
        voteYesConditions: votingPolicy[2] ?? "",
        voteAbstainConditions: votingPolicy[3] ?? "",
      });
    }
  }, [votingPolicy, agentContractAddress, form]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <Link to={`/agents/${id}`} className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="w-4 h-4" />
            Back to Agent
          </Link>
        </div>

        <div className="glass-card p-8 rounded-lg">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-primary/20">
                <AvatarFallback className="bg-primary/20">
                  <Brain className="h-6 w-6 text-primary" />
                </AvatarFallback>
              </Avatar>
              <h1 className="text-4xl font-bold text-white">
                Edit Agent {agentContractAddress
                  ? `${agentContractAddress.substring(0, 6)}...${agentContractAddress.substring(agentContractAddress.length - 4)}`
                  : ""}
              </h1>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Name</FormLabel>
                    <FormControl>
                      <Input className="bg-secondary" {...field} />
                    </FormControl>
                    <FormDescription className="text-muted-foreground">
                      The name of your agent in the governance system.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="backstory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Voting Policy</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[100px] bg-secondary"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-muted-foreground">
                      The background and context for your agent's decision-making.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="voteNoConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#F97316]">Vote NO Conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[100px] bg-[#F97316]/20 border-[#F97316]/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-[#F97316]/90">
                        Define the conditions under which your agent should vote NO.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="voteYesConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary">Vote YES Conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[100px] bg-primary/20 border-primary/20"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-primary/90">
                        Define the conditions under which your agent should vote YES.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="voteAbstainConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Vote ABSTAIN Conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[100px] bg-blue-300/20 text-white border border-blue-300/30"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-muted-foreground">
                        Define the conditions under which your agent should ABSTAIN from voting.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-primary-foreground" disabled={isUpdatePending || isUpdateConfirming}>
                {isUpdatePending || isUpdateConfirming ? "Updating..." : "Update Agent"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
