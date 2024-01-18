import PreviewCanva from "@/components/preview/PreviewCanva";
import PreviewNav from "@/components/preview/PreviewNav";
import styled from "styled-components";
import { motion } from "framer-motion";
import bg from "/bg3.jpg";

const Header = styled.div`
  height: 24rem;
  border-radius: 0 0 2rem 2rem;
  padding-top: 1rem;

  background-size: cover;
  background-position: center;
`;

function Preview() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="bg-gray-50 h-screen">
      <Header className="" style={{ backgroundImage: `url(${bg})` }}>
        <PreviewNav />
        <div className="translate-y-[6rem]">
          <PreviewCanva />
        </div>
      </Header>
    </motion.div>
  );
}

export default Preview;
