import Button from "@/components/Button";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Text from "@/components/Text";
import { HiPlus } from "react-icons/hi2";
import LinksForm from "./LinksForm";
import {} from "@/components/Select";
import EmptyLinks from "./EmptyLinks";
import { useLinksContext } from "@/context/LinksContext";
import Spinner from "@/components/Spinner";
import socials from "@/data/Socials";
import toast from "react-hot-toast";

function Customizing() {
  const { previewLinks, addPreviewLink, isLoading } = useLinksContext();

  const allIds = previewLinks?.map(item => item.id)?.join(" ") || "";

  const remainibgOptions = socials.filter(item => !allIds.includes(item.id));

  function handleAdd() {
    if (previewLinks.length >= 5) {
      toast.error("You cannot add more than 5 links", {
        duration: 3000,
        iconTheme: {
          primary: "var(--color-red-500)",
          secondary: "var(--color-grey-100)",
        },
      });
      return;
    }
    addPreviewLink({
      id: remainibgOptions[0].id,
      name: remainibgOptions[0].name,
      link: "",
    });
  }

  if (isLoading) return <Spinner />;
  return (
    <Container className="flex flex-col gap-6 p-10 max-[600px]:p-4">
      <div className="flex flex-col gap-1">
        <Header>Customize your links</Header>
        <Text>
          Add/edit/remove links and then share all your profiles with the world!
        </Text>
        <div className="mt-6">
          <Button
            // disabled={previewLinks?.length >= 5}
            onClick={handleAdd}
            variant="outline">
            <HiPlus /> Add new link
          </Button>
        </div>
      </div>
      {!previewLinks?.length ? <EmptyLinks /> : <LinksForm />}
    </Container>
  );
}

export default Customizing;
