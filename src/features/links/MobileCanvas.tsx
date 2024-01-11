import Container from "@/components/Container";
import styled from "styled-components";
import canvas from "../../assets/mobile.svg";
import { useAppSelector } from "@/store/hooks";
import Spinner from "@/components/Spinner";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const StyledCanvas = styled.div`
  height: 42rem;
  width: 24rem;
  margin: 0 auto;
  position: relative;
`;
const Image = styled.div`
  height: 7rem;
  aspect-ratio: 1;
  position: absolute;
  top: 4.5rem;
  left: 50%;
  translate: -50% 0;
  border-radius: 50%;
  /* overflow: hidden; */
`;
const ProfileImage = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
`;
const ImageSkeleton = styled.div`
  height: 100%;
  width: 100%;
  aspect-ratio: 1;
  background-color: var(--color-grey-200);
  border-radius: 50%;
`;
const Name = styled.div`
  position: absolute;
  top: 12.5rem;
  left: 50%;
  translate: -50% 0;
  border-radius: var(--radius-tiny);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameSkeleton = styled.div`
  width: 12rem;
  height: 2rem;
  background-color: var(--color-grey-200);
`;
const Email = styled.div`
  position: absolute;
  top: 15rem;
  left: 50%;
  translate: -50% 0;
  border-radius: var(--radius-tiny);
`;
const EmailSkeleton = styled.div`
  width: 8rem;
  height: 1rem;
  background-color: var(--color-grey-200);
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
  const {
    user: { firstName, lastName, email, avatar },
    previewAvatar,
  } = useAppSelector(state => state.user);

  let ImageContent: ReactNode = <ImageSkeleton />;

  if (avatar) {
    ImageContent = (
      <ProfileImage style={{ backgroundImage: `url(${avatar})` }} />
    );
  }
  if (previewAvatar) {
    ImageContent = (
      <ProfileImage style={{ backgroundImage: `url(${previewAvatar})` }} />
    );
  }

  return (
    <Container as="section" className="p-14">
      <StyledCanvas>
        <Image
          className={cn({
            "border-4 border-violet-500": previewAvatar || avatar,
          })}>
          {ImageContent}
        </Image>

        <Name>
          {firstName && lastName ? (
            <p className="text-center font-semibold text-gray-800 text-[1.3rem] ">
              {firstName} {lastName}
            </p>
          ) : (
            <NameSkeleton />
          )}
        </Name>
        <Email>
          {email ? (
            <p className="text-[0.9rem] text-slate-700">{email}</p>
          ) : (
            <EmailSkeleton />
          )}
        </Email>
        <CanvaLinks>
          <CanvaLink></CanvaLink>
          <CanvaLink></CanvaLink>
          <CanvaLink></CanvaLink>
          <CanvaLink></CanvaLink>
          <CanvaLink></CanvaLink>
        </CanvaLinks>
        <img
          draggable={false}
          src={canvas}
          alt="mobile canvas"
          className="h-full w-full"
        />
      </StyledCanvas>
    </Container>
  );
}

export default LinksMobile;
