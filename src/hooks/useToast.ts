// import { useSnackbar } from "notistack";
// import handleErrorMessage from "../utils/handleErrorMessage";

export default function useToast() {
  // const { enqueueSnackbar } = useSnackbar();

  const showSuccessToast = (title: string = "") => {
    // enqueueSnackbar(title, {
    //   variant: "success",
    // });
  };

  const showErrorToast = (error: any = "") => {
    console.log("error", error);
    // enqueueSnackbar(handleErrorMessage(error), {
    //   variant: "error",
    // });
  };

  return {
    showSuccessToast,
    showErrorToast,
  };
}
