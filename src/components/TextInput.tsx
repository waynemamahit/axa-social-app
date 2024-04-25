import { InputProps } from "../interfaces/Base";
import FormControl from "./FormControl";

export default function TextInput<DataField = object>({
  placeholder,
  type = 'text',
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
        {...register(name, { required: true })}
      />
    </FormControl>
  );
}
