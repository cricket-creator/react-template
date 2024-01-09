import Layout from "components/Layout/Layout";
import { HomePage, AboutPage, NotFoundPage } from "pages";
import { Suspense } from "react";
import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";

type MenuItem = {
  name: string;
  path: string;
};

type RouteObjectWithMenu = Omit<RouteObject, "children"> & {
  menu?: Omit<MenuItem, "path">;
  children?: RouteObjectWithMenu[];
};

const ROUTES: RouteObjectWithMenu[] = [
  { menu: { name: "Home" }, path: "/", element: <HomePage /> },
  { menu: { name: "About" }, path: "/about", element: <AboutPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export const buildMenu = (routes: RouteObjectWithMenu[]) => {
  return routes.reduce((acc, route) => {
    if (route.path && route.menu) {
      return [
        ...acc,
        {
          name: route.menu.name,
          path: route.path,
        },
      ];
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
