import Text from "@/components/Text";
import styled from "styled-components";
import { CiImageOn } from "react-icons/ci";
import { HiPlus } from "react-icons/hi2";

const Label = styled.label`
  height: 14rem;
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  background-color: var(--color-brand-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: 0.2s;
  &:hover {
    background-color: var(--color-brand-150);
  }
`;
function ProfileImage() {
  return (
    <div className="flex gap-10 justify-between bg-gray-50  p-4 items-center">
      <Text>Profile Picture</Text>
      <div className="flex items-center gap-8">
        <Label
          className="text-lg text-violet-600 font-medium cursor-pointer"
          htmlFor="image">
          <p className="text-4xl">
            <CiImageOn />
          </p>
          <p className=" flex items-center gap-1">
            <HiPlus />
            Upload image
          </p>
          <input className="hidden" id="image" type="file" accept="image/*" />
        </Label>
        <p className="text-[1rem] text-gray-500 mr-6 leading-[2]">
          Imgaes must be below 1024x1024px.
          <br />
          Use PNG,JPG, or BMP format
        </p>
      </div>
    </div>
  );
}

export default ProfileImage;
