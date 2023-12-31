import { SahilLogo } from "../logo-component";

export const Header = () => {
  return (
    <div id="header" className="absolute flex w-full flex-col -mt-10">
      <SahilLogo />
      <div className="flex-row justify-between py-3 md:py-10 text-center font-light animate-appear-slow [&>*]:px-2 [&>*:md]:px-2.5 px-0 mx-0">
        <span>Composer</span>
        <span>|</span>
        <span>Orchestrator</span>
        <span>|</span>
        <span>Music Editor</span>
      </div>
    </div>
  );
};
