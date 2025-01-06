import { Header } from "../components/header";
import pageTransition from "../utilities/motionPage";
const Home = () => {
  return (
    <div
      id="home"
      className="flex flex-col w-full min-h-screen justify-center md:pt-16"
    >
      <Header />
    </div>
  );
};

export default pageTransition(Home);
