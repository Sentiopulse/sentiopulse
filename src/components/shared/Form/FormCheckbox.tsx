import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: React.ReactNode;
  required?: boolean;
};

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
}: FormCheckboxProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormControl>
              <input
                id={name}
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={!!field.value}
                onChange={field.onChange}
                ref={field.ref}
                required={required}
              />
            </FormControl>
            <FormLabel htmlFor={name} className="text-sm text-gray-600">
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
