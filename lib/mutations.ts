import { AuthContext } from "@/contexts/authContext";
import { convertArrayParams } from "./../utils/data/arrayParams";
import { deleteSessionData, getSessionData } from "./actions";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { isEmpty } from "lodash";

const link = (url: string) => {
  // return `${process.env.NEXT_PUBLIC_HOST}/api/proxy${url}`;
  return `https://development.tradefund.com/api${url}`;
};

export const getFetcher = async (url: string, data: any = null) => {
  const params = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  };

  const responseData = await fetch(link(url), params);

  if (!responseData.ok) {
    const error = await responseData.json();
    throw error;
  }

  return await responseData.json();
};

export const getFetcherWithAuth = async (url: string, data: any = null) => {
  const session = getSessionData();


  const params = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    method: "GET",
  };

  if (data) {
    const { paramsUrl } = convertArrayParams(data);
    url = `${url}?${paramsUrl}`;
  }

  const responseData = await fetch(link(url), params);

  if (!responseData.ok) {
    const error = await responseData.json();
    if (responseData.status===401&&!isEmpty(session)) {
      deleteSessionData()
  window.location.replace('/auth/login')
    }
    throw error;
  }

  return await responseData.json();
};

export const postFetcherWithAuth = async (url: string, id: string) => {
  const session = getSessionData();

  const params = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    method: "POST",
    body: JSON.stringify({ id }), // Send the ID as part of the request body
  };

  const responseData = await fetch(link(url), params);

  if (!responseData.ok) {
    const error = await responseData.json();
    throw error;
  }

  return await responseData.json();
};

export const postFetcherWithAuthFormData = async (
  url: string,
  data: { [key: string]: string }
) => {
  const session = getSessionData();

  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const params = {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    body: formData,
  };

  const response = await fetch(link(url), params);

  // Custom handling for the non-standard status code 420
  if (response.status === 420) {
    const responseData = await response.json();
    return { ...responseData };
  }

  // Standard handling for other status codes
  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return await response.json();
};

export const mutateFetcher = async (url: string, data: any) => {
  const params = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  };

  const responseData = await fetch(link(url), params);

  if (!responseData.ok) {
    const error = await responseData.json();
    throw error;
  }

  return await responseData.json();
};

export const mutateFetcherWithAuth = async (url: string, data: any) => {
  const session = getSessionData();

  const params = {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  };

  const responseData = await fetch(link(url), params);

  if (!responseData.ok) {
    const error = await responseData.json();
    throw error;
  }

  return await responseData.json();
};

export const fetchNotification = async () => {
  const session = getSessionData();

  const params = {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET"
  };

  const responseData = await fetch(link("/notification"), params);

  if (!responseData.ok) {
    const error = await responseData.json();
    if (responseData.status===401&&!isEmpty(session)) {
      deleteSessionData()
  window.location.replace('/auth/login')
    }
    throw error;
  }

  return await responseData.json();
};
export const mutateFetcherWithAuthAndImage = async (url: string, data: any) => {
  const session = getSessionData();

  const params = {
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    body: data,
  };

  const responseData = await fetch(link(url), params);

  if (!responseData.ok) {
    const error = await responseData.json();
    throw error;
  }

  return await responseData.json();
};

export const useGetFetchQuery = (key: any) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(key);
};
