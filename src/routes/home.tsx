import { Header } from "../components/header";
import pageTransition from "../utilities/motionPage";
import SEO from "../components/seo";

const Home = () => {
  return (
    <>
      <SEO
        title="Sahil Jindal Music"
        description="Sahil Jindal - Music producer, composer, and audio engineer. Explore my original music, credits, and connect for collaborations."
        url="https://sahiljindal.com"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Sahil Jindal",
          "jobTitle": "Music Producer & Composer",
          "url": "https://sahiljindal.com",
          "sameAs": []
        }}
      />
      <div
        id="home"
        className="flex flex-col w-full min-h-screen justify-center md:pt-16"
      >
        <h1 className="sr-only">Sahil Jindal - Music Producer & Composer</h1>
        <Header />
      </div>
    </>
  );
};

export default pageTransition(Home);
