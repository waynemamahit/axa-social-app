import Swal, { SweetAlertIcon } from "sweetalert2";

export const showMessage = async (
  text: string,
  title = "Success",
  icon: SweetAlertIcon = "success"
) =>
  await Swal.fire({
    title,
    text,
    icon,
  });

export const showError = async (message: string, title = "Failed") => {
  const { isConfirmed } = await showMessage(message, title, "error");
  if (isConfirmed) {
    window.location.reload();
  } else {
    setTimeout(() => window.location.reload(), 5000);
  }
};

export const confirmMessage = async (process: (_id: number) => Promise<void>, id: number) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  if (result.isConfirmed) {
    await process(id);
  }
};
