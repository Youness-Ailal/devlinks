import { useLinks } from "@/features/links/useLinks";
// @ts-ignore
import Button from "../ui/Button";
import ButtonLink from "../ui/ButtonLink";
import Container from "../ui/Container";
import toast from "react-hot-toast";
import { DEV_URL } from "@/utils/constants";
function PreviewNav() {
  const { links } = useLinks() || {};
  const { id } = links || {};
  console.log(links);

  function handleLinkCopy() {
    navigator.clipboard.writeText(`${DEV_URL}/${id}`);
    toast.success(`Link copied!`);
  }

  return (
    <Container
      as="header"
      className="flex items-center justify-between gap-4 py-4 px-6 mx-auto">
      <ButtonLink to="/dashboard" variant="outline">
        Back to Editor
      </ButtonLink>
      <div className="relative">
        <Button onClick={handleLinkCopy}>Copy Link</Button>
      </div>
    </Container>
  );
}

export default PreviewNav;
