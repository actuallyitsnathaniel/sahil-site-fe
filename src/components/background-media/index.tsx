import { useState, useEffect } from "react";
import { getGlobalData, BackgroundMedia } from "../../api/getGlobalData";

export const BackgroundMediaLayer = () => {
  const [media, setMedia] = useState<BackgroundMedia>(null);

  useEffect(() => {
    // Remove stale entries from a previous version that cached this in localStorage.
    localStorage.removeItem("global-data");
    localStorage.removeItem("global-data-timestamp");

    const fetchGlobalData = async () => {
      try {
        const response = await getGlobalData();
        setMedia(response?.backgroundMedia ?? null);
      } catch (error) {
        console.error("Error fetching global data:", error);
      }
    };
    fetchGlobalData();
  }, []);

  if (!media) {
    return <span className="fixed inset-0 -z-10 bg-black" />;
  }

  if (media.mime.startsWith("video/")) {
    return (
      <video
        className="fixed inset-0 -z-10 w-full h-full object-cover brightness-[60%]"
        src={media.url}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  return (
    <img
      className="fixed inset-0 -z-10 w-full h-full object-cover brightness-[60%]"
      src={media.url}
      alt=""
    />
  );
};
