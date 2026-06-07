import AudioPlayer from "../components/audio-track-player";

import { getMusicPage } from "../api/getMusicData";
import { useState, useEffect } from "react";
import Loading from "../components/loading";
import pageTransition from "../utilities/motionPage";
import SEO from "../components/seo";

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
    <>
      <SEO
        title="Music"
        description="Listen to original music by Sahil Jindal. Discover tracks across multiple genres and styles."
        url="https://sahiljindal.com#music"
        type="music.album"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "MusicAlbum",
          "name": "Original Music by Sahil Jindal",
          "description": "A collection of original music tracks by Sahil Jindal spanning multiple genres and styles.",
          "byArtist": {
            "@type": "Person",
            "name": "Sahil Jindal",
            "url": "https://sahiljindal.com"
          }
        }}
      />
      <div
        id="music"
        className="flex flex-col w-full items-center flex-wrap h-full md:pt-14"
      >
        <h2 className="sticky top-1.5 md:hidden py-5 pb-10 text-4xl text-center z-[2]">
          Music
        </h2>
        {isLoading ? <Loading /> : <AudioPlayer>{music}</AudioPlayer>}
      </div>
    </>
  );
};

export default pageTransition(Music);
