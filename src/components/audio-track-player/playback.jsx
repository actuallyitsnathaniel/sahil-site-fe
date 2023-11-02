export const HandlePlayback = (props) => {
  const selectedAudio = document.getElementById(`audio-${props.index}`);
  const playingAudio = document.getElementById(`audio-${props.currentTrack}`);
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
