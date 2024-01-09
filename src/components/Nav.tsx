import { Link } from "react-router-dom";
import Container from "./Container";
import logo from "/logo.svg";
import ButtonLink from "./ButtonLink";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiLink } from "react-icons/hi2";

function Header() {
  return (
    <Container
      as="header"
      className="flex items-center justify-between py-4 px-6 mt-[1rem]">
      <Link to="/" className="flex items-center gap-1">
        <img className="h-[2.6rem] aspect-square" src={logo} />
        <div className="text-[1.4rem] font-bold text-gray-600">Devlinks</div>
      </Link>
      <div className="flex items-center gap-2">
        <ButtonLink to="/dashboard">
          <HiLink />
          Links
        </ButtonLink>
        <ButtonLink to="/account">
          <HiOutlineUserCircle />
          Profile Details
        </ButtonLink>
      </div>
      <div>
        <ButtonLink variant="outline" to="/preview">
          Preview
        </ButtonLink>
      </div>
    </Container>
  );
}

export default Header;
