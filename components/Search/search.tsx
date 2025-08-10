"use client";
import Fuse from "fuse.js";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import FiltersForm from "./filtersForm";
import { useAllProjects } from "@/reactQuery/mutation/home";
import { PlusIcon } from "@heroicons/react/20/solid";
import MobileFiltersDialog from "./mobileFiltersDialog ";
import SearchProduct from "./searchProduct";
import Sort from "./sort";
import SkeletonLoader from "../SkeletonLoader";

const Search = () => {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [filters, setFilters] = useState(["all"]);

	const { data, isLoading, isError, error, refetch, isFetching } =
		useAllProjects({
			filter: filters,
		});

	const availableProjects = data?.projects || [];

	const fuse = new Fuse(availableProjects, {
		keys: ["name"],
		threshold: 0.2,
	});

	const searchExploreChannel = fuse.search(searchTerm);
	const filteredExploreChannel = useMemo(
		() =>
			searchTerm
				? searchExploreChannel.map((result) => result.item)
				: availableProjects,
		[searchTerm, availableProjects, searchExploreChannel]
	);

	const memoizedRefetch = useCallback(() => {
		refetch();
	}, [refetch]);

	useEffect(() => {
		memoizedRefetch();
	}, [filters, memoizedRefetch]);

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	return (
		<>
			<div className="bg-white">
				<MobileFiltersDialog
					mobileFiltersOpen={mobileFiltersOpen}
					setMobileFiltersOpen={setMobileFiltersOpen}
					filters={filters}
					setFilters={setFilters}
				/>

				<main className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 bg-gray-100">
					<div className="mx-auto max-w-2xl sm:text-center">
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
							Search
						</h2>
						<p className="mt-6 text-lg leading-8 text-gray-600">
							Search projects, sectors, categories or funding terms.
						</p>

						<div className="mt-6 relative text-center mx-auto">
							<form
								className="mx-auto mt-6 sm:flex sm:max-w-md"
								onSubmit={(e) => e.preventDefault()}
							>
								<label
									htmlFor="search"
									className="sr-only"
								>
									Search project
								</label>
								<input
									id="search"
									name="search"
									type="text"
									required
									placeholder="Search"
									autoComplete="off"
									value={searchTerm}
									onChange={handleSearchChange}
									className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
								/>
							</form>
						</div>
					</div>
				</main>

				<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 relative">
					<div className="lg:grid lg:grid-cols-4 lg:gap-x-8">
						{/* Sidebar for filters - sticky on desktop */}
						<aside className="lg:col-span-1 lg:sticky lg:top-24 lg:h-screen hidden md:block">
							<h2 className="sr-only">Filters</h2>
							<FiltersForm
								setFilters={setFilters}
								filters={filters}
							/>
						</aside>

						{/* Main content - sticky title and sort on desktop */}
						<div className="lg:col-span-3">
							{/* Mobile filter and sort buttons */}
							<div className="sticky top-0 z-10 bg-white flex items-center justify-between mb-4 lg:hidden py-4 px-4 shadow-sm">
								<button
									type="button"
									onClick={() => setMobileFiltersOpen(true)}
									className="inline-flex items-center bg-gray-100 p-2 rounded-md"
								>
									<span className="ml-2 text-sm font-medium text-gray-700">
										Filters
									</span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="size-6"
									>
										<path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
									</svg>
								</button>
								<Sort
									filters={filters}
									setFilters={setFilters}
								/>
							</div>

							{/* Desktop sort and title */}
							<div className="hidden lg:flex items-center justify-between mb-4 sticky top-0 bg-white py-4 px-4 z-10 shadow-sm">
								<h2 className="text-xl font-semibold">Project Lists</h2>
								<Sort
									filters={filters}
									setFilters={setFilters}
								/>
							</div>

							{/* Project list */}
							{isLoading && (
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
									{[...Array(6)].map((_, index) => (
										<SkeletonLoader key={index} />
									))}
								</div>
							)}
							{isError && <p>Error: {error.message}</p>}
							{!isLoading && !isError && (
								<SearchProduct
									projects={filteredExploreChannel}
									isLoading={isFetching}
								/>
							)}
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default Search;
