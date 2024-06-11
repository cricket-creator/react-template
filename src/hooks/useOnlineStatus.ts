import { onlineStatusContext } from "contexts";
import { useContext } from "react";

export const useOnlineStatus = () => {
  return useContext(onlineStatusContext);
};
