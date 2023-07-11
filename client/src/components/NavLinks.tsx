import { FC } from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { LinkInterface } from "../utils/types";

interface NavLinksProps {
  toggleSidebar?: () => void;
}

export const NavLinks: FC<NavLinksProps> = ({
  toggleSidebar,
}: NavLinksProps) => {
  return (
    <div className="nav-links">
      {links.map((link: LinkInterface) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            key={id}
            onClick={toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
