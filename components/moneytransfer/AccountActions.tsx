// components/moneytransfer/AccountActions.tsx
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useDeleteAccount } from "@/reactQuery/mutation/home";
import { toast } from "sonner";

interface AccountActionsProps {
	accountId: string;
	onMakePrimary: () => void;
	refetch: () => void;
  }
  

  export function AccountActions({
	accountId,
	onMakePrimary,
	refetch,
  }: AccountActionsProps) {
	const { mutate: deleteAccount } = useDeleteAccount({
	  onSuccess: () => {
		toast.success("Bank Account removed successfully!");
		refetch(); // Call refetch on success
	  },
	  onError: (error) => {
		console.log(error);
		if (error?.response?.data?.error?.message) {
		  toast.error(error.response.data.error.message);
		} else {
		  toast.error("An error occurred while updating the account.");
		}
	  },
	});
  
	const handleDelete = () => {
	  deleteAccount({ id: accountId });
	};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onMakePrimary}>
          Make Primary
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
