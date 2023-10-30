import { SahilLogo } from "../logo-component";

export const Header = () => {
  return (
    <div id="header" className="absolute w-screen flex flex-col -mt-24">
      <SahilLogo />
      <div className="flex-row justify-between py-10 text-center text-md font-light animate-appear-slow ">
        <span className="">
          Composer
        </span>
        <span className="px-5">|</span>
        <span className="">
          Orchestrator
        </span>
        <span className="px-5">|</span>
        <span className="">
          Music Editor
        </span>
      </div>
    </div>
  );
};
