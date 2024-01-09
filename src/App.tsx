import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./router";
import { OnlineStatusProvider } from "./providers";

const App = () => {
  return (
    <OnlineStatusProvider>
      <RouterProvider router={browserRouter} />
    </OnlineStatusProvider>
  );
};

export default App;
