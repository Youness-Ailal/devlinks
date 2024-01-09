import { ComponentProps } from "react";
import styled from "styled-components";

type InputProps = {
  label: string;
  id: string;
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
  &:focus {
    outline: none;
    border: 1px solid var(--color-brand-500);
    box-shadow: var(--shadow-md);
  }
`;
const Label = styled.label`
  font-size: 1rem;
  color: var(--color-grey-500);
`;

function Input({ label, id, ...props }: InputProps) {
  return (
    <div className="grid grid-cols-[1fr_3fr] items-center gap-4 justify-between">
      <Label htmlFor={id}>{label}</Label>
      <StyledInput />
    </div>
  );
}

export default Input;
