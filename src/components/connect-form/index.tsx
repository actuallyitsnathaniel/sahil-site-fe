import { LegacyRef, MouseEvent as ReactMouseEvent, MouseEventHandler, useRef, useState } from "react";

import { capitalizeFirstLetter } from "../../utilities/util";
import { EmailSent } from "./email-sent";

export const ConnectForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");

  const form = useRef<HTMLFormElement>(null);

  const inputStyle =
    "flex mx-auto justify-between m-2 bg-opacity-20 rounded-md bg-white p-2 font-normal";

  const placeholderClasses =
    "placeholder:text-gray-400 placeholder:font-normal";

  const focusClasses = "focus-visible:outline-none focus:outline-white";

  const HandleSubmit = async (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");  // Clear any previous errors
    setIsSubmitting(true);

    if (firstName != "" && lastName != "" && email != "" && message != "") {
      try {
        const formData = new FormData(form.current!);

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          setIsSubmitting(false);
          setSubmitted(true);
        } else {
          console.error("Web3Forms submission failed:", data);
          setIsSubmitting(false);
          setError("Failed to send message. Please try again or contact me directly.");
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setIsSubmitting(false);
        setError("Failed to send message. Please try again or contact me directly.");
      }
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
    <div className="flex flex-col items-center py-30">
      {!isSubmitting && !submitted ? (
        <form
          ref={form as LegacyRef<HTMLFormElement> | undefined}
          id="connect-form"
          className="flex flex-col items-center md:my-auto"
        >
          {/* Web3Forms required fields */}
          <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />
          <input type="hidden" name="subject" value="New Contact Form Submission from sahiljindal.com" />
          <input type="hidden" name="from_name" value="Sahil Jindal Portfolio" />
          {/* Honeypot spam protection - hidden from users */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: 'none' }}
          />

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
              onClick={(e) => HandleSubmit(e)}
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
        <div className="flex flex-row md:my-auto">
          <span className="flex text-3xl">
            Submitting... <p className="animate-bounce px-5">📧</p>
          </span>
        </div>
      )}
      {error && (
        <div className="flex flex-col md:my-auto">
          <p className="text-red-400 text-center p-4">{error}</p>
        </div>
      )}
    </div>
  );
};
