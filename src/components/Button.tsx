import { ComponentProps } from "react";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button"> & {
  variant: "primary" | "outline" | "ghost";
};
const StyledButton = styled.button`
  padding: 0.8rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  &:disabled {
    pointer-events: none;
    user-select: none;
    opacity: 0.8;
  }
`;

function Button({ variant = "primary", children, ...props }: ButtonProps) {
  return (
    <StyledButton
      {...props}
      className={twMerge([
        `${
          variant === "primary" &&
          "bg-violet-600 hover:bg-violet-700  text-white"
        }`,
        `${
          variant === "outline" &&
          "outline outline-1 outline-violet-500 hover:bg-violet-50 text-violet-600"
        }`,
      ])}>
      {children}{" "}
    </StyledButton>
  );
}

export default Button;
