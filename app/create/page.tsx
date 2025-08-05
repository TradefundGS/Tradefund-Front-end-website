"use client";

import { CreateProjectForm } from "@/components/createProjectForm";
import { useProfile } from "@/reactQuery/mutation/home";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { Suspense } from "react";

function KYCWarning() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-17rem)] w-full">
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="h-5 w-5 text-yellow-400"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Attention needed
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Your KYC status is pending. Please complete your KYC to list
                projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-17rem)] w-full">
      <div className="text-center">Loading...</div>
    </div>
  );
}

export default function CreateProjects() {
  const { data, isLoading, isError, error } = useProfile();
  const isKYCVerified = data?.user?.kyc_status === "Verified";

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return (
      <div className="mx-auto flex max-w-7xl items-center justify-center p-6 lg:px-8 w-full">
        <p>Error: {error.message}. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-6 p-6 lg:px-8 w-full">
      {isKYCVerified ? <CreateProjectForm /> : <KYCWarning />}
    </div>
  );
}
