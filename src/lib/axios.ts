import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import Cookie from "js-cookie";
import { logout } from "./logout";

interface RefreshQueueItem {
  resolve: (value: void | PromiseLike<void>) => void;
  reject: (reason?: any) => void;
}

let isRefreshing = false;
let refreshQueue: RefreshQueueItem[] = [];
let capturedCallback: () => Promise<any>;

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8008",
  withCredentials: true,
});

api.interceptors.request.use(
  async (config: any) => {
    const token = Cookie.get("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const handleTokenError = () => {
      Cookie.remove("accessToken");
      Cookie.remove("refreshToken");
      // window.location.href = "/login";
    };
    if (
      error.response?.status === 401 &&
      error.response.data.message === "NO_ACCESS_TOKEN"
    ) {
      handleTokenError();
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      error.response.data.message === "NO_REFRESH_TOKEN"
    ) {
      handleTokenError();
      return Promise.reject(error);
    }
    if (
      // error?.response?.data?.message === "INVALID_ACCESS_TOKEN" ||
      error?.response?.data?.message === "INVALID_REFRESH_TOKEN"
    ) {
      handleTokenError();
    }

    if (
      (error.response?.status === 401 && !originalRequest._retry) ||
      error?.response?.data?.message === "INVALID_ACCESS_TOKEN"
    ) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await api.post("/api/v1/auth/refresh");
          const newAccessToken = response.data.accessToken;
          Cookie.set("accessToken", newAccessToken);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (error) {
          logout();
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        
        return new Promise<void>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;

export const withTokenRefresh = async (callback: () => Promise<any>) => {
  capturedCallback = callback;
  try {
    return await capturedCallback();
  } catch (error: any) {
    if (error.response?.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await api.post("/api/v1/auth/refresh");
          const newAccessToken = response.data.accessToken;

          Cookie.set("accessToken", newAccessToken);

          return await capturedCallback();
        } catch (refreshError) {
          logout();
          console.error("Error refreshing token:", refreshError);
          throw refreshError;
        } finally {
          isRefreshing = false;
        }
      } else {
        // If already refreshing, enqueue the retry logic
        return new Promise<void>((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        });
      }
    } else {
      throw error;
    }
  }
};























// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
// import Cookie from "js-cookie";
// import { logout } from "./logout";

// interface RefreshQueueItem {
//   resolve: (value: void | PromiseLike<void>) => void;
//   reject: (reason?: any) => void;
// }

// let isRefreshing = false;
// let refreshQueue: RefreshQueueItem[] = [];
// let capturedCallback: () => Promise<any>;

// const api: AxiosInstance = axios.create({
//   baseURL: "http://localhost:8008",
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   async (config:any) => {
//     const token = Cookie.get("accessToken");
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   async (error) => {
//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };
//     const handleTokenError = () => {
//       Cookie.remove("accessToken");
//       Cookie.remove("refreshToken");
//       // window.location.href = "/login";
//     };

//     if (error.response?.status === 401) {
//       const errorMessage = error.response.data.message;

//       if (
//         errorMessage === "NO_ACCESS_TOKEN" ||
//         errorMessage === "NO_REFRESH_TOKEN" ||
//         errorMessage === "INVALID_REFRESH_TOKEN"
//       ) {
//         handleTokenError();
//       }

//       if (!originalRequest._retry || errorMessage === "INVALID_ACCESS_TOKEN") {
//         originalRequest._retry = true;
//         if (!isRefreshing) {
//           isRefreshing = true;

//           try {
//             const response = await api.post("/api/v1/auth/refresh");
//             const newAccessToken = response.data.accessToken;
//             Cookie.set("accessToken", newAccessToken);
//             originalRequest.headers = originalRequest.headers || {};
//             originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//             return api(originalRequest);
//           } catch (refreshError) {
//             logout();
//             console.error("Error during token refresh:", refreshError);
//             throw refreshError;
//           } finally {
//             isRefreshing = false;
//           }
//         } else {
//           // If already refreshing, enqueue the retry logic
//           return new Promise<void>((resolve, reject) => {
//             refreshQueue.push({ resolve, reject });
//           });
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

// export const withTokenRefresh = async (callback: () => Promise<any>) => {
//   capturedCallback = callback;
//   try {
//     return await capturedCallback();
//   } catch (error: any) {
//     if (error.response?.status === 401) {
//       if (!isRefreshing) {
//         isRefreshing = true;

//         try {
//           const response = await api.post("/api/v1/auth/refresh");
//           const newAccessToken = response.data.accessToken;

//           Cookie.set("accessToken", newAccessToken);

//           return await capturedCallback();
//         } catch (refreshError) {
//           logout();
//           console.error("Error during token refresh:", refreshError);
//           throw refreshError;
//         } finally {
//           isRefreshing = false;
//         }
//       } else {
//         // If already refreshing, enqueue the retry logic
//         return new Promise<void>((resolve, reject) => {
//           refreshQueue.push({ resolve, reject });
//         });
//       }
//     } else {
//       throw error;
//     }
//   }
// };
