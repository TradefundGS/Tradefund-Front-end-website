import React from "react";
import {
	BanknotesIcon,
	DocumentTextIcon,
	PresentationChartBarIcon,
	ShieldCheckIcon,
	CheckCircleIcon,
	ChatBubbleBottomCenterTextIcon,
	LightBulbIcon,
	ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

// A more refined color palette and modern icons
const ITEMS = [
	{
		id: "decks",
		title: "Examine Decks",
		description:
			"Review the presentation materials or decks related to the borrowers.",
		icon: PresentationChartBarIcon,
	},
	{
		id: "financial",
		title: "Required Financial & Legal Material",
		description:
			"Gather all necessary financial documents and legal agreements.",
		icon: DocumentTextIcon,
	},
	{
		id: "supplemental",
		title: "Supplemental Data",
		description:
			"Collect additional information that supports the borrowers’ and lenders’ profiles.",
		icon: BanknotesIcon,
	},
	{
		id: "compliance",
		title: "Compliance & AML Procedures",
		description:
			"Confirm that information has been vetted through compliance and AML processes before listing and during transactions.",
		icon: ShieldCheckIcon,
	},
];

const VALUES = [
	{
		title: "Adaptability",
		description:
			"Change is happening. Even due to the partnerships formed on this platform. We are always embracing that change and moreover, we expect our borrowers and lenders to join us in driving it!",
		icon: ArrowsRightLeftIcon,
	},
	{
		title: "Collaboration",
		description:
			"Promote open communication over our platform where investors and entrepreneurs work together to form alliances and cooperate. Faithfully seeking accomplishing shared objectives.",
		icon: ChatBubbleBottomCenterTextIcon,
	},
	{
		title: "Excellence",
		description:
			"We strive to set the highest standards in brokering the formation of partnerships between borrowers and lenders. We do not accommodate participants, data or utilities that aren’t proficient within guidelines that foster trust that is demonstrable.",
		icon: CheckCircleIcon,
	},
	{
		title: "Creativity",
		description:
			"Original thinking and problem solving in business is birthed when participants embrace creativity and think beyond conventional. Global business mindsets recognize the value of creativity the entrepreneurial ethos, business models or hidden within the ideas shared between participants.",
		icon: LightBulbIcon,
	},
];

// Reusable component for the feature list items
const FeatureCard = ({ icon: Icon, title, description }) => (
	<li className="flex items-start gap-6 p-6 rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
		<div className="flex-none p-3 rounded-full bg-indigo-50/50">
			<Icon
				className="h-6 w-6 text-indigo-600"
				aria-hidden="true"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
			<p className="mt-2 text-base text-gray-600">{description}</p>
		</div>
	</li>
);

// Reusable component for value propositions
const ValueCard = ({ icon: Icon, title, description }) => (
	<div className="flex flex-col gap-y-4">
		<div className="p-3 rounded-full bg-indigo-50 inline-flex self-start">
			<Icon
				className="h-6 w-6 text-indigo-600"
				aria-hidden="true"
			/>
		</div>
		<h3 className="text-xl font-bold text-gray-900">{title}</h3>
		<p className="text-base leading-7 text-gray-600">{description}</p>
	</div>
);

const AboutUs = () => {
	return (
		<div className="relative isolate overflow-hidden bg-white antialiased">
			{/* Hero Section */}
			<div className="mx-auto max-w-7xl px-6 pb-24 pt-24 lg:px-8 lg:py-40">
				<div className="lg:flex lg:items-center lg:gap-x-16">
					{/* Text content */}
					<div className="lg:flex-shrink-0 lg:max-w-xl">
						<span className="inline-flex space-x-6">
							<span className="rounded-full bg-indigo-100/50 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-200">
								About Us
							</span>
						</span>
						<h1 className="mt-8 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
							Welcome to Tradefund
						</h1>
						<p className="mt-6 text-lg leading-8 text-gray-700">
							Tradefund is the premier online platform which creates optimal
							conditions for lenders and borrowers to survey opportunities that
							are ultimately suitable for each other. Leveraging utilities that
							boost access to precise research which encourages confident
							engagement leading to conclusive results.
						</p>
					</div>

					{/* Image */}
					<div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:mt-0 lg:flex-shrink-0 lg:flex lg:justify-end xl:ml-32">
						<img
							alt="about"
							src="/pic1.jpg"
							className="rounded-3xl shadow-2xl ring-1 ring-gray-900/10 transition-transform duration-500 hover:scale-105"
						/>
					</div>
				</div>
			</div>

			{/* Methodology Section */}
			<div className="bg-gray-50 py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
						<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Methodology that amplifies successful opportunities
						</h2>
						<div className="mt-12 grid max-w-xl grid-cols-1 gap-12 text-base leading-7 text-gray-700 lg:max-w-none lg:grid-cols-2">
							<div>
								<p>
									Tradefund’s eco system is suitable for both lenders and
									borrowers focusing on opportunities at every stage. From start
									ups to high-growth phase enterprises. As a lender, you will be
									able to focus on opportunities that are in the sectors that
									you comprehend and master while meeting your target on
									returns.
								</p>
								<p className="mt-6">
									Examine decks, required financial and legal material plus
									supplemental data from borrowers actively participating in
									those sectors knowing that the information has been
									scrutinized by the most stringent compliance and AML
									procedures prior to being listed on our platform and
									throughout transactional undertakings between parties.
									Tradefund produces layers of confidence resulting from
									authenticating both participants, all available data, trusted
									utilities and adding transactional security features
									mitigating default and other non-systemic risks.
								</p>
							</div>
							<div>
								<ul
									role="list"
									className="space-y-6"
								>
									{ITEMS.map((item) => (
										<FeatureCard
											key={item.id}
											{...item}
											icon={item.icon}
										/>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Call to Action Section */}
			<div className="bg-gray-900 py-24 sm:py-32">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-800 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
						<h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
							Boost your productivity today.
						</h2>
						<p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
							Incididunt sint fugiat pariatur cupidatat consectetur sit cillum
							anim id veniam aliqua proident excepteur commodo do ea.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<a
								href="#"
								className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-colors hover:bg-gray-100"
							>
								Get started
							</a>
							<a
								href="#"
								className="text-sm font-semibold leading-6 text-white hover:underline"
							>
								Learn more <span aria-hidden="true">→</span>
							</a>
						</div>
						{/* Background gradient for visual depth */}
						<svg
							viewBox="0 0 1024 1024"
							aria-hidden="true"
							className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
						>
							<circle
								r={512}
								cx={512}
								cy={512}
								fill="url(#radial-gradient)"
								fillOpacity="0.7"
							/>
							<defs>
								<radialGradient id="radial-gradient">
									<stop stopColor="#6366F1" />
									<stop
										offset={1}
										stopColor="#E935C1"
									/>
								</radialGradient>
							</defs>
						</svg>
					</div>
				</div>
			</div>

			{/* Our Values Section */}
			<div className="mx-auto mt-32 max-w-7xl px-6 lg:px-8 pb-5">
				<div className="mx-auto ">
					<h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Our values
					</h2>
					<p className="mt-6 text-lg leading-8 text-gray-700">
						At Tradefund, integrity, performance, innovation and collaboration
						form an integral part of every feature that we develop and manage to
						act as a premier matchmaker for borrowers and lenders. Small, medium
						sized and businesses at the hyper growth level exist the broader
						trust the services available in our eco-system. We know their
						performance is often reliant upon the sustainable relationships that
						achieve access to capital making future frameworks possible. We are
						focused on assisting participants in discovering better paths
						forward by revealing true value propositions clearly and distinctly
						solve problems for clients in each industry. Without this,
						businesses will simply not experience the kind of growth an
						entrepreneur or investor is after.
					</p>
				</div>
				<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
					{VALUES.map((value, index) => (
						<ValueCard
							key={index}
							{...value}
							icon={value.icon}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
