import { ReactNode } from "react";
import { Link, NavLink, type To } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  padding: var(--padding-base);
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-grey-500);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  z-index: 99;
  border-radius: var(--radius-sm);
  &:hover {
    color: var(--color-grey-600);
  }
  &.active {
    background-color: var(--color-brand-100);
    color: var(--color-brand-700);
  }
  svg {
    font-size: 1.2rem;
  }
`;
const StyledLink = styled(Link)`
  padding: var(--padding-base);
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid var(--color-brand-600);
  color: var(--color-brand-600);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: var(--radius-sm);
  &:hover {
    background-color: var(--color-brand-50);
  }
  @media (max-width: 400px) {
    padding: var(--padding-sm);
  }
`;

type LinkProps = {
  children: ReactNode;
  to: To;
  variant?: "primary" | "outline";
  className?: string;
};
function ButtonLink({
  children,
  to,
  variant = "primary",
  className,
  ...props
}: LinkProps) {
  if (variant === "outline") {
    return (
      <StyledLink to={to} className={className} {...props}>
        {children}
      </StyledLink>
    );
  }
  return <StyledNavLink to={to}>{children} </StyledNavLink>;
}

export default ButtonLink;
