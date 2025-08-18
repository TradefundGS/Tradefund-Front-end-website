import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import RelativeTime from "./RelativeTime";
import { z } from "zod";

const investorSchema = z.object({
	id: z.string().or(z.number()).transform(String),
	created_at: z.string(),
	amount: z
		.union([z.string(), z.number()])
		.transform((val) => Number(val) || 0),
	preference: z
		.enum(["Visible", "Hide Name", "Hide Amount", "Anonymous"])
		.optional(),
	user: z
		.object({
			name: z.string().optional(),
			email: z.string().optional(),
			profile_image: z.string().optional(),
		})
		.optional(),
});

const dataSchema = z.object({
	success: z
		.object({
			investors: z.array(investorSchema).optional(),
		})
		.optional(),
});

const schema = z.object({
	id: z.any(),
	data: dataSchema,
});

type TabTwoContentProps = z.infer<typeof schema>;
const MEDIA_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;

const TabTwoContent: React.FC<TabTwoContentProps> = ({ data }) => {
	const [investors, setInvestors] = useState<z.infer<typeof investorSchema>[]>(
		[]
	);

	useEffect(() => {
		if (data.success?.investors) {
			const sortedInvestors = [...data.success.investors].sort(
				(a, b) =>
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
			);
			setInvestors(sortedInvestors);
		} else {
			setInvestors([]);
		}
	}, [data]);

	const getDisplayData = (investor: z.infer<typeof investorSchema>) => {
		const pref = investor.preference || "Visible";

		let displayName = investor.user?.name || "Unknown User";
		let displayEmail = investor.user?.email || "";
		let displayAmount = investor.amount;

		if (pref === "Hide Name") {
			displayName = "Anonymous";
			displayEmail = "";
		} else if (pref === "Hide Amount") {
			displayAmount = null;
		} else if (pref === "Anonymous") {
			displayName = "Anonymous";
			displayEmail = "";
			displayAmount = null;
		}

		return { displayName, displayEmail, displayAmount };
	};

	return (
		<div>
			{investors.length > 0 ? (
				investors.map((investor) => {
					const { displayName, displayEmail, displayAmount } =
						getDisplayData(investor);

					return (
						<div
							key={investor.id}
							className="flex items-center gap-4 border hover:border-primary p-4 rounded-lg mb-4 hover:bg-white transition"
						>
							{/* Avatar */}
							<Avatar className="h-10 w-10">
								<AvatarImage
									src={
										investor.user?.profile_image
											? `${MEDIA_BASE_URL}${investor.user.profile_image}`
											: "/avatar.jpeg"
									}
									alt={displayName}
									className="object-cover"
								/>
								<AvatarFallback className="bg-gray-300 text-sm font-semibold">
									{displayName.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>

							{/* User Info */}
							<div className="grid gap-1">
								<div className="flex items-center gap-2">
									<p className="text-sm font-medium leading-none">
										{displayName}
									</p>
									<span className="text-xs text-muted-foreground">
										<RelativeTime date={investor.created_at} />
									</span>
								</div>
								{displayEmail && (
									<p className="text-xs text-muted-foreground">
										{displayEmail}
									</p>
								)}
							</div>

							{/* Amount */}
							{displayAmount !== null && (
								<div className="ml-auto font-medium">
									<Button>+${displayAmount}</Button>
								</div>
							)}
						</div>
					);
				})
			) : (
				<p className="text-sm text-gray-500 text-center">
					No investors available.
				</p>
			)}
		</div>
	);
};

export default TabTwoContent;
