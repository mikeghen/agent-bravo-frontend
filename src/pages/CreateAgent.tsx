
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
      name: "Agent Bravo",
      backstory: "You're a seasoned delegate with experience reviewing governance proposals for Decentralized Autonomous Organizations (DAO).\nYou take a very return on investment (ROI) approach to governance for all proposals requesting funds from the treasury.\nYou will vote for proposals that clearly show how the funds will be used to generate a return on investment (ROI) for the DAO.\nYou benchmark the ROI against the cost depositing the funds to earn a yeild of 10% annually.\nProposals that show a return on investment (ROI) of 10% or more will be voted for.",
      voteNoConditions: "The proposal does not clearly demonstrate a return on investment (ROI) of at least 10% annually.",
      voteYesConditions: "The proposal clearly demonstrates a return on investment (ROI) of 10% or more annually.",
      voteAbstainConditions: "The proposal's return on investment (ROI) cannot be accurately determined from the provided information.",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Mock contract address generation - in a real app this would come from the blockchain
    const contractAddress = "0x" + Math.random().toString(16).slice(2).padEnd(40, '0');
    toast.success("Agent created successfully!", {
      description: `Contract Address: ${contractAddress}`,
      duration: 5000,
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Agent</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Define your governance agent's behavior and voting conditions.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
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
                    <FormLabel>Backstory</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The background and context for your agent's decision-making.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="voteNoConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When should your Agent vote NO on proposals?</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
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
                    <FormLabel>When should your Agent vote YES on proposals?</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
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
                    <FormLabel>When should your Agent ABSTAIN from voting?</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Define the conditions under which your agent should ABSTAIN from voting.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Agent
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
