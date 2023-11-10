import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { capitalizeFirstLetter } from "../../utilities/util";
import { EmailSent } from "./email-sent";

export const ConnectForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useRef();

  const inputStyle =
    "flex mx-auto justify-between m-2 bg-opacity-20 rounded-md bg-white p-2 font-normal";

  const placeholderClasses =
    "placeholder:text-gray-400 placeholder:font-normal";

  const focusClasses = "focus-visible:outline-none focus:outline-white";

  const HandleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (firstName != "" && lastName != "" && email != "" && message != "") {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          form.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
            setIsSubmitting(false);
            setSubmitted(true);
          },
          (error) => {
            console.log(error.text);
          }
        );
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
    <div className="flex flex-wrap flex-row align-middle py-30">
      {!isSubmitting ? (
        <form
          ref={form}
          id="connect-form"
          className="flex flex-col items-center md:my-auto"
        >
          <h2 className="text-4xl p-6 text-center">
            Let&apos;s Make Something
          </h2>
          <div id="input-wrapper" className="justify-items-center">
            <div className="md:flex md:flex-row md:space-x-4">
              <input
                type="text"
                id="input-firstName"
                name="user_first_name"
                className={`${inputStyle} ${focusClasses} ${placeholderClasses}`}
                placeholder="first name"
                onChange={(e) => {
                  setFirstName(capitalizeFirstLetter(e.target.value));
                }}
              />
              <input
                type="text"
                id="input-lastName"
                name="user_last_name"
                className={`${inputStyle} ${focusClasses} ${placeholderClasses}`}
                placeholder="last name"
                onChange={(e) => {
                  setLastName(capitalizeFirstLetter(e.target.value));
                }}
              />
              <input
                type="email"
                id="input-email"
                name="user_email"
                className={`${inputStyle} ${focusClasses} ${placeholderClasses}`}
                placeholder="email@mail.com"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <textarea
              id="message"
              name="user_message"
              className={`${inputStyle} ${focusClasses} ${placeholderClasses} pb-28 md:w-full`}
              placeholder="message"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button
              type="submit"
              className={
                "flex transition duration-75 font-semibold px-5 py-3 m-5 mx-auto rounded-lg outline outline-2 outline-white disabled:opacity-25 hover:enabled:-translate-y-1 hover:enabled:bg-gray-400 hover:enabled:bg-opacity-30 hover:enabled:outline-none"
              }
              disabled={HandleDisabled()}
              onClick={HandleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      ) : submitted ? (
        <div className="flex flex-col md:my-auto">
          <EmailSent firstName={firstName} />
        </div>
      ) : (
        <div className="flex flex-col md:my-auto">
          <span>
            Submitting... <p className="animate-bounce">📧</p>
          </span>
        </div>
      )}
    </div>
  );
};
