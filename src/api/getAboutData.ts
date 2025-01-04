import { prod_url, GET_options } from "./util";

export const getAboutPage = async () =>
  await fetch(`${prod_url}/api/about?populate=*`, GET_options)
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.log(error.stack));
