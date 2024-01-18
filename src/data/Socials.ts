export type SocialType = {
  id: string;
  name: string;
  label: string;
};

const socials: SocialType[] = [
  {
    id: "49",
    name: "Twitter",
    label: "https://twitter.com/{username}",
  },
  {
    id: "47",
    name: "Instagram",
    label: "https://instagram.com/{username}",
  },
  {
    id: "52",
    name: "Github",
    label: "https://reddit.com/user/{username}",
  },

  {
    id: "44",
    name: "YouTube",
    label: "https://youtube.com/c/{channel}",
  },
  {
    id: "46",
    name: "LinkedIn",
    label: "https://linkedin.com/in/{username}",
  },

  {
    id: "39",
    name: "Whatsapp",
    label: "https://wa.me/{phone}",
  },
  {
    id: "58",
    name: "Twitch",
    label: "https://twitch.tv/@{username}",
  },
  {
    id: "37",
    name: "Facebook",
    label: "https://facebook.com/{username}",
  },
  {
    id: "60",
    name: "Spotify",
    label: "https://open.spotify.com/user/{username}",
  },

  {
    id: "51",
    name: "Reddit",
    label: "https://reddit.com/user/{username}",
  },
  {
    id: "54",
    name: "Tiktok",
    label: "https://tiktok.com/@{username}",
  },
];

export default socials;
