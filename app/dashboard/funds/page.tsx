"use client";

import * as React from "react";
import Link from "next/link";
import { useFundLists } from "@/reactQuery/mutation/home";
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Table } from "@/components/ui/table";
import TableHeaderComponent from "@/components/myprojects/TableHeader";
import TableBodyComponent from "@/components/myprojects/TableBodyComponent";
import DataTableFilters from "@/components/myprojects/DataTableFilters";
import PaginationComponent from "@/components/myprojects/PaginationComponent";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TableSkeleton from "@/components/TableSkeleton";
import ActionMenu from "@/components/myprojects/ActionMenu";
import AdminBar from "@/components/AdminBar";
import { parse, format } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FundingActionMenu from "@/components/FundingActionMenu";


const FundingListPage: React.FC = () => {
	const [filter, setFilter] = React.useState("all");
  
	// Fetch data based on the current filter
	const { data, isLoading, isError, error } = useFundLists(filter);

  	console.log("myfunds", data)
	
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const convertDateFormat = (dateStr) => {
		const [day, month, year] = dateStr.split('/');
		return `${year}-${month}-${day}`; // returns date in YYYY-MM-DD format
	};
	
	const projectsData = React.useMemo(() => {
		if (!data) return [];
		
		const lendingList = data.success.lending_list;
  
    return lendingList.map((lending) => {
        const project = lending.project;
        const projectUser = lending.project_user;

        // Convert repaymentDate format if it's in DD/MM/YYYY
        const formattedRepaymentDate = lending.repayment_date 
            ? convertDateFormat(lending.repayment_date)
            : null;

        return {
            ...lending,
            name: project.name,
            borrower: projectUser.name,
            loanTerm: project.loan_terms,
            rate: project.interest,
            amountLent: project.needed_amount,
			capitalReturned: lending.capital_retuned
			? lending.capital_retuned.toFixed(2)
			: "0.00",
		interestReturned: lending.interest_returned
			? lending.interest_returned.toFixed(2)
			: "0.00",
		percentageRepaid: lending.percentage_returned
			? lending.percentage_returned.toFixed(2)
			: "0.00",
            repaymentDate: formattedRepaymentDate ? format(new Date(formattedRepaymentDate), 'yyyy-MM-dd') : formattedRepaymentDate,
            monthlyRepayment: lending.monthly_repayment
				? lending.monthly_repayment.toFixed(2)
				: "0.00",
            totalArrears: lending.total_arrears,
            status: project.status,
            actions: "-"
        };
    });
}, [data, filter]);
  
	const columns = React.useMemo(
	  () => [
		{ header: "Name", accessorKey: "name" },
		{ header: "Borrower", accessorKey: "borrower" },
		{ header: "Loan Term", accessorKey: "loanTerm" },
		{ header: "Rate", accessorKey: "rate" },
		{ header: "Amount Lent ($)", accessorKey: "amountLent" },
		{ header: "Capital Returned ($)", accessorKey: "capitalReturned" },
		{ header: "Interest Returned ($)", accessorKey: "interestReturned" },
		{ header: "Percentage Repaid", accessorKey: "percentageRepaid" },
		{ header: "Repayment Date", accessorKey: "repaymentDate" },
		{ header: "Monthly Repayment ($)", accessorKey: "monthlyRepayment" },
		{ header: "Total Arrears", accessorKey: "totalArrears" },
		{ header: "Status", accessorKey: "status" },
		{ 
            header: "Actions", 
            accessorKey: "actions", 
            cell: ({ row }) => <FundingActionMenu projectId={row.original.project.id} />
        },
	  ],
	  []
	);
  
	const table = useReactTable({
	  data: projectsData,
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
		<AdminBar  currentPage="/dashboard/funds" />
			<div className="px-4 sm:px-6 lg:px-8 mb-8">
				<div className="-mx-4 mt-8 sm:-mx-0">
					<div className="min-w-full divide-y divide-gray-300 bg-white shadow overflow-hidden sm:rounded-lg">
						<div className="overflow-x-auto">
							<div className="bg-white divide-y divide-gray-200">
								<div className="px-6 py-4 sm:flex sm:items-center sm:justify-between">
									<div className="sm:flex sm:items-center">
										<div className="sm:flex-auto">
											<div className="text-lg font-semibold text-gray-900">
												Project Lists
											</div>
											<div className="mt-2 text-sm text-gray-700">
												Detailed information about the project.
											</div>
										</div>
									</div>
									<div className="px-6 py-4 sm:flex sm:items-center gap-4 sm:justify-between">
										<div className="">
										<Select
						  value={filter}
						  onValueChange={(value) => setFilter(value)}
						>
						  <SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select Filter" />
						  </SelectTrigger>
						  <SelectContent>
							<SelectGroup>
							  <SelectLabel>Options</SelectLabel>
							  <SelectItem value="refunded">Refunded</SelectItem>
							  <SelectItem value="all">All</SelectItem>
							  <SelectItem value="lended">Lended</SelectItem>
							  <SelectItem value="canceled">Canceled</SelectItem>
							</SelectGroup>
						  </SelectContent>
						</Select>
										</div>
										<DataTableFilters
											emailFilterValue={
												(table.getColumn("name")?.getFilterValue() as string) ??
												""
											}
											onEmailFilterChange={(value) =>
												table.getColumn("name")?.setFilterValue(value)
											}
											columns={table.getAllColumns()}
											onColumnVisibilityChange={(columnId, value) =>
												table.getColumn(columnId)?.toggleVisibility(value)
											}
										/>
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
  


export default FundingListPage;
