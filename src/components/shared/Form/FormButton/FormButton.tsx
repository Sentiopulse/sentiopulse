import { Button } from "@/components/ui/button";

type FormButtonProps = {
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function FormButton({
  type = "submit",
  loading = false,
  disabled = false,
  className = "",
  children,
}: FormButtonProps) {
  return (
    <Button
      type={type}
      disabled={disabled || loading}
      className={className}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
}