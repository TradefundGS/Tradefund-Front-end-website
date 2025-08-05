import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RelativeTime from "./RelativeTime";
import { z } from "zod";

// Define the schema with the expected properties for comment
const commentSchema = z.object({
	id: z.string(),
	user: z.object({
		name: z.string(),
		profile_image: z.string().optional(),
	}),
	created_at: z.string(),
	comment: z.string(),
	type: z.string(),
});

type Comment = z.infer<typeof commentSchema>;

// Define the props type specifically for the CommentItem component
interface CommentItemProps {
	comment: Comment;
	isTaged?: boolean;
}
const MEDIA_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;
const CommentItem: React.FC<CommentItemProps> = ({
	comment,
	isTaged = false,
}) => {
	return (
		<div
			key={comment.id}
			className="flex items-center gap-4 border hover:border-primary p-4 rounded-lg mb-4 hover:bg-white"
		>
			<Avatar className="hidden h-9 w-9 sm:flex">
				<AvatarImage
					src={
						comment.user.profile_image
							? `${MEDIA_BASE_URL}${comment.user.profile_image}`
							: ""
					}
					alt="Avatar"
					className="object-cover"
				/>
				<AvatarFallback className="bg-gray-300 text-xl text-semibold">
					{comment.user.name.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
			<div className="flex flex-col gap-1 w-full">
				<div className="flex items-center justify-between">
					<div className="flex flex-row gap-2 align-center">
						<b className="">
							{comment.user.name}
						</b>
						{isTaged && (
							<span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">{comment.type}</span>

						)}
					</div>
					<span className="text-sm text-muted-foreground">
						<RelativeTime date={comment.created_at} />
					</span>
				</div>
				<p className="text-sm text-muted-foreground">{comment.comment}</p>
			</div>
		</div>
	);
};

export default CommentItem;
