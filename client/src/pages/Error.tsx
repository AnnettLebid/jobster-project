import { FC } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as NotFound } from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

export const Error: FC = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <NotFound />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};
