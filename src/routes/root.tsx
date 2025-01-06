import { NavBar } from "../components/navbar";
import Home from "../routes/home";
import Footer from "../components/footer";
import AboutMe from "./about-me";
import Credits from "./credits";
import Music from "./music";
import Connect from "./connect";
import { BackgroundGradient } from "../components/background-gradient";
import ScrollToHashElement from "../utilities/ScrollToHashElement";

import { AnimatePresence } from "motion/react";

const Root = () => {
  // TODO: add timeline scroller for more friendly cross-platform experience
  return (
    <div
      id="root"
      className="flex flex-wrap flex-col justify-center font-light [&>*]:text-white"
    >
      {/* TODO: fix url so it updates to the viewed section when manually scrolling */}
      <AnimatePresence mode="wait">
        <BackgroundGradient />
        <Home />
        <AboutMe />
        <Music />
        <Credits />
        <Connect />
        <Footer />
      </AnimatePresence>
      <ScrollToHashElement />
      <NavBar />
    </div>
  );
};

export default Root;
