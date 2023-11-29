import React, { useState, useRef } from "react";
import { PropTypes } from "prop-types";

import { HandlePlayback } from "./playback";
import ProgressBar from "./progress-bar";
import Play from "../../assets/images/icons/audio-player/play.svg";
import Pause from "../../assets/images/icons/audio-player/pause.svg";

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
    <div className="grid py-5 sm:px-10 justify-items-center basis-1/3">
      <h5>{props.title}</h5>
      {props.film ? (
        <p className="font-light text-sm">(from &quot;{props.film}&quot;)</p>
      ) : (
        <p className="font-light text-sm">(Original)</p>
      )}
      <div id="controls" className="flex flex-row align-middle ">
        <button className="flex" onClick={() => HandlePlayback(props)}>
          {props.currentTrack == props.index ? (
            <img src={Pause} className="" alt="audio-pause" />
          ) : (
            <img src={Play} alt="audio-play" />
          )}
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
    </div>
  );
};

const AudioControls = (props) => {
  const controls = true;
  return (
    <button
      className={`fixed bottom-2 left-2 h-16 ${
        props.currentTrack > -1 ? "visible" : "invisible"
      }`}
      onClick={() => HandlePlayback(props, controls)}
    >
      {props.isPlaying ? (
        <img src={Pause} className="h-20" />
      ) : (
        <img src={Play} className="h-20" />
      )}
    </button>
  );
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

  return (
    <div>
      <div className="flex flex-wrap sm:flex-row flex-col max-w-6xl justify-center">
        <div id="audio-tracks" className="md:w-4/5"></div>
        {AudioTracks}
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  children: PropTypes.array,
};

AudioControls.propTypes = {
  currentTrack: PropTypes.number,
  isPlaying: PropTypes.bool,
  setIsPlaying: PropTypes.func,
  index: PropTypes.number,
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

AudioPlayer.Track = AudioTrack;

export default AudioPlayer;
