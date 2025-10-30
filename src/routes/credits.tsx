import { CreditedWork } from "../components/credited-work";

import pageTransition from "../utilities/motionPage";
import { useEffect, useState } from "react";
import { getCreditsPage } from "../api/getCreditsData";
import Loading from "../components/loading";
import { formatToHash } from "../utilities/util";
import SEO from "../components/seo";

export type CreditedWorkType = {
  creditType: string;
  creditedWorkPoster: { url: string };
  creditedWorkType: string;
  creditedWorkTitle: string;
};

const Credits = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [credits, setCredits] = useState<CreditedWorkType[]>([]);
  useEffect(() => {
    const fetchCreditsPage = async () => {
      setIsLoading(true);

      try {
        const { creditedWork } = await getCreditsPage();
        setCredits(creditedWork);
      } catch (error) {
        console.error("Error fetching Credits page: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreditsPage();
  }, []);

  return (
    <>
      <SEO
        title="Credits"
        description="Browse Sahil Jindal's professional credits as a composer and in the music department for various productions."
        url="https://sahiljindal.com#credits"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Credits",
          description: "Professional credits and work by Sahil Jindal",
        }}
      />
      <div
        id="credits"
        className="flex flex-wrap min-h-screen justify-center md:pt-14"
      >
        <h1 className="sticky md:hidden top-1.5 py-5 text-4xl text-center z-[1]">
          Credits
        </h1>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div id="composer">
              <h2 className="text-3xl text-center">Composer (Selection)</h2>
              <div className="flex flex-wrap flex-row justify-center">
                {credits.map((composerWork: any, index) => {
                  if (composerWork.creditType === "Composer")
                    return (
                      <CreditedWork
                        artwork={composerWork.creditedWorkPoster.url}
                        title={composerWork.creditedWorkTitle}
                        workType={composerWork.creditedWorkType}
                        alt={formatToHash(composerWork.creditedWorkTitle)}
                        key={`composer-${index}`}
                      />
                    );
                })}
              </div>
            </div>
            <div>
              <h2 className="text-3xl text-center">Music Department</h2>
              <div className="flex flex-wrap flex-row justify-center">
                {credits.map((composerWork: any, index) => {
                  if (composerWork.creditType === "Music Department")
                    return (
                      <CreditedWork
                        artwork={composerWork.creditedWorkPoster.url}
                        title={composerWork.creditedWorkTitle}
                        workType={composerWork.creditedWorkType}
                        alt={formatToHash(composerWork.creditedWorkTitle)}
                        key={`music-department-${index}`}
                      />
                    );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default pageTransition(Credits);
