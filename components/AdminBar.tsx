import React, { useState } from "react";
import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Wallet,
	Calendar,
	MapPin,
	ShieldCheck,
	Plus,
	Menu,
	TrendingUp,
	ArrowUpRight,
	DollarSign,
} from "lucide-react";
import DepositDrawer from "./deposit/DepositDrawer";

const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;

const AdminBar = ({ currentPage }: { currentPage: string }) => {
	const router = useRouter();
	const { data, isLoading, isError, error } = useProfile();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const isActive = (href: string) => href === currentPage;

	if (isLoading) {
		return (
			<Card className="w-full bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 backdrop-blur-sm border-0 shadow-xl">
				<CardContent className="p-6">
					<div className="flex flex-col lg:flex-row justify-between items-start gap-6">
						{/* Profile Section Skeleton */}
						<div className="flex items-center gap-4">
							<Skeleton className="h-16 w-16 rounded-full" />
							<div className="flex flex-col gap-3">
								<Skeleton className="h-6 w-40" />
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						</div>

						{/* Stats Section Skeleton */}
						<div className="flex flex-wrap gap-4">
							<div className="flex items-center gap-3">
								<Skeleton className="h-12 w-12 rounded-lg" />
								<div className="flex flex-col gap-2">
									<Skeleton className="h-3 w-20" />
									<Skeleton className="h-5 w-24" />
								</div>
							</div>
							<div className="flex items-center gap-3">
								<Skeleton className="h-12 w-12 rounded-lg" />
								<div className="flex flex-col gap-2">
									<Skeleton className="h-3 w-16" />
									<Skeleton className="h-5 w-20" />
								</div>
							</div>
							<Skeleton className="h-11 w-32 rounded-lg" />
						</div>
					</div>

					{/* Navigation Skeleton */}
					<div className="mt-8 pt-6 border-t border-gray-200/60">
						<div className="flex flex-wrap gap-3">
							{[1, 2, 3, 4, 5].map((i) => (
								<Skeleton
									key={i}
									className="h-10 w-24 rounded-lg"
								/>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (isError) {
		return (
			<Card className="w-full border-red-200 bg-red-50">
				<CardContent className="p-6">
					<div className="flex items-center gap-3 text-red-700">
						<div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
							⚠
						</div>
						<div>
							<p className="font-medium">Error loading profile</p>
							<p className="text-sm text-red-600">
								{error?.message || "Something went wrong"}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	const {
		name,
		wallet_balance,
		profile_image,
		created_at,
		address,
		kyc_status,
	} = data.user;

	const formattedDate = format(new Date(created_at), "MMM dd, yyyy");

	return (
		<Card className="w-full bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 backdrop-blur-sm border-0 shadow-xl">
			<CardContent className="p-6">
				<div className="flex flex-col lg:flex-row justify-between items-start gap-6">
					{/* Profile Section */}
					<div className="flex items-start gap-4">
						<div className="relative">
							<Avatar className="h-16 w-16 border-2 border-white shadow-lg ring-2 ring-blue-100/50">
								<AvatarImage
									src={profile_image ? `${IMAGE_BASE_URL}${profile_image}` : ""}
									alt={name}
									className="object-cover"
								/>
								<AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-semibold">
									{name.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							{kyc_status === "Verified" && (
								<div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
									<ShieldCheck className="h-3 w-3 text-white" />
								</div>
							)}
						</div>

						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-3 mb-2">
								<h2 className="text-xl font-bold text-gray-900 truncate">
									{name}
								</h2>
								{kyc_status === "Verified" && (
									<Badge
										variant="secondary"
										className="bg-green-100 text-green-700 border-green-200"
									>
										<ShieldCheck className="h-3 w-3 mr-1" />
										Verified
									</Badge>
								)}
							</div>

							<div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
								<MapPin className="h-4 w-4 flex-shrink-0" />
								<span className="truncate">{address}</span>
							</div>

							<div className="flex items-center gap-2 text-sm text-gray-500">
								<Calendar className="h-4 w-4 flex-shrink-0" />
								<span>Joined {formattedDate}</span>
							</div>
						</div>
					</div>

					{/* Stats & Actions Section */}
					<div className="flex flex-wrap items-center gap-6">
						{/* Wallet Balance Card */}
						<div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-sm border border-gray-200/60">
							<div className="h-8 w-8 bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
								<Wallet className="h-4 w-4 text-white" />
							</div>
							<div>
								<p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
									Wallet Balance
								</p>
								<p className="text-2xl font-bold text-gray-900 flex items-center gap-1">
									<DollarSign className="h-5 w-5" />
									{parseFloat(wallet_balance).toLocaleString("en-US", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</p>
							</div>
						</div>

						{/* Add to Wallet Button */}
						<Button
							onClick={() => setIsDrawerOpen(true)}
							size="lg"
							className="bg-primary hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
						>
							<Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-200" />
							Add Funds
							<ArrowUpRight className="h-4 w-4 ml-2 opacity-70" />
						</Button>

						<DepositDrawer
							open={isDrawerOpen}
							onClose={() => setIsDrawerOpen(false)}
						/>

						{/* Mobile Menu */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="lg"
									className="lg:hidden border-gray-300 hover:bg-gray-50"
								>
									<Menu className="h-5 w-5 mr-2" />
									Menu
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="end"
								className="w-56"
							>
								<DropdownMenuLabel className="font-semibold">
									Navigation
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link
										href="/dashboard/myprojects"
										className="flex items-center gap-2"
									>
										<TrendingUp className="h-4 w-4" />
										Projects
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="/dashboard/funds"
										className="flex items-center gap-2"
									>
										<Wallet className="h-4 w-4" />
										Funds
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="/dashboard/transactions"
										className="flex items-center gap-2"
									>
										<ArrowUpRight className="h-4 w-4" />
										Transactions
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link
										href="/settings"
										className="flex items-center gap-2"
									>
										<ShieldCheck className="h-4 w-4" />
										Settings
									</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>

				{/* Navigation Tabs */}
				<div className="mt-8 pt-6 border-t border-gray-200/60">
					<div className="flex flex-wrap gap-2">
						{[
							{
								name: "Projects",
								href: "/dashboard/myprojects",
								icon: TrendingUp,
							},
							{ name: "Funds", href: "/dashboard/funds", icon: Wallet },
							{
								name: "Transactions",
								href: "/dashboard/transactions",
								icon: ArrowUpRight,
							},
							{ name: "Withdraw", href: "/withdraw", icon: DollarSign },
							{ name: "Transfer", href: "/money-transfer", icon: ArrowUpRight },
						].map((tab) => {
							const Icon = tab.icon;
							return (
								<Link
									key={tab.href}
									href={tab.href}
								>
									<Button
										variant={isActive(tab.href) ? "default" : "ghost"}
										className={`
                      rounded-lg transition-all duration-200 group
                      ${
												isActive(tab.href)
													? "bg-primary text-white shadow-md hover:shadow-lg"
													: "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
											}
                    `}
									>
										<Icon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
										{tab.name}
									</Button>
								</Link>
							);
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default AdminBar;
