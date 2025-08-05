"use client";

import { useState, useEffect } from "react";
import { useFollowProject, useProfile } from "@/reactQuery/mutation/home";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { toast } from "sonner";
import { ProjectProvider } from "./../contexts/ProjectContext";
import DateCounter from "./DateCounter";
import Tabs from "./Tabs/Tabs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import LendDrawer from "./LendDrawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from 'next/navigation';

const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;

interface ProjectDetailsProps {
	data: {
		success?: {
			project?: {
				project_image?: string;
				project_description?: string;
				needed_amount?: number;
				interest?: number;
				total_investment?: number;
				name?: string;
				pay_method?: string;
				end_date?: string;
				description?: string;
				description2?: string;
				description3?: string;
				description4?: string;
				video_url?:string;
			};
			user?: {
				name?: string;
			};
			project_count?: {
				id: string;
			};
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
		};
	};
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
	data,
	refetch,
}: any) => {
	const { isLoggedIn, getUserId } = useContext(AuthContext);
	const loggedInUserId = getUserId();
	const {
		data: profileData,
		isLoading: profileLoading,
		isError: profileError,
		error,
	} = useProfile();
	const router = useRouter(); 
	const handleLendClick = () => {
        if (!isLoggedIn) {
            router.push('/auth/login');
        } else {
            handleOpenDrawer(); 
        }
    };
	const handleFollowClick = () => {
        if (!isLoggedIn) {
            router.push('/auth/login'); 
        } else {
            handleFollow(); 
        }
    };


	console.log(data)

	const isKYCVerified = profileData?.user?.kyc_status === "Verified";

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleOpenDrawer = () => {
		if (isKYCVerified && loggedInUserId !== user.id) {
			setIsDrawerOpen(true);
		} else if (!isKYCVerified) {
			toast.error("Please complete the KYC verification before lending.");
		} else if (loggedInUserId === user.id) {
			toast.error("You cannot lend to your own project.");
		}
	};

	const handleCloseDrawer = () => setIsDrawerOpen(false);
	const [isFollowing, setIsFollowing] = useState(false);
	const [profileImageSrc, setProfileImageSrc] = useState<string | null>(null);
	const project = data?.success?.project;
	const investors = data?.success?.investors;
	const projectCount = data?.success?.project_count;
	const followingCount = data?.success?.followingCount;
	const investedCount = data?.success?.InvestedCount;
	const user = data?.success?.project?.user;
	const pay_method = data?.success?.project?.pay_method;

	const neededAmount = Number(project.needed_amount);
  const totalInvestment = Number(project.total_investment);
  const isFixedPaymentMethod = project.pay_method === "Fixed";
  
	// const user = data?.success?.user;

	const { mutate, isPending: isLoading } = useFollowProject();

	useEffect(() => {
		if (project) {
			setIsFollowing(project.is_following);
		}
	}, [project]);
	const onSubmit = () => {
		mutate(
			{ project_id: project?.id },
			{
				onSuccess: () => {
					// Toggle the following state
					setIsFollowing((prevIsFollowing) => !prevIsFollowing);
					refetch();
				},
				onError: (error) => {
					console.error("Error:", error.message);
				},
			}
		);
	};

	const handleFollow = () => {
		onSubmit();
	};

	if (!project || !investors) {
		return <div>Project data is not available.</div>;
	}

	const {
		project_image,
		project_description,
		needed_amount,
		interest,
		name,
		end_date,
		total_investment,
		tittle,
		video_url,
	} = project;

	const imageUrl = `${IMAGE_BASE_URL}${project_image || ""}`;
	const endDate = end_date || "";
	const investorCount = investors.length;
	const username = user.name;


	return (
		<ProjectProvider {...project}>
			<div className="bg-gray-50">
				<div className="pb-16 pt-6 sm:pb-24">
					<div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
						<div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
							{/* Main content */}
							<div className="lg:col-span-5 lg:col-start-8">
								<div className="space-y-4 border-b pb-4">
									<div className="flex justify-between items-center">
										<h1 className="text-sm font-medium text-gray-900">
											{investorCount} lenders 
										</h1>
										<div className="flex items-center">
											<DateCounter endDate={endDate} />
										</div>
									</div>

									<h2 className="text-3xl font-semibold text-gray-900">
										${total_investment}
									</h2>

									<p className="text-sm text-gray-700 font-semibold">
										Lend of ${needed_amount} goal
									</p>

									<p className="text-sm text-gray-700">{tittle}</p>

									<div className="text-sm font-medium text-gray-900">
										Interest Rate: {interest}%
									</div>
								</div>

								<div className="bg-gray-100 sm:rounded-lg">
									<div className="px-4 py-5 sm:p-6 mt-4 flex justify-between items-start gap-6">
										<div className="mt-2 max-w-xl text-sm text-gray-500 flex-1">
											<h3 className="text-base font-semibold leading-6 text-gray-900">
												{username}
											</h3>
											<div className="mt-4">
												<ul className="flex flex-wrap gap-4">
													<li className="flex items-center space-x-2">
														<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 ring-1 ring-blue-500/10">
															{projectCount}
														</span>
														<span className="text-lg font-medium text-gray-700">
															Projects Posted
														</span>
													</li>
													<li className="flex items-center space-x-2">
														<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 ring-1 ring-green-500/10">
															{investedCount}
														</span>
														<span className="text-lg font-medium text-gray-700">
															Projects Funded
														</span>
													</li>
													<li className="flex items-center space-x-2">
														<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 ring-1 ring-red-500/10">
															{followingCount}
														</span>
														<span className="text-lg font-medium text-gray-700">
															Following
														</span>
													</li>
												</ul>
											</div>
										</div>
										<div className="flex-shrink-0">
											<span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
												{user?.profile_image ? (
													<Image
														src={`${IMAGE_BASE_URL}${user?.profile_image}`}
														alt="User Avatar"
														className="rounded-full border h-12 border-gray-300 object-cover"
														width={48}
														height={48}
														onError={(e) => {
															e.target.onerror = null;
															e.target.src = "/avatar.jpeg";
														}}
													/>
												) : (
													<Avatar>
														<AvatarFallback className="bg-gray-300 text-xl">
															{name[0]}
														</AvatarFallback>
													</Avatar>
												)}
											</span>
										</div>
									</div>
								</div>

								<div className="mt-4">
									<div className="flex gap-4 justify-between">
									{/* <Button
                    type="button"
                    disabled={user?.id === loggedInUserId}
                    onClick={handleLendClick} // Use the updated handler
                    className="mb-2 text-white bg-primary w-2/3 hover:bg-gray-900 px-4 py-2 rounded-md"
                >
                    Lend Now
                </Button> */}
				{isFixedPaymentMethod && neededAmount === totalInvestment ? (
		<div>
		<span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
		  <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
			<path d="m9 12 2 2 4-4"></path>
		  </svg>
		  Goal reached!
		</span>
	  </div>
      ) : (
        <Button
          type="button"
          disabled={user?.id === loggedInUserId}
          onClick={handleLendClick}
          className="mb-2 text-white bg-primary w-2/3 hover:bg-gray-900 px-4 py-2 rounded-md"
        >
          Lend Now
        </Button>
      )}
                <LendDrawer
                    projectId={project.id}
                    open={isDrawerOpen}
                    onClose={handleCloseDrawer}
					refetch={refetch }
                />
                <Button
                    onClick={handleFollowClick} // Use the updated handler
                    className={`flex w-1/3 items-center justify-center rounded-md border px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                        isFollowing ? 'bg-primary text-white' : 'bg-gray-900 text-white'
                    }`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div
                            className="animate-spin inline-block h-5 w-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                            role="status"
                            aria-label="loading"
                        >
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : isFollowing ? (
                        <>
                            <GoHeartFill className="h-5 w-5 me-4 text-white" />
                            Unfollow
                        </>
                    ) : (
                        <>
                            <GoHeart className="h-5 w-5 me-4" />
                            Follow
                        </>
                    )}
                </Button>


					</div>

									{isLoggedIn&& <Tabs
										data={data}
										refetch={refetch}
									/>}
								</div>
							</div>

							{/* Image gallery */}
							<div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
  <h2 className="sr-only">Images</h2>
  <div className="sticky top-20">
    <div className="border border-gray-300 p-10 rounded-lg relative"> {/* Add relative here */}
      <Image
        src={imageUrl}
        alt="Project Image"
        width={700}
        height={1000}
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      
      {/* Pay Method Badge */}
      <span className="absolute top-2 right-2  inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-800 text-white dark:bg-white dark:text-neutral-800"> {pay_method}</span>
	  
    </div>
  </div>
</div>

						</div>
					</div>
				</div>
			</div>
		</ProjectProvider>
	);
};

export default ProjectDetails;
