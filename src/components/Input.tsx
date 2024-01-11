/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, forwardRef } from "react";
import styled from "styled-components";

type InputProps = {
  label: string;
  id: string;
  error?: string;
} & ComponentProps<"input">;

const StyledInput = styled.input`
  width: 100%;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-300);
  height: 3rem;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  padding: 1rem;
  transition: all 0.2s;
  &.error {
    border: 1px solid var(--color-red-400);
    box-shadow: var(--shadow-md-red);
    &:focus {
      border: 1px solid var(--color-red-500);
      box-shadow: var(--shadow-md-red);
    }
  }
  &:focus {
    outline: none;
    border: 1px solid var(--color-brand-500);
    box-shadow: var(--shadow-md);
  }
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-grey-100);
  }
`;
const Label = styled.label`
  font-size: 1rem;
  color: var(--color-grey-600);
`;
const Span = styled.span`
  position: absolute;
  left: 0;
  top: -1.6rem;
  font-size: 0.9rem;
  color: var(--color-red-500);
`;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, error, ...props },
  ref
) {
  return (
    <div className="grid grid-cols-[1fr_3fr] items-center gap-4 justify-between relative">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {error && <Span>{error}</Span>}
        <StyledInput className={`${error && "error"}`} ref={ref} {...props} />
      </div>
    </div>
  );
});

export default Input;
