import { lazy } from "react";

export default lazy(
  () => import(/* webpackChunkName: "Not-found" */ "./NotFoundPage")
);
