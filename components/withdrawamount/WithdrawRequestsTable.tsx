"use client";
import React, { useState, useEffect } from "react";
import {
	useReactTable,
	getCoreRowModel,
	ColumnDef,
	flexRender,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
	useGetWithdrawRequest,
	useCancelWithdraw,
} from "@/reactQuery/mutation/home";
import { toast } from "sonner";

type WithdrawRequest = {
	id: string;
	amount: number;
	date: string;
	status: "pending" | "canceled" | "settled";
};

export const columns: ColumnDef<WithdrawRequest>[] = [
	{ accessorKey: "date", header: "Requested On" },
	{ accessorKey: "amount", header: "Amount" },
	{ accessorKey: "status", header: "Status" },
	{
		header: "Actions",
		accessorKey: "actions",
		cell: ({ row }) => {
			const status = row.original.status;

			if (status === "pending") {
				return <CancelButton requestId={row.original.id} />;
			}

			return null;
		},
	},
];

const CancelButton = ({ requestId }: { requestId: string }) => {
	const { refetch } = useGetWithdrawRequest();
	const {
		refetch: withdraw,
		isLoading,
		isError,
	} = useCancelWithdraw(requestId);

	const handleCancelClick = async () => {
		try {
			await withdraw();
			refetch();

			toast.success("Request Canceled", {
				description: "Your withdrawal request has been successfully canceled.",
			});
		} catch (error) {
			toast.error("Failed to cancel", {
				description:
					"There was an issue canceling the request. Please try again.",
			});
			console.error("Failed to cancel request:", error);
		}
	};

	return (
		<button
			onClick={handleCancelClick}
			disabled={isLoading}
			className="bg-red-500 text-white py-1 px-3 rounded"
		>
			{isLoading ? "Canceling..." : "Cancel"}
		</button>
	);
};

export function WithdrawTable() {
	const { data, isLoading, isError, error, refetch } = useGetWithdrawRequest();
	const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>(
		[]
	);

	useEffect(() => {
		if (data?.success?.requests) {
			const transformedData = data.success.requests
				.map((request: any) => ({
					id: request.id.toString(),
					amount: parseFloat(request.amount),
					date: new Date(request.created_at).toISOString().split("T")[0],
					status: request.status.toLowerCase() as
						| "pending"
						| "canceled"
						| "settled",
					created_at: new Date(request.created_at), // keep original date for sorting
				}))
				.sort((a, b) => b.created_at.getTime() - a.created_at.getTime()); // newest first

			setWithdrawRequests(transformedData);
		}
	}, [data]);

	const handleCancelUpdate = (requestId: string) => {
		setWithdrawRequests((prevRequests) =>
			prevRequests.filter((request) => request.id !== requestId)
		);
	};

	const table = useReactTable({
		data: withdrawRequests,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="overflow-x-auto rounded-md border">
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
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
						</tr>

						<tr>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
						</tr>

						<tr>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
						</tr>

						<tr>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
							<td className="p-4">
								<Skeleton className="rounded h-3 w-full" />
							</td>
						</tr>
						{/* You can add more skeleton rows here if you want */}
					</tbody>
				</table>
			) : isError ? (
				<p>Error: {error.message}</p>
			) : (
				<Table className="min-w-full bg-white border border-gray-200">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="text-center"
								>
									No data available.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
