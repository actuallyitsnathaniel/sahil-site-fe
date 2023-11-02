import React, { useState } from "react";
import { PropTypes } from "prop-types";

const AudioTrack = (props) => {
  // TODO: set up play pause toggling. add a little more logic
  // to only allow one thing to play at a time.
  //    https://theshubhagrwl.medium.com/you-might-not-need-a-sound-library-for-react-a265870dabda
  const selectedAudio = document.getElementById(`audio-${props.index}`);
  const playingAudio = document.getElementById(`audio-${props.currentTrack}`);

  const HandlePlayback = () => {
    if (!props.isPlaying) {
      props.setCurrentTrack(props.index);
      props.setIsPlaying(true);
      selectedAudio.play();
    }

    if (props.isPlaying) {
      if (props.currentTrack == props.index) {
        selectedAudio.pause();
        props.setIsPlaying(false);
        props.setCurrentTrack(-1);
      }

      if (props.currentTrack != props.index) {
        playingAudio.pause();
        props.setIsPlaying(false);
        props.setCurrentTrack(props.index);
        selectedAudio.play();
        props.setIsPlaying(true);
      }
    }
  };

  return (
    <div className="grid md:px-10 py-5 justify-items-center">
      <h5>{props.title}</h5>
      {props.film ? (
        <p className="font-light text-sm">(from &quot;{props.film}&quot;)</p>
      ) : (
        <p className="font-light text-sm">(Original)</p>
      )}
      <button onClick={HandlePlayback}>
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
