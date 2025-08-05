import * as React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useCancelFund } from "@/reactQuery/mutation/home";
import { toast } from "sonner";

type FundingActionMenuProps = {
    projectId: string;
};

const FundingActionMenu: React.FC<FundingActionMenuProps> = ({ projectId }) => {
    const router = useRouter();
    const cancelFundMutation = useCancelFund();

    const handleCancel = () => {
        cancelFundMutation.mutate(
            { id: projectId }, // adjusted to use `id` field
            {
                onSuccess: () => {
                    toast.success("Fund cancelled!", {
                        description: "The fund has been successfully cancelled.",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    });
                },
                onError: (error: any) => {
                    toast.error("Error cancelling fund!", {
                        description: error.message || "An error occurred while cancelling the fund.",
                    });
                }
            }
        );
    };

    const handleContactBorrower = () => {
        router.push(`/project/${projectId}#comment`);
    };

    return (
        <div className="flex items-center space-x-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleCancel}>Cancel</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleContactBorrower}>Contact Borrower</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default FundingActionMenu;
