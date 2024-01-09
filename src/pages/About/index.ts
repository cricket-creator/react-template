import { lazy } from "react";

export default lazy(
  () => import(/* webpackChunkName: "About-page" */ "./AboutPage")
);
