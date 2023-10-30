import { PropTypes } from "prop-types";

export const AudioTrackPlayer = (props) => {
  return (
    <div className="grid md:px-10 py-5 justify-items-center">
      <h5 className="">{props.title}</h5>
      <audio src={props.src} controls controlsList="nodownload"/>
    </div>
  );
};

AudioTrackPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
