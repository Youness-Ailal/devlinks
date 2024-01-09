import Button from "@/components/Button";
import Container from "@/components/Container";
import Header from "@/components/Header";
import Text from "@/components/Text";
import { HiPlus } from "react-icons/hi2";
import LinksForm from "./LinksForm";

function Customizing() {
  return (
    <Container className="flex flex-col px-10 py-10 gap-6">
      <div className="flex flex-col gap-1">
        <Header>Customize your links</Header>
        <Text>
          Add/edit/remove links and then share all your profiles with the world!
        </Text>
        <div className="mt-6">
          <Button variant="outline">
            <HiPlus /> Add new link
          </Button>
        </div>
      </div>
      <LinksForm />
    </Container>
  );
}

export default Customizing;
