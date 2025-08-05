"use client";
import { useEffect } from "react";
import * as React from "react"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { mutateFetcherWithAuthAndImage } from "@/lib/mutations";
import { toast } from "sonner";
import { format } from "date-fns";
import { useProfile } from "@/reactQuery/mutation/home";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

const schema = z.object({
	name: z.string().nonempty("First name is required"),
	last_name: z.string().nonempty("Last name is required"),
	gender: z.string().nonempty("Gender is required"),
	dob: z.date().optional(),
	about_me: z.string().nonempty("The about me field is required."),
	education: z.string().optional(),
	employment: z.string().optional(),
	income_range: z.string().optional(),
	relationship_status: z.string().optional(),
	profile_image: z.any().optional(),
	kyc_document_1: z.any().optional(),
	kyc_document_2: z.any().optional(),
	address: z.string().optional(),
});

const EditProfileCard = () => {
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();
	const { data, isError, error } = useProfile();
	// console.log("userProfile", data);
	const [date, setDate] = React.useState<Date>()

	const { mutate } = useMutation({
		mutationFn: (data) => mutateFetcherWithAuthAndImage("/profile", data),
		onError: (error) => {
			toast.error("Update failed", {
				description: error.message,
				
			});
		},
		onSuccess: () => {
			toast.success("Profile updated!", {
				description: "Your profile has been successfully updated.",
				
			});
			router.push("/settings");
		},
	});

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: "",
			last_name: "",
			gender: "",
			dob: null,
			about_me: "",
			education: "",
			employment: "",
			income_range: "",
			relationship_status: "",
			profile_image: null,
			kyc_document_1: null,
			kyc_document_2: null,
			address: "",
		},
	});

    useEffect(() => {
        if (data?.user) {
            form.reset({
                name: data.user.name || "",
                last_name: data.user.last_name || "",
                gender: data.user.gender || "",
                dob: data.user.date_of_birth ? new Date(data.user.date_of_birth) : null,
                about_me: data.user.about_me || "",
                employment: data.user.employment_status || "",
                education: data.user.education || "",
                income_range: data.user.income_range || "",  // updated here
                relationship_status: data.user.relationship_status || "",
                profile_image: data.user.profile_image || null,
                kyc_document_1: data.kyc_doc_1 || null,
                kyc_document_2: data.kyc_doc_2 || null,
                address: data.user.address || "",
            });
        }
    }, [data]);

	if (!data) {
		return (
		  <div>
			
<div role="status" className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
    <div className="flex items-center justify-between">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
        <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <span className="sr-only">Loading...</span>
</div>

		  </div>
		);
	  }
	  

	const onSubmit = (values) => {
		setLoading(true);
		const formattedDateString = values.dob
			? format(new Date(values.dob), "yyyy-MM-dd'T'HH:mm:ss")
			: "";

		const fullValues = {
			...values,
			dob: formattedDateString,
		};
		const formData = new FormData();
		if (values.profile_image)
			formData.append("profile_image", values.profile_image);
		if (values.kyc_document_1)
			formData.append("kyc_document_1", values.kyc_document_1);
		if (values.kyc_document_2)
			formData.append("kyc_document_2", values.kyc_document_2);

		Object.keys(fullValues).forEach((key) => {
			if (fullValues[key] !== null && fullValues[key] !== undefined) {
				formData.append(key, fullValues[key]);
			}
		});

		mutate(formData, {
			onSuccess: (responseData) => {
				setLoading(false);
				if (responseData.success?.message) {
					toast.success("Profile Updated Successfully", {
						description: responseData.success.message,
					});
				} else {
					toast.error("Unexpected Response", {
						description:
							"The server returned an unexpected response. Please try again later.",
					});
				}
			},
			onError: (error) => {
				etLoading(false);
				toast.error("Update Failed", {
					description:
						error.message ||
						"An error occurred while updating your profile. Please try again later.",
				});
			},
		});
	};

	return (
		<>
			<div className="overflow-hidden bg-white shadow sm:rounded-lg">
				{/* Card Header */}
				<div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
					<div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
						<div className="ml-4 mt-2">
							<h3 className="text-base font-semibold leading-6 text-gray-900">
								Edit Profile Details
							</h3>
						</div>
						<div className="ml-4 mt-2 flex-shrink-0"></div>
					</div>
				</div>
				<div className="border-t border-gray-200 bg-white px-4 py-5 sm:px-6">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-12"
						>
							<div className="border-b border-gray-900/10 pb-4">
								<div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="sm:col-span-4">
										<div className="grid w-full max-w-sm items-center gap-1.5">
											<FormField
												control={form.control}
												name="profile_image"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Upload Project Image</FormLabel>
														<FormControl>
															<Input
																type="file"
																id="project_image"
																accept="image/*"
																onChange={(event) => {
																	// check if files exist before calling onChange
																	if (event.target.files) {
																		field.onChange(event.target.files[0]);
																	}
																}}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className="sm:col-span-full flex flex-col sm:flex-row gap-4">
										<div className="sm:w-1/2">
											<FormField
												control={form.control}
												name="name"
												render={({ field }) => (
													<FormItem>
														<FormLabel>First Name</FormLabel>
														<FormControl>
															<Input
																placeholder="First name"
																{...field}
																className="block w-full rounded-md border-gray-300 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className="sm:w-1/2">
											<FormField
												control={form.control}
												name="last_name"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="block text-sm font-medium leading-6 text-gray-900">
															Last name
														</FormLabel>
														<FormControl>
															<Input
																placeholder="Last name"
																{...field}
																className="block w-full rounded-md border-gray-300 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className="sm:col-span-full flex flex-col sm:flex-row gap-4">
										<div className="sm:w-1/2">
											<FormField
												control={form.control}
												name="gender"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="block text-sm font-medium leading-6 text-gray-900">
															Gender
														</FormLabel>
														<FormControl>
															<select
																{...field}
																className="block w-full rounded-md border-gray-300 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
															>
																<option value="">Select Gender</option>
																<option>Male</option>
																<option>Female</option>
															</select>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className="sm:w-1/2">
											<FormField
												control={form.control}
												name="address"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="block text-sm font-medium leading-6 text-gray-900">
															Address
														</FormLabel>
														<FormControl>
															<Input
																placeholder="Enter Address"
																{...field}
																className="block w-full rounded-md border-gray-300 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className="sm:col-span-full">
										<FormField
											control={form.control}
											name="dob"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="block text-sm font-medium leading-6 text-gray-900">
														Date of Birth
													</FormLabel>
													<FormControl>
														<Controller
															name="dob"
															control={form.control}
															render={({ field }) => (
																<Popover>
																	<PopoverTrigger asChild>
																		<Button
																			variant={"outline"}
																			className="w-full text-left font-normal"
																		>
																			{field.value
																				? format(field.value, "dd/MM/yyyy")
																				: "Pick a date"}
																			<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
																		</Button>
																	</PopoverTrigger>
																	<PopoverContent
																		className="w-auto p-0"
																		align="start"
																	>
																		
																		<Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={field.value}
          onSelect={field.onChange}
		  disabled={(date) =>
			date > new Date() ||
			date < new Date("1900-01-01")
		}
		initialFocus
          fromYear={1960}
          toYear={2030}
        />
																	</PopoverContent>
																</Popover>
															)}
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
											name="about_me"
											render={({ field }) => (
												<FormItem>
													<FormLabel className="block text-sm font-medium leading-6 text-gray-900">
														About Me
													</FormLabel>
													<FormControl>
														<textarea
															id="about_me"
															name="about_me"
															rows={3}
															{...field}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
															defaultValue={""}
														/>
													</FormControl>
													<FormMessage />
													<p className="mt-3 text-sm leading-6 text-gray-600">
														Write a few sentences about yourself.
													</p>
												</FormItem>
											)}
										/>
									</div>

									<div className="sm:col-span-full flex flex-col sm:flex-row gap-4">
										<div className="sm:w-1/2">
											<FormField
												control={form.control}
												name="education"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="block text-sm font-medium leading-6 text-gray-900">
															Education
														</FormLabel>
														<FormControl>
															<select
																{...field}
																className="block w-full rounded-md border-gray-300 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
															>
																<option value="">Select Education</option>
																{data.educations.map((education) => (
																	<option
																		key={education.id}
																		value={education.id}
																	>
																		{education.name}
																	</option>
																))}
															</select>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className="sm:w-1/2">
											<FormField
												control={form.control}
												name="employment"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="block text-sm font-medium leading-6 text-gray-900">
															Employment Status
														</FormLabel>
														<FormControl>
															<select
																{...field}
																className="block w-full rounded-md border-gray-300 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
															>
																<option value="">
																	Select Employment Status
																</option>
																{data.employment.map((employment) => (
																	<option
																		key={employment.id}
																		value={employment.id}
																	>
																		{employment.name}
																	</option>
																))}
															</select>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className="sm:col-span-full flex flex-col sm:flex-row gap-4">
										<div className="sm:w-1/2">
											<FormField
												control={form.control}
												name="income_range" // Change "incomeRange" to "income_range"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="block text-sm font-medium leading-6 text-gray-900">
															Income Range
														</FormLabel>
														<FormControl>
															<select
																{...field}
																className="block w-full rounded-md border-gray-300 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
															>
																<option value="">Select Income Range</option>
																{data.incomeRange.map((income) => (
																	<option
																		key={income.id}
																		value={income.id}
																	>
																		{income.name}
																	</option>
																))}
															</select>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className="sm:w-1/2">
											<FormField
												control={form.control}
												name="relationship_status"
												render={({ field }) => (
													<FormItem>
														<FormLabel className="block text-sm font-medium leading-6 text-gray-900">
															Relationship Status
														</FormLabel>
														<FormControl>
															<select
																{...field}
																className="block w-full rounded-md border-gray-300 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
															>
																<option value="">
																	Select Relationship Status
																</option>
																{data.relations.map((status) => (
																	<option
																		key={status.id}
																		value={status.id}
																	>
																		{status.name}
																	</option>
																))}
															</select>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className="sm:col-span-4">
										<div className="grid w-full max-w-sm items-center gap-1.5">
											<FormField
												control={form.control}
												name="kyc_document_1"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Upload KYC Document 1</FormLabel>
														<FormControl>
															<Input
																type="file"
																id="kyc_document_1"
																accept="image/*,application/pdf"
																onChange={(event) => {
																	if (event.target.files) {
																		field.onChange(event.target.files[0]);
																	}
																}}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>

									<div className="sm:col-span-4">
										<div className="grid w-full max-w-sm items-center gap-1.5">
											<FormField
												control={form.control}
												name="kyc_document_2"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Upload KYC Document 2</FormLabel>
														<FormControl>
															<Input
																type="file"
																id="kyc_document_2"
																accept="image/*,application/pdf"
																onChange={(event) => {
																	if (event.target.files) {
																		field.onChange(event.target.files[0]);
																	}
																}}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Submit Button */}
							<div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
								<div className="sm:col-span-3">
								<Button
  type="submit"
  disabled={loading}
  className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
>
  {loading ? 'Submitting...' : 'Submit'}
</Button>
								</div>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</>
	);
};

export default EditProfileCard;
