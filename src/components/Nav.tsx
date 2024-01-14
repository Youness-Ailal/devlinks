import { Link } from "react-router-dom";
import Container from "./Container";
import logo from "/logo.svg";
import ButtonLink from "./ButtonLink";
import { FaRegCircleUser } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import styled from "styled-components";
import { MdContentCopy } from "react-icons/md";
import { HiEye } from "react-icons/hi2";

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Header() {
  return (
    <Container
      as="header"
      className="flex items-center justify-between py-4 px-6 mt-[1rem]">
      <Link to="/" className="flex items-center gap-1">
        <img className="h-[2.6rem] aspect-square" src={logo} />
        <div className="text-[1.4rem] font-bold text-gray-600 max-[800px]:hidden">
          Devlinks
        </div>
      </Link>
      <NavLinks>
        <ButtonLink to="/dashboard">
          <RxDashboard />
          <p className="max-[700px]:hidden">Dashboard</p>
        </ButtonLink>

        <ButtonLink to="/account">
          <FaRegCircleUser />
          <p className="max-[700px]:hidden">Profile Details</p>
        </ButtonLink>
      </NavLinks>
      <div className="flex items-center  gap-1">
        <ButtonLink variant="outline" to="/preview">
          <HiEye className="block text-violet-500 min-[700px]:hidden" />
          <p className="max-[700px]:hidden">Preview</p>
        </ButtonLink>
        {/* <ButtonLink
          className=" self-stretch !px-4 !text-lg"
          variant="outline"
          to="/preview">
          {<MdContentCopy />}
        </ButtonLink> */}
      </div>
    </Container>
  );
}

export default Header;
