const Footer = () => {
  return (
    <footer className="flex flex-wrap bg-black text-white text-center justify-center items-center p-3 h-24">
      <p className="grid md:text-md">
        Copyright © {new Date().getFullYear()} Sahil Jindal
        <p>
          powered by{" "}
          <a
            className="underline underline-offset-8 "
            href="mailto:nathanielrbowman@gmail.com"
          >
            nathaniel bowman
          </a>
        </p>
      </p>
    </footer>
  );
};

export default Footer;
