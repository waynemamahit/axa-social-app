import { FormEventHandler, ReactNode } from "react";
import { ModalType } from "../interfaces/Base";
import Loader from "./Loader";

export default function FormModal({
  children,
  id,
  title,
  formLoad,
  onSubmit,
}: {
  children?: ReactNode;
  id: string;
  title: string;
  formLoad: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
}) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl sm:modal-middle">
        <h3 className="text-3xl font-medium text-center">{title.toUpperCase()} FORM</h3>
        <form onSubmit={onSubmit} className="text-center my-4 p-5">
          {children}
          <div className="modal-action justify-center">
            {formLoad ? (
              <Loader sizeClass="loading-md" />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button className="btn bg-primary" type="submit">Submit</button>
                <button
                  className="btn bg-neutral"
                  type="button"
                  onClick={() =>
                    (document.getElementById(id) as ModalType)?.close()
                  }
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </dialog>
  );
}
