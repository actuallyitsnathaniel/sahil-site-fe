import { ConnectForm } from "../components/connect-form";

const Connect = () => {
  return (
    <div
      id="connect"
      className="flex flex-wrap flex-row h-[90vh] my-auto justify-center md:pt-14"
    >
      <h2 className="sticky top-1.5 md:hidden py-5 text-4xl text-center">
        Connect
      </h2>
      <div className="md:flex">
        <ConnectForm />
      </div>
    </div>
  );
};

export default Connect;
