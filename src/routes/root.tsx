import { NavBar } from "../components/navbar";
import Home from "../routes/home";
import Footer from "../components/footer";
import AboutMe from "./about-me";
import Credits from "./credits";
import Music from "./music";
import Connect from "./connect";
import { BackgroundMediaLayer } from "../components/background-media";
import { ScrollHint } from "../components/scroll-hint";
import ScrollToHashElement from "../utilities/ScrollToHashElement";

const Root = () => {
  return (
    <div
      id="root"
      className="flex flex-wrap flex-col justify-center font-light [&>*]:text-white"
    >
      <BackgroundMediaLayer />
      <ScrollHint />
      <Home />
      <AboutMe />
      <Music />
      <Credits />
      <Connect />
      <Footer />
      <ScrollToHashElement />
      <NavBar />
    </div>
  );
};

export default Root;
