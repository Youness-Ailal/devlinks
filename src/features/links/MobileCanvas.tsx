import Container from "@/components/Container";
import styled from "styled-components";
import canvas from "../../assets/mobile.svg";

const StyledCanvas = styled.div`
  height: 42rem;
  width: 24rem;
  margin: 0 auto;
`;

function LinksMobile() {
  return (
    <Container as="section" className="p-14">
      <StyledCanvas>
        <img src={canvas} alt="mobile canvas" className="h-full w-full" />
      </StyledCanvas>
    </Container>
  );
}

export default LinksMobile;
