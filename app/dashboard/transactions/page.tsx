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
import DataTableFilters from "@/components/myprojects/DataTableFilters";
import PaginationComponent from "@/components/myprojects/PaginationComponent";
import { Button } from "@/components/ui/button";
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

const formatDate = (dateString: string) => {
	if (!dateString) return "Invalid Date";
	let date;
	try {
		date = parseISO(dateString);
		return format(date, "MMM d");
	} catch (error) {
		console.error(`Error parsing date ${dateString}: ${error}`);
		return "Invalid Date";
	}
};

const MyTransactionPage: React.FC = () => {
	const [filter, setFilter] = React.useState("all");

	// Fetch data based on the current filter
	const { data, isLoading, isError, error } = useTransaction(filter);

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	// Map the API response to the Payment type
	const paymentsData: Payment[] = React.useMemo(() => {
		if (!data) return [];

		// Combine credit and debit transactions into a single list
		const creditTransactions = data.success.credeitAmount.map((payment) => ({
			id: payment.id.toString(),
			userId: payment.user_id,
			projectId: payment.project_id,
			amount: parseFloat(payment.amount),
			type: payment.type,
			comment: payment.comment,
			status: payment.status,
			createdAt: payment.created_at,
			updatedAt: payment.updated_at,
			creditAmount: parseFloat(payment.amount),
			debitAmount: "-",
		}));

		const debitTransactions = data.success.debitedAmount.map((payment) => ({
			id: payment.id.toString(),
			userId: payment.user_id,
			projectId: payment.project_id,
			amount: parseFloat(payment.amount),
			type: payment.type,
			comment: payment.comment,
			status: payment.status,
			createdAt: payment.created_at,
			updatedAt: payment.updated_at,
			creditAmount: "-",
			debitAmount: parseFloat(payment.amount),
		}));

		// Combine the lists into one array
		return [...creditTransactions, ...debitTransactions];
	}, [data]);

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
			header: <div className="flex items-center">
			<span>Comment</span>
			<BiSortAlt2 className="ml-1" /> 
		</div>,
			accessorKey: "comment",
		  },
		  {
			header:  (
				<div className="flex items-center">
					<span>Credit ($)</span>
					<BiSortAlt2 className="ml-1" /> 
				</div>
			) ,
			accessorKey: "creditAmount",
			cell: (info) => {
			  const value = info.getValue();
			  return value !== "-" ? (
				<div className="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
				  <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
			header: <div className="flex items-center">
			<span>Debit ($)</span>
			<BiSortAlt2 className="ml-1" /> 
		</div>,
			accessorKey: "debitAmount",
			cell: (info) => {
				const value = info.getValue();
				return value !== "-" ? (
				  
				   <div className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-800 rounded-full dark:bg-red-500/10 dark:text-red-500">
					 <svg class="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
		  {
			header: <div className="flex items-center">
			<span>Type</span>
			<BiSortAlt2 className="ml-1" /> 
		</div>,
			accessorKey: "type",
		  },
		  {
			header: <div className="flex items-center">
			<span>Status</span>
			<BiSortAlt2 className="ml-1" /> 
		</div>,
			accessorKey: "status",
		  },
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
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	

	if (isError) return <div>Error: {error.message}</div>;

	return (
		<>
			<AdminBar currentPage="/dashboard/transactions" />
			<div className="px-4 sm:px-6 lg:px-8 mb-8">
				<div className="-mx-4 mt-8 sm:-mx-0">
					<div className="min-w-full divide-y divide-gray-300 bg-white shadow overflow-hidden sm:rounded-lg">
						<div className="overflow-x-auto">
							<div className="bg-white divide-y divide-gray-200">
								<div className="px-6 py-4 sm:flex sm:items-center sm:justify-between">
									<div className="sm:flex sm:items-center">
										<div className="sm:flex-auto">
											<div className="text-lg font-semibold text-gray-900">
												Transaction List
											</div>
											<div className="mt-2 text-sm text-gray-700">
												Detailed information about the transactions.
											</div>
										</div>
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
