import styled from "styled-components";
import { HiMiniBars2 } from "react-icons/hi2";
import Select from "@/components/ui/Select";
import LinkInput from "@/components/ui/LinkInput";
import socials from "@/data/Socials";

// import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { UserLinkType, useLinksContext } from "@/context/LinksContext";
import { ChangeEvent, useState } from "react";
import { Reorder } from "framer-motion";

type LinkRowType = {
  index: number;
  id: string;
  previewLink: UserLinkType;
  formError: boolean;
  changeFormError: (value: boolean) => void;
};

const StyledFormRow = styled(Reorder.Item)`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-50);
  gap: 0.5rem;
  padding: 2rem 1rem;
  padding-top: 0;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-brand-50);
`;

function FormRow({
  previewLink,
  index,
  id,
  changeFormError,
  formError,
}: LinkRowType) {
  const { removePreviewLink, updatePreviewLink } = useLinksContext();
  const socialDomain =
    previewLink.name === "Whatsapp"
      ? "wa"
      : previewLink.name.toLocaleLowerCase();

  const [link, setLink] = useState(previewLink.link || "");
  const [error, setError] = useState("");
  const urlRegex = new RegExp(
    `^https?://(?:www\\.)?${socialDomain}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$`,
    "ig"
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    if (!urlRegex.test(inputValue)) {
      changeFormError(true);
      setError(`Enter a valid ${previewLink.name} URL.`);
    } else {
      setError("");
      changeFormError(false);
    }

    setLink(inputValue);
    updatePreviewLink({
      id: previewLink.id,
      newData: { ...previewLink, link: inputValue },
    });
  }

  const options = socials.map(item => {
    return {
      id: item.id,
      name: item.name,
    };
  });
  function handleRemove() {
    removePreviewLink(id);
  }
  return (
    <>
      <StyledFormRow value={previewLink}>
        <div className="text-gray-500 text-xl flex items-center gap-2 cursor-grab pt-[2rem] pb-4 active:cursor-grabbing">
          <HiMiniBars2 />
          <p className="font-bold text-base ">Link #{index + 1}</p>
          <button
            onClick={handleRemove}
            type="button"
            className="text-base ml-auto text-gray-600  hover:underline underline-offset-2 hover:text-red-400">
            Remove
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-[1rem] text-gray-500 font-medium">Platform</p>
            <Select options={options} previewLink={previewLink} />
          </div>
          <div className="space-y-2">
            <p className="text-[1rem] text-gray-500 font-medium">Link</p>
            <LinkInput
              id={previewLink.id}
              formError={formError}
              error={error}
              value={link}
              onChange={handleInputChange}
              onSubmit={e => console.log(e)}
              // required
              previewLink={previewLink}
            />
          </div>
        </div>
      </StyledFormRow>
    </>
  );
}

export default FormRow;
