import styled from "styled-components";

const StyledHeader = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-grey-700);
`;

function Header({ children }) {
  return <StyledHeader>{children} </StyledHeader>;
}

export default Header;
