import AudioPlayer from "../components/audio-track-player";

// import berryFields from "/src/assets/audio/berry-fields.mp3";
import captainsLog from "/src/assets/audio/captains-log.mp3";
import dadsMessages from "/src/assets/audio/dads-messages.mp3";
import aStoryAtSea from "../assets/audio/a-story-at-sea.mp3";
import buddingRomance from "../assets/audio/budding-romance.mp3";
import circuitryOverload from "../assets/audio/circuitry-overload.mp3";
import dangerousCarChase from "../assets/audio/dangerous-car-chase.mp3";
// import endCreditsAcademyGold from "../assets/audio/end-credits-academy-gold.mp3";
import endCreditsPrisonerOfEarth from "../assets/audio/end-credits-prisoner-of-earth.mp3";
import farusComesHome from "../assets/audio/farus-comes-home.mp3";
// import imNotDumb from "../assets/audio/i'm-not-dumb.mp3";
// import justFriendsIThink from "../assets/audio/just-friends-i-think.mp3";
import loveAndLoss from "../assets/audio/love-and-loss.mp3";
import mainTitleAcademyGold from "../assets/audio/main-title-academy-gold.mp3";
import maintitlePrisonerOfEarth from "../assets/audio/main-title-prisoner-of-earth.mp3";
import monstersInTheClost from "../assets/audio/monsters-in-the-closet.mp3";
// import rememberingDeath from "../assets/audio/remembering-death.mp3";
import solaceInSolitude from "../assets/audio/solace-in-solitude.mp3";
// import theHunted from "../assets/audio/the-hunted.mp3";
import theWoods from "/src/assets/audio/the-woods.mp3";
import tribbles from "../assets/audio/tribbles.mp3";
// import underYourCommand from "../assets/audio/under-your-command.mp3";
// import visitingLondon from "../assets/audio/visiting-london.mp3";
import stellarReverie from "../assets/audio/stellar-reverie.mp3";
import voila from "../assets/audio/voila.mp3";
import noTheyDont from "../assets/audio/no-they-dont.wav";
import supermanDoesntSteal from "../assets/audio/superman-doesnt-steal-WIP-oct-17.mp3";
import reminiscence from "../assets/audio/Reminiscence.mp3";

const Music = () => {
  return (
    <div
      id="music"
      className="flex flex-col w-full items-center flex-wrap min-h-screen md:pt-14"
    >
      <h2 className="sticky top-1.5 md:hidden py-5 text-4xl text-center">
        Music
      </h2>
      {/* TODO: top left, have play/pause feature */}
      <AudioPlayer>
        <AudioPlayer.Track
          src={maintitlePrisonerOfEarth}
          title="Main Title"
          film="Prisoner of Earth"
        />
        <AudioPlayer.Track
          src={aStoryAtSea}
          title="A Story at Sea"
          film="Dear Watsonville"
        />
        <AudioPlayer.Track
          src={circuitryOverload}
          title="Circuitry Overload"
          film="Star Trek"
        />
        <AudioPlayer.Track
          src={dadsMessages}
          title="Dad's Messages"
          film="Wrong Side Up"
        />
        <AudioPlayer.Track
          src={theWoods}
          title="The Woods"
          film="Superman Doesn't Steal"
        />
        <AudioPlayer.Track
          src={captainsLog}
          title="Captain's Log"
          film="Star Trek"
        />
        <AudioPlayer.Track
          src={supermanDoesntSteal}
          title="Superman Doesn't Steal"
          film="Superman Doesn't Steal"
        />
        <AudioPlayer.Track
          src={reminiscence}
          title="Reminiscence"
          film="Back to the Source"
        />
        <AudioPlayer.Track
          src={dangerousCarChase}
          title="Dangerous Car Chase"
        />
        <AudioPlayer.Track
          src={mainTitleAcademyGold}
          title="Main Title"
          film="Academy Gold"
        />
        <AudioPlayer.Track src={voila} title="Voilá!" film="Disney's Voilá!" />
        <AudioPlayer.Track
          src={noTheyDont}
          title="No They Don't"
          film="Star Trek"
        />
        <AudioPlayer.Track
          src={loveAndLoss}
          title="Love and Loss"
          film="Prisoner of Earth"
        />
        <AudioPlayer.Track
          src={monstersInTheClost}
          title="Monsters in the Closet"
        />
        <AudioPlayer.Track src={solaceInSolitude} title="Solace in Solitude" />
        <AudioPlayer.Track src={tribbles} title="Tribbles" film="Star Trek" />
        <AudioPlayer.Track src={buddingRomance} title="Budding Romance" />
        <AudioPlayer.Track
          src={farusComesHome}
          title="Farus Comes Home"
          film="Prisoner of Earth"
        />
        <AudioPlayer.Track
          src={endCreditsPrisonerOfEarth}
          title="End Credits"
          film="Prisoner of Earth"
        />
        <AudioPlayer.Track src={stellarReverie} title="Stellar Reverie" />
      </AudioPlayer>
    </div>
  );
};

export default Music;
