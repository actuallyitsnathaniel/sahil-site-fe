import { Link, useLocation } from "react-router-dom";
import { usePageTitle } from "../../utilities/usePageTitle";

export const NavBar = () => {
  let pageTitle = usePageTitle(useLocation().pathname);
  // TODO: create modal navbar when header navbar is not in viewport
  //        darken and blur background when focused
  return (
    <nav className="flex whitespace-nowrap text-2xl justify-around animate-appear-slow">
      <ul className="flex text-center flex-wrap flex-col md:flex-row md:justify-around p-4 max-w-xl">
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light ${
              pageTitle === "About Me" && "text-gray-500"
            }`}
            to={`#about-me`}
          >
            About Me
          </Link>
        </li>
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light ${
              pageTitle === "Music" && "text-gray-500"
            }`}
            to={`#music`}
          >
            Music
          </Link>
        </li>
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light ${
              pageTitle === "Credits" && "text-gray-500"
            }`}
            to={`#credits`}
          >
            Credits
          </Link>
        </li>
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light ${
              pageTitle === "Connect" && "text-gray-500"
            }`}
            to={`#connect`}
          >
            Connect
          </Link>
        </li>
      </ul>
    </nav>
  );
};
