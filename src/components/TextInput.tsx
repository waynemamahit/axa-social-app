import { InputProps } from "../interfaces/Base";
import FormControl from "./FormControl";

export default function TextInput<DataField = object>({
  placeholder,
  type = "text",
  name,
  errors,
  register,
}: InputProps<DataField> & { type?: string }) {
  return (
    <FormControl errors={errors}>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...register(name, {
          required: {
            value: true,
            message: "Required!",
          },
          minLength: {
            value: 2,
            message: "Must have least 2 character!",
          },
          ...(type === "email"
            ? {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Enter a valid email address!",
                },
              }
            : {}),
        })}
      />
    </FormControl>
  );
}
