import { ConnectForm } from "../components/connect-form";

const Connect = () => {
  return (
    <div
      id="connect"
      className="flex flex-wrap flex-col h-[90vh] justify-center md:pt-14"
    >
      <h2 className="sticky top-1.5 md:hidden py-5 text-4xl text-center">
        Connect
      </h2>
      <div className="flex align-middle mx-auto">
        <ConnectForm />
      </div>
    </div>
  );
};

export default Connect;
