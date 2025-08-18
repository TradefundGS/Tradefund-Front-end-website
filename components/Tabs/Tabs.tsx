import React, { useState } from "react";

import { z } from "zod";
import TabOneContent from "./TabLenders";
import TabTwoContent from "./TabTwoContent";
import TabThreeContent from "./TabFollower";
import TabActivity from "./TabActivity";

type Data = {
	success?: {
		investors?: {
			id: string;
			user: {
				name: string;
				email: string;
				profile_image?: string;
			};
			created_at: string;
			amount: number;
		}[];
		activity?: {
			comments: {
				id: string;
				user: {
					name: string;
					profile_image?: string;
				};
				created_at: string;
				comment: string;
			}[];
		};
	};
};

interface TabsProps {
	data: Data;
}

const tabs = [
	{ name: "Comments", id: "tab-one", count: "52" },
	{ name: "Lenders", id: "tab-two", count: "52" },
	{ name: "Followers", id: "tab-three", count: "52" },
	{ name: "Activity", id: "tab-four", count: "1" },
];

const Tabs: React.FC<TabsProps> = ({ data, refetch }) => {
	const [currentTab, setCurrentTab] = useState<string>(tabs[0].id);

	const renderContent = () => {
		switch (currentTab) {
			case "tab-one":
				return (
					<TabOneContent
						data={data}
						refetch={refetch}
					/>
				);
			case "tab-two":
				return <TabTwoContent data={data} />;
			case "tab-three":
				return <TabThreeContent data={data} />;
			case "tab-four":
				if (data.success?.activity) {
					return <TabActivity data={data.success} />;
				} else {
					return <p>No activity data available.</p>;
				}
			default:
				return null;
		}
	};

	return (
		<div className="mt-5">
			<nav
				aria-label="Tabs"
				className="flex divide-x divide-gray-200 rounded-lg shadow"
			>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => setCurrentTab(tab.id)}
						className={`${
							currentTab === tab.id
								? "text-gray-900"
								: "text-gray-500 hover:text-gray-700"
						} group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10`}
						role="tab"
						aria-selected={currentTab === tab.id}
					>
						<span>{tab.name}</span>
						<span
							aria-hidden="true"
							className={`${
								currentTab === tab.id ? "bg-primary" : "bg-transparent"
							} absolute inset-x-0 bottom-0 h-0.5`}
						/>
					</button>
				))}
			</nav>
			<div className="mt-4">{renderContent()}</div>
		</div>
	);
};

export default Tabs;
