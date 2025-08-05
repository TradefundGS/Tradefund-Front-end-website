import FilterSection from "./filterSection";

const FiltersForm = ({ filters, setFilters }: any) => {
	return (
		<form className="space-y-10 divide-y divide-gray-200">
			<FilterSection
				setFilters={setFilters}
				filters={filters}
			/>
		</form>
	);
};

export default FiltersForm;
