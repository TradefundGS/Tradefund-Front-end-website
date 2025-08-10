import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const EmptyProject = () => {
	const investFeatures = [
		"View opportunities",
		"Select transaction",
		"Make your investment",
		"Realize your return",
	];

	return (
		<div className="mx-auto mt-6 bg-gray-50 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-6 lg:mx-0 lg:flex lg:max-w-none">
			<div className="p-8 sm:p-10 lg:flex-auto">
				<h3 className="text-2xl font-bold tracking-tight text-gray-900">
					Lender
				</h3>
				<p className="mt-6 font-medium text-base leading-7 text-gray-600">
					Earn the returns you’re looking for while engaging in specific
					projects that interest you!
				</p>
				<div className="mt-10 flex items-center gap-x-4">
					<h4 className="flex-none text-sm font-semibold leading-6 text-gray-900">
						How it works?
					</h4>
					<div className="h-px flex-auto bg-gray-100" />
				</div>
				<ul
					role="list"
					className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
				>
					{investFeatures.map((feature) => (
						<li
							key={feature}
							className="flex gap-x-3"
						>
							<CheckIcon
								aria-hidden="true"
								className="h-6 w-5 flex-none text-primary"
							/>
							{feature}
						</li>
					))}
				</ul>
			</div>
			<div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
				<div className="rounded-2xl bg-white py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
					<div className="mx-auto max-w-xs px-8">
						<p className="text-base font-semibold text-gray-600">
							Your Project, Your Way
						</p>
						<p className="mt-6 flex items-baseline justify-center gap-x-2">
							<span className="text-5xl font-bold tracking-tight text-gray-900">
								$0
							</span>
							<span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">
								Lisitng Fee
							</span>
						</p>
						<Link
							href="create"
							className="mt-10 block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Start Project
						</Link>
						<p className="mt-6 text-base leading-7 text-gray-600">
							Launch your project effortlessly with Tradefund.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmptyProject;
