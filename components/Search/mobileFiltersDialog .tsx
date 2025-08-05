import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FilterSection from "./filterSection"; // Import the FilterSection component

interface MobileFiltersDialogProps {
	mobileFiltersOpen: boolean;
	setMobileFiltersOpen: (value: boolean) => void;
	filters: string[];
	setFilters: (filters: string[]) => void;
}

const MobileFiltersDialog: React.FC<MobileFiltersDialogProps> = ({
	mobileFiltersOpen,
	setMobileFiltersOpen,
	filters,
	setFilters,
}) => {
	return (
		<Dialog
			open={mobileFiltersOpen}
			onClose={() => setMobileFiltersOpen(false)}
			className="relative z-40 lg:hidden"
		>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
			/>
			<div className="fixed inset-0 z-40 flex">
				<DialogPanel
					transition
					className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
				>
					<div className="flex items-center justify-between px-4">
						<h2 className="text-lg font-medium text-gray-900">Filters</h2>
						<button
							type="button"
							onClick={() => setMobileFiltersOpen(false)}
							className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" className="h-6 w-6" />
						</button>
					</div>
					<FilterSection filters={filters} setFilters={setFilters} />
				</DialogPanel>
			</div>
		</Dialog>
	);
};

export default MobileFiltersDialog;