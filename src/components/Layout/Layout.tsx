import { FC, PropsWithChildren } from "react";
import { Link, Outlet } from "react-router-dom";
import type { MenuItem } from "router";
import styles from "./Layout.module.scss";

type Props = PropsWithChildren<{
  menu: MenuItem[];
}>;

export const Layout: FC<Props> = ({ menu }) => {
  return (
    <>
      <nav>
        <ul className={styles.list}>
          {menu.map((item) => {
            return (
              <li key={item.name}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};
