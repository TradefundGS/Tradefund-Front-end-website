"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { mutateFetcher } from "@/lib/mutations";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
	email: z.string().email("Invalid email address"),
});

type ForgotPasswordValues = z.infer<typeof schema>;

interface ForgotPasswordProps {
	onNext: (email: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNext }) => {
	const router = useRouter();
	const [email, setMail] = useState<string>("");

	const form = useForm<ForgotPasswordValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
		},
	});

	const { mutate, isPending: isLoading } = useMutation({
		mutationFn: (data: ForgotPasswordValues) =>
			mutateFetcher("/trigger_otp", data),
		onError: (error: AxiosError) => {
			toast.error("Authentication error", {
				description: error.message,
				icon: (
					<CircleAlert
						className="h-4 w-4"
						color="red"
					/>
				),
			});
		},
		onSuccess: (data: any) => {
			toast.success("OTP sent successfully!", {
				description: "Please check your email for the OTP.",
			});
			// Store the email in local storage
			localStorage.setItem("forgotPasswordEmail", data.email);
			// Redirect to the login page
			// router.push('/auth/login');
		},
	});

	const onSubmit: SubmitHandler<ForgotPasswordValues> = (values) => {
		// Only set the email if it is not empty
		if (values.email) {
			setMail(values.email);
		}
		onNext(values.email);
		mutate(values);
	};

	return (
		<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="m@example.com"
										autoComplete="email"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="w-full"
						disabled={isLoading}
					>
						{isLoading ? "Sending OTP..." : "Send OTP"}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default ForgotPassword;
