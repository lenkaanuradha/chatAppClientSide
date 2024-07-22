// import Axios from "axios";
// import { toast } from "react-toastify";

// const authRequestInterceptor = (config) => {
//   const authToken = localStorage.getItem("token");
//   config.headers = config.headers ?? {};

//   if (authToken) {
//     console.log("axios interceptor")
//     console.log(authToken)
//     config.headers.authorization = `Bearer ${authToken}`;
//   }
//   config.headers.Accept = "application/json";
 
//   return config;
// };

// export const axiosInstance = Axios.create({
//   baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
// });

// axiosInstance.interceptors.response.use(function (response) {
 

//   return response;
// }, function (error) {
  
 
  
//   if (!error) {
//     error.code !== "ERR_CANCELED" &&
//       toast.error("Something went wrong with server");
     
//     return Promise.reject(error);
//   }
// console.log(error,"error")
//   const message =
//     error?.response?.data?.message || error?.message || "Something went wrong";
//   toast.error(message);
  
  
  
//   return Promise.reject(error);
// });

// axiosInstance.interceptors.request.use(authRequestInterceptor);





