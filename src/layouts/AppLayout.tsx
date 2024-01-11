import Header from "@/components/Nav";
import Spinner from "@/components/Spinner";
import { getUserLinksThunk } from "@/features/links/linksSlice";
import { getCurrentUserThunk } from "@/features/profile/userSlice";
import { signIn } from "@/services/authApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { type ReactNode, useEffect } from "react";
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
  min-height: 51rem;
  overflow-x: hidden;
`;

function AppLayout() {
  const status = useAppSelector(state => state.user.status);
  const isLoading = status !== "idle";

  const dispatch = useAppDispatch();
  useEffect(() => {
    const signInAndFetchUser = async () => {
      await signIn({ email: "test@gmail.com", password: "test123" });
      dispatch(getCurrentUserThunk());
      dispatch(getUserLinksThunk());
    };

    signInAndFetchUser();
  }, [dispatch]);
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
