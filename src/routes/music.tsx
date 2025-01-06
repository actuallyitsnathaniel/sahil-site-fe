import AudioPlayer from "../components/audio-track-player";

import { getMusicPage } from "../api/getMusicData";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import pageTransition from "../utilities/motionPage";

const Music = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [music, setMusic] = useState<[]>([]);

  useEffect(() => {
    const fetchMusicPage = async () => {
      setIsLoading(true);
      try {
        const response = await getMusicPage();
        setMusic(response.musicTrack);
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
      <h2 className="sticky top-1.5 md:hidden py-5 pb-10 text-4xl text-center z-[1]">
        Music
      </h2>
      {isLoading ? <Loading /> : <AudioPlayer>{music}</AudioPlayer>}
    </div>
  );
};

export default pageTransition(Music);
