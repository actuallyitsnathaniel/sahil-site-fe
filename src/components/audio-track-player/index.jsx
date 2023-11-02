import React, { useState, useRef } from "react";
import { PropTypes } from "prop-types";
import { HandlePlayback } from "./playback";
import ProgressBar from "./progress-bar";

const AudioTrack = (props) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressBarRef = useRef();
  const audioRef = useRef();
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <div className="grid p-5 justify-items-center">
      <h5>{props.title}</h5>
      {props.film ? (
        <p className="font-light text-sm">(from &quot;{props.film}&quot;)</p>
      ) : (
        <p className="font-light text-sm">(Original)</p>
      )}
      <button onClick={() => HandlePlayback(props)}>
        {props.currentTrack == props.index ? "PAUSE" : "PLAY"}
        <audio
          src={props.src}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          id={`audio-${props.index}`}
        />
      </button>
      <ProgressBar
        {...{
          progressBarRef,
          audioRef,
          timeProgress,
          setTimeProgress,
          duration,
        }}
      />
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
