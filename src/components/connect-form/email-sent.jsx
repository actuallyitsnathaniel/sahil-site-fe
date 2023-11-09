import { PropTypes } from "prop-types";

export const EmailSent = (props) => {
  return (
    <div className="flex justify-center text-3xl text-center max-h-screen">
      Email Sent! Thanks for connecting, {props.firstName}.
    </div>
  );
};

EmailSent.propTypes = {
  firstName: PropTypes.string,
};
