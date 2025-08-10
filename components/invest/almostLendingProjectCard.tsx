import Image from "next/image";
import { RiMapPin5Line } from "react-icons/ri";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectCardProps {
	project: {
		project_image?: string;
		project_category?: number;
		tittle?: string;
		name?: string;
		project_description?: string;
		location?: string;
		investment_percentage?: number;
		total_investment?: number;
		needed_amount?: string;
		created_at?: string;
		id?: string;
		city?: string;
		country?: string;
		address?: string;
		user?: {
			profile_image?: string;
			name?: string;
			address?: string;
		};
		invest_users?: {
			profile_image?: string;
			name?: string;
		}[];
	};
}

const categoryNames: Record<number, string> = {
	1: "Export",
	2: "Import",
	3: "Pre-Shipment",
	4: "Post-Shipment",
	5: "Invoice",
	6: "Other",
};

const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

export default function AlmostLendingProjectCard({
	project,
}: ProjectCardProps) {
	const {
		project_image,
		address,
		project_category,
		tittle,
		name,
		investment_percentage = 0,
		total_investment = 0,
		created_at,
		user = {},
		invest_users = [],
	} = project;

	// ✅ Safe image URL
	const imageSrc =
		project_image && MEDIA_BASE_URL
			? `${MEDIA_BASE_URL}${project_image}`
			: "/placeholder.jpg"; // fallback placeholder

	const date = created_at ? new Date(created_at) : null;
	const formattedDate = date
		? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
		: "--";

	return (
		<Link href={`/project/${project.id || ""}`}>
			<Card className="bg-white rounded-lg overflow-hidden relative">
				<CardHeader className="relative pb-2">
					{/* Safe Image */}
					<Image
						src={imageSrc}
						alt={name || "Project image"}
						width={350}
						height={200}
						className="w-full h-48 object-cover rounded-lg"
					/>
					{/* Category */}
					<div className="text-grey-900">
						{categoryNames[project_category || 6]}
					</div>
					<CardTitle className="mt-4 min-h-10 truncate">
						{name || "Unnamed Project"}
					</CardTitle>
					<CardDescription className="text-gray-600">
						by {user.name || "Unknown"}
					</CardDescription>
				</CardHeader>

				<CardContent>
					<p className="text-gray-700 mt-2 line-clamp-2">
						{tittle || "No title available"}
					</p>
					<div className="flex items-center mt-4 text-gray-500">
						<RiMapPin5Line className="mr-2 w-5 h-5" />
						<p className="line-clamp-2 flex-1">
							{user.address || address || "Address not found"}
						</p>
					</div>
				</CardContent>

				{/* Investment info */}
				<div className="p-6 border-t border-b border-gray-200 relative">
					<div className="mb-4">
						<Progress
							value={Number(investment_percentage)}
							className="h-3"
						/>
					</div>
					<div className="flex justify-evenly text-gray-700">
						<div className="flex-1 text-start">
							<div className="text-lg font-semibold">
								{investment_percentage}%
							</div>
							<div className="text-sm text-gray-500">Funded</div>
						</div>
						<div className="flex-1 text-start">
							<div className="text-lg font-semibold">${total_investment}</div>
							<div className="text-sm text-gray-500">Pledged</div>
						</div>
						<div className="flex-1 text-start">
							<div className="text-lg font-semibold">{formattedDate}</div>
							<div className="text-sm text-gray-500">Lent on</div>
						</div>
					</div>
				</div>

				{/* Investors */}
				<div className="flex -space-x-1 py-4 pe-6 align-baseline justify-end">
					{invest_users.length > 0 ? (
						invest_users.map((inv, index) => (
							<div
								key={index}
								className="relative group cursor-pointer inline-block"
							>
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage
										src={
											inv.profile_image
												? `${MEDIA_BASE_URL}${inv.profile_image}`
												: "/avatar.jpeg"
										}
										alt={inv.name || "Investor"}
										className="object-cover"
									/>
									<AvatarFallback>{inv.name?.charAt(0) || "?"}</AvatarFallback>
								</Avatar>
								<div className="absolute left-1/2 transform -translate-x-1/2 bottom-full w-30 mb-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
									{inv.name || "Unknown"}
								</div>
							</div>
						))
					) : (
						<p className="min-h-9">No investors yet</p>
					)}
				</div>
			</Card>
		</Link>
	);
}
