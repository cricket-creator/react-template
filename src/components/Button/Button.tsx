import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", children, className, ...props }, ref) => {
    return (
      <button ref={ref} type={type} {...props}>
        {children}
      </button>
    );
  }
);
