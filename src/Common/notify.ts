import { toast } from "react-toastify";

const timeout = 3000;

export const success = (msg: string) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: timeout,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
  });
};

export const error = (msg: string) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: timeout,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
  });
};

export const warn = (msg: string) => {
  toast.warn(msg, {
    position: "top-right",
    autoClose: timeout,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    pauseOnFocusLoss: false,
  });
};
