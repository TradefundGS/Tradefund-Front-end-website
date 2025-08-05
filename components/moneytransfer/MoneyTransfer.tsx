"use client";
import { useState } from "react";
import { AccountForm } from "./AccountForm";
import { AccountsTable } from "./AccountsTable";

interface Account {
	name: string;
	bank: string;
	accountNumber: string;
	ifsc: string;
	isPrimary: boolean;
}

export function MoneyTransferPage() {
	const [accounts, setAccounts] = useState<Account[]>([]);
  
	// Adjust handleAddAccount to accept an Account object
	const handleAddAccount = (account: Account) => {
	  setAccounts([...accounts, { ...account }]);
	};
  
	const handleDelete = (index: number) => {
	  setAccounts(accounts.filter((_, i) => i !== index));
	};
  
	const handleMakePrimary = (index: number) => {
	  setAccounts(
		accounts.map((account, i) => ({
		  ...account,
		  isPrimary: i === index,
		}))
	  );
	};

	return (
		<div className="space-y-8">
			<AccountForm refetch={() => {}} onAddAccount={handleAddAccount} />
			<AccountsTable
				accounts={accounts}
				onDelete={handleDelete}
				onMakePrimary={handleMakePrimary}
			/>
		</div>
	);
}
