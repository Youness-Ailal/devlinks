import Header from "@/components/Nav";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100rem;
  margin: 0 auto;
`;
const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 2rem;
  margin-top: 2rem;
`;

function AppLayout() {
  return (
    <StyledLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </StyledLayout>
  );
}

export default AppLayout;
