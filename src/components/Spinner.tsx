import styled from "styled-components";

const StyledSpinner = styled.div`
  aspect-ratio: 1;
  border-radius: 50%;
  /* background: var(--color-brand-600); */
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 0.5s infinite linear;

  @keyframes l3 {
    to {
      transform: rotate(1turn);
    }
  }
`;
type SpinnerProps = {
  width?: number;
  padding?: number;
  speed?: number;
  color?: string;
};

function Spinner({
  width = 50,
  padding = 8,
  speed = 0.8,
  color = "var(--color-brand-600)",
}: SpinnerProps) {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <StyledSpinner
        style={{
          background: color,
          width: `${width}px`,
          padding: `${padding}px`,
          animation: `l3 ${speed}s infinite linear`,
        }}
      />
    </div>
  );
}

export default Spinner;
