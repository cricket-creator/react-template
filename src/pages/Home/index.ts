import { lazy } from "react";

export const LazyHomePage = lazy(() => {
  return import(/* webpackChunkName: "Home-page" */ "./HomePage");
});
