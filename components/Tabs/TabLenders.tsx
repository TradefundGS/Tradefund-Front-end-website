import React, { useEffect, useState } from "react";
import { useAddComment } from "@/reactQuery/mutation/home";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";
import CommentItem from "./CommentItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileVideo2 } from "lucide-react";

const schema = z.object({
	description: z.any(),
	comment: z.string().min(1, "The comment field is required."),
	private: z.boolean(),
});
const MEDIA_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;
type TabOneContentProps = {
	data: {
		success?: {
			investors?: {
				id: string;
				created_at: string;
				user: {
					name: string;
					email: string;
					profile_image?: string;
				};
				amount: number;
			}[];
			project?: {
				id: string;
				project_description: string;
				video_url?: string;
			};
			comments?: {
				id: string;
				comment: string;
				created_at: string;
				user: {
					name: string;
					profile_image?: string;
				};
			}[];
			user?: {
				name: string;
				profile_image?: string;
			};
		};
	};
	refetch: () => void;
};

const TabOneContent: React.FC<TabOneContentProps> = ({ data, refetch }) => {
	const { mutate, isLoading } = useAddComment();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			private: false,
		},
	});
	const project = data?.success?.project;
	const video_url = project?.video_url;
	const { project_description } = project || {};

	const isPrivate = watch("private");

	const onSubmit = (formData: any) => {
		const projectId = project?.id;
		const fullData = {
			...formData,
			projectId,
			privateValue: isPrivate ? "Yes" : "No",
		};

		console.log(fullData);

		mutate(fullData, {
			onSuccess: (responseData) => {
				toast.success("Comment added!", {
					description:
						responseData.success.message ||
						"Your comment has been posted successfully.",
				});
				refetch();
				reset();
			},
			onError: (error) => {
				toast.error("Error posting comment", {
					description:
						error?.error?.message || "There was an error posting your comment.",
				});
			},
		});
	};

	const [activity, setActivity] = useState<Comment[]>([]);

	useEffect(() => {
		if (data?.success?.comments) {
			const commentArray =
				Object.values(data?.success?.comments)?.map((comment) => ({
					...comment,
					type: "commented",
				})) || [];

			// Sort comments by created_at in descending order
			commentArray.sort(
				(a, b) =>
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
			);

			setActivity(commentArray);
		}
	}, [data]);

	console.log(data?.success?.comments);
	return (
		<>
			<div className="bg-gray-100 sm:rounded-lg">
				<div className="px-4 py-5 sm:p-6">
					<h2 className="text-base font-semibold leading-6 text-gray-900">
						About Project
					</h2>
					<p>{project_description}</p>
					<div className="mt-2 max-w-xl text-sm text-gray-500 font-semibold">
						<p>Media and other</p>
						<div className="flex justify-between items-center flex-wrap py-3.5">
							<div className="flex items-center gap-3">
								<FileVideo2 />
								<span className="inline-block text-default-600 text-sm font-medium">
									Video URL
								</span>
							</div>
							<div className="text-sm text-primary bg-default-100 dark:bg-default-50 py-1.5 px-1.5 rounded">
								{video_url ? (
									<a
										href={video_url}
										target="_blank"
										rel="noopener noreferrer"
									>
										Watch
									</a>
								) : (
									"Not available"
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className="bg-gray-100 sm:rounded-lg mt-5"
				id="comment"
			>
				<div className="px-4 py-5 sm:p-6">
					<h1 className="text-xl font-semibold text-gray-900">Comment</h1>
					<div className="my-4 flex flex-col sm:flex-row gap-4">
						<div className="flex-shrink-0">
							{data?.success?.user?.profile_image ? (
								<Image
									src={`${MEDIA_BASE_URL}${data.success.user.profile_image}`}
									alt="User Avatar"
									className="rounded-full border h-12 border-gray-300 object-cover"
									width={48}
									height={48}
									onError={(e) => {
										e.currentTarget.src = "/avatar.jpeg";
									}}
								/>
							) : (
								<Avatar>
									<AvatarFallback className="bg-gray-300 text-xl text-semibold">
										{data?.success?.user?.name?.[0] || "U"}
									</AvatarFallback>
								</Avatar>
							)}
						</div>

						<div className="flex-1">
							<form
								className="space-y-4"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div>
									<textarea
										id="comment-text"
										{...register("comment")}
										rows={4}
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
										placeholder="Enter your comment here..."
									/>
									{errors.comment && (
										<p className="text-red-500 text-sm">
											{errors.comment.message}
										</p>
									)}
								</div>
								<div className="flex items-center space-x-2">
									<input
										type="checkbox"
										id="private"
										{...register("private")}
										className="peer"
									/>
									<label
										htmlFor="private"
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										Private Comment
									</label>
								</div>
								<button
									type="submit"
									className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
									disabled={isLoading}
								>
									{isLoading ? "Posting..." : "Post Comment"}
								</button>
							</form>
						</div>
					</div>
					{activity.length > 0 ? (
						activity.map((comment) => (
							<CommentItem
								key={comment.id}
								comment={comment}
							/>
						))
					) : (
						<p>No Comments available.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default TabOneContent;
