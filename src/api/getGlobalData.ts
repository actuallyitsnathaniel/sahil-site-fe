import { prod_url, GET_options } from "./util";

export type BackgroundMedia = {
  url: string;
  mime: string;
} | null;

export const getGlobalData = async () => {
  const response = await fetch(
    `${prod_url}/api/global?populate=backgroundMedia`,
    GET_options
  );

  if (!response.ok) {
    throw new Error(`Global data request failed with status ${response.status}`);
  }

  const json = await response.json();
  return json.data;
};
