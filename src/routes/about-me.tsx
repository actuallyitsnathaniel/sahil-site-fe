import { useState, useEffect } from "react";
import { getAboutPage } from "../api/getAboutData";
import RichTextRenderer from "../components/rich-text-renderer";

type RichTextNode =
  | { type: "text"; text: string }
  | { type: "link"; url: string; children: RichTextNode[] }
  | { type: "paragraph"; children: RichTextNode[] };

type Photo = {
  url: string;
};

type ResponseObject = {
  description: RichTextNode[];
  aboutPhotos: Photo[];
} | null;

const AboutMe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [about, setAbout] = useState<ResponseObject>(null);

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
        console.log("ABOUT STUFF:", about);
      }
    };
    fetchAboutPage();
  }, []);

  return (
    <div id="about-me" className="h-full md:pt-14">
      <p className="sticky md:hidden top-1.5 py-5 text-4xl text-center z-[1]">
        About Me
      </p>
      {isLoading ? (
        <div className="animate-bounce mx-auto">Loading...</div>
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

export default AboutMe;
