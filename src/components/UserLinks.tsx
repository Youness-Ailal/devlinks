import { colors } from "@/data/Colors";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa6";
import { formatEmail, formatName } from "@/utils/helpers";
import styled from "styled-components";
import defaultAvatar from "/avatar.svg";
import Spinner from "./Spinner";
import DisplayIcon from "./DisplayIcon";
import { useParams } from "react-router-dom";
import { useUserLinks } from "@/features/links/useUserLinks";
import { IoMailOutline } from "react-icons/io5";
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
  padding: 3rem;
  min-height: 40rem;
  max-width: 28rem;
  box-shadow: 0 0 0.8rem 0.1rem rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-grey-300);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--color-white);
  border-radius: var(--radius-md);
  margin: 0 auto;
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
function UserLinks() {
  const { id } = useParams();
  const { links, isLoading, isError } = useUserLinks(id);

  if (isLoading)
    return (
      <Canva className="!items-center !justify-center">
        <Spinner />
      </Canva>
    );
  if (isError)
    return (
      <Canva className="!items-center">
        <UserImage style={{ backgroundImage: `url(${defaultAvatar})` }} />
        <p className="mt-4 text-gray-700">User not Found!</p>
      </Canva>
    );
  const {
    links_list: previewLinks,
    full_name,
    email,
    avatar_url: avatar,
    bio,
  } = links || {};

  const { fName, lName } = formatName(full_name);
  const fullNameFormated = fName + " " + lName;
  const userEmail = formatEmail(email, 25);
  return (
    <Canva>
      <div className="flex flex-col items-center justify-center gap-4">
        <UserImage
          style={{ backgroundImage: `url(${avatar || defaultAvatar})` }}
        />
        <h1 className="text-center font-semibold text-gray-800">
          {full_name ? fullNameFormated : <br />}
        </h1>
        <CanvBio>{bio ? `"${bio}"` : null}</CanvBio>
      </div>
      <div className="flex flex-col gap-5">
        {isLoading && <Spinner />}
        {!isLoading && previewLinks?.length
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
        className="text-base self-center gap-1 flex items-center text-gray-500 text-center">
        <IoMailOutline />
        {userEmail}
      </EmailLink>
    </Canva>
  );
}

export default UserLinks;
