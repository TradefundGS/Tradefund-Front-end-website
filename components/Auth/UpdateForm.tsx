'use client';
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { mutateFetcher } from '@/lib/mutations';
import { useRouter } from 'next/navigation';
import { FiEye, FiEyeOff } from "react-icons/fi";

// Define the validation schema with zod
const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirm_password: z.string().min(8, 'Confirm password must be at least 8 characters long'),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

type UpdatePasswordValues = z.infer<typeof schema>;

interface UpdatePasswordProps {
  email: string;
  onNext: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ email, onNext }) => {
  const router = useRouter();
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { mutate, isPending:isLoading } = useMutation({
    mutationFn: (data: UpdatePasswordValues) => mutateFetcher('/forgot_password', { ...data, email }) ,
    onError: (error: AxiosError) => {
      toast.error("Error updating password", {
        description: error.message,
        icon: <CircleAlert className="h-4 w-4" color="red" />,
      });
      
    },
    onSuccess: () => {
      toast.success("Password updated successfully!", {
        description: "You can now log in with your new password.",
      });
      router.push('/auth/login');
    },
  });

  const onSubmit: SubmitHandler<UpdatePasswordValues> = (values) => {
    mutate(values);
  };

  return (
    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>New Password</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            autoComplete="new-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10" // Add padding on the right side for the button
            {...field}
          />
          <button 
            type="button" 
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-400 focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500" // Position the button
          >
            <span>{showNewPassword ? <FiEye /> : <FiEyeOff />}</span>
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="confirm_password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Confirm Password</FormLabel>
      <FormControl>
        <div className="relative">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            autoComplete="new-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pr-10" // Add padding on the right side for the button
            {...field}
          />
          <button 
            type="button" 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-400 focus:outline-none focus:text-blue-600 dark:text-neutral-600 dark:focus:text-blue-500" // Position the button
          >
            <span>{showConfirmPassword ? <FiEye /> : <FiEyeOff />}</span>
          </button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePassword;
