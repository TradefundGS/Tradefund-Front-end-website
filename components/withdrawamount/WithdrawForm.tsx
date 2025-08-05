"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { mutateFetcherWithAuth } from "@/lib/mutations"; 
import { toast } from "sonner"; 
import { CircleAlert } from "lucide-react";

const withdrawSchema = z.object({
	amount: z.number().min(1, { message: "Amount must be at least 1." }),
  });
  
  type WithdrawFormValues = z.infer<typeof withdrawSchema>;
  
  export function WithdrawForm() {
	// Initialize the form with react-hook-form and Zod validation resolver
	const form = useForm<WithdrawFormValues>({
	  resolver: zodResolver(withdrawSchema),
	  defaultValues: { amount: 0 }, // Ensure amount starts as a number
	});
  
	// Set up the mutation for making the API request with react-query
	const { mutate, isLoading } = useMutation({
	  mutationFn: (data: WithdrawFormValues) =>
		mutateFetcherWithAuth("/withdraw_request", data),
	  onError: (error: any) => {
		toast.error("Error processing your request", {
		  description: error.message,
		  icon: <CircleAlert className="h-4 w-4" color="red" />,
		});
	  },
	  onSuccess: () => {
		toast.success("Withdraw request submitted successfully!", {
		  description: "Your request is being processed.",
		  icon: <CircleAlert className="h-4 w-4" color="green" />,
		});
		form.reset(); // Reset form on success
	  },
	});
  
	// Handle form submission
	const onSubmit = (data: WithdrawFormValues) => {
	  mutate(data);
	};
  
	return (
	  <div className="mt-10 sm:mr-auto sm:w-full sm:max-w-[50%]">
		<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
		  <Form {...form}>
			<form
			  onSubmit={form.handleSubmit(onSubmit)}
			  className="w-full space-y-6"
			>
			  {/* Withdraw Amount Field */}
			  <FormField
				control={form.control}
				name="amount"
				render={({ field }) => (
				  <FormItem>
					<FormLabel>Withdraw Amount</FormLabel>
					<FormControl>
					  <Input
						type="number"
						placeholder="Enter amount"
						{...field}
						value={field.value || ""}
						onChange={(e) =>
						  field.onChange(
							e.target.value === "" ? "" : +e.target.value
						  )
						} // Ensure it's a number
					  />
					</FormControl>
					<FormMessage />
				  </FormItem>
				)}
			  />
  
			  {/* Submit Button */}
			  <Button type="submit" disabled={isLoading}>
				{isLoading ? "Processing..." : "Request Withdraw"}
			  </Button>
			</form>
		  </Form>
		</div>
	  </div>
	);
  }