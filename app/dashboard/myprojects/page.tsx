"use client";

import * as React from "react";
import Link from "next/link";
import AdminBar from "@/components/AdminBar";
import { useMyProjects, useGetCreateProject } from "@/reactQuery/mutation/home";
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
import { ArrowDownUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
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
import ActionMenu from "@/components/myprojects/ActionMenu";

import { parseISO, format } from "date-fns";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type Payment = {
	id: string;
	name: string;
	collectedAmount: number;
	neededAmount: number;
	lenders: string;
	terms: string;
	lendingDateStart: string;
	lendingDateEnd: string;
	fixedLending: string;
	status: string;
	followers: number;
	comments: number;
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
const formatEndDate = (dateString: string) => {
	if (!dateString) return "Invalid Date";
	const [day, month, year] = dateString.split("/");
	const date = new Date(`${year}-${month}-${day}`);
	if (isNaN(date.getTime())) {
		console.error(`Error parsing date ${dateString}`);
		return "Invalid Date";
	}
	return format(date, "MMM d");
};

const MyProjectPage: React.FC = () => {
	const [filter, setFilter] = React.useState("all"); // Default filter is "all"
	const {
		data: getCreateProjectData,
		isLoading: getCreateProjectLoading,
		isError: getCreateProjectError,
		error: getCreateProjectErrorObj,
	} = useGetCreateProject();

	const purposes = getCreateProjectData?.project_category ?? [];
	// Fetch data based on the current filter
	const { data, isLoading, isError, error } = useMyProjects(filter);

	console.log("projList", data);

	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[]
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const projectsData: Payment[] = React.useMemo(() => {
		if (!data) return [];

		let projectsList = [...data.ProjectsList].sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		);

		return projectsList.map((project) => {
			return {
				id: project.id.toString(),
				name: project.name,
				collectedAmount: project.total_investment,
				neededAmount: project.needed_amount,
				lenders: purposes[project.purpose]?.name || project.purpose || "N/A",
				terms: project.loan_terms ?? "-",
				lendingDateStart: formatDate(project.created_at),
				lendingDateEnd: formatEndDate(project.end_date),
				fixedLending: project.pay_method,
				status: project.status ?? "Unknown",
				comments: project.comment ? project.comment.length : 0,
				followers: project.follower ? project.follower.length : 0,
			};
		});
	}, [data, filter, purposes]);

	const columns = React.useMemo(
		() => [
			{
				header: () => (
					<div className="flex flex-row">
						Name
						<ArrowDownUp className="text-xs text-gray-400 ml-2" />
					</div>
				),
				accessorKey: "name",
				cell: (info: any) => (
					<Link href={`/project/${info.row.original.id}`}>
						{info.getValue()}
					</Link>
				),
			},
			{
				header: "Funding Progress",
				cell: (info: any) => {
					const collectedAmount = info.row.original.collectedAmount;
					const neededAmount = info.row.original.neededAmount;
					const progressValue = (collectedAmount / neededAmount) * 100;
					return (
						<div>
							<div>{`$${collectedAmount} / $${neededAmount}`}</div>
							<Progress
								value={progressValue}
								className="h-3"
							/>
						</div>
					);
				},
			},
			{
				header: "Lenders",
				accessorKey: "lenders",
			},
			{
				header: "Terms",
				accessorKey: "terms",
			},
			{
				header: "Start Date",
				accessorKey: "lendingDateStart",
			},
			{
				header: "End Date",
				accessorKey: "lendingDateEnd",
			},
			{
				header: "Pay Method",
				accessorKey: "fixedLending",
			},
			{
				header: "Followers",
				accessorKey: "followers",
			},
			{
				header: "Comments",
				accessorKey: "comments",
			},
			{
				header: "Actions",
				cell: ({ row }) => {
					const project = row.original;
					return (
						<ActionMenu
							status={project.status}
							collectedAmount={project.collectedAmount}
							neededAmount={project.neededAmount}
							projectId={project.id}
						/>
					);
				},
			},
		],
		[]
	);

	const tableData = React.useMemo(
		() => (isLoading ? Array(30).fill({}) : projectsData),
		[isLoading, projectsData]
	);
	const tableColumns = React.useMemo(
		() =>
			isLoading
				? columns.map((column) => ({
						...column,
						Cell: <Skeleton />,
				  }))
				: columns,
		[isLoading, columns]
	);

	const table = useReactTable({
		data: tableData,
		columns: tableColumns,
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
			<AdminBar currentPage="/dashboard/myprojects" />
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
														<SelectItem value="all">All</SelectItem>
														<SelectItem value="flexible">Flexible</SelectItem>
														<SelectItem value="fixed">Fixed</SelectItem>
														<SelectItem value="pending">Pending</SelectItem>
														<SelectItem value="ongoing">
															Open for Lending
														</SelectItem>
														<SelectItem value="repayment">Repayment</SelectItem>
														<SelectItem value="completed">Completed</SelectItem>
														<SelectItem value="cancel">Cancel</SelectItem>
														<SelectItem value="expire">Expire</SelectItem>
														<SelectItem value="draft">Draft</SelectItem>
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
										<Button>
											<Link href="/create">Create Project</Link>
										</Button>
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

export default MyProjectPage;
