import { useState } from "react";
import { EmailSent } from "./email-sent";

export const ConnectForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputStyle =
    "flex mx-auto justify-between m-2 bg-opacity-20 rounded-md bg-white p-2 font-normal";
  const placeholderClasses =
    "placeholder:text-gray-400 placeholder:font-normal";
  const focusClasses = "focus-visible:outline-none focus:outline-white";

  const HandleSubmit = (e) => {
    console.log("handleSubmit ran");
    e.preventDefault();
    if (firstName != "" && lastName != "" && email != "" && message != "") {
      setSubmitted(true);
    }
  };

  const HandleDisabled = () => {
    if (!submitted) {
      if (firstName != "" && lastName != "" && email != "" && message != "") {
        return false;
      }
    }
    return true;
  };

  return (
    <form id="connect-form" className="flex flex-wrap flex-row items-center">
      {!submitted ? (
        <div id="input-wrapper" className="flex flex-col justify-items-center">
          <h2 className="text-4xl p-6 text-center">
            Let&apos;s Make Something
          </h2>
          <div className="md:flex md:flex-row md:space-x-4">
            <input
              type="text"
              id="input-firstName"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className={`${inputStyle} ${focusClasses} ${placeholderClasses}`}
              placeholder="first name"
            />
            <input
              type="text"
              id="input-lastName"
              className={`${inputStyle} ${focusClasses} ${placeholderClasses}`}
              placeholder="last name"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <input
              type="email"
              id="input-email"
              className={`${inputStyle} ${focusClasses} ${placeholderClasses}`}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <input
            type="text"
            id="message"
            className={`${inputStyle} ${focusClasses} ${placeholderClasses} pb-28 md:w-full`}
            placeholder="message"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            type="submit"
            disabled={HandleDisabled()}
            onClick={HandleSubmit}
            className={
              "flex font-semibold px-5 py-3 m-5 mx-auto rounded-lg outline outline-2 outline-white disabled:opacity-25"
            }
          >
            Submit
          </button>
        </div>
      ) : (
        <EmailSent firstName={firstName} />
      )}
    </form>
  );
};
