import { lazy } from "react";

export default lazy(
  () => import(/* webpackChunkName: "Home-page" */ "./HomePage")
);
