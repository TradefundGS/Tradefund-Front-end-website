
import React from "react";
import Link from "next/link";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useProfile } from "@/reactQuery/mutation/home";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DepositDrawer from "./deposit/DepositDrawer";

const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;

const AdminBar = ({ currentPage }) => {
  const router = useRouter();
  const { data, isLoading, isError, error } = useProfile();
  const isKYCVerified = data?.user?.kyc_status === "Verified";

  const isActive = (href) => href === currentPage;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };


  if (isLoading) {
    return (
      <>
        <div className="col-span-full card p-3 sm:p-7 bg-white divide-y divide-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {/* Left Flex Container */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[3rem]">
          <div className="col-span-6 sm:col-span-4 lg:col-span-6 2xl:col-span-4 flex items-center gap-2.5 self-start">
            <div className="animate-pulse flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              <div className="ml-4 flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-4 lg:col-span-6 2xl:col-span-4 flex items-center gap-2.5">
            <div className="flex flex-col gap-1">
              <div className="h-3 bg-gray-200 rounded w-2/4 mb-1"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-4 lg:col-span-6 2xl:col-span-4 flex items-center gap-2.5">
            <div className="flex flex-col gap-1">
              <div className="h-3 bg-gray-200 rounded w-2/4 mb-1"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Right Flex Container */}
        <div className="flex items-center sm:flex-row gap-3 sm:gap-0">
          {/* Mobile Dropdown Menu */}
          <div className="sm:hidden flex items-center">
            <button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white animate-pulse w-24 h-8"></button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            {[...Array(6)].map((_, i) => (
              <li
                key={i}
                className="w-full focus-within:z-10 bg-gray-300 h-8 rounded-md mx-1 mb-1 animate-pulse"
              ></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
      </>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const { name, email, wallet_balance, profile_image, created_at, address } =
    data.user;
  const formattedDate = format(new Date(created_at), "dd-MM-yyyy");
  const profileImage = `${IMAGE_BASE_URL}${profile_image}`;

  return (
    <div className="col-span-full card p-3 sm:p-7 bg-white divide-y divide-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {/* Left Flex Container */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-[3rem]">
          <div className="col-span-6 sm:col-span-4 lg:col-span-6 2xl:col-span-4 flex items-center gap-2.5 self-start">
            <a
              href="javascript:void(0)"
              className="size-12 rounded-md relative shrink-0"
            >
              <Avatar className="rounded ">
                <AvatarImage
                  src={profile_image ? `${IMAGE_BASE_URL}${profile_image}` : ""}
                  alt={name}
                  className="object-cover size-full rounded-lg"
                />
                <AvatarFallback className="bg-gray-300 text-xl text-semibold">
                  {name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </a>
            <div>
              <h6 className="text-heading font-semibold line-clamp-1">
                <div className="flex flex-row gap-1">
                  <a href="javascript:void(0)">{name}</a>
                  {isKYCVerified && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#10B981"
                      className="size-6"
                    >
                      <title>Verified User</title>
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </h6>
              <div className="font-spline_sans leading-none text-heading dark:text-dark-text-two mt-1">
                <span className="text-gray-500 dark:text-dark-text">
                  {address}
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-4 lg:col-span-6 2xl:col-span-4 flex items-center gap-2.5">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-500 dark:text-dark-text">
                Wallet Balance
              </p>
              <h6 className="text-heading">${wallet_balance}</h6>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-4 lg:col-span-6 2xl:col-span-4 flex items-center gap-2.5">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-gray-500 dark:text-dark-text">
                Joined
              </p>
              <h6 className="text-heading">{formattedDate}</h6>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-4 lg:col-span-6 2xl:col-span-4 flex items-center gap-2.5">
          <div className="flex flex-col items-center">
          <button
                onClick={() => setIsDrawerOpen(true)}
                className="bg-gray-900 text-white px-4 py-2 rounded-md"
            >
                Add to Wallet
            </button>

            <DepositDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
          </div>

        </div>

        {/* Right Flex Container */}
        <div className="flex items-center sm:flex-row gap-3 sm:gap-0">
          {/* Mobile Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="sm:hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                Open
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Navigate</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/dashboard/myprojects">Projects</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/funds">Funds</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/transactions">Transactions</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Desktop Navigation */}
          <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            <li
              className={`w-full focus-within:z-10 ${
                isActive("/dashboard/myprojects") ? "bg-primary text-white" : ""
              }`}
            >
              <Link href="/dashboard/myprojects">
                <span
                  className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 hover:bg-primary hover:text-white dark:text-white ${
                    isActive("/dashboard/myprojects")
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  Projects
                </span>
              </Link>
            </li>

            <li
              className={`w-full focus-within:z-10 ${
                isActive("/dashboard/funds") ? "bg-primary text-white" : ""
              }`}
            >
              <Link href="/dashboard/funds">
                <span
                  className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 hover:text-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white hover:bg-primary dark:hover:bg-gray-700 ${
                    isActive("/dashboard/funds") ? "bg-primary text-white" : ""
                  }`}
                >
                  Funds
                </span>
              </Link>
            </li>
            <li
              className={`w-full focus-within:z-10 ${
                isActive("/dashboard/transactions")
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              <Link href="/dashboard/transactions">
                <span
                  className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 hover:text-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white hover:bg-primary dark:hover:bg-gray-700 ${
                    isActive("/dashboard/transactions")
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  Transactions
                </span>
              </Link>
            </li>
            <li
              className={`w-full focus-within:z-10 ${
                isActive("/withdraw") ? "bg-primary text-white" : ""
              }`}
            >
              <Link href="/withdraw">
                <span
                  className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 hover:text-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white hover:bg-primary dark:hover:bg-gray-700 ${
                    isActive("/withdraw") ? "bg-primary text-white" : ""
                  }`}
                >
                  Withdraw
                </span>
              </Link>
            </li>
			<li
              className={`w-full focus-within:z-10 ${
                isActive("/money-transfer") ? "bg-primary text-white" : ""
              }`}
            >
              <Link href="/money-transfer">
                <span
                  className={`inline-block w-full p-4 border-r border-gray-200 dark:border-gray-700 hover:text-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white hover:bg-primary dark:hover:bg-gray-700 ${
                    isActive("/money-transfer") ? "bg-primary text-white" : ""
                  }`}
                >
                  Transfer
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminBar;
