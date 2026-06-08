import { useState, useEffect } from "react";
import { Header } from "../components/header";
import pageTransition from "../utilities/motionPage";
import SEO from "../components/seo";
import CollaboratorCarousel, {
  CollaboratorType,
} from "../components/collaborator-carousel";
import { getHomePage } from "../api/getHomeData";

const Home = () => {
  const [collaborators, setCollaborators] = useState<CollaboratorType[]>([]);

  useEffect(() => {
    getHomePage()
      .then((data) => setCollaborators(data?.collaborators ?? []))
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);

  return (
    <>
      <SEO
        title="Sahil Jindal Music"
        description="Sahil Jindal - Composer, Music Editor, and Orchestrator. Explore my original music, credits, and connect for collaborations."
        url="https://sahiljindal.com"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sahil Jindal",
          jobTitle: "Composer & Music Editor",
          url: "https://sahiljindal.com",
          sameAs: [],
        }}
      />
      <div id="home" className="relative flex flex-col w-full min-h-screen justify-center md:pt-16">
        <h1 className="sr-only">Sahil Jindal - Music Producer & Composer</h1>
        <Header />
        <div className="absolute bottom-0 left-0 right-0">
          <CollaboratorCarousel collaborators={collaborators} />
        </div>
      </div>
    </>
  );
};

export default pageTransition(Home);
