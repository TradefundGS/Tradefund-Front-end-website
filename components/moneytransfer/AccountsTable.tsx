import { useState, useEffect } from "react";
import { AccountActions } from "./AccountActions";
import { useGetBankAccount, useMakePrimary } from "@/reactQuery/mutation/home";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
interface Account {
	id: number;
	name: string;
	bank_name: string;
	account_number: string;
	ifsc_code: string;
	primary: string;
}

interface AccountsTableProps {
	onDelete: (index: number) => void;
	onMakePrimary: (index: number) => void;
}

export function AccountsTable({ onDelete }: AccountsTableProps) {
	const { data, isLoading, isError, error, refetch } = useGetBankAccount();

	const makePrimaryMutation = useMakePrimary({
		onSuccess: () => {
			toast.success("Bank Account primary status updated successfully!");
			refetch()
		},
		onError: (error) => {
			console.log(error);
			if (error?.response?.data?.error?.message) {
				toast.error(error.response.data.error.message);
			} else {
				toast.error("An error occurred while updating the account.");
			}
		},
	});

	// Parse accounts data from the API response
	const accounts = data?.success?.accounts || [];

	// Function to handle toggling of the primary status
	const handleMakePrimary = (index: number) => {
		const account = accounts[index];

		// Toggle primary status based on current value
		const newPrimaryStatus = account.primary === "Yes" ? "No" : "Yes";

		// Call the mutation function with the updated primary status
		makePrimaryMutation.mutate({
			id: account.id,
			primary: newPrimaryStatus,
		});
	};

	return (
		<div className="overflow-x-auto">
			{isLoading ? (
				<table className="min-w-full bg-white border border-gray-200">
				<thead>
					<tr>
						<th className="px-4 py-2 text-left">Name</th>
						<th className="px-4 py-2 text-left">Bank Name</th>
						<th className="px-4 py-2 text-left">Account Number</th>
						<th className="px-4 py-2 text-left">IFSC/SWIFT</th>
						<th className="px-4 py-2 text-left">Primary</th>
						<th className="px-4 py-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{/* Render skeletons for each column while loading */}
					<tr>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
					</tr>

					<tr>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
					</tr>

					<tr>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
					</tr>

					<tr>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
						<td className="px-4 py-2">
							<Skeleton className="rounded h-3 w-full" />
						</td>
					</tr>
					{/* You can add more skeleton rows here if you want */}
				</tbody>
			</table>
			) : isError ? (
				<p>Error loading accounts: {error?.message}</p>
			) : (
				<table className="min-w-full bg-white border border-gray-200">
					<thead>
						<tr>
							<th className="px-4 py-2 text-left">Name</th>
							<th className="px-4 py-2 text-left">Bank Name</th>
							<th className="px-4 py-2 text-left">Account Number</th>
							<th className="px-4 py-2 text-left">IFSC/SWIFT</th>
							<th className="px-4 py-2 text-left">Primary</th>
							<th className="px-4 py-2 ">Actions</th>
						</tr>
					</thead>
					<tbody>
						{accounts.map((account, index) => (
							<tr
								key={account.id}
								className="border-t border-gray-200"
							>
								<td className="px-4 py-2">{account.name}</td>
								<td className="px-4 py-2">{account.bank_name}</td>
								<td className="px-4 py-2">{account.account_number}</td>
								<td className="px-4 py-2">{account.ifsc_code}</td>
								<td className="px-4 py-2 ">
									{account.primary === "Yes" ? "Yes" : "No"}
								</td>
								<td className="px-4 py-2 text-center">
									<AccountActions
									accountId={account.id} refetch={refetch}
										onMakePrimary={() => handleMakePrimary(index)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
}
