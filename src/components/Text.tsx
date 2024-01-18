import styled from "styled-components";

const StyledText = styled.p`
  font-size: 1rem;
  color: var(--color-grey-500);
  line-height: 1.8;
  max-width: 65ch;
`;
function Text({ children, ...props }) {
  return <StyledText {...props}>{children} </StyledText>;
}

export default Text;
