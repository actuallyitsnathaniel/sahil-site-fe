import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Dispatch, SetStateAction } from "react";

export const NavItem = ({
  text,
  link,
  setExpanded,
}: {
  text?: string;
  link: string;
  setExpanded?: Dispatch<SetStateAction<boolean>>;
}) => {
  /**
   * TODO:
   * DESKTOP:
   *   - current page title should always be FOCUSED on navbar.
   *   - effect:
   *       - onClick, set as active page, similar to hover, but maybe bolded and underlined.
   */
  return (
    <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
      <Link
        className={`hover:text-orange-300 hover:scale-110 p-5 font-normal`}
        to={link}
        onClick={() => {
          setExpanded && setExpanded(false);
        }}
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
