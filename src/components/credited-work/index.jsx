import PropTypes from "prop-types";

export const CreditedWork = (props) => {
  return (
    <div className="flex flex-col justify-center mx-10 p-14 max-w-xs">
      <a href={props.url} className="flex flex-col">
        <img className="max-h-72" src={props.artwork} alt={props.alt} />

        <p className="text-center">{props.title}</p>
      </a>
    </div>
  );
};

CreditedWork.propTypes = {
  artwork: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  alt: PropTypes.string.isRequired,
};
