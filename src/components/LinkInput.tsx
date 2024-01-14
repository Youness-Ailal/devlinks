import { UserLinkType } from "@/context/LinksContext";
import socials from "@/data/Socials";
import { ComponentProps, forwardRef } from "react";
import styled from "styled-components";

type InputTypes = ComponentProps<"input"> & {
  id?: string;
  defaultValue?: string;
  error?: string;
  formError: boolean;
  previewLink: UserLinkType;
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
`;
const Span = styled.span`
  position: absolute;
  right: 0;
  top: -1.8rem;
  font-size: 0.9rem;
  color: var(--color-red-500);
`;

const LinkInput = forwardRef<HTMLInputElement, InputTypes>(function LinkInput(
  { id, previewLink, error, formError, ...props },
  ref
) {
  const socialInfo = socials.find(item => item.name === previewLink.name);

  return (
    <div className="relative">
      <Input
        className={`${error && formError ? "error" : null}`}
        placeholder={socialInfo.label}
        ref={ref}
        {...props}
        name={id}
        type="text"
      />
      {error && formError ? <Span>{error}</Span> : null}
    </div>
  );
});

export default LinkInput;
