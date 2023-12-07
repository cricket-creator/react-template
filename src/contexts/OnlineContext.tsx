import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const onlineContext = createContext(false);

const { Provider } = onlineContext;

export const OnlineProvider = ({ children }: PropsWithChildren) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const handleOnline = useCallback(() => setIsOnline(true), []);
  const handleOffline = useCallback(() => setIsOnline(false), []);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const value = useMemo(() => isOnline, [isOnline]);

  return <Provider value={value}>{children}</Provider>;
};
