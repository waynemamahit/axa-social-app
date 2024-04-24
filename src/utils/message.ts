import Swal from "sweetalert2";

export const showError = async (message: string, title = "Failed") => {
  const { isConfirmed } = await Swal.fire(title, message, "error");
  if (isConfirmed) {
    window.location.reload();
  } else {
    setTimeout(() => window.location.reload(), 5000);
  }
};
