/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, type ReactNode, forwardRef, useState } from "react";
import styled from "styled-components";

type InputProps = {
  label?: string;
  id: string;
  error?: string;
  className?: string;
  type?: string;
  as?: "input" | "textarea";
  extraElement?: ReactNode;
  extraText?: string;
  errorPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  direction?: "x" | "y";
} & ComponentProps<"input">;

const StyledInput = styled.input`
  --border: 2px;
  width: 100%;
  background-color: var(--color-white);
  border: var(--border) solid var(--color-grey-300);
  height: 3rem;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  padding: 1rem;
  transition: all 0.2s;
  &.error {
    border: var(--border) solid var(--color-red-400);
    box-shadow: var(--shadow-md-red);
    &:focus {
      border: var(--border) solid var(--color-red-500);
      box-shadow: var(--shadow-md-red);
    }
  }
  &:focus {
    outline: none;
    border: var(--border) solid var(--color-brand-500);
    box-shadow: var(--shadow-md);
  }
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-grey-100);
  }
  resize: none;
`;

const Label = styled.label`
  align-self: start;
  font-size: 1rem;
  color: var(--color-grey-600);
`;
const Span = styled.span`
  position: absolute;

  font-size: 0.9rem;
  color: var(--color-red-500);
`;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    id,
    error,
    direction = "x",
    type = "text",
    errorPosition = "top-right",
    className,
    extraText,
    extraElement,
    ...props
  },
  ref
) {
  const [showPass, setShowPass] = useState(false);
  function toggleShowPass() {
    setShowPass(prev => !prev);
  }
  return (
    <div
      className={cn(
        {
          "grid grid-cols-[1fr_3fr] items-center gap-4 justify-between max-[526px]:flex max-[526px]:flex-col max-[526px]:items-start max-[526px]:w-full":
            direction === "x",
        },
        {
          "flex flex-col gap-1.5": direction !== "x",
        },
        "relative"
      )}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative w-full">
        {error && (
          <Span
            className={cn({
              "left-0 top-[-1.5rem]": errorPosition === "top-left",
              "right-0 top-[-1.5rem]": errorPosition === "top-right",
              "left-0 bottom-[-1.5rem]": errorPosition === "bottom-left",
              "right-0 bottom-[-1.5rem]": errorPosition === "bottom-right",
            })}>
            {error}
          </Span>
        )}
        {type === "password" && (
          <p
            onClick={toggleShowPass}
            className="cursor-pointer z-10 text-gray-500 absolute top-1/2 right-4 -translate-y-1/2">
            {showPass && <Eye />}
            {!showPass && <EyeOff />}
          </p>
        )}
        <div className="relative">
          <StyledInput
            id={id}
            className={cn({ error: error }, className)}
            ref={ref}
            type={type === "password" ? (showPass ? "text" : "password") : type}
            {...props}
          />
          {extraText && (
            <p className="text-base text-gray-600 absolute left-2 pointer-events-none top-1/2 -translate-y-1/2">
              {extraText}
            </p>
          )}
          {extraElement && (
            <p className="text-lg hover:text-gray-700 active:scale-95 text-gray-600 absolute right-2 top-1/2 -translate-y-3">
              {extraElement}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

export default Input;
