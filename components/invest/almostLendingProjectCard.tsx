import Image from 'next/image';
import { RiMapPin5Line } from 'react-icons/ri';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


interface ProjectCardProps {
	project: {
		project_image: string;
		project_category: string;
		tittle: string;
		name: string;
		project_description: string;
		location: string;
		investment_percentage: number;
		total_investment: number;
		needed_amount: string;
		created_at: string;
		id: string;
		city: string;
		country: string;
		address: string;
		user: {
			profile_image: string;
			name: string;
		};
	};
}
const categoryNames = {
	1: "Export",
	2: "Import",
	3: "Pre-Shipment",
	4: "Post-Shipment",
	5: "Invoice",
	6: "Other"
  };
const MEDIA_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;

export default function AlmostLendingProjectCard({ project }: ProjectCardProps) {
  const { project_image, address, project_category, tittle, name, project_description, city, country, investment_percentage,total_investment, needed_amount, created_at,user, } = project;
  const image = `${MEDIA_BASE_URL}${project_image}`;
  const date = new Date(created_at);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const location = `${project.user.address}`;



  // console.log(formattedDate);

  return (
    <Link href={`/project/${project.id}`}>
			<Card className="bg-white rounded-lg overflow-hidden relative">
				<CardHeader className="relative pb-2">
					{/* Image */}
					<Image
						src={image}
						alt="Card Image"
						width={350}
						height={200}
						className="w-full h-48 object-cover rounded-lg"
					/>
					{/* project_category */}
					<div className="text-grey-900">{categoryNames[project_category]}</div>
					<CardTitle className="mt-4 min-h-10 truncate">{name}</CardTitle>
					<CardDescription className="text-gray-600">by {user.name}</CardDescription>
				</CardHeader>

				{/* Card Content */}
				<CardContent>
				<p className="text-gray-700 mt-2 line-clamp-2">{tittle}</p>
				<div className="flex items-center mt-4 text-gray-500">
  <RiMapPin5Line className="mr-2 w-5 h-5" /> {/* Set fixed size for the icon */}
  <p className="line-clamp-2 flex-1"> 
  {user.address ? user.address : "Address not found"}
  </p>
</div>
				</CardContent>

				{/* Inner Box */}
				<div className="p-6 border-t border-b border-gray-200 relative">
					<div className="mb-4">
						{/* Progress Bar */}
						<Progress
							value={Number(investment_percentage)}
							className="h-3"
						/>
					</div>
					{/* Details */}
					<div className="flex justify-evenly text-gray-700">
						<div className="flex-1 text-start">
							<div className="text-lg font-semibold">
								{investment_percentage}%
							</div>
							<div className="text-sm text-gray-500">Funded</div>
						</div>
						<div className="flex-1 text-start">
							<div className="text-lg font-semibold">$ {total_investment}</div>
							<div className="text-sm text-gray-500">Pledged</div>
						</div>
						<div className="flex-1 text-start">
							<div className="text-lg font-semibold">{formattedDate}</div>
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
										src={`${MEDIA_BASE_URL}${
											user.profile_image || "/avatar.jpeg"
										}`}
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

				{/* Stacked Avatars */}
			</Card>
		</Link>
  );
}
