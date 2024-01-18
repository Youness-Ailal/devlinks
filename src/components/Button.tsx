import { ComponentProps } from "react";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "outline" | "ghost";
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
`;

export default function Button({
  variant = "primary",
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
      {children}{" "}
    </StyledButton>
  );
}
