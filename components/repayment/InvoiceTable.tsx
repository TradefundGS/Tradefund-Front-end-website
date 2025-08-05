import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import LoanDrawer from "./LoanDrawer";
import { format } from 'date-fns';

// Function to convert date to month name (e.g., "January")
const getMonthName = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("default", { month: "long" });
};

const InvoiceTable = ({ repayments }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState();

  const handleRepayNowClick = () => {
    setIsOpen(true);
  };
console.log(repayments)
  return (
    <div className="px-6 py-6 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Repayment Schedule
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the repayments due, including principal, interest, and status.
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-8 sm:-mx-0">
        <table className="min-w-full divide-y divide-gray-300 bg-white">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                Month
              </th>
              <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Principal
              </th>
              <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Interest
              </th>
              <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Payable
              </th>
              <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                Date
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {repayments.map((repayment, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                  {getMonthName(repayment.next_schedule)}
                  <dl className="font-normal lg:hidden">
                    <dt className="sr-only">Principal</dt>
                    <dd className="mt-1 truncate text-gray-500"><span className="font-semibold">Disbursed Amount ($)</span>: {repayment.total_amount}</dd>
                    <dt className="sr-only">Interest</dt>
                    <dd className="mt-1 truncate text-gray-500"><span className="font-semibold">Interest (%)</span>: {repayment.project.interest}%</dd>
                    <dt className="sr-only">Payable</dt>
                    <dd className="mt-1 truncate text-gray-500"><span className="font-semibold">Payable($)</span>: {repayment.amount_with_interest}</dd>
                    <dt className="sr-only">Date</dt>
                    <dd className="mt-1 truncate text-gray-500">
  <span className="font-semibold">Date</span>: {format(new Date(repayment.next_schedule), 'dd MMM yyyy')}
</dd>
                  </dl>
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {repayment.total_amount}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {repayment.project.interest}%
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {repayment.amount_with_interest}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {format(new Date(repayment.next_schedule), 'dd MMM yyyy')}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  {repayment.status === "Pending" ? (
                    <button
                      onClick={() => {
                        handleRepayNowClick();
                        setCurrentId(repayment?.id);
                      }}
                      className="bg-primary text-white py-1 px-3 rounded"
                    >
                      Pay Now
                    </button>
                  ) : repayment.status === "Completed" ? (
                    <span className="text-green-500 font-semibold">Completed</span>
                  ) : (
                    <span>{repayment.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LoanDrawer placed outside to avoid nesting issues */}
      <LoanDrawer open={isOpen} onClose={() => setIsOpen(false)} id={currentId} />
    </div>
  );
};

export default InvoiceTable;
