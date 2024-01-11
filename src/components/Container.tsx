import { ComponentProps } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 100rem;
  background-color: var(--color-grey-0);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-brand-50);
`;
type ContainerProps = ComponentProps<"div"> & {
  as?: string;
};

function Container({ as, ...props }: ContainerProps) {
  return <StyledContainer as={as || "div"} {...props} />;
}

export default Container;
