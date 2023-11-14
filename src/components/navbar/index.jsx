import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";

import { NavItem } from "./nav-item";
import { MobileNavButton } from "./mobile-nav-button";

const DesktopNav = () => {
  return (
    <nav className="transition-transform duration-100 fixed top-0 left-0 flex whitespace-nowrap text-2xl animate-appear-slow">
      <ul className="flex transition-transform duration-100 text-center flex-wrap flex-col md:flex-row py-4 w-screen justify-evenly">
        <NavItem text="Home" link={`#home`} />
        <NavItem text="About Me" link={`#about-me`} />
        <NavItem text="Music" link={`#music`} />
        <NavItem text="Credits" link={`#credits`} />
        <NavItem text="Connect" link={`#connect`} />
      </ul>
    </nav>
  );
};

const MobileNav = (props) => {
  return (
    <nav className="fixed top-0 left-0 flex whitespace-nowrap text-2xl animate-appear-slow">
      <div
        className={`fixed origin-left transition-transform duration-200 backdrop-blur-lg flex flex-col bg-black/90 h-screen w-screen ${
          props.expanded ? "translate-x-[0%]" : "translate-x-[-100%]"
        }`}
      >
        <ul className="flex flex-col h-[90%] justify-evenly text-center">
          <NavItem text="Home" link={`#home`} setExpanded={props.setExpanded} />
          <NavItem
            text="About Me"
            link={`#about-me`}
            setExpanded={props.setExpanded}
          />
          <NavItem
            text="Music"
            link={`#music`}
            setExpanded={props.setExpanded}
          />
          <NavItem
            text="Credits"
            link={`#credits`}
            setExpanded={props.setExpanded}
          />
          <NavItem
            text="Connect"
            link={`#connect`}
            setExpanded={props.setExpanded}
          />
        </ul>
      </div>
      <MobileNavButton
        expanded={props.expanded}
        setExpanded={props.setExpanded}
      />
    </nav>
  );
};

MobileNav.propTypes = {
  setExpanded: PropTypes.func,
  expanded: PropTypes.bool,
};

export const NavBar = () => {
  const [windowDimension, setWindowDimension] = useState(null);
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
  const isMobile = windowDimension <= 640;

  return isMobile ? (
    <>
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
