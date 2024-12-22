import { ConnectForm } from "../components/connect-form";

const Connect = () => {
  return (
    <div
      id="connect"
      className="flex flex-wrap min-h-[92vh] justify-center md:pt-14"
    >
      <h2 className="flex w-full justify-center sticky top-1.5 md:hidden pt-5 text-4xl z-[1]">
        Connect
      </h2>
      <ConnectForm />
    </div>
  );
};

export default Connect;
