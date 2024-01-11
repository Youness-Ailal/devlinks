export type SocialType = {
  id: number;
  name: string;
  icon: string;
  status: "used" | "unused";
};

const socials: SocialType[] = [
  {
    id: 37,
    name: "Facebook",
    icon: "<FaFacebookSquare />",
    status: "unused",
  },
  {
    id: 39,
    name: "Whatsapp",
    icon: "<FaWhatsappSquare />",
    status: "unused",
  },
  {
    id: 44,
    name: "YouTube",
    icon: "<FaYoutubeSquare />",
    status: "unused",
  },
  {
    id: 49,
    name: "Twitter",
    icon: "<FaTwitterSquare />",
    status: "unused",
  },
  {
    id: 47,
    name: "Instagram",
    icon: "<FaInstagramSquare />",
    status: "unused",
  },
  {
    id: 46,
    name: "LinkedIn",
    icon: "<FaLinkedinSquare />",
    status: "unused",
  },

  {
    id: 51,
    name: "Reddit",
    icon: "<RiRedditFillSquare />",
    status: "unused",
  },

  {
    id: 50,
    name: "Snapchat",
    icon: "<FaTelegramSquare />",
    status: "unused",
  },
];

export default socials;
