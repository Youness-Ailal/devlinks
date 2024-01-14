import emptyFolder from "@/assets/empty-folder.svg";
import Text from "@/components/Text";

function EmptyLinks() {
  return (
    <div className="flex h-full items-center justify-center flex-col bg-gray-50 rounded-md p-10 gap-4">
      <img
        draggable={false}
        className="h-[8rem] opacity-90"
        src={emptyFolder}
        alt="empty folder icon"
      />
      <div className="space-y-2 text-center max-w-[35ch]">
        <p className="text-gray-500 text-2xl font-medium">First time here?</p>
        <Text>
          Your link list has is empty - add your first social media or website
          connection for others to follow.
        </Text>
      </div>
    </div>
  );
}

export default EmptyLinks;
