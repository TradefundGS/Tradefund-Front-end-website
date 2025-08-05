// components/createProject/elgiblityCheck.tsx
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
	useGetCreateProject,
} from "@/reactQuery/mutation/home";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { useWizardNav } from "../wizard";




const schema = z.object({
  purpose: z.string().min(1, "Please select a valid purpose"),
  needed_amount: z.string().min(1, "Needed amount must be at least 1"),
});
type EligibilityFormValues = z.infer<typeof schema>;

interface EligibilityFormProps {
  data: any;
  setData: any;
}
export const EligiblityCheck: React.FC<EligibilityFormProps> = ({
  data,
  setData,
}) => {
  const {
    data: getCreateProjectData,
    isLoading: getCreateProjectLoading,
    isError: getCreateProjectError,
    error: getCreateProjectErrorObj,
  } = useGetCreateProject();

  const purposes = getCreateProjectData?.project_category ?? [];


 
  const { goForward ,goStage} = useWizardNav();

  const form = useForm<EligibilityFormValues>({
    resolver: zodResolver(schema),
    defaultValues: data,
  });

  const onSubmit: SubmitHandler<EligibilityFormValues> = (values: any) => {
    setData(values);
    goForward();
    // goStage(4);
  };

  return (
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Project Info
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Provide the necessary project information.
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="needed_amount"
                  render={({ field }: any) => (
                    <FormItem>
                      <FormLabel>Enter Needed Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Needed Amount"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="sm:col-span-3">
              <FormField
            control={form.control}
            name="purpose"
            render={({ field }: any) => (
              <FormItem>
                      <FormLabel>Purpose</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map(
                        (purpose: { id: string; purpose: string }) => (
                          <SelectItem
                            key={purpose.id}
                            value={purpose.id.toString()}
                          >
                            {purpose.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-x-6">
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
