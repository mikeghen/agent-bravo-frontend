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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Brain } from "lucide-react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS } from "../config/contracts";
import { sepolia } from "wagmi/chains";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  backstory: z.string().min(1, "Backstory is required"),
  voteNoConditions: z.string().min(1, "Vote NO conditions are required"),
  voteYesConditions: z.string().min(1, "Vote YES conditions are required"),
  voteAbstainConditions: z.string().min(1, "Vote ABSTAIN conditions are required"),
});

export default function CreateAgent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      backstory: "",
      voteNoConditions: "",
      voteYesConditions: "",
      voteAbstainConditions: "",
    },
  });

  // Retrieve the connected account.
  const { address } = useAccount();

  // Prepare the deploy write hook for creating the agent via the factory.
  const { writeContract: deployAgentWrite, data: deployTxHash, isPending: isDeployPending, error: deployWriteError } = useWriteContract();
  const { isLoading: isDeployConfirming, isSuccess: isDeployConfirmed } = useWaitForTransactionReceipt({
    hash: deployTxHash,
  });

  // Prepare the update write hook for updating the delegate's voting policy.
  const { writeContract: updatePolicyWrite, data: updateTxHash, isPending: isUpdatePending, error: updateWriteError } = useWriteContract();
  const { isLoading: isUpdateConfirming, isSuccess: isUpdateConfirmed } = useWaitForTransactionReceipt({
    hash: updateTxHash,
  });

  async function handleCreateAgent(values: z.infer<typeof formSchema>) {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    try {
      // First transaction: create the new agent via the factory contract.
      await deployAgentWrite({
        address: CONTRACTS.AgentBravoDelegateFactory.address,
        abi: CONTRACTS.AgentBravoDelegateFactory.abi,
        functionName: "deployAgentBravoDelegate",
        args: [address, address],
        chain: sepolia,
        account: address,
      });
      toast("Agent creation transaction sent. Waiting for confirmation...");

      // Assuming deployAgentWrite returns a result with the new agent's address.
      const newAgentAddress = deployTxHash?.result;
      if (!newAgentAddress) {
        throw new Error("Agent creation failed!");
      }
      toast("Agent created. Proceeding to update voting policy...");

      // Second transaction: update the agent delegate's voting policy.
      await updatePolicyWrite({
        address: newAgentAddress as `0x${string}`,
        abi: CONTRACTS.AgentBravoDelegate.abi,
        functionName: "updateVotingPolicy",
        args: [
          values.backstory, 
          values.voteNoConditions,
          values.voteYesConditions,
          values.voteAbstainConditions,
        ],
        chain: sepolia,
        account: address,
      });
      toast("Voting policy update transaction sent. Waiting for confirmation...");

      toast.success("Agent created with updated voting policy!");
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="glass-card p-8 rounded-lg">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-primary/20">
                <AvatarFallback className="bg-primary/20">
                  <Brain className="h-6 w-6 text-primary" />
                </AvatarFallback>
              </Avatar>
              <h1 className="text-4xl font-bold text-white">Create Agent</h1>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreateAgent)} className="space-y-8">
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
                          className="min-h-[100px] bg-muted border-muted"
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

              <Button type="submit" className="w-full bg-primary hover:bg-primary/80 text-primary-foreground">
                Create Agent
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
