import Text from "@/components/Text";
import styled from "styled-components";
import { IoImageOutline } from "react-icons/io5";
import { HiPlus } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useProfile } from "@/context/ProfileContext";

const Label = styled.label`
  height: 12rem;
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  background-color: var(--color-brand-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: 0.2s;
  border: 1px dashed var(--color-brand-300);
  &:hover {
    background-color: var(--color-brand-150);
    border: 1px dashed var(--color-brand-400);
  }
`;
const LabelWithImage = styled.label`
  height: 12rem;
  aspect-ratio: 1;
  border-radius: var(--radius-sm);
  display: flex;
  background-size: cover;
  background-position: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: 0.2s;
  border: 1px solid var(--color-grey-200);
  overflow: hidden;
  &:hover div {
    opacity: 1;
  }
`;

function ProfileImage({ register, watch, avatar, isLoading }) {
  const [image, setImage] = useState<string | ArrayBuffer | null>(avatar);
  const { addPreviewAvatar, removePreviewAvatar } = useProfile();

  useEffect(() => {
    const file = watch("avatar");

    if (file?.length) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        setImage(fileReader.result);
        addPreviewAvatar(fileReader.result.toString());
      };

      fileReader.readAsDataURL(file[0]);
    }
    return () => removePreviewAvatar();
  }, [watch("avatar")]);

  return (
    <div className="flex gap-10 justify-between bg-gray-50 p-4 items-center border rounded-md border-violet-50 flex-wrap">
      <Text>Profile Picture</Text>
      <div className="flex items-center gap-8 flex-wrap">
        <input
          disabled={isLoading}
          className="hidden"
          id="image"
          type="file"
          accept="image/png, image/jpeg, image/bmp"
          {...register("avatar")}
        />
        {!image && (
          <Label
            className="text-base text-violet-600 font-medium cursor-pointer"
            htmlFor="image">
            <p className="text-4xl">
              <IoImageOutline />
            </p>
            <p className="flex text-lg font-semibold items-center gap-1">
              <HiPlus />
              Upload image
            </p>
          </Label>
        )}
        {image && (
          <LabelWithImage
            className={cn("cursor-pointer", {
              "cursor-not-allowed pointer-events-none opacity-80": isLoading,
            })}
            htmlFor="image"
            style={{ backgroundImage: `url(${image})` }}>
            <div className="opacity-0 gap-3 duration-200 h-full w-full text-gray-200 flex items-center justify-center flex-col bg-zinc-900/70">
              <p className="text-4xl">
                <IoImageOutline />
              </p>
              <p className="flex text-lg font-semibold items-center gap-1">
                Change Image
              </p>
            </div>
          </LabelWithImage>
        )}

        <p className="text-[1rem]  text-gray-500 mr-6 leading-[2] max-[1200px]:mr-1">
          Images must be below 1024x1024px.
          <br />
          Use PNG, JPG, or BMP format
        </p>
      </div>
    </div>
  );
}

export default ProfileImage;
