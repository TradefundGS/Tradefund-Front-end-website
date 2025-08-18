import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RelativeTime from "./RelativeTime";
import { z } from "zod";

interface User {
	profile_image?: string;
	name: string;
}

interface Follower {
	id: string;
	user: User;
	created_at: string;
}

const schema = z.object({
	id: z.any(),
	data: z.any(),
});
type TabThreeContentProps = z.infer<typeof schema>;

const MEDIA_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;

const TabThreeContent: React.FC<TabThreeContentProps> = ({ data }) => {
	const [followers, setFollowers] = useState<Follower[]>([]);

	useEffect(() => {
		if (data?.success?.followers && Array.isArray(data.success.followers)) {
			// ✅ Clone first, then sort to avoid mutating original array
			const sortedFollowers = [...data.success.followers].sort(
				(a: Follower, b: Follower) =>
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
			);
			setFollowers(sortedFollowers);
		} else {
			setFollowers([]); // ✅ clear state if no followers
		}
	}, [data]);

	return (
		<>
			{followers.length > 0 ? (
				followers.map((follower) => (
					<div
						key={follower.id}
						className="flex items-center gap-4 border hover:border-primary p-4 rounded-lg mb-4 hover:bg-white transition"
					>
						{/* Avatar */}
						<Avatar className="h-10 w-10">
							<AvatarImage
								src={
									follower.user.profile_image
										? `${MEDIA_BASE_URL}${follower.user.profile_image}`
										: "/avatar.jpeg"
								}
								alt={follower.user.name}
								className="object-cover"
							/>
							<AvatarFallback className="bg-gray-300 text-sm font-semibold">
								{follower.user.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						{/* User Info */}
						<div className="flex flex-col gap-1 w-full">
							<div className="flex items-center justify-between">
								<p className="text-sm font-semibold text-gray-900">
									{follower.user.name}
								</p>
								<span className="text-xs text-muted-foreground">
									<RelativeTime date={follower.created_at} />
								</span>
							</div>
							<p className="text-xs text-gray-500">Started following</p>
						</div>
					</div>
				))
			) : (
				<p className="text-sm text-gray-500 text-center">
					No Followers available.
				</p>
			)}
		</>
	);
};

export default TabThreeContent;
