import { AUTHENTICATION_TOKEN_KEY } from "@/constants/storage";
import { getFromStorage } from "@/utils/storage";
import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "https://desafiostudiomega-2d925d8d0b86.herokuapp.com/v1",
});

type Body = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
};

type Params = {
  method: string;
  url: string;
  data?: Body;
};

export type ResponseReturn = {
  success: boolean;
  message?: string;
  data?: {
    name?: string;
    email?: string;
    access_token?: string;
  };
};

export default async function callAPI(params: Params): Promise<ResponseReturn> {
  const { method, url, data } = params;

  const headers: { Authorization?: string } = {};

  const token = getFromStorage(AUTHENTICATION_TOKEN_KEY);

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await api({
      method,
      url,
      headers,
      data,
    });

    return { ...response, success: true };
  } catch (error) {
    const err = error as AxiosError;

    if (err.response?.data) {
      return { ...err.response.data, success: false };
    }

    return { message: "Erro desconhecido", success: false };
  }
}
