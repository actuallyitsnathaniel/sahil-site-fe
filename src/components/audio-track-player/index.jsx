import React, { useState } from "react";
import { PropTypes } from "prop-types";

const AudioTrack = (props) => {
  // TODO: set up play pause toggling. add a little more logic
  // to only allow one thing to play at a time.
  //    https://www.w3schools.com/jsref/met_audio_pause.asp
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);

  const HandlePlayback = (e) => {
    const track = document.getElementById(e.target.id);
    if (currentTrackIndex !== track) setCurrentTrackIndex(e.target.id);
    console.log(currentTrackIndex);
  };

  return (
    <div className="grid md:px-10 py-5 justify-items-center">
      <h5>{props.title}</h5>
      {props.film ? (
        <p className="font-light text-sm">(from &quot;{props.film}&quot;)</p>
      ) : (
        <p className="font-light text-sm">(Original)</p>
      )}

      <audio
        src={props.src}
        controls
        onPlay={(e) => HandlePlayback(e)}
        id={props.index}
      />
    </div>
  );
};

AudioTrack.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  film: PropTypes.string,
  index: PropTypes.number,
};

const AudioPlayer = ({ children }) => {
  // TODO: limit audio playing to one track at a time
  // https://medium.com/@justynazet/passing-props-to-props-children-using-react-cloneelement-and-render-props-pattern-896da70b24f6#:~:text=Let%E2%80%99s%20see%20it%20in%20code%3A
  // this might help

  const AudioTracks = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      index,
    });
  });
  return <div className="flex flex-wrap justify-center">{AudioTracks}</div>;
};

AudioPlayer.propTypes = {
  children: PropTypes.array,
};

AudioPlayer.Track = AudioTrack;

export default AudioPlayer;
