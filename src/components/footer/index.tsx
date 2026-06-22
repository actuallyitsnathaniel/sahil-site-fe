import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full justify-center flex flex-col items-center gap-3 text-white text-center p-3">
      <p className="max-w-2xl text-sm text-white/80">
        Sahil Jindal&apos;s music — and the work of his collaborators — is not
        licensed for AI or machine-learning training. Any violation of this
        policy will be pursued to the fullest extent of the law.{" "}
        <Link className="link" to="/usage-and-ai-policy">
          Usage &amp; AI Policy
        </Link>
      </p>
      <p className="grid md:text-md">
        Copyright © {new Date().getFullYear()} Sahil Jindal, powered by&nbsp;
        <a
          className="underline underline-offset-4"
          href="https://dev.actuallyitsnathaniel.com"
          target="_blank"
          rel="noreferrer"
        >
          nathaniel bowman
        </a>
      </p>
    </footer>
  );
};

export default Footer;
