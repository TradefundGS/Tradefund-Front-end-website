import { useState } from "react";
import { useWizardNav } from "../wizard";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProject, useProjects, useGetCreateProject } from "@/reactQuery/mutation/home";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
// Define your schema
const schema = z.object({
	// payment_method: z.string().min(1, 'Please choose a payment method'),
});

type PaymentFormValues = z.infer<typeof schema>;

interface PaymentFormProps {
	setData: any;
	data: any;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ data, setData }) => {
	const {
		data: getCreateProjectData,
		isLoading: getCreateProjectLoading,
		isError: getCreateProjectError,
		error: getCreateProjectErrorObj,
	} = useGetCreateProject();
  const lendingFee = getCreateProjectData?.lending_fee;

	const [paymentType, setPaymentType] = useState("");
	const {
		skip,
		goForward,
		blocked,
		canBackward,
		canSkip,
		goBack,
		isCompleted,
		isLastStage,
	} = useWizardNav();
	const {
		mutate,
		isPending: isLoading,
		isError,
		error,
		isSuccess,
	} = useCreateProject();
	const form = useForm<PaymentFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			payment_method: "",
		},
	});

	const { data: dataHome } = useProjects();
	const walletAmount = dataHome?.user?.wallet_balance;

	const onSubmit: SubmitHandler<PaymentFormValues> = (values) => {
		const formattedDateString = format(new Date(data.end_date), "dd/MM/yyyy");
		const fullValues: any = {
			...data,
			...values,
			end_date: formattedDateString,
		};

		const formData = new FormData();
		for (var key in fullValues) {
			if (fullValues.hasOwnProperty(key)) {
				formData.append(key, fullValues[key]);
			}
		}

		mutate(formData, {
			onSuccess: (responseData: any) => {
				if (responseData.success && responseData.success.message) {
					toast.success("Project Created Successfully", {
						description:
							responseData.success.message ||
							"Your project has been submitted and is pending admin approval. Please wait for further updates.",
					});
					goForward();
				} else {
					toast.error("Unexpected Response", {
						description:
							"The server returned an unexpected response. Please try again later.",
					});
				}
			},
			onError: (error) => {
				// Access the error message in the nested structure
				const errorMessage = error.message || "An error occurred";

				toast.error("Failed to Create Project", {
					description: errorMessage,
				});
			},
		});
	};

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-12 w-full"
				>
					{/* Payment Method Selection */}
					<FormField
						control={form.control}
						name="payment_method"
						render={({ field }) => (
							<FormItem>

                <p>Listing fee <b> ${lendingFee}</b></p>
								<FormControl>
									<RadioGroup
										value={field.value}
										onValueChange={(value) => {
											field.onChange(value);
											setPaymentType(value);
										}}
										className="mt-6 grid grid-cols-1 gap-y-6"
									>
										<div className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none">
											<div className="flex flex-1 items-center">
												<RadioGroupItem
													value="wallet"
													checked
													className="h-5 w-5 text-indigo-600"
												/>
												<div className="ml-3 flex flex-col">
													<span className="block text-sm font-medium text-gray-900">
														Pay with Wallet
													</span>
													<span className="mt-1 flex items-center text-sm text-gray-500">
														{walletAmount !== undefined &&
															(walletAmount > 0 ? (
																<span className="text-sm font-medium text-gray-900">
																	${walletAmount}
																</span>
															) : (
																<span className="text-sm font-medium text-red-500">
																	Insufficient Balance
																</span>
															))}
													</span>
												</div>
											</div>
											{walletAmount === 0 && (
												<div className="absolute top-0 right-0 -mr-4 -mt-4 flex items-center justify-center rounded-full bg-red-50 p-2">
													<XCircleIcon
														aria-hidden="true"
														className="h-6 w-6 text-red-400"
													/>
												</div>
											)}
											<span className="absolute inset-0 rounded-lg border-2 border-transparent group-data-[checked]:border-indigo-600" />
										</div>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Buttons */}
					<div className="flex justify-between">
						<Button
							type="button"
							onClick={goBack}
							className="bg-gray-300 text-gray-900 px-4 py-2 rounded-md"
						>
							Back
						</Button>
						<Button
							type="submit"
							className="bg-primary text-white px-4 py-2 rounded-md"
							disabled={isLoading}
						>
							Next
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};
