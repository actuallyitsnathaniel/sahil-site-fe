import { useState } from "react";
import { EmailSent } from "./email-sent";

export const ConnectForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputStyle =
    "flex mx-auto m-2 bg-opacity-20 rounded-md bg-white px-3 py-2 font-normal";
  const placeholderClasses =
    "placeholder:text-gray-400 placeholder:font-normal";
  const focusClasses = "focus-visible:outline-none focus:outline-white";

  const HandleSubmit = (e) => {
    console.log("handleSubmit ran");
    e.preventDefault();
    if (firstName != "" && lastName != "" && email != "") {
      setSubmitted(true);
    }
  };

  const HandleDisabled = () => {
    if (!submitted) {
      if (firstName != "" && lastName != "" && email != "") {
        return false;
      }
    }
    return true;
  };

  return (
    <form id="connect-form" className="flex flex-wrap flex-col max-h-3/4">
      {!submitted ? (
        <div id="input-wrapper" className="flex flex-col justify-items-center">
          <h2 className="text-4xl p-6 text-center">
            Let&apos;s Make Something
          </h2>
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
