import { RouterProvider } from "react-router-dom";
import { OnlineStatusProvider } from "providers";
import { browserRouter } from "./router";
import "styles/reset.scss";

const App = () => {
  return (
    <OnlineStatusProvider>
      <RouterProvider router={browserRouter} />
    </OnlineStatusProvider>
  );
};

export default App;
