import { SahilLogo } from "../logo-component";

export const Header = () => {
  return (
    <div id="header" className="absolute w-screen flex flex-col -mt-10">
      <SahilLogo />
      <div className="flex-row justify-between py-3 md:py-10 text-center font-light animate-appear-slow [&>*]:px-2 [&>*:md]:px-2.5">
        <span>Composer</span>
        <span>|</span>
        <span>Orchestrator</span>
        <span>|</span>
        <span>Music Editor</span>
      </div>
    </div>
  );
};
