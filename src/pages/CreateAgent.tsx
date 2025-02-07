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

const formSchema = z.object({
  role: z.string().min(1, "Role is required"),
  goal: z.string().min(1, "Goal is required"),
  backstory: z.string().min(1, "Backstory is required"),
  reviewTaskDescription: z.string().min(1, "Review task description is required"),
  expectedOutput: z.string().min(1, "Expected output is required"),
});

export default function CreateAgent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "Agent Bravo",
      goal: "Review governance proposals and cast votes on them. You need to provide an opinion of the proposal, your reasoning behind the opinion, and your vote.",
      backstory: "You're a seasoned delegate with experience reviewing governance proposals for Decentralized Autonomous Organizations (DAO).\nYou take a very return on investment (ROI) approach to governance for all proposals requesting funds from the treasury.\nYou will vote for proposals that clearly show how the funds will be used to generate a return on investment (ROI) for the DAO.\nYou benchmark the ROI against the cost depositing the funds to earn a yeild of 10% annually.\nProposals that show a return on investment (ROI) of 10% or more will be voted for.",
      reviewTaskDescription: "Review the proposal and provide an opinion, reasoning, and vote based on the following policy:\n<Policy>\n{policy}\n</Policy>\n\n<Proposal>\n{proposal}\n</Proposal>",
      expectedOutput: "A JSON object with the following fields:\n* `opinion`: The opinion of the agent.\n* `reasoning`: The reasoning behind the opinion.\n* `vote`: The vote of the agent (1 = for, 0 = against, -1 = abstain).",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Agent created successfully!");
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Create Agent</h1>
      <div className="max-w-2xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter agent role" {...field} />
                  </FormControl>
                  <FormDescription>
                    The role of your agent in the governance system.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter agent goal"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The primary objective of your agent.
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
                      placeholder="Enter agent backstory"
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
              name="reviewTaskDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Task Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter review task description"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The description of how the agent should review proposals.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedOutput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Output</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter expected output format"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The format of the output the agent should provide.
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
  );
}