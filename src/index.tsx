import ReactDOM from "react-dom/client";
import App from "./App";
import { BlueColorProvider, OnlineProvider } from "./contexts";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <OnlineProvider>
    <BlueColorProvider>
      <App />
    </BlueColorProvider>
  </OnlineProvider>,
);
