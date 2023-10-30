const AboutMe = () => {
  return (
    <div id="about-me" className="w-screen min-h-screen md:pt-16">
      <h2 className="p-5 flex justify-center text-4xl">About Me</h2>
      <p className="text-justify text-lg md:w-2/3 mx-auto p-6">
        I am a composer, music editor, and orchestrator with a specialization
        towards film and television. As a graduate from the Berklee College of
        Music, I enjoy the challenge of creating unique soundscapes that combine
        traditional orchestral scoring with contemporary, synthetic elements.
        <br />
        <br />
        My music can be heard across various projects for film & television,
        including the Emmy-nominated series{" "}
        <a
          className="underline"
          href="https://www.paramountplus.com/shows/star-trek-short-treks/video/zS2a7flzoQ4z_T_jkaJa_duNQ9jwDdW3/-the-trouble-with-edward-star-trek-short-treks/"
        >
          Star Trek: Short Treks
        </a>
        , and the Disney-animated short,{" "}
        <a
          className="underline"
          href="https://www.facebook.com/DisneyAnimationCareers/videos/voil%C3%A0-2018-summer-interns/1100926096733828/?extid=SEO----"
        >
          Voilá!
        </a>
        . Recently, I scored a 6-part documentary series produced by the Academy
        of Motion Picture Arts and Sciences.
        <br />
        <br />
        I am currently based in Los Angeles, CA, working for Emmy-winning
        composer Kris Bowers.
      </p>
    </div>
  );
};

export default AboutMe;
