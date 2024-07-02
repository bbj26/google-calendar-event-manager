import { ToastOptions, toast } from "react-toastify";

const options: ToastOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const showToastifyError = (error: any) => {
  if (error.data) {
    const errors = error.data.message;
    if (errors instanceof Array) {
      for (const error of errors) {
        toast.error(error, options);
      }
    }
    toast.error(errors, options);
  }
};

export const showToastifySuccess = (message: string) =>
  toast.success(message, options);

export const showToastifyWarning = (message: string) =>
  toast.warning(message, options);
