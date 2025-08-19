import React, { useState, useEffect, useContext, useCallback } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
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

export default function Header() {
	const { data } = useProfile();
	const { isLoggedIn, logout, userData } = useContext(AuthContext);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [imageError, setImageError] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const router = useRouter();

	// Memoize image processing
	const processImageSrc = useCallback((profileImage: string) => {
		const baseURL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL?.trim();

		if (!baseURL) {
			return `/profile_image/${profileImage.replace(/^\//, "")}`;
		}

		if (baseURL.startsWith("http://") || baseURL.startsWith("https://")) {
			return `${baseURL.replace(/\/$/, "")}/${profileImage.replace(/^\//, "")}`;
		}

		return `/profile_image/${profileImage.replace(/^\//, "")}`;
	}, []);

	useEffect(() => {
		if (
			userData?.profile_image &&
			typeof userData.profile_image === "string" &&
			!imageError
		) {
			const fullPath = processImageSrc(userData.profile_image);
			setImageSrc(fullPath);
		} else {
			setImageSrc(null);
		}
	}, [userData?.profile_image, processImageSrc, imageError]);

	const handleImageError = useCallback(() => {
		setImageError(true);
		setImageSrc(null);
	}, []);

	const handleLogout = async () => {
		if (isLoggingOut) return; // Prevent multiple logout calls

		try {
			setIsLoggingOut(true);
			await logout();

			// Close mobile menu if open
			setMobileMenuOpen(false);

			// Navigate to home page
			router.push("/");

			toast.success("Logout successful!", {
				description: "You have successfully logged out.",
				icon: (
					<CircleAlert
						className="h-4 w-4"
						color="green"
					/>
				),
			});
		} catch (error: any) {
			console.error("Logout error:", error);
			toast.error("Logout error", {
				description: error?.message || "An error occurred during logout",
				icon: (
					<CircleAlert
						className="h-4 w-4"
						color="red"
					/>
				),
			});
		} finally {
			setIsLoggingOut(false);
		}
	};

	const closeMobileMenu = useCallback(() => {
		setMobileMenuOpen(false);
	}, []);

	const openMobileMenu = useCallback(() => {
		setMobileMenuOpen(true);
	}, []);

	// Render user avatar
	const renderUserAvatar = () => (
		<span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
			{imageSrc && !imageError ? (
				<Image
					src={imageSrc}
					width={40}
					height={40}
					className="h-10 w-10 rounded-full object-cover"
					alt="User profile"
					onError={handleImageError}
					priority={false}
				/>
			) : (
				<Avatar className="h-10 w-10">
					<AvatarFallback>
						{data?.user?.name?.[0]?.toUpperCase() ??
							userData?.name?.[0]?.toUpperCase() ??
							"U"}
					</AvatarFallback>
				</Avatar>
			)}
		</span>
	);

	return (
		<header className="bg-white">
			<nav
				aria-label="Global"
				className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
			>
				{/* Logo */}
				<div className="flex lg:flex-1 relative">
					<Link
						href="/"
						className="-m-1.5 p-1.5 relative"
						onClick={closeMobileMenu}
						prefetch={true}
					>
						<span className="sr-only">Trade Fund</span>
						<Image
							alt="Trade Fund logo"
							src="/tf.png"
							className="h-8 w-auto"
							width={81}
							height={31}
							priority={true}
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

				{/* Desktop Navigation */}
				<div className="hidden lg:flex lg:gap-x-12">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary transition-colors duration-200"
							prefetch={true}
						>
							{item.name}
						</Link>
					))}
				</div>

				{/* Right Section */}
				<div className="flex flex-1 items-center justify-end gap-x-6">
					{!isLoggedIn ? (
						<>
							<Link
								href="/auth/login"
								className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900 hover:text-primary transition-colors duration-200"
								prefetch={true}
							>
								Log in
							</Link>
							<Link
								href="/auth/register"
								className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 transition-colors duration-200"
								prefetch={true}
							>
								Sign up
							</Link>
						</>
					) : (
						<div className="hidden sm:ml-6 sm:flex sm:items-center">
							<div className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
								<NotificationsPopover />
							</div>

							<Menu
								as="div"
								className="relative ml-4 flex-shrink-0"
							>
								<MenuButton
									className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
									disabled={isLoggingOut}
								>
									<span className="sr-only">Open user menu</span>
									{renderUserAvatar()}
								</MenuButton>
								<MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<MenuItem>
										<Link
											href="/settings"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
											prefetch={true}
										>
											Profile
										</Link>
									</MenuItem>
									<MenuItem>
										<Link
											href="/dashboard/myprojects"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
											prefetch={true}
										>
											Dashboard
										</Link>
									</MenuItem>
									<MenuItem>
										<button
											onClick={handleLogout}
											disabled={isLoggingOut}
											className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 disabled:opacity-50"
										>
											{isLoggingOut ? "Signing out..." : "Sign out"}
										</button>
									</MenuItem>
								</MenuItems>
							</Menu>
						</div>
					)}
				</div>

				{/* Mobile Hamburger */}
				<div className="flex lg:hidden">
					<button
						type="button"
						onClick={openMobileMenu}
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

			{/* Mobile Menu Drawer */}
			<Dialog
				open={mobileMenuOpen}
				onClose={closeMobileMenu}
				className="lg:hidden"
			>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between gap-x-6">
						<Link
							href="/"
							className="-m-1.5 p-1.5"
							onClick={closeMobileMenu}
							prefetch={true}
						>
							<span className="sr-only">Trade Fund</span>
							<Image
								alt="Trade Fund logo"
								src="/tf.png" // Fixed: Use consistent logo
								className="h-8 w-auto"
								width={81}
								height={31}
								priority
							/>
						</Link>
						<button
							type="button"
							onClick={closeMobileMenu}
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
							{/* Navigation Links */}
							<div className="space-y-2 py-6">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										onClick={closeMobileMenu}
										className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors duration-150"
										prefetch={true}
									>
										{item.name}
									</Link>
								))}
							</div>

							{/* Auth Links */}
							<div className="py-6">
								{!isLoggedIn ? (
									<>
										<Link
											href="/auth/login"
											onClick={closeMobileMenu}
											className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-primary transition-colors duration-150"
											prefetch={true}
										>
											Log in
										</Link>
										<Link
											href="/auth/register"
											onClick={closeMobileMenu}
											className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-primary transition-colors duration-150"
											prefetch={true}
										>
											Sign up
										</Link>
									</>
								) : (
									<>
										<Link
											href="/settings"
											onClick={closeMobileMenu}
											className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors duration-150"
											prefetch={true}
										>
											Profile
										</Link>
										<Link
											href="/dashboard/myprojects"
											onClick={closeMobileMenu}
											className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors duration-150"
											prefetch={true}
										>
											Dashboard
										</Link>
										<button
											onClick={handleLogout}
											disabled={isLoggingOut}
											className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 transition-colors duration-150 disabled:opacity-50"
										>
											{isLoggingOut ? "Signing out..." : "Sign out"}
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	);
}
