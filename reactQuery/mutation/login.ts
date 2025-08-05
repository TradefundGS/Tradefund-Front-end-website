"use client";

import { getFetcher } from "@/lib/mutations";
import { useQuery } from "@tanstack/react-query";

function useSecurity(data?: any) {
  return useQuery({
    queryKey: ["security"],
    queryFn: async () => await getFetcher("/security", data),
  });
}

export {useSecurity}