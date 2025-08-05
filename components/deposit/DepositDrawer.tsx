import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { mutateFetcherWithAuthAndImage } from "@/lib/mutations";
import { CircleAlert, CircleCheckBig } from "lucide-react";
import { toast } from "sonner";
import { useProfile } from "@/reactQuery/mutation/home";

interface DepositDrawerProps {
    open: boolean;
    onClose: () => void;
}

const formSchema = z.object({
    proof: z.instanceof(File).optional(),
    amount: z.number().min(1, "Amount must be greater than 0"),
});

type FormData = z.infer<typeof formSchema>;

const DepositDrawer: React.FC<DepositDrawerProps> = ({ open, onClose }) => {
    const { handleSubmit, control, setValue } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            proof: undefined,
        },
    });
    const { data, isError, error } = useProfile();
    const [proof, setProof] = useState<File | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const { mutate, isPending: isLoading } = useMutation({
        mutationFn: (data: any) => mutateFetcherWithAuthAndImage("/deposit_wallet", data),
        onError: (error) => {
            toast.error("Deposit failed", {
                description: error.message,
                icon: (
                    <CircleAlert
                        className="h-4 w-4"
                        color="red"
                    />
                ),
            });
        },
        onSuccess: () => {
            toast.success("Deposit submitted successfully!", {
                description: "Your deposit proof has been submitted for review.",
                icon: (
                    <CircleCheckBig
                        className="h-4 w-4"
                        color="green"
                    />
                ),
            });
            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 5000);
        },
    });

    const onSubmit = (values: FormData) => {
        if (!proof) {
            toast.error("The proof field is required.", {
                icon: (
                    <CircleAlert
                        className="h-4 w-4"
                        color="red"
                    />
                ),
            });
            return;
        }

        const formData = new FormData();
        formData.append("proof", proof);
        formData.append("amount", `${values.amount}`);
        formData.append("comment", "Deposit");

        mutate(formData);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProof(event.target.files[0]);
            setValue("proof", event.target.files[0]);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-10">
            <div className="fixed inset-0" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                        <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out sm:duration-700">
                            <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                <div className="h-0 flex-1 overflow-y-auto">
                                    <div className="bg-gray-900 px-4 py-6 sm:px-6">
                                        <div className="flex items-center justify-between">
                                            <DialogTitle className="text-base font-semibold leading-6 text-white">
                                                {isSuccess ? "Success!" : "Deposit to Wallet"}
                                            </DialogTitle>
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="relative rounded-md bg-white text-gray-900 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                                            >
                                                <XMarkIcon
                                                    aria-hidden="true"
                                                    className="h-6 w-6"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col justify-between">
                                    <div className="pt-6 px-6">
                                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                                            Bank Details
                                                        </h3>
                                                        <div className="mt-4 space-y-2 text-sm text-gray-700">
                                                            <p>
                                                                <strong>Account Holder Name:</strong> {data?.branch_name || "N/A"}
                                                            </p>
                                                            <p>
                                                                <strong>Account Number:</strong> {data?.account_number || "N/A"}
                                                            </p>
                                                            <p>
                                                                <strong>Swift Code:</strong> {data?.swift_code || "N/A"}
                                                            </p>
                                                            <p>
                                                                <strong>Bank Name:</strong> {data?.bank_name || "N/A"}
                                                            </p>
                                                        </div>
                                                    </div>
                                        {!isSuccess ? (
                                            <form
                                                onSubmit={handleSubmit(onSubmit)}
                                                className="flex-1 flex flex-col px-4 py-6 sm:px-6"
                                            >
                                                <div className="space-y-6">
                                                    {/* Enter Amount */}
                                                    <div>
                                                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                                                            Enter Amount
                                                        </label>
                                                        <Controller
                                                            name="amount"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input
                                                                    type="number"
                                                                    id="amount"
                                                                    onChange={(event) => field.onChange(parseInt(event.target.value))}
                                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                                    required
                                                                />
                                                            )}
                                                        />
                                                    </div>

                                                    {/* Upload Payment Proof */}
                                                    <div>
                                                        <label htmlFor="proof" className="block text-sm font-medium text-gray-700">
                                                            Upload Payment Proof
                                                        </label>
                                                        <Controller
                                                            name="proof"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <input
                                                                    type="file"
                                                                    id="proof"
                                                                    accept="image/*,application/pdf"
                                                                    onChange={(event) => {
                                                                        handleFileChange(event);
                                                                        field.onChange(event.target.files ? event.target.files[0] : null);
                                                                    }}
                                                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                                                    required
                                                                />
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex-shrink-0 flex justify-end">
                                                    <button
                                                        type="submit"
                                                        disabled={isLoading}
                                                        className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
                                                    >
                                                        {isLoading ? "Processing..." : "Submit"}
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-6 sm:px-6">
                                                <CircleCheckBig className="h-10 w-10 text-green-500" />
                                                <h2 className="mt-4 text-xl text-center font-semibold text-gray-900">
                                                    Deposit submitted successfully!
                                                </h2>
                                                <p className="mt-2 text-center text-sm text-gray-600">
                                                    Your deposit proof has been submitted for review.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DepositDrawer;
