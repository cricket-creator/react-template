import { Layout } from "components";
import { LazyHomePage, LazyAboutPage, LazyNotFoundPage } from "pages";
import { Suspense } from "react";
import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";

export type MenuItem = {
  name: string;
  path: string;
};

type RouteObjectWithMenu = Omit<RouteObject, "children"> & {
  menu?: Omit<MenuItem, "path">;
  children?: RouteObjectWithMenu[];
};

const ROUTES: RouteObjectWithMenu[] = [
  { menu: { name: "Home" }, path: "/", element: <LazyHomePage /> },
  { menu: { name: "About" }, path: "/about", element: <LazyAboutPage /> },
  { path: "*", element: <LazyNotFoundPage /> },
];

export const buildMenu = (routes: RouteObjectWithMenu[]) => {
  return routes.reduce((acc, route) => {
    const { path, menu } = route;
    if (path && menu) {
      return [...acc, { name: menu.name, path }];
    }
    return acc;
  }, [] as MenuItem[]);
};

const menu = buildMenu(ROUTES);

export const browserRouter = createBrowserRouter([
  {
    element: <Layout menu={menu} />,
    children: [
      {
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        ),
        children: ROUTES as RouteObject[],
      },
    ],
  },
]);
