import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const NavItem = (props) => {
  return (
    <li className="transition-all duration-100 hover:scale-105 hover:-translate-y-2">
      <Link
        className={`hover:text-orange-300 hover:scale-110 p-5 font-normal`}
        to={props.link}
        onClick={() => {
          props.setExpanded(false);
        }}
      >
        {props.text}
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string.isRequired,
  setExpanded: PropTypes.func.isRequired,
};
