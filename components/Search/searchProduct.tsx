import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from 'next/image';
import { Progress } from "@/components/ui/progress";
import { RiMapPin5Line } from 'react-icons/ri'; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SkeletonLoader from '../SkeletonLoader';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ''; // Ensure this is defined

const SearchProduct = ({ projects = [], isLoading }) => {
  // Log the projects data to the console
  console.log('Projects data:', isLoading);
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <SkeletonLoader key={index} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return <div>No projects found.</div>; // Handle no projects case
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <Link href={`/project/${project.id}`} key={project.id}>
          <Card className="bg-white rounded-lg overflow-hidden relative">
            <CardHeader className="relative pb-2">
              {/* Image */}
              <Image
                src={`${MEDIA_BASE_URL}/${project.project_image}`}
                alt="Card Image"
                width={350}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
              />
              {/* project_category */}
              <div className="text-grey-900">{project.project_category}</div>
              <CardTitle className="mt-4 min-h-14 truncate">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="block">{project.name}</span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{project.name}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</CardTitle>
              <CardDescription className="text-gray-600">by {project.user.name}</CardDescription>
            </CardHeader>

            {/* Card Content */}
            <CardContent>
              {/* <p className="text-gray-700 mt-2 min-h-14">
                {project.tittle.split(" ").length > 12 ? `${project.tittle.split(" ").slice(0, 12).join(" ")}...` : project.tittle}
              </p> */}
              <p className="text-gray-700 mt-2 line-clamp-2">
  {project.tittle}
</p>

              <div className="flex items-center mt-4 text-gray-500">
                <RiMapPin5Line className="mr-2" />
                {project.user.address ? project.user.address : "Address not found"}
              </div>
            </CardContent>

            {/* Inner Box */}
            <div className="p-6 border-t border-b border-gray-200 relative">
              <div className="mb-4">
                {/* Progress Bar */}
                <Progress
                  value={Number(project.investment_percentage)}
                  className="h-3"
                />
              </div>
              {/* Details */}
              <div className="flex justify-evenly text-gray-700">
                <div className="flex-1 text-start">
                  <div className="text-lg font-semibold">
                    {project.investment_percentage}%
                  </div>
                  <div className="text-sm text-gray-500">Funded</div>
                </div>
                <div className="flex-1 text-start">
                  <div className="text-lg font-semibold">$ {project.total_investment}</div>
                  <div className="text-sm text-gray-500">Pledged</div>
                </div>
                <div className="flex-1 text-start">
                  <div className="text-lg font-semibold">{new Date(project.created_at).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500">Lent on</div>
                </div>
              </div>
            </div>
            {/* Stacked Avatars */}
            <div className="flex -space-x-1 py-4 pe-6 align-baseline justify-end">
              {project.invest_users && project.invest_users.length > 0 ? (
                project.invest_users.map((user, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer inline-block"
                  >
                    <Avatar className="hidden h-9 w-9 sm:flex">
                      <AvatarImage
                        src={`${MEDIA_BASE_URL}${user.profile_image || "/avatar.jpeg"}`}
                        alt={`@${user.name}`}
                        className="object-cover"
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full w-30 mb-2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {user.name}
                    </div>
                  </div>
                ))
              ) : (
                <p className="min-h-9">No investors yet</p>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SearchProduct;