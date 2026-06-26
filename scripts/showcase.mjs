// scripts/showcase.mjs — site-agnostic showcase engine. Records a configured
// tour of a running site as a video (Playwright), then converts it with ffmpeg.
// DO NOT edit per-site — edit showcase.config.mjs instead. Requires a running
// server. Records a real video so the page is captured exactly as it renders.
import { parseArgs } from "node:util";
import { mkdir, rm, readdir, rename } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { chromium } from "playwright";

const { values: f } = parseArgs({
  options: {
    config: { type: "string", default: "showcase.config.mjs" },
    base: { type: "string" }, // overrides config.base
    viewport: { type: "string", default: "1280x800" },
    delay: { type: "string", default: "1500" }, // ms settle on first load
    dwell: { type: "string", default: "2500" }, // ms hold per beat
    out: { type: "string", default: "showcase" },
    gif: { type: "boolean", default: true },
    mp4: { type: "boolean", default: false },
    fps: { type: "string", default: "15" },
    scale: { type: "string", default: "960" }, // output width px
    maxMb: { type: "string", default: "9.9" }, // hard GIF size ceiling (MB); 0 = no cap
    lossy: { type: "string", default: "65" }, // gifsicle --lossy level (0-200); -1 = skip gifsicle
  },
});

const cfg = (await import(pathToFileURL(resolve(f.config)).href)).default;
const base = f.base ?? cfg.base ?? "http://localhost:3000";
const dwell = Number(f.dwell);
const [w, h] = f.viewport.split("x").map(Number);

await rm(f.out, { recursive: true, force: true });
await mkdir(f.out, { recursive: true });

// REAL Chrome channel (not bundled headless-shell) so <video> renders in the
// recording; autoplay flag so muted bg videos start without a gesture.
const browser = await chromium.launch({
  channel: "chrome",
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const context = await browser.newContext({
  viewport: { width: w, height: h },
  recordVideo: { dir: f.out, size: { width: w, height: h } },
});
const page = await context.newPage();
// Playwright records from page-creation, so the video's head is the blank page
// during initial load + bg-media wait. Mark this instant; we trim everything
// before the tour actually starts (recorded below) off the front in ffmpeg.
const recordStart = Date.now();

// showVideo: clear the opaque body bg so a z-index:-1 background <video> shows
// through in capture (it keeps the site's own dimming). Re-applied after every
// navigation since a full route change drops injected styles. See step 5.
const revealBgVideo = () =>
  cfg.showVideo
    ? page.addStyleTag({ content: "html,body{background:transparent!important}" }).catch(() => {})
    : Promise.resolve();

await page.goto(new URL(cfg.startPath ?? "/", base).href, { waitUntil: "networkidle" });
await revealBgVideo();
// Some sites load the background <video>/<img> via a post-mount fetch (here:
// /api/global from a remote backend), so it can be absent — black fallback — for
// a while after `networkidle`. If cfg.waitBg is set, wait until that element has
// actually PAINTED (video has a decoded frame / img is loaded) before recording,
// so the GIF never opens on the black fallback or the transparent body.
if (cfg.waitBg)
  await page
    .waitForFunction(
      (sel) => {
        const el = document.querySelector(sel);
        if (!el) return false;
        if (el.tagName === "VIDEO") return el.readyState >= 2; // HAVE_CURRENT_DATA
        return el.complete && el.naturalWidth > 0; // <img>
      },
      cfg.waitBg,
      { timeout: 90_000 },
    )
    .catch(() => {});
await page.waitForTimeout(Number(f.delay));

// ─── generic beat runners (driven entirely by showcase.config.mjs) ───────────
const hold = (ms) => page.waitForTimeout(ms ?? dwell);

const clickNav = async (text) => {
  await page.getByRole("link", { name: text, exact: true }).first().click();
  await revealBgVideo();
};

const navTour = async () => {
  const links = await page.$$eval("nav a", (els) =>
    els
      .map((el) => ({ text: el.textContent.trim(), x: el.getBoundingClientRect().left }))
      .filter((l) => l.text)
      .sort((a, b) => a.x - b.x),
  );
  console.log("navTour:", links.map((l) => l.text).join(" -> "));
  for (const { text } of links) { await clickNav(text); await hold(); console.log("  clicked", text); }
};

const openClose = async (selector, { waitText, back = true } = {}) => {
  const startPath = new URL(page.url()).pathname;
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await el.click();
  // wait for the target to commit + render before dwelling, else the recording
  // shows the pre-click page while a lazy chunk loads.
  if (waitText) await page.getByText(waitText).waitFor({ state: "visible" });
  await revealBgVideo();
  await hold();
  if (back) { await page.goBack(); await page.waitForURL((u) => u.pathname === startPath || u.hash); }
  await revealBgVideo();
};

const hover = async (selector) => {
  const el = page.locator(selector).first();
  await el.scrollIntoViewIfNeeded();
  await el.hover(); // for hover-revealed UI (panels/menus that need a real pointerover, not a click)
  await revealBgVideo();
};

const scrollPage = async (durationMs = 4000) => {
  await page.evaluate(async (d) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const start = performance.now();
    await new Promise((res) => {
      const tick = (now) => {
        const t = Math.min(1, (now - start) / d);
        window.scrollTo(0, max * t);
        t < 1 ? requestAnimationFrame(tick) : res();
      };
      requestAnimationFrame(tick);
    });
  }, durationMs);
};

// ─── run the configured beats ────────────────────────────────────────────────
// Everything before this instant is blank-page loading — trim it off in ffmpeg.
const trimSec = Math.max(0, (Date.now() - recordStart) / 1000 - 0.3); // keep 0.3s lead-in
await hold(); // dwell on the initial view
for (const beat of cfg.beats ?? []) {
  if (beat.visit !== undefined) {
    await page.goto(new URL(beat.visit, base).href, { waitUntil: "networkidle" });
    await revealBgVideo(); await hold(beat.dwell);
  } else if (beat.navTour) {
    await navTour();
  } else if (beat.clickNav !== undefined) {
    await clickNav(beat.clickNav); await hold(beat.dwell); console.log("clickNav", beat.clickNav);
  } else if (beat.openClose !== undefined) {
    await openClose(beat.openClose, { waitText: beat.waitText, back: beat.back });
    await hold(beat.dwell); console.log("openClose", beat.openClose);
  } else if (beat.hover !== undefined) {
    await hover(beat.hover); await hold(beat.dwell); console.log("hover", beat.hover);
  } else if (beat.scrollPage !== undefined) {
    await scrollPage(beat.scrollPage); await hold(beat.dwell); console.log("scrollPage", beat.scrollPage);
  } else {
    console.warn("unknown beat, skipped:", JSON.stringify(beat));
  }
}

// video is written on context close
await context.close();
await browser.close();

const webm = (await readdir(f.out)).find((n) => n.endsWith(".webm"));
if (!webm) throw new Error("no recording produced");
const src = `${f.out}/tour.webm`;
await rename(`${f.out}/${webm}`, src);

// Drop the blank-page loading head measured during the run (input -ss = fast
// keyframe seek; applied to every encode below). 0 when nothing to trim.
const trim = trimSec > 0.1 ? ["-ss", trimSec.toFixed(2)] : [];
if (trim.length) console.log(`trimming ${trimSec.toFixed(2)}s of load-time head`);

// --- ffmpeg conversion ---
const ff = (args, out) => {
  spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (!existsSync(out) || statSync(out).size === 0) throw new Error(`ffmpeg produced no ${out}`);
  const probe = spawnSync("ffmpeg", ["-v", "error", "-i", out, "-f", "null", "-"]);
  if (probe.status !== 0) throw new Error(`ffmpeg wrote an invalid ${out}`);
};
const scale = `scale=${f.scale}:-2:flags=lanczos`;

if (f.gif) {
  // GIF has no quality knob; size = fps x width^2 x duration x colors. ffmpeg
  // can't target a byte size for the gif muxer, so to guarantee <= --max-mb we
  // encode, measure, and step DOWN a ladder until it fits. Levers ordered by
  // least visible cost first (colors -> fps -> width); duration is never cut.
  const out = `${f.out}/showcase.gif`;
  const budget = Number(f.maxMb) * 1_000_000;
  // fps rungs never EXCEED the requested --fps (clamp), so the ladder stays
  // monotonically smaller even when --fps is set below the rung defaults.
  const fpsAt = (rung) => String(Math.min(Number(f.fps), rung));
  // rung 1 == today's defaults, so a tour that already fits is unchanged.
  const ladder = [
    { fps: f.fps,     width: f.scale, colors: 256, dither: "sierra2_4a" },
    { fps: f.fps,     width: f.scale, colors: 192, dither: "bayer:bayer_scale=3" },
    { fps: f.fps,     width: f.scale, colors: 128, dither: "bayer:bayer_scale=3" },
    { fps: fpsAt(12), width: f.scale, colors: 128, dither: "bayer:bayer_scale=3" },
    { fps: fpsAt(10), width: f.scale, colors: 128, dither: "bayer:bayer_scale=2" },
    { fps: fpsAt(10), width: "800",   colors: 128, dither: "bayer:bayer_scale=2" },
    { fps: fpsAt(10), width: "640",   colors: 96,  dither: "bayer:bayer_scale=2" },
  ];
  // gifsicle (if present) does cross-frame DELTA compression + lossy LZW that
  // ffmpeg's gif muxer cannot — ~45% smaller on motion GIFs, so the ladder
  // stops at a much higher-quality rung. Optional: degrades gracefully if absent.
  const hasGifsicle = spawnSync("gifsicle", ["--version"]).status === 0;
  if (!hasGifsicle) console.warn("gifsicle not found — GIFs will be larger (brew install gifsicle)");
  const optimize = () => {
    if (!hasGifsicle || Number(f.lossy) < 0) return;
    const r = spawnSync("gifsicle", ["-O3", `--lossy=${f.lossy}`, out, "-o", out], { stdio: "inherit" });
    if (r.status !== 0) console.warn("gifsicle failed — keeping unoptimized GIF");
  };
  let fit = false;
  for (const s of (Number(f.maxMb) > 0 ? ladder : ladder.slice(0, 1))) {
    // split-graph palettegen/paletteuse in ONE pass = clean GIF colors, no
    // 2-input graph (which can trip an ffmpeg "Internal bug" on the threaded
    // flush). Only colors/fps/width/dither are parameterized.
    const vf =
      `fps=${s.fps},scale=${s.width}:-2:flags=lanczos,split[a][b]` +
      `;[a]palettegen=max_colors=${s.colors}[p]` +
      `;[b][p]paletteuse=dither=${s.dither}`;
    ff([...trim, "-i", src, "-vf", vf, out], out);
    optimize();
    const bytes = statSync(out).size;
    console.log(`gif ${s.width}px ${s.fps}fps ${s.colors}c -> ${(bytes / 1e6).toFixed(2)} MB`);
    if (Number(f.maxMb) <= 0 || bytes <= budget) { fit = true; break; }
  }
  if (!fit)
    console.warn(
      `GIF still over ${f.maxMb} MB at the smallest preset — kept the smallest one. ` +
      `Shorten the tour (drop beats or lower --dwell) and re-run.`);
  console.log("wrote", out);
}
if (f.mp4) {
  ff([...trim, "-i", src, "-vf", scale, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      `${f.out}/showcase.mp4`], `${f.out}/showcase.mp4`);
  console.log("wrote", `${f.out}/showcase.mp4`);
}

await rm(src, { force: true }); // drop the raw recording; keep only GIF/MP4
