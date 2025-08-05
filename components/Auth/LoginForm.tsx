"use client";
import { useEffect, useState, useContext  } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter  } from "next/navigation";
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
import { mutateFetcher } from "@/lib/mutations";
import { setSession } from "@/lib/actions";
import { AuthContext } from "@/contexts/authContext";
import { FiEye, FiEyeOff } from "react-icons/fi";


const schema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
  });

type LoginFormValues = z.infer<typeof schema>;

const LoginForm = () => {
	const form = useForm<LoginFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);

	const { login } = useContext(AuthContext);

	const { mutate, isPending: isLoading } = useMutation({
		mutationFn: (data: LoginFormValues) => mutateFetcher("/login", data),
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
			toast.success("Login Successful", {
				description: "Welcome back! You are now logged in.",
				icon: (
					<CircleAlert
						className="h-4 w-4"
						color="green"
					/>
				),
			});
			login(data);
			router.refresh();
		},
	});

	const onSubmit: SubmitHandler<LoginFormValues> = (values) => {
		// console.log(values);
		mutate(values);
	};

	return (
		<>
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
						<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10" // Add padding on the right side for the button
            {...field}
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-400 focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500" // Position the button
          >
            <span>{showPassword ? <FiEye /> : <FiEyeOff />}</span>
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
								<label
									htmlFor="remember-me"
									className="ml-3 block text-sm leading-6 text-gray-900"
								>
									Remember me
								</label>
							</div>
							<div className="text-sm leading-6">
								<a
									href="forgot-password"
									className="font-semibold  text-primary hover:text-gray-900"
								>
									Forgot password?
								</a>
							</div>
						</div>
						<Button
							type="submit"
							className="w-full  text-white"
							disabled={isLoading}
						>
							{isLoading ? "Signing in..." : "Sign in"}
						</Button>
					</form>
				</Form>
				<div className="relative mt-10">
					<div
						aria-hidden="true"
						className="absolute inset-0 flex items-center"
					>
						<div className="w-full border-t border-gray-200" />
					</div>
					<div className="relative flex justify-center text-sm font-medium leading-6">
						<span className="bg-white px-6 text-gray-900">
							Don&apos;t have an account?{" "}
							<a
								href="register"
								className="font-semibold leading-6 text-primary hover:text-gray-900"
							>
								Sign up
							</a>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
