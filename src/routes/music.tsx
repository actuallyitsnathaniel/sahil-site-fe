import AudioPlayer from "../components/audio-track-player";

import { getMusicPage } from "../api/getMusicData";
import { useState, useEffect } from "react";
import Loading from "../components/loading";

type MusicTrack = {
  audioTrack: { url: string };
  trackTitle: string;
  trackSource: string;
};
const Music = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [music, setMusic] = useState<MusicTrack[]>([]); // Initialized as empty array

  useEffect(() => {
    const fetchMusicPage = async () => {
      setIsLoading(true);
      try {
        const { musicTrack } = await getMusicPage();
        setMusic(musicTrack);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMusicPage();
  }, []);

  return (
    <div
      id="music"
      className="flex flex-col w-full items-center flex-wrap min-h-screen md:pt-14"
    >
      <h2 className="sticky top-1.5 md:hidden py-5 text-4xl text-center z-[1]">
        Music
      </h2>
      <AudioPlayer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {music.map(({ audioTrack, trackTitle, trackSource }) => (
              <AudioPlayer.Track
                src={audioTrack.url}
                title={trackTitle}
                film={trackSource}
              />
            ))}
          </>
        )}
      </AudioPlayer>
    </div>
  );
};

export default Music;
