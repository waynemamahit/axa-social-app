import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";

export type ModalType =
  | (HTMLElement & {
      showModal: () => void;
      close: () => void;
    })
  | null;

export type FormMode = "add" | "edit";

export interface IFormState {
  formMode: FormMode;
  formLoad: boolean;
  setFormMode: (formMode: FormMode) => void;
}

export interface InputProps<DataField> {
  placeholder: string;
  name: Path<DataField & FieldValues>;
  errors: FieldError | undefined;
  register: UseFormRegister<DataField & FieldValues>;
}

