import { ComponentProps } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 100rem;
  background-color: var(--color-grey-0);
  border-radius: var(--radius-md);
`;
type ContainerProps = ComponentProps<"div"> & {
  as?: string;
};

function Container({ as, ...props }: ContainerProps) {
  return <StyledContainer as={as || "div"} {...props} />;
}

export default Container;
