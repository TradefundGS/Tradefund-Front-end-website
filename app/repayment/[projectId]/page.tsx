"use client";
import LoanDetails from "@/components/repayment/LoanDetails";
import React from "react";

import { useGetRepaymentDetails } from "@/reactQuery/mutation/home";
import AdminBar from "@/components/AdminBar";

const Repayment = ({ params }: { params: { projectId: any } }) => {
  const { projectId } = params;
  const {data} = useGetRepaymentDetails({
        id:projectId
    })

  return (
    <>
    <AdminBar currentPage="/dashboard/myproject" />
<LoanDetails data={data} />
</>
  );
};

export default Repayment;
