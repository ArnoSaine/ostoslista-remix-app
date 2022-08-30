import { readFile } from "node:fs/promises";

export const haeOstoslista = async () => {
  const ostoslista = await readFile("data/ostoslista.json");
  return JSON.parse(ostoslista);
};

export const haeSähkönHinta = async () => {
  const page = await fetch("https://sahko.tk/");
  const content = await page.text();
  const pricesTodayJSON = content.match(
    /(?<=function prices_today\(\){var t= )(.*)(?=;\$)/
  )[0];
  const pricesToday = JSON.parse(pricesTodayJSON);
  const now = Number(pricesToday.now);

  return now;
};
