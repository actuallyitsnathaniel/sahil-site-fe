import { CreditedWork } from "../components/credited-work";

// Composer
import academyGoldSound from "../assets/images/academy-gold-sound.png";
import starTrekShortTreks from "../assets/images/star-trek-short-treks.jpeg";
// eslint-disable-next-line no-unused-vars
import placeholder from "../assets/images/placeholder.png";
import prisonerOfEarth from "../assets/images/prisoner-of-earth.jpeg";
import voila from "../assets/images/voila.jpeg";
import sunnyfieldKids from "../assets/images/sunnyfield-kids.png";
import wolves from "../assets/images/wolves.jpeg";
import ageIsAKiller from "../assets/images/age-is-a-killer.jpeg";
import lastSummer from "../assets/images/last-summer.jpeg";
import theMotherOfAllFlowers from "../assets/images/the-mother-of-all-flowers.jpg";

// Music Department
import bridgerton from "../assets/images/bridgerton.png";
import dmz from "../assets/images/dmz.jpg";
import chevalier from "../assets/images/chevalier.png";
import inventingAnna from "../assets/images/inventing-anna.png";
import pasosDeValor from "../assets/images/pasos-de-valor.png";
import tinderbox from "../assets/images/tinderbox.png";

const Credits = () => {
  return (
    <div
      id="credits"
      className="flex flex-wrap max-w-screen min-h-screen justify-center"
    >
      <h2 className="p-5 text-4xl text-center">Credits</h2>
      <div id="composer">
        <h3 className="text-3xl text-center">Composer (Selection)</h3>
        <div className="flex flex-wrap flex-row justify-center">
          <CreditedWork
            artwork={academyGoldSound}
            title={"Academy Gold (Documentary Series)"}
            alt={"academy-gold"}
          />
          <CreditedWork
            artwork={starTrekShortTreks}
            title={"Star Trek: Short Treks (TV Episode)"}
            alt={"star-trek-short-treks"}
          />
          <CreditedWork
            artwork={prisonerOfEarth}
            title={"Prisoner of Earth (TV Episode)"}
            alt={"prisoner-of-earth-TV"}
          />
          <CreditedWork
            artwork={voila}
            title={"Voilá! (Disney Short)"}
            alt={"voila-disney-short"}
          />
          <CreditedWork
            artwork={sunnyfieldKids}
            title={"Sunnyfield Kids (Feature Film - Upcoming)"}
            alt={"sunnyfield-kids-feature-film"}
          />
          <CreditedWork
            artwork={wolves}
            title={"Wolves (Short)"}
            alt={"wolves-short"}
          />
          <CreditedWork
            artwork={ageIsAKiller}
            title={"Age Is a Killer (Short)"}
            alt={"age-is-a-killer-short"}
          />
          <CreditedWork
            artwork={lastSummer}
            title={"Last Summer (Short)"}
            alt={"last-summer-short"}
          />
          <CreditedWork
            artwork={theMotherOfAllFlowers}
            title={"The Mother of All Flowers (Short)"}
            alt={"mother-of-all-flowers-short"}
          />
        </div>
      </div>
      <div>
        <h3 className="text-3xl text-center">Music Department</h3>
        <div className="flex flex-wrap flex-row justify-center">
          <CreditedWork
            artwork={bridgerton}
            title={"Bridgerton Season 2 (TV Series)"}
            alt={"bridgerton-s2"}
          />
          <CreditedWork
            artwork={dmz}
            title={"DMZ (TV Miniseries)"}
            alt={"dmz-tv-miniseries"}
          />
          <CreditedWork
            artwork={chevalier}
            title={"Chevalier (Feature Film)"}
            alt={"chevalier-tv-miniseries"}
          />
          <CreditedWork
            artwork={inventingAnna}
            title={"Inventing Anna (TV Series)"}
            alt={"inventing-anna-tv-miniseries"}
          />
          <CreditedWork
            artwork={pasosDeValor}
            title={"Pasos de Valor (Short)"}
            alt={"pasos-de-valor-short"}
          />
          <CreditedWork
            artwork={tinderbox}
            title={"Tinderbox (Short)"}
            alt={"tinderbox-short"}
          />
        </div>
      </div>
    </div>
  );
};

export default Credits;
