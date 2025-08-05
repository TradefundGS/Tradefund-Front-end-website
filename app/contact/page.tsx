"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Field, Label, Switch } from "@headlessui/react";
import { useContactUs } from "@/reactQuery/mutation/home";
import { toast } from "sonner";
import {
	BuildingOffice2Icon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";

export default function Example() {
	const contactMutation = useContactUs();
	const [agreed, setAgreed] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await contactMutation.mutateAsync({
				first_name: firstName,
				last_name: lastName,
				email_address: email,
				mobile: phoneNumber,
				subject: subject,
				message: message,
			});

			setFirstName("");
			setLastName("");
			setEmail("");
			setPhoneNumber("");
			setSubject("");
			setMessage("");

			toast.success("Your request has been submitted successfully!", {
				description: "Our team will be in touch with you shortly.",
			});
		} catch (error) {
			// Handle error
			console.error(error);
		}
	};

	return (
		<>
			<div className="bg-white py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900">
							Our offices
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate
							id malesuada non. Cras aliquet purus dui laoreet diam sed lacus,
							fames.
						</p>
					</div>
					<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
						<div>
							<h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">
								Los Angeles
							</h3>
							<address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
								<p>4556 Brendan Ferry</p>
								<p>Los Angeles, CA 90210</p>
							</address>
						</div>
						<div>
							<h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">
								New York
							</h3>
							<address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
								<p>886 Walter Street</p>
								<p>New York, NY 12345</p>
							</address>
						</div>
						<div>
							<h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">
								Toronto
							</h3>
							<address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
								<p>7363 Cynthia Pass</p>
								<p>Toronto, ON N3Y 4H8</p>
							</address>
						</div>
						<div>
							<h3 className="border-l border-indigo-600 pl-6 font-semibold text-gray-900">
								London
							</h3>
							<address className="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
								<p>114 Cobble Lane</p>
								<p>London N1 2EF</p>
							</address>
						</div>
					</div>
				</div>
			</div>
			<div className="relative bg-white">
				<div className="absolute inset-0">
					<div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
				</div>
				<div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
					<div className="bg-gray-50 px-6 py-16 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
						<div className="mx-auto max-w-lg">
							<h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
								Get in touch
							</h2>
							<p className="mt-3 text-lg leading-6 text-gray-500">
								Nullam risus blandit ac aliquam justo ipsum. Quam mauris
								volutpat massa dictumst amet. Sapien tortor lacus arcu.
							</p>
							<dl className="mt-8 text-base text-gray-500">
								<div>
									<dt className="sr-only">Postal address</dt>
									<dd>
										<p>742 Evergreen Terrace</p>
										<p>Springfield, OR 12345</p>
									</dd>
								</div>
								<div className="mt-6">
									<dt className="sr-only">Phone number</dt>
									<dd className="flex">
										<PhoneIcon
											aria-hidden="true"
											className="h-6 w-6 flex-shrink-0 text-gray-400"
										/>
										<span className="ml-3">+1 (555) 123-4567</span>
									</dd>
								</div>
								<div className="mt-3">
									<dt className="sr-only">Email</dt>
									<dd className="flex">
										<EnvelopeIcon
											aria-hidden="true"
											className="h-6 w-6 flex-shrink-0 text-gray-400"
										/>
										<span className="ml-3">support@example.com</span>
									</dd>
								</div>
							</dl>
							<p className="mt-6 text-base text-gray-500">
								Looking for careers?{" "}
								<a
									href="#"
									className="font-medium text-gray-700 underline"
								>
									View all job openings
								</a>
								.
							</p>
						</div>
					</div>
					<div className="bg-white px-6 py-2 lg:col-span-3 lg:px-8 lg:py-0 xl:pl-12 lg:pb-10">
						<div className="mx-auto max-w-lg lg:max-w-none">
							<form
								action="#"
								method="POST"
								className="mx-auto mt-0 max-w-xl sm:mt-0"
								onSubmit={handleSubmit}
							>
								<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
									<div>
										<label
											htmlFor="first-name"
											className="block text-sm font-semibold leading-6 text-gray-900  text-left"
										>
											First name
										</label>
										<div className="mt-2.5">
											<input
												id="first-name"
												name="first-name"
												type="text"
												autoComplete="given-name"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor="last-name"
											className="block text-sm font-semibold leading-6 text-gray-900  text-left"
										>
											Last name
										</label>
										<div className="mt-2.5">
											<input
												id="last-name"
												name="last-name"
												type="text"
												autoComplete="family-name"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-2">
										<label
											htmlFor="email"
											className="block text-sm font-semibold leading-6 text-gray-900  text-left"
										>
											Email
										</label>
										<div className="mt-2.5">
											<input
												id="email"
												name="email"
												type="email"
												autoComplete="email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									<div className="sm:col-span-2">
										<label
											htmlFor="phone-number"
											className="block text-sm font-semibold leading-6 text-gray-900  text-left"
										>
											Phone number
										</label>
										<div className="relative mt-2.5">
											<input
												id="phone-number"
												name="phone-number"
												type="tel"
												autoComplete="tel"
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									<div className="sm:col-span-2">
										<label
											htmlFor="company"
											className="block text-sm font-semibold leading-6 text-gray-900  text-left"
										>
											Subject
										</label>
										<div className="mt-2.5">
											<input
												id="company"
												name="company"
												type="text"
												autoComplete="organization"
												value={subject}
												onChange={(e) => setSubject(e.target.value)}
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									<div className="sm:col-span-2">
										<label
											htmlFor="message"
											className="block text-sm font-semibold leading-6 text-gray-900  text-left"
										>
											Message
										</label>
										<div className="mt-2.5">
											<textarea
												id="message"
												name="message"
												rows={4}
												value={message}
												onChange={(e) => setMessage(e.target.value)}
												className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
								<div className="mt-10">
									<button
										type="submit"
										className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-grey-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-900"
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
