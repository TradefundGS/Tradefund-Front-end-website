// app/invest/page.tsx

"use client";

import ProjectCardList from "@/components/invest/topProjectCardList";
import SuccessfullProjectCardList from "@/components/invest/successfullProjectCardList";
import AlmostLendingProjectCardList from "@/components/invest/almostLendingProjectCardList";
import EndingSoonCardList from "@/components/invest/endingSoonProjectCardList";
import { useProfile } from "@/reactQuery/mutation/home";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
export default function Invest() {
	const { data, isLoading, isError, error } = useProfile();
	// console.log(data);
	// const isKYCVerified = data?.user?.kyc_status === "Verified";


	return (
		<>
			<div className="bg-white-900">
				<div className="relative mx-auto flex flex-col max-w-7xl items-start justify-between gap-x-6 p-6 lg:px-8 overflow-hidden">
				
						<>
							<ProjectCardList />
							<AlmostLendingProjectCardList />
							<EndingSoonCardList />
							<SuccessfullProjectCardList />
						</>
					
				</div>
			</div>
		</>
	);
}
