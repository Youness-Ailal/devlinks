import styled from "styled-components";
import FormRow from "./FormRow";
import Button from "@/components/Button";
import { useAppSelector } from "@/store/hooks";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;
const FormRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 29rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function LinksForm() {
  const userLinks = useAppSelector(state => state.links.userLinks);

  return (
    <StyledForm>
      <FormRows>
        {userLinks.map((item, index) => {
          return <FormRow key={index} index={index} />;
        })}
      </FormRows>
      <div className="border-t border-gray-300 flex justify-end px-4 py-6 mt-auto">
        <div>
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </StyledForm>
  );
}

export default LinksForm;
