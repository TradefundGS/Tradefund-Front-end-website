// Updated AccountForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useAddBank, useGetBankAccount } from "@/reactQuery/mutation/home";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bank_name: z.string().min(2, { message: "Bank Name must be at least 2 characters." }),
  account_number: z.string().min(8, { message: "Account Number must be at least 8 characters." }),
  ifsc_code: z.string().min(11, { message: "IFSC must be 11 characters." }),
  primary: z.boolean().optional(),
});

interface AccountFormProps {
  onAddAccount: (account: { name: string; bank: string; accountNumber: string; ifsc: string; isPrimary: boolean }) => void; // Add the onAddAccount prop
}

export function AccountForm({  onAddAccount }: AccountFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      primary: false,
    },
  });
  const {  refetch } = useGetBankAccount();

  const { mutate, isPending: isLoading, isError, error } = useAddBank(
	{
		onSuccess: () => {
			toast.success("Bank Account primary status updated successfully!");
			refetch()
		},
		onError: (error) => {
			console.log(error);
			if (error?.response?.data?.error?.message) {
				toast.error(error.response.data.error.message);
			} else {
				toast.error("An error occurred while updating the account.");
			}
		},
	}
  );

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const accountData = {
      name: data.name,
      bank: data.bank_name,
      accountNumber: data.account_number,
      ifsc: data.ifsc_code,
      isPrimary: data.primary === 'yes',
    };

    mutate({ ...data, primary: data.primary ? 'yes' : 'no' }, {
      onSuccess: () => {
        toast.success("Bank Account submitted successfully!");
        form.reset();
        onAddAccount(accountData); // Call the onAddAccount prop to update the table
        if (typeof refetch === 'function') {
          refetch();
        } else {
          console.error("Refetch is not a function");
        }
      },
      onError: (error) => {
        if (error?.response?.data?.error?.message) {
          form.setError("root.serverError", {
            type: "server",
            message: error.response.data.error.message,
          });
        } else {
          console.error("Error adding account:", error);
        }
      },
    });
  }

  return (
    <div className="mt-10 sm:mr-auto sm:w-full sm:max-w-[50%]">
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter account holder's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="account_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ifsc_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IFSC</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter IFSC code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="primary"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Make Primary Account</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding Account..." : "Add Account"}
            </Button>
            {isError && form.formState.errors.root?.serverError && (
              <p className="text-red-500">
                {form.formState.errors.root.serverError.message}
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
