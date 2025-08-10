"use client";

import {
	ChevronDownIcon,
	ChevronUpIcon,
	ChevronRightIcon,
	BuildingOfficeIcon,
	CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import { useState } from "react";

// Borrower steps with descriptions
const BORROWER_STEPS = [
	{
		title: "Market with unmet need",
		description:
			"Identify and describe a market opportunity that is not currently being met.",
	},
	{
		title: "Idea to meet the need",
		description:
			"Develop a unique and viable solution or product to address the identified market need.",
	},
	{
		title: "At the right price",
		description:
			"Determine a competitive and profitable pricing strategy for your product or service.",
	},
	{
		title: "Ability to access market",
		description:
			"Outline your strategy for reaching and engaging your target audience effectively.",
	},
	{
		title: "Capital funding at preferred terms",
		description:
			"Secure the necessary capital to execute your plan on terms that are favorable to your business.",
	},
];

// Lender steps with descriptions
const LENDER_STEPS = [
	{
		title: "People",
		description:
			"Assess the team and leadership behind the business, their experience, and their vision.",
	},
	{
		title: "Process",
		description:
			"Review the operational workflows and systems that ensure efficiency and quality.",
	},
	{
		title: "Data",
		description:
			"Analyze financial reports and supplemental information to make an informed decision.",
	},
	{
		title: "Technology",
		description:
			"Evaluate the technological infrastructure and tools used to drive business success.",
	},
	{
		title: "Security",
		description:
			"Confirm the measures in place to protect the transaction and your investment.",
	},
];

const faqs = [
	{
		question: "How Tradefund works?",
		answer: (
			<>
				Tradefund provides a platform which cultivates high degrees of accuracy
				in matching lenders with borrowers who engage in a sorely needed method
				of lending capital to borrowers on mutual terms.
			</>
		),
	},
	{
		question: "Is lending and borrowing on Tradefund safe?",
		answer: (
			<>
				By engaging in Tradefund, lenders and borrowers mitigate a vast amount
				of non-systemic risks resulting in an excellent debt product with higher
				returns on the capital in focused sectors that lenders are interested
				in. By putting technological utilities and stringent guardrails on the
				participants and their data, Tradefund enables individuals to lend money
				directly to prospective borrowers in a seamless manner without the
				involvement of the banks and FIs. Default risk is considered the highest
				concern.
				<br />
				<br />
				<strong>Tradefund for borrowers:</strong> Borrowers now have a
				remarkable alternative platform to raise the capital needed to achieve
				objectives at any level in their business models. At Tradefund, our
				standards go beyond conventional forms of risk analysis. We reach for
				supplemental data that could make the difference in great ideas
				accessing capital or being denied in conventional spaces that pass on
				well founded value propositions.
				<br />
				<br />
				If you’re ready to match your business to the right lender, start
				registering below.
				<br />
				<strong>Need a Loan:</strong> In the contemporary banking and private
				equity market, matching business models and ideas with ideal potential
				lenders and borrowers is challenging if not harmful to growth and
				innovation in many industries and sectors. Thus, we launched Tradefund
				to improve opportunities for both lenders and borrowers. Tradefund is an
				RBI licensed NBFC-P2P lending marketplace where pre-verified potential
				lenders and pre-verified, creditworthy borrowers connect and pursue
				bilateral transactions. Tradefund’s platform enhances the chances of
				alliances and partnerships amongst lenders and borrowers come to life.
				We also help in strengthening repayment.
				<br />
				<br />
				<strong>Registering with Tradefund:</strong> Any resident above 21 years
				age can register with Tradefund. Registration happens after complete
				verification cutting edge review of KYC, AML, legal and financial data
				under Tradefund’s stringent guidelines are satisfied, thus promoting
				confidence, authenticity, and prudent agreements between participants.
				<a
					href="/auth/register"
					className="inline-block mt-10 rounded-lg bg-primary px-6 py-3 text-white font-semibold shadow-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
				>
					Get Started Now
				</a>
			</>
		),
	},
	{
		question: "How transactions settle at Tradefund?",
		answer: (
			<>
				Once registered with Tradefund, borrowers and lenders can engage in open
				proposals to each other based upon the purpose and use of funds, amount,
				preferred interest rate, term etc. Moreover, they could openly engage in
				ideas which may result in recurring business or lasting alliances.
				Proposals are accepted, rejected, renegotiated, or countered. Both
				borrowers and lenders can secure multiple deals in a variety of
				structures simultaneously.
				<br />
				<br />
				The entire procedure is bound by iron clad discretion and without any
				intervention from Tradefund. The participants sign a formal contract
				after reaching an agreement, followed by a funds transfer to the
				borrower's bank account.
				<br />
				<br />
				Repayment can be made and tracked through Tradefund through a variety of
				payment methods and rails.
			</>
		),
	},
	{
		question: "Disclaimer",
		answer: (
			<>
				Tradefund does not play any role in any of the bilateral transactions;
				we only charge a fee for our services.
				<br />
				<br />
				<strong>What are Tradefund’s services?</strong> We verify each Lender
				and Borrower at the time of registration. This ensures that the
				information that you see on our website about each member is
				authenticated to the best of Tradefund’s capabilities. For both, we
				collect personal, corporate, financial, legal and supplemental
				information of interest from each potential participant.
				<br />
				<br />
				Once borrower and lenders come to a mutual agreement, Tradefund will
				help them legalize the transaction by signing a formal contract. We make
				necessary provisions and help both parties realize the deal without the
				necessity of a physical meeting.
				<br />
				<br />
				Once a loan is disbursed, we help lenders with the collection and
				recovery of loans as per official guidelines of RBI for banks and
				financial institutions. Delay in repayment by borrowers draws a penalty
				that is pursued by Tradefund as part of the process.
				<br />
				<br />
				At Tradefund we do not collect money deposits from either borrowers or
				lenders. All transactions are executed directly between the participants
				that entered into the agreement.
				<br />
				<br />
				Decisions to lend on Tradefund are entirely at the discretion of
				potential lenders. We do not guarantee fixed or minimum rate of returns
				to any lenders.
				<br />
				<br />
				For further details, please read Tradefund’s Terms of Use and Privacy
				Policy.
				<br />
				<br />
				Tradefund does not give any financial advice or recommendations to
				either borrowers or lenders on this platform. We encourage participants
				to research each potential borrower or lender and arrive at an informed
				decision prior to transacting accordingly, free of any coercion or
				influence from us.
				<br />
				<br />
				If you have inquiries, feel free to email us at
				<a
					href="mailto:support@tradefund.com"
					className="text-indigo-600 underline ml-1"
				>
					support@tradefund.com
				</a>
			</>
		),
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function HowItWorks() {
	return (
		<div className="bg-white antialiased">
			{/* Header Section */}
			<div className="bg-gray-50 py-24 sm:py-32">
				<div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
						How it works
					</h2>
					<p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
						Tradefund provides a transparent and secure platform for borrowers
						and lenders to connect and engage in mutually beneficial
						transactions.
					</p>
				</div>
			</div>

			{/* Main "How It Works" Section */}
			<div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
					{/* Borrower Card */}
					<div className="rounded-3xl bg-indigo-50 p-8 shadow-xl transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl">
						<div className="flex items-center gap-x-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600">
								<BuildingOfficeIcon
									className="h-6 w-6 text-white"
									aria-hidden="true"
								/>
							</div>
							<h3 className="text-2xl font-bold text-gray-900">
								Tradefund for Borrowers
							</h3>
						</div>
						<p className="mt-4 text-base text-gray-700">
							Borrowers now have a remarkable alternative platform to raise the
							capital needed to achieve objectives at any level in their
							business models.
						</p>
						<ul
							role="list"
							className="mt-8 space-y-6"
						>
							{BORROWER_STEPS.map((step, index) => (
								<li
									key={index}
									className="flex items-start gap-x-4"
								>
									<div className="flex-none text-indigo-600">
										<ChevronRightIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</div>
									<div className="flex flex-col">
										<h4 className="text-lg font-semibold text-gray-900">
											{step.title}
										</h4>
										<p className="mt-1 text-sm text-gray-600">
											{step.description}
										</p>
									</div>
								</li>
							))}
						</ul>
						<a
							href="create"
							className="mt-10 block w-full rounded-full bg-indigo-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Start Borrowing
						</a>
					</div>

					{/* Lender Card */}
					<div className="rounded-3xl bg-gray-50 p-8 shadow-xl transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl">
						<div className="flex items-center gap-x-4">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
								<CurrencyDollarIcon
									className="h-6 w-6 text-white"
									aria-hidden="true"
								/>
							</div>
							<h3 className="text-2xl font-bold text-gray-900">
								Tradefund for Lenders
							</h3>
						</div>
						<p className="mt-4 text-base text-gray-700">
							We reach for supplemental data that could make the difference in
							great ideas accessing capital or being denied in conventional
							spaces.
						</p>
						<ul
							role="list"
							className="mt-8 space-y-6"
						>
							{LENDER_STEPS.map((step, index) => (
								<li
									key={index}
									className="flex items-start gap-x-4"
								>
									<div className="flex-none text-gray-900">
										<ChevronRightIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</div>
									<div className="flex flex-col">
										<h4 className="text-lg font-semibold text-gray-900">
											{step.title}
										</h4>
										<p className="mt-1 text-sm text-gray-600">
											{step.description}
										</p>
									</div>
								</li>
							))}
						</ul>
						<a
							href="invest"
							className="mt-10 block w-full rounded-full bg-gray-900 px-6 py-3 text-center text-lg font-semibold text-white shadow-sm transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
						>
							Start Lending
						</a>
					</div>
				</div>
			</div>

			<div className="bg-white py-20">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10 text-center">
						Frequently Asked Questions
					</h2>
					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<Disclosure key={index}>
								{({ open }) => (
									<div className="rounded-lg border border-gray-200 p-4">
										<Disclosure.Button className="flex w-full justify-between items-center text-left text-lg font-medium text-gray-900">
											{faq.question}
											<ChevronUpIcon
												className={`${
													open ? "rotate-180" : ""
												} h-5 w-5 text-gray-500 transition-transform`}
											/>
										</Disclosure.Button>
										<Disclosure.Panel className="mt-3 text-gray-600 text-sm leading-relaxed">
											{faq.answer}
										</Disclosure.Panel>
									</div>
								)}
							</Disclosure>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
