import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from 'next/navigation';
import { CircleAlert } from "lucide-react";
import { toast } from "sonner";


type ActionMenuProps = {
    status: string;
    collectedAmount: number;
    neededAmount: number;
    projectId: string;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ status, collectedAmount, neededAmount, projectId }) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/edit/${projectId}`);
    };

    const handlePayment = () => {
        router.push(`/repayment/${projectId}`);
    };

    // const {refetch} = useGetRepaymentDetails({
    //     id:projectId
    // })

    return (
        <div className="flex items-center space-x-2">
            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {collectedAmount === 0 && (
                        <>
                            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                        </>
                    )}
                    {collectedAmount > 0 && collectedAmount < neededAmount && (
                        <DropdownMenuItem>Cancel</DropdownMenuItem>
                    )}
                    {collectedAmount >= neededAmount && (
                        <DropdownMenuItem onClick={handlePayment}>Repayment</DropdownMenuItem>
                    )}
                </DropdownMenuContent>
            </DropdownMenu> */}

<DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {collectedAmount === 0 && (
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
        )}
        {collectedAmount > 0 && collectedAmount < neededAmount && (
            <DropdownMenuItem>Cancel</DropdownMenuItem>
        )}
        {collectedAmount >= neededAmount ? (
            status === "Completed" ? (
                <DropdownMenuItem onClick={handlePayment}>Repayment</DropdownMenuItem>
            ) : (
                <DropdownMenuItem
                    onClick={() => {
                        toast.error("Your project is waiting for admin approval. Please contact admin.", {
                            icon: (
                                <CircleAlert
                                    className="h-4 w-4"
                                    color="red"
                                />
                            ),
                        });
                    }}
                >
                    Repayment
                </DropdownMenuItem>
            )
        ) : null}
    </DropdownMenuContent>
</DropdownMenu>


        </div>
    );
};

export default ActionMenu;