"use client";

import { useState } from "react";
import { BasicDetails } from "./createProject/basicDetails";
import { DetailsForm } from "./createProject/detailsForm";
import { EligiblityCheck } from "./createProject/elgiblityCheck";
import { PaymentForm } from "./createProject/paymentForm";
import SuccessScreen from "./createProject/success";
import { WizardModal } from "./wizard";

export function CreateProjectForm() {
	const [data, setData] = useState({});
	console.log("hi2");
	const stages = [
		{
			name: "Eligibility",
			title: "",
			subtitle: "test",
			helpText: [],
			skippable: false,
			component: (
				<EligiblityCheck
					setData={setData}
					data={data}
				/>
			),
		},
		{
			name: "Basic",
			title: "",
			subtitle: "test",
			helpText: [],
			skippable: false,
			component: (
				<>
					<BasicDetails
						setData={setData}
						data={data}
					/>
				</>
			),
		},
		{
			name: "Information",
			title: "",
			subtitle: "test",
			helpText: [],
			skippable: false,
			component: (
				<>
					<DetailsForm
						setData={setData}
						data={data}
					/>
				</>
			),
		},
		{
			name: "Payment",
			title: "",
			subtitle: "test",
			helpText: [],
			skippable: false,
			component: (
				<>
					<PaymentForm
						setData={setData}
						data={data}
					/>
				</>
			),
		},
		{
			name: "Confirmation",
			title: "",
			subtitle: "test",
			helpText: [],
			skippable: false,
			component: (
				<>
					<SuccessScreen
						setData={setData}
						data={data}
					/>
				</>
			),
		},
	];

	return (
		<WizardModal
			handleComplete={() => {}}
			stages={stages}
			resetAll={() => {}}
		/>
	);
}
