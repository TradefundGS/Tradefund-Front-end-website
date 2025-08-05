'use client'

import SettingsNav from "@/components/setting/SettingsNav";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import { LiaCheckCircle } from "react-icons/lia";
import { HiOutlineXMark } from "react-icons/hi2";
import * as z from "zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChangePassword } from "@/reactQuery/mutation/home";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";

const schema = z
	.object({
		old_password: z.string().nonempty("Old password is required"),
		new_password: z.string().nonempty("New password is required"),
		confirm_password: z.string().nonempty("Please confirm your new password"),
	})
	.refine((data) => data.new_password === data.confirm_password, {
		message: "Passwords don't match",
		path: ["confirm_password"],
	});

const ChangePasswordPage = () => {
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const [showOldPassword, setShowOldPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);


	const { mutate, isLoading, isError, error, isSuccess } = useChangePassword();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: zodResolver(schema),
	});


	const onSubmit = (data: any) => {
		mutate(data, {
			onSuccess: () => {
				reset();
				toast.success("Successful!", {
					description: "Your password changed successful.",
					icon: (
						<CircleAlert
							className="h-4 w-4"
							color="green"
						/>
					),
				});
			},
			onError: (error: any) => {
				console.log(error)
				toast.error("Failed", {
					description: error.error.message,
					icon: (
						<CircleAlert
							className="h-4 w-4"
							color="red"
						/>
					),
				});
			},
		});
	};

	return (
		<div className="flex min-h-screen w-full flex-col">
			<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
				
				<div className="mx-auto grid w-full max-w-7xl p-6 items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
					<SettingsNav activeItem="change-password" />
					<div className="grid gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Change Password</CardTitle>
								<CardDescription>
									Enter your old password and your new password.
								</CardDescription>
							</CardHeader>
							<CardContent>
							<form onSubmit={handleSubmit(onSubmit)}>
							<div className="mb-6 relative">
  <Input
    type={showOldPassword ? "text" : "password"}
    placeholder="Old Password"
    {...register("old_password")}
    className="pr-10" 
  />
  <button 
    type="button" 
    onClick={() => setShowOldPassword(!showOldPassword)}
    className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
  >
    <span>{showOldPassword ? <FiEye /> : <FiEyeOff />}</span>
  </button>
  {errors.old_password && <span>{errors.old_password.message}</span>}
</div>
  <div className="grid gap-6 md:grid-cols-2 mb-6">
    <div className="mb-6 relative">
      <Input
        type={showNewPassword ? "text" : "password"}
        placeholder="New Password"
		className="pr-10" 
        {...register("new_password")}
      />
      <button type="button"  onClick={() => setShowNewPassword(!showNewPassword)}
		className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
		>
        <span>{showNewPassword ? <FiEye /> : <FiEyeOff />}</span>
      </button>
      {errors.new_password && <span>{errors.new_password.message}</span>}
    </div>
    <div className="mb-6 relative">
      <Input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm New Password"
        {...register("confirm_password")}
		className="pr-10" 
      />
      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
		className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500"
		>
        <span>{showConfirmPassword ? <FiEye /> : <FiEyeOff />}</span>
      </button>
      {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
    </div>
  </div>
									<CardFooter className="border-t px-6 py-4">
										<Button
											type="submit"
											disabled={isLoading}
										>
											{isLoading ? "Changing..." : "Change Password"}
										</Button>
									</CardFooter>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
			<div
				aria-live="assertive"
				className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
			>
				<div className="flex w-full flex-col items-center space-y-4 sm:items-end">
					{/* Success notification */}
					<Transition show={showSuccess}>
						<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="p-4">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										<LiaCheckCircle
											aria-hidden="true"
											className="h-6 w-6 text-green-400"
										/>
									</div>
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-gray-900">
											Successfully changed!
										</p>
										<p className="mt-1 text-sm text-gray-500">
											Your password has been changed.
										</p>
									</div>
									<div className="ml-4 flex flex-shrink-0">
										<button
											onClick={() => setShowSuccess(false)}
											className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
										>
											<span className="sr-only">Close</span>
											<HiOutlineXMark 
												aria-hidden="true"
												className="h-5 w-5"
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
					{/* Error notification */}
					<Transition show={showError}>
						<div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
							<div className="p-4">
								<div className="flex items-start">
									<div className="flex-shrink-0">
										<LiaCheckCircle
											aria-hidden="true"
											className="h-6 w-6 text-red-400"
										/>
									</div>
									<div className="ml-3 w-0 flex-1 pt-0.5">
										<p className="text-sm font-medium text-gray-900">Error</p>
										<p className="mt-1 text-sm text-gray-500">
											{error?.message || "An error occurred"}
										</p>
									</div>
									<div className="ml-4 flex flex-shrink-0">
										<button
											onClick={() => setShowError(false)}
											className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
										>
											<span className="sr-only">Close</span>
											<HiOutlineXMark 
												aria-hidden="true"
												className="h-5 w-5"
											/>
										</button>
									</div>
								</div>
							</div>
						</div>
					</Transition>
				</div>
			</div>
		</div>
	);
};

export default ChangePasswordPage;
