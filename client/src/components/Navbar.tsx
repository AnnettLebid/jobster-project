import { useState, FC } from "react";
import { useSelector } from "react-redux";
import { FaAlignLeft, FaUserCircle } from "react-icons/fa";
import { RootState, useAppThunkDispatch } from "../store";
import { Logo } from "./Logo";
import Wrapper from "../assets/wrappers/Navbar";
import { toggleSidebar, clearStore } from "../features/user/userSlice";

export const Navbar: FC = () => {
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const { user } = useSelector((store: RootState) => store.user);
  const dispatch = useAppThunkDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => dispatch(clearStore("Logging out ..."))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
