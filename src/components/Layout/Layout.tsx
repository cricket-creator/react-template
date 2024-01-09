import { FC, PropsWithChildren } from "react";
import { Link, Outlet } from "react-router-dom";
import { buildMenu } from "router";

type LayoutProps = PropsWithChildren<{
  menu: ReturnType<typeof buildMenu>;
}>;

const Layout: FC<LayoutProps> = ({ menu }) => {
  return (
    <>
      <nav>
        <ul>
          {menu.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
