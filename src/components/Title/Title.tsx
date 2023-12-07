import { PropsWithChildren } from "react";
import cn from "classnames";
import styles from "./Title.module.scss";

interface TitleProps {
  isBlue?: boolean;
}

const Title = ({ children, isBlue }: PropsWithChildren<TitleProps>) => {
  return (
    <h1 className={cn(styles.title, isBlue && styles.blueTitle)}>{children}</h1>
  );
};

export default Title;
