import { ButtonHTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ type = "button", children, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          children ? styles.buttonWithChildren : styles.buttonWithoutChildren
        )}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
