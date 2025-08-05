"use client";
import { CheckIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import LoanDrawer from "./LoanDrawer";
import InvoiceTable from "./InvoiceTable";
import { ScrollArea } from "@/components/ui/scroll-area";
const IMAGE_BASE_URL = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}`;


const LoanDetails = ({ data }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleRepayNowClick = () => {
		setIsDialogOpen(true);
	};

	if (!data) {
		return (
		  <main className="mt-10 pb-8">
			<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
			  <div className="grid grid-cols-4 gap-4">
				{/* Left box with width 1/4 */}
				<div className="col-span-1 h-44 bg-gray-300 rounded animate-pulse" />
				
				{/* Right box with width 3/4 */}
				<div className="col-span-3 h-44 bg-gray-300 rounded animate-pulse" />
			  </div>
			</div>
		  </main>
		);
	  }
	  
	const repayment = data.repayments[0];
	const project = repayment.project;
	const imageUrl = `${IMAGE_BASE_URL}${project.project_image || ""}`;
// console.log("repayment", repayment)
	return (
		<>
			<main className="mt-10 pb-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">

        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left Column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Left Column
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                    <h4 className="mb-4">Repayments</h4>
                    <a
                      className="group flex items-center justify-between"
					  href={`/concepts/projects/project-details/${project.id}`}>
                    
                      <div className="flex items-center gap-2">
                        <span className="avatar avatar-circle avatar-md">
						<img
      src={imageUrl}
      alt="product image"
      className="w-10 h-10 object-cover rounded-full" // Tailwind classes for width, height, and object-fit
    />
						  
                        </span>
                        <div>
                          <div className="font-bold heading-text">
						  <h6 className="font-bold hover:text-primary">
                      <a href={`/concepts/projects/project-details/${project.id}`}>
                        {project.tittle}
                      </a>
                    </h6>
                          </div>
                          <span>
                            <span className="font-semibold">By </span>{project.name}
                          </span>
                        </div>
                      </div>
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="text-xl hidden group-hover:block"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"></path>
                        <path d="M11 13l9 -9"></path>
                        <path d="M15 4h5v5"></path>
                      </svg>
                    </a>
                    <hr className="my-5" />

                    <div className="flex flex-col gap-5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Disbursed Amount ($)</span>
                        <span className="text-gray-500 text-medium">{repayment.total_amount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Interest Amount</span>
                        <span className="text-gray-500 text-medium">{project.interest}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Late Fee ($)</span>
                        <span className="text-gray-500 text-medium">{repayment.late_fee}</span>
                      </div>
                      <div className="flex items-center justify-between ">
                        <span className="font-semibold">Type</span>
                        <span className="text-gray-500 font-medium">{repayment.project.repayment_schedule}</span>
                      </div>
					  <div className="flex items-center justify-between ">
                        <span className="font-semibold">No of EMI</span>
                        <span className="text-gray-500 font-medium">{repayment.completed_schedule}/{repayment.actual_schedule}</span>
                      </div>
					  <div className="flex items-center justify-between ">
                        <span className="font-semibold">Next Due Date</span>
						<span className="text-gray-500 font-medium">
  {(() => {
    const date = new Date(repayment.next_schedule);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  })()}
</span>
                      </div>
                      <hr />
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Total Amount($)</span>
                        <h5 className="font-bold">
                          <span>{(repayment.amount_with_interest * repayment.actual_schedule + parseFloat(repayment.late_fee)).toFixed(2)}</span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Right Column
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
              <ScrollArea className="h-[480px] p-4"> {/* Set a specific height for the ScrollArea */}
              
                     
                        <InvoiceTable repayments={data.repayments} />
                     
                   
                  </ScrollArea>
               
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
			
		</>
	);
};

export default LoanDetails;
