import PropTypes from "prop-types";

export const CreditedWork = (props) => {
  return (
    <div className="flex flex-col justify-center mx-10 p-14 max-w-xs">
      <a href={props.url}>
        <img
          className="flex max-h-72 justify-center"
          src={props.artwork}
          alt={props.alt}
        />

        <p className="text-center justify-center">{props.title}</p>
      </a>
    </div>
  );
};

CreditedWork.propTypes = {
  artwork: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  alt: PropTypes.string.isRequired,
};
