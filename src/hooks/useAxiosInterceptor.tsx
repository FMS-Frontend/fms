// import { useEffect } from "react";
// import axios from "axios";
// import URL from "../db/url";

// /**
//  * Hook to configure Axios interceptors for attaching authentication tokens.
//  */
// const url = "/auth/refresh";
// const refreshAccessToken = async (currentRefreshToken: string | null) => {
//   try {
//     const response = await axios.post(
//       `https://staging-api.tranzgard.com${url}`,
//       {
//         headers: {
//           "x-refresh-token": currentRefreshToken,
//         },
//       }
//     );

//     // console.log("refreshTee => ", response);

//     // localStorage.setItem("refreshToken", )

//     console.log(response);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const useAxiosInterceptor = () => {
//   // Add a request interceptor
//   const accessToken = localStorage.getItem("accessToken");
//   const refreshToken = localStorage.getItem("refreshToken");

//   useEffect(() => {
//     const skippedPaths = ["login"];

//     const requestInterceptor = URL.interceptors.request.use(
//       (config) => {
//         // console.log(config.url);

//         const pathUrl = config.url?.split("/").reverse()[0];

//         if (skippedPaths.includes(pathUrl!)) {
//           console.log("skipping login ====>");
//           console.log("default headers", config.headers["x-access-token"]);
//           console.log("from local", accessToken);

//           return config;
//         }

//         config.headers["x-access-token"] = accessToken; // Attach the token to the header
//         config.headers["x-refresh-token"] = refreshToken;
//         return config;
//       },
//       (error) => {
//         // Handle request error
//         return Promise.reject(error);
//       }
//     );

//     // Add a response interceptor (optional, for handling errors globally)
//     const responseInterceptor = URL.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401) {
//           if (
//             error.response.data.message
//               .toLowerCase()
//               .includes("invalid or expired token")
//           ) {
//             // Refresh Token
//             return refreshAccessToken(refreshToken);
//           }

//           console.error("Unauthorized! Redirecting to login.");
//           console.log(error.response.data.message);
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Cleanup the interceptors when the component unmounts
//     return () => {
//       axios.interceptors.request.eject(requestInterceptor);
//       axios.interceptors.response.eject(responseInterceptor);
//     };
//   }, [accessToken, refreshToken]);
// };  


import { useEffect } from "react";
import axios, { InternalAxiosRequestConfig } from "axios";
import URL from "../db/url";

const refreshAccessToken = async (currentRefreshToken: string | null): Promise<string> => {
  try {
    const response = await axios.post(
      "https://staging-api.tranzgard.com/auth/refresh",
      {},
      {
        headers: {
          "x-refresh-token": currentRefreshToken,
        },
      }
    );

    const { accessToken, refreshToken } = response.data;

    // Store the new tokens in localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    throw error;
  }
};

// Type for failed requests in the queue
type FailedRequest = {
  onSuccess: (token: string) => void;
  onFailure: (error: unknown) => void;
};

export const useAxiosInterceptor = () => {
  useEffect(() => {
    const skippedPaths = ["login"];
    let isRefreshing = false;
    let failedRequestsQueue: FailedRequest[] = [];

    const requestInterceptor = URL.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Ensure headers exist
        config.headers = config.headers ?? {};

        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        // Skip specific paths i.e login
        const pathUrl = config.url?.split("/").reverse()[0];
        if (skippedPaths.includes(pathUrl!)) {
          return config;
        }

        if (accessToken) {
          config.headers["x-access-token"] = accessToken;
        }
        if (refreshToken) {
          config.headers["x-refresh-token"] = refreshToken;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseInterceptor = URL.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem("refreshToken");

        // Handle 401 Unauthorized errors
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          refreshToken
        ) {
          originalRequest._retry = true;

          if (!isRefreshing) {
            isRefreshing = true;

            try {
              const newAccessToken = await refreshAccessToken(refreshToken);

              // Retry all queued requests with the new token
              failedRequestsQueue.forEach((req) => {
                req.onSuccess(newAccessToken);
              });

              failedRequestsQueue = [];
              isRefreshing = false;

              originalRequest.headers["x-access-token"] = newAccessToken;
              return URL(originalRequest);
            } catch (err) {
              failedRequestsQueue.forEach((req) => req.onFailure(err));
              failedRequestsQueue = [];
              isRefreshing = false;
              throw err;
            }
          } else {
            // Queue the request while the token is being refreshed
            return new Promise((resolve, reject) => {
              failedRequestsQueue.push({
                onSuccess: (token: string) => {
                  originalRequest.headers["x-access-token"] = token;
                  resolve(URL(originalRequest));
                },
                onFailure: (err: unknown) => {
                  reject(err);
                },
              });
            });
          }
        }

        // Redirect to login if refresh token fails or unauthorized
        if (error.response?.status === 401) {
          console.error("Unauthorized! Redirecting to login.");
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    );

    return () => {
      URL.interceptors.request.eject(requestInterceptor);
      URL.interceptors.response.eject(responseInterceptor);
    };
  }, []);
};
