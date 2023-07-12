import { FC } from "react";
import { useSelector } from "react-redux";
import { NavLinks } from "./NavLinks";
import { Logo } from "./Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { RootState } from "../store";

export const BigSidebar: FC = () => {
  const { isSidebarOpen } = useSelector((store: RootState) => store.user);

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
