import UserLinks from "@/components/UserLinks";
import bg from "/bg3.jpg";
function DevLink() {
  return (
    <div className="min-h-screen">
      <div
        className="h-[20rem]  rounded-b-[2rem] bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}>
        <div className="translate-y-[8rem]">
          <UserLinks />
        </div>
      </div>
    </div>
  );
}

export default DevLink;
