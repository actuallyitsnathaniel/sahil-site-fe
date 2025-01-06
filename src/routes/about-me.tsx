import { useState, useEffect } from "react";
import { getAboutPage } from "../api/getAboutData";
import RichTextRenderer from "../components/rich-text-renderer";
import Loading from "../components/loading";
import pageTransition from "../utilities/motionPage";

type RichTextNode =
  | { type: "text"; text: string }
  | { type: "link"; url: string; children: RichTextNode[] }
  | { type: "paragraph"; children: RichTextNode[] };

type Photo = {
  url: string;
};

type AboutMeResponse = {
  description: RichTextNode[];
  aboutPhotos: Photo[];
} | null;

const AboutMe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [about, setAbout] = useState<AboutMeResponse>(null);

  useEffect(() => {
    const fetchAboutPage = async () => {
      setIsLoading(true);
      try {
        const response = await getAboutPage();
        setAbout(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAboutPage();
  }, []);

  return (
    <div id="about-me" className="h-full md:pt-14">
      <p className="sticky md:hidden top-1.5 py-5 pb-10 text-4xl text-center z-[1]">
        About Me
      </p>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {about?.aboutPhotos[0] && (
            <img
              className="hidden w-4/5 md:w-3/5 mx-auto flex-shrink"
              src={about.aboutPhotos[0].url}
            />
          )}
          <RichTextRenderer content={about?.description} />
        </>
      )}
    </div>
  );
};

export default pageTransition(AboutMe);
