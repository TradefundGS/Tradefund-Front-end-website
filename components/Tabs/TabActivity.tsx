import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RelativeTime from "./RelativeTime";

const MEDIA_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;

const TabActivity: React.FC<{ data: any }> = ({ data }) => {
	const [activity, setActivity] = useState<any[]>([]);

	useEffect(() => {
		let investorArray: any[] = [];
		let commentArray: any[] = [];
		let followerArray: any[] = [];

		// Investors
		if (data?.investors) {
			investorArray = data.investors.map((investor: any) => ({
				id: investor.id,
				created_at: investor.created_at,
				user: investor.user,
				type: "Invested",
				message: `Invested $${investor.amount.toLocaleString()}`,
			}));
		}

		// Comments
		if (data?.comments) {
			commentArray = data.comments.map((comment: any) => ({
				id: comment.id,
				created_at: comment.created_at,
				user: comment.user,
				type: "Commented",
				message: comment.comment,
			}));
		}

		// Followers
		if (data?.followers) {
			followerArray = data.followers.map((follower: any) => ({
				id: follower.id,
				created_at: follower.created_at,
				user: follower.user,
				type: "Followed",
				message: "Started following this project",
			}));
		}

		// Merge & Sort
		let resultArray = [...investorArray, ...commentArray, ...followerArray];
		resultArray.sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		);

		setActivity(resultArray);
	}, [data]);

	return (
		<div className="space-y-4">
			{activity.length > 0 ? (
				activity.map((item) => (
					<div
						key={item.id}
						className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition"
					>
						{/* Avatar */}
						<Avatar className="h-12 w-12">
							<AvatarImage
								src={
									item.user.profile_image
										? `${MEDIA_BASE_URL}${item.user.profile_image}`
										: "/avatar.jpeg"
								}
								alt="User"
								className="object-cover"
							/>
							<AvatarFallback className="bg-gray-300 text-lg font-semibold">
								{item.user.name.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						{/* Content */}
						<div className="flex-1">
							<div className="flex items-center justify-between">
								<p className="text-sm font-semibold text-gray-900">
									{item.user.name}
								</p>
								<span className="text-xs text-gray-500">
									<RelativeTime date={item.created_at} />
								</span>
							</div>

							<p className="mt-1 text-sm text-gray-700">{item.message}</p>

							<span
								className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${
									item.type === "Commented"
										? "bg-blue-100 text-blue-700"
										: item.type === "Invested"
										? "bg-green-100 text-green-700"
										: "bg-purple-100 text-purple-700"
								}`}
							>
								{item.type}
							</span>
						</div>
					</div>
				))
			) : (
				<p className="text-sm text-gray-500 text-center">
					No activity available yet.
				</p>
			)}
		</div>
	);
};

export default TabActivity;
