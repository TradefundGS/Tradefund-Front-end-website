import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { remove } from "lodash";

const filtersArray = [
	{
		id: "category",
		name: "Category",
		options: [
			{ value: "all", label: "All" },
			{ value: "export", label: "Export" },
			{ value: "import", label: "Import" },
			{ value: "invoice", label: "Invoice" },
			{ value: "other", label: "Other" },
			{ value: "pre-shipment", label: "Pre-Shipment" },
			{ value: "purchase-order", label: "Purchase Order" },
		],
	},
];

const FilterSection = ({ filters, setFilters }) => {
	const handleCheckboxChange = (optionValue) => {
		let updatedFilters = [...filters];

		if (optionValue === "all") {
			// If "All" is checked, reset all filters to "all"
			updatedFilters = ["all"];
		} else {
			// If "All" is currently selected, remove it
			const index = updatedFilters.indexOf("all");
			if (index > -1) {
				updatedFilters.splice(index, 1);
			}

			// Toggle the checkbox
			const optionIndex = updatedFilters.indexOf(optionValue);
			if (optionIndex > -1) {
				// If the option is already checked, remove it
				updatedFilters.splice(optionIndex, 1);
			} else {
				// Otherwise, add it to the filters
				updatedFilters.push(optionValue);
			}
		}

		setFilters(updatedFilters);
	};

	return (
		<>
			{filtersArray.map((section) => (
				<div key={section.name} className="pb-4 pt-4">
					<fieldset>
						<legend className="w-full px-2">
							<span className="text-lg font-semibold text-gray-900">
								{section.name}
							</span>
						</legend>
						<div className="px-4 pb-2 pt-4">
							<div className="space-y-6">
								{section.options.map((option, optionIdx) => (
									<div key={option.value} className="flex items-center">
										<input
											id={`${section.id}-${optionIdx}-mobile`}
											name={`${section.id}[]`}
											type="checkbox"
											className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
											checked={filters.includes(option.value)}
											onChange={() => handleCheckboxChange(option.value)}
										/>
										<label
											htmlFor={`${section.id}-${optionIdx}-mobile`}
											className="ml-3 text-sm text-gray-500"
										>
											{option.label}
										</label>
									</div>
								))}
							</div>
						</div>
					</fieldset>
				</div>
			))}
		</>
	);
};

export default FilterSection;
