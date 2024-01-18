import { ComponentProps } from "react";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
  className?: string;
};
const StyledButton = styled.button`
  padding: var(--padding-base);
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  border: 1px solid transparent;
  &:disabled {
    cursor: not-allowed;
    user-select: none;
    opacity: 0.8;
  }
  @media (max-width: 400px) {
    padding: var(--padding-sm);
  }
  position: relative;
  overflow: hidden;
`;
const SpinnerLoader = styled.span`
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid var(--color-brand-200);
  border-right-color: var(--color-brand-500);
  animation: l2 0.5s infinite linear;

  @keyframes l2 {
    to {
      transform: rotate(1turn);
    }
  }
`;
const Loader = styled.span`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: var(--color-brand-500);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Button({
  variant = "primary",
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      {...props}
      className={twMerge(
        [
          `${
            variant === "primary" &&
            "bg-violet-600 hover:bg-violet-700  text-white disabled:hover:bg-violet-600"
          }`,
          `${
            variant === "outline" &&
            "outline outline-1 outline-violet-500 hover:bg-violet-50 text-violet-600 disabled:hover:bg-transparent"
          }`,
        ],
        className
      )}>
      {isLoading && (
        <Loader>
          <SpinnerLoader />
        </Loader>
      )}
      {children}
    </StyledButton>
  );
}
