import { prod_url, GET_options } from "./util";

export const getMusicPage = async () =>
  await fetch(
    `${prod_url}/api/music-section?populate=musicTrack.audioTrack`,
    GET_options
  )
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.log(error.stack));
