import { CreditedWork } from "../components/credited-work";

import pageTransition from "../utilities/motionPage";
import { useEffect, useState } from "react";
import { getCreditsPage } from "../api/getCreditsData";
import Loading from "../components/loading";
import { formatToHash } from "../utilities/util";

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
    <div
      id="credits"
      className="flex flex-wrap min-h-screen justify-center md:pt-14"
    >
      <h2 className="sticky md:hidden top-1.5 py-5 text-4xl text-center z-[1]">
        Credits
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div id="composer">
            <h3 className="text-3xl text-center">Composer (Selection)</h3>
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
            <h3 className="text-3xl text-center">Music Department</h3>
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
  );
};

export default pageTransition(Credits);
