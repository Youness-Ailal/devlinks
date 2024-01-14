import { type FC, type ElementType } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaGithub,
  FaTiktok,
  FaTwitch,
} from "react-icons/fa";

const IconMap: Record<string, ElementType> = {
  Facebook: FaFacebook,
  Whatsapp: FaWhatsapp,
  YouTube: FaYoutube,
  Twitter: FaTwitter,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  Reddit: FaReddit,
  Github: FaGithub,
  Tiktok: FaTiktok,
  Twitch: FaTwitch,
};

const DisplayIcon: FC<{ iconName: string }> = ({ iconName }) => {
  const IconComponent = IconMap[iconName];
  if (!IconComponent)
    throw new Error(`${iconName} is not a valid or available Icon name type`);

  return <IconComponent />;
};

export default DisplayIcon;
