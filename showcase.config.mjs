// showcase.config.mjs — the ONLY file you edit to retarget a different site.
export default {
  base: "http://localhost:3000", // MATCH the dev server port
  showVideo: true,               // clear body bg so the -z-10 background <video> shows
  // The bg media is fetched post-mount from a remote backend (no MSW mock for
  // /api/global), so it can be a black fallback for a while. Wait for the real
  // <video>/<img> before recording so the GIF never opens on black.
  waitBg: "video.object-cover, img.object-cover",
  // Engine already goto's "/" on launch, so DON'T re-visit "/" here (that causes
  // a reload). Hash-anchor clicks smooth-scroll between sections; dwell must be
  // long enough for the scroll to finish AND the section to be seen.
  beats: [
    { clickNav: "About Me" },
    { clickNav: "Music" },
    { clickNav: "Credits" },
    { clickNav: "Connect" },
    { clickNav: "Home" },        // return to top to close the loop
  ],
};
