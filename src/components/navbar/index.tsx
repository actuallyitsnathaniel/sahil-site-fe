import { useState, useEffect, SetStateAction, Dispatch } from "react";

import { NavItem } from "./nav-item";
import { MobileNavButton } from "./mobile-nav-button";

const DesktopNav = () => {
  return (
    <nav className="transition-transform duration-100 fixed top-0 left-0 flex whitespace-nowrap text-2xl animate-appear-slow bg-gradient-to-b from-emerald-800 from-5% via-15% to-transparent to-110%">
      <ul className="flex transition-transform duration-100 text-center flex-wrap flex-row py-4 w-screen justify-evenly">
        <NavItem text="Home" link={`#home`} />
        <NavItem text="About Me" link={`#about-me`} />
        <NavItem text="Music" link={`#music`} />
        <NavItem text="Credits" link={`#credits`} />
        <NavItem text="Connect" link={`#connect`} />
      </ul>
    </nav>
  );
};

const MobileNav = ({
  setExpanded,
  expanded,
}: {
  setExpanded: Dispatch<SetStateAction<boolean>>;
  expanded: boolean;
}) => {
  return (
    <nav className="fixed z-[2] top-0 left-0 flex whitespace-nowrap text-2xl animate-appear-slow">
      <div
        className={`fixed origin-left transition-transform duration-200 backdrop-blur-lg flex flex-col bg-black/90 h-screen w-screen ${
          expanded ? "translate-x-[0%]" : "translate-x-[-100%]"
        }`}
      >
        <ul className="flex flex-col h-[90%] justify-evenly text-center">
          <NavItem text="Home" link={`#home`} setExpanded={setExpanded} />
          <NavItem
            text="About Me"
            link={`#about-me`}
            setExpanded={setExpanded}
          />
          <NavItem text="Music" link={`#music`} setExpanded={setExpanded} />
          <NavItem text="Credits" link={`#credits`} setExpanded={setExpanded} />
          <NavItem text="Connect" link={`#connect`} setExpanded={setExpanded} />
        </ul>
      </div>
      <MobileNavButton expanded={expanded} setExpanded={setExpanded} />
    </nav>
  );
};

export const NavBar = () => {
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);
  const [expanded, setExpanded] = useState(false);

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
  const isMobile = windowDimension <= 785;

  return isMobile ? (
    <>
      <div className="fixed top-0 h-40 w-screen bg-gradient-to-b from-emerald-800 from-15% via-60% to-transparent to-110% pointer-events-none" />
      <div
        className={`fixed transition-all duration-100 h-screen overflow-visible brightness-80 bg-gradient-to-tr from-transparent via-transparent to-emerald-950  ${
          !expanded && "hidden"
        }`}
      />
      <MobileNav expanded={expanded} setExpanded={setExpanded} />
    </>
  ) : (
    <DesktopNav />
  );
};
