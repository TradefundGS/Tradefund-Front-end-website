// app/faq/page.tsx

'use client'

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "Is my lent amount safe with Tradefund?",
    answer:
      "Tradefund, a Peer to Peer Lending platform puts its best efforts into sourcing the right borrowers, and do thorough underwriting, information verification, and KYC checks. Here, your money is lent into loans to the right borrowers.",
  },
  {
    question: "What is the minimum & maximum amount I can lend?",
    answer:
      "The minimum investment amount on Tradefund is $1000 and the maximum one can invest is $100,000. ",
  },
  {
    question: "What is P2P lending?",
    answer:
      "As the name suggests, P2P lending (peer-to-peer lending) is a concept in which individuals or institutes can lend money to borrowers. The system removes the role of a financial institution as an intermediary. Instead, P2P lending platforms act as facilitators for the transaction of money. Anyone can become an investor on P2P lending platforms and effectively lend to many individuals or businesses sitting at home. This mode of lending and borrowing has increased its adoption as an alternate way of financing.",
  },
]

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-30">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-semibold leading-7">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="h-6 w-6 [.group:not([data-open])_&]:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
