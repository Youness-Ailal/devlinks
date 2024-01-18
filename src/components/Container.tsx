import { ComponentProps } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 100rem;
  background-color: var(--color-grey-0);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-brand-50);
  overflow-y: hidden;
`;
type ContainerProps = ComponentProps<"div"> & {
  as?: string;
};

function Container({ as = "div", ...props }: ContainerProps) {
  return <StyledContainer as={as} {...props} />;
}

export default Container;
