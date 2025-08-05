'use client'

import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function HowItWorks() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="bg-gray-100 px-6 pt-0 pb-8 sm:py-12 lg:px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">How it works</h2>
          {/* <p className="mt-6 text-lg leading-8 text-gray-600">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat aliqua.
          </p> */}
        </div>
      </div>
      <div className="max-w-4xl mx-auto space-y-8 lg:flex lg:space-y-0 lg:space-x-8">

        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow flex-1">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Borrower
            </h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <ul className="list-disc pl-5 text-gray-900">
              <li>Provide transaction details and documents</li>
              <li>Post your transaction live</li>
              <li>Get Funded</li>
              <li>Execute your trade</li>
            </ul>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <a href="create" className="text-center block w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-gray-900">
              Start Borrowing
            </a>
          </div>
        </div>

        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow flex-1">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Lender
            </h2>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <ul className="list-disc pl-5 text-gray-900">
              <li>View opportunities</li>
              <li>Select transaction</li>
              <li>Make your investment</li>
              <li>Realize your return</li>
            </ul>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <a href="invest" className="text-center block w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-gray-900">
              Start Lending
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
