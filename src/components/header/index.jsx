import { NavBar } from "../navbar";
import { SahilLogo } from "../logo-component";

export const Header = () => {
  return (
    <div id="header" className="flex flex-col justify-center align-middle p-10">
      {/* TODO: animate splitter for logo */}
      <SahilLogo />
      <NavBar />
    </div>
  );
};
