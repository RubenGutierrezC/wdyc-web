import { toast } from "react-toastify";

export default function useToast() {
  const showSuccessToast = (title: string = "") => {
    toast.success(title);
  };

  const showErrorToast = (error: any = "") => {
    toast.error(error);
  };

  return {
    showSuccessToast,
    showErrorToast,
  };
}
