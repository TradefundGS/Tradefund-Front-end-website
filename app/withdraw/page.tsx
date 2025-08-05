"use client"

import React from "react";
import AdminBar from "@/components/AdminBar";
import { WithdrawForm } from "../../components/withdrawamount/WithdrawForm";
import { WithdrawTable } from "../../components/withdrawamount/WithdrawRequestsTable";


export default function WithdrawPage() {
	return (
		<>
<AdminBar currentPage="/withdraw" />
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Withdraw Amount</h1>
			<WithdrawForm />
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-4">Withdrawal Requests</h2>
				<WithdrawTable />
			</div>
		</div>
		</>
	);
}
