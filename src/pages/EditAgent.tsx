
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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  backstory: z.string().min(1, "Backstory is required"),
  voteNoConditions: z.string().min(1, "Vote NO conditions are required"),
  voteYesConditions: z.string().min(1, "Vote YES conditions are required"),
  voteAbstainConditions: z.string().min(1, "Vote ABSTAIN conditions are required"),
});

export default function EditAgent() {
  const { id } = useParams();

  // Mock data - in a real app this would be fetched from your backend
  const agent = {
    id: "1",
    name: "InvestoTron Capital",
    backstory: "I am a seasoned delegate with experience reviewing governance proposals",
    voteNoConditions: "The proposal does not clearly demonstrate a return on investment (ROI) of at least 10% annually.",
    voteYesConditions: "The proposal clearly demonstrates a return on investment (ROI) of 10% or more annually.",
    voteAbstainConditions: "The proposal's return on investment (ROI) cannot be accurately determined from the provided information.",
    contractAddress: "0x1234567890123456789012345678901234567890",
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: agent.name,
      backstory: agent.backstory,
      voteNoConditions: agent.voteNoConditions,
      voteYesConditions: agent.voteYesConditions,
      voteAbstainConditions: agent.voteAbstainConditions,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Agent updated successfully!");
  }

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
              <h1 className="text-4xl font-bold text-white">Edit {agent.name}</h1>
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
                Update Agent
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
