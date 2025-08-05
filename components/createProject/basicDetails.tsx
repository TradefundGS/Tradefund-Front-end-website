'use client'

import { useWizardNav } from "../wizard";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { any, z } from "zod";
import { useCreateProject, useGetCreateProject } from "@/reactQuery/mutation/home";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { format, parse } from "date-fns";



const schema = z.object({
  name: z.string().min(6, "Name must be at least 6 characters long"),
  purpose: z.string().min(1, "Please select a valid purpose"),
  tittle: z.string().min(6, "Title must be at least 6 characters long"),
  needed_amount: z.string().min(1, "Needed amount must be at least 1"),
  pay_method: z.string().min(1, "Please select a valid payment method"),
  end_date: z.any(),
  project_image: z.any(),
});
interface BasicDetailsProps {
  setData: any;
  data: any;
}

type FormValues = z.infer<typeof schema>;

export const BasicDetails: React.FC<BasicDetailsProps> = ({
  setData,
  data,
}) => {
  const {
    data: getCreateProjectData,
    isLoading: getCreateProjectLoading,
    isError: getCreateProjectError,
    error: getCreateProjectErrorObj,
  } = useGetCreateProject();

  const purposes = getCreateProjectData?.project_category ?? [];
  const paymentMethods = getCreateProjectData?.payment_method ?? [];  
  const {
    skip,
    goForward,
    blocked,
    canBackward,
    canSkip,
    goBack,
    isCompleted,
    isLastStage,
  } = useWizardNav();

  const {
    mutate,
    isPending: isLoading,
    isError,
    error,
    isSuccess,
  } = useCreateProject();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data?.name,
      purpose: data?.purpose,
      tittle: data?.tittle,
      needed_amount: data?.needed_amount,
      pay_method: data?.pay_method,
      end_date: data?.end_date,
      project_image: data?.project_image,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    // Convert date back to MM/dd/yyyy for submission
    // const file = document.getElementById('project_image').files[0];
    const file = values.project_image;
    delete values.project_image;
    setData((p) => ({ ...p, ...values }));
    setData((p) => ({ ...p, project_image: file }));

    goForward();
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          {/* First Section: Project Info and Lending */}
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
              {/* Form Fields */}
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Name"
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
              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="tittle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Project Title</FormLabel>
                      <FormControl>
                        <textarea
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="Enter Project Title"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-full">
              <FormField
                  control={form.control}
                  name="project_image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Project Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          id="project_image"
                          accept="image/*"
                          onChange={(event) => {
                            // check if files exist before calling onChange
                            if (event.target.files) {
                              field.onChange(event.target.files[0]);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Lending Section */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Lending
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Provide lending details for the project.
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              {/* Form Fields */}
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="needed_amount"
                  render={({ field }) => (
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
  name="pay_method"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Payment Method</FormLabel>
      <FormControl>
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((method, index) => (
              <SelectItem key={index} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
              </div>
              <div className="sm:col-span-3">
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex justify-end gap-x-6">
            <Button
              type="button"
              onClick={() => goBack()}
              disabled={blocked || isLoading}
              variant="outline"
            >
              Back
            </Button>
            <Button type="submit" disabled={blocked || isLoading}>
              Next
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
