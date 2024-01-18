import { useEffect, type ReactNode } from "react";
import styled from "styled-components";
import logo from "/logo.svg";
import bg from "/bg1.jpg";
import bg2 from "/bg2.jpg";
import { Link, useNavigate } from "react-router-dom";
// import Button from "@/components/ui/Button";
// import { FcGoogle } from "react-icons/fc";
// import { useSignInWithGoogle } from "./useGoogleAuth";
import { useUser } from "./useUser";
import Spinner from "@/components/ui/Spinner";
import { motion } from "framer-motion";

const ScreenContainer = styled(motion.div)`
  min-height: 100dvh;
  background-color: var(--color-grey-0);
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  justify-content: space-between;
  gap: 5rem;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
const StyledAuthContainer = styled.div`
  max-width: 55rem;
  padding: 2rem 5rem;
  @media (max-width: 500px) {
    padding: 2rem 1rem;
  }
`;
const FormContainer = styled.div`
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-items: start;
`;
const FormHeading = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-grey-800);
  padding: 0.4rem 0;
  position: relative;
  display: inline;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 75%;
    border-radius: 100vh;
    background-color: var(--color-brand-500);
  }
`;
// const Or = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;
//   &::after {
//     content: "";
//     position: absolute;
//     top: 50%;
//     left: 0;
//     width: 100%;
//     height: 1px;
//     background-color: var(--color-grey-300);
//   }
//   p {
//     padding: 0 0.5rem;
//     background-color: var(--color-grey-0);
//     z-index: 10;
//   }
// `;
const AuthRight = styled.div`
  --radius: 0rem;
  background-color: var(--color-brand-600);
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  border-radius: var(--radius) 0 0 var(--radius);
  @media (max-width: 1000px) {
    display: none;
  }
`;

type AuthContainerType = {
  formFor: "signin" | "signup" | "resetPassword" | "updatePassword";
  children: ReactNode;
};
const authTitle = {
  signin: "Sign In",
  signup: "Sign Up",
  resetPassword: "Forgot your password?",
  updatePassword: "Update your password",
};
const authSubTitle = {
  signin: "Please sign in to continue",
  signup: "Create your profile here",
  resetPassword: "We will send an email to reset it",
  updatePassword: "Let's set a new password",
};
const authLink = {
  signin: {
    text: "Dont have an account? ",
    action: "Create an account",
    link: "/signup",
  },
  signup: {
    text: "Already have an account? ",
    action: "Sign in",
    link: "/signin",
  },
  resetPassword: {
    text: "You remember password? ",
    action: "Sign in",
    link: "/signin",
  },
  updatePassword: {
    text: "You remember password? ",
    action: "Sign in",
    link: "/signin",
  },
};

function AuthContainer({ formFor = "signin", children }: AuthContainerType) {
  const forLogin = formFor === "signin";
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  // const { signin, status } = useSignInWithGoogle();
  // const isLoading = status === "pending";
  // function handleGoogleAuth() {
  //   signin();
  // }

  return (
    <ScreenContainer>
      <StyledAuthContainer className="space-y-16">
        <div className="flex items-center gap-2">
          <img className="h-[2.6rem] aspect-square" src={logo} />
          <div className="text-[1.4rem] font-bold text-violet-800 ">
            Devlinks
          </div>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <FormContainer className="space-y-6">
            <div className="mb-[1.5rem] space-y-4">
              <FormHeading>{authTitle[formFor]}</FormHeading>
              <p className="text-base text-gray-500">{authSubTitle[formFor]}</p>
            </div>

            <div className="self-stretch">{children}</div>
            <div className="self-center">
              <p className="text-base text-gray-600 ">
                {authLink[formFor].text}
                <Link
                  className="text-violet-600 font-medium hover:underline underline-offset-2"
                  to={authLink[formFor].link}>
                  {authLink[formFor].action}
                </Link>
              </p>
            </div>
            {/* {(formFor === "signin" || formFor === "signup") && (
            <>
              <Or className="self-stretch text-lg text-gray-500">
                <p className="text-center">or</p>
              </Or>
              <div className="self-stretch">
                <Button
                  disabled={isLoading}
                  onClick={handleGoogleAuth}
                  className="!text-lg !gap-6 max-[400px]:!text-base max-[400px]:!px-2 max-[400px]:!gap-2"
                  variant="outline">
                  <FcGoogle className="!text-2xl max-[400px]:!xl" />
                  Continue with Google
                </Button>
              </div>
            </>
          )} */}
          </FormContainer>
        )}
      </StyledAuthContainer>
      <AuthRight style={{ backgroundImage: `url(${forLogin ? bg : bg2})` }} />
    </ScreenContainer>
  );
}

export default AuthContainer;
