import { prod_url, GET_options } from "./util";

export const getCreditsPage = async () =>
  await fetch(
    `${prod_url}/api/credits-section?populate=creditedWork.creditedWorkPoster`,
    GET_options
  )
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.log(error.stack));
