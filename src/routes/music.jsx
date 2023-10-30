import { AudioTrackItem } from "../components/audio-track-player";
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
      className="flex flex-wrap w-screen min-h-screen justify-center"
    >
      <h2 className="p-5 text-4xl text-center">Music</h2>
      <div className="flex flex-wrap justify-center">
        <AudioTrackItem
          src={aStoryAtSea}
          title="A Story at Sea"
          film="Dear Watsonville"
        />
        <AudioTrackItem
          src={maintitlePrisonerOfEarth}
          title="Main Title"
          film="Prisoner of Earth"
        />
        <AudioTrackItem
          src={circuitryOverload}
          title="Circuitry Overload"
          film="Star Trek"
        />
        <AudioTrackItem src={dangerousCarChase} title="Dangerous Car Chase" />
        <AudioTrackItem
          src={mainTitleAcademyGold}
          title="Main Title"
          film="Academy Gold"
        />
        <AudioTrackItem src={voila} title="Voilá!" film="Disney's Voilá!" />
        <AudioTrackItem
          src={loveAndLoss}
          title="Love and Loss"
          film="Prisoner of Earth"
        />
        <AudioTrackItem
          src={monstersInTheClost}
          title="Monsters in the Closet"
        />
        <AudioTrackItem
          src={rememberingDeath}
          title="Remembering Death"
          film="Prisoner of Earth"
        />
        <AudioTrackItem src={solaceInSolitude} title="Solace in Solitude" />
        <AudioTrackItem
          src={underYourCommand}
          title="Under Your Command"
          film="Star Trek"
        />
        <AudioTrackItem src={tribbles} title="Tribbles" film="Star Trek" />
        <AudioTrackItem src={buddingRomance} title="Budding Romance" />
        <AudioTrackItem
          src={farusComesHome}
          title="Farus Comes Home"
          film="Prisoner of Earth"
        />
        <AudioTrackItem
          src={imNotDumb}
          title="I'm Not Dumb"
          film="Stark Trek"
        />
        <AudioTrackItem
          src={endCreditsPrisonerOfEarth}
          title="End Credits"
          film="Prisoner of Earth"
        />
        <AudioTrackItem
          src={cinematography}
          title="Cinematography"
          film="Academy Gold"
        />
        <AudioTrackItem src={deadlines} title="Deadlines" film="Academy Gold" />
        <AudioTrackItem
          src={endCreditsAcademyGold}
          title="End Credits"
          film="Academy Gold"
        />
        <AudioTrackItem
          src={visitingLondon}
          title="Visiting London"
          film="Academy Gold"
        />
        <AudioTrackItem src={theHunted} title="The Hunted" />
        <AudioTrackItem
          src={justFriendsIThink}
          title="Just Friends... I Think"
        />
      </div>
    </div>
  );
};

export default Music;
