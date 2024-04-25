import { InputProps } from "../interfaces/Base";
import FormControl from "./FormControl";

export default function Textarea<DataField = object>({
  placeholder,
  name,
  errors,
  register,
}: InputProps<DataField>) {
  return (
    <FormControl errors={errors}>
      <textarea
        placeholder={placeholder}
        className="textarea textarea-bordered w-full"
        {...register(name)}
      ></textarea>
    </FormControl>
  );
}
