import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import HamburgerIcon from "../../assets/images/icons/navbar/hamburger-icon.svg";
import CloseIcon from "../../assets/images/icons/navbar/close-icon.svg";

const DesktopNav = () => {
  return (
    <nav className="sticky top-0 flex whitespace-nowrap text-2xl animate-appear-slow">
      <ul className="flex text-center flex-wrap flex-col md:flex-row py-4 w-screen justify-evenly">
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light`}
            to={`#about-me`}
          >
            About Me
          </Link>
        </li>
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light`}
            to={`#music`}
          >
            Music
          </Link>
        </li>
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light`}
            to={`#credits`}
          >
            Credits
          </Link>
        </li>
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light`}
            to={`#connect`}
          >
            Connect
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const MobileNav = () => {
  const [expanded, setExpanded] = useState(false);
  // const [title, setTitle] = useState("");
  // TODO: come up with responsive navbar that doesn't clash with background.
  // most likely a modal from the side that overlays
  return (
    <nav
      className={`transition-transform duration-100 fixed top-0 flex whitespace-nowrap text-2xl animate-appear-slow`}
    >
      <button
        data-collapse-toggle="navbar"
        id="navbar-icon"
        type="button"
        className={`transition-transform duration-100 fixed top-3 left-3 z-10 hover:scale-105 hover:-translate-y-1`}
        aria-controls="navbar"
        aria-expanded="false"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? (
          <img src={CloseIcon} className="h-14" alt="close" />
        ) : (
          <img src={HamburgerIcon} className="h-14" alt="hamburger-icon" />
        )}
      </button>
      <ul
        className={` bg-white/30 fixed transition-transform duration-100 flex flex-col h-screen w-screen justify-around text-center py-6 ${
          expanded ? "scale-100" : "scale-0"
        }`}
      >
        <li className=" hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light`}
            to={`#about-me`}
            onClick={() => {
              setExpanded(false);
            }}
          >
            About Me
          </Link>
        </li>
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light`}
            to={`#music`}
            onClick={() => {
              setExpanded(false);
            }}
          >
            Music
          </Link>
        </li>
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light`}
            to={`#credits`}
            onClick={() => {
              setExpanded(false);
            }}
          >
            Credits
          </Link>
        </li>
        <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
          <Link
            className={`hover:text-orange-300 hover:scale-110 p-5 font-light`}
            to={`#connect`}
            onClick={() => {
              setExpanded(false);
            }}
          >
            Connect
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const NavBar = () => {
  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowDimension <= 640;
  return isMobile ? <MobileNav /> : <DesktopNav />;
};
