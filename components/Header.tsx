import React, { useState, useEffect, useContext } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
	Disclosure,
	Menu,
	MenuButton,
	MenuItems,
	MenuItem,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/authContext";
import { useProfile } from "@/reactQuery/mutation/home";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import NotificationsPopover from "./NotificationsPopover";
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";
const navigation = [
	{ name: "Investor", href: "/invest" },
	{ name: "Borrower", href: "/create" },
	{ name: "How it works", href: "/how-it-works" },
	{ name: "Search", href: "/search" },
	{ name: "FAQ", href: "/faq" },
	{ name: "Contact Us", href: "/contact" },
];
const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;
export default function Header() {
	const { data, isLoading: isProfileLoading } = useProfile();
	const { isLoggedIn, logout, userData } = useContext(AuthContext);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		if (userData?.profile_image && typeof userData.profile_image === "string") {
			const baseURL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL?.trim();

			// Ensure full URL or properly formatted relative path
			let fullPath: string;

			if (
				baseURL &&
				(baseURL.startsWith("http://") || baseURL.startsWith("https://"))
			) {
				fullPath = `${baseURL.replace(
					/\/$/,
					""
				)}/${userData.profile_image.replace(/^\//, "")}`;
			} else {
				// fallback to public folder relative path
				fullPath = `/profile_image/${userData.profile_image.replace(
					/^\//,
					""
				)}`;
			}

			setImageSrc(fullPath);
		} else {
			setImageSrc(null);
		}
	}, [userData]);

	const handleLogout = async () => {
		try {
			logout();
			router.push("/");

			// Show success toast message on logout
			toast.success("Logout successful!", {
				description: "You have successfully logged out.",
				icon: (
					<CircleAlert
						className="h-4 w-4"
						color="green"
					/>
				),
			});
		} catch (error) {
			// Show error toast message if there's an issue with logout
			toast.error("Logout error", {
				description: error.message,
				icon: (
					<CircleAlert
						className="h-4 w-4"
						color="red"
					/>
				),
			});
		}
	};

	return (
		<>
			<header className="bg-white">
				<nav
					aria-label="Global"
					className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
				>
					<div className="flex lg:flex-1 relative">
						<Link
							href="/"
							className="-m-1.5 p-1.5 relative"
						>
							<span className="sr-only">Trade Fund</span>
							<Image
								alt="tradefund logo"
								src="/tf.png"
								className="h-8 w-auto"
								width={81}
								height={31}
							/>

							{/* Animated Dots */}
							<div className="absolute bottom-0 right-4 flex space-x-1 translate-x-3 translate-y-3">
								<div className="w-2 h-2 bg-[#05aeeb] rounded-full animate-bounceDot1"></div>
								<div className="w-2 h-2 bg-primary rounded-full animate-bounceDot2"></div>
								<div className="w-2 h-2 bg-[#9994c7] rounded-full animate-bounceDot3"></div>
								<div className="w-2 h-2 bg-[#e38028] rounded-full animate-bounceDot4"></div>
							</div>
						</Link>
					</div>

					{/* Animated Dots */}

					<div className="hidden lg:flex lg:gap-x-12">
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary"
							>
								{item.name}
							</Link>
						))}
					</div>
					<div className="flex flex-1 items-center justify-end gap-x-6">
						{!isLoggedIn ? (
							<>
								<Link
									href="/auth/login"
									className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900 hover:text-primary"
								>
									Log in
								</Link>
								<Link
									href="/auth/register"
									className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900"
								>
									Sign up
								</Link>
							</>
						) : (
							<div className="hidden sm:ml-6 sm:flex sm:items-center">
								<button
									type="button"
									className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									<NotificationsPopover />
								</button>

								<Menu
									as="div"
									className="relative ml-4 flex-shrink-0"
								>
									<MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
										<span className="sr-only">Open user menu</span>
										<span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
											{imageSrc ? (
												<Image
													src={imageSrc}
													width={40}
													height={40}
													className="inline-block h-14 w-14 rounded-full object-cover"
													alt="User profile image"
													unoptimized={!imageSrc.startsWith("/")} // disable optimization for external URLs
													onError={() => setImageSrc(null)}
												/>
											) : (
												<Avatar>
													<AvatarFallback>
														{data?.user?.name?.[0] ?? "?"}
													</AvatarFallback>
												</Avatar>
											)}
										</span>
									</MenuButton>
									<MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
										<MenuItem>
											<Link
												href="/settings"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Profile
											</Link>
										</MenuItem>
										<MenuItem>
											<Link
												href="/dashboard/myprojects"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Dashboard
											</Link>
										</MenuItem>
										<MenuItem>
											<button
												onClick={handleLogout}
												className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												Sign out
											</button>
										</MenuItem>
									</MenuItems>
								</Menu>
							</div>
						)}
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								aria-hidden="true"
								className="h-6 w-6"
							/>
						</button>
					</div>
				</nav>
				<Dialog
					open={mobileMenuOpen}
					onClose={() => setMobileMenuOpen(false)}
					className="lg:hidden"
				>
					<div className="fixed inset-0 z-10" />
					<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
						<div className="flex items-center justify-between gap-x-6">
							<Link
								href="/"
								className="-m-1.5 p-1.5"
							>
								<span className="sr-only">Trade Fund</span>
								<Image
									alt="tradefund logo"
									src="/crowdfunding.png"
									className="h-8 w-auto"
									width={81}
									height={31}
								/>
							</Link>
							<button
								type="button"
								onClick={() => setMobileMenuOpen(false)}
								className="-m-2.5 rounded-md p-2.5 text-gray-700"
							>
								<span className="sr-only">Close menu</span>
								<XMarkIcon
									aria-hidden="true"
									className="h-6 w-6"
								/>
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-500/10">
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										>
											{item.name}
										</Link>
									))}
								</div>
								<div className="py-6">
									{!isLoggedIn ? (
										<Link
											href="/auth/login"
											className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-primary"
										>
											Log in
										</Link>
									) : (
										<button
											onClick={handleLogout}
											className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
										>
											Sign out
										</button>
									)}
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>
		</>
	);
}
