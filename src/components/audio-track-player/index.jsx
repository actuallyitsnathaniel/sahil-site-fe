import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { HandlePlayback } from "./playback";

const AudioTrack = (props) => {
  // TODO: create little single audio players.... again

  return (
    <div className="grid md:px-10 py-5 justify-items-center">
      <h5>{props.title}</h5>
      {props.film ? (
        <p className="font-light text-sm">(from &quot;{props.film}&quot;)</p>
      ) : (
        <p className="font-light text-sm">(Original)</p>
      )}
      <button onClick={() => HandlePlayback(props)}>
        {props.currentTrack == props.index ? "PAUSE" : "PLAY"}
        <audio src={props.src} id={`audio-${props.index}`} />
      </button>
    </div>
  );
};

AudioTrack.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  film: PropTypes.string,
  index: PropTypes.number,
  isPlaying: PropTypes.bool,
  setIsPlaying: PropTypes.func,
  currentTrack: PropTypes.number,
  setCurrentTrack: PropTypes.func,
};

const AudioPlayer = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(-1);

  const AudioTracks = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      index,
      isPlaying,
      setIsPlaying,
      currentTrack,
      setCurrentTrack,
    });
  });

  return <div className="flex flex-wrap justify-center">{AudioTracks}</div>;
};

AudioPlayer.propTypes = {
  children: PropTypes.array,
};

AudioPlayer.Track = AudioTrack;

export default AudioPlayer;
