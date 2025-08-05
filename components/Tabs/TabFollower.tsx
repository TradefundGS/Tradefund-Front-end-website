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
		if (data.success.followers) {
		  const sortedFollowers = data.success.followers.sort((a, b) => {
			return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
		  });
		  setFollowers(sortedFollowers);
		}
	  }, [data]);

	// console.log("follower", data);
	return (
		<>
			{followers && Array.isArray(followers) && followers.length > 0 ? (
				followers.map((follower) => (
					<div
						key={follower.id}
						className="flex items-center gap-4 border hover:border-primary p-4 rounded-lg mb-4 hover:bg-white"
					>
						{/* <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage
                                src={follower.user.profile_image ? `/${follower.user.profile_image}` : '/avatar.jpeg'}
                                alt="Avatar"
                            />
                            <AvatarFallback>{follower.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar> */}

						<Avatar className="hidden h-9 w-9 sm:flex">
							<AvatarImage
								src={
									follower.user.profile_image
										? `${MEDIA_BASE_URL}${follower.user.profile_image}`
										: "/avatar.jpeg"
								}
								alt="Avatar"
								className="object-cover"
							/>
							<AvatarFallback className="bg-gray-300 text-xl text-semibold">
								{follower.user.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="flex flex-col gap-1 w-full">
							<div className="flex items-center justify-between">
								<div className="flex flex-row gap-2">
									<p className="text-sm font-semibold leading-none">
										{follower.user.name}
									</p>
								</div>
								{/* <div className="ml-auto font-medium">5 years ago</div> */}
								<span className="text-sm text-muted-foreground">
									<RelativeTime date={follower.created_at} />
								</span>
							</div>
						</div>
					</div>
				))
			) : (
				<p>No Followers available.</p>
			)}
		</>
	);
};

export default TabThreeContent;
