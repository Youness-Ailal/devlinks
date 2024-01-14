import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ICON_URL } from "@/utils/constants";
import { useLinksContext } from "@/context/LinksContext";
import socials from "@/data/Socials";
import DisplayIcon from "./DisplayIcon";
import { cn } from "@/lib/utils";
import { colors } from "@/data/Colors";

export type OptionType = {
  id: string;
  name: string;
  link?: string;
};
type SelectProps = {
  options: OptionType[];
  previewLink: OptionType;
};

const StyledSelect = styled.div`
  width: 100%;
  user-select: none;
  cursor: pointer;
  color: var(--color-grey-600);
  font-weight: 500;
  position: relative;
`;
const SelectHeader = styled.div`
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-300);
  height: 3rem;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;
const Option = styled.div`
  padding: 0.8rem 0.6rem;
  color: var(--color-grey-600);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: var(--radius-sm);
  &:hover {
    background-color: var(--color-brand-50);
  }
`;
const Options = styled(motion.div)`
  background-color: var(--color-white);
  width: 100%;
  padding: 0.6rem 0.2rem;
  font-size: 1rem;
  border: 1px solid var(--color-grey-300);
  position: absolute;
  border-radius: var(--radius-sm);
  top: 3.6rem;
  transform-origin: center;
  max-height: 15rem;
  overflow-y: scroll;
  z-index: 99;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
`;
const OptionImg = styled.img`
  filter: contrast(0.2);
`;
function Select({ options, previewLink }: SelectProps) {
  const [show, setShow] = useState(false);
  const [newOptions, setNewOptions] = useState(options);
  const { updatePreviewLink, previewLinks } = useLinksContext();

  const allIds = previewLinks?.map(item => item.id)?.join(" ") || "";
  useEffect(() => {
    setNewOptions(options.filter(item => !allIds.includes(item.id)));
  }, [allIds, options]);

  const [option, setOption] = useState<OptionType | null>(() => {
    const linkIndex = options.findIndex(item => item.id === previewLink.id);

    if (linkIndex >= 0) {
      return options[linkIndex];
    }
    return options[0];
  });

  useEffect(() => {
    updatePreviewLink({
      id: previewLink.id,
      newData: {
        id: socials.find(item => item.name === option.name).id,
        name: option.name,
        link: previewLink.link || "",
        // ...previewLink,
      },
    });
  }, [option]);

  const ref = useOutsideClick(closeSelect);

  function toggleShow() {
    setShow(prev => !prev);
  }
  function closeSelect() {
    setShow(false);
  }

  function handleSelect(option: OptionType) {
    setOption(option);
    closeSelect();
  }
  return (
    <StyledSelect ref={ref}>
      <SelectHeader onClick={toggleShow}>
        {
          <div key={option.id}>
            <div className="flex items-center gap-2 text-base">
              <p className="text-2xl">
                <DisplayIcon iconName={option.name} />
              </p>
              <p>{option.name}</p>
            </div>
          </div>
        }
        <p className="text-violet-600 text-xl">
          <HiOutlineChevronDown />
        </p>
      </SelectHeader>
      <AnimatePresence>
        {show && (
          <Options
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}>
            {newOptions.map(item => {
              return (
                <Option key={item.id} onClick={() => handleSelect(item)}>
                  <div className=" flex items-center gap-2 text-base">
                    <p className="text-2xl">
                      <DisplayIcon iconName={item.name} />
                    </p>
                    <p>{item.name}</p>
                  </div>
                </Option>
              );
            })}
          </Options>
        )}
      </AnimatePresence>
    </StyledSelect>
  );
}

// function Label(option: OptionType) {
//   return (
//     <div className="flex items-center gap-2">
//       <OptionImg src={option?.icon} alt={`icon of ${option?.value}`} />
//       <p>{option?.option}</p>
//     </div>
//   );
// }

export default Select;
