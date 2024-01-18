// @ts-ignore
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Header from "@/components/Header";
import Text from "@/components/ui/Text";
import { HiPlus } from "react-icons/hi2";
import LinksForm from "./LinksForm";
import EmptyLinks from "./EmptyLinks";
import { useLinksContext } from "@/context/LinksContext";
import Spinner from "@/components/ui/Spinner";
import socials from "@/data/Socials";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

function Customizing() {
  const { previewLinks, addPreviewLink, isLoading } = useLinksContext() || {};

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
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col gap-1">
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
        <AnimatePresence>
          {!previewLinks?.length && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3">
              <EmptyLinks />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {previewLinks?.length && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className="mt-3">
              <LinksForm />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
}

export default Customizing;
