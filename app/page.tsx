"use client";

import { useContext } from "react";
import CallToAction from "@/components/CallToAction";
import ProjectCardList from "@/components/invest/topProjectCardList";
import StatisticsComponent from "@/components/statistics";
import { AuthContext } from "@/contexts/authContext";

export default function Home() {
	const { isLoggedIn } = useContext(AuthContext);

	return (
		<>
			<div
				className="bg-white-900 bg-[url('/hero.png')] bg-cover bg-no-repeat bg-center "
				style={{ minHeight: "calc(100vh - 19rem)" }}
			>
				<div className="relative isolate overflow-hidden pt-4">
					{/* <img
          alt=""
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        /> */}
					{/* <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div> */}
					<div className="mx-auto max-w-2xl py-24">
						<div className="hidden sm:mb-8 sm:flex sm:justify-center">
							<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-900 ring-1 ring-black/10 hover:ring-grey/20">
								Announcing our next round of funding.{" "}
								<a
									href="#"
									className="font-semibold text-gray-900"
								>
									<span
										aria-hidden="true"
										className="absolute inset-0"
									/>
									Read more <span aria-hidden="true">&rarr;</span>
								</a>
							</div>
						</div>
						<div className="text-center">
							<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
								Let&apos;s Fund Trade
							</h1>
							<p className="mt-6 text-lg leading-8 text-gray-900">
								Trade Fund - the hub for financing trade
							</p>
							<div className="mt-10 flex items-center justify-center gap-x-6">
								<a
									href="invest"
									className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
								>
									Start Lending
								</a>
								<a
									href="create"
									className="rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
								>
									Start Borrowing <span aria-hidden="true">→</span>
								</a>
							</div>
						</div>
					</div>
					<div
						aria-hidden="true"
						className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
					>
						{/* <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          /> */}
					</div>
				</div>
			</div>

			<StatisticsComponent />
			{isLoggedIn ? (
				<div className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
					<ProjectCardList />
				</div>
			) : null}
			<CallToAction />
		</>
	);
}
