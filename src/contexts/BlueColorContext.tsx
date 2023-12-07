import {
  PropsWithChildren,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

interface BlueColorContext {
  isBlue: boolean;
  toggleIsBlue: () => void;
}

export const blueColorContext = createContext<BlueColorContext>({
  isBlue: false,
  toggleIsBlue: () => {},
});

const { Provider } = blueColorContext;

export const BlueColorProvider = ({ children }: PropsWithChildren) => {
  const [isBlue, setIsBlue] = useState(false);
  console.log("rerender");
  const toggleIsBlue = useCallback(() => {
    setIsBlue((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({ isBlue, toggleIsBlue }),
    [isBlue, toggleIsBlue],
  );

  return <Provider value={value}>{children}</Provider>;
};
