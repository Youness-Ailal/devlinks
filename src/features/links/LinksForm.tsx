import styled from "styled-components";
import FormRow from "./FormRow";
import Button from "@/components/Button";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  /* background-color: red; */
`;
const FormRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 29rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

function LinksForm() {
  return (
    <StyledForm>
      <FormRows>
        <FormRow />
        <FormRow />
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
