"use client";
import React, { useEffect  } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGetProjectDetails, useGetCreateProject, useEditProject } from "@/reactQuery/mutation/home";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isValid } from "date-fns";
import { cn } from "@/lib/utils";

const editProjectSchema = z.object({
  name: z.string().nonempty("The name field is required."),
  tittle: z.string().nonempty("The title field is required."),
  needed_amount: z.string().nonempty("The needed amount field is required."),
  purpose: z.string().nonempty("The purpose field is required."),
  end_date: z.any().refine(val => val instanceof Date, "Please select a valid date"),
  project_description: z.string().nonempty("The project description field is required."),
  pay_method: z.string().nonempty("The pay method field is required."),
  // project_image: z.any().refine(file => file instanceof File && file.size > 0, "The project image is required."),
  project_image: z.any().refine(file => file instanceof File || file === null, "The project image should be a valid file."),

  video_url: z.string().optional(),
});

export default function EditProjectPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params;
  const router = useRouter();

  const { data: projectDetails, isLoading: isLoadingProject, isError: isErrorProject } = useGetProjectDetails(projectId);
  const { data: createProjectData, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetCreateProject();

  const form = useForm({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      name: "",
      tittle: "",
      needed_amount: "",
      purpose: "",
      end_date: null,
      project_description: "",
      pay_method: "",
      project_image: null,
      video_url: "",
    },
  });

  const purposes = createProjectData?.project_category ?? [];
  const paymentMethods = createProjectData?.payment_method ?? [];
  const supportedByOptions = createProjectData?.supported_by ?? [];


  const { mutate, isPending: isSubmitting } = useEditProject({
    onSuccess: () => {
      toast.success("Project saved successfully!", {
        description: "Your project has been saved successfully.",
      });
      router.back();
    }
  
  });
  
  const handleCancel = () => {
    router.push("/dashboard/myprojects");
  };

  console.log(purposes,projectDetails)

  useEffect(() => {
    if (projectDetails && projectDetails.success.project) {
      const { name, tittle, needed_amount,purpose, project_category, end_date, project_description, pay_method, video_url } = projectDetails.success.project;
      
      form.reset({
        name: name || "",
        tittle: tittle || "",
        needed_amount: needed_amount || "",
        purpose: purpose ?? "", 
        end_date: end_date ? new Date(end_date) : null, 
        project_description: project_description || "",
        pay_method: pay_method || "",
        video_url: video_url || "",
      });
    }
  }, [projectDetails, form]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "project_image" && value instanceof File) {
        formData.append(key, value);
      } else if (key === "end_date") {
        formData.append(key, format(value, "yyyy-MM-dd")); 
      } else {
        formData.append(key, value as string);
      }
    });

    if (!data.project_image && projectDetails?.success?.project?.project_image) {
      formData.append("project_image", projectDetails.success.project.project_image);
    }

    formData.append("id", projectId);

    mutate(formData);
  };

  if (isLoadingProject || isLoadingCategories) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (isErrorProject || isErrorCategories) return <div className="flex items-center justify-center h-screen text-red-500">Error loading data</div>;


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Edit Project</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-300 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Project Information</h2>
              <p className="mt-1 text-sm text-gray-600">Please provide the necessary details for the project.</p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Enter Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Tittle Field */}
              <FormField
                control={form.control}
                name="tittle"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Enter Project Title</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Project Tittle"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Needed Amount Field */}
              <FormField
                control={form.control}
                name="needed_amount"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Needed Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1000"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Purpose Field */}
              <FormField
  control={form.control}
  name="purpose"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Purpose</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a purpose" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {purposes.length > 0 ? (
            purposes.map((purpose: any) => (
              <SelectItem key={purpose.name} value={purpose.name.toLowerCase()}>
                {purpose.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="">No options available</SelectItem>
          )}
        </SelectContent>
      </Select>
      <FormDescription>
        Please select a purpose for your form.
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
              {/* End Date Field */}
              <FormField
  control={form.control}
  name="end_date"
  render={({ field }) => (
    <FormItem className="sm:col-span-3 flex flex-col">
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
             {field.value && isValid(new Date(field.value)) ? format(field.value, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(date: any) => {
              field.onChange(date);
            }}
            onBlur={field.onBlur}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )}
/>
              {/* Project Description Field */}
              <FormField
                control={form.control}
                name="project_description"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Project Description"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Pay Method Field */}
              <div className="sm:col-span-3">
                <label htmlFor="pay_method" className="block text-sm font-medium leading-6 text-gray-900">
                  Pay Method
                </label>
                <div className="mt-2">
                  

                  <select {...form.register("pay_method")}>
          {paymentMethods.length > 0 ? (
            paymentMethods.map((method: string, index: number) => (
              <option key={index} value={method}>
                {method}
              </option>
            ))
          ) : (
            <option value="">No options available</option>
          )}
        </select>
                </div>
              </div>
              {/* Project Image Field */}
              <FormField
                control={form.control}
                name="project_image"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Upload Project Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Project Image"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
           <div className="sm:col-span-3">
  <label htmlFor="supported_by" className="block text-sm font-medium leading-6 text-gray-900">
    Supported By
  </label>
  <div className="mt-2">
    <select {...form.register("supported_by")}>
      {supportedByOptions.length > 0 ? (
        supportedByOptions.map((option: string, index: number) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))
      ) : (
        <option value="">No options available</option>
      )}
    </select>
  </div>
</div>
                    {/* Upload Document Field */}
                    <FormField control={form.control} name="upload_document" render={({ field })=> (
                        <FormItem className="sm:col-span-3">
                            <FormLabel>Upload Document</FormLabel>
                            <FormControl>
                                <Input type="file" className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" onChange={(e)=> field.onChange(e.target.files?.[0])} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )} /> {/* Document 1 Description Field */}
                        <FormField control={form.control} name="description" render={({ field })=> (
                            <FormItem className="sm:col-span-3">
                                <FormLabel>Document 1 Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Enter description for the document" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )} /> 

<FormField
                control={form.control}
                name="video_url"
                render={({ field }) => (
                  <FormItem className="sm:col-span-3">
                    <FormLabel>Enter video_url</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Project Tittle"
                        className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                                    {/* Video URL Field */}
                                   

            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <Button type="submit" disabled={isSubmitting}>
            Save Project
          </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
