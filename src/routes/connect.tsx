import { ConnectForm } from "../components/connect-form";
import pageTransition from "../utilities/motionPage";
import SEO from "../components/seo";

const Connect = () => {
  return (
    <>
      <SEO
        title="Connect"
        description="Get in touch with Sahil Jindal for collaborations, music production inquiries, or general contact."
        url="https://sahiljindal.com#connect"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Connect with Sahil Jindal"
        }}
      />
      <div
        id="connect"
        className="flex flex-wrap min-h-[92vh] justify-center md:pt-14"
      >
        <h1 className="flex w-full justify-center sticky top-1.5 md:hidden pt-5 text-4xl z-[1]">
          Connect
        </h1>
        <ConnectForm />
      </div>
    </>
  );
};

export default pageTransition(Connect);
