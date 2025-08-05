"use client";

import { useEffect } from "react";
import { useProfile } from "@/reactQuery/mutation/home";
import { useRouter } from "next/navigation"; // make sure to import from 'next/router'
import { CircleAlert } from "lucide-react";

const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;



const ProfileCard = () => {
	const router = useRouter();
	const { data, isLoading, isError, error } = useProfile();
	console.log("profile",data);
	const userprofile = data?.user || {};
	const profileImage = `${IMAGE_BASE_URL}${userprofile.profile_image}`;

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error: {error.message}</div>;

	const profile = data?.user || {};

	const handleEditProfile = () => {
		router.push("/settings/edit-profile");
	};
	const relations = data?.relations || [];
    
    // Find the relationship status based on profile.relationship_status
    const relationshipStatus = profile.relationship_status
        ? relations.find(e => e.id === parseInt(profile.relationship_status))?.name || "N/A"
        : "N/A";


		const income = data?.incomeRange || [];
    
    // Find the relationship status based on profile.relationship_status
    const incomeStatus = profile.income_range
    ? income.find(e => e.id === parseInt(profile.income_range))?.name || "N/A"
    : "N/A";

	
	const education = data?.educations || [];
    
    // Find the relationship status based on profile.relationship_status
    const educationStatus = profile.income_range
    ? education.find(e => e.id === parseInt(profile.education))?.name || "N/A"
    : "N/A";

		



	return (
		<div className="overflow-hidden bg-white shadow sm:rounded-lg">
			{/* Card Header */}
			<div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
				<div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
					<div className="ml-4 mt-2">
						<h3 className="text-base font-semibold leading-6 text-gray-900">
							Profile Details
						</h3>
					</div>
					<div className="ml-4 mt-2 flex-shrink-0">
						<button
							type="button"
							onClick={handleEditProfile}
							className="relative inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-grey-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grey-600"
						>
							Edit Profile
						</button>
					</div>
				</div>
			</div>

			{/* Card Content */}
			<div className="border-t border-gray-100">
				<dl className="divide-y divide-gray-100">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<div className="col-span-full">
							<label
								htmlFor="photo"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Profile Image
							</label>
							<div className="mt-2 flex items-center gap-x-3">
								<img
									src={profileImage || "N/A"}
									className="inline-block h-14 w-14 rounded-full object-cover"
								/>
							</div>
						</div>
					</div>
					{/* Name */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Full Name</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.name || "N/A"}
						</dd>
					</div>

					{/* Email Address */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Email Address</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.email || "N/A"}
						</dd>
					</div>

					{/* Role */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Role</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.role || "N/A"}
						</dd>
					</div>

					{/* Wallet Balance */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">
							Wallet Balance
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							${profile.wallet_balance || "0.00"}
						</dd>
					</div>

					{/* Last Login */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Last Login</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.last_login_at
								? new Date(profile.last_login_at).toLocaleString()
								: "N/A"}
						</dd>
					</div>

					{/* Status */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Status</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.status || "N/A"}
						</dd>
					</div>

					{/* KYC Status */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">KYC Status</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.kyc_status || "N/A"}
						</dd>
					</div>

					{/* Created At */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Created At</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.created_at
								? new Date(profile.created_at).toLocaleString()
								: "N/A"}
						</dd>
					</div>

					{/* Updated At */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Updated At</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.updated_at
								? new Date(profile.updated_at).toLocaleString()
								: "N/A"}
						</dd>
					</div>

					{/* About Me */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">About Me</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.about_me || "N/A"}
						</dd>
					</div>

					{/* Account */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Account</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{data?.bank_detail?.bank_name || "N/A"}
						</dd>
					</div>

					{/* Bank Details */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Bank Details</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
	{profile && data.bank_detail ? (
		<>
			<div>Name: {data.bank_detail.name || "N/A"}</div>
			<div>Account Number: {data?.bank_detail?.account_number || "N/A"}</div>
			<div>Branch Name: {data.bank_detail.branch_name || "N/A"}</div>
			<div>IFSC Code: {data.bank_detail.ifsc_code || "N/A"}</div>
		</>
	) : (
		"N/A"
	)}
</dd>

					</div>

					{/* Address */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Address</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.address || "-"}
						</dd>
					</div>

					{/* Date of Birth */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Date of Birth</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.date_of_birth
								? new Date(profile.date_of_birth).toLocaleDateString()
								: "N/A"}
						</dd>
					</div>

					{/* Employment Status */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">
							Employment Status
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
		{profile.employment_status ? data?.employment.find(e => e.id === parseInt(profile.employment_status))?.name : "N/A"}
	</dd>
					</div>

					{/* Education Status */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">
						Education 
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
		{educationStatus}
	</dd>
					</div>

					{/* Income Range */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">
						Income Range
						</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
	{incomeStatus}
	</dd>
					</div>

					{/* Relationship Status */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-900">
                Relationship Status
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
			{relationshipStatus}
            </dd>
        </div>

					{/* Gender */}
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-900">Gender</dt>
						<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							{profile.gender || "N/A"}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

export default ProfileCard;
