// import toast, { Toaster, ToastOptions } from "react-hot-toast";

// // Default toast options
// const defaultOptions: ToastOptions = {
//   duration: 4000,
//   position: 'top-right',
//   style: {
//     background: '#363636',
//     color: '#fff',
//     borderRadius: '8px',
//     fontSize: '14px',
//     padding: '12px 16px',
//     maxWidth: '400px',
//   },
// };

// // Success toast with custom styling
// const showSuccess = (message: string, options?: ToastOptions) => {
//   return toast.success(message, {
//     ...defaultOptions,
//     style: {
//       ...defaultOptions.style,
//       background: '#10B981',
//       color: '#fff',
//     },
//     iconTheme: {
//       primary: '#fff',
//       secondary: '#10B981',
//     },
//     ...options,
//   });
// };

// // Error toast with custom styling
// const showError = (message: string, options?: ToastOptions) => {
//   return toast.error(message, {
//     ...defaultOptions,
//     style: {
//       ...defaultOptions.style,
//       background: '#EF4444',
//       color: '#fff',
//     },
//     iconTheme: {
//       primary: '#fff',
//       secondary: '#EF4444',
//     },
//     ...options,
//   });
// };

// // Info toast with custom styling
// const showInfo = (message: string, options?: ToastOptions) => {
//   return toast(message, {
//     ...defaultOptions,
//     style: {
//       ...defaultOptions.style,
//       background: '#3B82F6',
//       color: '#fff',
//     },
//     icon: 'ℹ️',
//     ...options,
//   });
// };

// // Warning toast with custom styling
// const showWarning = (message: string, options?: ToastOptions) => {
//   return toast(message, {
//     ...defaultOptions,
//     style: {
//       ...defaultOptions.style,
//       background: '#F59E0B',
//       color: '#fff',
//     },
//     icon: '⚠️',
//     ...options,
//   });
// };

// // Loading toast
// const showLoading = (message: string = 'Loading...', options?: ToastOptions) => {
//   return toast.loading(message, {
//     ...defaultOptions,
//     style: {
//       ...defaultOptions.style,
//       background: '#6B7280',
//       color: '#fff',
//     },
//     ...options,
//   });
// };

// // Promise toast for async operations
// const showPromise = <T>(
//   promise: Promise<T>,
//   messages: {
//     loading: string;
//     success: string | ((data: T) => string);
//     error: string | ((error: any) => string);
//   },
//   options?: ToastOptions
// ) => {
//   return toast.promise(promise, messages, {
//     ...defaultOptions,
//     success: {
//       style: {
//         ...defaultOptions.style,
//         background: '#10B981',
//         color: '#fff',
//       },
//       iconTheme: {
//         primary: '#fff',
//         secondary: '#10B981',
//       },
//     },
//     error: {
//       style: {
//         ...defaultOptions.style,
//         background: '#EF4444',
//         color: '#fff',
//       },
//       iconTheme: {
//         primary: '#fff',
//         secondary: '#EF4444',
//       },
//     },
//     loading: {
//       style: {
//         ...defaultOptions.style,
//         background: '#6B7280',
//         color: '#fff',
//       },
//     },
//     ...options,
//   });
// };

// // Custom toast with any content
// const showCustom = (content: React.ReactNode, options?: ToastOptions) => {
//   return toast.custom(content, {
//     ...defaultOptions,
//     ...options,
//   });
// };

// // Dismiss specific toast
// const dismiss = (toastId?: string) => {
//   return toast.dismiss(toastId);
// };

// // Dismiss all toasts
// const dismissAll = () => {
//   return toast.dismiss();
// };

// // Toast utility object
// export const toastUtils = {
//   success: showSuccess,
//   error: showError,
//   info: showInfo,
//   warning: showWarning,
//   loading: showLoading,
//   promise: showPromise,
//   custom: showCustom,
//   dismiss,
//   dismissAll,
// };
// export default toast;

// // Export Toaster component for app-level setup
// export { Toaster };
