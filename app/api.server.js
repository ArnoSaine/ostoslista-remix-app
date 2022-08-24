import { readFile } from "node:fs/promises";

export const getOstoslista = async () => {
  const ostoslista = await readFile("data/ostoslista.json");
  return JSON.parse(ostoslista);
};
