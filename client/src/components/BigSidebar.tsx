import { FC } from "react";
import { useSelector } from "react-redux";
import { NavLinks } from "./NavLinks";
import { Logo } from "./Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { Store } from "../utils/types";

export const BigSidebar: FC = () => {
  const { isSidebarOpen } = useSelector((store: Store) => store.user);

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
