"use client";

import { useWizardNav } from "../wizard";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

import {
	useCreateProject,
	useGetCreateProject,
} from "@/reactQuery/mutation/home";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import SuccessCard from "../success";

const schema = z.object({
	project_description: z.string().min(1, "Description must be filled"),
	accept_terms: z.boolean().refine((val) => val === true, {
		message: "You must accept the terms and conditions",
	}),
	video_url: z.string().url("Must be a valid URL").optional(),
	supported_by: z.string().optional(),
	upload_document: z.any().optional(), // Assuming this is a file or similar
	description: z.string().optional(),
	upload_document2: z.any().optional(),
	description2: z.string().optional(),
	supported_by2: z.string().optional(),
});

type DetailsFormValues = z.infer<typeof schema>;

const supportedByOptions = [
	{ id: "ls", label: "LS" },
	{ id: "sblc", label: "SBLC" },
	{ id: "openaccount", label: "Open Account" },
	{ id: "otheraccount", label: "Other Account" },
];

interface DetailsFormProps {
	setData: (data: DetailsFormValues) => void;
	data: Partial<DetailsFormValues>;
}

export const DetailsForm: React.FC<DetailsFormProps> = ({ data, setData }) => {
	const {
		data: getCreateProjectData,
		isLoading: getCreateProjectLoading,
		isError: getCreateProjectError,
		error: getCreateProjectErrorObj,
	} = useGetCreateProject();
	console.log("getCreate", getCreateProjectData);
	const {
		skip,
		goForward,
		blocked,
		canBackward,
		canSkip,
		goBack,
		isCompleted,
		isLastStage,
		goStage,
	} = useWizardNav();

	const {
		mutate,
		isPending: isLoading,
		isError,
		error,
		isSuccess,
	} = useCreateProject();

	const form = useForm<DetailsFormValues>({
		resolver: zodResolver(schema),
		defaultValues: {
			video_url: data?.video_url,
			supported_by: data?.supported_by,
			upload_document: data?.upload_document,
			description: data?.description,
			upload_document2: data?.upload_document2,
			description2: data?.description2,

			supported_by2: data?.supported_by2,
			accept_terms: data?.accept_terms,
			project_description: data?.project_description,
		},
	});
	const lendingFee = getCreateProjectData?.lending_fee;

	console.log("Lending Fee:", lendingFee);

	const onSubmit: SubmitHandler<DetailsFormValues> = (values) => {
		const lendingFeeNumber = Number(lendingFee);
		if (lendingFeeNumber === 0) {
			const formattedDateString = format(new Date(data.end_date), "dd/MM/yyyy");
			const fullValues: any = {
				...data,
				...values,
				video_url: values.video_url,
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
						goStage(4);
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
		} else {
			setData((p) => ({ ...p, ...values }));
			goForward();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-12"
			>
				{/* Project Info Section */}
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
					<div>
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Project Info
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Provide the necessary project information.
						</p>
					</div>
					<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
						<div className="col-span-full">
							<FormField
								control={form.control}
								name="project_description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Enter Project Description</FormLabel>
										<FormControl>
											<textarea
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												placeholder="Enter Project Description"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Document 1 Section */}
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
					<div>
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Document 1
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Upload the first supporting document.
						</p>
					</div>
					<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
						<div className="sm:col-span-3">
							<FormField
								control={form.control}
								name="supported_by"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Supported By</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select an option" />
												</SelectTrigger>
												<SelectContent>
													{supportedByOptions.map((option) => (
														<SelectItem
															key={option.id}
															value={option.id}
														>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="sm:col-span-3">
							<FormField
								control={form.control}
								name="upload_document"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Upload Document</FormLabel>
										<FormControl>
											<Input
												type="file"
												onChange={(e: any) =>
													field.onChange(e.target.files?.[0])
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="col-span-full">
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<textarea
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												placeholder="Enter description"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Document 2 Section */}
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
					<div>
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Document 2
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Upload the second supporting document.
						</p>
					</div>
					<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
						<div className="sm:col-span-3">
							<FormField
								control={form.control}
								name="supported_by2"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Supported By</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select an option" />
												</SelectTrigger>
												<SelectContent>
													{supportedByOptions.map((option) => (
														<SelectItem
															key={option.id}
															value={option.id}
														>
															{option.label}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="sm:col-span-3">
							<FormField
								control={form.control}
								name="upload_document2"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Upload Document</FormLabel>
										<FormControl>
											<Input
												type="file"
												onChange={(e: any) =>
													field.onChange(e.target.files?.[0])
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="col-span-full">
							<FormField
								control={form.control}
								name="description2"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<textarea
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
												placeholder="Enter description"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Video URL Section */}
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
					<div>
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Video URL
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Provide the video URL for your project.
						</p>
					</div>
					<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
						<div className="col-span-full">
							<FormField
								control={form.control}
								name="video_url"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Enter Video URL</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="https://example.com/video"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				{/* Terms and Conditions Section */}
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
					<div>
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Terms and Conditions
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Please review and accept the terms and conditions.
						</p>
					</div>
					<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
						<FormField
							control={form.control}
							name="accept_terms"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Accept Terms</FormLabel>
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={(checked) => field.onChange(checked)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				{/* Submit Section */}
				<div className="flex justify-end gap-x-6">
					<Button
						type="button"
						onClick={() => goBack()}
						disabled={!canBackward}
					>
						Back
					</Button>
					<Button
						type="submit"
						disabled={blocked || isLoading}
					>
						{lendingFee === 0 ? "Create Project" : "Next"}
					</Button>
				</div>
				{isError && <p className="text-red-500">{error.message}</p>}
				{isSuccess && <SuccessCard />}
			</form>
		</Form>
	);
};
