import { ReactNode } from "react";
import { FieldError } from "react-hook-form";

export default function FormControl({
  children,
  errors,
}: {
  children?: ReactNode;
  errors: FieldError | undefined;
}) {
  return (
    <label className="form-control w-full mt-3">
      {children}
      {errors ? (
        <div className="label">
          <span className="label-text-alt text-red-500">{errors.message}</span>
        </div>
      ) : null}
    </label>
  );
}
