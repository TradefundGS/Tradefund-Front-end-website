'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { mutateFetcher } from '@/lib/mutations';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CircleAlert } from 'lucide-react';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { getSessionData } from '@/lib/actions';  // Import the getSessionData function

const schema = z.object({
  otp: z.string().min(4, 'OTP must be exactly 4 characters long') // Adjust length based on your OTP requirement
});

type VerifyOTPValues = z.infer<typeof schema>;

interface VerifyOTPProps {
  onNext: () => void;
  mail:string;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ onNext,mail }) => {
 

  const form = useForm<VerifyOTPValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      otp: '',
    },
  });

  // console.log(mail)

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: VerifyOTPValues) => mutateFetcher('/verify_otp', {...data,email:mail}), // Include email here
    onError: (error: AxiosError) => {
      toast.error("Error verifying OTP", {
        description: error.message,
        icon: <CircleAlert className="h-4 w-4" color="red" />,
      });
    },
    onSuccess: (data: any) => {
      toast.success("OTP verified successfully!", {
        description: "You can now reset your password.",
      });
      onNext();
    },
  });

  const onSubmit: SubmitHandler<VerifyOTPValues> = (values) => {
    mutate(values);
  };

  return (
    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
         
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    autoComplete="off"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerifyOTP;
