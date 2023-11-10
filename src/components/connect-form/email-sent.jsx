import { PropTypes } from "prop-types";

export const EmailSent = (props) => {
  return (
    <div className="flex flex-col text-3xl text-center">
      <p>
        Thanks for connecting,&#xa0;
        {props.firstName}.&#xa0;I&apos;ll reach out soon!
      </p>
    </div>
  );
};

EmailSent.propTypes = {
  firstName: PropTypes.string,
};
