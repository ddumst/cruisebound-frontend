import { cn } from "@/utils/cn";
import { FC } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "only-icon";
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
};

const Button: FC<ButtonProps> = (props) => {
  const { variant, className, onClick, children, disabled, loading } = props;

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  return (
    <button
      onClick={handleClick} 
      className={cn(
        "px-3 py-3 text-white rounded-lg",
        {
          "bg-blue-600": variant === "primary",
          "bg-[#32394a]": variant === "only-icon",
          "bg-gray-200": variant === "secondary",
          "cursor-not-allowed opacity-50": disabled,
          "animate-pulse": loading,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;