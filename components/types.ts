// types.ts
export interface EligibilityFormValues {
	name?: string;
	purpose?: string;
	tittle?: string;
	needed_amount?: string;
	pay_method?: string;
	end_date?: Date | null; 
	project_image?: File | null;
}