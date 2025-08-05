import ProjectCard from "./topProjectCard";
import { useProjects } from "@/reactQuery/mutation/home";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import EmptyProject from "@/components/emptyProject";

export default function ProjectCardList() {
	const { data, isLoading } = useProjects();
	console.log(data);
	const projects = data?.topProject ?? [];

	return (
		<div className="max-w-2xl border-b border-grey-800 px-4 py-6 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
			<h2 className="text-2xl font-bold tracking-tight text-gray-900 text-left">
				Top Projects
			</h2>
			{isLoading ? (
				// Render skeleton cards if data is loading
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							className="flex flex-col space-y-3"
							key={index}
						>
							<Skeleton className="h-[350px] w-[350px] rounded-xl" />
						</div>
					))}
				</div>
			) : projects.length === 0 ? (
				<EmptyProject />
			) : (
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
					{projects.map((project: any, index: any) => (
						<ProjectCard
							key={index}
							project={project}
						/>
					))}
				</div>
			)}
		</div>
	);
}
