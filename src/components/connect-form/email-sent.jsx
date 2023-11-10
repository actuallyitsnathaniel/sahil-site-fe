import { PropTypes } from "prop-types";

export const EmailSent = (props) => {
  return (
    <div className="flex justify-center text-3xl text-center max-h-screen">
      Thanks for connecting,&#xa0;
      <span className="first-letter:uppercase">{props.firstName}</span>.
      I&apos;ll reach out soon!
    </div>
  );
};

EmailSent.propTypes = {
  firstName: PropTypes.string,
};
