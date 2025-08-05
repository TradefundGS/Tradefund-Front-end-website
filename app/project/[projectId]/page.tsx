'use client'

import { useContext } from 'react';
import ProjectDetails from "@/components/projectDetails";
import { useGuestProjectDetails } from "@/reactQuery/mutation/home";
import { useGetProjectDetails } from "@/reactQuery/mutation/home"; // Assuming this import is correct
import { Skeleton } from "@/components/ui/skeleton"
import { AuthContext } from "@/contexts/authContext";

export default function Page({ params }: { params: { projectId: string } }) {
    const { isLoggedIn } = useContext(AuthContext);
    const { data: guestData, isLoading: guestLoading, isError: guestError, refetch: guestRefetch } = useGuestProjectDetails(params.projectId);
    const { data: userData, isLoading: userLoading, isError: userError, refetch: userRefetch } = useGetProjectDetails(params.projectId);

    // Decide which data to use and loading/error states to handle
    const isLoading = isLoggedIn ? userLoading : guestLoading;
    const isError = isLoggedIn ? userError : guestError;
    const data = isLoggedIn ? userData : guestData;
    const refetch = isLoggedIn ? userRefetch : guestRefetch;

    if (isLoading) {
        return (
            <div className="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                    <div className="flex flex-col md:w-1/2 space-y-3">
                        <Skeleton className="h-[500px] w-full rounded-xl" />
                    </div>
                    <div className="flex flex-col md:w-1/2 space-y-3">
                        <Skeleton className="h-8 w-[150px] rounded" />
                        <Skeleton className="h-4 w-[200px] rounded" />
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-[250px] rounded" />
                        <Skeleton className="h-20 w-[300px] rounded" />
                        <Skeleton className="h-4 w-[150px] rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return <div>Error loading project details</div>;
    }

    return (
        <>
            <ProjectDetails data={data} refetch={refetch} />
        </>
    );
}
