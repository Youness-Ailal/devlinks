import { FaYoutube } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineChevronDown } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "@/hooks/useOutsideClick";

type SelectProps = {
  label?: string;
  options?: { option: string; value: string }[];
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
`;
function Select({ label = "Select an option", options }: SelectProps) {
  const [show, setShow] = useState(false);
  const [option, setOption] = useState("");
  const ref = useOutsideClick(closeSelect);
  function toggleShow() {
    setShow(prev => !prev);
  }
  function closeSelect() {
    setShow(false);
  }

  function handleSelect(value: string) {
    setOption(value);
    closeSelect();
  }
  return (
    <StyledSelect ref={ref}>
      <SelectHeader onClick={toggleShow}>
        {(
          <p className="flex items-center gap-2">
            <FaYoutube /> {option}
          </p>
        ) || label}
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
            <Option onClick={() => handleSelect("Youtube")}>
              <FaYoutube /> Youtube
            </Option>
            <Option>
              <FaYoutube /> Youtube
            </Option>
            <Option>
              <FaYoutube /> Youtube
            </Option>
          </Options>
        )}
      </AnimatePresence>
    </StyledSelect>
  );
}

export default Select;
