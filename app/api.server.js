import { readFile, writeFile } from "node:fs/promises";

export const haeOstoslista = async () => {
  const ostoslistaJSON = await readFile("data/ostoslista.json");
  return JSON.parse(ostoslistaJSON);
};

export const päivitäOstoslista = async (rivi) => {
  const ostoslistaJSON = await readFile("data/ostoslista.json");
  const ostoslista = JSON.parse(ostoslistaJSON);
  const muokattavaRivi = ostoslista[rivi.index];

  // muokattavaRivi.nimi = rivi.nimi;
  // muokattavaRivi.määrä = Number(rivi.määrä);

  ostoslista[rivi.index] = {
    ...muokattavaRivi,
    nimi: rivi.nimi,
    määrä: Number(rivi.määrä),
  };

  const pävitettyOstoslistaJSON = JSON.stringify(ostoslista, null, 2);
  await writeFile("data/ostoslista.json", pävitettyOstoslistaJSON);
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
