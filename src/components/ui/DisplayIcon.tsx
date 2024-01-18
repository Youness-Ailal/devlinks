import { type FC, type ElementType } from "react";
import {
  FaFacebook,
  FaWhatsapp,
  FaYoutube,
  // FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaGithub,
  FaTiktok,
  FaTwitch,
  FaSpotify,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const IconMap: Record<string, ElementType> = {
  Facebook: FaFacebook,
  Whatsapp: FaWhatsapp,
  YouTube: FaYoutube,
  Twitter: FaXTwitter,
  Instagram: FaInstagram,
  LinkedIn: FaLinkedin,
  Reddit: FaReddit,
  Github: FaGithub,
  Tiktok: FaTiktok,
  Twitch: FaTwitch,
  Spotify: FaSpotify,
};

const DisplayIcon: FC<{ iconName: string }> = ({ iconName }) => {
  const IconComponent = IconMap[iconName];
  if (!IconComponent)
    throw new Error(`${iconName} is not a valid or available Icon name type`);

  return <IconComponent />;
};

export default DisplayIcon;
