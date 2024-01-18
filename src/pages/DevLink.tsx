import UserLinks from "@/components/UserLinks";
// import bg from "/bg1.jpg";
import styled from "styled-components";
const Main = styled.div`
  height: 22rem;
  border-radius: 0 0 2rem 2rem;
  padding-top: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    url("/bg1.jpg");

  background-size: cover;
  background-position: center;
  background-color: var(--color-brand-500);
`;
function DevLink() {
  return (
    <div className="min-h-screen">
      <Main>
        <div className="translate-y-[8rem]">
          <UserLinks />
        </div>
      </Main>
    </div>
  );
}

export default DevLink;
