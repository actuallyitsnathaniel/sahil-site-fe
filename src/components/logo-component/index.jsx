import logoLeft from "../../assets/logo/sahil-logo-split/logo-left.svg";
import logoMiddle from "../../assets/logo/sahil-logo-split/logo-middle.svg";
import logoRight from "../../assets/logo/sahil-logo-split/logo-right.svg";

// import { usePageTitle } from "../../utilities/util";
import {
  Link,
  // useLocation
} from "react-router-dom";

export const SahilLogo = () => {
  return (
    <Link to={`#home`}>
      <div
        id="logo-container"
        className="flex justify-center relative"
        alt="sahil-jindal-logo"
      >
        <div id="left-wrapper" className="overflow-clip">
          <img
            className={`h-48 m-0 p-2 animate-fade-in-left`}
            src={logoLeft}
            alt="logo-left"
          />
        </div>
        <div id="middle-wrapper" className="">
          <img
            className={`h-48 m-0 p-[1px] sm:p-1.5 animate-fade-in-middle`}
            src={logoMiddle}
            alt="logo-middle"
          />
        </div>
        <div id="right-wrapper" className="overflow-clip">
          <img
            className={`h-48 m-0 p-2 animate-fade-in-right`}
            src={logoRight}
            alt="logo-right"
          />
        </div>
      </div>
    </Link>
  );
};
