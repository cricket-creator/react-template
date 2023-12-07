import { onlineContext } from "contexts/OnlineContext";
import { useContext } from "react";

const useOnline = () => useContext(onlineContext);

export default useOnline;
