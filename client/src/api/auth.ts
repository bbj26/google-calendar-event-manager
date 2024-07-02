import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_ENDPOINT,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await axiosClient.get("/google/verify");
    return response.status === 200;
  } catch (error: any) {
    return false;
  }
};
