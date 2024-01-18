import { UserLinkType } from "@/context/LinksContext";
import socials from "@/data/Socials";
import { ComponentProps, forwardRef } from "react";
import { HiLink } from "react-icons/hi2";
import styled from "styled-components";

type InputTypes = ComponentProps<"input"> & {
  id?: string;
  defaultValue?: string;
  error?: string;
  formError: boolean;
  previewLink: UserLinkType;
};

const Input = styled.input`
  --border: 2px;
  width: 100%;
  background-color: var(--color-white);
  border: var(--border) solid var(--color-grey-300);
  height: 3rem;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  padding: 1rem;
  padding-left: 2.6rem;
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
        className={`${error && formError ? "error" : null} `}
        placeholder={socialInfo.label}
        ref={ref}
        {...props}
        name={id}
        type="text"
      />
      {error && formError ? <Span>{error}</Span> : null}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none">
        <HiLink />
      </div>
    </div>
  );
});

export default LinkInput;
