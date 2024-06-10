import { onlineStatusContext } from "contexts/onlineStatusContext";
import { useContext } from "react";

export const useOnlineStatus = () => {
  return useContext(onlineStatusContext);
};
