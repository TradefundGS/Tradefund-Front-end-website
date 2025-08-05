import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import RelativeTime from "./RelativeTime";
import { z } from "zod";

const investorSchema = z.object({
	id: z.string(),
	created_at: z.string(),
	amount: z.number(),
	user: z.object({
		name: z.string(),
		email: z.string(),
		profile_image: z.string().optional(),
	}),
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
			const sortedInvestors = data.success.investors.sort((a, b) => {
				return (
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
				);
			});
			setInvestors(sortedInvestors);
		}
	}, [data]);

	// console.log("Investors:", data.success?.investors);

	// console.log("Profile Image: ", investors.user.profile_image);
	// console.log("Name: ", investors.user.name);

	return (
		<div>
			{investors.length > 0 ? (
				investors.map((investor) => (
					<div
						key={investor.id}
						className="flex items-center gap-4 border hover:border-primary p-4 rounded-lg mb-4 hover:bg-white"
					>
						{/* <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage
                                src={investor.user.profile_image ? `/${investor.user.profile_image}` : '/avatar.jpeg'}
                                alt="Avatar"
                            />
                            <AvatarFallback>{investor.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar> */}

						<Avatar className="hidden h-9 w-9 sm:flex">
							<AvatarImage
								src={
									investor.user.profile_image
										? `${MEDIA_BASE_URL}${investor.user.profile_image}`
										: ""
								}
								alt="Avatar"
								className="object-cover"
							/>
							<AvatarFallback className="bg-gray-300 text-xl text-semibold">
								{investor.user.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="grid gap-1">
							<div className="flex items-center gap-2">
								<p className="text-sm font-medium leading-none">
									{investor.user.name}
								</p>
								<span className="text-sm text-muted-foreground">
									<RelativeTime date={investor.created_at} />
								</span>
							</div>
							<p className="text-sm text-muted-foreground">
								{investor.user.email}
							</p>
						</div>
						<div className="ml-auto font-medium">
							<Button>+${investor.amount}</Button>
						</div>
					</div>
				))
			) : (
				<p>No investors available.</p>
			)}
		</div>
	);
};

export default TabTwoContent;
