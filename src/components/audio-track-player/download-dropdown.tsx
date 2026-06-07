import { Dispatch, SetStateAction, useState } from "react";
import JSZip from "jszip";

import { AudioTrackType } from "./index";

const sanitizeFilename = (name: string) =>
  name.trim().replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, " ");

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const RadioDot = ({ checked }: { checked: boolean }) => (
  <span
    className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full outline outline-2 ${
      checked ? "outline-white" : "outline-white/30"
    }`}
  >
    {checked && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
  </span>
);

const DownloadDropdown = ({
  tracks,
  isDownloadOpen,
  setIsDownloadOpen,
  downloadScope,
  setDownloadScope,
  selectedTracks,
  setSelectedTracks,
}: {
  tracks: AudioTrackType[];
  isDownloadOpen: boolean;
  setIsDownloadOpen: Dispatch<SetStateAction<boolean>>;
  downloadScope: "above" | "selected";
  setDownloadScope: Dispatch<SetStateAction<"above" | "selected">>;
  selectedTracks: Set<number>;
  setSelectedTracks: Dispatch<SetStateAction<Set<number>>>;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const tracksToDownload =
    downloadScope === "above"
      ? tracks.map((track, index) => ({ track, index }))
      : tracks
          .map((track, index) => ({ track, index }))
          .filter(({ index }) => selectedTracks.has(index));

  const downloadDisabled =
    isDownloading || (downloadScope === "selected" && tracksToDownload.length === 0);

  const handleDownload = async () => {
    if (downloadDisabled) return;
    setIsDownloading(true);

    try {
      const zip = new JSZip();

      await Promise.all(
        tracksToDownload.map(async ({ track, index }) => {
          const response = await fetch(track.audioTrack.url);
          const blob = await response.blob();
          const filename = `${String(index + 1).padStart(2, "0")} - ${sanitizeFilename(
            track.trackTitle
          )}.mp3`;
          zip.file(filename, blob);
        })
      );

      const archive = await zip.generateAsync({ type: "blob" });
      downloadBlob(archive, "music.zip");
    } catch (error) {
      console.error("Error preparing download:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const selectScope = (scope: "above" | "selected") => {
    setDownloadScope(scope);
    if (scope === "above") setSelectedTracks(new Set());
  };

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <button
        onClick={() => setIsDownloadOpen((current) => !current)}
        className="flex items-center justify-between gap-3 w-full px-5 py-3 bg-transparent outline outline-2 outline-white/20 rounded-lg uppercase tracking-wide text-sm font-semibold transition duration-100 hover:outline-white/40"
      >
        Download Audio
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isDownloadOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isDownloadOpen ? "max-h-72 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-5 py-4 outline outline-2 outline-white/10 rounded-lg">
          <p className="text-sm text-white/50">Tracks to Include</p>

          <label className="flex items-center gap-3 cursor-pointer">
            <RadioDot checked={downloadScope === "above"} />
            <input
              type="radio"
              name="download-scope"
              value="above"
              checked={downloadScope === "above"}
              onChange={() => selectScope("above")}
              className="hidden"
            />
            Above Tracks ({tracks.length})
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <RadioDot checked={downloadScope === "selected"} />
            <input
              type="radio"
              name="download-scope"
              value="selected"
              checked={downloadScope === "selected"}
              onChange={() => selectScope("selected")}
              className="hidden"
            />
            Selected Tracks ({selectedTracks.size})
          </label>

          <button
            onClick={handleDownload}
            disabled={downloadDisabled}
            className="self-end bg-transparent uppercase tracking-widest text-sm font-semibold transition duration-100 hover:enabled:-translate-y-0.5 disabled:opacity-40"
          >
            {isDownloading ? "Preparing…" : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadDropdown;
