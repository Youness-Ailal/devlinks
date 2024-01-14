import Header from "@/components/Nav";
import Spinner from "@/components/Spinner";
import { useLinksContext } from "@/context/LinksContext";
// import { useLogin } from "@/features/auth/useLogin";
import { useUser } from "@/features/auth/useUser";
import { useLinks } from "@/features/links/useLinks";
import { useEffect, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100rem;
  margin: 0 auto;
  padding: 0 1rem;
`;
const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1.4fr;

  gap: 2rem;
  margin-top: 2rem;
  min-height: 51rem;
  overflow-x: hidden;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

function AppLayout() {
  // const { login } = useLogin();

  const { isLoading } = useUser();

  // useEffect(() => {
  //   login({ email: "test@gmail.com", password: "test123" });
  // }, []);

  let Content: ReactNode;
  if (isLoading) {
    Content = (
      <div className="w-screen flex items-center justify-centers bg-transparent">
        <Spinner />
      </div>
    );
  } else {
    Content = <Outlet />;
  }
  return (
    <StyledLayout>
      <Header />
      <Main>{Content}</Main>
    </StyledLayout>
  );
}

export default AppLayout;
