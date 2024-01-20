import { useLinksContext } from "@/context/LinksContext";
import { colors } from "@/data/Colors";
import { useUser } from "@/features/auth/useUser";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa6";
import { formatEmail, formatName } from "@/utils/helpers";
import styled from "styled-components";
import DisplayIcon from "../DisplayIcon";
import Spinner from "../Spinner";
import defaultAvatar from "/avatar.svg";
import { IoMailOutline } from "react-icons/io5";

function PreviewCanva() {
  const { user } = useUser();
  const { email, user_metadata } = user || {};
  const { previewLinks, isLoading } = useLinksContext() || {};
  const { full_name: fullName, avatar_url: avatar, bio } = user_metadata || {};

  const { fName, lName } = formatName(fullName);
  const fullNameFormated = `${fName} ${lName}`;
  const userEmail = formatEmail(email, 25);

  const UserImage = styled.div`
    height: 7rem;
    aspect-ratio: 1;
    align-self: center;
    border-radius: 100vh;
    background-size: cover;
    background-position: center;
    border: 4px solid var(--color-brand-500);
  `;
  const EmailLink = styled.a`
    position: relative;
    margin-top: auto;
    &::after {
      content: "";
      position: absolute;
      bottom: 2px;
      right: 0;
      height: 1px;
      width: 0;
      background-color: var(--color-grey-500);
      transition: all 0.2s;
    }
    &:hover::after {
      width: 100%;
      right: auto;
      left: 0;
    }
  `;

  const Canva = styled.div`
    min-height: 40rem;
    max-width: 28rem;
    margin: 0 auto;
    border-radius: var(--radius-md);
    box-shadow: 0 0 0.8rem 0.4rem rgba(0, 0, 0, 0.1);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: var(--color-white);
    backdrop-filter: blur(4px);
  `;
  const CanvBio = styled.p`
    font-size: 1rem;
    color: var(--color-grey-600);
    text-align: center;
  `;
  const CanvaLink = styled.a`
    width: 100%;
    height: var(--height);
    border-radius: var(--radius-tiny);
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    transition: all 0.2s;
    .arrowIcon {
      translate: -1rem 0;
      opacity: 0;
      transition: 0.2s;
    }
    &:hover .arrowIcon {
      translate: 0;
      opacity: 1;
    }
    &:hover {
      opacity: 0.9;
    }
  `;

  return (
    <Canva>
      <div className="flex flex-col items-center justify-center gap-2">
        <UserImage
          style={{ backgroundImage: `url(${avatar || defaultAvatar})` }}
        />
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className=" font-semibold text-gray-800">
            {fullName ? fullNameFormated : <br />}
          </h1>
          <CanvBio>"{bio}"</CanvBio>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {isLoading && <Spinner />}
        {!isLoading && previewLinks.length
          ? previewLinks.map(item => (
              <CanvaLink
                href={item.link}
                target="_blank"
                key={item.id}
                className={cn(`${colors[item.name]}`)}>
                <p className="text-gray-50 max-[1200px]:text-xl">
                  <DisplayIcon iconName={item.name} />
                </p>
                <p className="text-base text-gray-100 font-medium max-[1200px]:text-sm">
                  {item.name}
                </p>
                <p className="ml-auto text-sm opacity-90 text-gray-50 max-[1200px]:text-sm arrowIcon">
                  <FaArrowRight />
                </p>
              </CanvaLink>
            ))
          : null}
      </div>
      <EmailLink
        href={`mailto:${email}`}
        className="self-center text-base text-gray-500 flex items-center gap-2">
        <IoMailOutline />
        {userEmail}
      </EmailLink>
    </Canva>
  );
}

export default PreviewCanva;
