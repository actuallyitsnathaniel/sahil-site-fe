import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { formatToHash } from "../../utilities/util";

export const NavItem = ({
  text,
  link,
  setExpanded,
}: {
  text: string;
  link: string;
  setExpanded?: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isActivePage, setIsActivePage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const targetElement = document.getElementById(
        formatToHash(text).slice(1)
      ); // Get the element by ID
      if (!targetElement) return;

      // Get element boundaries
      const rect = targetElement.getBoundingClientRect();
      const isInView =
        rect.top <= window.innerHeight / 2 &&
        rect.bottom >= window.innerHeight / 2;

      setIsActivePage(isInView);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call initially to set the correct state

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, [text]);

  const HandleOnClick = () => {
    console.log("CLICKED");
    setExpanded && setExpanded(false);
  };

  return (
    <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-1">
      <Link
        className={`hover:text-orange-300 hover:scale-110 p-5 font-normal
            ${isActivePage && "underline underline-offset-2"}
          `}
        to={link}
        onClick={HandleOnClick}
      >
        {text}
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string.isRequired,
  setExpanded: PropTypes.func,
};
