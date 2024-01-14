import styled from "styled-components";
import FormRow from "./FormRow";
import Button from "@/components/Button";
import { UserLinkType, useLinksContext } from "@/context/LinksContext";
import { FormEvent, useEffect, useId, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateLinks } from "./useUpdateLinks";
import { useUser } from "../auth/useUser";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;
const FormRows = styled.div`
  margin-bottom: -1rem;
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
  const { previewLinks } = useLinksContext();
  const {
    user: { id: userId },
  } = useUser();
  const { updateLinks, status } = useUpdateLinks();
  const isLoading = status === "pending";
  const [formData, setFormData] = useState<UserLinkType[]>(previewLinks);
  const [formError, setFormError] = useState(false);

  function changeFormError(value: boolean) {
    setFormError(value);
  }
  const formRef = useRef<HTMLFormElement | null>(null);
  const isSaveDisabled = formError;

  useEffect(() => {
    setFormData(previewLinks);
  }, [previewLinks]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    for (let i = 0; i < formData.length; i++) {
      if (formData[i].link.length < 5) {
        toast.error("Please fill in all URL fields", {
          duration: 3000,
          iconTheme: {
            primary: "var(--color-red-500)",
            secondary: "var(--color-grey-100)",
          },
        });
        return;
      }
    }
    updateLinks({ userId, newData: formData });
  }
  return (
    <StyledForm onSubmit={handleSubmit} ref={formRef}>
      <FormRows>
        {previewLinks.map((item, index) => {
          return (
            <FormRow
              formError={formError}
              changeFormError={changeFormError}
              previewLink={item}
              id={item.id}
              key={item.id}
              index={index}
            />
          );
        })}
      </FormRows>
      <div className="border-t border-gray-300 flex justify-end px-4 py-6 mt-auto max-[1000px]:block">
        <div>
          <Button disabled={isSaveDisabled || isLoading} variant="primary">
            Save
          </Button>
        </div>
      </div>
    </StyledForm>
  );
}

export default LinksForm;
