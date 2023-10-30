import { PropTypes } from "prop-types";

export const AudioTrackItem = (props) => {
  return (
    <div className="grid md:px-10 py-5 justify-items-center">
      <h5 className="">{props.title}</h5>
      {props.film && (
        <p className="font-light text-sm">(from &quot;{props.film}&quot;)</p>
      )}
      <audio src={props.src} controls controlsList="nodownload" />
    </div>
  );
};

AudioTrackItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  film: PropTypes.string,
};
