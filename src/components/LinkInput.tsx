import { ComponentProps } from "react";
import styled from "styled-components";

type InputTypes = ComponentProps<"input"> & {
  label?: string;
  id?: string;
};

const Input = styled.input`
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
`;
const IconSpan = styled.span``;

function LinkInput({ label = "Link", id, children, ...props }: InputTypes) {
  return (
    <div>
      {/* <Label htmlFor={id}>{label}</Label> */}
      <Input {...props} name={id} type="text" />
      <IconSpan>{children}</IconSpan>
    </div>
  );
}

export default LinkInput;
