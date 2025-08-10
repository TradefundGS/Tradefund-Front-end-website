"use client";

import * as React from "react";
import AdminBar from "@/components/AdminBar";
import { useTransaction } from "@/reactQuery/mutation/home";
import {
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import TableHeaderComponent from "@/components/myprojects/TableHeader";
import TableBodyComponent from "@/components/myprojects/TableBodyComponent";
import PaginationComponent from "@/components/myprojects/PaginationComponent";
import { BiSortAlt2 } from "react-icons/bi";
import { parseISO, format } from "date-fns";

export type Payment = {
	id: string;
	userId: string;
	projectId: string;
	amount: number;
	type: string;
	comment: string;
	status: string;
	createdAt: string;
	updatedAt: string;
	creditAmount: number | "-";
	debitAmount: number | "-";
};

/**
 * Safely formats a date string to "MMM d" (e.g., "Jan 5")
 */
const formatDate = (dateString: string) => {
	if (!dateString) return "Invalid Date";
	try {
		return format(parseISO(dateString), "MMM d");
	} catch {
		return "Invalid Date";
	}
};

const MyTransactionPage: React.FC = () => {
	const [filter, setFilter] = React.useState("all");

	const { data, isLoading, isError, error } = useTransaction(filter);

	const [sorting, setSorting] = React.useState<SortingState>([
		{ id: "createdAt", desc: true },
	]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	/**
	 * Transform API data into Payment[]
	 * Safely handles missing or malformed data
	 */
	const paymentsData: Payment[] = React.useMemo(() => {
		if (!data?.success) return [];

		if (process.env.NODE_ENV === "development") {
			console.log("📦 Raw API Data:", data.success);
		}

		const safeMap = (
			arr: any[] | undefined,
			type: "credit" | "debit"
		): Payment[] => {
			if (!Array.isArray(arr)) return [];
			return arr.map((payment) => ({
				id: String(payment?.id ?? ""),
				userId: payment?.user_id ?? "",
				projectId: payment?.project_id ?? "",
				amount: parseFloat(payment?.amount ?? 0),
				type: payment?.type ?? "",
				comment: payment?.comment ?? "",
				status: payment?.status ?? "",
				createdAt: payment?.created_at ?? "",
				updatedAt: payment?.updated_at ?? "",
				creditAmount:
					type === "credit" ? parseFloat(payment?.amount ?? 0) : "-",
				debitAmount: type === "debit" ? parseFloat(payment?.amount ?? 0) : "-",
			}));
		};

		return [
			...safeMap(data.success.credeitAmount, "credit"),
			...safeMap(data.success.debitedAmount, "debit"),
		];
	}, [data]);

	/**
	 * Table column definitions
	 */
	const columns = React.useMemo(
		() => [
			{
				header: (
					<div className="flex items-center">
						<span>Created At</span>
						<BiSortAlt2 className="ml-1" />
					</div>
				),
				accessorKey: "createdAt",
				cell: (info) => formatDate(info.getValue() as string),
			},
			{
				header: "Comment",
				accessorKey: "comment",
			},
			{
				header: "Credit ($)",
				accessorKey: "creditAmount",
				cell: (info) => {
					const value = info.getValue();
					return value !== "-" ? (
						<div className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
							<svg
								className="shrink-0 size-3"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
								<polyline points="16 7 22 7 22 13"></polyline>
							</svg>
							{value}.00
						</div>
					) : (
						"-"
					);
				},
			},
			{
				header: "Debit ($)",
				accessorKey: "debitAmount",
				cell: (info) => {
					const value = info.getValue();
					return value !== "-" ? (
						<div className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
							<svg
								className="shrink-0 size-3"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
								<polyline points="16 17 22 17 22 11"></polyline>
							</svg>
							{value}.00
						</div>
					) : (
						"-"
					);
				},
			},
			{ header: "Type", accessorKey: "type" },
			{ header: "Status", accessorKey: "status" },
		],
		[]
	);

	const table = useReactTable({
		data: paymentsData,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: { sorting, columnFilters, columnVisibility, rowSelection },
	});

	if (isError)
		return <div>Error: {String(error?.message ?? "Unknown error")}</div>;

	return (
		<>
			<AdminBar currentPage="/dashboard/transactions" />
			<div className="px-4 sm:px-6 lg:px-8 mb-8">
				<div className="-mx-4 mt-8 sm:-mx-0">
					<div className="min-w-full divide-y divide-gray-300 bg-white shadow overflow-hidden sm:rounded-lg">
						<div className="overflow-x-auto">
							<div className="bg-white divide-y divide-gray-200">
								<div className="px-6 py-4 flex items-center justify-between">
									<div>
										<h1 className="text-lg font-semibold text-gray-900">
											Transaction List
										</h1>
										<p className="mt-1 text-sm text-gray-700">
											Detailed information about the transactions.
										</p>
									</div>
								</div>
								<div className="px-6 py-4">
									<Table className="min-w-full divide-y divide-gray-300">
										<TableHeaderComponent
											headerGroups={table.getHeaderGroups()}
											toggleSorting={(column) =>
												column.toggleSorting(column.getIsSorted() === "asc")
											}
										/>
										<TableBodyComponent
											className="divide-y divide-gray-200 bg-white"
											rows={table.getRowModel().rows}
											columns={table.getAllColumns()}
											isLoading={isLoading}
										/>
									</Table>
									<PaginationComponent
										canPreviousPage={table.getCanPreviousPage()}
										canNextPage={table.getCanNextPage()}
										previousPage={table.previousPage}
										nextPage={table.nextPage}
										selectedRowCount={Object.keys(rowSelection).length}
										rowCount={table.getCoreRowModel().rows.length}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MyTransactionPage;
