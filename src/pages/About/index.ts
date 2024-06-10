import { lazy } from "react";

export const LazyAboutPage = lazy(() => {
  return import(/* webpackChunkName: "About-page" */ "./AboutPage");
});
