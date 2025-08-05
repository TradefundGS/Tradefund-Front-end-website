// pages/moneytransfer.tsx
"use client"
import AdminBar from "@/components/AdminBar";
import { MoneyTransferPage } from "@/components/moneytransfer/MoneyTransfer";


export default function MoneyTransfer() {
	return (
		<>
<AdminBar currentPage="/money-transfer" />
<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Money Transfer Accounts</h1>
			<MoneyTransferPage />
		</div>
		</>
	);
}
