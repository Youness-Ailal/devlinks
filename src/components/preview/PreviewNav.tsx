import { useLinks } from "@/features/links/useLinks";
// @ts-ignore
import Button from "../Button";
import ButtonLink from "../ButtonLink";
import Container from "../Container";
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
    <div className="px-4">
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
    </div>
  );
}

export default PreviewNav;
