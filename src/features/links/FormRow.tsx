import styled from "styled-components";
import { HiMiniBars2 } from "react-icons/hi2";
import Select from "@/components/Select";
import LinkInput from "@/components/LinkInput";
import Text from "@/components/Text";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-50);
  gap: 0.5rem;
  padding: 1rem;
  border-radius: var(--radius-sm);
`;

function FormRow() {
  return (
    <>
      <StyledFormRow>
        <div className="text-gray-500 text-xl flex items-center gap-2">
          <HiMiniBars2 />
          <p className="font-bold text-base ">Link #1</p>
          <button
            type="button"
            className="text-base ml-auto text-gray-600 hover:text-gray-900 hover:underline underline-offset-2 ">
            Remove
          </button>
        </div>
        <div className="flex flex-col gap-6 mt-4">
          <div className="space-y-2">
            <p className="text-[1rem] text-gray-500 font-medium">Platform</p>
            <Select />
          </div>
          <div className="space-y-2">
            <p className="text-[1rem] text-gray-500 font-medium">Link</p>
            <LinkInput />
          </div>
        </div>
      </StyledFormRow>
    </>
  );
}

export default FormRow;
