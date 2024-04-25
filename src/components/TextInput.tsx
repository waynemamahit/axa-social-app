import { InputProps } from "../interfaces/Base";
import FormControl from "./FormControl";

export default function TextInput<DataField = object>({
  placeholder,
  name,
  errors,
  register,
}: InputProps<DataField>) {
  return (
    <FormControl errors={errors}>
      <input
        type="text"
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...register(name, { required: true })}
      />
    </FormControl>
  );
}
