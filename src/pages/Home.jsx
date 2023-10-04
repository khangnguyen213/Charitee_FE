import React, { useRef } from 'react';
import Main from '../components/Home/Main';
import AboutUs from '../components/Home/AboutUs';
import { Causes } from '../components/Home/Causes';
import Information from '../components/Home/Information';
import Footer from '../components/Home/Footer';

const Home = () => {
  const ref = useRef();

  //ref ở mục Causes để khi nhấn vào sẽ scroll xuống phần đó
  const handleClick = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f7f6f2]">
      <Main onScrollClick={handleClick} />
      <AboutUs onScrollClick={handleClick} />
      <Causes parentRef={ref} />
      <Information />
      <Footer />
    </div>
  );
};

export default Home;
