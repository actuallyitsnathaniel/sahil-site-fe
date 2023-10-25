import { NavBar } from "../components/navbar";
import Home from "../routes/home";
import Footer from "../components/footer";
import AboutMe from "./about-me";
import Credits from "./credits";
import Music from "./music";
import Connect from "./connect";
import { BackgroundGradient } from "../components/background-gradient";
import ScrollToHashElement from "../utilities/ScrollToHashElement";

const Root = () => {
  // TODO: add timeline scroller for more friendly cross-platform experience
  return (
    <div
      id="root"
      className="flex flex-wrap flex-row w-screen justify-center align-middle font-light"
    >
      {/* TODO: fix url so it updates to the viewed section when manually scrolling */}
      <BackgroundGradient />
      <div className="z-0">
        <NavBar />
        <Home />
        <AboutMe />
        <Music />
        <Credits />
        <Connect />
        <Footer />
      </div>
      <ScrollToHashElement />
    </div>
  );
};

export default Root;
