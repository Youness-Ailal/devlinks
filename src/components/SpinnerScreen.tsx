import styled from "styled-components";

const StyledSpinner = styled.div`
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--color-brand-600);
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;

  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }
`;
const FullScreen = styled.div`
  height: 100dvh;
  width: 100dvw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function SpinnerScreen() {
  return (
    <FullScreen>
      <StyledSpinner />
    </FullScreen>
  );
}

export default SpinnerScreen;
