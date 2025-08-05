// ProjectContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

interface ProjectData {
	data: {
		success: {
		  project: {
			project_image: string;
			project_category: string;
			tittle: string;
			name: string;
			project_description: string;
			city: string;
			interest: string;
			country: string;
			investment_percentage: number;
			needed_amount: string;
			created_at: string;
			id: string;
			end_date: string;
			description: string;
    description2: string;
    description3: string;
    description4: string;
    upload_document: string;
		  };
		  investors: Array<{
			amount:string;
		  }>;
		};
	  };
}

interface ProjectProviderProps {
	data: ProjectData;
	children: ReactNode;
}

const ProjectContext = createContext<ProjectData | undefined>(undefined);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
	data,
	children,
}) => {
	return (
		<ProjectContext.Provider value={data}>{children}</ProjectContext.Provider>
	);
};

export const useProject = (): ProjectData => {
	const context = useContext(ProjectContext);
	if (!context) {
		throw new Error("useProject must be used within a ProjectProvider");
	}
	return context;
};
