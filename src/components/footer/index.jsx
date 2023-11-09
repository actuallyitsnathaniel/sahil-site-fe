const Footer = () => {
  return (
    <footer className="flex flex-wrap text-white text-center justify-center items-center p-3">
      <p className="grid md:text-md">
        Copyright © {new Date().getFullYear()} Sahil Jindal, powered by{" "}
        <a
          className="underline underline-offset-4"
          href="mailto:nathanielrbowman@gmail.com"
        >
          nathaniel bowman
        </a>
      </p>
    </footer>
  );
};

export default Footer;
