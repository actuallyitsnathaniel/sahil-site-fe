import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";

const BAR_COUNT = 120;
const BAR_GAP_RATIO = 0.35;

const PLAYED_COLOR = "rgba(255, 255, 255, 0.87)";
const UNPLAYED_COLOR = "rgba(255, 255, 255, 0.25)";
const HOVER_COLOR = "rgba(255, 255, 255, 0.45)";

// "Generate" reveal: bars snap in left-to-right once decoding finishes.
// Each bar's own grow is short relative to the sweep spread, so only a
// narrow band of bars is mid-transition at once — they pop in distinctly
// one after another rather than the whole shape smoothly stretching.
const REVEAL_BAR_DURATION_MS = 180;
const REVEAL_SWEEP_MS = 900;
const REVEAL_OVERSHOOT = 1.18;

// Snappy overshoot: rises past 1, then settles back — reinforces the
// "popping into place" feel for each individual bar.
const easeOutBack = (t: number) => {
  if (t >= 1) return 1;
  if (t <= 0) return 0;
  const peak = REVEAL_OVERSHOOT;
  if (t < 0.6) {
    const p = t / 0.6;
    return peak * (1 - Math.pow(1 - p, 2));
  }
  const p = (t - 0.6) / 0.4;
  return peak + (1 - peak) * (1 - Math.pow(1 - p, 2));
};

const revealFactorForBar = (
  index: number,
  revealStart: number | null,
  now: number
) => {
  if (revealStart === null) return 1;

  const barStartDelay = (index / BAR_COUNT) * REVEAL_SWEEP_MS;
  const elapsed = now - revealStart - barStartDelay;
  if (elapsed <= 0) return 0;
  const rawProgress = Math.min(1, elapsed / REVEAL_BAR_DURATION_MS);
  return easeOutBack(rawProgress);
};

type AudioContextWindow = Window &
  typeof globalThis & { webkitAudioContext?: typeof AudioContext };

const getAudioContext = (ref: MutableRefObject<AudioContext | null>) => {
  if (!ref.current) {
    const Ctor =
      window.AudioContext || (window as AudioContextWindow).webkitAudioContext;
    if (Ctor) ref.current = new Ctor();
  }
  if (ref.current?.state === "suspended") {
    ref.current.resume();
  }
  return ref.current;
};

const computePeaks = (buffer: AudioBuffer): number[] => {
  const channel = buffer.getChannelData(0);
  const samplesPerBar = Math.max(1, Math.floor(channel.length / BAR_COUNT));
  const peaks: number[] = [];
  let max = 0;

  for (let bar = 0; bar < BAR_COUNT; bar++) {
    const start = bar * samplesPerBar;
    const end = Math.min(start + samplesPerBar, channel.length);
    let peak = 0;
    for (let i = start; i < end; i++) {
      const value = Math.abs(channel[i]);
      if (value > peak) peak = value;
    }
    peaks.push(peak);
    if (peak > max) max = peak;
  }

  return max > 0 ? peaks.map((peak) => peak / max) : peaks;
};

const flatPeaks = () => Array.from({ length: BAR_COUNT }, () => 0.08);

// Decoding a track requires downloading the entire audio file independently of
// the `<audio>` element's own playback stream. Caching the resulting peaks by
// URL means revisiting or reselecting a track reuses that work instead of
// re-downloading and re-decoding the same file from scratch.
const peaksCache = new Map<string, number[]>();

const Waveform = ({
  src,
  audioRef,
  duration,
}: {
  src: string | null;
  audioRef: RefObject<HTMLAudioElement>;
  duration: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playAnimationRef = useRef<number | null>(null);
  const requestIdRef = useRef(0);
  const revealStartRef = useRef<number | null>(null);

  const [peaks, setPeaks] = useState<number[]>(flatPeaks);
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Decode the current track's audio into normalized amplitude peaks.
  useEffect(() => {
    const requestId = ++requestIdRef.current;

    if (!src) {
      setPeaks(flatPeaks());
      return;
    }

    const cached = peaksCache.get(src);
    if (cached) {
      revealStartRef.current = performance.now();
      setPeaks(cached);
      return;
    }

    const decode = async () => {
      try {
        const context = getAudioContext(audioContextRef);
        if (!context) return;

        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(arrayBuffer);

        if (requestIdRef.current === requestId) {
          const peaks = computePeaks(audioBuffer);
          peaksCache.set(src, peaks);
          revealStartRef.current = performance.now();
          setPeaks(peaks);
        }
      } catch (error) {
        if (requestIdRef.current === requestId) {
          console.error("Error decoding audio for waveform:", error);
          setPeaks(flatPeaks());
        }
      }
    };

    decode();
  }, [src]);

  // Draw the waveform bars, coloring played vs. unplayed by the current playhead ratio.
  const draw = (playedRatio: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / BAR_COUNT;
    const gap = barWidth * BAR_GAP_RATIO;
    const playedBars = Math.floor(playedRatio * BAR_COUNT);
    const now = performance.now();

    peaks.forEach((peak, index) => {
      const reveal = revealFactorForBar(index, revealStartRef.current, now);
      if (reveal <= 0) return;

      const barHeight = Math.max(2, peak * height) * reveal;
      const x = index * barWidth;
      const y = (height - barHeight) / 2;

      ctx.fillStyle = index < playedBars ? PLAYED_COLOR : UNPLAYED_COLOR;
      ctx.fillRect(x, y, Math.max(1, barWidth - gap), barHeight);
    });

    if (hoverRatio !== null) {
      ctx.fillStyle = HOVER_COLOR;
      ctx.fillRect(hoverRatio * width, 0, 1, height);
    }
  };

  // Drive redraws off the audio element's currentTime via rAF for smooth 60fps playhead motion.
  useEffect(() => {
    const repeat = () => {
      const ratio =
        duration > 0 && audioRef.current
          ? audioRef.current.currentTime / duration
          : 0;
      draw(ratio);
      playAnimationRef.current = requestAnimationFrame(repeat);
    };

    playAnimationRef.current = requestAnimationFrame(repeat);
    return () => {
      if (playAnimationRef.current) {
        cancelAnimationFrame(playAnimationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peaks, duration, hoverRatio]);

  // Redraw when the canvas resizes (responsive layout / orientation changes).
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ratio =
      duration > 0 && audioRef.current
        ? audioRef.current.currentTime / duration
        : 0;

    const observer = new ResizeObserver(() => draw(ratio));
    observer.observe(container);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peaks]);

  const ratioFromPointer = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
  };

  const seekTo = (ratio: number) => {
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = ratio * duration;
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!src || duration <= 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    seekTo(ratioFromPointer(event));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const ratio = ratioFromPointer(event);
    setHoverRatio(ratio);
    if (isDragging) seekTo(ratio);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        className={`w-full h-16 sm:h-20 touch-none rounded-sm ${
          src ? "cursor-pointer" : "cursor-default"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => setHoverRatio(null)}
      />
    </div>
  );
};

export default Waveform;
