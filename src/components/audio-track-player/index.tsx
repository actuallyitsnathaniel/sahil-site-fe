import { useState } from "react";

import AudioTrack from "./audio-track";
import { FloatingPlayPauseButton } from "./playback";

export type AudioTrackType = {
  audioTrack: { url: string };
  trackSource: string;
  trackTitle: string;
};

const AudioPlayer = ({ children }: { children: [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(-1);

  const AudioTracks = children?.map(
    (
      { audioTrack: { url }, trackSource, trackTitle }: AudioTrackType,
      index
    ) => {
      return (
        <AudioTrack
          src={url}
          film={trackSource}
          title={trackTitle}
          {...{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying, index }}
          key={index}
        />
      );
    }
  );

  return (
    <div>
      <FloatingPlayPauseButton
        {...{ isPlaying, setIsPlaying, currentTrack, setCurrentTrack }}
      />
      <div className="flex flex-wrap sm:max-w-6xl justify-center">
        <div className="flex flex-row flex-wrap justify-center gap-16 row-span-3">
          {AudioTracks}
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
