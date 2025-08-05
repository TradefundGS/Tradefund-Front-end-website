"use client";

import {
  getFetcherWithAuth,
  mutateFetcher,
  postFetcherWithAuth,
  mutateFetcherWithAuthAndImage,
  mutateFetcherWithAuth,
  fetchNotification,
} from "@/lib/mutations";
import { useMutation, useQuery } from "@tanstack/react-query";

function useProjects(data?: any) {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => await getFetcherWithAuth("/home", data),
  });
}

function useAllProjects(data?: any) {
  return useQuery({
    queryKey: ["search"],
    queryFn: async () => await mutateFetcherWithAuth("/all_project_filter", data),
  });
}


function useProfile(data?: any) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => await getFetcherWithAuth("/profile", data),
  });
}
function useLogout(data?: any) {
  return useQuery({
    queryKey: ["logout"],
    queryFn: async () => await getFetcherWithAuth("/logout", data),
  });
}

function useGetWithdrawRequest(data?: any) {
  return useQuery({
    queryKey: ["get withdrawrequest"],
    queryFn: async () => await getFetcherWithAuth("/get_withdraw_request", data),
  });
}


function useGetBankAccount(data?: any) {
  return useQuery({
    queryKey: ["get Bank Account"],
    queryFn: async () => await getFetcherWithAuth("/get_bank_account", data),
  });
}



// function useMyProjects(data?: any) {
//   return useQuery({
//     queryKey: ["dashboard"],
//     queryFn: async () => await getFetcherWithAuth("/dashboard", data),
//   });
// }

function useMyProjects(filterType: string) {
  return useQuery({
    queryKey: ["dashboard", filterType],
    queryFn: async () => {
      const url = `/dashboard?type=${filterType}`;
      return await getFetcherWithAuth(url);
    },
  });
}

function useFundLists(filterType: string) {
  return useQuery({
    queryKey: ["funds_list", filterType],
    queryFn: async () => {
      const url = `/funds_list?type=${filterType}`;
      return await getFetcherWithAuth(url);
    },
  });
}



function useTransaction(filterType: string) {
  return useQuery({
    queryKey: ["transactions", filterType],
    queryFn: async () => {
      const url = `/transactions?type=${filterType}`;
      return await getFetcherWithAuth(url);
    },
  });
}

function useInvest(data?: any) {
  return useQuery({
    queryKey: ["invest"],
    queryFn: async () => await postFetcherWithAuth("/project/invest", data),
  });
}

function useReadNotification(data?: any) {
  return useQuery({
    queryKey: ["read"],
    queryFn: async () => await getFetcherWithAuth("/read_notification", data),
  });
}

function useGetCreateProject(data?: any) {
  return useQuery({
    queryKey: ["createproject"],
    queryFn: async () => await getFetcherWithAuth("/project/get_project", data),
  });
}


function useEditProject({onSuccess}) {
  return useMutation({
    mutationFn: async (data: any) => {
      return await mutateFetcherWithAuthAndImage("/project/edit_project", data);
    },
    onSuccess
  });
}

function useGetProjectDetails(projectId?: string) {
  return useQuery({
    queryKey: ["projectDetails", projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return await postFetcherWithAuth("/get_project_details", projectId);
    },
  });
}

function useGuestProjectDetails(projectId?: string) {
  return useQuery({
    queryKey: ["GuestprojectDetails", projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return await postFetcherWithAuth("/guest_project_details", projectId);
    },
  });
}

function useGetRepaymentDetails(projectId?: string) {
  return useQuery({
    queryKey: ["RepaymentDetails", projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return await getFetcherWithAuth("/get_repayment", projectId);
    },
  });
}

function useCancelWithdraw(projectId) {
  return useQuery({
    queryKey: ["CancelWithdrawRequest", projectId],
    queryFn: async () => {
      console.log('hi im coming',projectId)

      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return await getFetcherWithAuth(`/cancel_withdraw?id=${projectId}`);
    },
    enabled:false,
  });
}





function useAddComment() {
  return useMutation({
    mutationFn: async ({
      projectId,
      comment,
      privateValue,
    }: {
      projectId: string;
      comment: string;
      privateValue:string;
    }) => {
      return await mutateFetcherWithAuth("/add_comment", {
        project_id: projectId,
        comment,
        private:privateValue
      });
    },
  });
}


function useFollowProject() {
  return useMutation({
    mutationFn: async (data: any) => {
      return await mutateFetcherWithAuth("/follow", data);
    },
  });
}


function useCancelFund() {
  return useMutation({
    mutationFn: async (data: any) => {
      return await mutateFetcherWithAuth("/cancel_fund", data);
    },
  });
}
function useDeleteAccount({onSuccess, onError}) {
  return useMutation({
    mutationFn: async (data: any) => {
      return await mutateFetcherWithAuth("/delete_account", data);
    },
    onSuccess,
    onError
  });
}


function useNotification() {
  return useQuery({
    queryKey: 'notification',
    queryFn: fetchNotification
  });
}

function useAddBank({onSuccess, onError}:any) {
  return useMutation({
    mutationFn: async (data: any) => {
      return await mutateFetcherWithAuth("/add_bank_account", data);
    },
    onSuccess,
    onError
  });
}

function useEditbankBank() {
  return useMutation({
    mutationFn: async (data: any) => {
      return await mutateFetcherWithAuth("/edit_bank_account", data);
    },
  });
}

function useMakePrimary({onSuccess,onError}) {
  return useMutation({
    mutationFn: async (data: any) => {
      return await mutateFetcherWithAuth("/make_primary", data);
    },
    onSuccess,
    onError
  });
}


function useContactUs() {
  return useMutation({
    mutationFn: async (data: any) => {
      return await mutateFetcherWithAuth("/contact_us", data);
    },
  });
}


function useCreateProject() {
  return useMutation({
    mutationFn: async (data: any) => {
      return await mutateFetcherWithAuthAndImage("/project/create", data);
    },
  });
}


function useChangePassword() {
  return useMutation({
    mutationFn: async ({
      old_password,
      new_password,
      confirm_password,
    }: {
      old_password: string;
      new_password: string;
      confirm_password: string;
    }) => {
      return await mutateFetcherWithAuth("/change_password", {
        old_password,
        new_password,
        confirm_password
      });
    },
  });
}


export {
  useProjects,
  useGetProjectDetails,
  useAddComment,
  useCreateProject,
  useFollowProject,
  useChangePassword, 
  useProfile,
  useInvest,
  useMyProjects,
  useContactUs,
  useGetCreateProject,
  useNotification,
  useTransaction,
  useEditProject,
  useReadNotification,
  useCancelFund,
  useGetWithdrawRequest,
  useAddBank,
  useGetBankAccount,
  useFundLists,
  useEditbankBank,
  useMakePrimary,
  useDeleteAccount,
  useAllProjects,
  useGuestProjectDetails,
  useGetRepaymentDetails,
  useCancelWithdraw,
  useLogout
};