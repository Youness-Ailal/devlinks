import Container from "@/components/Container";
import styled from "styled-components";
import canvas from "../../assets/mobile.svg";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import { useUser } from "../auth/useUser";
import { useProfile } from "@/context/ProfileContext";
import { useLinksContext } from "@/context/LinksContext";
import { colors } from "@/data/Colors";
import DisplayIcon from "@/components/DisplayIcon";
import { FaArrowRight } from "react-icons/fa6";

const StyledCanvas = styled.div`
  height: 42rem;
  width: 24rem;
  margin: 0 auto;
  position: relative;

  @media (max-width: 1200px) {
    height: 39rem;
    width: 20rem;
  }
`;
const Image = styled.div`
  height: 7rem;
  aspect-ratio: 1;
  position: absolute;
  top: 4.5rem;
  left: 50%;
  translate: -50% 0;
  border-radius: 50%;
  overflow: hidden;
  @media (max-width: 1200px) {
    height: 6rem;
    top: 5.4rem;
  }
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
  width: 18rem;
  --height: 3rem;
  top: 19rem;
  left: 50%;
  translate: -50% 0;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media (max-width: 1200px) {
    width: 16rem;
    gap: 0.8rem;
    --height: 2.6rem;
  }
`;
const CanvaLinkSkeleton = styled.div`
  width: 100%;
  height: var(--height);
  background-color: var(--color-grey-200);
  border-radius: var(--radius-tiny);
`;
const CanvaLink = styled.div`
  width: 100%;
  height: var(--height);
  border-radius: var(--radius-tiny);
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
`;

function MobileCanvas() {
  const { previewLinks } = useLinksContext();

  const [remainingLinks, setRemainingLinks] = useState(
    5 - previewLinks.length || 5
  );
  useEffect(() => {
    setRemainingLinks(5 - previewLinks.length);
  }, [previewLinks.length]);

  const { previewAvatar } = useProfile();
  const {
    user: {
      email,
      user_metadata: {
        firstName,
        lastName,
        data: { avatar },
      },
    },
  } = useUser();

  const fName = firstName.length > 10 ? firstName.at(0).concat(".") : firstName;
  let lName = lastName.length > 10 ? lastName.at(0).concat(".") : lastName;
  const emailAddress =
    email.length > 20
      ? `${email.slice(0, 3)}...${email.slice(email.indexOf("@"))}`
      : email;

  if (fName.concat(lName).length > 18) lName = lastName.at(0).concat(".");
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
    <Container as="section" className="p-14 max-[1000px]:hidden">
      <StyledCanvas>
        <Image
          className={cn({
            "border-4 border-violet-500": previewAvatar || avatar,
          })}>
          {ImageContent}
        </Image>

        <Name>
          {firstName && lastName ? (
            <p className="text-center font-semibold text-gray-700 text-[1.3rem] ">
              {fName} {lName}
            </p>
          ) : (
            <NameSkeleton />
          )}
        </Name>
        <Email>
          {email && firstName && lastName ? (
            <p className="text-[0.9rem] text-slate-700">{emailAddress}</p>
          ) : (
            <EmailSkeleton />
          )}
        </Email>
        <CanvaLinks>
          {previewLinks.map(item => (
            <CanvaLink key={item.id} className={cn(`${colors[item.name]}`)}>
              <p className="text-gray-50 max-[1200px]:text-xl">
                <DisplayIcon iconName={item.name} />
              </p>
              <p className="text-base text-gray-100 font-medium max-[1200px]:text-sm">
                {item.name}
              </p>
              <p className="ml-auto text-sm opacity-90 text-gray-100 max-[1200px]:text-sm">
                <FaArrowRight />
              </p>
            </CanvaLink>
          ))}
          {Array.from({ length: remainingLinks }).map((_, index) => {
            return <CanvaLinkSkeleton key={index} />;
          })}
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

export default MobileCanvas;
