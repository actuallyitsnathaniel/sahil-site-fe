import { ConnectForm } from "../components/connect-form";

const Connect = () => {
  return (
    <div
      id="connect"
      className="flex flex-wrap flex-row w-screen h-screen justify-center md:pt-16"
    >
      <h2 className="p-5 text-4xl text-center w-screen">Connect</h2>
      <div className="flex align-middle">
        <ConnectForm />
      </div>
    </div>
  );
};

export default Connect;
