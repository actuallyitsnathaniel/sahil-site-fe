import { useEffect, useRef, useState } from "react";

import { FloatingPlayPauseButton } from "./playback";
import UnifiedPlayer from "./unified-player";
import TrackList from "./track-list";
import DownloadDropdown from "./download-dropdown";

export type AudioTrackType = {
  audioTrack: { url: string };
  trackSource: string;
  trackTitle: string;
};

const AudioPlayer = ({ children }: { children: AudioTrackType[] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(-1);
  const [duration, setDuration] = useState(0);
  const [isStuck, setIsStuck] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadScope, setDownloadScope] = useState<"above" | "selected">("above");
  const [selectedTracks, setSelectedTracks] = useState<Set<number>>(new Set());

  // Selection circles only make sense — and should only commandeer row clicks —
  // while the user is actively configuring a download with "Selected Tracks"
  // chosen. The instant the dropdown closes, the list must revert to its
  // primary purpose (playback); otherwise the list gets permanently stuck in
  // "pick tracks" mode with no way back to playing music.
  const selectionMode = isDownloadOpen && downloadScope === "selected";

  const toggleTrackSelection = (index: number) => {
    setSelectedTracks((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const audioRef = useRef<HTMLAudioElement>(null);
  const stickySentinelRef = useRef<HTMLDivElement>(null);

  // `position: sticky` exposes no "am I currently pinned?" state directly, but
  // it can be detected with a zero-height sentinel placed immediately before
  // the sticky element: once that sentinel scrolls past the viewport's top
  // edge (intersectionRatio drops to 0 with a `top` rootMargin), the sticky
  // element has just become pinned — and the reverse when it scrolls back in.
  useEffect(() => {
    const sentinel = stickySentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-1px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Centralized load/play orchestration: assigning `src` here keeps `HandlePlayback`
  // a thin "intent" dispatcher regardless of which UI triggered the track change.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentTrack === -1) return;

    audio.src = children[currentTrack].audioTrack.url;
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  }, [currentTrack, children]);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="flex flex-col w-full sm:max-w-3xl mx-auto gap-8">
      <audio
        ref={audioRef}
        preload="none"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />

      <FloatingPlayPauseButton
        {...{ isPlaying, setIsPlaying, currentTrack, setCurrentTrack, audioRef }}
      />

      {/* Relative bounds for the sticky player: it stacks under the nav/title
          and releases once this container's bottom edge scrolls past it,
          while the player card is pushed down with padding to clear the
          nav/title height and sit visibly beneath it.

          The "clipping window" effect: a single `absolute inset-0` gradient
          panel, clipped by ONE `overflow-hidden` shape spanning both the
          strip behind the nav/title and the card, occludes the track list
          as it scrolls underneath — a seamless cutout rather than a
          translucent fade-through.

          That cutout panel only needs to exist while the player is actually
          pinned ("stuck") under the nav — that's the only moment something
          could otherwise be seen sliding behind the strip. The `isStuck`
          state (detected via the sentinel + IntersectionObserver above)
          drives a `transition-opacity` so the panel fades in exactly as the
          player sticks, and fades back out as it releases — rather than
          being permanently present (which read as a static rectangle even
          when nothing needed hiding) or popping in/out abruptly. */}
      <div className="relative flex flex-col w-full gap-8">
        <div ref={stickySentinelRef} className="h-0" />
        <div className="sticky top-0 z-[1] pt-20 sm:pt-16 md:pt-24 pb-6">
          {/* Mobile cutout: spans the full strip (the padding above the card included)
              so the gradient occludes the track list sliding behind the nav/title —
              see the comment above this section for the full rationale. Hidden on
              desktop, where the card never slides under a sticky nav and this larger
              shape would otherwise bleed its gradient above the card's own border. */}
          <div
            className={`absolute inset-x-0 top-0 bottom-6 rounded-b-md overflow-hidden transition-opacity duration-500 md:hidden ${
              isStuck ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-900 via-emerald-800 to-emerald-700" />
          </div>
          <div className="relative rounded-md overflow-hidden">
            {/* Desktop background: the same gradient, but clipped to the card's own
                rounded bounds rather than the wider mobile cutout shape. */}
            <span className="hidden md:block pointer-events-none absolute inset-0 bg-gradient-to-tr from-cyan-900 via-emerald-800 to-emerald-700" />
            <div className="relative">
              <UnifiedPlayer
                track={currentTrack === -1 ? null : children[currentTrack]}
                {...{ duration, audioRef }}
              />
            </div>
          </div>
        </div>

        <TrackList
          tracks={children}
          {...{
            currentTrack,
            setCurrentTrack,
            isPlaying,
            setIsPlaying,
            audioRef,
            selectionMode,
            selectedTracks,
            toggleTrackSelection,
          }}
        />

        <DownloadDropdown
          tracks={children}
          {...{
            isDownloadOpen,
            setIsDownloadOpen,
            downloadScope,
            setDownloadScope,
            selectedTracks,
            setSelectedTracks,
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
