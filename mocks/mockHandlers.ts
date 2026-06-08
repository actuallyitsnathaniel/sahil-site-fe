import { http } from "msw";
import { prod_url } from "../src/api/util";
import mockedCredits from "./responses/db_credits.json";
import mockedMusic from "./responses/db_music.json";
import mockedAbout from "./responses/db_about.json";
import mockedHome from "./responses/db_home.json";

export const handlers = [
  // Home section
  http.get(`${prod_url}/api/home-section`, () => {
    return new Response(JSON.stringify(mockedHome), {
      headers: { "Content-Type": "application/json" },
    });
  }),

  // About section
  http.get(`${prod_url}/api/about?populate=*"`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedAbout));
  }),

  // Music section
  http.get(
    `${prod_url}/api/music-section?populate=musicTrack.audioTrack`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockedMusic));
    }
  ),

  // Credits section
  http.get(
    `${prod_url}/api/credits-section?populate=creditedWork.creditedWorkPoster`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockedCredits));
    }
  ),
];
