import { PropTypes } from "prop-types";
import HamburgerIcon from "../../assets/images/icons/navbar/hamburger-icon.svg";
import CloseIcon from "../../assets/images/icons/navbar/close-icon.svg";

export const MobileNavButton = (props) => {
  return (
    <button
      data-collapse-toggle="navbar"
      id="navbar-icon"
      type="button"
      className={`transition-transform duration-100 fixed top-3 right-3 hover:scale-105 hover:-translate-y-1`}
      aria-controls="navbar"
      aria-expanded="false"
      onClick={() => {
        props.setExpanded(!props.expanded);
      }}
    >
      {props.expanded ? (
        <img src={CloseIcon} className="h-16" alt="close" />
      ) : (
        <img src={HamburgerIcon} className="h-16" alt="hamburger-icon" />
      )}
    </button>
  );
};

MobileNavButton.propTypes = {
  setExpanded: PropTypes.func,
  expanded: PropTypes.func,
};
