'use client'

import { useCreateProject } from '@/reactQuery/mutation/home';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CheckIcon } from '@heroicons/react/24/solid';

const steps = [
  { id: '01', name: 'Job Details', href: '#', status: 'current' },
  { id: '02', name: 'Application Form', href: '#', status: 'upcoming' },
  { id: '03', name: 'Preview', href: '#', status: 'upcoming' },
  { id: '04', name: 'Payment', href: '#', status: 'upcoming' },
  { id: '05', name: 'Confirmation', href: '#', status: 'upcoming' },
];

function MultiStepForm() {
  const { mutate, isPending: isLoading, isError, error, isSuccess } = useCreateProject();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    neededAmount: '',
    fundingDays: '',
    purpose: '',
    projectTitle: '',
    fileName: '',
    image: null,
    paymentMethod: '',
    projectEndDate: '',
    projectDescription: '',
    supportedBy: '',
    document: null,
    videoURL: '',
    disclaimerAccepted: false,
    paymentType: '',
    screenshot: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type, value, files, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files?.[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === steps.length - 1) {
      // console.log(formData);
      mutate(formData);
    } else {
      nextStep();
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    if (isError) {
      toast.error("Error creating project", {
        description: error?.message || "An error occurred while trying to create the project.",
      });
    }

    if (isSuccess) {
      toast.success("Project created!", {
        description: "Your project has been created successfully.",
      });
    }
  }, [isError, isSuccess, error]);

  return (
    <div className="mx-auto">
      <nav aria-label="Progress">
        <ol role="list" className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex md:flex-1">
              {step.status === 'complete' ? (
                <a href={step.href} className="group flex w-full items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-primary">
                      <CheckIcon aria-hidden="true" className="h-6 w-6 text-white" />
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-900">{step.name}</span>
                  </span>
                </a>
              ) : step.status === 'current' ? (
                <a href={step.href} aria-current="step" className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
                    <span className="text-primary">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-primary">{step.name}</span>
                </a>
              ) : (
                <a href={step.href} className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">{step.id}</span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">{step.name}</span>
                  </span>
                </a>
              )}

              {stepIdx !== steps.length - 1 && (
                <div aria-hidden="true" className="absolute right-0 top-0 hidden h-full w-5 md:block">
                  <svg
                    fill="none"
                    viewBox="0 0 22 80"
                    preserveAspectRatio="none"
                    className="h-full w-full text-gray-300"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      stroke="currentcolor"
                      vectorEffect="non-scaling-stroke"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {currentStep === 0 && (
          <div>
            <h2 className="text-lg font-semibold">Job Details</h2>
            <label className="block text-sm font-medium text-gray-700">
              Enter Needed Amount
              <input
                type="number"
                name="neededAmount"
                value={formData.neededAmount}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Funding Required No of Days
              <input
                type="number"
                name="fundingDays"
                value={formData.fundingDays}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Select Purpose
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="">Select...</option>
                <option value="import">Import</option>
                <option value="export">Export</option>
                <option value="invoice">Invoice</option>
                <option value="other">Other</option>
                <option value="preShipment">PreShipment</option>
                <option value="purchaseOrder">Purchase Order</option>
              </select>
            </label>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-semibold">Basics</h2>
            <label className="block text-sm font-medium text-gray-700">
              Enter Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Enter Project Title
              <input
                type="text"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Enter File Name
              <input
                type="text"
                name="fileName"
                value={formData.fileName}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Upload Image
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="mt-2"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Enter Needed Amount
              <input
                type="number"
                name="neededAmount"
                value={formData.neededAmount}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Select Payment Method
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              >
                <option value="fixedFunding">Fixed Funding</option>
                <option value="flexibleFunding">Flexible Funding</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Project End Date
              <input
                type="date"
                name="projectEndDate"
                value={formData.projectEndDate}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-semibold">Details</h2>
            <label className="block text-sm font-medium text-gray-700">
              Project Description
              <textarea
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Supported By
              <input
                type="text"
                name="supportedBy"
                value={formData.supportedBy}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Upload Document
              <input
                type="file"
                name="document"
                onChange={handleChange}
                className="mt-2"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Description
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Video URL
              <input
                type="url"
                name="videoURL"
                value={formData.videoURL}
                onChange={handleChange}
                className="mt-2 p-2 border border-gray-300 rounded"
              />
            </label>
            <label className="flex items-center mt-4">
              <input
                type="checkbox"
                name="disclaimerAccepted"
                checked={formData.disclaimerAccepted}
                onChange={handleChange}
                className="mr-2"
              />
              I accept the disclaimer
            </label>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-lg font-semibold">Payment</h2>
            <div className="p-4 border border-gray-300 rounded mb-4">
              <h3 className="text-md font-semibold">Wallet Balance</h3>
              <p>Balance: $0.00</p>
            </div>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Select Payment Type
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentType"
                    value="wallet"
                    checked={formData.paymentType === 'wallet'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Wallet
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="paymentType"
                    value="bank"
                    checked={formData.paymentType === 'bank'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Bank
                </label>
              </div>
            </label>
            {formData.paymentType === 'bank' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-4">
                  Screenshot of Bank Payment
                  <input
                    type="file"
                    name="screenshot"
                    onChange={handleChange}
                    className="mt-2"
                  />
                </label>
              </div>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div className="flex justify-center items-center h-48">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Confirmation</h2>
              <p>Your project has been submitted successfully!</p>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MultiStepForm;
