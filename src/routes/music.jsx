import { AudioTrackPlayer } from "../components/audio-track-player";
import aStoryAtSea from "../assets/audio/a-story-at-sea.mp3";
import buddingRomance from "../assets/audio/budding-romance.mp3";
import cinematography from "../assets/audio/cinematography.mp3";
import circuitryOverload from "../assets/audio/circuitry-overload.mp3";
import dangerousCarChase from "../assets/audio/dangerous-car-chase.mp3";
import deadlines from "../assets/audio/deadlines.mp3";
import endCreditsAcademyGold from "../assets/audio/end-credits-academy-gold.mp3";
import endCreditsPrisonerOfEarth from "../assets/audio/end-credits-prisoner-of-earth.mp3";
import farusComesHome from "../assets/audio/farus-comes-home.mp3";
import imNotDumb from "../assets/audio/i'm-not-dumb.mp3";
import justFriendsIThink from "../assets/audio/just-friends-i-think.mp3";
import loveAndLoss from "../assets/audio/love-and-loss.mp3";
import mainTitleAcademyGold from "../assets/audio/main-title-academy-gold.mp3";
import maintitlePrisonerOfEarth from "../assets/audio/main-title-prisoner-of-earth.mp3";
import monstersInTheClost from "../assets/audio/monsters-in-the-closet.mp3";
import rememberingDeath from "../assets/audio/remembering-death.mp3";
import solaceInSolitude from "../assets/audio/solace-in-solitude.mp3";
import theHunted from "../assets/audio/the-hunted.mp3";
import tribbles from "../assets/audio/tribbles.mp3";
import underYourCommand from "../assets/audio/under-your-command.mp3";
import visitingLondon from "../assets/audio/visiting-london.mp3";
import voila from "../assets/audio/voila.mp3";

const Music = () => {
  return (
    <div
      id="music"
      className="flex flex-wrap max-w-screen min-h-screen justify-center overflow-clip"
    >
      <h2 className="p-5 text-4xl text-center">Music</h2>
      <div className="flex flex-wrap justify-center">
        <AudioTrackPlayer src={aStoryAtSea} title="A Story at Sea" />
        <AudioTrackPlayer src={buddingRomance} title="Budding Romance" />
        <AudioTrackPlayer src={cinematography} title="Cinematography" />
        <AudioTrackPlayer src={circuitryOverload} title="Circuitry Overload" />
        <AudioTrackPlayer src={dangerousCarChase} title="Dangerous Car Chase" />
        <AudioTrackPlayer src={deadlines} title="Deadlines" />
        <AudioTrackPlayer
          src={endCreditsAcademyGold}
          title="End Credits (Academy Gold)"
        />
        <AudioTrackPlayer
          src={endCreditsPrisonerOfEarth}
          title="End Credits (Prisoner of Earth)"
        />
        <AudioTrackPlayer src={farusComesHome} title="Farus Comes Home" />
        <AudioTrackPlayer src={imNotDumb} title="I'm Not Dumb" />
        <AudioTrackPlayer
          src={justFriendsIThink}
          title="Just Friends... I Think"
        />
        <AudioTrackPlayer src={loveAndLoss} title="Love and Loss" />
        <AudioTrackPlayer
          src={mainTitleAcademyGold}
          title="Main Title (Academy Gold)"
        />
        <AudioTrackPlayer
          src={maintitlePrisonerOfEarth}
          title="Main Title (Prisoner of Earth)"
        />
        <AudioTrackPlayer
          src={monstersInTheClost}
          title="Monsters in the Closet"
        />
        <AudioTrackPlayer src={rememberingDeath} title="Remembering Death" />
        <AudioTrackPlayer src={solaceInSolitude} title="Solace in Solitude" />
        <AudioTrackPlayer src={theHunted} title="The Hunted" />
        <AudioTrackPlayer src={tribbles} title="Tribbles" />
        <AudioTrackPlayer src={underYourCommand} title="Under Your Command" />
        <AudioTrackPlayer src={visitingLondon} title="Visiting London" />
        <AudioTrackPlayer src={voila} title="Voilá!" />
      </div>
    </div>
  );
};

export default Music;
