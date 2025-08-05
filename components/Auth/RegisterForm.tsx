"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSecurity } from "@/reactQuery";
import { AxiosError } from "axios";
import { mutateFetcher } from "@/lib/mutations";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { FiEye, FiEyeOff } from "react-icons/fi";

const schema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	question_id: z.string().min(1, "Security question is required"),
	answer: z.string().min(1, "Answer is required"),
});

type RegisterFormValues = z.infer<typeof schema>;

const RegisterForm = () => {
	const { data, isFetching, isError } = useSecurity();
	const questions = data?.success?.questions ?? [];
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			question_id: "",
			answer: "",
		},
	});
	const router = useRouter();
	const { mutate, isPending: isLoading } = useMutation({
		mutationFn: (data: any) => mutateFetcher("/register", data),
		onError: (error: any) => {
			console.log(error)
			toast.error("Authentication error", {
				description: error.error.message,
				icon: (
					<CircleAlert
						className="h-4 w-4"
						color="red"
					/>
				),
			});
		},
		onSuccess: (data) => {
			toast.success("Registration successful!", {
				description: "You have successfully registered. You can now log in.",
				icon: (
					<CircleAlert
						className="h-4 w-4"
						color="green"
					/>
				),
			});
			//   console.log(data);
			router.push("/auth/login");
		},
	});

	const onSubmit: SubmitHandler<RegisterFormValues> = (values) => {
		const errors = form.formState.errors;

		if (Object.keys(errors).length > 0) {
			const errorMessages = Object.values(errors)
				.map((error) => error.message)
				.join(", ");

			toast.error("Please fix the following errors: " + errorMessages, {
				icon: (
					<CircleAlert
						className="h-4 w-4"
						color="red"
					/>
				),
			});
		} else {
			//   console.log(values);
			mutate(values);
		}
	};

	return (
		<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-2"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Max"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="m@example.com"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					{/* <FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/> */}
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="max-w-sm">
								<FormLabel className="block text-sm mb-2 dark:text-white">
									Password
								</FormLabel>
								<FormControl className="relative">
									<div style={{ position: "relative" }}>
										<Input
											type={showPassword ? "text" : "password"}
											className="py-3 ps-4 pe-10 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
											placeholder="Enter password"
											{...field}
										/>
										<button
											type="button"
											className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
											onClick={() => setShowPassword(!showPassword)}
										>
											{/* You can replace this with your SVG */}
											<span>{showPassword ? <FiEye /> : <FiEyeOff />}</span>
										</button>
									</div>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="question_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Security Question</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a question" />
										</SelectTrigger>
										<SelectContent>
											{questions.map(
												(question: { id: string; question: string }) => (
													<SelectItem
														key={question.id}
														value={question.id.toString()}
													>
														{question.question}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="answer"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Answer</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your answer"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="flex items-center space-x-2 py-5">
						<Checkbox
							id="terms"
							name="terms"
							required
						/>
						<label
							htmlFor="terms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Accept terms and conditions
						</label>
					</div>
					<Button
						type="submit"
						className="w-full text-white"
						disabled={isLoading}
					>
						{isLoading ? "Creating account..." : "Create an account"}
					</Button>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<a
							href="login"
							className="underline"
						>
							Sign in
						</a>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default RegisterForm;
