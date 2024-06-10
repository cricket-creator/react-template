import { lazy } from "react";

export const LazyNotFoundPage = lazy(() => {
  return import(/* webpackChunkName: "Not-found-page" */ "./NotFoundPage");
});
