import { FC } from "react";
import { useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { toggleSidebar } from "../features/user/userSlice";
import { RootState, useAppThunkDispatch } from "../store";

export const SmallSidebar: FC = () => {
  const { isSidebarOpen } = useSelector((store: RootState) => store.user);
  const dispatch = useAppThunkDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};
