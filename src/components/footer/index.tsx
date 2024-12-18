const Footer = () => {
  return (
    <footer className="w-full justify-center flex flex-wrap text-white text-center p-3">
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
