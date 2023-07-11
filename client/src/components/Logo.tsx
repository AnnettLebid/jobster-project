import { FC } from "react";
import { ReactComponent as LogoImg } from "../assets/images/logo.svg";

export const Logo: FC = () => {
  return (
    <div className="logo">
      <LogoImg />
    </div>
  );
};
