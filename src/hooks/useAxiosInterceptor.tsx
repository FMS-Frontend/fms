import { useEffect } from "react";
import axios from "axios";
import URL from "../db/url";

/**
 * Hook to configure Axios interceptors for attaching authentication tokens.
 */
const url = "/auth/refresh";
const refreshAccessToken = async (currentRefreshToken: string | null) => {
  try {
    const response = await axios.post(
      `https://staging-api.tranzgard.com${url}`,
      {
        headers: {
          "x-refresh-token": currentRefreshToken,
        },
      }
    );

    console.log("refreshTee => ", response);

    // localStorage.setItem("refreshToken", )

    console.log(response);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useAxiosInterceptor = () => {
  // const { authToken, refreshToken, setAuthToken, setRefreshToken } =
  //   useAppContext();

  useEffect(() => {
    // Add a request interceptor
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    const requestInterceptor = URL.interceptors.request.use(
      (config) => {
        // console.log("autheee1 ======> ", accessToken);
        // console.log("refreshhhh1 ======> ", refreshToken);
        config.headers["x-access-token"] = accessToken; // Attach the token to the header
        config.headers["x-refresh-token"] = refreshToken;
        return config;
      },
      (error) => {
        // Handle request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor (optional, for handling errors globally)
    const responseInterceptor = URL.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          if (
            error.response.data.message
              .toLowerCase()
              .includes("invalid or expired token")
          ) {
            // Refresh Token
            return refreshAccessToken(refreshToken);
          }

          console.error("Unauthorized! Redirecting to login.");
          console.log(error.response.data.message);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup the interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};
