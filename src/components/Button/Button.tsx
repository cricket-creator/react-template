import { ButtonHTMLAttributes, forwardRef } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isBlue?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, isBlue, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(isBlue && styles.blueButton)} {...props}>
        {children}
      </button>
    );
  },
);

export default Button;
