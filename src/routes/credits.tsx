import { CreditedWork } from "../components/credited-work";

// eslint-disable-next-line no-unused-vars
import placeholder from "../assets/images/placeholder.png";

// Composer
import dearWatsonville from "/src/assets/images/dear-watsonville.jpg";
import backToTheSource from "/src/assets/images/back-to-the-source.jpeg";
import unitedInGrief from "../assets/images/united-in-grief.jpeg";
import whosTexting from "../assets/images/whos-texting.jpeg";
import academyGoldSound from "../assets/images/academy-gold-sound.png";
import starTrekShortTreks from "../assets/images/star-trek-short-treks.jpeg";
import supermanDoesntSteal from "../assets/images/superman-doesnt-steal.jpeg";
import goldDigger from "../assets/images/gold-digger-poster-landscape.jpg";
import prisonerOfEarth from "../assets/images/prisoner-of-earth.jpeg";
import voila from "../assets/images/voila.jpeg";
import sunnyfieldKids from "../assets/images/sunnyfield-kids.png";
import wolves from "../assets/images/wolves.jpeg";
import ageIsAKiller from "../assets/images/age-is-a-killer.jpeg";
import lastSummer from "../assets/images/last-summer.jpeg";
import theMotherOfAllFlowers from "../assets/images/the-mother-of-all-flowers.jpg";

// Music Department
import theWildRobot from "../assets/images/the-wild-robot.jpg";
import secretInvasion from "../assets/images/secret-invasion.jpeg";
import theColorPurple from "../assets/images/the-color-purple.jpg";
import origin from "../assets/images/origin.jpeg";
import lastRepairShop from "../assets/images/the-last-repair-shop.jpeg";
import disneyHauntedMansion from "../assets/images/disney-haunted-mansion.jpeg";
import netflixQueenCharlotte from "../assets/images/netflix-queen-charlotte.jpeg";
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
      className="flex flex-wrap min-h-screen justify-center md:pt-14"
    >
      <h2 className="sticky md:hidden top-1.5 py-5 text-4xl text-center">
        Credits
      </h2>
      <div id="composer">
        <h3 className="text-3xl text-center">Composer (Selection)</h3>
        <div className="flex flex-wrap flex-row justify-center">
          <CreditedWork
            artwork={dearWatsonville}
            title={"Dear Watsonville (Short)"}
            alt={"dear-watsonville"}
          />
          <CreditedWork
            artwork={backToTheSource}
            title={"Back To the Source (Short)"}
            alt={"back-to-the-source"}
          />
          <CreditedWork
            artwork={supermanDoesntSteal}
            title={"Superman Doesn't Steal (Short)"}
            alt={"superman-doesnt-steal"}
          />
          <CreditedWork
            artwork={goldDigger}
            title={"Gold Digger"}
            alt="gold-digger"
          />
          <CreditedWork
            artwork={unitedInGrief}
            title={"United in Grief (Short)"}
            alt={"united-in-grief-short"}
          />
          <CreditedWork
            artwork={whosTexting}
            title={"Who's Texting the Group Chat? (Short)"}
            alt={"whos-texting-the-gc-short"}
          />
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
      <div id="music-dept">
        <h3 className="text-3xl text-center">Music Department</h3>
        <div className="flex flex-wrap flex-row justify-center gap-x-3">
          <CreditedWork
            artwork={theWildRobot}
            title="Dreamworks: The Wild Robot (Feature Film)"
            alt={"dreamworks-the-wild-robot"}
          />
          <CreditedWork
            artwork={secretInvasion}
            title={"Marvel Studios: Secret Invasion (TV Series)"}
            alt={"marvel-studios-secret-invasion"}
          />
          <CreditedWork
            artwork={theColorPurple}
            title={"The Color Purple"}
            alt={"the-color-purple"}
          />
          <CreditedWork
            artwork={origin}
            title={"Origin (Feature Film)"}
            alt={"origin-film"}
          />
          <CreditedWork
            artwork={lastRepairShop}
            title={"The Last Repair Shop (Documentary Short)"}
            alt={"the-last-repair-shop-documentary"}
          />
          <CreditedWork
            artwork={disneyHauntedMansion}
            title={"Disney's Haunted Mansion (Feature Film)"}
            alt={"disney-haunted-mansion-film"}
          />
          <CreditedWork
            artwork={netflixQueenCharlotte}
            title={
              "Netflix's Queen Charlotte: A Bridgerton Story (Limited Series)"
            }
            alt="netflix-queen-charlotte-bridgerton-limited-series"
          />
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
