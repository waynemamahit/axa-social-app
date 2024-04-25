import { FormMode, IFormState } from "../interfaces/Base"

export class FormState implements IFormState {
  formMode: FormMode = "add";
  formLoad = false;
  setFormMode: (formMode: FormMode) => void;

  constructor(
    set: (
      _partial:
        | IFormState
        | Partial<IFormState>
        | ((state: IFormState) => IFormState | Partial<IFormState>),
      _replace?: boolean | undefined
    ) => void
  ) {
    this.setFormMode = (formMode: FormMode) => set({ formMode })
  }
}