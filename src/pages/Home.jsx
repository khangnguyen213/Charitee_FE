import React, { useRef } from "react";
import Main from "../components/Main";
import AboutUs from "../components/AboutUs";
import { Causes } from "../components/Causes";
import Information from "../components/Information";
import Footer from "../components/Footer";

const Home = () => {
  const ref = useRef();

  //ref ở mục Causes để khi nhấn vào sẽ scroll xuống phần đó
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Main onScrollClick={handleClick} />
      <AboutUs onScrollClick={handleClick} />
      <Causes parentRef={ref} />
      <Information />
      <Footer />
    </div>
  );
};

export default Home;
