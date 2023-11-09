export const ConnectForm = () => {
  const inputStyle =
    "flex mx-auto m-2 bg-opacity-20 rounded-md bg-white px-3 py-2";
  const placeholderClasses =
    "placeholder:text-gray-400 placeholder:font-normal";
  const focusClasses = "focus-visible:outline-none focus:outline-white";

  return (
    <form id="connect-form" className="flex flex-wrap flex-col min-h-full">
      <h2 className="text-4xl p-6 text-center">Let&apos;s Make Something</h2>
      <div id="input-wrapper" className="flex flex-col justify-items-center">
        <div>
          <input
            type="text"
            className={`${inputStyle} ${focusClasses} ${placeholderClasses}`}
            placeholder="first name"
          />
        </div>
        <div>
          <input
            type="text"
            className={`${inputStyle} ${focusClasses} ${placeholderClasses}`}
            placeholder="last name"
          />
        </div>
        <div>
          <input
            type="email"
            className={`${inputStyle} ${focusClasses} ${placeholderClasses}`}
            placeholder="email"
          />
        </div>
      </div>
      <button
        type="submit"
        className="flex font-semibold px-5 py-3 m-5 mx-auto rounded-lg outline outline-2 outline-white opacity-25"
      >
        Submit
      </button>
    </form>
  );
};
