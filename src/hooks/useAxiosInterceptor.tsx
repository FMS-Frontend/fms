/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import axios from "axios";
import URL from "../db/url";
import { useAppContext } from "../context/AppContext";

/**
 * Hook to configure Axios interceptors for handling authentication tokens
 */
export const useAxiosInterceptor = () => {
  const { setAccessToken, setRefreshToken } = useAppContext();

  useEffect(() => {
    let isRefreshing = false;
    let failedQueue: any[] = [];

    const processQueue = (error: any, token: string | null = null) => {
      failedQueue.forEach((prom) => {
        if (error) {
          prom.reject(error);
        } else {
          prom.resolve(token);
        }
      });
      failedQueue = [];
    };

    const requestInterceptor = URL.interceptors.request.use(
      (config) => {
        // Skip auth header for login/refresh endpoints
        if (
          config.url?.includes("auth/login") ||
          config.url?.includes("auth/refresh")
        ) {
          return config;
        }

        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          config.headers["x-access-token"] = accessToken;
        }

        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          config.headers["x-refresh-token"] = refreshToken;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = URL.interceptors.response.use(
      (response) => {
        // Update tokens if they're in the response headers
        const newAccessToken = response.headers["x-access-token"];
        const newRefreshToken = response.headers["x-refresh-token"];

        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          setAccessToken(newAccessToken);
        }
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
          setRefreshToken(newRefreshToken);
        }

        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            // Queue the failed request
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalRequest.headers["x-access-token"] = token;
                return URL(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const response = await axios.post(
              "https://staging-api.tranzgard.com/auth/refresh",
              {},
              {
                headers: {
                  "x-refresh-token": refreshToken,
                },
              }
            );

            const newAccessToken = response.headers["x-access-token"];
            const newRefreshToken = response.headers["x-refresh-token"];

            if (newAccessToken) {
              localStorage.setItem("accessToken", newAccessToken);
              setAccessToken(newAccessToken);
              URL.defaults.headers.common["x-access-token"] = newAccessToken;
            }

            if (newRefreshToken) {
              localStorage.setItem("refreshToken", newRefreshToken);
              setRefreshToken(newRefreshToken);
            }

            processQueue(null, newAccessToken);
            return URL(originalRequest);
          } catch (refreshError) {
            processQueue(refreshError, null);
            // Clear tokens and redirect to login
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("role");
            setAccessToken(null);
            setRefreshToken(null);
            window.location.href = "/login";
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      URL.interceptors.request.eject(requestInterceptor);
      URL.interceptors.response.eject(responseInterceptor);
    };
  }, [setAccessToken, setRefreshToken]);
};
