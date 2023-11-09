import { ConnectForm } from "../components/connect-form";

const Connect = () => {
  return (
    <div
      id="connect"
      className="flex flex-wrap h-screen justify-center md:pt-16"
    >
      <h2 className="sticky top-1.5 md:hidden py-5 text-4xl text-center">
        Connect
      </h2>
      <div className="flex align-middle">
        <ConnectForm />
      </div>
    </div>
  );
};

export default Connect;
