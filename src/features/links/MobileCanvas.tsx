import Container from "@/components/Container";
import styled from "styled-components";
import canvas from "../../assets/mobile.svg";

const StyledCanvas = styled.div`
  height: 42rem;
  width: 24rem;
  margin: 0 auto;
  position: relative;
`;
const Image = styled.div`
  height: 7rem;
  aspect-ratio: 1;
  background-color: var(--color-grey-200);
  position: absolute;
  top: 4rem;
  left: 50%;
  translate: -50% 0;
  border-radius: 50%;
`;
const Name = styled.div`
  width: 14rem;
  height: 1rem;
  background-color: var(--color-grey-200);
  position: absolute;
  top: 12.6rem;
  left: 50%;
  translate: -50% 0;
  border-radius: var(--radius-sm);
`;
const Email = styled.div`
  width: 7rem;
  height: 0.8rem;
  background-color: var(--color-grey-200);
  position: absolute;
  top: 14.4rem;
  left: 50%;
  translate: -50% 0;
  border-radius: var(--radius-tiny);
`;
const CanvaLinks = styled.div`
  position: absolute;
  top: 19rem;
  left: 50%;
  translate: -50% 0;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
const CanvaLink = styled.div`
  width: 18rem;
  height: 3rem;
  background-color: var(--color-grey-200);

  border-radius: var(--radius-tiny);
`;

function LinksMobile() {
  return (
    <Container as="section" className="p-14">
      <StyledCanvas>
        <Image></Image>
        <Name></Name>
        <Email></Email>
        <CanvaLinks>
          <CanvaLink></CanvaLink>
          <CanvaLink></CanvaLink>
          <CanvaLink></CanvaLink>
          <CanvaLink></CanvaLink>
          <CanvaLink></CanvaLink>
        </CanvaLinks>
        <img src={canvas} alt="mobile canvas" className="h-full w-full" />
      </StyledCanvas>
    </Container>
  );
}

export default LinksMobile;
